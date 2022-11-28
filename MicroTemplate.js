window.onload = function Merge_Templates() {
	// get insertion-point containers for merged HTML (has a template attribute)
	const containers = document.querySelectorAll("[template-j]");

	// loop and render containers
	containers.forEach((container) => {
		// get template
		const templateHTML = getTemplateHTML(container);

		// get data
		[headers, records] = getData(container);

		// merge data to template to get rendered HTML
		const mergeHTML = mergeRecords(headers, records, templateHTML);

		// append merged-HTML to container
		container.innerHTML = mergeHTML;
	});
};

function getTemplateHTML(container) {
	// get template html
	const templateName = container.getAttribute("template-j");
	const template = document.querySelector(`template#${templateName}`);
	return template.innerHTML;
}

function getData(container) {
	// return headers and records as arrays
	const rawData = getRawData(container);
	
	// field-delimiter is tilde surrounded by 0 or more spaces or tabs
	const sDelim = /[ \t]*\~[ \t]*/g;
	const [headers, headersEnd] = getHeaders(rawData, sDelim);
	const records = getRecords(rawData, headersEnd, sDelim);
	return [headers, records];
}

function getRawData(container) {
	// get raw data
	const dataID = container.getAttribute("records-j");
	const dataElement = document.querySelector(`records-j#${dataID}`);
	const rawData = dataElement.innerHTML.trim();
	return rawData;
}

function getHeaders(rawData, sDelim) {
	// load headers into array
	const headersEnd = rawData.indexOf("\n");
	const headers = rawData.slice(0, headersEnd).split(sDelim);
	return [headers, headersEnd];
}

function getRecords(rawData, headersEnd, sDelim) {
	// load records into array, rows and columns
	// reg exp: newline + 0 or more spaces or tabs
	const sRegExp = /\n[ \t]*/g;
	const aRows = rawData.slice(headersEnd).trim().split(sRegExp);
	const records = aRows.map((sRow) => {
		return sRow.split(sDelim);
	});

	return records;
}

function mergeRecords(headers, records, templateHTML) {
	// make html for each record by merging with temlate
	let allRecordsHTML = "";

	records.forEach((record) => {
		let recordHTML = mergeRecord(templateHTML, headers, record)
		allRecordsHTML += recordHTML;
	});
	return allRecordsHTML;
}

function mergeRecord(templateHTML, headers, record) {
	let recordHTML = templateHTML;

	// loop fields
	headers.forEach((field, column) => {
		// get value and placeholder
		const value = record[column];
		const placeholder = `\[[${field}]]`;

		// load variable into temlate
		recordHTML = recordHTML.replaceAll(placeholder, value);
	});
	return recordHTML
}

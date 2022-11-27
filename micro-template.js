// Include it in an HTML file with `<script src="micro-template.js"></script>`

window.onload = function Merge_Data() {
	// get insertion-point containers for merged HTML (has a template attribute)
	const containers = document.querySelectorAll("[template]");

	// loop and render containers
	containers.forEach((container) => {
		// get template
		const templateHTML = getTemplateHTML(container);

		// get data
		[headers, records] = getData(container);

		// merge data to template to get rendered HTML
		const mergeHTML = makeMerge(headers, records, templateHTML);

		// append merged-HTML to container
		container.innerHTML = mergeHTML;
	});
};

function getTemplateHTML(container) {
	// get template html
	const templateName = container.getAttribute("template");
	const template = document.querySelector(`template#${templateName}`);
	return template.innerHTML;
}

function getData(container) {
	const rawData = getRawData(container);
	const sDelim = "~";
	const [headers, headersEnd] = getheaders(rawData, sDelim);
	const records = getRecords(rawData, headersEnd, sDelim);
	return [headers, records];
}

function getRawData(container) {
	// get raw data
	const dataID = container.getAttribute("records");
	const dataElement = document.querySelector(`records#${dataID}`);
	const rawData = dataElement.innerHTML.trim();
	return rawData;
}

function getheaders(rawData, sDelim) {
	// load headers into array
	const headersEnd = rawData.indexOf("\n");
	const headers = rawData.slice(0, headersEnd).split(sDelim);
	return [headers, headersEnd];
}

function getRecords(rawData, headersEnd, sDelim) {
	// load records into array, rows and columns
	const sRegExp = /\n[ \t]*/g;
	const aRows = rawData.slice(headersEnd).trim().split(sRegExp);
	const records = aRows.map((sRow) => {
		return sRow.split(sDelim);
	});

	return records;
}

function makeMerge(headers, records, templateHTML) {
	// make html for each record by loading current variables into temlate
	let allRecordsHTML = "";

	records.forEach((oRec) => {
		let recordHTML = templateHTML;

		// loop fields
		headers.forEach((field, column) => {
			// get value and placeholder
			const value = oRec[column];
			const placeholder = `\[[${field}]]`;

			// load variable into temlate
			recordHTML = recordHTML.replaceAll(placeholder, value);
		});
		allRecordsHTML += recordHTML;
	});
	return allRecordsHTML;
}

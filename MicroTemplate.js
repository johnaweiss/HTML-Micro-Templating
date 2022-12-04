// MT HTML PREFIXES (reserved attributes needed to support metadata in containers)
const gAppPref = "mt-";

// RECORD DELIMITERS REGEX (new-field, new-record)
const gFldDelim = /(?:\n[ \t]*)(?=\w)/g;
const gRecDelim = /(?:\n[ \t]*){2,}(?=\w)/g;


window.onload = function Merge_Templates() {
	// get insertion-point containers for merged HTML (has a template attribute)
	containers = document.querySelectorAll("[" + gAppPref + "header]");
	// loop and render containers
	containers.forEach((container) => {
		// load header
		loadHeader(container);
	});
	
	containers = document.querySelectorAll("[" + gAppPref + "template]");
	// loop and render containers
	containers.forEach((container) => {
		// merge records into template
		loadMerge(container);
	});
};


function loadHeader(container) {
	// get metadata string. CONTAINS KEYS AND VALUES
	const sMetas = container.getAttribute(gAppPref + "meta").trim();
	const objMetas = strToObj(sMetas, gFldDelim);
	
	// get header-template
	const headerID = container.getAttribute(gAppPref + "header");
	const header = document.querySelector(`template#${headerID}`);
	let headerHTML = header.innerHTML;

	// merge
	for (const key in objMetas) {
		let val = objMetas[key].trim();
		let place = `[[${key}]]`;
		headerHTML = headerHTML.replaceAll(place, val);
	}

	// append to container
	container.innerHTML += headerHTML;
}


function loadMerge(container) {
	// get data
	[headers, records] = getData(container);

	// get template
	const templateHTML = getTemplateHTML(container);
	// console.log(templateHTML);

	// merge
	const mergeHTML = mergeRecords(headers, records, templateHTML);

	// append merged-HTML to container
	container.innerHTML += mergeHTML;
}


function getTemplateHTML(container) {
	// get template html
	const templateID = container.getAttribute(gAppPref + "template");
	const template = document.querySelector(`template#${templateID}`);
	return template.innerHTML;
}


function getData(container) {
	// return headers and records as arrays
	const rawData = getRawData(container);

	const [headers, headersEnd] = getHeaders(rawData, gFldDelim);

	const records = getRecords(rawData, headersEnd, gFldDelim);

	return [headers, records];
}

function getRawData(container) {
	// get mt-records id
	const dataID = container.getAttribute(gAppPref + "records");

	// get records element
	const dataElement = document.querySelector(`${gAppPref}records#${dataID}`);
	console.log("selector: " + `${gAppPref}records#${dataID}`);

	// get records contents
	const rawData = dataElement.innerHTML.trim();
	return rawData;
}

function getHeaders(rawData) {
	// load headers into array
	const headersEnd = rawData.search(gRecDelim);
	// console.log("end: " + headersEnd);
	const headers = rawData.slice(0, headersEnd).split(gFldDelim);
	// console.log(headers);
	return [headers, headersEnd];
}

function getRecords(rawData, headersEnd) {
	// load records into array, rows and columns
	const aRows = rawData.slice(headersEnd).trim().split(gRecDelim);
	const records = aRows.map((sRow) => {
		return sRow.split(gFldDelim);
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


function strToObj(str, propDelim){
	return Object.fromEntries(str.split(propDelim).map(i => i.split(':')));
}

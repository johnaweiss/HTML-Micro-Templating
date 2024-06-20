// github for this project
// https://github.com/johnaweiss/HTML-Micro-Templating

// MT HTML PREFIXES (reserved attributes needed to support metadata in containers)
const gAppPref = 'mt-';

// RECORD DELIMITERS REGEX (new-field, new-record)
const gFldDelim = /(?:\n[ \t]*)(?=\w)/g;
const gRecDelim = /(?:\n[ \t]*){2,}(?=\w)/g;

window.onload = function Merge_Templates() {

  // loop each container in body. Singlets first, then Collections.

  // single recordset templates (not recordset collections)
  // write sep fx, then determine what to combine with loopCollSinglets
  loopOrphanSinglets();

  // collection
  const collViewNodes = document.querySelectorAll(
    gAppPref + 'container[' + gAppPref + 'collection]'
  );

  // loop and render collection-containers
  collViewNodes.forEach(collViewNode => {
    makeRecordsetHeaders(collViewNode);

    // singlets
    loopCollRecordsets(collViewNode);
  });
};

function loopOrphanSinglets() {
  // singlets
  const singletContainers = document.querySelectorAll(
    gAppPref + 'container[' + gAppPref + 'records]'
  );
  
  // loop and render recordset-containers
  singletContainers.forEach(snglContain => {
    
  // get fields from parent attribs before looping
    fields = getFields(snglContain);
  $("fields", fields )
  
    // merge records into template
    loadMerge(snglContain);
  });
}

function loopCollRecordsets(scope) {
  // get fields from parent attribs before looping
  fields = getFields(scope);

  // singlets
  const singletContainers = scope.querySelectorAll(
    gAppPref + 'container[' + gAppPref + 'records]'
  );

  // loop and render recordset-containers
  singletContainers.forEach(snglContain => {
    // merge records into template
    loadMerge(snglContain);
  });
}

function makeRecordsetHeaders(collContainer) {
  // merge metadata from recordset into header-template

  // get collection-template
  const templateHTML = getTemplateHTML(collContainer);

  // get all recordsets in the collection
  const collectionRecordsets = getCollectionRecordsets(collContainer);

  // loop recordsets. Write merged template for each
  collectionRecordsets.forEach(recordset => {
    makeRecordsetHeader(collContainer, templateHTML, recordset);
  });
}

function makeRecordsetHeader(collContainer, templateHTML, recordset) {
  let recordsetHTML = templateHTML;

  // load recordset-id in template
  recordsetHTML = recordsetHTML.replaceAll('[[id]]', recordset.id);

  // replace fields in template with metadata from recordset
  const metas = getAppMeta(recordset);
  Object.keys(metas).forEach(key => {
    recordsetHTML = recordsetHTML.replaceAll(`[[${key}]]`, metas[key].trim());
  });

  // append to container
  collContainer.innerHTML += recordsetHTML;
}

function getAppMeta(element) {
  const sMetas = element.getAttribute(gAppPref + 'meta').trim();
  const objMetas = strToObj(sMetas);
  return objMetas;
}

function getCollectionRecordsets(collContainer) {
  // we want
  // element#id
  // mt-collection#advisers
  const ID = collContainer.getAttribute(gAppPref + 'collection');
  const tag = gAppPref + 'collection';
  const collectionSelector = `${tag}#${ID}`;
  const collectionNode = document.querySelector(collectionSelector);
  const recordsetNodes = collectionNode.children;
  recordsets = [...recordsetNodes];
  return recordsets;
}

function getFields(viewNode) {
  // return fields from mt-fields node, which is the parent of the collection or recordset
  // if view-container points to collection, get fieldset-name from collection data-container
  // if view-container points to recordset, get fieldset-name from recordset data-container
  let sDataContainer = viewNode.getAttribute(gAppPref + 'collection');
  if (!sDataContainer)
    sDataContainer = viewNode.getAttribute(gAppPref + 'records');  

  const dataNode = document.getElementById(sDataContainer);
  const schemaName = dataNode.getAttribute(gAppPref + 'fields');
  const schemaNode = document.getElementById(schemaName);
  const rawFields = schemaNode.innerText.trim();
  const fields = rawFields.split(gFldDelim);
  return fields;
}

function loadMerge(snglContain) {
  // load records into template

  // get template
  const templateHTML = getTemplateHTML(snglContain);

  // get data
  records = getData(snglContain);

  // merge
  const mergeHTML = mergeRecords(templateHTML, fields, records);

  // append merged-HTML to container
  snglContain.innerHTML += mergeHTML;
}

function getTemplateHTML(container) {
  // get template html
  const templateID = container.getAttribute(gAppPref + 'template');

  const template = document.querySelector(`template#${templateID}`);
  return template.innerHTML;
}

function getData(snglContain) {
  // return headers and records as arrays
  const rawData = getRawData(snglContain);
  const records = getRecords(rawData);
  return records;
}

function getRawData(container) {
  // get mt-records id
  const dataID = container.getAttribute(gAppPref + 'records');

  // get records element
  const dataElement = document.querySelector(`${gAppPref}records#${dataID}`);

  // get records contents
  const rawData = dataElement.innerText.trim();
  return rawData;
}

function getRecords(rawData) {
  // load records into array, rows and columns
  const aRows = rawData.trim().split(gRecDelim);
  const records = aRows.map(sRow => {
    return sRow.split(gFldDelim);
  });

  return records;
}

function mergeRecords(templateHTML, fields, records) {
  // make html for each record by merging with temlate
  let allRecordsHTML = '';

  records.forEach(record => {
    let recordHTML = mergeRecord(templateHTML, fields, record);
    allRecordsHTML += recordHTML;
  });
  return allRecordsHTML;
}

function mergeRecord(templateHTML, dataFields, record) {
  let recordHTML = templateHTML;

  // LOOP PLACEHOLDERS in the template
  //	- THUS, NOT LOOPING FIELDS THAT DON'T APPEAR IN TEMPLATE
  // 	- AND HANDLING SPACE-ESCAPES EFFICIENTLY
  // REGEX + matchAll
  const templateFieldsRegex = /\{\{\w+\}\}/g;
  const templateFields = recordHTML.match(templateFieldsRegex);

  // loop placeholders
  templateFields.forEach(templFld => {
    // need to find matching value in record by name
    // we can use dataFields to get column position, or, make record a key:value set
    // need too see trailing underscore (to escape spaces), and with trailing under removed to get value from record

    // remove delimiters
    let noDelimFld = templFld.slice(2, -2);

    // check for escaping spaces (last char is underscore). If found, then snip trailing underscore so can get value from record.
    const lastChr = noDelimFld.slice(-1);
    const escapeSpaces = lastChr == '_';
    if (escapeSpaces) noDelimFld = noDelimFld.slice(0, -1);

    // get value based on data-field position
    const col = fields.indexOf(noDelimFld);
    let value = record[col];

    // escape spaces
    if (escapeSpaces) value = value.replaceAll(' ', '_');

    // load variable into temlate
    recordHTML = recordHTML.replaceAll(templFld, value);
  });

  return recordHTML;
}

function strToObj(str) {
  // return Object from string. Comma-sep key:value pairs. Just wrap in braces.
  const obj = Object.fromEntries(str.split(',').map(i => i.split(':')));
  return obj;
}

function $(text1, text2) {
  console.log(text1);
  console.log(text2);
}
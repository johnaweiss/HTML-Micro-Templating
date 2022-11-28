# HTML Micro Templating System
---------------------------

A lightweight, robust HTML node-layout templating system. Designed to minimize effort and reduce keystrokes for the HTML programmer and content admins. It enables HTML programmer to more easily control the layout of an arbitrary series of identical HTML nodes, each containing different data. 

 - There's just one copy of the HTML layout to edit. 
 - Content admins never need to touch the HTML of the node-series. They just edit a plain-text list of records. 
 - All dynamic assets can be contained within a single HTML file. 
 - No database needed. 
 - Built using vanilla Javascript. No library or framework needed. Extremely lightweight Javascript. 
 - HTML layouts can be mixed and switched with the same ease as CSS styles, as long as the fields match up. 
 - Data-placeholders can be anywhere in the template's HTML, including element metadata. So, for example, you can use a template-variable for the `src` of an `<img>`: `<img src = [[IMAGE-DATA]] alt = "">`

## Operation

It operates like a mailmerge. The record-list gets merged with the HTML template, and rendered HTML for all records is written to the webpage. 

**HTML elements**

 - **Container:** The insertion point in the rendered page for the rendered merge.
 - **Template:** HTML structure to be repeated for each record. 
 - **Records:** A simple newline-delimited list. 

**Files**
 - **microtemplate.js**: The only file needed to use the system. 
 - **demo.html**: Demos proper layout of the Template, Records, and Container. 
 - **style.css**: *Not needed for this system to work.* Demonstrates normal stying on the merged render. 
 - **records.html**: Optionally, records can be stored in a separate file. 

[Pen](https://codepen.io/johnaweiss/pen/OJEEomJ)

## Container

The insertion point in the rendered page for the rendered merge. Indicates the template and records to merge. 

`<span records="EEs" template="engineer" class="engineers"></span>`

## Template

Arbitrary, user-defined HTML structure to be repeated for each record. Contains field-placeholders which get automatically loaded with data from Records. Placeholders are indicated with double-brackets `[[MyField]]`. 

```
<template id="artist">
	<span class="artist">
		<a target="_blank" href="http://[[LINK]]">
			<img src="https://bayviewboom.org/data/uploads/photos/people/artists/[[IMG]]" alt="">
			<div class="caption">[[NAME]]</div>
		</a>
	</span>
</template> 
```

## Records

A simple newline-delimited list. Fieldnames are stated only once, on the first row. Leading spaces/tabs are ignored. Uses a simple tilde `~` field-delimiter, so no conflict with commas in the data, no escape characters needed. To simplify data-entry, it uses no brackets, braces, parens, or angles. Headers must match fieldnames in the template. 

```
<records hidden id="sculptors">
	NAME~IMG~LINK
	Orlie Kapitulnik~orliek-crop-2.jpg~orliek.com
	Khang Le Schoenthal~khang.jpg~khangle.webflow.io
	Ivan Lopez~ivan-lopez-crop.jpg~ilcolors.com
	Genevieve Dupre~genevieve-dupre-crop.jpg~genevievetattoos.com
	Joey Armstrong~joey-armstrong-crop-1.jpg~thunderhandtattoo.com
</records>
```

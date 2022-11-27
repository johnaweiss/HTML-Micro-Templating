# HTML Micro Templating System
---------------------------

A lightweight, robust HTML templating system. 

Enables HTML programmer to generate unlimited elements with identical layout by simply editing a list of records. The records get merged with an HTML template, and outputs rendered HTML for each record. 

Designed to minimize effort for the HTML programmer. Provides features that the `<template>` tag doesn't offer alone. For example, template-fields can be placed anywhere in the template, including element attributes. HTML programmer can easily mix and match templates, containers, and records, as long as the fields match. 

All dynamic assets can be contained within a single HTML file. No database needed. Built using vanilla HTML and Javascript. No library or framework needed. Extremely lightweight Javascript. 

**HTML elements**

 - **Container:** The insertion point in the rendered page for the rendered merge.
 - **Template:** HTML structure to be repeated for each record. 
 - **Records:** A simple newline-delimited list. 

**Files**
 - **microtemplate.js**: The only file needed to use the system. Include it in an HTML file with `<script src="microtemplate.js"></script>`
 - **demo.html**: Demos proper layout of the Template, Records, and Container. 
 - **style.css**: Not needed for this system to work. Demonstrates normal stying on the merged render. 

[Pen](https://codepen.io/johnaweiss/pen/OJEEomJ)

## Container

The insertion point in the rendered page for the rendered merge. Indicates the template and records to merge. 

`<span records="EEs" template="engineer" class="engineers"></span>`

## Template

HTML structure to be repeated for each record. Contains placeholders which get automatically loaded with data from Records. 

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

A simple newline-delimited list. Fieldnames are stated only once, on the first row. Leading spaces/tabs are ignored. Uses a simple tilde `~` delimiter, so no conflict with commas, no escape characters needed. No brackets, braces, parens, or angles. 

```
<records hidden id="sculptors">
	NAME~IMG~LINK
	Orlie Kapitulnik~orliek-crop-2.jpg~orliek.com
	Khang Le Schoenthal~khang.jpg~khangle.webflow.io
</records>
```

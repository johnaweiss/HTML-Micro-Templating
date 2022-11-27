# HTML Micro Templating System
---------------------------

A lightweight, robust HTML templating system. 

Enables HTML programmer to generate unlimited elements with identical layout by simply editing a list of records. The records get merged with an HTML template, and outputs rendered HTML for each record. 

Designed to minimize effort for the HTML programmer. Provides features that the `<template>` tag doesn't offer alone. For example, template-fields can be placed anywhere in the template, including element attributes. HTML programmer can easily mix and match templates, containers, and records, as long as the fields match. 

All dynamic assets can be contained within a single HTML file. No database needed. Built using vanilla Javascript. No library or framework needed. Extremely lightweight Javascript. 

**HTML elements**

 - **Container:** The insertion point in the rendered page for the rendered merge.
 - **Template:** HTML structure to be repeated for each record. 
 - **Records:** A simple newline-delimited list. 

**Files**
 - **microtemplate.js**: The only file needed to use the system. 
 - **demo.html**: Demos proper layout of the Template, Records, and Container. 
 - **style.css**: *Not needed for this system to work.* Demonstrates normal stying on the merged render. 

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

A simple newline-delimited list. Fieldnames are stated only once, on the first row. Leading spaces/tabs are ignored. Uses a simple tilde `~` field-delimiter, so no conflict with commas, no escape characters needed. To simplify data-entry, it uses no brackets, braces, parens, or angles. Headers must match fieldnames in the template. 

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

# HTML Node Templating System
---------------------------

A lightweight, robust HTML node-layout templating system. It enables HTML programmer to more easily control the layout of an arbitrary number of identical HTML sibling nodes, each containing different data, pulled from a hidden table. Designed to minimize effort and reduce keystrokes for the HTML programmer, and protect live HTML from content admins. 

![Sample layout](https://dsm04pap002files.storage.live.com/y4mFDRTizIWm9MUkVhvF5Eb13qkch_IfHPCCvHMXSk3-zjY53TPQkm1C6QfHU-ZQ1YwANtlQ7p5ijEckYsR_DdXJF7rjZZiKBS2sCgL7Mbmf688liylf9bLulJgsb3OqZ4g4TxO6u0n5AH1b6BY4T69BPNe8UWmQtK1wACRcRbPrBfj_FCKCB8NLZP_tKMPw5di?width=466&height=251&cropmode=none)

This system *isn't* for templating an entire website or webpage. It's for repeated HTML nodes within a page. 

## Benefits

 - There's just one copy of the HTML layout to edit. 
 - Content admins never need to touch the HTML of the node-series. They just edit a plain-text list of records. 
 - All dynamic assets can be contained within a single HTML file. 
 - Supports any number of templates, datasets, and insertion-points on the same webpage. 
 - Optionally, for safer content-management, data can be stored in a separate file from the webpage. (Requires PHP.)
 - No database needed. 
 - Built using vanilla Javascript. No library or framework needed. Extremely lightweight Javascript. 
 - HTML templates and data can be mixed and switched on the same webpage with the same ease as CSS styles, as long as the fields match up. 
 - Variable data can be inserted anywhere in the template's HTML, including element metadata. 
 - Clean, resilient code. 

## Operation

It operates like a mailmerge. The record-list gets merged with the HTML template, outputting rendered HTML for all records. That gets written to the webpage. 

### *HTML elements*

These are the elements that must appear on the webpage: 

 - **Container:** The insertion point in the rendered page for the clones.
 - **Template:** HTML structure to be repeated for each clone. 
 - **Records:** A simple newline-delimited list. 

### *Files*

Required files:
 - **microtemplate.js**: Contains all needed Javascript. 
 - **YourWebPage.html**: Contains Containers, Templates, and Records. The attached index.html is a working example of how to use the system. 

Optional files:
 - **style.css**: *Not needed for The attached index.html is ahis system to work.* The attached style.css emonstrates normal stying on the clones. 
 - **records.html**: Optionally, records can be stored in a separate file instead of on the webpage. 

https://replit.com/@johnaweiss/Micro-Template-Demo?v=1

## Container

The insertion point in the webpage for the rendered merge. Container attributes are used to set the ID's of the template and recordset to merge. We use "MT-" prefix for all custom HTML tags and attributes. The class of the container isn't required for Micro-Template operation. Its just for styling. 

`<span MT-records="EEs" MT-template="engineer" class="engineers"></span>`

## Template

Arbitrary, user-defined HTML structure to be repeated for each record. Contains field-placeholders which get automatically loaded with data from Records. Placeholders are indicated with double-brackets `[[MyField]]`. You can use template-variable for anything: tags, attributes, content, etc. For example, as the source of an image
`<img src = [[IMAGE-DATA]] alt = "">`

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

A simple newline-delimited list. Fieldnames are stated only once, on the first row. Uses a single tilde `~` field-delimiter, so no conflict with commas in the data, no escape characters needed. To simplify data-entry, it uses no brackets, braces, parens, single-quotes, double-quotes, or angles -- unless it's part of your data. Headers must match fieldnames in the template. Whitespace surrounding the field-delimiter is ignored. 

```
<MT-records hidden id="sculptors">
	NAME	~	IMG	~	LINK
	Orlie Kapitulnik	~	orliek-crop-2.jpg	~	orliek.com
	Khang Le Schoenthal	~	khang.jpg	~	khangle.webflow.io
	Ivan Lopez	~	ivan-lopez-crop.jpg	~	ilcolors.com
	Genevieve Dupre	~	genevieve-dupre-crop.jpg	~	genevievetattoos.com
	Joey Armstrong	~	joey-armstrong-crop-1.jpg	~	thunderhandtattoo.com
</MT-records>
```

# Contributors Welcomed!

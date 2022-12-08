# HTML Templating System
---------------------------

A robust, code-free lightweight system which puts node templating in the hands of the HTML developer. It enables the HTML dev to easily control the layout of a long series of identical HTML sibling-nodes, each containing different content. 

"Code free" means the HTML dev never has to write or deal with Javascript. This tool enables an HTML dev to create and use templates with pure HTML, without having to do any Javascript programming. 

## "Shouldn't templating be done server-side?"
This tool isn't trying to replace server-side templating. For sure, in any complex system with many tables and many records, server-side templating is the way to go. 

But often, server-side templating is overkill or unobtainable:
 - on small projects
 - websites that lack server access
 - pages with a small number of rarely changing data-records, with relatively few fields
 - when the web-developer lacks server-side programming skills. 
 - when you're _going_ to have a database in the future (when the database team finally launches it), but you don't quite have it yet and you need to get that website up asap. 

In those scenarios, client-side templating can be a very useful option, or the only option. 

## Design

Micro Template is designed to minimize effort and reduce keystrokes for the HTML programmer, and protect HTML from content updates. 

The layout of all the clones is edited in one place, so it's easy to edit ten's or hundreds of clones at the same time. 

It's easy to update the data-records separately from the HTML, because it is separate from the HTML. The data can be stored right inside the webpage, or in an external flat file. No database required. In-page storage is especially handy when you have only a few items which change rarely, and a database would be overkill. 

![Sample layout](https://dsm04pap002files.storage.live.com/y4mFDRTizIWm9MUkVhvF5Eb13qkch_IfHPCCvHMXSk3-zjY53TPQkm1C6QfHU-ZQ1YwANtlQ7p5ijEckYsR_DdXJF7rjZZiKBS2sCgL7Mbmf688liylf9bLulJgsb3OqZ4g4TxO6u0n5AH1b6BY4T69BPNe8UWmQtK1wACRcRbPrBfj_FCKCB8NLZP_tKMPw5di?width=466&height=251&cropmode=none)

This system *isn't* for templating an entire website or webpage. It's for repeated HTML nodes *within* a page. 

## Benefits

 - There's just one copy of the HTML layout to edit. 
 - Content can be edited without touching the HTML. 
 - Data is a simple delimited list. No special string-handling, no escape-codes, or no redundant fieldames. 
 - All dynamic assets can be contained within a single HTML file. 
 - Supports any number of templates, datasets, and insertion-points on the same webpage. 
 - Optionally, for safer content-management, data can be stored in a separate file from the webpage. (Requires PHP.)
 - No database needed. 
 - A compatible database-export could be generated without too much trouble. 
 - Built using vanilla Javascript. No library or framework needed. Extremely lightweight Javascript. 
 - HTML templates and data can be mixed and switched on the same webpage with the same ease as CSS styles, as long as the fields match up. 
 - Variable data can be inserted anywhere in the template's HTML, including element metadata. 
 - Clean, resilient code. 

https://replit.com/@johnaweiss/JS-Templating-with-groups?v=1

## Operation

It operates like a mailmerge. The record-list gets merged with the HTML template, outputting rendered HTML for all records. That gets written to the webpage. 

## Files

Required files:
 - **microtemplate.js**: Contains all needed Javascript. 
 - **YourWebPage.html**: Contains Containers, Templates, and Records. The attached index.html is a working example of how to use the system. 

Optional files:
 - **style.css**: *Not needed for this system to work.* The attached style.css demonstrates normal styling of the clones. 
 - **records.html**: Optionally, records can be stored in a separate file instead of on the webpage. Requires php. 

## HTML elements

These are the elements that must appear on the webpage: 

 - **Container:** The insertion point in the rendered page for the clones.
 - **Template:** HTML structure to be repeated for each clone. 
 - **Records:** A simple newline-delimited list. 

## Container

The insertion point in the webpage for the rendered merge. Container attributes are used to set the ID's of the template and recordset to merge. We use "mt-" prefix for all custom HTML tags and attributes. The class of the container isn't required for Micro-Template operation. Its just for styling. 

`<span mt-records="EEs" mt-template="engineer" class="engineers"></span>`


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



## Grouping

MT offers an alternate container style which makes separate groups, for different datasets with the same layout. This enables to create a header-template to display above each of multiple groups in the same page, based on the same template, each with a different dataset. For example: Artist template with groups: Sculptors, Painters. Dev can enter metadata into container to display in each group header. That metadata will get loaded into each group-header. 

To show the header-template above a group, the group container must have the `mt-header` attribute, pointing to the header template. 

		<!-------------- GROUP CONTAINER 1  ------------------->
		<span mt-header="engineers" mt-meta="
			TITLE:HTML Layout 2, Group 1
			SUBTITLE: Electrical Engineers
			RECORDS: EEs
			"></span>


		<!-------------- GROUP CONTAINER 2  ------------------->
		<span mt-header="engineers" mt-meta="
			TITLE:HTML HTML Layout 2, Group 2
			SUBTITLE: Mechanical Engineers
			RECORDS: MEs
			"></span>
	
Renders like this:

[<img src="https://user-images.githubusercontent.com/53209681/205672112-e6f0b3e4-6071-4f76-9006-5b34352be602.png" width="250"/>](https://user-images.githubusercontent.com/53209681/205672112-e6f0b3e4-6071-4f76-9006-5b34352be602.png)


## Records

Records block is intended to make data-entry and viewing human-easy. It's a simple newline-delimited list. The field delimiter is one newline character. The record delimiter is two or more newline characters (so you can add several extra empty newlines betweeen records for visual clarity, if desired). This layout was chosen for visual clarity: every field clearly starts on a newline, instead of being buried somewhere in a contnuous block of text. Fieldnames are stated only once, on the first row -- they don't have to be repeated for each record. There's no character field-delimiter, so no characters are off-limits, eg no conflict with commas in the data, no escape characters needed. To simplify data-entry, it uses no brackets, braces, parens, single-quotes, double-quotes, or angles. Whitespace (tabs or spaces) surrounding the field-delimiter isn't required, and will be ignored. Headers must match fieldnames in the template. **With extremely long data, turn off word-wrap in your HTML editor to more clearly see the start of each field.**

```
	<mt-records hidden id="tattooists">
		NAME
		LINK
		DESCRIPTION

		Genevieve Dupre
		https://www.genevievetattoos.com
		This isn't what you expected.

		Joey Armstrong
		https://thunderhandtattoo.com
		The most amazing.
	</mt-records>
```

## Other Client-Side Templating Systems

http://www.jsonml.org/bst/

https://johnresig.com/blog/javascript-micro-templating/

https://code.google.com/archive/p/trimpath/wikis/JavaScriptTemplates.wiki

http://jsont.squarespace.com/

### Comparison

I haven't had a chance to compare yet. Comparison should look at:
 - **Code Free**: Can HTML devs make templates without writing or knowing Javascript?
 - **Attributes**: Does it support template-fields in the HTML attributes? Or only content?
 - **Ease of template coding**: Is the template normal HTML with syntax coloring? Or, is the template a confusing mix of javascript and HTML? 
 - **Validation**: Does it validate?
 - **Ease of HTML container coding**: Normal HTML?
 - **Ease of HTML data-entry**: Redundancy, complexity, risk
 - **Performance**: Page load times, caching
 - **JS Code**: Is it well-structured, good coding practices like meaningful variable names, etc? Or indecipherable spaghetti code? Uses the latest Javascript enhancements, like array functions and arrow syntax?
 - **Size**: How big is the JS?
 - **Features**: Does it support:
 	- multiple group headers with metadata
 	- subtempates
 	- normal CSS
 - **Dependencies**: External libraries? Special CSS? 
 - **Dev Status**: Stable, Bug-Free? 
 - **Community**: Posted on github or another code-centric platform? Open source? 

# Contributors Welcomed!

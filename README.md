## DJsonLoader-jQuery json loader plugin

Version 1.0.2

DJsonLoader is a jquery plugin for loading data in JSON format not only in forms but also in any other HTML container (div, nav, section, article, etc), 
in addition the data can be loaded in any form field Or other HTML tags (a, img, p, span, iframe, etc.), simply, quickly and flexibly.

It has other features like:
* Embedded object data can be loaded into other and simple arrays.
* Reset forms and other HTML containers.
* Options can be loaded to select tags from simple arrays or objects with multiple configurable options.
* You can load all kinds of tags like the src of img, iframe, etc. Or href for links.
* List elements (ol, ul) can be loaded from simple arrays.
* Both JSON objects and JSON-formatted strings can be loaded.
* Data is loaded where the variable matches the name attribute (for form fields), class for any tag or the **data-djload** attribute in general.

## Documentation

The documentation can be found [here](http://djsonloader.blogspot.com/).


## Examples

Using the plugin:

			$(container).djload(json,options);

It is invoked on forms, select fields or any other html container (div, nav, section, article, etc.) as a function to be called when needed, it has the following functions: 
load JSON data in its container, load options from a select , Reset the data of its container and modify the default parameters.

Loading a form, obtaining json data using Ajax or other means:

			$("#myform").djload(data);

Loading a form, specifying a function that is executed at the end of data loading:

			$("#myform").djload(data,{
				onLoad:function($container){
					$container.find('select').trigger('chosen:updated');
				}
			});
			

Loading a form, resetting the data before loading:

			$("#myform").djload(data,{
				Reset:true
				}
			});

Example of valid json data:

			var data= {
				firstname:"David",
				lastname:"Jerez",
				age:25,
				sex:"M",
				notify:true,
				obs:"pending certification",
				languages:[1,4,6],
				lastpost:"DJsonLoader!",
				accessdata:{
					login:"admin",
					password:"123",
					idrole:3
				}
			};

Load the options of a select, using data from an array:
	
			//simple
			var levels='["A","B","C","D"]';
			
			$("#levels").djload(levels);
		
			//object
			var fruits=[{id:1,name:"banana",last:false},
					{id:2,name:"pineapple",last:true},
					{id:3,name:"lemon",last:false}];
					
			$("#fruits").djload(fruits,{
				slabel:'name',
				svalue:'id',
				sselected:'last'
			});


You can find html examples on DJsonLoader download.

## Author

The DJsonLoader jquery plugin is written by David Esneyder Jerez Garnica.
[Email](mailto:esneyderg357@gmail.com)

## License

Copyright (c) 2017 David Esneyder Jerez Garnica.
Released under the GPL v3 license.

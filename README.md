## DJsonLoader-jQuery json loader plugin

Version 1.1.0

DJsonLoader is a jquery plugin for loading data in JSON format in forms,select options or other HTML tags, the data can be downloaded whit AJAX(v1.1.0),
in addition the data can be loaded in any form field or other tag(input, select, textarea, a, img, p, span, iframe, ul, ol), simply, quickly and flexibly.

It has other features like:
* JSON data can be downloaded whit AJAX(v1.1.0).
* Embedded object data can be loaded into other and simple arrays.
* Reset forms and other HTML containers.
* Options can be loaded to select tags from simple arrays or objects with multiple configurable options.
* You can customize data attributes when loading select.
* You can load all kinds of tags like the src of img, iframe, etc. Or href for links.
* List elements (ol, ul) can be loaded from simple arrays.
* Both JSON objects and JSON-formatted strings can be loaded.
* Data is loaded where the variable matches the name attribute (for form fields), class for any tag or the **data-djload** attribute in general.

## Documentation

The documentation can be found [here](http://djsonloader.blogspot.com/).

[Git Repository](https://github.com/esneyderg357/DJsonLoader.git).


## Examples

Using the plugin:

			$(container).djload(json,options);

It is invoked on forms, select fields or any other html container (div, nav, section, article, etc.) as a function to be called when needed, it has the following functions: 
load JSON data in its container, load options from a select , Reset the data of its container and modify the default parameters.

Loading a form, using json data:

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

Load html using ajax(v1.1.0):

			$('#ajaxform').djload({},{
	    			ajax:true,
	    			method: 'get',
	    			url:'https://jsonplaceholder.typicode.com/users/1',
	    			onError: function(result){
			        	alert('Error on load ajax data!');
	    			}
	    	});
	    	
Load select options using ajax(v1.1.0):	 
   	
				$('#ajaxselect').djload({},{
	    			ajax:true,
	    			url:'https://jsonplaceholder.typicode.com/users',
	    			svalue:'id',
	    			slabel:'name',
	    			Adata:[email,phone],
	    			onError: function(result){
			        	alert('Error on load ajax data!');
	    			}
	    		});

You can find html examples on DJsonLoader download.

## Author

The DJsonLoader jquery plugin is written by David Esneyder Jerez Garnica.
[Email](mailto:esneyderg357@gmail.com)

## License

Copyright (c) 2019 David Esneyder Jerez Garnica.
Released under the GPL v3 license.

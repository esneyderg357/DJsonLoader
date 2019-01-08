/*
 *DJsonLoader v1.1.0
 *
 * Copyright (C) 2019 David Esneyder Jerez Garnica
 * Contact: esneyderg357@gmail.com
 * https://github.com/esneyderg357/DJsonLoader.git
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * See the GNU General Public license <http://www.gnu.org/licenses/gpl-3.0.html>.
 */
if (typeof jQuery==='undefined'){throw new Error('DJsonLoader requires jQuery 1.11.1 or higher.');}

(function ($){
	
	var defaults={
		reset: false,
		resetString:'',
		slabel:'',
		svalue:'',
		sselected:'',
		sempty:false,
		selabel:'select an option...',
		sevalue: '',
		Adata:[],
		ajax:false,
		url:'',
		data:{},
		method:'post',
		onLoad:function(){},
		onReset:function(){},
		onError:function(){}
	};
	
	function load($field,value){
		if(!Array.isArray(value))value=String(value);
		var tag=$field.prop('tagName');
		switch(tag.toLowerCase()){
			case 'input':
				var type=$field.attr('type').toLowerCase();
				switch(type){
					case 'radio':
						if($field.val()==value)$field.prop('checked','checked');
						break;
					case 'checkbox':
						if(value==true||value=='true')$field.prop('checked','checked');
						else $field.removeAttr('checked');
						break;
					default:
						$field.val(value);
				}
				break;
			case 'textarea':
			case 'select':
				$field.val(value);
				break;
			case 'a':
				$field.attr('href',value);
				break;
			case 'img':
			case 'iframe':
				$field.attr('src',value);
				break;
			case 'ul':
			case 'ol':
				var list='';
				if(Array.isArray(value)&&value.length>0){
					for(var i=0;i<value.length;i++){
						list+='<li>'+value[i]+'</li>';
					}
				}
				else list+='<li>'+value+'</li>';
				$field.html(list);
				break;
			default:
				$field.html(value);
		}
	}
	
	function loadSelect($select,data,properties){
		if(!Array.isArray(data))throw new Error("Data required for load select must be array.");
		var opts='';
		if(properties.sempty==true){
			opts+='<option value="'+properties.sevalue+'" selected>'+properties.selabel+'</option>';
		}
		if(data.length>0){
			if(typeof(data[0])=='object'){
				var verif=properties.sselected!='';
				for(var i=0;i<data.length;i++){
					var sel=verif&&data[i][properties.sselected]?' selected ':'';
					var dataAttributes='';
					for(var j=0;j<properties.Adata.length;j++){
						dataAttributes+=' data-'+properties.Adata[j]+'="'+data[i][properties.Adata[j]]+'" ';
					}
					opts+='<option value="'+data[i][properties.svalue]+'" '+dataAttributes+sel+' >'+data[i][properties.slabel]+'</option>';
				}
			}
			else {
				for(var i=0;i<data.length;i++){
					opts+='<option value="'+data[i]+'">'+data[i]+'</option>';
				}
			}
			
		}
		$select.html(opts);
	}
	
	function ajaxData(options,v){
		var prop=$.extend({},defaults,options);
		$.ajax({
	        url: prop.url,
	        type: prop.method,
	        dataType: 'json',
	        data: prop.data,
	        cache: false
	    }).done(function(resp){
	    	setData(prop,v,resp.data);
	    }).fail(function(resp) {
	    	console.log("ajax load error.");
	    	prop.onError(resp);
	    });
	}
	
	function explore($container,json){
		if(json!=null&&json!=undefined){
			$.each(json,function(key,value){
				var type=typeof(value);
				var array=Array.isArray(value);
				if(type=='object'&&!array){
					explore($container,value);
				}
				else {
					var $fields=$container.find("[name='"+key+"']")
							.add($container.find("."+key))
							.add($container.find("[data-djload='"+key+"']"));
					for(var i=0;i<$fields.length;i++){
						load($($fields[i]),value);
					}
				}
			});
		}
	}
	
	function reset($container,tag,properties){
		if(tag=='select'){
			$container.html('');
			properties.onReset($container);
			return;
		}
		if(tag=='form'){
			$container[0].reset();
		}
		var $fields=$container.find("[data-djload]");
		for(var i=0;i<$fields.length;i++){
			var $field=$($fields[i]);
			var tag=$field.prop('tagName');
			switch(tag.toLowerCase()){
				case 'input':
				case 'textarea':
				case 'select':
					$field.val('');
					break;
				case 'a':
					$field.attr('href','#');
					break;
				case 'img':
				case 'iframe':
					$field.attr('src','');
					break;
				default:
					$field.html(properties.resetString);
			}
		}
		properties.onReset($container);
	}
	
	function setData(prop,v,json){
		var $container=$(v);
		var tag=$container.prop('tagName').toLowerCase();
		if(typeof(json)=='string'){
			json=JSON.parse(json);
		}
		if(prop.reset==true){
			reset($container,tag,prop);
		}
		if(tag=='select'){
			loadSelect($container,json,prop);
		}
		else {
    		explore($container,json);
		}
		prop.onLoad($container);
	}
	
	$.fn.djload=function(json,options) {
		var prop=$.extend({},defaults,options);
		if(json=='reset'){
			return this.each(function(k,v){
				var $container=$(v);
				var tag=$container.prop('tagName').toLowerCase();
				reset($(v),tag,prop);
			});
		}
		
		else if(json=='options'){
			$.extend(defaults,options);
		}
		
		else return this.each(function(k,v){
				if(prop.ajax){
					ajaxData(prop,v);
				}
				else {
					setData(prop,v,json);
				}
	    	});
    };
	
}(jQuery));
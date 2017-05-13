/*
 *DJsonLoader v1.0.0
 *
 * Copyright (C) 2017 David Esneyder Jerez Garnica
 * Contact: esneyderg357@gmail.com
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
if("undefined"==typeof jQuery)throw new Error("DJsonLoader requires jQuery 1.8 or higher.");!function(a){function c(a,b,c){if(!Array.isArray(b))throw new Error("Data required for load select must be array.");var d="";if(1==c.sempty&&(d+='<option value="'+c.sevalue+'" selected>'+c.selabel+"</option>"),b.length>0)if("object"==typeof b[0])for(var e=""!=c.sselected,f=0;f<b.length;f++){var g=e&&b[f][c.sselected]?" selected ":"";d+='<option value="'+b[f][c.svalue]+'" '+g+" >"+b[f][c.slabel]+"</option>"}else for(var f=0;f<b.length;f++)d+='<option value="'+b[f]+'">'+b[f]+"</option>";a.html(d)}function d(a,b){switch(a.prop("tagName").toLowerCase()){case"input":switch(a.attr("type").toLowerCase()){case"radio":a.val()==b&&a.prop("checked","checked");break;case"checkbox":1==b||"true"==b?a.prop("checked","checked"):a.removeAttr("checked");break;default:a.val(b)}break;case"textarea":case"select":a.val(b);break;case"a":a.attr("href",b);break;case"img":case"iframe":a.attr("src",b);break;case"ul":case"ol":var e="";if(Array.isArray(b)&&b.length>0)for(var f=0;f<b.length;f++)e+="<li>"+b[f]+"</li>";else e+="<li>"+val+"</li>";a.html(e);break;default:a.html(b)}}function e(b,c){a.each(c,function(c,f){var g=typeof f,h=Array.isArray(f);if("object"!=g||h)for(var i=b.find("[name='"+c+"']").add(b.find("."+c)).add(b.find("[data-djload='"+c+"']")),j=0;j<i.length;j++)d(a(i[j]),f);else e(b,f)})}function f(b,c,d){if("select"==c)return b.html(""),void d.onReset(b);"form"==c&&b[0].reset();for(var e=b.find("[data-djload]"),f=0;f<e.length;f++){var g=a(e[f]),c=g.prop("tagName");switch(c.toLowerCase()){case"input":case"textarea":case"select":g.val("");break;case"a":g.attr("href","#");break;case"img":case"iframe":g.attr("src","");break;default:g.html(d.resetString)}}d.onReset(b)}var b={reset:!1,resetString:"",slabel:"",svalue:"",sselected:"",sempty:!1,selabel:"select an option...",sevalue:"",onLoad:function(){},onReset:function(){}};a.fn.djload=function(d,g){var h=a.extend({},b,g);return"reset"==d?this.each(function(b,c){var d=a(c),e=d.prop("tagName").toLowerCase();f(a(c),e,h)}):"options"!=d?this.each(function(b,g){var i=a(g),j=i.prop("tagName").toLowerCase();"string"==typeof d&&(d=JSON.parse(d)),1==h.reset&&f(i,j,h),"select"==j?c(i,d,h):e(i,d),h.onLoad(i)}):void a.extend(b,g)}}(jQuery);
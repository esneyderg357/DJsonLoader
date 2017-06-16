/*
 *DJsonLoader v1.0.2
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
if("undefined"==typeof jQuery)throw new Error("DJsonLoader requires jQuery 1.8 or higher.");!function(e){function a(e,a,t){if(!Array.isArray(a))throw new Error("Data required for load select must be array.");var r="";if(1==t.sempty&&(r+='<option value="'+t.sevalue+'" selected>'+t.selabel+"</option>"),a.length>0)if("object"==typeof a[0])for(var o=""!=t.sselected,s=0;s<a.length;s++){var n=o&&a[s][t.sselected]?" selected ":"";r+='<option value="'+a[s][t.svalue]+'" '+n+" >"+a[s][t.slabel]+"</option>"}else for(s=0;s<a.length;s++)r+='<option value="'+a[s]+'">'+a[s]+"</option>";e.html(r)}function t(e,a){switch(a=String(a),e.prop("tagName").toLowerCase()){case"input":switch(e.attr("type").toLowerCase()){case"radio":e.val()==a&&e.prop("checked","checked");break;case"checkbox":1==a||"true"==a?e.prop("checked","checked"):e.removeAttr("checked");break;default:e.val(a)}break;case"textarea":case"select":e.val(a);break;case"a":e.attr("href",a);break;case"img":case"iframe":e.attr("src",a);break;case"ul":case"ol":var t="";if(Array.isArray(a)&&a.length>0)for(var r=0;r<a.length;r++)t+="<li>"+a[r]+"</li>";else t+="<li>"+val+"</li>";e.html(t);break;default:e.html(a)}}function r(a,o){null!=o&&void 0!=o&&e.each(o,function(o,s){var n=typeof s,l=Array.isArray(s);if("object"!=n||l)for(var c=a.find("[name='"+o+"']").add(a.find("."+o)).add(a.find("[data-djload='"+o+"']")),i=0;i<c.length;i++)t(e(c[i]),s);else r(a,s)})}function o(a,t,r){if("select"==t)return a.html(""),void r.onReset(a);"form"==t&&a[0].reset();for(var o=a.find("[data-djload]"),s=0;s<o.length;s++){var n=e(o[s]);switch((t=n.prop("tagName")).toLowerCase()){case"input":case"textarea":case"select":n.val("");break;case"a":n.attr("href","#");break;case"img":case"iframe":n.attr("src","");break;default:n.html(r.resetString)}}r.onReset(a)}var s={reset:!1,resetString:"",slabel:"",svalue:"",sselected:"",sempty:!1,selabel:"select an option...",sevalue:"",onLoad:function(){},onReset:function(){}};e.fn.djload=function(t,n){var l=e.extend({},s,n);return"reset"==t?this.each(function(a,t){var r=e(t).prop("tagName").toLowerCase();o(e(t),r,l)}):"options"!=t?this.each(function(s,n){var c=e(n),i=c.prop("tagName").toLowerCase();"string"==typeof t&&(t=JSON.parse(t)),1==l.reset&&o(c,i,l),"select"==i?a(c,t,l):r(c,t),l.onLoad(c)}):void e.extend(s,n)}}(jQuery);
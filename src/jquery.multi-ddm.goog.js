/*
 * Multi-level Drop Down Menu [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 *
 * Credit to Shaun Johnson for pointing out the Prototype confliction, and IE6 bgiframe fix
 */
(function(a,k,i){a.fn.reverse=[]._reverse||[].reverse;a.fn.bgiframe=a.fn.bgiframe?a.fn.bgiframe:a.fn.bgIframe?a.fn.bgIframe:function(){return this};a.fn.dropDownMenu=function(l){return this.each(function(){function j(){g.find("li").each(function(){var d=a(this);d.children("a").removeClass(d.data("multi-ddm-classname"))});g.find("ul:visible").reverse().hide();h&&clearTimeout(h)}var g=a(this),e,h,f,b=a.extend({timer:500,allowSniff:true,parentMO:i,childMO:i,levels:[],numberOfLevels:5},l||{},a.metadata?
g.metadata():{});if(b.levels.length)b.numberOfLevels=b.levels.length;else{b.levels[0]=b.parentMO?b.parentMO:b.childMO;f=0;for(e=b.numberOfLevels+1;++f<e;)b.levels[f]=b.childMO}for(e=g.children("li").data({"multi-ddm-classname":b.levels[f=0],"multi-ddm-firstlevel":true});b.levels[++f];){e=e.find("> ul > li").data("multi-ddm-classname",b.levels[f]);if(e.length===0)break}g.delegate("li","mouseenter.multi-ddm",function(){var d=a(this);h&&clearTimeout(h);d.siblings("li").find("ul:visible").reverse().each(function(){a(this).hide();
var c=a(this).parent();c.children("a").removeClass(c.data("multi-ddm-classname"))}).end().each(function(){var c=a(this);c.children("a").removeClass(c.data("multi-ddm-classname"))});d.children("a").addClass(d.data("multi-ddm-classname")).siblings("ul").bgiframe().show().children("li").each(function(){var c=a(this);c.children("a").removeClass(c.data("multi-ddm-classname"))})}).bind("mouseleave.multi-ddm",function(){h=setTimeout(j,b.timer)});a(k.document||{}).bind("click.multi-ddm",j)})}})(jQuery,window||
this);

/*!
 * Multi-level Drop Down Menu [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 *
 * Credit to Shaun Johnson for pointing out the Prototype confliction, and IE6 bgiframe fix
 */ 
(function(a,k){a.fn.reverse=[]._reverse||[].reverse;a.fn.bgiframe=a.fn.bgiframe?a.fn.bgiframe:a.fn.bgIframe?a.fn.bgIframe:function(){return this};a.fn.dropDownMenu=function(n){return this.each(function(){var g=a(this),h=[],l,e,i,j,b=a.extend({timer:500,parentMO:k,childMO:k,levels:[],numberOfLevels:5},n||{},a.metadata?g.metadata():{});if(b.levels.length)b.numberOfLevels=b.levels.length;else{b.levels[0]=b.parentMO?b.parentMO:b.childMO;for(var c=1;c<b.numberOfLevels+1;c++)b.levels[c]=b.childMO}h[0]=
g.children("li");for(c=1;c<b.numberOfLevels+1;c++){l=b.levels[c-1];h[c]=h[c-1].children("ul").children("li");h[c-1].bind("mouseover.multi-ddm",function(){i=a(this);j=i.children("a");e&&clearTimeout(e);a("a",i.siblings("li")).each(function(){var d=a(this),f=d.data("classname");d.hasClass(f)&&d.removeClass(f)});i.siblings("li").find("ul:visible").reverse().hide();j.addClass(j.data("classname")).siblings("ul").bgiframe().show()}).bind("mouseout.multi-ddm",function(){if(a(this).children("a").data("classname")==
b.levels[0])e=setTimeout(m,b.timer)}).children("a").data("classname",l)}a(document).click(m);function m(){a("a",g).each(function(){var d=a(this),f=d.data("classname");d.hasClass(f)&&d.removeClass(f)});a("ul:visible",g).reverse().hide();e&&clearTimeout(e)}})}})(jQuery);

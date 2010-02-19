/*!
 * Multi-level Drop Down Menu [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 *
 * Credit to Shaun Johnson for pointing out the Prototype confliction, and IE6 bgiframe fix
 */ 
;(function($, undefined){
	// Needed for IE Compatibility (Closing menus must be done backwards in IE)
	// Ensure that no complications arise from other libraries modifiying the 
	// array functionality (and hope that they store the old reverse function into _reverse)
	$.fn.reverse = []._reverse||[].reverse;

	// bgiframe is needed to fix z-index problem for IE6 users.
	$.fn.bgiframe = $.fn.bgiframe ? $.fn.bgiframe : $.fn.bgIframe ? $.fn.bgIframe : function(){
		// For applications that don't have bgiframe plugin installed, create a useless 
		// function that doesn't break the chain
		return this;
	};

	// Store check for ie6
	var MSIE6 = !!(/msie 6/.exec(navigator.userAgent.toLowerCase()) && !window.opera);

	// Drop Down Plugin
	$.fn.dropDownMenu = function(options){
		return this.each(function(){
			// Defaults with metadata support
			var $mainObj = $(this), menus = [], classname, timeout, $obj, $obj2,
				settings = $.extend({
					timer: 500,
					allowSniff: true,
					ie6: 'ie6',
					ie6li: 'ie6li',
					parentMO: undefined,
					childMO: undefined,
					levels: [],
					numberOfLevels: 5
				}, options||{}, $.metadata ? $mainObj.metadata() : {}),
				ie6 = settings.allowSniff ? MSIE6 : false;
	
			// Set number of levels
			if (settings.levels.length){
				settings.numberOfLevels = settings.levels.length;
			}else{
				settings.levels[0] = settings.parentMO ? settings.parentMO : settings.childMO;
				for (var i=1, length=settings.numberOfLevels+1; i<length; i++)
					settings.levels[i] = settings.childMO;
			}

			// Hack for ie6 detection (for the stylesheets)
			// While browser sniffing is considered bad practice, this is purely for
			// css manipulation, and one that only occurs in ie6
			if (ie6) $mainObj.addClass(settings.ie6);

			// Run through each level
			menus[0] = $mainObj.children('li');
			for (var i=1, length=settings.numberOfLevels+1; i<length; i++){
				// Set Vars
				classname = settings.levels[i-1];
				menus[i] = menus[i-1].children('ul').children('li');
	
				// Action
				menus[i-1].bind('mouseover.multi-ddm', function(){
					// Defaults
					$obj = $(this); $a = $obj.children('a');
	
					// Clear closing timer if open
					if (timeout) 
						clearTimeout(timeout);
	
					// Remove all mouseover classes
					$('a', $obj.siblings('li')).each(function(){
						var $elem = $(this), classname = $elem.data('classname');
						if ($elem.hasClass(classname))
							$elem.removeClass(''+classname);
					});
	
					// Hide open menus and open current menu
					$obj.siblings('li').find('ul:visible').reverse().hide();
					$a.addClass( '' + $a.data('classname') ).siblings('ul').bgiframe().show();
					// Spacing issue in ie6
					if (ie6) $obj.next('li').addClass( settings.ie6li );
				}).bind('mouseout.multi-ddm', function(){
					var $obj = $(this);
					if ($obj.children('a').data('classname') == settings.levels[0])
						timeout = setTimeout(closemenu, settings.timer);
					// Spacing issue in ie6
					if (ie6) $obj.next('li').addClass( settings.ie6li );
				}).children('a').data('classname', classname);
			}
	
			// Allows user option to close menus by clicking outside the menu on the body
			$(document).bind('click.multi-ddm', closemenu);
	
			// Closes all open menus
			function closemenu(){
				// Clear mouseovers
				$mainObj.find('a').each(function(){
					var $a = $(this), classname = $a.data('classname');
					if ($a.hasClass(classname))
						$a.removeClass(''+classname);
				});

				// Close Menus backwards for IE Compatibility
				$mainObj.find('ul:visible').reverse().hide();

				// Clear timer var
				if (timeout) clearTimeout(timeout);
			}
		});
	};
})(jQuery);

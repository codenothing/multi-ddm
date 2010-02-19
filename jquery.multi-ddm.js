/**
 * Multi-level Drop Down Menu 2.0
 * August 22, 2009
 * Corey Hart @ http://www.codenothing.com
 */ 
;(function($){
	// Needed for IE Compatibility
	$.fn.reverse = [].reverse;

	$.fn.dropDownMenu = function(options){
		return this.each(function(){
			// Defaults with metadata support
			var $mainObj = $(this), menus = [], classname, timeout, $obj, $obj2, 
				settings = $.extend({
					timer: 500,
					parentMO: null,
					childMO: null,
					levels: [],
					numberOfLevels: 5
				}, options||{}, $.metadata ? $mainObj.metadata() : {});
	
			// Set number of levels
			if (settings.levels.length){
				settings.numberOfLevels = settings.levels.length;
			}else{
				settings.levels[0] = settings.parentMO ? settings.parentMO : settings.childMO;
				for (var i=1; i<settings.numberOfLevels+1; i++)
					settings.levels[i] = settings.childMO;
			}
	
			// Run through each level
			menus[0] = $mainObj.children('li');
			for (var i=1; i<settings.numberOfLevels+1; i++){
				// Set Vars
				classname = settings.levels[i-1];
				menus[i] = menus[i-1].children('ul').children('li');
	
				// Action
				menus[i-1].mouseover(function(){
					// Defaults
					$obj = $(this); $obj2 = $obj.children('a');
	
					// Clear closing timer if open
					if (timeout) 
						clearTimeout(timeout);
	
					// Remove all mouseover classes
					$('a', $obj.siblings('li')).each(function(){
						var $a = $(this), classname = $a.data('classname');
						if ($a.hasClass(classname))
							$a.removeClass(classname);
					});
	
					// Hide open menus and open current menu
					$obj.siblings('li').find('ul:visible').reverse().hide();
					$obj2.addClass( $obj2.data('classname') ).siblings('ul').show();
				}).mouseout(function(){
					if ($(this).children('a').data('classname') == settings.levels[0])
						timeout = setTimeout(closemenu, settings.timer);
				}).children('a').data('classname', classname);
			}
	
			// Allows user option to close menus by clicking outside the menu on the body
			$(document).click(closemenu);
	
			// Closes all open menus
			function closemenu(){
				// Clear mouseovers
				$('a', $mainObj).each(function(){
					var $a = $(this), classname = $a.data('classname');
					if ($a.hasClass(classname))
						$a.removeClass(classname);
				});

				// Close Menus backwards for IE Compatibility
				$('ul:visible', $mainObj).reverse().hide();

				// Clear timer var
				if (timeout) 
					clearTimeout(timeout);
			}
		});
	};
})(jQuery);

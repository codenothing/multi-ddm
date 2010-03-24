/*!
 * Multi-level Drop Down Menu [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 *
 * Credit to Shaun Johnson for pointing out the Prototype confliction, and IE6 bgiframe fix
 */ 
(function( $, window, undefined ){
	// Needed for IE Compatibility (Closing menus must be done backwards in IE)
	// Ensure that no complications arise from other libraries modifiying the 
	// array functionality (and hope that they store the old reverse function into _reverse)
	$.fn.reverse = []._reverse || [].reverse;

	// bgiframe is needed to fix z-index problem for IE6 users.
	$.fn.bgiframe = $.fn.bgiframe ? $.fn.bgiframe : $.fn.bgIframe ? $.fn.bgIframe : function(){
		// For applications that don't have bgiframe plugin installed, create a useless 
		// function that doesn't break the chain
		return this;
	};

	// Drop Down Plugin
	$.fn.dropDownMenu = function(options){
		return this.each(function(){
			// Defaults with metadata support
			var $main = $(this), $menu, $li, timeout, i , l,
				settings = $.extend({
					timer: 500,
					allowSniff: true,
					parentMO: undefined,
					childMO: undefined,
					levels: [],
					numberOfLevels: 5
				}, options||{}, $.metadata ? $main.metadata() : {});
	
			// Set number of levels
			if ( settings.levels.length ) {
				settings.numberOfLevels = settings.levels.length;
			}
			else {
				settings.levels[0] = settings.parentMO ? settings.parentMO : settings.childMO;
				for ( i = 0, l = settings.numberOfLevels+1; ++i < l ; ) {
					settings.levels[i] = settings.childMO;
				}
			}

			// Store each levels data on the wrapper li
			$menu = $main.children('li').data({
				'multi-ddm-classname': settings.levels[ ( i = 0 ) ],
				'multi-ddm-firstlevel': true
			});

			// Loop through each level and store it's classname
			while ( settings.levels[ ++i ] ) {
				$menu = $menu.find('> ul > li').data( 'multi-ddm-classname', settings.levels[i] );

				// Sanity Check
				if ( $menu.length === 0) {
					break;
				}
			}

			$main.delegate('li', 'mouseenter.multi-ddm', function(){
				var self = $(this);

				if ( timeout ) {
					clearTimeout( timeout );
				}

				// Close old menus
				self.siblings('li').find('ul:visible').reverse().each(function(){
					var $ul = $(this).hide(), $li = $(this).parent();
					$li.children('a').removeClass( $li.data('multi-ddm-classname') );
				})
				// Remove hover of non-menus
				.end().each(function(){
					var $li = $(this);
					$li.children('a').removeClass( $li.data('multi-ddm-classname') );
				});

				// Open new menu
				self.children('a').addClass( self.data( 'multi-ddm-classname' ) )
					.siblings('ul').bgiframe().show()
					// Remove any lingering hover elements
					// TODO: There has to be a better way than this
					.children('li').each(function(){
						var $li = $(this);
						$li.children('a').removeClass( $li.data('multi-ddm-classname') );
					});
			})
			.bind('mouseleave.multi-ddm', function(){
				timeout = setTimeout( closemenu, settings.timer );
			});
	
			// Closes all open menus
			function closemenu(){
				// Clear mouseovers
				$main.find('li').each(function(){
					var $li = $(this);
					$li.children('a').removeClass( $li.data('multi-ddm-classname') );
				});

				// Close Menus backwards for IE Compatibility
				$main.find('ul:visible').reverse().hide();

				// Clear timer var
				if ( timeout ) {
					clearTimeout( timeout );
				}
			}
			
			// Allows user option to close menus by clicking outside the menu on the body
			$( window.document || {} ).bind( 'click.multi-ddm', closemenu );
		});
	};
})( jQuery, window || this );

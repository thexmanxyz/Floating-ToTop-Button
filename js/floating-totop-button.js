(function( $ ) {
	var btnClass = 'to-top-button';
	var imgClass = 'arrow-img';
	
	// append callback click events
	function addClickEvents(opts){
		var selector = opts.clickSelectors.join(',');
		selector = opts.clickSelectors.length > 0 ? ',' + selector : '';
		$('a.' + btnClass + selector).click(opts.animateScroll.bind(opts,opts));
	}
	
	// append callback scroll event
	function addScrollEvent(opts){
		$(window).scroll(opts.fadeScroll.bind(opts, opts));
	}
	
	// add button to DOM
	function appendButton(that, opts){
		var imgPath = opts.imagePath + '/' + opts.arrowType + '.svg';
		var opClass = 'op-' + opts.opacity;
		var shClass = 'sh-' + opts.shape;
		var bpClass = 'bp-' + opts.position;
		var bmClass = 'bm-' + opts.margin;
		var pClass = 'p-' + opts.palette.toLowerCase();
		var szClass = 'sz-' + opts.size;
		var bsClass = 'bo-' + opts.border.size;
		var imgCClasses = opts.imgClasses.join(' ');
		var linkCClasses = opts.linkClasses.join(' ');
		var linkClasses = '';
		var imgClasses = '';
		var linkStyle = '';
		
		// build styles 
		if(opts.border.color != '' || opts.backgroundColor != ''){
			var boColor = 'border-color:' + opts.border.color;
			var bgColor = 'background-color:' + opts.backgroundColor;
			linkStyle = ' style="' + bgColor + ';' + boColor + '"';
		}
		
		// build custom classes 
		imgCClasses = imgCClasses.length > 0 ? imgCClasses + ' ' : imgCClasses;
		linkCClasses = linkCClasses.length > 0 ? linkCClasses + ' ' : linkCClasses;
		
		// build link and image classes
		linkClasses = btnClass + ' ' + opClass + ' ' + shClass + ' ' + bpClass + ' ' + bmClass + ' ' 
			+ pClass + ' ' + szClass + ' ' + bsClass + linkCClasses;
		imgClasses = imgClass + ' ' + opts.arrowType + '-img' + imgCClasses;
		
		// append to DOM
		$(that).prepend('<a href="#" class="' + linkClasses + '"' + linkStyle + '><img src="' + imgPath + '" class="' + imgClasses + '"></a>');
	}
    
	// append button and create events
	$.fn.toTopButton = function(options) {
		var opts = $.extend({}, $.fn.toTopButton.defaults, options);

		appendButton(this, opts);
		addScrollEvent(opts);
		addClickEvents(opts);
    };
	
	
	// default values
    $.fn.toTopButton.defaults = {
		imagePath: './img',
		arrowType: 'arrow',			//arrow, arrow-circle, caret, caret-circle, circle, circle-o, arrow-l, drop, rise, top
		scrollTrigger: 300,
		animationTime: 700,
		opacity: 20,				//0-1.00
		shape: 10,					//0-10 (0-50%)
		margin: 2,					//0-10 (0-100px)
		palette: 'transparent',  	//CSS default color names (any case)
		backgroundColor: '',        //color hex
		border : { size: 2, 		//0-3 (0 - 3px)
				   color: ''},      //color hex
		position: 'br',  			//tl = top-left, tr = top-right, bl = bottom-left, br = bottom-right
		size: 4,  					//1-6 (30-80px)
		fadeInSpeed: 'fast',
		fadeOutSpeed: 'fast',
		linkClasses: [],
		imgClasses: [],
		clickSelectors: [],
		
		// scroll animation method - can be user customized
		animateScroll: function(opts){
			$('html, body').animate({scrollTop: 0}, opts.animationTime);
			return false;
		},
		
		// fade scroll method - can be user customized
		fadeScroll: function(opts) {
			if($(window).scrollTop() > opts.scrollTrigger) {
				$('a.' + btnClass).fadeIn(opts.fadeInSpeed);
			}else{
				$('a.' + btnClass).fadeOut(opts.fadeOutSpeed);
			}
		}
	};
 
})( jQuery );

// attach plugin to body
$("body").toTopButton({clickSelectors: ['a.to-top-btm-button']});
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
        var opClass = ' op-' + opts.opacity;
        var shClass = ' sh-' + opts.shape;
        var bpClass = ' bp-' + opts.position;
        var bmClass = ' bm-' + opts.margin;
        var szClass = ' sz-' + opts.size;
        var bwClass = ' bw-' + opts.border.width;
        var filterClass = '';
        var hideClass = '';
        var isClass = '';
        var bsClass = '';
        var pClass = '';
        
        var imgCClasses = opts.imgClasses.join(' ');
        var linkCClasses = opts.linkClasses.join(' ');
        var linkClasses = '';
        var imgClasses = '';
        
        var linkStyle = '';
        var imgPath = '';
        var iconColor = '';
        
        // determine icon color
        iconColor = opts.iconColor == 'b' ? 'b' : 'w';
        
        // image path
        imgPath = opts.imagePath + '/' + iconColor + '/' + opts.arrowType + '.svg';
        
        // border
        bwClass = bwClass + iconColor;
        
        // shadows
        if(opts.iconShadow != '')
            isClass = ' is-' + opts.iconShadow ;
        
        if(opts.btnShadow != '')
            bsClass = ' bs-' + opts.btnShadow;
        
        // palette
        if(opts.palette != '')
            pClass = ' p-' + opts.palette.toLowerCase();
        
        // auto hide
        if(opts.autoHide)
            hideClass = ' hide';
        
        // filter
        if(opts.filter)
            filterClass = ' filter';
            
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
        linkClasses = btnClass + opClass + shClass + bpClass +  bmClass + pClass + szClass 
                    + bwClass + bsClass + hideClass + filterClass + linkCClasses;
                    
        imgClasses = imgClass + isClass + ' ' + opts.arrowType + '-img' + imgCClasses;
        
        // append to DOM
        $(that).prepend('<a href="#" class="' + linkClasses + '"' + linkStyle 
                        + '><img src="' + imgPath + '" class="' + imgClasses + '"></a>');
    }
    
    // append button and create events
    $.fn.toTopButton = function(options) {
        var opts = $.extend({}, $.fn.toTopButton.defaults, options);

        appendButton(this, opts);
        addScrollEvent(opts);
        addClickEvents(opts);
    };
    
    
   /* default values
    *
    * imagePath: base path of the icon files
    * arrowType: 'arrow', 'arrow-circle', 'caret', 'caret-circle', 'circle', 'circle-o', 'arrow-l', 'drop', 'rise', 'top'
    * scrollTrigger: scroll amount in pixel to trigger the button if autoHide is off
    * animationTime: animation time when scrolling to top
    * opacity: opacity values 0-20 (0-1.00)
    * shape: button shape with the values 0-10 (0-50%) - border radius
    * margin: margin of the button, with the values 0-10 (0-100px)
    * palette: default color palettes (CSS color names can be used in lower case)
    * iconColor: icon color either black or white ('b' or 'w')
    * backgroundColor: hex value of background color
    * border.width:  border width with values 0-3 (0 - 3px)
    * border.color: hex value of border color
    * position: tl = top-left, tr = top-right, bl = bottom-left, br = bottom-right
    * size: different button sizes, values 1-6 (30-80px)
    * fadeInSpeed: speed for fade in, "fast" or "slow"
    * fadeOutSpeed: speed for fade out, "fast" or "slow"
    * iconShadow: values 1-16 for different stylings
    * btnShadow: values 1-5 for different stylings
    * autoHide: if enabled the button will automatically hide depending on the scrollTrigger
    * filter: defines whether CSS filter should be used instead of the default color rollover (be aware of browser support)
    * linkClasses: array of link classes
    * imgClasses: array of image classes
    * clickSelectors: additional selectors for the click event
    * animateScroll: function for scroll animation
    * fadeScroll function for scroll button fading
    *
    */
    $.fn.toTopButton.defaults = {
        imagePath: './img/icons',
        arrowType: 'arrow', //
        scrollTrigger: 300,
        animationTime: 700,
        opacity: 20,
        shape: 10,
        margin: 2,
        palette: '',
        iconColor: 'w',
        backgroundColor: '',
        border : { 
            width: 0,
            color: ''
        },
        position: 'br',
        size: 4,
        fadeInSpeed: 'fast',
        fadeOutSpeed: 'fast',
        iconShadow: 4,
        btnShadow: 2,
        autoHide: true,
        filter: true,
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
            var btn = $('a.' + btnClass);
            if(opts.autoHide){
                if($(window).scrollTop() > opts.scrollTrigger) {
                    if(!$(btn).is(':visible'))
                        $(btn).fadeIn(opts.fadeInSpeed);
                }else{
                    if($(btn).is(':visible'))
                        $(btn).fadeOut(opts.fadeOutSpeed);
                }
            }
        }
    };
 
})( jQuery );

// attach plugin to body
$("body").toTopButton({clickSelectors: ['a.to-top-btm-button']});
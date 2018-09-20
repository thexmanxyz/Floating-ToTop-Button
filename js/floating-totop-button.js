/******************************************************
*                                                     *
*   Floating ToTop Button - jQuery Plugin             *
*                                                     *
*   Purpose: This project contains a simple and       *
*            full configurable jQuery plugin which    *
*            appends a customizable floating ToTop    *
*            button to a DOM node of a HTML page.     *
*                                                     *
*   Author: Andreas Kar (thex) <andreas.kar@gmx.at>   *
*   Repository: https://git.io/fA1FW                  *
*                                                     *
******************************************************/

(function( $ ) {
    var btnClass = 'to-top-button';
    var imgClass = 'arrow-img';
    
    // helper function to determine mobile visibility
    function showMobile(opts){
        return opts.mobileHide == 0 || $(window).width() >= opts.mobileHide;
    }
    
    // helper function to determine scroll visibility
    function showScroll(opts){
        return $(window).scrollTop() >= opts.scrollTrigger
    }
        
    // append callback click events
    function addClickEvents(opts){
        var selector = opts.clickSelectors.join(',');
        selector = opts.clickSelectors.length > 0 ? ',' + selector : '';
        $('a.' + btnClass + selector).click(opts.animateScroll.bind(opts));
    }
    
    // append callback scroll event
    function addScrollEvent(opts){
        $(window).scroll(opts.fadeScroll.bind(opts));
    }
    
    // append resize hide event
    function addResizeEvent(opts){
        $(window).resize(opts.resizeHide.bind(opts));   
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
        if(opts.border.color != '' || opts.backgroundColor != '' || !showMobile(opts)){
            var boColor = 'border-color:' + opts.border.color;
            var bgColor = 'background-color:' + opts.backgroundColor;
            var display = !showMobile(opts) ? 'display:none' : '';
            linkStyle = ' style="' + bgColor + ';' + boColor + ';' + display + '"';
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
        addResizeEvent(opts);
    };
    
    
   /* default values
    *
    * imagePath: Base path for the icon files which can be changed if the default location doesn't fit your folder hierarchy.
    * arrowType: Defines the icon appearance, available default options are 'arrow', 'arrow-circle', 'caret', 'caret-circle', 'circle', 'circle-o', 'arrow-l', 'drop', 'rise', 'top'. You can also use your own SVG image. But take a look on the /img path and how black and white icons are distinguished and identified.
    * scrollTrigger: Scroll amount in pixel to trigger the button if autoHide is on.
    * animationTime: Animation time when scrolling back to top after click.
    * opacity: Opacity default value range from 0-20 (0-1.00).
    * shape: Button shape can be defined in the value range 0-10 (0-50%) - border radius.
    * margin: Margin of the button, with the value range from 0-10 (0-100px).
    * palette: Default color palette (CSS color names can be used in lower case). The additional value 'transparent' makes the button background transparent.
    * iconColor: Icon color either black or white ('b' or 'w').
    * backgroundColor: HEX or RGB(A) value for the background color.
    * border.width: Border width default values range from 0-3 (0-3px).
    * border.color: HEX or RGB(A) value for the border color.
    * position: The following four options are available: 'tl' = top-left, 'tr' = top-right, 'bl' = bottom-left, 'br' = bottom-right.
    * size: Different button sizes are available, values range from 1-6 (30-80px).
    * fadeInSpeed: Time to fade in, 'fast', 'slow' or a numerical value in milliseconds e.g. 200.
    * fadeOutSpeed: Time to fade out, 'fast', 'slow' or a numerical value in milliseconds e.g. 200.
    * iconShadow: Icon shadow values range from 1-16 for different stylings.
    * btnShadow: Button shadow values range from 1-5 for different stylings.
    * mobileHide: If the value is 0 then the button will always be shown otherwise the button will only be visible if the window width exceeds the specified pixel value.
    * autoHide: If enabled, the button will automatically hide depending on the scrollTrigger value.
    * filter: Defines whether a CSS filter should be used instead of the default color rollover (be aware of browser support).
    * linkClasses: Array of link classes in the form ['a','b','c'].
    * imgClasses: Array of images classes in the form ['d','e','f'].
    * clickSelectors: Additional selectors for the button click event in the form ['g','h','i'].
    * animateScroll: Custom function for the scroll animation (callback).
    * fadeScroll Custom function for the scroll animation (callback).
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
        mobileHide: 768,
        autoHide: true,
        filter: true,
        linkClasses: [],
        imgClasses: [],
        clickSelectors: [],
        
        // scroll animation method - can be user customized
        animateScroll: function(){
            $('html, body').animate({scrollTop: 0}, this.animationTime);
            return false;
        },
        
        // fade scroll method - can be user customized
        fadeScroll: function() {
            var btn = $('a.' + btnClass);
            if(this.autoHide && showMobile(this)){
                if(showScroll(this)) {
                    if(!$(btn).is(':visible'))
                        $(btn).fadeIn(this.fadeInSpeed);
                }else{
                    if($(btn).is(':visible'))
                        $(btn).fadeOut(this.fadeOutSpeed);
                }
            }
        },
        
        // resize hide method - can be user customized
        resizeHide: function() {
            if(showMobile(this) && showScroll(this))
                $('.' + btnClass).css('display', 'inline');
            else
                $('.' + btnClass).css('display', 'none');
        }
    };
 
})( jQuery );

// attach plugin to body, basic example
// $("body").toTopButton({});
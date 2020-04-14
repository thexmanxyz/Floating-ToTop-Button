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

    // all configurations
    var config;

    // helper function to determine mobile visibility
    function showMobile(){
        return config.mobileHide == 0 || $(window).width() >= config.mobileHide;
    }

    // helper function to determine scroll visibility
    function showScroll(){
        return $(window).scrollTop() >= config.scrollTrigger
    }

    // append callback click events
    function addClickEvents(){
        var selector = config.clickSelectors.join(',');
        selector = config.clickSelectors.length > 0 ? ',' + selector : '';
        $('a.' + config.buttonClass + selector).click(config.animateScroll.bind(config));
    }

    // append callback scroll event
    function addScrollEvent(){
        $(window).scroll(config.fadeScroll.bind(config));
    }

    // append callback resize hide event
    function addResizeEvent(){
        $(window).resize(config.resizeHide.bind(config));   
    }

    // add button to DOM
    function appendButton(that){
        var opClass = ' op-' + config.opacity;
        var shClass = ' sh-' + config.shape;
        var bpClass = ' bp-' + config.position;
        var bmClass = ' bm-' + config.margin;
        var szClass = ' sz-' + config.size;
        var bwClass = ' bw-' + config.border.width;
        var filterClass = '';
        var hideClass = '';
        var isClass = '';
        var bsClass = '';
        var pClass = '';

        var imgCClasses = config.imgClasses.join(' ');
        var linkCClasses = config.linkClasses.join(' ');
        var linkClasses = '';
        var imgClasses = '';

        var linkStyle = '';
        var imgPath = '';
        var iconColor = '';

        // determine icon color
        iconColor = config.iconColor == 'b' ? 'b' : 'w';

        // image path
        imgPath = config.imagePath + '/' + iconColor + '/' + config.arrowType + '.svg';

        // border
        bwClass = bwClass + iconColor;

        // shadows
        if(config.iconShadow != '')
            isClass = ' is-' + config.iconShadow ;

        if(config.btnShadow != '')
            bsClass = ' bs-' + config.btnShadow;

        // palette
        if(config.palette != '')
            pClass = ' p-' + config.palette.toLowerCase();

        // auto hide
        if(config.autoHide)
            hideClass = ' hide';

        // filter
        if(config.filter)
            filterClass = ' filter';

        // build styles 
        if(config.border.color != '' || config.backgroundColor != '' || !showMobile()){
            var boColor = 'border-color:' + config.border.color;
            var bgColor = 'background-color:' + config.backgroundColor;
            var display = !showMobile() ? 'display:none' : '';
            linkStyle = ' style="' + bgColor + ';' + boColor + ';' + display + '"';
        }

        // build custom classes 
        imgCClasses = imgCClasses.length > 0 ? imgCClasses + ' ' : imgCClasses;
        linkCClasses = linkCClasses.length > 0 ? linkCClasses + ' ' : linkCClasses;

        // build link and image classes
        linkClasses = config.buttonClass + opClass + shClass + bpClass +  bmClass + pClass + szClass 
                    + bwClass + bsClass + hideClass + filterClass + linkCClasses;

        imgClasses = config.imgClass + isClass + ' ' + config.arrowType + '-img' + imgCClasses;

        // append to DOM
        $(that).prepend('<a href="#" class="' + linkClasses + '"' + linkStyle 
                        + '><img src="' + imgPath + '" class="' + imgClasses + '"></a>');
    }

    // append button and create events
    $.fn.toTopButton = function(options) {
        config = $.extend(true, {}, $.fn.toTopButton.defaults, options);

        appendButton(this);
        addScrollEvent();
        addClickEvents();
        addResizeEvent();
        config.resizeHide();
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
    * buttonClass: The default class attached to the floating botton container.
    * imgClass: The class attached to the buttom image element (arrow).
    * linkClasses: Array of link classes in the form ['a','b','c'].
    * imgClasses: Array of images classes in the form ['d','e','f'].
    * clickSelectors: Additional selectors for the button click event in the form ['g','h','i'].
    * animateScroll: Function for the scroll animation (callback).
    * fadeScroll: Function for the scroll animation (callback).
    * resizeHide: Function called during resize event (callback).
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
        buttonClass: 'to-top-button',
        imgClass: 'arrow-img',
        linkClasses: [],
        imgClasses: [],
        clickSelectors: [],

        // scroll animation method
        animateScroll: function(){
            $('html, body').animate({scrollTop: 0}, this.animationTime);
            return false;
        },

        // fade scroll method
        fadeScroll: function() {
            var btn = $('a.' + config.buttonClass);
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

        // resize hide method
        resizeHide: function() {
            if(showMobile(this) && showScroll(this))
                $('.' + config.buttonClass).css('display', 'inline');
            else
                $('.' + config.buttonClass).css('display', 'none');
        }
    };
 
})( jQuery );

// attach plugin to body, basic example
// $('body').toTopButton({});
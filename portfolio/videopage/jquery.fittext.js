/*global jQuery */
/*!	
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY,
          'verticalCentering': true,
          'scale_by_height': false
        }, options);

    return this.each(function() {

        // Store the object
        var $this = $(this);

        // Resizer() resizes items based on the object width divided by the compressor * 10
        var resizer;
        resizer = function () {
            if (settings.scale_by_height){
                if ($this.is('input[placeholder]')){
                    var text = $this.attr('placeholder');
                } else if ($this.is('input[value]')){
                    text = $this.attr('value');
                } else{
                    text = $this.text();
                }
                var font_size = $this.height() * compressor,
                    temp = $('<span/>').css({
                    'font-size': $this.height() * compressor,
                    'width': 'auto',
                    'height': 'auto',
                    'display': 'none'
                }).text(text);
                $('body').append(temp);
                if ($this.width() < temp.width()){
                    var sc_coef = $this.width() / (temp.width()*1.1);
                    font_size = font_size * sc_coef;
                }
                $this.css({
                    'font-size': font_size,
                    height: $this.height() //spike for height of some elements (like inputs), that can change their height according to the font-size, if in css theirs height given in relative units
                });
                temp.remove();
            } else{
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            }
            if (settings.verticalCentering){
                $this.css('line-height', $this.height()+5+"px");
            }
        };

        // Call once to set.
        resizer();

        // Call on resize. Opera debounces their resize by default.
//        $(window).on('resize', resizer);

    });

  };
})( jQuery );

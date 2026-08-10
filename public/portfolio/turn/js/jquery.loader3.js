/*!
 * jQuery loader plugin
 * Version BETA 3 (03-AUGUST-2011)
 * Copyright (c) 2011 Guilherme Mori {guilherme.danna.mori}@gmail.com
 */

;(function ($) {
    var jQueryLoaderPluginSettings = {
        'bgColor': '#232323',
        'bgOpacity': 1,
        'load': [],
        'message': 'Loading Resources: %f (%p% | %c of %t)',
        'ending_message': 'Resources Loaded',
        'fadeOutSpeed': 'fast'
    };
	
    var jQueryLoaderPluginMethods = {
        init: function (options) {
            if (options) {
                $.extend(jQueryLoaderPluginSettings, options)
            }
            if (!$.isArray(jQueryLoaderPluginSettings.load)) {
                return $.error('Options must have at least load contents array on jQuery.preLoadGUI().')
            }
            jQueryLoaderPluginMethods.show(jQueryLoaderPluginSettings.load)
        },
		
        show: function (l) {
            for (var el in l) {
                if ($.isArray(l[el])) {
                    i = 'preLoadGUIBeta4';
                    c = $('#' + i).size();
					
                    if (c == 0) {
                        $('<div></div>').attr('id', i).css({
                            width: '100%',
                            height: '100%',
                            backgroundColor: jQueryLoaderPluginSettings.bgColor,
                            zIndex: 99999999,
                            position: 'fixed',
                            opacity: jQueryLoaderPluginSettings.bgOpacity,
                            left: 0,
                            top: 0
                        }).appendTo('body');
			
                        $('<div id="loader_bg"></div>').css({
                            width: '100%',
                            height: '25px',
                            backgroundColor: '#1B1B1B',
                            boxShadow: '0 0 5px #000 inset',
                            borderRadius: '5px',
                            zIndex: 999999999,
                            position: 'fixed',
                            left: 0,
                            top: '50%'
                        }).appendTo('body');
                        
                        $('<div></div>').attr('id', i + 'loader').attr('rel', l.length).attr('loaded', 0).css({
                            width: '0',
                            height: '20px',
                            backgroundColor: '#1976C5',
                            borderRadius: '5px',
                            zIndex: 999999999,
                            position: 'fixed',
                            margin: '2px',
                            left: 0,
                            top: '50%'
                        }).appendTo('#loader_bg');
						
                        $('<div></div>').attr('id', i + 'loaderText').css({
                            fontSize: '11px',
                            fontFamily: "Verdana, Geneva, sans-serif",
                            width: '100%',
                            color: '#ffffff',
                            height: '12px',
                            zIndex: 999999999,
                            position: 'fixed',
                            left: 0,
                            top: '50%',
                            marginTop: '-20px'
                        }).appendTo('body');
                        
                        $('<div id="badbug"></div>').css({
                            width: '165px',
                            background:'url(pics/badbug_copy.png)',
                            backgroundSize: '100% 100%',
                            height: '35px',
                            zIndex: 999999999,
                            position: 'fixed',
                            right: 0,
                            bottom: 0,
                            marginBottom: '5px',
                            marginRight: '5px'
                        }).appendTo('body');
                    }
					
                    switch (l[el][1]) {
                   		case 'img':
							$("<img />").css({
								visibility: 'hidden'
							}).attr("src", l[el][0]).load(function () {
								jQueryLoaderPluginMethods.show(l)
							});
                        break;
                    	case 'css':
							$("<style></style>").attr({
								type: "text/css"
							}).load(l[el][0], function () {
								$(this).appendTo('head');
								jQueryLoaderPluginMethods.show(l)
							});
                        break;
                    	case 'html':
							$('<div></div>').attr('rel', l[el][2]).load(l[el][0], function () {
								$($(this).attr('rel')).append($(this).html());
								jQueryLoaderPluginMethods.show(l)
							});
                        break;
						case 'js':
                    	case 'run':
							$.getScript(l[el][0], function () {
								jQueryLoaderPluginMethods.show(l)
							});
                        break;
                    	default:
							delete l[el];
							jQueryLoaderPluginMethods.show(l);
							return;
                        break
                    }
					
                    jQueryLoaderPluginMethods.update(l[el][0]);
                    delete l[el];
                    return;
                }
            }
            $('#' + i + 'loaderText').text(jQueryLoaderPluginSettings.ending_message);
            $('#' + i + 'loader').animate({
                width: '100%'
            }, 0, 'swing', function () {
                i = 'preLoadGUIBeta4';
                $('#' + i + 'loader, #' + i + ', #' + i + 'loaderText, #badbug, #loader_bg').fadeOut(jQueryLoaderPluginSettings.fadeOutSpeed)
            })
        },
		
        update: function (f) {
            i = 'preLoadGUIBeta4';
            ld = $('#' + i + 'loader').attr('loaded') * 1;
            t = $('#' + i + 'loader').attr('rel') * 1;
            msg = jQueryLoaderPluginSettings.message;
            msg = msg.replace(/(%f)|(%p)|(%c)|(%t)/g, function (m) {
                return (m == '%f') ? f : ((m == '%p') ? (Math.round(ld / t * 100)) : ((m == '%c') ? ld : t))
            });
            $('#' + i + 'loader').attr('loaded', (ld + 1)).css({
                width: (ld / t * 100) + '%'
            });
            $('#' + i + 'loaderText').html(msg)
        }
    };
	
    $.preLoadGUI = function (options) {
        if (typeof options === 'object') {
            return jQueryLoaderPluginMethods.init(options)
        } else {
            $.error('Options must have at least load contents array on jQuery.preLoadGUI().')
        }
    }
})(jQuery);
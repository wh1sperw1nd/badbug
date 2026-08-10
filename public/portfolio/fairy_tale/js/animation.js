var tl = new Array(
    "The End"
);
var speed = 200;
var index = 0; text_pos = 0;
var str_length = tl[0].length;
var contents, row;
function typeText()
{
        $("#title").show();
        contents = '';
        row = Math.max(0, index-7);
        while (row<index) contents += tl[row++] + '<br />';

        document.getElementById('title').innerHTML = contents + tl[index].substring(0,text_pos) + "_";
        if (text_pos ++== str_length)
        {
                text_pos = 0;
                index++;
                if (index != tl.length)
                {
                        str_length = tl[index].length;
                        setTimeout("typeText()", 3000);
                }else{
                    setTimeout(function(){
                        window.location.reload();
                    }, 2000);

                }
        }
        else
        {
            setTimeout("typeText()", speed);
        }
}
$(document).ready(function() {
    var tl = new Array("The End"),
    speed = 200,
    index = 0,
    text_pos = 0,
    str_length = tl[0].length,
    contents, row,
    $preloader = $('.preloader'),
    $wrap = $('.wrap'),
    $rope = $(".rope"),
    $page_title = $(".page_title"),
    $leftcurtain = $(".leftcurtain"),
    $rightcurtain = $(".rightcurtain"),
    $bee = $('#bee'),
    $flappy = $('#flappy'),
    $butterfly_yellow = $('#butterfly_yellow'),
    $butterfly_pink = $('#butterfly_pink'),
    $butterfly_blue = $('#butterfly_blue'),
    $sun_yellow = $('#sun_yellow'),
    $stars = $('#stars'),
    $moon = $('#moon'),
    $lovers = $('#lovers'),
    $button_green = $('#button_green'),
    $button_red = $('#button_red'),
    $dream = $('#dream'),
    $sstar = $('#sstar'),
    $sun_red = $('#sun_red'),
    $sky = $('#sky'),
    $clouds = $('#clouds'),
    $night = $('.night'),
    $cl1 = $('#cl1'),
    $cl2 = $('#cl2'),
    $cl3 = $('#cl3'),
    $lovers = $('#lovers'),
    $loversyes = $('#loversyes'),
    $shealone = $('#shealone'),
    $rose_fall = $('#rose_fall'),
    $healone = $('#healone'),
    $curtainopen = false,
    $back = $("#back"),
    $title = $("#title");
    
    setTimeout(function(){
        $preloader.hide();
        $wrap.show();
    },1500);
    
    $('body').bind({'mousewheel': function(e) {                
        e.preventDefault();
        e.stopPropagation();
        }
    });
    
    function ifIE() {
        if ($.browser.msie && $.browser.version < '9.0') {
            $(".shadow").show();
            $("#head2").append("<span style='color: #FFFFFF; display: inline-block; font-size: 17px; font-weight: bold; margin-top: 12px;'> Вы используете Internet Explorer версии:  " +                     $.browser.version + "</span>");
        }
    }
    
    ifIE();
    ropeng();
    
    
    function ropeng() {
        $rope.bind('click', function() {
            curtainAnimation();
            $rope.unbind('click');
            sunAnimation();
            $page_title.fadeOut("fast");
        });
    }
    
    function rain() {
        new Rain('canvas', {
            speed: 300,
            angle: 20,
            intensity: 1000,
            size: 7,
            color: '#B0C4DE'
        });
    }
    function yesfunc() {
        $dream.animate({'opacity': 0}, 1000, function() {
            $night.animate({'opacity': 0}, 16000);
            $stars.animate({'opacity': 0}, 4000);
            $sky.animate({'backgroundColor': 'url(/images/sky.png)'}, 6000);
//            $moon.css('z-index', '8');
            $moon.animate({'top': '100%', 'opacity': 0}, 8000, function() {
                $sun_yellow.animate({'top': '50%', 'opacity': 1}, 10000);
                $clouds.css({'background-position': '0 0', 'opacity': 1});
                $clouds.animate({'backgroundPosition': '1000px 0px'}, 10000);
                $lovers.animate({'left': "41%", 'opacity': 0}, 5000, function() {
                    $loversyes.animate({'opacity': 1}, 7000, function() {
                        showText();
                    });
                });
            });
        });
    }
    function nofunc() {
        $dream.animate({'opacity': 0}, 1000, function() {
            $night.animate({'opacity': 0.5}, 16000);
            $stars.animate({'opacity': 0}, 4000);
            $sky.animate({'backgroundColor': 'url(/images/sky.png)'}, 6000);
//            $moon.css('z-index', '8');
            $moon.animate({'top': '100%', 'opacity': 0}, 8000, function() {
                rain();
                //$('#sun_red').animate({'top': '20%', 'opacity': 1}, 10000);
                $cl1.animate({'opacity': 1}, 8000);
                $cl2.animate({'opacity': 1}, 6000);
                $cl3.animate({'opacity': 1}, 7000);
                $lovers.animate({'opacity': 0}, 7000, function() {
                    $shealone.animate({'opacity': 1}, 6000);
                    $rose_fall.animate({'opacity': 1}, 6000);
                    $healone.animate({'opacity': 1}, 6000).animate({'left': '-1%', 'opacity': 0}, 16000, function() {
                        curtainAnimation();
                    });
                });
            });
        });
    }
    
    function curtainAnimation() {
        $rope.blur();
        if ($curtainopen == false) {
            $rope.stop().animate({top: '0px'}, {queue: false, duration: 350, easing: 'easeOutBounce'});
            $leftcurtain.stop().animate({width: '60px'}, 2000);
            $rightcurtain.stop().animate({width: '60px'}, 2000);
            $curtainopen = true;
        } else {
            $back.fadeIn(200);
            $rope.stop().animate({top: '-40px'}, {queue: false, duration: 350, easing: 'easeOutBounce'});
            $leftcurtain.stop().animate({width: '50%'}, 2000);
            $rightcurtain.stop().animate({width: '51%'}, 2000, function() {
                typeText();
            });
            $curtainopen = false;
        }
        return false;
    }     
    
    function sunAnimation() {
            $bee.stop().animate({left: "+="+$(window).width()+"px", top: "35%"}, 15000);
            $flappy.stop().animate({left: "+="+$(window).width()+"px", top: "20%"}, 13500);
            $butterfly_yellow.stop().animate({right: "+="+$(window).width()+"px", top: "70%"}, 17000);
            $butterfly_pink.stop().animate({left: "50%", top: "70%"}, 7000).animate({opacity: "0"}).fadeOut();
            $butterfly_blue.stop().animate({top: "40%", right: "16.5%"}, 7000).animate({opacity: "0"}).fadeOut();
            $sun_yellow.animate({'top': '96%', 'opacity': 0.4}, 18000, function() {
                $stars.animate({'opacity': 1}, 5000, function() {
                    $moon.animate({'top': '10%', 'opacity': 1}, 5000, function() {
//                        $moon.css({'z-index':'15'}, 3000);
                        $lovers.stop().animate({'opacity': 1}, 5000, function() {
                            $button_green.live('click', function() {
                                yesfunc();
                            });
                            $button_red.live('click', function() {
                                nofunc();
                            });
                            $dream.stop().animate({'opacity': 1}, 2000, function() {
                                $sstar.animate({'opacity': 1}, 300);
                                //$('#sstar').animate({'backgroundPosition':'0px 0px','top':'15%', 'opacity':0}, 4000,function(){});
                            });
                        });
                    });
                });
            });
            $sun_red.animate({'top': '96%', 'opacity': 0.8}, 18000);
            $sky.animate({'backgroundColor': '#4F0030'}, 17000).animate({'backgroundColor': '#000'}, 2000);
            $clouds.animate({'backgroundPosition': '1000px 0px', 'opacity': 0}, 16000);
            $night.animate({'opacity': 0.8}, 17000);
        }
    });     
    
    var source, dest, len, now = 0, delay = 100, letters = 1;
    function showText() {
        source = document.getElementById("text");
        dest = document.getElementById("place");
        len = source.innerHTML.length;
        var d = source.innerHTML.substr(now, letters);
        if (d == "%") {
            dest.innerHTML += "<br>"
        }
        else {
            dest.innerHTML += source.innerHTML.substr(now, letters);
        }
        now += letters;
        if (now < len) {
            setTimeout("showText()", delay);
        } else {
            console.log("now");
            $("#back").fadeIn(200);
            $(".rope").stop().animate({top: '-40px'}, {queue: false, duration: 350, easing: 'easeOutBounce'});
            $(".leftcurtain").stop().animate({width: '50%'}, 2000);
            $(".rightcurtain").stop().animate({width: '51%'}, 2000, function() {
                typeText();
            });
        }
    }
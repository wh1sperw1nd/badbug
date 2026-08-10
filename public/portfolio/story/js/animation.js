function Play(){}
Play.prototype.init = function(){
    this.tl = new Array(
        "The End"
    );
    this.speed = 200;
    this.index = 0; 
    this.text_pos = 0;
    this.str_length = this.tl[0].length;
    this.contents;
    this.row;
    
    this.$preloader = $('.preloader');
    this.$wrap = $('.wrap');
    this.$rope = $(".rope");
    this.$page_title = $(".page_title");
    this.$leftcurtain = $(".leftcurtain");
    this.$rightcurtain = $(".rightcurtain");
    this.$bee = $('#bee');
    this.$flappy = $('#flappy');
    this.$butterfly_yellow = $('#butterfly_yellow');
    this.$butterfly_pink = $('#butterfly_pink');
    this.$butterfly_blue = $('#butterfly_blue');
    this.$sun_yellow = $('#sun_yellow');
    this.$stars = $('#stars');
    this.$moon = $('#moon');
    this.$lovers = $('#lovers');
    this.$button_green = $('#button_green');
    this.$button_red = $('#button_red');
    this.$dream = $('#dream');
    this.$sstar = $('#sstar');
    this.$sun_red = $('#sun_red');
    this.$sky = $('#sky');
    this.$clouds = $('#clouds');
    this.$night = $('.night');
    this.$cl1 = $('#cl1');
    this.$cl2 = $('#cl2');
    this.$cl3 = $('#cl3');
    this.$lovers = $('#lovers');
    this.$loversyes = $('#loversyes');
    this.$shealone = $('#shealone');
    this.$rose_fall = $('#rose_fall');
    this.$healone = $('#healone');
    this.$curtainopen = false;
    this.$back = $("#back");
    this.$title = $("#title");
    
    this.source = document.getElementById("text");
    this.dest = document.getElementById("place");
    this.theEndText = document.getElementById("theEndText");
    this.placeOutput = document.getElementById("placeOutput");
    this.len;
    this.length;
    this.now = 0;
    this.delay = 100;
    this.letters = 1;
    
	this.start();
}

Play.prototype.start = function(){
    this.govnoScale();
    $(window).on( "orientationchange resize", function(event) {
        this.govnoScale();
    }.bind(this));
    setTimeout(function(){
        this.$preloader.hide();
        this.$wrap.show();
    }.bind(this),1500);
    
    $('body').on('mousewheel', function(e) {                
        e.preventDefault();
        e.stopPropagation();
    });
    
    this.ropeng();
}

Play.prototype.ropeng = function() {
    var safe = this;
    this.$rope.one('click', function() {
        sound.play();
        this.toggleFullScreen();
        this.page_titleAnim = TweenMax.to(this.$page_title, 0.3, {'opacity': 0});
        this.sunAnimation();
        this.curtainAnimation();
    }.bind(this));
}

Play.prototype.rain = function() {
    var rain = new Rain('canvas', {
        speed: 300,
        angle: 20,
        intensity: 1000,
        size: 7,
        color: '#B0C4DE'
    });
}


Play.prototype.typeText = function() {
    this.$title.show();
    this.contents = '';
    this.row = Math.max(0, this.index-7);
    while (this.row<this.index) this.contents += this.tl[this.row++] + '<br />';

    document.getElementById('title').innerHTML = this.contents + this.tl[this.index].substring(0,this.text_pos) + "_";
    if (this.text_pos ++== this.str_length) {
        this.text_pos = 0;
        this.index++;
        if (this.index != this.tl.length) {
                this.str_length = this.tl[this.index].length;
                setTimeout(function(){
                    this.typeText();
                }.bind(this), 3000);
        }else{
            setTimeout(function(){
                window.location.reload();
            }, 5000);
        }
    }else {
        setTimeout(function(){
            this.typeText();
        }.bind(this), this.speed);
    }
}


Play.prototype.showText = function() {
    this.len = this.source.innerHTML.length;
    var d = this.source.innerHTML.substr(this.now, this.letters);
    if (d == "%") {
        this.dest.innerHTML += "<br>"
    }
    else {
        this.dest.innerHTML += this.source.innerHTML.substr(this.now, this.letters);
    }
    this.now += this.letters;
    if (this.now < this.len) {
        setTimeout(function(){
            this.showText();
        }.bind(this), this.delay);
    } else {
        this.$back.fadeIn(200);
        this.ropeAnim = TweenMax.to(this.$rope, 0.35, {'top': '-40px', ease: Bounce.easeOut});
        this.leftcurtainAnim = TweenMax.to(this.$leftcurtain, 2, {'transform': 'scale3d(1,1,1)'});
        this.rightcurtainAnim = TweenMax.to(this.$rightcurtain, 2, {'transform': 'scale3d(1,1,1)', onComplete: function(){
            this.typeText();
        }.bind(this)});
    }
}

Play.prototype.showEndText = function() {
    this.lenght = this.theEndText.innerHTML.length;
    var d = this.theEndText.innerHTML.substr(this.now, this.letters);
    if (d == "%") {
        this.placeOutput.innerHTML += "<br>"
    }
    else {
        this.placeOutput.innerHTML += this.theEndText.innerHTML.substr(this.now, this.letters);
    }
    this.now += this.letters;
    if (this.now < this.lenght) {
        setTimeout(function(){
            this.showEndText();
        }.bind(this), this.delay);
    }
}


Play.prototype.curtainAnimation = function() {
    this.$rope.blur();
    if (this.$curtainopen == false) {
        this.ropeAnim = TweenMax.to(this.$rope, 0.35, {'top': 0, ease: Bounce.easeOut});
        this.leftcurtainAnim = TweenMax.to(this.$leftcurtain, 2, {'transform': 'scale3d(0.12,1,1)'});
        this.rightcurtainAnim = TweenMax.to(this.$rightcurtain, 2, {'transform': 'scale3d(0.12,1,1)'});
        this.$curtainopen = true;
    } else {
        this.$back.fadeIn(200);
        this.ropeAnim = TweenMax.to(this.$rope, 0.35, {'top': '-40px', ease: Bounce.easeOut});
        this.leftcurtainAnim = TweenMax.to(this.$leftcurtain, 2, {'transform': 'scale3d(1,1,1)'});
        this.rightcurtainAnim = TweenMax.to(this.$rightcurtain, 2, {'transform': 'scale3d(1,1,1)', onComplete: function(){
            this.typeText();
        }.bind(this)});
        this.$curtainopen = false;
    }

    return false;
}


Play.prototype.sunAnimation = function() {
    var self = this;
    this.beeAnim = TweenMax.to(this.$bee, 15, {'left': "+="+$(window).width()+"px", 'top': "35%"});
    this.flappyAnim = TweenMax.to(this.$flappy, 13.5, {'left': "+="+$(window).width()+"px", 'top': "20%"});
    this.butterfly_yellowAnim = TweenMax.to(this.$butterfly_yellow, 17, {'left': "+="+$(window).width()+"px", 'top': "70%"});
    
    this.butterfly_pinkAnim = TweenMax.to(this.$butterfly_pink, 7, {'left': "50%", 'top': "70%", onComplete: function(){
        TweenMax.to(self.$butterfly_pink, 0.3, {'opacity': "0"});
    }});
    this.butterfly_blueAnim = TweenMax.to(this.$butterfly_blue, 7, {'top': "40%", 'right': "16.5%", onComplete: function(){
        TweenMax.to(self.$butterfly_blue, 0.3, {'opacity': "0"});
    }});
    this.sun_yellowAnim = TweenMax.to(this.$sun_yellow, 18, {'top': '105%', 'opacity': 0.4, onComplete: function(){
        self.starsAnim = TweenMax.to(self.$stars, 5, {'opacity': 1, onComplete: function(){
            self.moonAnim = TweenMax.to(self.$moon, 5, {'top': '10%', 'opacity': 1, onComplete: function(){
                self.loversAnim = TweenMax.to(self.$lovers, 5, {'opacity': 1, onComplete: function(){
                    self.$button_green.on('click', function() {
                        self.yesfunc();
                    });
                    self.$button_red.on('click', function() {
                        self.nofunc();
                    });
                    self.dreamAnim = TweenMax.to(self.$dream, 2, {'opacity': 1, onComplete: function(){
                        this.sstarAnim = TweenMax.to(self.$sstar, 0.3, {'opacity': 1});
                    }});    
                }});
            }}); 
        }}); 
    }.bind(this)});    
    
    this.sun_redAnim = TweenMax.to(this.$sun_red, 18, {'top': '105%', 'opacity': 0.8});
    this.skyAnim = TweenMax.to(this.$sky, 17, {'backgroundColor': '#4F0030'});
    
    this.skyAnim = TweenMax.to(this.$sky, 17, {'backgroundColor': '#4F0030', onComplete: function(){
        TweenMax.to(self.$sky, 2, {'backgroundColor': "#000"});
    }});
    
    this.cloudsAnim = TweenMax.to(this.$clouds, 16, {'backgroundPosition': '1000px 0px', 'opacity': 0});
    this.nightAnim = TweenMax.to(this.$night, 17, {'opacity': 0.8});
    
}

Play.prototype.yesfunc = function() {
    var self = this;
    this.dreamAnim = TweenMax.to(this.$dream, 1, {'opacity': 0, onComplete: function(){
        this.nightAnim = TweenMax.to(this.$night, 16, {'opacity': 0});
        this.starsAnim = TweenMax.to(this.$stars, 4, {'opacity': 0});
        this.skyAnim = TweenMax.to(this.$sky, 6, {css:{'backgroundColor': '#fff', backgroundImage:'url(./images/sky.png)'}});

        this.moonAnim = TweenMax.to(this.$moon, 8, {'top': '100%','opacity': 0, onComplete: function(){
            self.sun_yellowAnim = TweenMax.to(self.$sun_yellow, 10, {'top': '50%', 'opacity': 1});
            self.$clouds.css({'background-position': '0 0', 'opacity': 1});
            self.cloudsAnim = TweenMax.to(self.$clouds, 10, {'backgroundPosition': '1000px 0px'});
            self.loversAnim = TweenMax.to(self.$lovers, 5, {'left': "41%", 'opacity': 0, onComplete: function(){
                self.loversyesAnim = TweenMax.to(self.$loversyes, 7, {'opacity': 1, onComplete: function(){
                    self.showText();
                }});
            }});
        }});
    }.bind(this)});
}
   
Play.prototype.nofunc = function() {
    var self = this;
    this.dreamAnim = TweenMax.to(this.$dream, 1, {'opacity': 0, onComplete: function(){
        this.nightAnim = TweenMax.to(this.$night, 16, {'opacity': 0.5});
        this.starsAnim = TweenMax.to(this.$stars, 4, {'opacity': 0});
        this.skyAnim = TweenMax.to(this.$sky, 6, {css:{'backgroundColor': '#fff', backgroundImage:'url(./images/sky.png)'}});
    }.bind(this)});
    this.moonAnim = TweenMax.to(this.$moon, 8, {'top': '100%','opacity': 0, onComplete: function(){
        this.rain();
        this.cl1Anim = TweenMax.to(this.$cl1, 8, {'opacity': 1});
        this.cl2Anim = TweenMax.to(this.$cl2, 6, {'opacity': 1});
        this.cl3Anim = TweenMax.to(this.$cl3, 7, {'opacity': 1});
        this.loversAnim = TweenMax.to(this.$lovers, 7, {'opacity': 0, onComplete: function(){
            self.shealoneAnim = TweenMax.to(self.$shealone, 8, {'opacity': 1});
            self.showEndText();
            self.rose_fallAnim = TweenMax.to(self.$rose_fall, 6, {'opacity': 1});
            self.healoneAnim = TweenMax.to(self.$healone, 6, {'opacity': 1, onComplete: function(){
                self.healoneAnim = TweenMax.to(self.$healone, 16, {'left': '-1%', 'opacity': 0, onComplete: function(){
                    setTimeout(function(){
                        self.curtainAnimation();
                    },5000)
                }});
            }});
        }});
        
    }.bind(this)});
}   
Play.prototype.govnoScale = function(){
    var styles=""
    if(window.innerHeight > window.innerWidth) {
        var scaleProp = window.innerWidth / (window.innerHeight);
        styles="width:"+window.innerHeight+"px;"+
               "height:"+ window.innerWidth + "px;"+
               "-webkit-transform:"+"scale3d(" + scaleProp + "," + scaleProp + ", 1);"+
               "transform:"+"scale3d(" + scaleProp + "," + scaleProp + ", 1);"+
               "-webkit-transition:transform 0.5s ease;"+
               "transition:transform 0.5s ease;"+
               "position:absolute;"+
               "left:50%;"+
               "top:50%;"+
               "margin:"+-window.innerWidth/2 +"px 0 0"+-window.innerHeight/2+"px;";

    }
    else {
        styles="width:100%;"+
               "height:100%;"+
               "-webkit-transform:scale3d(1,1,1);"+
               "transform:scale3d(1,1,1);"+
               "position:relative;"+
               "left:0;"+
               "top:0;"+
               "margin:0;"
    }
    document.body.setAttribute('style',styles)
}
Play.prototype.toggleFullScreen = function(){
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

var play = new Play();
var sound = null;
$(document).ready(function(){
//	window.requestAnimFrame = (function(){
//		return  window.requestAnimationFrame       ||
//			    window.webkitRequestAnimationFrame ||
//				window.mozRequestAnimationFrame    ||
//				window.oRequestAnimationFrame      ||
//				window.msRequestAnimationFrame     ||
//				function( callback, element ){
//					window.setTimeout(callback, 1000 / 60);
//				};
//	})();
//
//    window.cancelRequestAnimFrame = (function(req){
//        return  window.cancelAnimationFrame                 ||
//                window.webkitCancelRequestAnimationFrame    ||
//                window.mozCancelRequestAnimationFrame       ||
//                window.oCancelRequestAnimationFrame         ||
//                window.msCancelRequestAnimationFrame        ||
//                clearTimeout
//    })();
//
//
//
//    window.requestAnimation = function(){
//        if(currentPage) {
//            currentPage.RAFO = requestAnimFrame(function(){
//                currentPage.loop();
//            });
//        }
//    }
    sound = new Howl({
        src: ['./media/Takida_-_Give_into_me.mp3', './media/Takida_-_Give_into_me.ogg'],
    });
    sound.once('load', function(){
        play.init();
    });
});





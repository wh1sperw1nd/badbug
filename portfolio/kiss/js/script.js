function Play(){}
var hearts = {};
var heartIndex = 0;
var headerHeight = 60;

Play.prototype.init = function(){
	this.canvas;
	this.context;
	this.playButton = $('#play');
	this.volumeButton = $('.mute');
	this.page1 = $('.page-1');
	this.page2 = $('.page-2');
	this.page3 = $('.page-3');
	this.page4 = $('.page-4');
	this.page5 = $('.page-5');

	//---------------
    this.master;
    this.couple = $('#couple');
    this.girl = $('#girl');
    this.boy = $('#boy');
    this.heart = $('#heart');
    this.ground = $('#ground');
    this.background = $('body');
    this.light = $('#triangle-light');
    
    //---------------typing
    this.source = document.getElementById("text");
    this.dest = document.getElementById("place");
    this.len;
    this.length;
    this.now = 0;
    this.delay = 30;
    this.letters = 1;
	
    //this.audio.play();
    this.sound = new Howl({
        src: ['./media/a-himitsu-adventures.mp3', './media/a-himitsu-adventures.ogg'],
        autoplay: false,
        loop: true,
        volume: 1,
    });
	this.start();
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
        setTimeout(function(){
            play.page1.removeClass("page-current pt-page-ontop");
            play.page2.removeClass("page-current pt-page-ontop");
            play.page3.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
            play.page5.addClass("pt-page-rotateCubeTopIn page-current");
        }, 10000);
        setTimeout(function(){
            window.location.reload()
        },25000)
        return;
    }
}

Play.prototype.start = function(){
	var self = this;
        
    this.master = new TimelineMax();
	this.playButton.on('click', function(){
		self.page1.addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page1.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page3.addClass("pt-page-rotateCubeTopIn page-current");
        self.audio = self.sound.play();
        self.master
            // .add(createUniverse)
            .add(self.setup())
            .add(self.darkness(), 'lightsOff+=1')
            .add(self.girlKiss(), 'girlStuff+=1')
            .add(self.boyStuff(), 'girlStuff+=2')
            .add(self.heartStuff(), 'heartStuff')
            .add(self.lightsOn(), 'heartStuff+=2');
        universe.init();
        fireworks();
	});
}

Play.prototype.muteSound = function(){
	var self = this;
	var state = false;
	this.volumeButton.on('click', function(){
 		if (!state){
			$(this).removeClass("fa-volume-up").addClass("fa-volume-off");
            self.sound.pause(this.audio);
			state = true;
 		}
 		else {
			$(this).removeClass("fa-volume-off").addClass("fa-volume-up");
            self.sound.play();
  			state = false;
 		}
	});
}

Play.prototype.setup = function() {
    this.showText();
    var tl = new TimelineMax();
    tl
        .set(this.couple, {autoAlpha: 1})
        .set(this.girl.find('#girl-earring'), {scaleY: '0.7'})
        .set(this.girl.find('#girl-leg-1'), {rotation: '+=75'})
        .set(this.girl.find('#girl-arm'), {transformOrigin: '100% 0%', rotation: '-=60'})
        .set(this.girl.find('#girl-body'), {transformOrigin: '0% 75%', rotation: '+=20'})
        .set(this.heart, {transformOrigin: '50% 50%', y: '+=100', scale: 0.5});
    return tl;
}


Play.prototype.darkness = function() {
    var tl = new TimelineMax();
    tl.to(this.background, 1, {backgroundColor: '#1a2124'});
    return tl;
}

Play.prototype.girlKiss = function() {
    var tl = new TimelineMax();
    tl
        .to(this.girl.find('#girl-arm'), 1, {rotation: 0},1)
        .to(this.girl.find('#girl-body'), 0.5, {transformOrigin: '0% 75%', rotation: 0}, 32)
        .to(this.girl.find('#girl-eye'), 0.5, {transformOrigin: '0% 50%', scaleY: 0.1}, 33.5)
        .to(this.girl.find('#girl-leg-1'), 1.5, {rotation: 0, ease: Back.easeOut.config(3)}, 33.5);
    return tl;
}


Play.prototype.boyStuff = function() {
    var tl = new TimelineMax();
    tl
        .to(this.boy.find('#boy-eye'), 0.5, {transformOrigin: '0% 50%', scaleY: 0.1},32.5)

    return tl;
}

Play.prototype.heartStuff = function() {
    var tl = new TimelineMax();
    tl
        .to('#heart', 1, {autoAlpha: 1, y: 0, scale: 1});
    return tl;
}


Play.prototype.lightsOn = function() {
    var tl = new TimelineMax();
    tl
        .to(this.light, 0.25, {autoAlpha: 1}, 0)
        .to(this.ground, 0.25, {fill: '#F8E5C5'}, 0)
        .to(this.girl.find('#girl-eye'), 0.5, {scaleY: 1}, 0.5)
        .to(this.boy.find('#boy-eye'), 0.5, {scaleY: 1}, 1)
        .to(this.girl.find('#girl-leg-1'), 1, {rotation: '+=75'})
        .to(this.girl.find('#girl-body'), 0.5, {rotation: '+=20'}).add(function(){
            
        })

    return tl;
}

function Scene() {
	this.canvas = document.createElement("canvas");
	this.canvas.classList.add("herts");
	this.context = this.canvas.getContext("2d");
}

Scene.prototype.init = function() {
  	this.canvas.width = 100;
  	this.canvas.height = 100;
  	$(".copy").append(this.canvas);
	this.run();
};

function Heart(canvas) {
  	this.scene = canvas;
  	this.x = 50;
  	this.y = 75;
  	this.age = 0;
  	this.currentScale = 0.1;
  	this.maxScale = ~~(Math.random()*1) + 1;
  	this.death = ~~(Math.random() * 50) + 100;
  	this.speed = 0.8;
  	this.angle = (Math.random() + 0.2) * Math.PI;
  	heartIndex++;
  	this.id = heartIndex;
  	hearts[heartIndex] = this;
}

Heart.prototype.draw = function() {
  	this.currentScale= this.currentScale > this.maxScale? this.maxScale : this.currentScale + 0.001;
  	this.x += Math.sin(this.angle) * this.speed;
  	this.y += Math.cos(this.angle) * this.speed;
  	this.age++;
  	if (this.age > this.death)  {
      	delete hearts[this.id];
	}

  	var ctx = this.scene.context;
  	var x = this.x,
      	y = this.y;
  	ctx.save(); 
  	ctx.translate(x/2, y/2);

  	ctx.scale(this.currentScale,this.currentScale);
  	ctx.beginPath();
  	ctx.bezierCurveTo(75,37,70,25,50,25);
  	ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
  	ctx.bezierCurveTo(20,80,40,102,75,120);
  	ctx.bezierCurveTo(110,102,130,80,130,62.5);
  	ctx.bezierCurveTo(130,62.5,130,25,100,25);
  	ctx.bezierCurveTo(85,25,75,37,75,40);

 	ctx.fillStyle = 'rgba(255,0,0,' + (1 - this.age/this.death) * 2 + ')';
  	ctx.fill();
  	ctx.restore();
};

Scene.prototype.run = function() {
  	var h = scene.canvas.height;
  	var w = scene.canvas.width;
  	var ctx = scene.context;

  	ctx.moveTo(0,0);
  	ctx.setTransform(1, 0, 0, 1, 0, 0);
  	ctx.clearRect(0, 0, w, h);

  	var numHearts = Object.keys(hearts).length;
  	if (numHearts < 10) {
		if (heartIndex === 0 || numHearts === 0) {
			new Heart(scene);
		}
		else if (numHearts > 0 && hearts[Object.keys(hearts).pop()].age > ~~(Math.random() * 20) + 40) {
			new Heart(scene);
		}

  	}

  	for (var j in hearts) {
    	hearts[j].draw();
  	}
  	requestAnimFrame(function(){this.run();}.bind(this));
}

function Universe(){}

Universe.prototype.init =  function () {
    this.starDensity = .216;
    this.speedCoeff = .05;
    this.width;
    this.height;
    this.starCount;
    this.circleRadius;
    this.circleCenter;
    this.first = true;
    this.giantColor = '180,184,240';
    this.starColor = '226,225,142';
    this.cometColor = '226,225,224';
    this.canva = document.getElementById('universe');
    this.stars = [];
    this.universe;

    this.windowResizeHandler();
    window.addEventListener('resize', this.windowResizeHandler(), false);

    this.createUniverse();
}


Universe.prototype.createUniverse = function() {
    this.universe = this.canva.getContext('2d');

    for (var i = 0; i < this.starCount; i++) {
        this.stars[i] = new Star();
        this.stars[i].reset();
    }

    this.draw();

    setTimeout(function () {
        this.first = false;
    }.bind(this), 50)
}

Universe.prototype.draw = function() {
    this.universe.clearRect(0, 0, this.width, this.height);

    var starsLength = this.stars.length;

    for (var i = 0; i < starsLength; i++) {
        var star = this.stars[i];
        star.move();
        star.fadeIn();
        star.fadeOut();
        star.draw();
    }
    requestAnimFrame(function(){
    	this.draw();
    }.bind(this));
}

Universe.prototype.windowResizeHandler = function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.starCount = this.width * this.starDensity;
    this.circleRadius = (this.width > this.height ? this.height / 2 : this.width / 2);
    this.circleCenter = {
        x: this.width / 2,
        y: this.height / 2
    }

    this.canva.setAttribute('width', this.width);
    this.canva.setAttribute('height', this.height);
}

function Star() {}

Star.prototype.reset = function () {
    this.giant = this.getProbability(3);
    this.comet = this.giant || universe.first ? false : this.getProbability(10);
    this.x = this.getRandInterval(0, universe.width - 10);
    this.y = this.getRandInterval(0, universe.height);
    this.r = this.getRandInterval(1.1, 2.6);
    this.dx = this.getRandInterval(universe.speedCoeff, 6 * universe.speedCoeff) + (this.comet + 1 - 1) * universe.speedCoeff * this.getRandInterval(50, 120) + universe.speedCoeff * 2;
    this.dy = -this.getRandInterval(universe.speedCoeff, 6 * universe.speedCoeff) - (this.comet + 1 - 1) * universe.speedCoeff * this.getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = this.getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this.do = this.getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
};

Star.prototype.fadeIn = function () {
    if (this.fadingIn) {
        this.fadingIn = this.opacity > this.opacityTresh ? false : true;
        this.opacity += this.do;
    }
};

Star.prototype.fadeOut = function () {
    if (this.fadingOut) {
        this.fadingOut = this.opacity < 0 ? false : true;
        this.opacity -= this.do / 2;
        if (this.x > universe.width || this.y < 0) {
            this.fadingOut = false;
            this.reset();
        }
    }
};

Star.prototype.draw = function () {
    universe.universe.beginPath();

    if (this.giant) {
        universe.universe.fillStyle = 'rgba(' + universe.giantColor + ',' + this.opacity + ')';
        universe.universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
        universe.universe.fillStyle = 'rgba(' + universe.cometColor + ',' + this.opacity + ')';
        universe.universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

        //comet tail
        for (var i = 0; i < 30; i++) {
            universe.universe.fillStyle = 'rgba(' + universe.cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
            universe.universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
            universe.universe.fill();
        }
    } else {
        universe.universe.fillStyle = 'rgba(' + universe.starColor + ',' + this.opacity + ')';
        universe.universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.universe.closePath();
    universe.universe.fill();
};

Star.prototype.move = function () {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
        this.reset();
    }
    if (this.x > universe.width - (universe.width / 4) || this.y < 0) {
        this.fadingOut = true;
    }
};

Star.prototype.getProbability = function(percents) {
    return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

Star.prototype.getRandInterval = function(min, max) {
    return (Math.random() * (max - min) + min);
}


var play = new Play();
var scene = new Scene();
var universe = new Universe();





$(document).ready(function(){
	
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function( callback, element ){
					window.setTimeout(callback, 1000 / 60);
				};
	})();

	play.init();
	play.muteSound();
	scene.init();

});






fireworks = function() {
    var canvas = $('#fireworks')[0];
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    var ctx = canvas.getContext('2d');

    // resize
    $(window).on('resize', function() {
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        ctx.fillStyle = '#000003';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        center = { x: canvas.width / 2, y: canvas.height / 2 };
    });

    // init
    var grd=ctx.createLinearGradient(0,0,1600,100);
    grd.addColorStop(0,"#181b1f");
    grd.addColorStop(1,"#23282d");

    ctx.fillStyle=grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // objects
    var listFire = [];
    var listFirework = [];
    var listText = [];
    var listSpecial = [];
    var listSpark = [];
    var lights = [];
    var fireNumber = 10;
    var center = { x: canvas.width / 2, y: canvas.height / 3.5 };
    var range = 100;
    var fired = 0;
    var onHold = 0;
    var supprise = false;
    var textIndex = 0;
    var actions = [makeDoubleFullCircleFirework, makePlanetCircleFirework, makeFullCircleFirework, makeDoubleCircleFirework, makeHeartFirework, makeCircleFirework, makeRandomFirework];
    for (var i = 0; i < fireNumber; i++) {
        var fire = {
            x: Math.random() * range / 2 - range / 4 + center.x,
            y: Math.random() * range * 2.5 + canvas.height,
            size: Math.random() + 0.5,
            fill: '#ff3',
            vx: Math.random() - 0.5,
            vy: -(Math.random() + 4),
            ax: Math.random() * 0.06 - 0.03,
            delay: Math.round(Math.random() * range) + range * 4,
            hold: false,
            alpha: 1,
            far: Math.random() * range + (center.y - range)
        };
        fire.base = {
            x: fire.x,
            y: fire.y,
            vx: fire.vx,
            vy: fire.vy
        };
        //
        listFire.push(fire);
        // play sound
        playLaunchSound();
    }
    // define array of sound
    var listExpSound = [
        "./media/exp1.mp3",
        "./media/exp1.mp3",
        "./media/exp1.mp3",
        "./media/exp2.mp3",
        "./media/exp2.mp3",
        "./media/exp2.mp3",
        "./media/exp3.mp3",
        "./media/exp3.mp3",
        "./media/exp3.mp3",
        "./media/exp4.mp3",
        "./media/exp4.mp3",
        "./media/exp4.mp3",
        "./media/exp5.mp3",
        "./media/exp5.mp3",
        "./media/exp5.mp3",
        "./media/exp6.mp3",
        "./media/exp6.mp3",
        "./media/exp6.mp3",
        "./media/exp7.mp3",
        "./media/exp7.mp3",
        "./media/exp7.mp3",
        "./media/exp8.mp3",
        "./media/exp8.mp3",
        "./media/exp8.mp3"
    ]
    var listLaunchSound = [
        "./media/launch1.mp3",
        "./media/launch1.mp3",
        "./media/launch2.mp3",
        "./media/launch2.mp3",
        "./media/launch3.mp3",
        "./media/launch3.mp3",
        "./media/launch4.mp3",
        "./media/launch4.mp3",
        "./media/launch5.mp3",
        "./media/launch5.mp3"
    ]

    // define array position of text
    var textString = 'happylunarnewyear2017';
    var textMatrix = [
        4.5, 0, 5.5, 0, 6.5, 0, 7.5, 0, 8.5, 0,
        0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 6, 1, 7, 1, 8, 1, 10, 1, 11, 1, 12, 1, 13, 1,
        5, 2, 6, 2, 7, 2, 8, 2
    ]
    var chars = {
        h: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 3, 2, 3, 3, 3, 4, 3,
            5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7
        ],
        a: [
            2, 0, 2, 1, 2, 2, 1, 2, 1, 3, 1, 4, 1, 5, 0, 5, 0, 6, 0, 7, 2, 5,
            3, 0, 3, 1, 3, 2, 4, 2, 4, 3, 4, 4, 4, 1, 5, 5, 5, 6, 5, 7, 3, 5
        ],
        p: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 0, 2, 0, 3, 0, 4, 1, 5, 2, 4, 3, 3, 4, 2, 4, 1, 4
        ],
        y: [
            0, 0, 0, 1, 1, 1, 1, 2, 1, 3, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7,
            3, 2, 3, 3, 4, 1, 4, 2, 5, 0, 5, 1
        ],
        l: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 7, 2, 7, 3, 7, 4, 7, 5, 7
        ],
        u: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6,
            1, 7, 2, 7, 3, 7, 4, 7,
            5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6
        ],
        n: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 1, 1, 2, 2, 2, 2, 3, 2, 4, 3, 4, 3, 5, 4, 5, 4, 6,
            5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6, 5, 7
        ],
        e: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 0, 2, 0, 3, 0, 4, 0, 5, 0,
            1, 3, 2, 3, 3, 3, 4, 3,
            1, 7, 2, 7, 3, 7, 4, 7, 5, 7
        ],
        w: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 1, 6,
            2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 3, 7,
            5, 0, 5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 4, 5, 4, 6
        ],
        r: [
            0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7,
            1, 0, 2, 0, 3, 0, 4, 1, 5, 2, 4, 3, 3, 4, 2, 4, 1, 4,
            1, 5, 2, 5, 3, 6, 4, 6, 5, 7
        ],
        2: [
            0, 1, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 5, 1, 5, 2, 5, 3,
            4, 3, 3, 3, 2, 3, 2, 4, 1, 4, 1, 5,
            0, 5, 0, 6, 0, 7, 1, 7, 2, 7, 3, 7, 4, 7, 5, 7, 5, 6
        ],
        0: [
            0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6,
            1, 0, 2, 0, 3, 0, 4, 0,
            1, 7, 2, 7, 3, 7, 4, 7,
            5, 1, 5, 2, 5, 3, 5, 4, 5, 5, 5, 6
        ],
        1: [
            1, 2, 2, 2, 2, 1, 3, 1, 3, 0,
            4, 0, 4, 1, 4, 2, 4, 3, 4, 4, 4, 5, 4, 6, 4, 7,
            1, 7, 2, 7, 3, 7, 5, 7
        ],
        7: [
            0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0,
            5, 1, 5, 2, 5, 3, 4, 3, 4, 4,
            3, 4, 3, 5, 3, 6, 3, 7
        ]
    }

    function initText() {
        var i = textIndex;
        var velocity = Math.random() * 0.25 + 1;
        var shift = { x: -(Math.random() + 2), y: -(Math.random() + 3) };
        var char = chars[textString[i]];
        var width = 80;
        var half = 6.5 * width;
        var left = textMatrix[i * 2] * width - half;
        var top = textMatrix[i * 2 + 1] * range * 1.2 - range * 2.4;
        for (var j = 0; j < fireNumber * char.length * 0.25; j++) {
            var rand = Math.floor(Math.random() * char.length * 0.5);
            var x = char[rand * 2] + shift.x;
            var y = char[rand * 2 + 1] + shift.y;
            var text = {
                x: center.x + left * 0.9,
                y: center.y + top,
                left: center.x + left,
                size: Math.random() + 0.5,
                fill: '#ff3',
                vx: x * (velocity + (Math.random() - 0.5) * 0.5),
                vy: y * (velocity + (Math.random() - 0.5) * 0.5),
                ay: 0.08,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            }
            text.base = {
                life: text.life,
                size: text.size,
            };
            text.direct = (text.left - text.x) * 0.08;
            listText.push(text);
        }
        // play sound
        playExpSound();
        //
        lights.push({ x: center.x + left * 0.9, y: center.y + top, color: text.fill, radius: range * 2 });
        if (++textIndex < textString.length) {
            setTimeout(initText, 10);
        }
        else {
            textIndex = 0;
        }
    }

    function initSpark() {
        var x = Math.random() * range * 3 - range * 1.5 + center.x;
        var vx = Math.random() - 0.5;
        var vy = -(Math.random() + 4);
        var ax = Math.random() * 0.04 - 0.02;
        var far = Math.random() * range * 4 - range + center.y;
        var direct = ax * 10 * Math.PI;
        var max = fireNumber * 0.5;
        for (var i = 0; i < max; i++) {
            var special = {
                x: x,
                y: Math.random() * range * 0.25 + canvas.height,
                size: Math.random() + 2,
                fill: '#ff3',
                vx: vx,
                vy: vy,
                ax: ax,
                direct: direct,
                alpha: 1
            };
            special.far = far - (special.y - canvas.height);
            listSpecial.push(special);
            // play sound
            playLaunchSound();
        }
    }

    function randColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var color = 'rgb($r, $g, $b)';
        color = color.replace('$r', r);
        color = color.replace('$g', g);
        color = color.replace('$b', b);
        return color;
    }

    function playExpSound() {
       this.soundE = new Howl({
           src: [listExpSound[Math.floor(Math.random() * listExpSound.length)]],
           autoplay: false,
           loop: false,
           volume: Math.random() * 0.05 + 0.1,
       });
       this.audioExpSound = this.soundE.play();
    }

    function playLaunchSound() {
       setTimeout(function() {
           this.soundL = new Howl({
               src: [listLaunchSound[Math.floor(Math.random() * listLaunchSound.length)]],
               autoplay: false,
               loop: false,
               volume: 0.05,
           });
           this.audioLaunchSound = this.soundL.play();
       }.bind(this), 200);
    }

    function makeCircleFirework(fire) {
        var color = randColor();
        var velocity = Math.random() * 2 + 6;
        var max = fireNumber * 5;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 2
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makeDoubleCircleFirework(fire) {
        var color = randColor();
        var velocity = Math.random() * 2 + 8;
        var max = fireNumber * 3;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        color = randColor();
        velocity = Math.random() * 3 + 4;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makePlanetCircleFirework(fire) {
        var color = '#aa0609';
        var velocity = Math.random() * 2 + 4;
        var max = fireNumber * 2;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        max = fireNumber * 4;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity * Math.random(),
                vy: Math.sin(rad) * velocity * Math.random(),
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        max = fireNumber * 3;
        color = '#ff9';
        var rotate = Math.random() * Math.PI * 2;
        var vx = velocity *  (Math.random() + 2);
        var vy = velocity * 0.6;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            // calc x, y for ellipse
            var cx = Math.cos(rad) * vx + (Math.random() - 0.5) * 0.5;
            var cy = Math.sin(rad) * vy + (Math.random() - 0.5) * 0.5;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: cx * Math.cos(rotate) - cy * Math.sin(rotate), // rotate x ellipse
                vy: cx * Math.sin(rotate) + cy * Math.cos(rotate), // rotate y ellipse
                ay: 0.02,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return '#aa0609';
    }

    function makeFullCircleFirework(fire) {
        var color = randColor();
        var velocity = Math.random() * 8 + 8;
        var max = fireNumber * 3;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.06,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        max = fireNumber * Math.round(Math.random() * 4 + 4);
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity * Math.random(),
                vy: Math.sin(rad) * velocity * Math.random(),
                ay: 0.06,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makeDoubleFullCircleFirework(fire) {
        var color = randColor();
        var velocity = Math.random() * 8 + 8;
        var max = fireNumber * 3;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.04,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        color = randColor();
        velocity = Math.random() * 3 + 4;
        max = fireNumber * 2;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.06,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        max = fireNumber * 4;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * velocity * Math.random(),
                vy: Math.sin(rad) * velocity * Math.random(),
                ay: 0.06,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makeHeartFirework(fire) {
        var color = randColor();
        var velocity = Math.random() * 3 + 3;
        var max = fireNumber * 5;
        var rotate = Math.random() * Math.PI * 2;
        for (var i = 0; i < max; i++) {
            var rad = (i * Math.PI * 2) / max + rotate;
            var v, p;
            if (rad - rotate < Math.PI * 0.5) {
                p = (rad - rotate) / (Math.PI * 0.5);
                v = velocity + velocity * p;
            }
            else if (rad - rotate > Math.PI * 0.5 && rad - rotate < Math.PI) {
                p = (rad - rotate - Math.PI * 0.5) / (Math.PI * 0.5);
                v = velocity * (2 - p);
            }
            else if (rad - rotate > Math.PI && rad - rotate < Math.PI * 1.5) {
                p = (rad - rotate - Math.PI) / (Math.PI * 0.5);
                v = velocity * (1 - p);
            }
            else if (rad - rotate > Math.PI * 1.5 && rad - rotate < Math.PI * 2) {
                p = (rad - rotate - Math.PI * 1.5) / (Math.PI * 0.5);
                v = velocity * p;
            }
            else {
                v = velocity;
            }
            v = v + (Math.random() - 0.5) * 0.25;
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.cos(rad) * v,
                vy: Math.sin(rad) * v,
                ay: 0.02,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 1.5
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makeRandomFirework(fire) {
        var color = randColor();
        for (var i = 0; i < fireNumber * 5; i++) {
            var firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() + 1.5,
                fill: color,
                vx: Math.random() * 15 - 7.5,
                vy: Math.random() * -15 + 5,
                ay: 0.05,
                alpha: 1,
                life: Math.round(Math.random() * range / 2) + range / 2
            };
            firework.base = {
                life: firework.life,
                size: firework.size
            };
            listFirework.push(firework);
        }
        return color;
    }

    function makeSpark(special) {
        var color = special.fill;
        var velocity = Math.random() * 6 + 12;
        var max = fireNumber;
        for (var i = 0; i < max; i++) {
            var rad = (Math.random() * Math.PI * 0.3 + Math.PI * 0.35) + Math.PI + special.direct;
            var spark = {
                x: special.x,
                y: special.y,
                size: Math.random() + 1,
                fill: color,
                vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                ay: 0.02,
                alpha: 1,
                rad: rad,
                direct: special.direct,
                chain: Math.round(Math.random() * 2) + 2,
                life: Math.round(Math.random() * range / 2) + range / 2
            };
            spark.base = {
                life: spark.life,
                velocity: velocity
            };
            listSpark.push(spark);
        }
        return color;
    }

    function chainSpark(parentSpark) {
        var color = parentSpark.fill;
        if (parentSpark.chain > 0) {
            var velocity = parentSpark.base.velocity * 0.6;
            var max = Math.round(Math.random() * 5);
            for (var i = 0; i < max; i++) {
                var rad = (Math.random() * Math.PI * 0.3 - Math.PI * 0.15) + parentSpark.rad + parentSpark.direct;
                var spark = {
                    x: parentSpark.x,
                    y: parentSpark.y,
                    size: parentSpark.size * 0.6,
                    fill: color,
                    vx: Math.cos(rad) * velocity + (Math.random() - 0.5) * 0.5,
                    vy: Math.sin(rad) * velocity + (Math.random() - 0.5) * 0.5,
                    ay: 0.02,
                    alpha: 1,
                    rad: rad,
                    direct: parentSpark.direct,
                    chain: parentSpark.chain,
                    life: parentSpark.base.life * 0.8
                };
                spark.base = {
                    life: spark.life,
                    size: spark.size,
                    velocity: velocity
                };
                listSpark.push(spark);
            }

            if (Math.random() > 0.9 && parentSpark.chain > 1) {
                // play sound
                playExpSound();
            }
        }
        return color;
    }

    (function loop() {
        requestAnimationFrame(loop);
        update();
        draw();
    })();

    function update() {
        // update fire logic
        for (var i = 0; i < listFire.length; i++) {
            var fire = listFire[i];
            //
            if (fire.y <= fire.far) {
                // play sound
                playExpSound();
                // case add firework
                fired++;
                var color = actions[Math.floor(Math.random() * actions.length)](fire);
                // light
                lights.push({ x: fire.x, y: fire.y, color: color, radius: range * 2 });
                // reset
                fire.y = fire.base.y;
                fire.x = fire.base.x;
                // special
                if (fired % 33 == 0) {
                    initSpark();
                }
                // on hold
                supprise = fired % 100 == 0 ? true : supprise;
                if (supprise) {
                    fire.vx = 0;
                    fire.vy = 0;
                    fire.ax = 0;
                    fire.hold = true;
                    onHold++;
                }
                else {
                    fire.vx = fire.base.vx;
                    fire.vy = fire.base.vy;
                    fire.ax = Math.random() * 0.06 - 0.03;
                    // play sound
                    playLaunchSound();
                }
            }
            //
            if (fire.hold && fire.delay <= 0) {
                onHold--;
                fire.hold = false;
                fire.delay = Math.round(Math.random() * range) + range * 4;
                fire.vx = fire.base.vx;
                fire.vy = fire.base.vy;
                fire.ax = Math.random() * 0.06 - 0.03;
                fire.alpha = 1;
                // play sound
                playLaunchSound();
            }
            else if (fire.hold && fire.delay > 0) {
                fire.delay--;
            }
            else {
                fire.x += fire.vx;
                fire.y += fire.vy;
                fire.vx += fire.ax;
                fire.alpha = (fire.y - fire.far) / fire.far;
            }
        }

        // update firework logic
        for (var i = listFirework.length - 1; i >= 0; i--) {
            var firework = listFirework[i];
            if (firework) {
                firework.vx *= 0.9;
                firework.vy *= 0.9;
                firework.x += firework.vx;
                firework.y += firework.vy;
                firework.vy += firework.ay;
                firework.alpha = firework.life / firework.base.life;
                firework.size = firework.alpha * firework.base.size;
                firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
                //
                firework.life--;
                if (firework.life <= 0) {
                    listFirework.splice(i, 1);
                }
            }
        }

        // supprise happy new year!
        if (supprise && onHold == 10) {
            supprise = false;
        }

        // update text logic
        for (var i = listText.length - 1; i >= 0; i--) {
            var text = listText[i];
            text.vx *= 0.9;
            text.vy *= 0.9;
            text.direct *= 0.9;
            text.x += text.vx + text.direct;
            text.y += text.vy;
            text.vy += text.ay;
            text.alpha = text.life / text.base.life;
            text.size = text.alpha * text.base.size;
            text.alpha = text.alpha > 0.6 ? 1 : text.alpha;
            //
            text.life--;
            if (text.life <= 0) {
                listText.splice(i, 1);
            }
        }

        // update special logic
        for (var i = listSpecial.length - 1; i >= 0; i--) {
            var special = listSpecial[i];
            if (special.y <= special.far) {
                // play sound
                playExpSound();
                // light
                lights.push({ x: special.x, y: special.y, color: special.fill, alpha: 0.02, radius: range * 2 });
                //
                makeSpark(special);
                // remove from list
                listSpecial.splice(i, 1);
            }
            else {
                special.x += special.vx;
                special.y += special.vy;
                special.vx += special.ax;
                special.alpha = (special.y - special.far) / special.far;
            }
        }

        // update spark logic
        for (var i = listSpark.length - 1; i >= 0; i--) {
            var spark = listSpark[i];
            if (spark) {
                spark.vx *= 0.9;
                spark.vy *= 0.9;
                spark.x += spark.vx;
                spark.y += spark.vy;
                spark.vy += spark.ay;
                spark.alpha = spark.life / spark.base.life + 0.2;
                //
                spark.life--;
                if (spark.life < spark.base.life * 0.8 && spark.life > 0) {
                    //
                    spark.chain--;
                    chainSpark(spark);
                }
                if (spark.life <= 0) {
                    listSpark.splice(i, 1);
                }
            }
        }
    }

    function draw() {
        // clear
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.2;
        var grd=ctx.createLinearGradient(0,0,1600,100);
        grd.addColorStop(0,"#181b1f");
        grd.addColorStop(1,"#23282d");

        ctx.fillStyle=grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // re-draw
        ctx.globalCompositeOperation = 'screen';
        for (var i = 0; i < listFire.length; i++) {
            var fire = listFire[i];
            ctx.globalAlpha = fire.alpha;
            ctx.beginPath();
            ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = fire.fill;
            ctx.fill();
        }

        for (var i = 0; i < listFirework.length; i++) {
            var firework = listFirework[i];
            ctx.globalAlpha = firework.alpha;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = firework.fill;
            ctx.fill();
        }

        for (var i = 0; i < listSpecial.length; i++) {
            var special = listSpecial[i];
            ctx.globalAlpha = special.alpha;
            // ctx.beginPath();
            // ctx.arc(special.x, special.y, special.size, 0, Math.PI * 2);
            // ctx.closePath();
            // ctx.fill();
            ctx.fillStyle = special.fill;
            ctx.fillRect(special.x - special.size, special.y - special.size, special.size * 2, special.size *2);
        }

        for (var i = 0; i < listSpark.length; i++) {
            var spark = listSpark[i];
            ctx.globalAlpha = spark.alpha;
            // ctx.beginPath();
            // ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            // ctx.closePath();
            // ctx.fill();
            ctx.fillStyle = spark.fill;
            ctx.fillRect(spark.x - spark.size, spark.y - spark.size, spark.size * 2, spark.size *2);
        }

        // light effect
        while (lights.length) {
            var light = lights.pop();
            var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.2, light.color);
            gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.globalAlpha = light.alpha ? light.alpha : 0.25;
            ctx.fillStyle = gradient;
            ctx.fillRect(light.x - light.radius, light.y - light.radius, light.radius * 2, light.radius * 2);
        }

        // supprise: HAPPY LUNAR NEW YEAR 2017!
        for (var i = 0; i < listText.length; i++) {
            var text = listText[i];
            ctx.globalAlpha = text.alpha;
            ctx.fillStyle = text.fill;
            ctx.fillRect(text.x - text.size, text.y - text.size, text.size * 2, text.size * 2);
        }
    }
}
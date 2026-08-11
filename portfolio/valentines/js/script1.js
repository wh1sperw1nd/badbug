function Play(){}
var hearts = {};
var heartIndex = 0;
var headerHeight = 60;

Play.prototype.init = function(){
	this.options= {
		openComment: false,
		time: window.innerWidth <= 578 ? 16 : 25,
		canvasToggle: 0,
		canvasSize: 412,
		counter: 0,
		distance: 40
	}

	this.styles;
	this.canvas;
	this.context;
	this.lastPoint;
	this.playButton = $('#play');
	this.volumeButton = $('.mute');
	this.page1 = $('.page-1');
	this.page2 = $('.page-2');
	this.page3 = $('.page-3');
	this.page4 = $('.page-4');
	this.page5 = $('.page-5');
	this.styleText = $('#style-text');
	this.styleTag = $('#style-tag');
	//this.audio = document.getElementById('audio');

	//---------------
    this.master;
    this.couple = $('#couple');
    this.girl = $('#girl');
    this.boy = $('#boy');
    this.heart = $('#heart');
    this.ground = $('#ground');
    this.background = $('body');
    this.light = $('#triangle-light');
	
	this.styles = "/* \n * \"Happy Valentine's day\" v1.0.0"+
            "\n * Robot rights protected under MIT License"+
            "\n * Made by Frost\n */"+
            "\n\nbody, .page-3 {"+
            "\n  background: #1a1c24; color: #fff;"+
            "\n  font-size: 18px; line-height: 1.5;"+
            "\n  -webkit-font-smoothing: subpixel-antialiased;"+
            "\n}"+
            "\n\n/* ..."+
            "\n *"+
            "\n * ...Здраствуй!"+
            "\n *"+
            "\n * Це я, Саша."+         
            "\n *"+
            "\n * Я сьогодні трішки побуду в ролі бота)."+
            "\n *"+
            "\n * ...Скучно, роботу не завезли."+
            "\n *"+
            "\n *"+
            "\n * Тому я вирішив привітати тебе"+
            "\n * через декілька стрічок коду."+
            "\n *"+
            "\n * Здивована? Дивись!"+
            "\n *"+
            "\n */"+
            "\n\npre {"+ 
            "\n  position: fixed; width: 48%;"+
            "\n  top: 30px; bottom: 30px; left: 26%;"+
            "\n  transition: left 500ms;"+
            "\n  background-color: #313744; color: #a6c3d4;"+
            "\n  border: 1px solid rgba(0,0,0,0.2);"+
            "\n  padding: 24px 12px;"+
            "\n  box-sizing: border-box;"+
            "\n  border-radius: 3px;"+
            "\n  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);"+
            "\n}"+
            "\n\n\n/*"+
            "\n * Добавимо підсвітку"+
            "\n * Кольору Ocean Dark"+
            "\n */"+
            "\n\npre em:not(.comment) { font-style: normal; }"+
            "\n\n.comment       { color: #707e84; }"+
            "\n.selector      { color: #c66c75; }"+
            "\n.selector .key { color: #c66c75; }"+
            "\n.key           { color: #c7ccd4; }"+
            "\n.value         { color: #d5927b; }"+
            "\n\n\n/*"+ 
            "\n * Давай створимо моє маленьке серце.\n */"+ 
            "\n\n\n/* Спочатку, заберемо цей контейнер,щоб не заважав */"+
            "\n\npre { left: 50%; }"+
            "\n\n\n/* Тепер ми можем перейти до створення.*/"+
            "\n\n.scene {"+
            "\n  position: absolute;"+
            "\n  width: 50%; height: 100%;"+
            "\n  top: 0; left: 0"+
            "\n  display: block;"+
            "\n  background-image: radial-gradient(1600px at 70% 120%,"+
            "\n  rgba(33, 39, 80, 1) 10%, #020409 100%);"+
            "\n}"+
            "\n\n#heart { z-index: 8; }"+
            "\n#echo  { z-index: 7; }"+
            "\n\n#heart::before, #heart::after, #echo::before, #echo::after {"+
            "\n  content: '';"+
            "\n  position: absolute;"+
            "\n  top: 40px;"+
            "\n  width: 150px; height: 240px;"+
            "\n  background: #D84535;"+
            "\n  border-radius: 150px 150px 0 0;"+
            "\n  transform: rotate(-45deg);"+
            "\n  transform-origin: 0 100%;"+
            "\n}"+
            "\n\n#heart::before, #echo::before {"+
            "\n  left: 150px;"+
            "\n}"+
            "\n\n#heart::after, #echo::after {"+
            "\n  left: 0;"+
            "\n  transform: rotate(45deg);"+
            "\n  transform-origin: 100% 100%;"+
            "\n}"+
            "\n\n\n/* Добавимо трішки няшності */"+
            "\n\n#heart::after {"+
            "\n  box-shadow:"+
            "\n    inset -6px -6px 0px 6px rgba(255,255,255,0.1);"+
            "\n}"+
            "\n\n#heart::before {"+
            "\n  box-shadow:"+
            "\n    inset 6px 6px 0px 6px rgba(255,255,255,0.1);"+
            "\n}"+
            "\n\n\n/* А тепер подарую його тобі. */"+
            "\n\n#heart i::before {"+
            "\n  content: 'Ksyusha';"+
            "\n  position: absolute;"+
            "\n  z-index: 9;"+
            "\n  width: 100%;"+
            "\n  top: 31%; left: 0;"+
            "\n  font-style: normal;"+
            "\n  color: rgba(255,255,255,0.8);"+
            "\n  font-weight: 100;"+
            "\n  font-size: 3.9em;"+
            "\n  text-shadow: -1px -1px 0px rgba(0,0,0,0.2);"+
            "\n}"+
            "\n\n#heart i::after {"+
            "\n  content: \"♥\";"+
            "\n  position: absolute;"+
            "\n  color: rgba(255,255,255,1);"+
            "\n  font-size: 22px;"+
            "\n  line-height: 1;"+
            "\n  top: 105px; left: 74px;"+
            "\n  font-style: normal;"+
            "\n  z-index: 5;"+
            "\n  text-shadow: -1px -1px 0px rgba(0,0,0,0.2);"+
            "\n}"+
            "\n\n\n/*"+
            "\n * Серце повинно битись, "+
			"\n * тож давай оживимо його."+
            "\n */"+
            "\n\n@keyframes heartbeat {"+
            "\n  0%   { transform: scale(0.95); }"+
            "\n  15%  { transform: scale(1.00); }"+
            "\n  30%  { transform: scale(0.95); }"+
            "\n  50%  { transform: scale(1.10); }"+
            "\n  75%  { transform: scale(0.95); }"+
            "\n  100% { transform: scale(0.95); }"+
            "\n}"+
            "\n\n@keyframes echo {"+
            "\n  0%   {"+
            "\n    opacity: 0.1;"+
            "\n    transform: scale(1);"+
            "\n  }"+
            "\n  100% {"+
            "\n    opacity: 0;"+
            "\n    transform: scale(1.4);"+
            "\n  }"+
            "\n}"+
            "\n\n\n/*"+
            "\n * Чудово! тепер серцебиття..."+
            "\n */"+
            "\n\n#heart, #echo {"+
            "\n   animation-duration: 2000ms;"+
            "\n   animation-timing-function:"+
            "\n     cubic-bezier(0, 0, 0, 1.74);"+
            "\n   animation-delay: 500ms;"+
            "\n   animation-iteration-count: infinite;"+
            "\n   animation-play-state: paused;"+
            "\n}"+
            "\n\n#heart {"+
            "\n   animation-name: heartbeat;"+
            "\n}"+
            "\n\n#echo {"+
            "\n   animation-name: echo;"+
            "\n}"+
            "\n\n\n/*"+
            "\n * Готово..."+
            "\n */"+
            "\n\n#heart, #echo {"+
            "\n\n/*"+
            "\n * ...заводимо..."+
            "\n */"+
            "\n   animation-play-state: running;"+
            "\n\n/*"+
            "\n * ...оживляєм!"+
            "\n */"+
            "\n\n}"+
            "\n\n/*"+
            "\n * А тепер, добавимо трішки магії..."+
            "\n */"+
            "\n\ncanvas.heartbeat {"+ 
            "\n  width: 202px;"+ 
            "\n  height: 240px;"+ 
            "\n  position: absolute;"+ 
            "\n  z-index: 1;"+ 
            "\n  top: calc(50% - 101px);"+ 
            "\n  left: calc(50% - 101px);"+
            "\n  transform: scale(0.95);"+
            "\n  display: block;"+ 
            "\n}"+
            "\n\n/*"+
            "\n *"+
            "\n * Урааааааа!"+
            "\n *"+
            "\n * Ми це зробили!"+
            "\n *"+
            "\n * Я маю на увазі, я зробив,"+
            "\n * але ти тепер знаєш як це працює,"+
            "\n * і як класно програмувати."+
            "\n *"+
            "\n * Це серце для тебе! Правда поки віртуальне..."+
            "\n *"+
            "\n * А зараз я розповім тобі,"+
            "\n * що ж було у мене в кармані."+
            "\n */";
	this.page3.append("<style id=\"style-tag\"></style>\n<pre id=\"style-text\"></pre>");
    //this.audio.play();
    this.sound = new Howl({
        src: ['./media/a-himitsu-adventures.mp3', './media/a-himitsu-adventures.ogg'],
        autoplay: false,
        loop: true,
        volume: 1,
    });
	this.start();
}

Play.prototype.start = function(){
	var self = this;
    this.master = new TimelineMax();
	this.playButton.on('click', function(){
		self.page1.addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page1.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page3.addClass("pt-page-rotateCubeTopIn page-current");
        self.audio = self.sound.play();
		// self.writeStyles(self.styles, 0, self.options.time);
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

Play.prototype.writeStyleChar = function(which){
	if (which === '/' && this.options.openComment === false) {
		this.options.openComment = true;
		this.styles = $('#style-text').html() + which;
	} else if (which === '/' && this.options.openComment === true) {
		this.options.openComment = false;
		this.styles = $('#style-text').html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
	} else if (which === ':') {
		this.styles = $('#style-text').html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
	} else if (which === ';') {
		this.styles = $('#style-text').html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
	} else if (which === '{') {
		this.styles = $('#style-text').html().replace(/(.*)$/, '<em class="selector">$1</em>{');
	} else {
		this.styles = $('#style-text').html() + which;
	}
	$('#style-text').html(this.styles);
	return $('#style-tag').append(which);
}

Play.prototype.writeStyles = function(message, index, interval) {
	var self = this;
	if (index < message.length) {
		$('#style-text').scrollTop($('#style-text').prop("scrollHeight"));
		this.writeStyleChar(message[index++]);
		setTimeout((function() {
			return self.writeStyles(message, index, interval);
		}), interval);
	}
	else if (index == message.length) {
		setTimeout(function(){
            self.page1.removeClass("page-current pt-page-ontop");
            self.page2.removeClass("page-current pt-page-ontop");
            self.page3.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
            self.page5.addClass("pt-page-rotateCubeTopIn page-current");
		}, 6000);
		
	}
};



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
        .to(this.girl.find('#girl-arm'), 1, {rotation: 0})
        .to(this.girl.find('#girl-body'), 0.5, {transformOrigin: '0% 75%', rotation: 0})
        .to(this.girl.find('#girl-eye'), 0.5, {transformOrigin: '0% 50%', scaleY: 0.1}, 1.25)
        .to(this.girl.find('#girl-leg-1'), 1.5, {rotation: 0, ease: Back.easeOut.config(3)}, 1.25);
    return tl;
}


Play.prototype.boyStuff = function() {
    var tl = new TimelineMax();
    tl
        .to(this.boy.find('#boy-eye'), 0.5, {transformOrigin: '0% 50%', scaleY: 0.1})

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
            clock.init('canvas')
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

function Clock(){}

Clock.prototype.init = function (canvasID) {
    this.canvas;
    this.tx;
    this.bgGrad = true;
    this.gradient;
    this.height = 400;
    this.key = {
        up: false,
        shift: false
    };
    this.particles = [];
    this.mouse = {
        x: 0,
        y: 0
    };
    this.press = false;
    this.quiver = true;
    this.texts = ["Клікай мене", "Виздоровляй", "Швидше", "і", "гарного", "Настрою"];
    this.text = this.texts[0];
    this.textNum = 0;
    this.textSize = 60;
    this.valentine = false;
    this.msgTime = 100;
    this.updateColor = true;
    this.width = 420;
    this.MIN_WIDTH = 0;
    this.MIN_HEIGHT = 0;
    this.PARTICLE_NUM = 1200;
    this.RADIUS = Math.PI * 2;

    this.canvas = document.getElementById(canvasID);
    if (this.canvas === null || !this.canvas.getContext) {
        return;
    }
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.event();

    for (var i = 0; i < this.PARTICLE_NUM; i++) {
        this.particles[i] = new Particle(this.canvas);
    }

    // requestAnimFrame(function(){
    // 	this.loop();
    // }.bind(this));

    this.interval = setInterval(function () {
		this.loop()
    }.bind(this), 60);
};

Clock.prototype.event = function () {
    var end = false;
    this.canvas.addEventListener('click', function (e) {
        this.textNum++;
        if (this.textNum >= this.texts.length) {
            this.textNum--;
            end = true;
            setTimeout(function(){
                play.page1.removeClass("page-current pt-page-ontop");
                play.page2.removeClass("page-current pt-page-ontop");
                play.page3.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
                play.page5.addClass("pt-page-rotateCubeTopIn page-current");
            }, 1000);
            clearInterval(this.interval)
            setTimeout(function(){
                window.location.reload()
            },10000)
            return;
        }
        this.text = this.texts[this.textNum];
    }.bind(this), false);
};

Clock.prototype.defaultStyles = function () {
    // textSize = 36;
    // particleColor = 'rgba(226,225,142, 0.7)';
};

Clock.prototype.draw = function (p) {
    this.ctx.fillStyle = 'rgba(255,255,255, ' + p.opacity + ')';
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, this.RADIUS, true);
    this.ctx.closePath();
    this.ctx.fill();
};

Clock.prototype.loop = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
    // textSize = 36;

    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.textBaseline = "middle";
    this.ctx.font = this.textSize + "px 'Comfortaa', 'Helvetica Neue', 'Arial', 'sans-serif'";
    this.ctx.fillText(this.text, (this.width - this.ctx.measureText(this.text).width) * 0.5, this.height * 0.5);

    var imgData = this.ctx.getImageData(0, 0, this.width, this.height);

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (var i = 0, l = this.particles.length; i < l; i++) {
        var p = this.particles[i];
        p.inText = false;
    }
    this.particleText(imgData);
};

Clock.prototype.pad = function (number) {
    return ('0' + number).substr(-2);
};

Clock.prototype.particleText = function (imgData) {
    var pxls = [];
    for (var w = this.width; w > 0; w -= 3) {
        for (var h = 0; h < this.width; h += 3) {
            var index = (w + h * (this.width)) * 4;
            if (imgData.data[index] > 1) {
                pxls.push([w, h]);
            }
        }
    }

    var count = pxls.length;
    var j = parseInt((this.particles.length - pxls.length) / 2, 10)
    if (j < 0) {
        j = 0;
    }

    for (var i = 0; i < pxls.length && j < this.particles.length; i++, j++) {
        try {
            var p = this.particles[j],
                X,
                Y;

            if (this.quiver) {
                X = (pxls[count - 1][0]) - (p.px + Math.random() * 5);
                Y = (pxls[count - 1][1]) - (p.py + Math.random() * 5);
            } else {
                X = (pxls[count - 1][0]) - p.px;
                Y = (pxls[count - 1][1]) - p.py;
            }
            var T = Math.sqrt(X * X + Y * Y);
            var A = Math.atan2(Y, X);
            var C = Math.cos(A);
            var S = Math.sin(A);
            p.x = p.px + C * T * p.delta;
            p.y = p.py + S * T * p.delta;
            p.px = p.x;
            p.py = p.y;
            p.inText = true;
            p.fadeIn();
            this.draw(p);
            if (this.key.up === true) {
                p.size += 0.3;
            } else {
                var newSize = p.size - 0.5;
                if (newSize > p.origSize && newSize > 0) {
                    p.size = newSize;
                } else {
                    p.size = m.origSize;
                }
            }
        } catch (e) {

        }
        count--;
    }
    for (var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        if (!p.inText) {
            // p.px = p.mx;
            // p.py = p.my;
            // p.opacity = 1;
            p.fadeOut();

            var X = p.mx - p.px;
            Y = p.my - p.py;

            var T = Math.sqrt(X * X + Y * Y);

            var A = Math.atan2(Y, X);

            var C = Math.cos(A);

            var S = Math.sin(A);

            p.x = p.px + C * T * p.delta / 2;
            p.y = p.py + S * T * p.delta / 2;
            p.px = p.x;
            p.py = p.y;

            this.draw(p);
        }

    }

};


Clock.prototype.setDimensions = function () {
    // width = window.innerWidth;
    // height = window.innerHeight;

    this.canvas.width = window.innerWidth >= 420 ? window.innerWidth : this.width;
    this.canvas.height = window.innerHeight >= 150 ? 150 : this.height;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '-75px';
    this.canvas.style.top = '0px';
    this.canvas.style.bottom = '0px';
    this.canvas.style.right = '0px';
    this.canvas.style.marginTop = window.innerHeight * .15 + 'px';
};

Clock.prototype.setGradient = function (gradientStops) {


    this.gradient = this.ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);


    for (var position in gradientStops) {
        var color = gradientStops[position];
        this.gradient.addColorStop(position, color);
    }
};
function Particle(canvas){
    var range = Math.random() * 180 / Math.PI,
        spread = canvas.height / 4,
        size = Math.random() * 1.2;

    this.delta = 0.15;
    this.x = 0;
    this.y = 0;

    this.px = (canvas.width / 2) + ((Math.random() - 0.5) * canvas.width);
    this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread);

    this.mx = this.px;
    this.my = this.py;

    this.velocityX = Math.floor(Math.random() * 10) - 5;
    this.velocityY = Math.floor(Math.random() * 10) - 5;

    this.size = size;
    this.origSize = size;

    this.inText = false;

    this.opacity = 0;
    this.do = 0.02;

    this.opacityTresh = 0.98
    this.fadingOut = true;
    this.fadingIn = true;
}

Particle.prototype.fadeIn = function () {
	this.fadingIn = this.opacity > this.opacityTresh ? false : true;
	if (this.fadingIn) {
		this.opacity += this.do;
	} else {
		this.opacity = 1;
	}
};

Particle.prototype.fadeOut = function () {
	this.fadingOut = this.opacity < 0 ? false : true;
	if (this.fadingOut) {
		this.opacity -= 0.06;
		if (this.opacity < 0) {
			this.opacity = 0
		}
	} else {
		this.opacity = 0
	}
};

var play = new Play();
var scene = new Scene();
var universe = new Universe();
var clock = new Clock();

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
    grd.addColorStop(0,"#020409");
    grd.addColorStop(1,"rgba(33, 39, 80, 1)");

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
    var center = { x: canvas.width / 2, y: canvas.height / 2 };
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
        grd.addColorStop(0,"#020409");
        grd.addColorStop(1,"rgba(33, 39, 80, 1)");

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
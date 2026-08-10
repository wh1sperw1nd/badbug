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
    //this.sound = new Howl({
    //    src: ['./media/a-himitsu-adventures.mp3', './media/a-himitsu-adventures.ogg'],
    //    autoplay: false,
    //    loop: true,
    //    volume: 1,
    //});
	this.start();
}

Play.prototype.start = function(){
	var self = this;
    this.master = new TimelineMax();
	this.playButton.on('click', function(){
		self.page1.addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page1.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page3.addClass("pt-page-rotateCubeTopIn page-current");
        // self.audio = self.sound.play();
		// self.writeStyles(self.styles, 0, self.options.time);

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


var play = new Play();
var scene = new Scene();

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
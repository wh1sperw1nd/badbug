function Play(){}
var hearts = {};
var heartIndex = 0;
var headerHeight = 60;

Play.prototype.init = function(){
	this.options= {
		openComment: false,
		time: window.innerWidth <= 578 ? 16 : 10,
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
	this.audio = document.getElementById('audio');
	
	this.styles = "/* \n * \"Let's a little ride\" v1.0.0"+
            "\n * Robot rights protected under BOT License"+
            "\n * Made by Arcanum\n */"+
            "\n\nbody, .page-2 {"+
            "\n  background: #1a1c24; color: #fff;"+
            "\n  font-size: 18px; line-height: 1.5;"+
            "\n  -webkit-font-smoothing: subpixel-antialiased;"+
            "\n}"+
            "\n\n/* ..."+
            "\n *"+
            "\n * ...Hello!"+
            "\n *"+
            "\n * Oh hai! It's me, Arcanum"+         
            "\n *"+
            "\n * I'm just sitting here coding away."+
            "\n *"+
            "\n * ...Sure, you can watch."+
            "\n *"+
            "\n *"+
            "\n * This CSS is being injected into a DOM <style> element"+
            "\n * and written in this <pre> element simultaneously."+
            "\n *"+
            "\n * Confused? Watch!"+
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
            "\n * Syntax highlighting"+
            "\n * Colors based on Base16 Ocean Dark"+
            "\n */"+
            "\n\npre em:not(.comment) { font-style: normal; }"+
            "\n\n.comment       { color: #707e84; }"+
            "\n.selector      { color: #c66c75; }"+
            "\n.selector .key { color: #c66c75; }"+
            "\n.key           { color: #c7ccd4; }"+
            "\n.value         { color: #d5927b; }"+
            "\n\n\n/*"+ 
            "\n * Let's build my little bike.\n */"+ 
            "\n\n\n/* First, we'll move this s*** over */"+
            "\n\npre { left: 50%; }"+
            "\n\n\n/* Well, now we can build. */"+
            "\n\n.bike-container {"+
            "\n  position: absolute;"+
            "\n  top: 50%;"+
            "\n  left: 20%;"+
            "\n  transform: translate(-20%, -50%);"+
            "\n  width: 220px;"+
            "\n  height: 125px;"+
            "\n  color: black;"+
            "\n  font-family: 'droid Sans', sans-serif;"+
            "\n}"+
            "\n\n.bike-container * { box-sizing: border-box; }"+ 
            "\n\n.bike-body {"+
            "\n  width: 250px;"+
            "\n  height: 108px;"+
            "\n  position: relative;"+
            "\n  left: -20px;"+
            "\n  top: 3px;"+
            "\n}"+
            "\n\n.bike-body .seat {"+
            "\n  width: 30px;"+
            "\n  height: 30px;"+
            "\n  background: radial-gradient(circle at right top, rgba(248, 80, 50, 0) 0%,"+ 
            "\n              rgba(241, 111, 92, 0) 50%, rgba(246, 41, 12, 0) 51%,"+ 
            "\n              rgba(242, 45, 19, 0) 64%, #434b59 65%, #434b59 71%, #434b59 100%);"+
            "\n  background-position: center;"+
            "\n  background-repeat: no-repeat;"+
            "\n  transform: rotateZ(-40deg);"+
            "\n  position: absolute;"+
            "\n  top: 64px;"+
            "\n  left: 65px;"+
            "\n}"+
            "\n\n.bike-body .seat:before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 9px;"+
            "\n  height: 35px;"+
            "\n  position: relative;"+
            "\n  top: -2px;"+
            "\n  left: -4px;"+
            "\n  background: #434B59;"+
            "\n  border-radius: 5px;"+
            "\n}"+
            "\n\n.bike-body .seat:after {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 35px;"+
            "\n  height: 9px;"+
            "\n  position: relative;"+
            "\n  top: -10px;"+
            "\n  left: -4px;"+
            "\n  background: #434B59;"+
            "\n  border-radius: 5px;"+
            "\n}"+
            "\n\n.bike-body .cover {"+
            "\n  width: 75px;"+
            "\n  height: 30px;"+
            "\n  background: #F4492C;"+
            "\n  position: absolute;"+
            "\n  top: 55px;"+
            "\n  left: 105px;"+
            "\n  border-top-color: transparent;"+
            "\n  border-left-color: transparent;"+
            "\n  border-radius: 110px 20px 15px 5px/50px 20px 20px 5px;"+
            "\n  z-index: 11;"+
            "\n  box-shadow: inset -5px -2px 0px 2px rgba(0, 0, 0, 0.2);"+
            "\n}"+
            "\n\n.bike-body .lamp {"+
            "\n  width: 25px;"+
            "\n  height: 25px;"+
            "\n  background: linear-gradient(90deg, #434b59 65%, #FFDD4D 35%);"+
            "\n  border-radius: 70px 60px 60px 50px/40px 60px 60px 15px;"+
            "\n  position: relative;"+
            "\n  top: 60px;"+
            "\n  right: -185px;"+
            "\n}"+
            "\n\n.bike-body .motor {"+
            "\n  width: 75px;"+
            "\n  height: 45px;"+
            "\n  position: absolute;"+
            "\n  left: 90px;"+
            "\n  top: 90px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-1 {"+
            "\n  width: 35px;"+
            "\n  height: 45px;"+
            "\n  display: inline-block;"+
            "\n}"+
            "\n\n.bike-body .motor .part-1 .part-1-top {"+
            "\n  width: 40px;"+
            "\n  height: 20px;"+
            "\n  background: linear-gradient(135deg, transparent 10px, #F5492C 0);"+
            "\n  border-radius: 0px 5px 5px 5px;"+
            "\n  box-shadow: inset -2px -2px 0px 1px rgba(0, 0, 0, 0.2);"+
            "\n}"+
            "\n\n.bike-body .motor .part-1 .part-1-bottom {"+
            "\n  width: 35px;"+
            "\n  height: 17px;"+
            "\n  background: #829399;"+
            "\n  position: relative;"+
            "\n  top: 5px;"+
            "\n  border-radius: 5px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-1 .part-1-bottom:after {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 17px;"+
            "\n  height: 17px;"+
            "\n  border-radius: 50%;"+
            "\n  background: #829399;"+
            "\n  border: 3px solid #A2B1B7;"+
            "\n  position: relative;"+
            "\n  left: 13px;"+
            "\n  top: -3px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 {"+
            "\n  width: 30px;"+
            "\n  height: 45px;"+
            "\n  display: inline-block;"+
            "\n  -webkit-animation: shake 0.1s infinite;"+
            "\n  animation: shake 0.1s infinite;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 .part-2-base {"+
            "\n  width: 25px;"+
            "\n  height: 33px;"+
            "\n  background: #A4B4BA;"+
            "\n  margin: auto;"+
            "\n  position: relative;"+
            "\n  top: 5px;"+
            "\n  left: 5px;"+
            "\n  border-radius: 15px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 .part-2-base .line {"+
            "\n  position: relative;"+
            "\n  margin: auto;"+
            "\n  width: 105%;"+
            "\n  left: -2.5%;"+
            "\n  top: -2px;"+
            "\n  height: 4px;"+
            "\n  background: #829399;"+
            "\n  margin-bottom: 6px;"+
            "\n  border-radius: 3px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 .part-2-base .line:nth-child(1) {"+
            "\n  height: 6px;"+
            "\n  background: #434B59;"+
            "\n  top: 0;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 .part-2-base .line:nth-child(1):before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 20px;"+
            "\n  height: 4px;"+
            "\n  background: #434B59;"+
            "\n  margin: auto;"+
            "\n  position: relative;"+
            "\n  top: -3px;"+
            "\n  border-radius: 5px;"+
            "\n}"+
            "\n\n.bike-body .motor .part-2 .part-2-base .line:nth-child(4) { width: 60%; }"+
            "\n\n.bike-body .front {"+
            "\n  position: absolute;"+
            "\n  width: 10px;"+
            "\n  height: 100px;"+
            "\n  background: #AABABF;"+
            "\n  transform: rotateZ(-30deg);"+
            "\n  right: 53px;"+
            "\n  top: 40px;"+
            "\n  border-radius: 7px;"+
            "\n  z-index: 10;"+
            "\n}"+
            "\n\n.bike-body .front:before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 25px;"+
            "\n  height: 6px;"+
            "\n  background: #434b59;"+
            "\n  border-radius: 5px;"+
            "\n  transform: rotateZ(30deg);"+
            "\n  position: relative;"+
            "\n  left: -18px;"+
            "\n  top: -7px;"+
            "\n}"+
            "\n\n.bike-body .front:after {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 12px;"+
            "\n  height: 12px;"+
            "\n  border-radius: 50%;"+
            "\n  background: #434b59;"+
            "\n  position: absolute;"+
            "\n  top: -5px;"+
            "\n}"+
            "\n\n.bike-body .back {"+
            "\n  position: absolute;"+
            "\n  width: 120px;"+
            "\n  box-sizing: content-box;"+
            "\n  background: transparent;"+
            "\n  border: 10px solid #AABABF;"+
            "\n  border-top-color: transparent;"+
            "\n  border-right-color: transparent;"+
            "\n  border-left-color: transparent;"+
            "\n  bottom: -40px;"+
            "\n  left: 30px;"+
            "\n  z-index: 10;"+
            "\n}"+
            "\n\n.bike-body .back:before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 75px;"+
            "\n  height: 13px;"+
            "\n  background: #AABABF;"+
            "\n  position: absolute;"+
            "\n  left: 123px;"+
            "\n  top: 2px;"+
            "\n  transform-origin: 0px;"+
            "\n  transform: rotateZ(-70deg);"+
            "\n  border-radius: 0px 0px 10px 0px;"+
            "\n}"+
            "\n\n.bike-body .back:after {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  position: absolute;"+
            "\n  width: 80px;"+
            "\n  height: 9px;"+
            "\n  background: transparent;"+
            "\n  border: 10px solid #AABABF;"+
            "\n  border-left-color: transparent;"+
            "\n  border-bottom-color: transparent;"+
            "\n  border-radius: 0px 10px 0px 0px;"+
            "\n  transform: skewX(20deg);"+
            "\n  top: -18px;"+
            "\n  left: -50px;"+
            "\n}"+
            "\n\n.tire {"+
            "\n  position: absolute;"+
            "\n  width: 50px;"+
            "\n  height: 50px;"+
            "\n  border-radius: 50%;"+
            "\n  background: #ccc;"+
            "\n  border: 15px solid white;"+
            "\n  box-shadow: 0px 0px 0px 10px #454D5B;"+
            "\n}"+
            "\n\n.tire:before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 50px;"+
            "\n  height: 50px;"+
            "\n  border: 10px solid transparent;"+
            "\n  border-top-color: #F5492C;"+
            "\n  border-radius: 50%;"+
            "\n  background: transparent;"+
            "\n  position: relative;"+
            "\n  top: -30px;"+
            "\n  left: -25px;"+
            "\n}"+
            "\n\n.tire:after {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 50px;"+
            "\n  height: 50px;"+
            "\n  border: 4px solid transparent;"+
            "\n  border-top-color: rgba(0, 0, 0, 0.2);"+
            "\n  border-radius: 50%;"+
            "\n  background: transparent;"+
            "\n  position: relative;"+
            "\n  top: -93px;"+
            "\n  left: -19px;"+
            "\n  z-index: 9;"+
            "\n}"+
            "\n\n.tire:nth-child(2) { right: 0; }"+
            "\n\n.tire:nth-child(2):before, .tire:nth-child(2):after { transform: rotateZ(-20deg); }"+
            "\n\n.smoke {"+
            "\n  width: 15px;"+
            "\n  height: 15px;"+
            "\n  background: #cdcdcd;"+
            "\n  border-radius: 50%;"+
            "\n  position: absolute;"+
            "\n  top: 120px;"+
            "\n  left: -50px;"+
            "\n  -webkit-animation: fly 3s infinite;"+
            "\n  animation: fly 3s infinite;"+
            "\n}"+
            "\n\n.smoke:before {"+
            "\n  content: '';"+
            "\n  display: block;"+
            "\n  width: 12px;"+
            "\n  height: 12px;"+
            "\n  border-radius: 50%;"+
            "\n  background: #cdcdcd;"+
            "\n  position: relative;"+
            "\n  right: -12px;"+
            "\n  top: 5px;"+
            "\n}"+            
            "\n\n\n/*"+
            "\n * Ready..."+
            "\n */"+
            "\n\n/*"+
            "\n * ...Let's start... and revive!"+
            "\n */"+
            "\n\n@-webkit-keyframes shake {"+
            "\n  0%, 100% {"+
                "\n    transform: rotateZ(0deg);"+
            "\n  }"+
            "\n  25% {"+
                "\n    transform: rotateZ(-5deg);"+
            "\n  }"+
            "\n  50% {"+
                "\n    transform: rotateZ(5deg);"+
            "\n  }"+
            "\n}"+
            "\n\n@keyframes shake {"+
                "\n  0%, 100% {"+
                    "\n    transform: rotateZ(0deg);"+
                "\n  }"+
                "\n  25% {"+
                    "\n    transform: rotateZ(-5deg);"+
                "\n  }"+
                "\n  50% {"+
                    "\n    transform: rotateZ(5deg);"+
                "\n  }"+
            "\n}"+
            "\n\n}"+
            "\n\n/*"+
            "\n * And now, add a little magic..."+
            "\n */"+
            "\n\n@-webkit-keyframes fly {"+
                "\n  0% {"+
                    "\n    opacity: 1;"+
                "\n  }"+
                "\n  35%, 100% {"+
                    "\n    opacity: 0;"+
                    "\n    top: 100px;"+
                    "\n    left: -70px;"+
                "\n  }"+
            "\n}"+
            "\n\n@keyframes fly {"+
                "\n  0% {"+
                    "\n    opacity: 1;"+
                "\n  }"+
                "\n  35%, 100% {"+
                    "\n    opacity: 0;"+
                    "\n    top: 100px;"+
                    "\n    left: -70px;"+
                "\n  }"+
            "\n}"+
			"\n\n.the-end {"+ 
			"\n  opacity: 1;"+
  			"\n  transform: scale(1);"+
			"\n}"+
            "\n\n/*"+
            "\n *"+
            "\n * Wahoo!"+
            "\n *"+
            "\n * We did it!"+
            "\n *"+
            "\n * I mean *I* did it, but you know, whatever..."+
            "\n * but now you know how it works"+
            "\n * and how cool to program."+
            "\n *"+
            "\n * This bike for you! So, let's a little ride?";
	this.page2.append("<style id=\"style-tag\"></style>\n<div class=\"bike-container\"><div class=\"bike-body\"><div class=\"seat\"></div><div class=\"cover\"></div><div class=\"lamp\"></div><div class=\"motor\"><div class=\"part-1\"><div class=\"part-1-top\"></div><div class=\"part-1-bottom\"></div></div><div class=\"part-2\"><div class=\"part-2-base\"><div class=\"line\"></div><div class=\"line\"></div><div class=\"line\"></div><div class=\"line\"></div></div></div></div><div class=\"front\"></div><div class=\"back\"></div></div><div class=\"tire\"></div><div class=\"tire\"></div><div class=\"smoke\"></div></div><i></i></span>\n<pre id=\"style-text\"></pre>");
	this.start();
}

Play.prototype.start = function(){
	var self = this;
	this.playButton.on('click', function(){
		self.audio.play();
		self.page1.addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page2.addClass("pt-page-rotateCubeTopIn page-current");
		self.page1.removeClass("page-current pt-page-ontop");
		// self.page2.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		// self.page3.addClass("pt-page-rotateCubeTopIn page-current");
		self.writeStyles(self.styles, 0, self.options.time);
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
			self.theEnd();	
		}, 6000);
		
	}
};


Play.prototype.whichAnimationEvent = function() {
	var t,
    el = document.createElement("fakeelement");

  	var animations = {
  		"animation"      : "animationend",
    	"OAnimation"     : "oAnimationEnd",
    	"MozAnimation"   : "animationend",
    	"WebkitAnimation": "webkitAnimationEnd"
  	}

  	for (t in animations){
    	if (el.style[t] !== undefined){
      		return animations[t];
    	}
  	}
}

Play.prototype.theEnd = function() {
	this.page1.removeClass("page-current pt-page-ontop");
	this.page2.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
	this.page3.addClass("pt-page-rotateCubeTopIn page-current");
}

Play.prototype.muteSound = function(){
	var self = this;
	var state = false;
	this.volumeButton.on('click', function(){
 		if (!state){
			$(this).removeClass("fa-volume-up").addClass("fa-volume-off");
			self.audio.pause();
			state = true;
 		}
 		else {
			$(this).removeClass("fa-volume-off").addClass("fa-volume-up");
			self.audio.play();
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







function Play(){}
var hearts = {};
var heartIndex = 0;

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

	//this.audio.play();
	this.sound = new Howl({
		src: ['./assets/media/snore.mp3'],
		autoplay: false,
		loop: true,
		volume: 0.3,
	});
	this.bgSound = new Howl({
		src: ['./assets/media/jinglebells.mp3'],
		autoplay: false,
		loop: true,
		volume: 1,
	});

	this.fireSound = new Howl({
		src: ['./assets/media/fire.mp3'],
		autoplay: false,
		loop: true,
		volume: 1,
	});

	this.start();
}

Play.prototype.start = function(){
	var self = this;
	// this.govnoScale();
	// $(window).on( "orientationchange resize", function(event) {
	// 	this.govnoScale();
	// }.bind(this));
	this.playButton.on('click', function(){
		self.page1.addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page1.removeClass("pt-page-rotateCubeTopIn").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
		self.page3.addClass("pt-page-rotateCubeTopIn page-current");
		self.audio = self.bgSound.play();
		self.audio = self.sound.play();
		self.audio = self.fireSound.play();
		self.initSounds();
	});
};

Play.prototype.initSounds = function(){
	var audio = null
	$('[data-sound]').hover(function (e) {
			var soundName = e.currentTarget.dataset.sound;
			audio = new Howl({
				src: ['./assets/media/'+soundName+'.mp3'],
				autoplay: false,
				loop: false,
				volume: 1,
			});
			audio.play();
		}, function () {
			audio.pause();
			sound = null;
		}
	);
};

Play.prototype.muteSound = function(){
	var self = this;
	var state = false;
	this.volumeButton.on('click', function(){
		if (!state){
			$(this).removeClass("fa-volume-up").addClass("fa-volume-off");
			self.sound.pause(this.audio);
			self.bgSound.pause(this.audio);
			self.fireSound.pause(this.audio);
			state = true;
		}
		else {
			$(this).removeClass("fa-volume-off").addClass("fa-volume-up");
			self.sound.play();
			self.bgSound.play();
			self.fireSound.play();
			state = false;
		}
	});
};

Play.prototype.govnoScale = function(){
	var styles="";
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
};

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
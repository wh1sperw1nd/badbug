function Play(){}
var hearts = {};
var heartIndex = 0;
window.currentPage;
Play.prototype.init = function(){

	this.styles;
	this.canvas;
	this.context;
	this.lastPoint;
	this.playButton = $('#play');
	this.volumeButton = $('.mute');
    this.page0 = $('.page-0');
	this.page1 = $('.page-1');
	this.audio = document.getElementById('audio');
	
	this.start();
}

Play.prototype.start = function(){
	var self = this;
	this.playButton.on('click', function(){
		self.audio.play();
		self.page0.addClass("pt-page-rotateCubeTopOut pt-page-ontop").removeClass("page-current");
		self.page1.addClass("pt-page-rotateCubeTopIn page-current");

        currentPage = new PlayCat();
        currentPage.init();
        requestAnimation()
	});
    this.navigation();
    
}
Play.prototype.navigation =  function(){
    var self = this;
    $(".arrows").click(function(e){
        var pageName = $(this).attr("data-page");
        $("canvas").remove();
        $(".arrows").removeClass("current");
        $(".page").removeClass("pt-page-rotateCubeTopIn page-current").addClass("pt-page-rotateCubeTopOut pt-page-ontop");
        $("."+pageName).removeClass("pt-page-rotateCubeTopOut pt-page-ontop").addClass("pt-page-rotateCubeTopIn page-current");

        if(pageName !="End"){
            cancelRequestAnimFrame(currentPage.RAFO);
            window[currentPage.name] = null;

            var pageCanvas = new window["Play"+pageName]();
            console.log(pageCanvas)
            currentPage = pageCanvas;
            currentPage.init();
            requestAnimation()
        }
    });
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

function MyScene() {
	this.canvas = document.createElement("canvas");
	this.canvas.classList.add("herts");
	this.context = this.canvas.getContext("2d");
}

MyScene.prototype.init = function() {
  	this.canvas.width = 100;
  	this.canvas.height = 100;
  	$(".copy").append(this.canvas);
	this.run();
};

function Heart(canvas) {
  	this.myscene = canvas;
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

  	var ctx = this.myscene.context;
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

MyScene.prototype.run = function() {
  	var h = this.canvas.height;
  	var w = this.canvas.width;
  	var ctx = this.context;

  	ctx.moveTo(0,0);
  	ctx.setTransform(1, 0, 0, 1, 0, 0);
  	ctx.clearRect(0, 0, w, h);

  	var numHearts = Object.keys(hearts).length;
  	if (numHearts < 10) {
		if (heartIndex === 0 || numHearts === 0) {
			new Heart(this);
		}
		else if (numHearts > 0 && hearts[Object.keys(hearts).pop()].age > ~~(Math.random() * 20) + 40) {
			new Heart(this);
		}

  	}

  	for (var j in hearts) {
    	hearts[j].draw();
  	}
  	requestAnimFrame(function(){this.run();}.bind(this));
}

var play = new Play();
var myScene = new MyScene();

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

    window.cancelRequestAnimFrame = (function(req){
        return  window.cancelAnimationFrame                 ||
                window.webkitCancelRequestAnimationFrame    ||
                window.mozCancelRequestAnimationFrame       ||
                window.oCancelRequestAnimationFrame         ||
                window.msCancelRequestAnimationFrame        ||
                clearTimeout
    })();



    window.requestAnimation = function(){
        if(currentPage) {
            currentPage.RAFO = requestAnimFrame(function(){
                currentPage.loop();
            });
        }
    }
	play.init();
	play.muteSound();
	myScene.init();

});







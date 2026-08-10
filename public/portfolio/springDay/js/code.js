$(document).ready(function(){
//    
//    function play() {
//        var playButton = document.getElementById('play');
//        $(playButton).on('click', function(){
//            $('.page-1').addClass("pt-page-rotateCarouselTopOut pt-page-ontop");
//            $('.page-2').addClass("pt-page-rotateCarouselTopIn page-current");
//            setTimeout(function(){
////                $("#os-phrases > h2").lettering('words').children("span").lettering().children("span").lettering();
//            },2000);
//        });
//    }
//    play();
//    (function() {
//        var openComment, styles, time, writeStyleChar, writeStyles;
//        styles = "/* \n * \"For You\" v1.0.0"+
//            "\n * Robot rights protected under BOT License"+
//            "\n * Authored by Frost\n */"+
//            "\n\nbody {"+
//            "\n  background-color: #1a1c24; color: #fff;"+
//            "\n  font-size: 13px; line-height: 1.4;"+
//            "\n  -webkit-font-smoothing: subpixel-antialiased;"+
//            "\n}"+
//            "\n\n/* ..."+
//            "\n *"+
//            "\n * ...hello?"+
//            "\n *"+
//            "\n * Oh hai guys! It's me, Frost."+         
//            "\n *"+
//            "\n * I'm just sitting here coding away."+
//            "\n *"+
//            "\n * Sure, you can watch."+
//            "\n *"+
//            "\n *"+
//            "\n * This CSS is being injected into a DOM <style> element"+
//            "\n * and written in this <pre> element simultaneously."+
//            "\n *"+
//            "\n * Confused? Watch!"+
//            "\n *"+
//            "\n */"+
//            "\n\npre {"+ 
//            "\n  position: fixed; width: 48%;"+
//            "\n  top: 30px; bottom: 30px; left: 26%;"+
//            "\n  transition: left 500ms;"+
//            "\n  background-color: #313744; color: #a6c3d4;"+
//            "\n  border: 1px solid rgba(0,0,0,0.2);"+
//            "\n  padding: 24px 12px;"+
//            "\n  box-sizing: border-box;"+
//            "\n  border-radius: 3px;"+
//            "\n  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);"+
//            "\n}"+
//            "\n\n\n/*"+
//            "\n * Syntax highlighting"+
//            "\n * Colors based on Base16 Ocean Dark"+
//            "\n */"+
//            "\n\npre em:not(.comment) { font-style: normal; }"+
//            "\n\n.comment       { color: #707e84; }"+
//            "\n.selector      { color: #c66c75; }"+
//            "\n.selector .key { color: #c66c75; }"+
//            "\n.key           { color: #c7ccd4; }"+
//            "\n.value         { color: #d5927b; }"+
//            "\n\n\n/*"+ 
//            "\n * Let's build my little pen heart.\n */"+ 
//            "\n\n\n/* First, we'll move this s*** over */"+
//            "\n\npre { left: 50%; }"+
//            "\n\n\n/* Now we can build my heart */"+
//            "\n\n#heart, #echo {"+ 
//            "\n  position: fixed;"+
//            "\n  width: 300px; height: 300px;"+
//            "\n  top: calc(50% - 150px);"+ 
//            "\n  left: calc(25% - 150px);"+
//            "\n  text-align: center;"+
//            "\n  -webkit-transform: scale(0.95);"+
//            "\n          transform: scale(0.95);"+
//            "\n}"+
//            "\n\n#heart { z-index: 8; }"+
//            "\n#echo  { z-index: 7; }"+
//            "\n\n#heart::before, #heart::after, #echo::before, #echo::after {"+
//            "\n  content: '';"+
//            "\n  position: absolute;"+
//            "\n  top: 40px;"+
//            "\n  width: 150px; height: 240px;"+
//            "\n  background: #D84535;"+
//            "\n  border-radius: 150px 150px 0 0;"+
//            "\n  -webkit-transform: rotate(-45deg);"+
//            "\n          transform: rotate(-45deg);"+
//            "\n  -webkit-transform-origin: 0 100%;"+
//            "\n          transform-origin: 0 100%;"+
//            "\n}"+
//            "\n\n#heart::before, #echo::before {"+
//            "\n  left: 150px;"+
//            "\n}"+
//            "\n\n#heart::after, #echo::after {"+
//            "\n  left: 0;"+
//            "\n  -webkit-transform: rotate(45deg);"+
//            "\n          transform: rotate(45deg);"+
//            "\n  -webkit-transform-origin: 100% 100%;"+
//            "\n          transform-origin: 100% 100%;"+
//            "\n}"+
//            "\n\n\n/* It needs some depth  */"+
//            "\n\n#heart::after {"+
//            "\n  box-shadow:"+
//            "\n    inset -6px -6px 0px 6px rgba(255,255,255,0.1);"+
//            "\n}"+
//            "\n\n#heart::before {"+
//            "\n  box-shadow:"+
//            "\n    inset 6px 6px 0px 6px rgba(255,255,255,0.1);"+
//            "\n}"+
//            "\n\n\n/* Makin it mine. */"+
//            "\n\n#heart i::before {"+
//            "\n  content: 'Vikusya';"+
//            "\n  position: absolute;"+
//            "\n  z-index: 9;"+
//            "\n  width: 100%;"+
//            "\n  top: 31%; left: 0;"+
//            "\n  font-style: normal;"+
//            "\n  color: rgba(255,255,255,0.8);"+
//            "\n  font-weight: 100;"+
//            "\n  font-size: 5em;"+
//            "\n  text-shadow: -1px -1px 0px rgba(0,0,0,0.2);"+
//            "\n}"+
//            "\n\n#heart i::after {"+
//            "\n  content: \"♥\";"+
//            "\n  position: absolute;"+
//            "\n  color: rgba(255,255,255,1);"+
//            "\n  font-size: 22px;"+
//            "\n  line-height: 1;"+
//            "\n  top: 105px; left: 74px;"+
//            "\n  font-style: normal;"+
//            "\n  z-index: 5;"+
//            "\n  text-shadow: -1px -1px 0px rgba(0,0,0,0.2);"+
//            "\n}"+
//            "\n\n\n/*"+
//            "\n * Hearts gotta beat."+
//            "\n */"+
//            "\n\n@-webkit-keyframes heartbeat {"+
//            "\n  0%   {"+
//            "\n    -webkit-transform: scale(0.95);"+
//            "\n            transform: scale(0.95);"+
//            "\n  }"+
//            "\n  15%  {"+
//            "\n    -webkit-transform: scale(1.00);"+
//            "\n            transform: scale(1.00);"+
//            "\n  }"+
//            "\n  30%  {"+
//            "\n    -webkit-transform: scale(0.95);"+
//            "\n            transform: scale(0.95);"+
//            "\n  }"+
//            "\n  50%  {"+
//            "\n    -webkit-transform: scale(1.10);"+
//            "\n            transform: scale(1.10);"+
//            "\n  }"+
//            "\n  75%  {"+
//            "\n    -webkit-transform: scale(0.95);"+
//            "\n            transform: scale(0.95);"+
//            "\n  }"+
//            "\n  100% {"+
//            "\n    -webkit-transform: scale(0.95);"+
//            "\n            transform: scale(0.95);"+
//            "\n  }"+
//            "\n}"+
//            "\n\n@keyframes heartbeat {"+
//            "\n  0%   { transform: scale(0.95); }"+
//            "\n  15%  { transform: scale(1.00); }"+
//            "\n  30%  { transform: scale(0.95); }"+
//            "\n  50%  { transform: scale(1.10); }"+
//            "\n  75%  { transform: scale(0.95); }"+
//            "\n  100% { transform: scale(0.95); }"+
//            "\n}"+
//            "\n\n@-webkit-keyframes echo {"+
//            "\n  0%   {"+
//            "\n    opacity: 0.1;"+
//            "\n    -webkit-transform: scale(1);"+
//            "\n            transform: scale(1);"+
//            "\n  }"+
//            "\n  100% {"+
//            "\n    opacity: 0;"+
//            "\n    -webkit-transform: scale(1.4);"+
//            "\n            transform: scale(1.4);"+
//            "\n  }"+
//            "\n}"+
//            "\n\n@keyframes echo {"+
//            "\n  0%   {"+
//            "\n    opacity: 0.1;"+
//            "\n    transform: scale(1);"+
//            "\n  }"+
//            "\n  100% {"+
//            "\n    opacity: 0;"+
//            "\n    transform: scale(1.4);"+
//            "\n  }"+
//            "\n}"+
//            "\n\n\n/*"+
//            "\n * Beautiful! Now for the beating..."+
//            "\n */"+
//            "\n\n#heart, #echo {"+
//            "\n  -webkit-animation-duration: 2000ms;"+
//            "\n          animation-duration: 2000ms;"+
//            "\n  -webkit-animation-timing-function:"+
//            "\n    cubic-bezier(0, 0, 0, 1.74);"+
//            "\n          animation-timing-function:"+
//            "\n            cubic-bezier(0, 0, 0, 1.74);"+
//            "\n  -webkit-animation-delay: 500ms;"+
//            "\n          animation-delay: 500ms;"+
//            "\n  -webkit-animation-iteration-count: infinite;"+
//            "\n          animation-iteration-count: infinite;"+
//            "\n  -webkit-animation-play-state: paused;"+
//            "\n          animation-play-state: paused;"+
//            "\n}"+
//            "\n\n#heart {"+
//            "\n  -webkit-animation-name: heartbeat;"+
//            "\n          animation-name: heartbeat;"+
//            "\n}"+
//            "\n\n#echo {"+
//            "\n  -webkit-animation-name: echo;"+
//            "\n          animation-name: echo;"+
//            "\n}"+
//            "\n\n\n/*"+
//            "\n * Ready..."+
//            "\n */"+
//            "\n\n#heart, #echo {"+
//            "\n\n/*"+
//            "\n * ...set..."+
//            "\n */"+
//            "\n\n  -webkit-animation-play-state: running;"+
//            "\n          animation-play-state: running;"+
//            "\n\n/*"+
//            "\n * ...beat!"+
//            "\n */"+
//            "\n\n}"+
//            "\n\n/*"+
//            "\n * And now make some magick..."+
//            "\n */"+
//            "\n\ncanvas {"+ 
//            "\n  width: 202px;"+ 
//            "\n  height: 240px;"+ 
//            "\n  position: absolute;"+ 
//            "\n  z-index: 1;"+ 
//            "\n  top: calc(50% - 101px);"+ 
//            "\n  left: calc(50% - 101px);"+ 
//            "\n  -webkit-transform: scale(0.95);"+ 
//            "\n          transform: scale(0.95);"+ 
//            "\n  display: block;"+ 
//            "\n}"+
//            "\n\n/*"+
//            "\n *"+
//            "\n * Wahoo!"+
//            "\n *"+
//            "\n * We did it!"+
//            "\n *"+
//            "\n * I mean *I* did it, but you know, whatever..."+
//            "\n * jake albaugh definitely did not have anything"+
//            "\n * to do with this."+
//            "\n *"+
//            "\n * This pen loves CodePen!"+
//            "\n *"+
//            "\n * See you later!"+
//            "\n *"+
//            "\n */";
//
//        openComment = false;
//        
//        writeStyleChar = function(which) {
//            if (which === '/' && openComment === false) {
//                openComment = true;
//                styles = $('#style-text').html() + which;
//            } else if (which === '/' && openComment === true) {
//                openComment = false;
//                styles = $('#style-text').html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
//            } else if (which === ':') {
//                styles = $('#style-text').html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
//            } else if (which === ';') {
//                styles = $('#style-text').html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
//            } else if (which === '{') {
//                styles = $('#style-text').html().replace(/(.*)$/, '<em class="selector">$1</em>{');
//            } else {
//                styles = $('#style-text').html() + which;
//            }
//            $('#style-text').html(styles);
//            return $('#style-tag').append(which);
//        };
//
//        writeStyles = function(message, index, interval) {
//            var pre;
//            if (index < message.length) {
//                pre = document.getElementById('style-text');
//                pre.scrollTop = pre.scrollHeight;
//                writeStyleChar(message[index++]);
//                return setTimeout((function() {
//                    return writeStyles(message, index, interval);
//                }), interval);
//            }
//        };
//
//        $('#action').append("<style id=\"style-tag\"></style>\n<span id=\"echo\"></span>\n<span id=\"heart\"><i></i></span>\n<pre id=\"style-text\"></pre>");
//
//        time = window.innerWidth <= 578 ? 16 : 1;
//
////        writeStyles(styles, 0, time);
//        
//        
//        window.requestAnimFrame = (function(){
//            return  window.requestAnimationFrame       || 
//                    window.webkitRequestAnimationFrame || 
//                    window.mozRequestAnimationFrame    || 
//                    window.oRequestAnimationFrame      || 
//                    window.msRequestAnimationFrame     || 
//                    function( callback, element ){
//                        window.setTimeout(callback, 1000 / 60);
//                    };
//        })();
//
//        var canvas, context, toggle = 0;
//        var size = 412;
//
//        init();
//        animate();
//
//        function init() {
//            canvas = document.createElement('canvas');
//            heart = document.getElementById('heart');
//            canvas.width = size;
//            canvas.height = size;
//
//            context = canvas.getContext( '2d' );
//            context.lineWidth = 4;
//
//            heart.appendChild (canvas);
//        }
//
//        function animate() {
//            requestAnimFrame ( animate );
//            draw();
//        }
//
//        function resetCanvas() {
//          counter = 0;
//          lastPoint = null;
//        }
//
//        function clearCanvas() {
//          context.clearRect (0, 0, size, size);
//          resetCanvas();
//        }
//
//        var counter = 0;
//        var lastPoint;
//        var distance = 40;
//
//        function draw() {
//
//          if (lastPoint && lastPoint.y > size) {
//			console.log(1)
//            clearCanvas();
//            toggle = (toggle + 1) % 3;
//          }
//
//          var y = ((counter += 0.1) * distance);
//          var half = size/2;
//          var x = (half - Math.tan((Math.cos(counter ) * Math.random() * 2)));
//
//          context.strokeStyle = '#1a1c24';
//
//          context.beginPath();
//          if (lastPoint) {
//            context.moveTo(lastPoint.x, lastPoint.y)
//          }
//          context.lineTo(x, y)
//          context.closePath();
//          context.stroke();
//
//          lastPoint = {x:x, y:y}
//        }
//
//
//    }).call(this);
});
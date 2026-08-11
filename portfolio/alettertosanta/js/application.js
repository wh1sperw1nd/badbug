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

var hearts = {};
var heartIndex = 0;

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
};


window.scene = new Scene();

$(document).ready(function () {
    window.scene.init();

    var welcome = {};
    window.welcome = welcome;
    window.welcome.waving_santa_step = 1;
    var tablet = false;
    window.welcome.santas_house = $("#santas-house");
    window.welcome.mantel_mouse = $("#mantel-mouse");
    window.welcome.elves_on_sleigh = $("#santas-elves-on-sleigh");
    window.welcome.santas_legs = $("#santas-legs");

    window.setInterval(toggle_lights, 1000);
    window.setInterval(waving_santa, 250);
    if (!tablet) {
        window.requestAnimationFrame(scrolling);
    }

    $('#santas-mailbox-clickable').click(function () {
        $('.santas-mailbox').toggleClass('hidden');
    });
    $('#child-snowman-clickable').hover(function () {
        $('#child-snowman-clicked').toggleClass('snowman-clicked');
    }, function () {
        $('#child-snowman-clicked').toggleClass('snowman-clicked');
    }).on("click",function () {
        $("html, body").animate({ scrollTop: $(document).height() -180}, 500);
        $(".letters_new").addClass("visible");
        var gender = $('#child-snowman-clickable').data("gender");
        checkGender(gender)
    });
    $('#parent-snowman-clickable').hover(function () {
        $('#parent-snowman-clicked').toggleClass('snowman-clicked');
    }, function () {
        $('#parent-snowman-clicked').toggleClass('snowman-clicked');
    }).on("click",function () {
        $("html, body").animate({ scrollTop: $(document).height() -180}, 500);
        $(".letters_new").addClass("visible");
        var gender = $('#parent-snowman-clicked').data("gender");
        checkGender(gender)
    });
//  $('#child-snowman-clickable').click(function(){$(this).addClass('snowman-clicked');});

    $(".theme-link").hover(function () {
        $("." + this.id).toggle();
    });

    function toggle_lights() {
        $(".blinking-lights-on").toggleClass("hidden");
    }

    function  checkGender(gender){
        if(gender == "girl"){
            $("#letter_gender option:nth-child(1)").attr("selected","selected");
            $("#was").text("була");
            $("#letter_nice_level option:nth-child(1)").text("Дуже хороша");
            $("#letter_nice_level option:nth-child(2)").text("Хороша");
            $("#letter_nice_level option:nth-child(3)").text("Неслухняна");
            $("#letter_nice_level option:nth-child(4)").text("Дуже вредна");

        }else {
            $("#letter_gender option:nth-child(2)").attr("selected","selected");
            $("#was").text("був");
            $("#letter_nice_level option:nth-child(1)").text("Дуже хороший");
            $("#letter_nice_level option:nth-child(2)").text("Хороший");
            $("#letter_nice_level option:nth-child(3)").text("Неслухняний");
            $("#letter_nice_level option:nth-child(4)").text("Дуже вредний");
        }
    }

    function scrolling(evt) {
        var sh, win, mouse, percent_scrolled;
        sh = window.welcome.santas_house;
        mouse = window.welcome.mantel_mouse
        win = $(window);

        var window_top = win.scrollTop();

        var window_bottom = window_top + win.height();
        var house_top = sh.offset().top;
        var house_bottom = house_top + sh.height();
        var elves_top = window.welcome.elves_on_sleigh.offset().top;

        // if santas house has animations in view
        if (house_top < window_bottom && house_bottom > window_bottom) {
            percent_scrolled = (( 1 - ((house_top - window_top) / win.height())) * 100) + '%';

            var smoke_position = ((window_bottom - house_top) / sh.height() ) * 23.68421;
            var smoke = document.getElementById("santas-house-smoke");
            smoke.style.height = smoke_position + '%';
            smoke.style.top = (23.68421 - smoke_position) + '%';
        }

        if (window_top < elves_top && window_bottom > elves_top) {
            percent_scrolled = (( 1 - ((elves_top - window_top) / win.height())) * 100) + '%';

            var elves_top = window.welcome.elves_on_sleigh.offset().top;
            var elves = window.welcome.elves_on_sleigh[0]; //document.getElementById('santas-elves-on-sleigh')
            elves.style.left = elves.style.top = percent_scrolled;
        }

        // if the mouse is in view (infront of fireplace) then move it across the floor
        // if santas legs are in view (in the fireplace)
        var mouse_top = mouse.offset().top;
        if (window_top < mouse_top && window_bottom > mouse_top) {
            // move the mouse across the floor
            var percent_across_floor = (( 1 - ((mouse_top - window_top) / win.height())) * 100);
            window.welcome.mantel_mouse[0].style.left = percent_across_floor + '%';

            // move santa up the chimney
            var legs_move_y = -1 * (percent_across_floor / 100) * window.welcome.santas_legs.height() - 10;
            document.getElementById('santas-legs').style.top = legs_move_y + 'px';
        }
        requestAnimationFrame(scrolling);
    }

    function waving_santa() {
        $('#waving-santa-1').css('display', welcome.waving_santa_step == 1 ? 'inline' : 'none');
        $('#waving-santa-2').css('display', welcome.waving_santa_step == 2 ? 'inline' : 'none');
        $('#waving-santa-3').css('display', welcome.waving_santa_step == 3 ? 'inline' : 'none');
        $('#waving-santa-4').css('display', welcome.waving_santa_step == 4 ? 'inline' : 'none');

        if (++welcome.waving_santa_step > 4) {
            welcome.waving_santa_step = 1;
        }
    }
    $("#gobacktoletter").click(function () {
        $("#modal-lettersent").hide();
    });
        $("#new_letter").submit(function (e) {
            var form = $('#new_letter');
            var data = form.serializeArray().reduce(function (obj, item) {
                if (obj[item.name]) {
                    if ($.isArray(obj[item.name])) {
                        obj[item.name].push(item.value);
                    } else {
                        var previousValue = obj[item.name];
                        obj[item.name] = [previousValue, item.value];
                    }
                } else {
                    obj[item.name] = item.value;
                }

                return obj;
            }, {});

            var request = $.ajax({
                url: form.attr('action'),
                method: form.attr('method'),
                data: data
            });

            request.done(function(msg) {
                console.error(msg)
                $("#popupTitle").html("");
                $("#msg").html(msg);
                $("#modal-lettersent").show();
            });

            request.fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });

            e.preventDefault()
        });

});


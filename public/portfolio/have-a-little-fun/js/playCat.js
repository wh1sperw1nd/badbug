function PlayCat() {}
PlayCat.prototype.init = function () {

    //THREEJS RELATED VARIABLES
    this.scene;
    this.camera;
    this.fieldOfView;
    this.aspectRatio;
    this.nearPlane;
    this.farPlane;
    this.globalLight;
    this.shadowLight;
    this.backLight;
    this.renderer;
    this.container;
    this.controls;

//SCREEN & MOUSE VARIABLES

    this.HEIGHT;
    this.WIDTH;
    this.windowHalfX;
    this.windowHalfY;
    this.mousePos = { x: 0, y: 0 };
    this.oldMousePos = {x: 0, y: 0};
    this.ballWallDepth = 28;

//3D OBJECTS VARIABLES

    this.hero;
    this.t = 0;

// BALL RELATED CODE

    this.woolNodes = 10;
    this.woolSegLength = 2;
    this.gravity = -.8;
    this.accuracy = 1;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

    this.initScreenAnd3D();
    this.createLights();
    this.createFloor()
    this.createHero();
    this.createBall();
    //this.loop();

    animCat = this;
}

PlayCat.prototype.initScreenAnd3D = function () {

    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;

    this.scene = new THREE.Scene();
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 50;
    this.nearPlane = 1;
    this.farPlane = 2000;
    this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        this.aspectRatio,
        this.nearPlane,
        this.farPlane
    );
    this.camera.position.x = 0;
    this.camera.position.z = 300;
    this.camera.position.y = 250;
    this.camera.lookAt(new THREE.Vector3(0, 60, 0));

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMapEnabled = true;

    this.container = document.getElementById('catWorld');
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute("id","catWorldCanvas");
    var canvas = this.renderer.domElement;

    window.addEventListener('resize', this.handleWindowResize, false);
    canvas.addEventListener('mousemove', function(event){
        this.handleMouseMove(event);
    }.bind(this), false);
    canvas.addEventListener('touchmove', function(event){
        this.handleTouchMove(event);
    }.bind(this), false);

    /*
     controls = new THREE.OrbitControls(camera, renderer.domElement);
     controls.minPolarAngle = -Math.PI / 2;
     controls.maxPolarAngle = Math.PI / 2;
     controls.noZoom = true;
     controls.noPan = true;
     //*/


}

PlayCat.prototype.handleWindowResize = function () {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
}

PlayCat.prototype.handleMouseMove = function (event) {
    this.mousePos = {x: event.clientX, y: event.clientY};
}

PlayCat.prototype.handleTouchMove = function (event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        this.mousePos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
    }
}

PlayCat.prototype.createLights = function () {
    this.globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)

    this.shadowLight = new THREE.DirectionalLight(0xffffff, .9);
    this.shadowLight.position.set(200, 200, 200);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadowDarkness = .2;
    this.shadowLight.shadowMapWidth = this.shadowLight.shadowMapHeight = 2048;

    this.backLight = new THREE.DirectionalLight(0xffffff, .4);
    this.backLight.position.set(-100, 100, 100);
    this.backLight.castShadow = true;
    this.backLight.shadowDarkness = .1;
    this.backLight.shadowMapWidth = this.shadowLight.shadowMapHeight = 2048;

    this.scene.add(this.globalLight);
    this.scene.add(this.shadowLight);
    this.scene.add(this.backLight);
}

PlayCat.prototype.createFloor = function () {
    this.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshBasicMaterial({color: 0x6ecccc}));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = 0;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
}

PlayCat.prototype.createHero = function () {
    this.hero = new Cat();
    this.scene.add(this.hero.threeGroup);
}

PlayCat.prototype.createBall = function () {
    this.ball = new Ball();
    this.scene.add(this.ball.threeGroup);
}


function Ball() {

    var redMat = new THREE.MeshLambertMaterial({
        color: 0x630d15,
        shading: THREE.FlatShading
    });

    var stringMat = new THREE.LineBasicMaterial({
        color: 0x630d15,
        linewidth: 3
    });

    this.threeGroup = new THREE.Group();
    this.ballRay = 8;

    this.verts = [];

    // string
    var stringGeom = new THREE.Geometry();

    for (var i = 0; i < currentPage.woolNodes; i++) {
        var v = new THREE.Vector3(0, -i * currentPage.woolSegLength, 0);
        stringGeom.vertices.push(v);

        var woolV = new WoolVert();
        woolV.x = woolV.oldx = v.x;
        woolV.y = woolV.oldy = v.y;
        woolV.z = 0;
        woolV.fx = woolV.fy = 0;
        woolV.isRootNode = (i == 0);
        woolV.vertex = v;
        if (i > 0) woolV.attach(this.verts[(i - 1)]);
        this.verts.push(woolV);

    }
    this.string = new THREE.Line(stringGeom, stringMat);

    // body
    var bodyGeom = new THREE.SphereGeometry(this.ballRay, 5, 4);
    this.body = new THREE.Mesh(bodyGeom, redMat);
    this.body.position.y = -currentPage.woolSegLength * currentPage.woolNodes;

    var wireGeom = new THREE.TorusGeometry(this.ballRay, .5, 3, 10, Math.PI * 2);
    this.wire1 = new THREE.Mesh(wireGeom, redMat);
    this.wire1.position.x = 1;
    this.wire1.rotation.x = -Math.PI / 4;

    this.wire2 = this.wire1.clone();
    this.wire2.position.y = 1;
    this.wire2.position.x = -1;
    this.wire1.rotation.x = -Math.PI / 4 + .5;
    this.wire1.rotation.y = -Math.PI / 6;

    this.wire3 = this.wire1.clone();
    this.wire3.rotation.x = -Math.PI / 2 + .3;

    this.wire4 = this.wire1.clone();
    this.wire4.position.x = -1;
    this.wire4.rotation.x = -Math.PI / 2 + .7;

    this.wire5 = this.wire1.clone();
    this.wire5.position.x = 2;
    this.wire5.rotation.x = -Math.PI / 2 + 1;

    this.wire6 = this.wire1.clone();
    this.wire6.position.x = 2;
    this.wire6.position.z = 1;
    this.wire6.rotation.x = 1;

    this.wire7 = this.wire1.clone();
    this.wire7.position.x = 1.5;
    this.wire7.rotation.x = 1.1;

    this.wire8 = this.wire1.clone();
    this.wire8.position.x = 1;
    this.wire8.rotation.x = 1.3;

    this.wire9 = this.wire1.clone();
    this.wire9.scale.set(1.2, 1.1, 1.1);
    this.wire9.rotation.z = Math.PI / 2;
    this.wire9.rotation.y = Math.PI / 2;
    this.wire9.position.y = 1;

    this.body.add(this.wire1);
    this.body.add(this.wire2);
    this.body.add(this.wire3);
    this.body.add(this.wire4);
    this.body.add(this.wire5);
    this.body.add(this.wire6);
    this.body.add(this.wire7);
    this.body.add(this.wire8);
    this.body.add(this.wire9);

    this.threeGroup.add(this.string);
    this.threeGroup.add(this.body);

    this.threeGroup.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

}

/* 
 The next part of the code is largely inspired by this codepen :
 http://codepen.io/dissimulate/pen/KrAwx?editors=001
 thanks to dissimulate for his great work
 */

/*
 Copyright (c) 2013 dissimulate at Codepen

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


function WoolVert () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.oldx = 0;
    this.oldy = 0;
    this.fx = 0;
    this.fy = 0;
    this.isRootNode = false;
    this.constraints = [];
    this.vertex = null;
}


WoolVert.prototype.update = function () {
    var wind = 0;//.1+Math.random()*.5;
    this.add_force(wind, currentPage.gravity);

    var nx = this.x + ((this.x - this.oldx) * .9) + this.fx;
    var ny = this.y + ((this.y - this.oldy) * .9) + this.fy;
    this.oldx = this.x;
    this.oldy = this.y;
    this.x = nx;
    this.y = ny;

    this.vertex.x = this.x;
    this.vertex.y = this.y;
    this.vertex.z = this.z;

    this.fy = this.fx = 0
}

WoolVert.prototype.attach = function (point) {
    this.constraints.push(new Constraint(this, point));
};

WoolVert.prototype.add_force = function (x, y) {
    this.fx += x;
    this.fy += y;
};

function Constraint(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = currentPage.woolSegLength;
};

Ball.prototype.update = function (posX, posY, posZ) {
    var i = currentPage.accuracy;
    while (i--) {
        var nodesCount = currentPage.woolNodes;
        while (nodesCount--) {
            var v = this.verts[nodesCount];
            if (v.isRootNode) {
                v.x = posX;
                v.y = posY;
                v.z = posZ;
            }
            else {
                var constraintsCount = v.constraints.length;
                while (constraintsCount--) {
                    var c = v.constraints[constraintsCount];
                    var diff_x = c.p1.x - c.p2.x,
                        diff_y = c.p1.y - c.p2.y,
                        dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
                        diff = (c.length - dist) / dist;
                    var px = diff_x * diff * .5;
                    var py = diff_y * diff * .5;
                    c.p1.x += px;
                    c.p1.y += py;
                    c.p2.x -= px;
                    c.p2.y -= py;
                    c.p1.z = c.p2.z = posZ;
                }
                if (nodesCount == currentPage.woolNodes - 1) {
                    this.body.position.x = this.verts[nodesCount].x;
                    this.body.position.y = this.verts[nodesCount].y;
                    this.body.position.z = this.verts[nodesCount].z;
                    this.body.rotation.z += (v.y <= this.ballRay) ? (v.oldx - v.x) / 10 : Math.min(Math.max(diff_x / 2, -.1), .1);
                }
            }
            if (v.y < this.ballRay) {
                v.y = this.ballRay;
            }
        }
    }
    nodesCount = currentPage.woolNodes;
    while (nodesCount--) this.verts[nodesCount].update();
    this.string.geometry.verticesNeedUpdate = true;
}

Ball.prototype.receivePower = function (tp) {
    this.verts[currentPage.woolNodes - 1].add_force(tp.x, tp.y);
}

// Enf of the code inspired by dissmulate


// Make everything work together :


PlayCat.prototype.loop = function() {
    this.render();

    this.t += .05;
    this.hero.updateTail(this.t);

    var ballPos = this.getBallPos();

    this.ball.update(ballPos.x, ballPos.y, ballPos.z);
    this.ball.receivePower(this.hero.transferPower);
    this.hero.interactWithBall(this.ball.body.position);
    requestAnimation();
//    window.requestAnimCat = requestAnimationFrame(function(){
//        if(playCat){
//            playCat.loop();
//            console.log("cat");
//        }
//    });

}


PlayCat.prototype.getBallPos = function() {
    var vector = new THREE.Vector3();
    vector.set(
        ( this.mousePos.x / window.innerWidth ) * 2 - 1,
        -( this.mousePos.y / window.innerHeight ) * 2 + 1,
        0.1);
    vector.unproject(this.camera);
    var dir = vector.sub(this.camera.position).normalize();
    var distance = (this.ballWallDepth - this.camera.position.z) / dir.z;
    var pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
}

PlayCat.prototype.render = function () {
    if (this.controls)
        this.controls.update();
    this.renderer.render(this.scene, this.camera);
}


//var playCat = new PlayCat();
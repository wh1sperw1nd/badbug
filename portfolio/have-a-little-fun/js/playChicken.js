function PlayChicken() {}
PlayChicken.prototype.init = function () {

//THREEJS RELATED VARIABLES
    this.scene;
    this.camera;
    this.controls;
    this.fieldOfView;
    this.aspectRatio;
    this.nearPlane;
    this.farPlane;
    this.shadowLight;
    this.backLight;
    this.light;
    this.renderer;
    this.container;

//SCENE
    this.floor;
    this.bird1;
    this.bird2;

//SCREEN VARIABLES

    this.HEIGHT;
    this.WIDTH;
    this.windowHalfX;
    this.windowHalfY;
    this.mousePos = {x: 0, y: 0};


//INIT THREE JS, SCREEN AND MOUSE EVENTS
    this.initScreenAnd3D();
    this.createLights();
    this.createFloor();
    this.createBirds();
   //this.loop();
}
PlayChicken.prototype.initScreenAnd3D = function () {
    this.scene = new THREE.Scene();
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.aspectRatio = this.WIDTH / this.HEIGHT;
    this.fieldOfView = 60;
    this.nearPlane = 1;
    this.farPlane = 2000;
    this.camera = new THREE.PerspectiveCamera(
        this.fieldOfView,
        this.aspectRatio,
        this.nearPlane,
        this.farPlane
    );
    this.camera.position.z = 1000;
    this.camera.position.y = 300;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.shadowMapEnabled = true;

    this.container = document.getElementById('chickenWorld');
    this.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.setAttribute("id","chickenWorldCanvas");
    var canvas = this.renderer.domElement;

    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;

    window.addEventListener('resize', this.onWindowResize, false);
    canvas.addEventListener('mousemove', function(event){
        this.handleMouseMove(event);
    }.bind(this), false);
    canvas.addEventListener('touchstart', function(event){
        this.handleTouchStart(event);
    }.bind(this), false);
    canvas.addEventListener('touchend', function(event){
        this.handleTouchEnd(event);
    }.bind(this), false);
    canvas.addEventListener('touchmove', function(event){
        this.handleTouchMove(event);
    }.bind(this), false);
    /*
     controls = new THREE.OrbitControls( camera, renderer.domElement);
     //*/
}

PlayChicken.prototype.onWindowResize = function() {
    this.HEIGHT = window.innerHeight;
    this.WIDTH = window.innerWidth;
    this.windowHalfX = this.WIDTH / 2;
    this.windowHalfY = this.HEIGHT / 2;
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.camera.aspect = this.WIDTH / this.HEIGHT;
    this.camera.updateProjectionMatrix();
}

PlayChicken.prototype.handleMouseMove = function(event) {
    this.mousePos = {x: event.clientX, y: event.clientY};
}

PlayChicken.prototype.handleTouchStart = function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        this.mousePos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
    }
}

PlayChicken.prototype.handleTouchEnd = function(event) {
    this.mousePos = {x: this.windowHalfX, y: this.windowHalfY};
}

PlayChicken.prototype.handleTouchMove = function(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        this.mousePos = {x: event.touches[0].pageX, y: event.touches[0].pageY};
    }
}

PlayChicken.prototype.createLights = function() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)

    this.shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    this.shadowLight.position.set(200, 200, 200);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadowDarkness = .2;

    this.backLight = new THREE.DirectionalLight(0xffffff, .4);
    this.backLight.position.set(-100, 200, 50);
    this.backLight.shadowDarkness = .1;
    this.backLight.castShadow = true;

    this.scene.add(this.backLight);
    this.scene.add(this.light);
    this.scene.add(this.shadowLight);
}

//BIRD

Bird = function () {

    this.rSegments = 4;
    this.hSegments = 3;
    this.cylRay = 120;
    this.bodyBirdInitPositions = [];
    this.vAngle = this.hAngle = 0;
    this.normalSkin = {r: 255 / 255, g: 222 / 255, b: 121 / 255};
    this.shySkin = {r: 255 / 255, g: 157 / 255, b: 101 / 255};
    this.color = {r: this.normalSkin.r, g: this.normalSkin.g, b: this.normalSkin.b};
    this.sideBird = "left";

    this.shyAngles = {h: 0, v: 0};
    this.behaviourInterval;
    this.intervalRunning = false;

    this.threegroup = new THREE.Group();

    // materials
    this.yellowMat = new THREE.MeshLambertMaterial({
        color: 0xffde79,
        shading: THREE.FlatShading
    });
    this.whiteMat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });
    this.blackMat = new THREE.MeshLambertMaterial({
        color: 0x000000,
        shading: THREE.FlatShading
    });
    this.orangeMat = new THREE.MeshLambertMaterial({
        color: 0xff5535,
        shading: THREE.FlatShading
    });

    //WINGS

    this.wingLeftGroup = new THREE.Group();
    this.wingRightGroup = new THREE.Group();

    var wingGeom = new THREE.BoxGeometry(60, 60, 5);
    var wingLeft = new THREE.Mesh(wingGeom, this.yellowMat);
    this.wingLeftGroup.add(wingLeft);
    this.wingLeftGroup.position.x = 70;
    this.wingLeftGroup.position.z = 0;
    this.wingLeftGroup.rotation.y = Math.PI / 2;
    wingLeft.rotation.x = -Math.PI / 4;
    var wingRight = new THREE.Mesh(wingGeom, this.yellowMat);
    this.wingRightGroup.add(wingRight);
    this.wingRightGroup.position.x = -70;
    this.wingRightGroup.position.z = 0;
    this.wingRightGroup.rotation.y = -Math.PI / 2;
    wingRight.rotation.x = -Math.PI / 4;

    //BODY

    var bodyGeom = new THREE.CylinderGeometry(40, 70, 200, this.rSegments, this.hSegments);
    this.bodyBird = new THREE.Mesh(bodyGeom, this.yellowMat);
    this.bodyBird.position.y = 70;

    this.bodyVerticesLength = (this.rSegments + 1) * (this.hSegments);
    for (var i = 0; i < this.bodyVerticesLength; i++) {
        var tv = this.bodyBird.geometry.vertices[i];
        this.bodyBirdInitPositions.push({x: tv.x, y: tv.y, z: tv.z});
    }

    this.threegroup.add(this.bodyBird);
    this.threegroup.add(this.wingLeftGroup);
    this.threegroup.add(this.wingRightGroup);


    // EYES

    this.face = new THREE.Group();
    var eyeGeom = new THREE.BoxGeometry(60, 60, 10);
    var irisGeom = new THREE.BoxGeometry(10, 10, 10);

    this.leftEye = new THREE.Mesh(eyeGeom, this.whiteMat);
    this.leftEye.position.x = -30;
    this.leftEye.position.y = 120;
    this.leftEye.position.z = 35;
    this.leftEye.rotation.y = -Math.PI / 4;

    this.leftIris = new THREE.Mesh(irisGeom, this.blackMat);
    this.leftIris.position.x = -30;
    this.leftIris.position.y = 120;
    this.leftIris.position.z = 40;
    this.leftIris.rotation.y = -Math.PI / 4;


    this.rightEye = new THREE.Mesh(eyeGeom, this.whiteMat);
    this.rightEye.position.x = 30;
    this.rightEye.position.y = 120;
    this.rightEye.position.z = 35;
    this.rightEye.rotation.y = Math.PI / 4;

    this.rightIris = new THREE.Mesh(irisGeom, this.blackMat);
    this.rightIris.position.x = 30;
    this.rightIris.position.y = 120;
    this.rightIris.position.z = 40;
    this.rightIris.rotation.y = Math.PI / 4;

    // BEAK

    var beakGeom = new THREE.CylinderGeometry(0, 20, 20, 4, 1);
    this.beak = new THREE.Mesh(beakGeom, this.orangeMat);
    this.beak.position.z = 65;
    this.beak.position.y = 70;
    this.beak.rotation.x = Math.PI / 2;

    this.face.add(this.rightEye);
    this.face.add(this.rightIris);
    this.face.add(this.leftEye);
    this.face.add(this.leftIris);
    this.face.add(this.beak);

    //FEATHERS

    var featherGeom = new THREE.BoxGeometry(10, 20, 5);
    this.feather1 = new THREE.Mesh(featherGeom, this.yellowMat);
    this.feather1.position.z = 55;
    this.feather1.position.y = 185;
    this.feather1.rotation.x = Math.PI / 4;
    this.feather1.scale.set(1.5, 1.5, 1);

    this.feather2 = new THREE.Mesh(featherGeom, this.yellowMat);
    this.feather2.position.z = 50;
    this.feather2.position.y = 180;
    this.feather2.position.x = 20;
    this.feather2.rotation.x = Math.PI / 4;
    this.feather2.rotation.z = -Math.PI / 8;

    this.feather3 = new THREE.Mesh(featherGeom, this.yellowMat);
    this.feather3.position.z = 50;
    this.feather3.position.y = 180;
    this.feather3.position.x = -20;
    this.feather3.rotation.x = Math.PI / 4;
    this.feather3.rotation.z = Math.PI / 8;

    this.face.add(this.feather1);
    this.face.add(this.feather2);
    this.face.add(this.feather3);
    this.threegroup.add(this.face);

    this.threegroup.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
            object.castShadow = true;
            object.receiveShadow = true;
        }
    });

}

Bird.prototype.look = function (hAngle, vAngle) {
    this.hAngle = hAngle;
    this.vAngle = vAngle;

    this.leftIris.position.y = 120 - this.vAngle * 30;
    this.leftIris.position.x = -30 + this.hAngle * 10;
    this.leftIris.position.z = 40 + this.hAngle * 10;

    this.rightIris.position.y = 120 - this.vAngle * 30;
    this.rightIris.position.x = 30 + this.hAngle * 10;
    this.rightIris.position.z = 40 - this.hAngle * 10;

    this.leftEye.position.y = this.rightEye.position.y = 120 - this.vAngle * 10;

    this.beak.position.y = 70 - this.vAngle * 20;
    this.beak.rotation.x = Math.PI / 2 + this.vAngle / 3;

    this.feather1.rotation.x = (Math.PI / 4) + (this.vAngle / 2);
    this.feather1.position.y = 185 - this.vAngle * 10;
    this.feather1.position.z = 55 + this.vAngle * 10;

    this.feather2.rotation.x = (Math.PI / 4) + (this.vAngle / 2);
    this.feather2.position.y = 180 - this.vAngle * 10;
    this.feather2.position.z = 50 + this.vAngle * 10;

    this.feather3.rotation.x = (Math.PI / 4) + (this.vAngle / 2);
    this.feather3.position.y = 180 - this.vAngle * 10;
    this.feather3.position.z = 50 + this.vAngle * 10;


    for (var i = 0; i < this.bodyVerticesLength; i++) {
        var line = Math.floor(i / (this.rSegments + 1));
        var tv = this.bodyBird.geometry.vertices[i];
        var tvInitPos = this.bodyBirdInitPositions[i];
        var a, dy;
        if (line >= this.hSegments - 1) {
            a = 0;
        } else {
            a = this.hAngle / (line + 1);
        }
        var tx = tvInitPos.x * Math.cos(a) + tvInitPos.z * Math.sin(a);
        var tz = -tvInitPos.x * Math.sin(a) + tvInitPos.z * Math.cos(a);
        tv.x = tx;
        tv.z = tz;
    }
    this.face.rotation.y = this.hAngle;
    this.bodyBird.geometry.verticesNeedUpdate = true;

}
Bird.prototype.lookAway = function (fastMove) {
    var speed = fastMove ? .4 : 2;
    var ease = fastMove ? Strong.easeOut : Strong.easeInOut;
    var delay = fastMove ? .2 : 0;
    var col = fastMove ? this.shySkin : this.normalSkin;
    var tv = (-1 + Math.random() * 2) * Math.PI / 3;
    var beakScaleX = .75 + Math.random() * .25;
    var beakScaleZ = .5 + Math.random() * .5;

    if (this.sideBird == "right") {
        var th = (-1 + Math.random()) * Math.PI / 4;
    } else {
        var th = Math.random() * Math.PI / 4;
    }
    TweenMax.killTweensOf(this.shyAngles);
    TweenMax.to(this.shyAngles, speed, {v: tv, h: th, ease: ease, delay: delay});
    TweenMax.to(this.color, speed, {r: col.r, g: col.g, b: col.b, ease: ease, delay: delay});
    TweenMax.to(this.beak.scale, speed, {z: beakScaleZ, x: beakScaleX, ease: ease, delay: delay});

}

Bird.prototype.stare = function () {
    var col = this.normalSkin;
    if (this.sideBird == "right") {
        var th = Math.PI / 3;
    } else {
        var th = -Math.PI / 3;
    }
    TweenMax.to(this.shyAngles, 2, {v: -.5, h: th, ease: Strong.easeInOut});
    TweenMax.to(this.color, 2, {r: col.r, g: col.g, b: col.b, ease: Strong.easeInOut});
    TweenMax.to(this.beak.scale, 2, {z: .8, x: 1.5, ease: Strong.easeInOut});

}

//*
PlayChicken.prototype.createFloor = function() {
    this.floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), new THREE.MeshBasicMaterial({color: 0xe0dacd}));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -33;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
}

PlayChicken.prototype.createBirds = function() {
    this.bird1 = new Bird();
    this.bird1.threegroup.position.x = 0;
    this.scene.add(this.bird1.threegroup);

    this.bird2 = new Bird();
    this.bird2.threegroup.position.x = -250;
    this.bird2.sideBird = "right";
    this.bird2.threegroup.scale.set(.8, .8, .8);
    this.bird2.threegroup.position.y = -8;
    this.scene.add(this.bird2.threegroup);

    this.bird3 = new Bird();
    this.bird3.threegroup.position.x = 250;
    this. bird3.sideBird = "left";
    this.bird3.threegroup.scale.set(.8, .8, .8);
    this.bird3.threegroup.position.y = -8;
    this.scene.add(this.bird3.threegroup);
}


PlayChicken.prototype.loop = function() {
    var tempHA = (this.mousePos.x - this.windowHalfX) / 200;
    var tempVA = (this.mousePos.y - this.windowHalfY) / 200;
    var userHAngle = Math.min(Math.max(tempHA, -Math.PI / 3), Math.PI / 3);
    var userVAngle = Math.min(Math.max(tempVA, -Math.PI / 3), Math.PI / 3);
    this.bird1.look(userHAngle, userVAngle);

    if (this.bird1.hAngle < -Math.PI / 5 && !this.bird2.intervalRunning) {
        this.bird2.lookAway(true);
        this.bird2.intervalRunning = true;
        this.bird2.behaviourInterval = setInterval(function () {
            this.bird2.lookAway(false);
        }.bind(this), 1500);
    } else if (this.bird1.hAngle > 0 && this.bird2.intervalRunning) {
        this.bird2.stare();
        clearInterval(this.bird2.behaviourInterval);
        this.bird2.intervalRunning = false;

    } else if (this.bird1.hAngle > Math.PI / 5 && !this.bird3.intervalRunning) {
        this.bird3.lookAway(true);
        this.bird3.intervalRunning = true;
        this.bird3.behaviourInterval = setInterval(function () {
            this.bird3.lookAway(false);
        }.bind(this), 1500);
    } else if (this.bird1.hAngle < 0 && this.bird3.intervalRunning) {
        this.bird3.stare();
        clearInterval(this.bird3.behaviourInterval);
        this.bird3.intervalRunning = false;
    }

    this.bird2.look(this.bird2.shyAngles.h, this.bird2.shyAngles.v);
    this.bird2.bodyBird.material.color.setRGB(this.bird2.color.r, this.bird2.color.g, this.bird2.color.b);

    this.bird3.look(this.bird3.shyAngles.h, this.bird3.shyAngles.v);
    this.bird3.bodyBird.material.color.setRGB(this.bird3.color.r, this.bird3.color.g, this.bird3.color.b);

    this.render();
//    requestAnimationFrame(function(){
//        this.loop();
//    }.bind(this));

//    var requestAnimChicken = requestAnimationFrame(function(){
//        if(currentPage){
//            currentPage.loop();
//            console.log("chick");
//        }
//    });
    requestAnimation();
}

PlayChicken.prototype.render = function() {
    //controls.update();
    this.renderer.render(this.scene, this.camera);
}

//var currentPage = new PlayChicken();




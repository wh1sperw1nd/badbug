normal_image1 = new Image();
normal_image1.src = "images/step1over.png";
mouseover_image1 = new Image();
mouseover_image1.src = "images/step1.png";

normal_image2 = new Image();
normal_image2.src = "images/step2over.png";
mouseover_image2 = new Image();
mouseover_image2.src = "images/step2.png";

normal_image3 = new Image();
normal_image3.src = "images/step3over.png";
mouseover_image3 = new Image();
mouseover_image3.src = "images/step3.png";

normal_image4 = new Image();
normal_image4.src = "images/step4over.png";
mouseover_image4 = new Image();
mouseover_image4.src = "images/step4.png";

normal_image5 = new Image();
normal_image5.src = "images/step5over.png";
mouseover_image5 = new Image();
mouseover_image5.src = "images/step5.png";

normal_image6 = new Image();
normal_image6.src = "images/step6over.png";
mouseover_image6 = new Image();
mouseover_image6.src = "images/step6.png";

normal_image7 = new Image();
normal_image7.src = "images/step7over.png";
mouseover_image7 = new Image();
mouseover_image7.src = "images/step7.png";

normal_image8 = new Image();
normal_image8.src = "images/step8over.png";
mouseover_image8 = new Image();
mouseover_image8.src = "images/step8.png";

normal_image9 = new Image();
normal_image9.src = "images/step9over.png";
mouseover_image9 = new Image();
mouseover_image9.src = "images/step9.png";

normal_image10 = new Image();
normal_image10.src = "images/step10over.png";
mouseover_image10 = new Image();
mouseover_image10.src = "images/step10.png";

<!-- repeat the 4 lines above for any subsequent images. -->

function swap(){
if (document.images){
for (var x=0;
x<swap.arguments.length;
x+=2) {
document[swap.arguments[x]].src = eval(swap.arguments[x+1] + ".src");
}
}
}
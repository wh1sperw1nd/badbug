
jQuery(document).ready(function(){
    
    firstBoot = 1;
    
    imageNumb = 0;
    moveSmallImgListCount = 0;
    jQuery(".singleitem img").each(function(){
		if(jQuery.browser.msie)
				{
					jQuery(".singleitem a img").parent().parent().css("filter", "alpha(opacity=40)").removeClass("selected");					
				}
				else
			jQuery(".singleitem a img").parent().parent().css("opacity","0.2").removeClass("selected");				
    }); 
    jQuery("#mainholder").css("width","100%");
    jQuery("#mainindex").css("width","712px");	
    		
    jQuery("#mainholder #holder div.singleitem").css({
        "margin-left":10
    });						
    jQuery("#mainholder #holder div.singleitem").last().css({
        "margin-right":10
    });
    jQuery("#mainindex #imagediv img").css({
        "margin-left":1
    });
    jQuery("#mainindex #imagediv img").last().css({
        "margin-right":1
    });
    img_width   = jQuery(".singleitem").first().width();
    totalimages = jQuery("#holder .singleitem").size();
    slide_width = jQuery("#mainindex #imagediv img").first().width();
    smallImageSize = (slide_width*totalimages)+totalimages+1;
    raz = slide_width-4;
    slide_width = (slide_width-4)+"px";
    //totalwidth  = jQuery("#holder").width(); // Total large image width
    
    //totalwidth  = totalwidth+(10)*(totalimages+1);
    totalwidth  = img_width * totalimages + (10)*(totalimages+1);
                                                
                                                
    paramsGlobal = img_width*100/jQuery(window).width(); // koef sdvig
                                                
                                                
    //alert(paramsGlobal);
    jQuery("#holder").css({
        "width":totalwidth
    });	
    sliderwidth = 1;
    jQuery("#imagediv img").each(function(){
        sliderwidth = sliderwidth+jQuery(this).width()+1;
    });	
			
    jQuery(".end").css("right","0");
    if(totalimages<=1){
        jQuery("#mainholder").addClass("fixwidth");
        jQuery("#mainholder").css("width","960px");
        jQuery("a.leftnav,a.rightnav").hide();
    }
    variablechange(); //for initialization before window resize	is called
    function variablechange(){		
        screenwidth = jQuery(window).width(); // Visible screen width
        handlewidth = ((screenwidth/10)-6);	//width ������ ����� width of the slider handle according to the width of the screen
        var dopRes = handlewidth-raz;
        screenmid = (screenwidth)/2; //margin ������ ����� Middle of visible screen
        tempval = (screenmid*10000)/(totalwidth); // The total distance the slider has moved when it reaches the middle of the screen.
        mval = totalwidth*.000095;	//
        holdermulti = (totalwidth-screenwidth+10)/1000; // Multiple value with which the main images move		
        halfhandlewidth = handlewidth/2;				
        jQuery("#imagediv").css("width",(smallImageSize)+"px");
        indexwidth = (smallImageSize-handlewidth-5+dopRes);
        //indexwidth *=2;
        //                                                        alert(indexwidth);
        jQuery("#index").css("width",indexwidth+"px");	
							
        if(sliderwidth > screenwidth){
            jQuery("#index").css("margin-left","35px");
        }
        else{
            jQuery("#index").css("margin-left","35px");
        }	
        slidespeed = (1000/(sliderwidth))*95;	
        if(sliderwidth<handlewidth || totalimages == 0){
            jQuery("#mainindex").hide();
        } else{
            jQuery("#mainindex").show();
        }
    }	
						
    /*	jQuery(".imgexcerpt").hide();
						jQuery(".imglink").mouseover(function(){		
							jQuery("#mainholder").addClass("disablemove");
						});
						jQuery(".imglink").mouseout(function(){		
							jQuery("#mainholder").removeClass("disablemove");
						});
						jQuery(".imgexcerpt").mouseover(function(){		
							jQuery("#mainholder").addClass("disablemove");
						});
						jQuery(".imgexcerpt").mouseout(function(){		
							jQuery("#mainholder").removeClass("disablemove");
						});		
							
						jQuery(".imglink").click(function(e){ //Toggling the show/hide the img excerpt link	

							thisimgwidth = jQuery(this).parent().find("img").width();	

							if(thisimgwidth<355){
								exceptwidth = (.85*thisimgwidth);
							}else{ 
								exceptwidth = 340;
							}
							jQuery(this).parent().siblings().find(".imgexcerpt").fadeOut("fast")
								.end()
								.find("img").fadeTo("fast", 1)
								.end()
								.find(".imglink").addClass("show");
							
							if(jQuery(this).hasClass("show")){
								jQuery(this).parent().find(".imgexcerpt").css({"width":exceptwidth}).fadeIn("fast");
								jQuery(this).parent().find("img").fadeTo("fast", .3);
								jQuery(this).removeClass("show");
							}else{
								jQuery(this).parent().find(".imgexcerpt").css({"width":exceptwidth}).fadeOut("fast");
								jQuery(this).parent().find("img").fadeTo("fast", 1);
								jQuery(this).addClass("show");			
							}
							
						});*/
						
    jQuery("#index").slider({
        max	:	totalimages-1,
        animate	:	true,
        step	:	1,		
        change	:	ifSliderChange,
        slide	:	ifSliderSlide
    });	
						
    jQuery("#index").slider("value",(0));
    jQuery("#index").css("z-index","99");
    
    mainfunctions(); //for initialization before window resize	
    function mainfunctions(){	
        //  alert(raz);
        sliderIndexWidth = raz*2;
        jQuery("#index .ui-slider-handle").css("width",sliderIndexWidth+"px");	
        //if(sliderwidth < screenwidth){	//�������� ������ ���� � ���������� ������ �������
                                                            
        jQuery("#index .ui-slider-handle").css("margin","0 -" +((raz)-2)+"px");
    //	}	

    }
					
    animating = false;
    jQuery(".leftnav").live("click",function(){		
        if(!animating && !jQuery("#mainholder").hasClass("disablemove")){
            if(imageNumb>=0){
                imageNumb = imageNumb -1;

                var k = paramsGlobal*imageNumb;
                //k = k +(0.785*imageNumb);//135);%
                k = 490*imageNumb;//135);
                k = "-"+k+"px";
                cursorButton(k);
                                                                
                var sliderpos = jQuery("#index").slider("value");	
                jQuery("#index").slider("value",(sliderpos-1));								
                animating = true;
                                                                
            }																
        }		
    });
    jQuery(".rightnav").live("click",function(){
        if(!animating && !jQuery("#mainholder").hasClass("disablemove")){
                                                            
                                                            
            if(imageNumb<totalimages-1){
                imageNumb = imageNumb +1;

                                                                
                var k = paramsGlobal*imageNumb;
                //k = k +(0.785*imageNumb);//135);
                 k = 490*imageNumb;                                               
                k = "-"+k+"px";
                cursorButton(k);
                                                                
                var sliderpos = jQuery("#index").slider("value");	
                jQuery("#index").slider("value",(sliderpos+1));								
                animating = true;
                                                                
            }																
        }		
    });	
    jQuery(".right_arrow").click(function(){
        
        
        var marLeft = jQuery("#imagediv").css("margin-left");
        if(marLeft=="auto")
			marLeft = "0px";
        marLeft = marLeft.substr(0,marLeft.length-2);
        if((totalimages-moveSmallImgListCount-1)>=9){
            
        marLeft -= raz+5;//79-(mval*moveSmallImgListCount);
        moveSmallImgListCount++;
        jQuery("#imagediv").css("margin-left",marLeft+"px");
        jQuery("#index").css("margin-left",(marLeft+35)+"px");
       // jQuery(".rightnav").click();
        }
        
    });
    
    jQuery(".left_arrow").click(function(){
        
        
        var marLeft = jQuery("#imagediv").css("margin-left");
        if(marLeft=="auto")
			marLeft = "0px";
        marLeft = marLeft.substr(0,marLeft.length-2);
        
        
        if(parseInt(marLeft)<0){
            
            marLeft = parseInt(marLeft) + raz+5;
            moveSmallImgListCount--;
            jQuery("#imagediv").css("margin-left",marLeft+"px");
            jQuery("#index").css("margin-left",(marLeft+35)+"px");
     //       jQuery(".leftnav").click();
        }
        
    });
   
    
    jQuery(".end").css("z-index","99");
    jQuery(".start").css("z-index","99");
    jQuery(".end").click(function(){	
        jQuery("#index").slider("value",(1000));
        //jQuery("#index .ui-slider-handle").css("margin","0 0 0 -"+(raz*2)+"px");
        
    });	
    jQuery(".start").click(function(){		
        jQuery("#index").slider("value",(0));
    });	
    //-----------------------------------------
    jQuery("#imagediv img").each(function(){
        jQuery(this).click(function(){
            jQuery("#index").slider("value",(0));	
        });
    });
    //-----------------------------------------
    jQuery(window).resize(function() {
        variablechange();
        mainfunctions();
    });					

	
	
    function ifSliderChange(e, ui) {

        imageNumb = ui.value;    
        if(firstBoot != 1)
        {
		  
            if(jQuery("#videojs").length){
				if((jQuery.browser.msie && jQuery.browser.version>8) || !jQuery.browser.msie)
                document.getElementById("videojs").player.playerOnVideoEnded();
						
				
            }
            jQuery("#playerContainer").hide();
            
        }   
		
        firstBoot = 0;
        var k = paramsGlobal*ui.value;
        //k = k +(0.785*ui.value);//135);
        k = 490*ui.value;
                               
        jQuery("#mainholder").animate({
            left: "-"+k+"px"
            }, 500,function(){
            animating = false;						
            jQuery(".singleitem img").each(function(){
				if(jQuery.browser.msie)
				{
					jQuery(".singleitem a img").parent().parent().css("filter", "alpha(opacity=40)").removeClass("selected");					
				}
				else
					jQuery(".singleitem a img").parent().parent().css("opacity","0.2").removeClass("selected");					
            });
            jQuery(".singleitem a img").eq(imageNumb).parent().parent().addClass("selected").animate({
                opacity:1
            }, 500);
            if (jQuery(".singleitem").hasClass("selected") && jQuery(".selected a img").height() < 320){
           	    selected_height = (jQuery(".singleitem").height()-jQuery(".selected a img").height())/2;
                jQuery(".selected a img").css("margin",(selected_height-2)+"px 0");
           	}
            //alert(jQuery(".selected").attr("video"));
               
				
				jQuery(".singleitem a img").each(function(){
					jQuery(this).show();
				});
			
                    jQuery(".selected").click();	
        });
							
					
    //						
    }
    function ifSliderSlide(e, ui) {	

        imageNumb = ui.value;
        var k = paramsGlobal*ui.value;
        //k = k +(0.785*ui.value);//135);
        k = 490*ui.value;
        jQuery("#mainholder").animate({
            left: "-"+k+"px"
            }, 500,function(){
            animating = false; 	
            jQuery(".singleitem img").each(function(){
                if(jQuery.browser.msie)
				{
				//alert('ok');
					jQuery(".singleitem a img").parent().parent().css("filter", "alpha(opacity=40)").removeClass("selected");					
				}
				else
					jQuery(".singleitem a img").parent().parent().css("opacity","0.2").removeClass("selected");				
            });
            jQuery(".singleitem a img").eq(imageNumb).parent().parent().addClass("selected").removeClass("iefilter").animate({
                opacity:1
            }, 500);
            if (jQuery(".singleitem").hasClass("selected") && jQuery(".selected a img").height() < 320){
           	    selected_height = (jQuery(".singleitem").height()-jQuery(".selected a img").height())/2;
                jQuery(".selected a img").css("margin",(selected_height-2)+"px 0");
           	}
        });
		jQuery(".singleitem a img").each(function(){
					jQuery(this).show();
				});
    }
                                        
    function cursorButton(param) {
        jQuery("#mainholder").animate({
            left: param
        }, 500,function(){
            animating = false;
        });
    }
});
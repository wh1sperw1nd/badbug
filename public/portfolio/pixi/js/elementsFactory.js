/**
 * Created by nkapravchuk on 10/22/14.
 */

/*
 [
 {
 parent: parent,
 type: image, container
 index: some kind of z-index
 properties: {content, params},
 childrens: [{parent, element, childrens}],
 sprite: willBeCreatedFromCreateElement,
 eventListeners: listenersFunction
 resize: logicFunction
 }
 ]
 */

function ElementsFactory(){


}

var proto = ElementsFactory.prototype;

/**
 *
 * @loadElements method
 * @elements - array of element objects
 *
 * */

//proto.load = function(elements){
//    this.elements = elements;
//    this.loadElements(this.elements)
//}

proto.loadElements = function(elements, parent){

    for(var i=0;i<elements.length;i++)
    {

        this.createElement(elements[i]);
        if(elements[i].childrens && elements[i].childrens.length)
        {
            this.loadElements(elements[i].childrens, elements[i].sprite)
        }
        if(elements[i].eventListeners)
            elements[i].eventListeners(elements[i].sprite);

        if(parent){
            //elements[i].parent = parent;
//            elements[i].parent.addChild(elements[i].sprite);
            parent.addChild(elements[i].sprite);
        }

    }

}

proto.createElement = function(element){

    switch (element.type){
        case "image":
            this.createElementFromImage(element);
        break;
        case "container":
            this.createContainerElement(element)
        break;
    }

}

proto.createElementFromImage = function(element){
    var texture = new PIXI.Texture.fromImage(element.properties.content)
    var sprite = new PIXI.Sprite(texture)

    for(key in element.properties.params)
    {
        sprite[key] = element.properties.params[key];
    }

    element.sprite = sprite;



}

proto.createContainerElement = function(){

}

proto.applyImageElementsProperty = function(){

}
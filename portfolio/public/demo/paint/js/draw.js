function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function Drawer(canvasid,controlsid) {

    this.bgcolor = "#111111";
    this.color = "#FF0000";
    this.brushsize = 10;
    this.hardness=100;
    this.transparency = 0;
    this.dragging = false;

    this.canvas = document.getElementById(canvasid);
    this.canvas.width = document.querySelectorAll('body')[0].clientWidth;
    this.canvas.height = document.querySelectorAll('body')[0].clientHeight;
    this.ctx = this.canvas.getContext("2D");
    this.controls = document.getElementById(controlsid);
    this.setupCanvas();
    this.setupControls();

    // fill with bgcolor
    this.clear();

    //apply standard settings
    this.updateSettings();

}

Drawer.prototype.setupControls = function(){

    this.brushSizeInput = document.createElement("input");
    this.brushSizeInput.value = 10;
    this.brushSizeInput.type = "range";
    this.brushSizeInput.min = 1;
    this.brushSizeInput.max = 200;
    this.brushSizeInput.id="brushSizeInput";
    this.brushSizeInputLabel = document.createElement("label")
    this.brushSizeInputLabel.setAttribute("for","brushSizeInput");
    this.brushSizeInputLabel.appendChild(document.createTextNode("Brush Size:"))


    this.transInput = document.createElement("input");
    this.transInput.value = 10;
    this.transInput.type = "range";
    this.transInput.min = 1;
    this.transInput.max = 100;
    this.transInput.id="transInput";
    this.transInputLabel = document.createElement("label")
    this.transInputLabel.setAttribute("for","transInput");
    this.transInputLabel.appendChild(document.createTextNode("Transparency:"))

    this.hardnessInput = document.createElement("input");
    this.hardnessInput.value = 10;
    this.hardnessInput.type = "range";
    this.hardnessInput.min = 1;
    this.hardnessInput.max = 99;
    this.hardnessInput.id="hardnessInput";
    this.hardnessInputLabel = document.createElement("label")
    this.hardnessInputLabel.setAttribute("for","hardnessInput");
    this.hardnessInputLabel.appendChild(document.createTextNode("Hardness:"))


    this.fillBtn = document.createElement("input");
    this.fillBtn.value = "Fill";
    this.fillBtn.type = "submit";
    this.fillBtn.id="fillBtn";

    this.clearBtn = document.createElement("input");
    this.clearBtn.value = "Clear";
    this.clearBtn.type = "submit";
    this.clearBtn.id="clearBtn";

    this.saveBtn = document.createElement("input");
    this.saveBtn.value = "Save";
    this.saveBtn.type = "submit";
    this.saveBtn.id="saveBtn";

    this.colorInput = document.createElement("input");
    this.colorInput.value = this.color;
    this.colorInput.type = "color";
    this.colorInput.id="colorInput";

    var form = document.createElement("form");
    form.appendChild(this.colorInput);
    form.appendChild(this.brushSizeInputLabel);
    form.appendChild(this.brushSizeInput);
    form.appendChild(this.hardnessInputLabel);
    form.appendChild(this.hardnessInput);
    form.appendChild(this.transInputLabel);
    form.appendChild(this.transInput);
    form.appendChild(this.fillBtn);
    form.appendChild(this.clearBtn);
    form.appendChild(this.saveBtn);
    this.controls.appendChild(form);


    this.brushSizeInput.addEventListener('input',this,true);
    this.hardnessInput.addEventListener('input',this,true);
    this.colorInput.addEventListener('input',this,true);
    this.transInput.addEventListener('input',this,true);

    var self = this;
    this.clearBtn.addEventListener("click",function(e){
        e.preventDefault();
        self.clear()
    })
    this.fillBtn.addEventListener("click",function(e){
        e.preventDefault();
        self.fill()
    })
    this.saveBtn.addEventListener("click",function(e){
        e.preventDefault();
        self.save();
    })



}

Drawer.prototype.setupCanvas = function(){

    this.canvas.addEventListener('click',this,true);
    this.canvas.addEventListener('contextmenu',this,true);
    this.canvas.addEventListener('mousemove',this,true);
    this.canvas.addEventListener('mousedown',this,true);
    this.canvas.addEventListener('mouseup',this,true);
    this.canvas.addEventListener('mouseout',this,true);

    this.canvas.addEventListener("touchstart", this, true);
    this.canvas.addEventListener("touchend", this, true);
    this.canvas.addEventListener("touchcancel", this, true);
    this.canvas.addEventListener("touchleave", this, true);
    this.canvas.addEventListener("touchmove", this, true);

}


Drawer.prototype.handleEvent = function(event) {
    event.preventDefault();
    xPos = event.clientX - this.canvas.getBoundingClientRect().left - this.canvas.clientLeft + this.canvas.scrollLeft;
    yPos = event.clientY - this.canvas.getBoundingClientRect().top - this.canvas.clientTop + this.canvas.scrollLeft;
    if(event.type=="input"){
        this.updateSettings(event);
    }
    if (event.type == "mouseup"){
        this.dragging = false;

    }
    if (event.type == "click"){
        this.dragging = false;
        console.log(event);
        this.paint(xPos,yPos);

    }
    if(event.type == "mousedown"|| event.type == "touchstart"){
        this.dragging = true;
    }
    if(event.type=="mouseout"|| event.type == "touchleave"){

        this.dragging = false;
    }
    if(event.type=="mousemove"){
        if(this.dragging){
            this.paint(xPos,yPos);
        }

    }
    if (event.type == "touchend") {
        this.dragging = false;
        var touches = event.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            this.paint(touches[i].pageX,touches[i].pageY);
        }

    }
    if(event.type=="touchmove"){
        if(this.dragging){
            var touches = event.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                this.paint(touches[i].pageX,touches[i].pageY);
            }
        }

    }
    if(event.type=="contextmenu"){
        event.preventDefault();
        var d = this.ctx.getImageData(event.x,event.y,1,1).data;
        var c = rgbToHex(d[0],d[1],d[2]);
        this.color=c;
        this.colorInput.value = c;

    }


}

Drawer.prototype.updateSettings = function(evt) {

    this.brushsize = document.getElementById("brushSizeInput").value;
    this.hardness = document.getElementById("hardnessInput").value;
    this.color = document.getElementById("colorInput").value;
    this.setTransparency(document.getElementById("transInput").value/100);

}

Drawer.prototype.setTransparency = function(t){
    this.transparency = t;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.globalAlpha = 1-this.transparency;
}

Drawer.prototype.save = function(){
    var canvasData = this.canvas.toDataURL("image/png");

    if(document.getElementById("notification") == null){
        var e = document.createElement("div");
        e.id = "notification";
        this.canvas.parentNode.appendChild(e);
    }else{
        document.getElementById("notification").innerHTML = "";
    }
    var ajax = false;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    }

    else if (window.ActiveXObject) {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.open('POST', 'save.php', false);
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function() {
        console.log(ajax.responseText);
        document.getElementById("notification").innerHTML = ajax.response;
    }
    ajax.send("imgData="+canvasData);
}


Drawer.prototype.fill = function() {
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

Drawer.prototype.clear = function(){
    var backup = this.color;
    this.color =this.bgcolor;
    this.fill();
    this.color=backup;

}



Drawer.prototype.paint = function(mouseX,mouseY){

    this.ctx.beginPath();
    this.ctx.arc(mouseX, mouseY, this.brushsize, 0, Math.PI*2, true);
    this.ctx.closePath();
    var grd=this.ctx.createRadialGradient(parseFloat(mouseX),parseFloat(mouseY),(this.hardness*this.brushsize/100),mouseX,mouseY,this.brushsize);
    var tc = hexToRgb(this.color);
    grd.addColorStop(0,this.color);
    grd.addColorStop(1,"rgba("+tc.r+","+tc.g+","+tc.b+",0)");
    this.ctx.fillStyle = grd;
    this.ctx.fill();
    //console.log("painting;"+mouseX+","+mouseY+"; with "+this.color+" at size "+this.brushsize);

}






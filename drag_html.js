openedW = true;

function closeW() {document.getElementById('window').style.display = 'none';};

function dashW() {

	openedW = !openedW;
	
	if (openedW == false) {
	
		document.getElementById('window').style.height = '22px';
		
		document.getElementById('window').style.width = '22px';
		
		button3.style.left = "0px";
	};
	
	if (openedW == !false) {
	
		document.getElementById('window').style.height = '340px';
		
		document.getElementById('window').style.width = '460px';
		
		button3.style.left = "370px";
	};
};

widedW = true;

function wideW() {

	widedW = !widedW;
	
	if (widedW == false) {
	
		document.getElementById('window').style.height = '100vh';
		
		document.getElementById('window').style.width = '100vw';
		
		button3.style.left = "calc(100% - 90px)";
		
		button2.style.left = "calc(100% - 60px)";
				
		button1.style.left = "calc(100% - 30px)";
		
		document.getElementById('window').style.position = 'fixed';
		
		document.getElementById('window').style.top = '0px';
				
		document.getElementById('window').style.left = '0px';
	};
	
	if (widedW == !false) {
	
		document.getElementById('window').style.height = '340px';
		
		document.getElementById('window').style.width = '460px';
		
		button3.style.left = "370px";
		
		button2.style.left = "400px";
		
		button1.style.left = "430px";
		
		document.getElementById('window').style.position = 'absolute';
		
		
		document.getElementById('window').style.left = "100px";
		document.getElementById('window').style.top = "100px";
	};
};

let mousePosition;
let offset = [0,0];
let div = document.getElementById("window");
let isDown = false;


div.style.position = "absolute";
div.style.border = "1px solid black";
//div.style.borderRadius = "5px";

div.style.left = "100px";
div.style.top = "100px";


div.style.background = "#edeceb";

//document.body.appendChild(div);

div.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

const canvas = document.getElementById("jsCanvas");

/* canvas에서 getContext 를 해야 ocntext를 다룰수 있다. */
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

/* canvas가 인식하는 pixel modifier가 필요 */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* 색을 갖게 해줌. */
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

/* 선의 굵기 */
ctx.lineWidth = 2.5;

/* 사각형 만들어 색 채우기 */
//ctx.fillStyle ="green";
//ctx.fillRect(50, 20, 100, 49);
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    console.log(event);
    /* offset은 캔버스 내의 좌표값 */
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ // painting = true = 마우스를 누르는중
        /* path 시작점. 움직일땐 동작하지 않음.*/
        ctx.beginPath(); //시작점을 갖고 옴.
        ctx.moveTo(x, y);
    } else {
        /* path의 전 위치에서 지금 위치까지 선을만듦*/
        ctx.lineTo(x, y);
        ctx.stroke();

    }
    //console.log(x, y);
}
/* function onMouseDown(event){
    //console.log(event);
    painting = true;
} */
/* function onMouseUp(event){
    stopPainting();
}
 */

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;

}

function handleRangeChange(event){
    //console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handlCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting );
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handlCanvasClick);
}

//console.log(Array.from(colors));
if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

}

if(range){
    range.addEventListener("input", handleRangeChange);
    
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
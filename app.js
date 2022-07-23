const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; // 초기값
let isPainting = false;

const colors = [
    "#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43", "#ee5253", "#0abde3", "#10ac84", "#c8d6e5", "#222f3e", "#333"
];

function onMove(e) {
    
    if(isPainting) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(e.offsetX, e.offsetY); // canvas 위에 마우스가 있으면 따라다님.
}

function startPainting() {
    ctx.beginPath(); // 새로운 path를 만들어야 기존의 line에 영향을 안준다. onMove 함수나 cancelPainting 함수 안에 넣어도 됨.
    // let color = colors[Math.floor(Math.random() * colors.length)]; // 랜덤 컬러
    //ctx.strokeStyle = color;
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

function onLineWidthChange(e) { // 이벤트가 들어가야 하는 것 염두.
    // console.log(e.target.value);
    ctx.lineWidth =  e.target.value; // 굵기 변경
}

function onColorChange(e) { // 이벤트가 들어가야 하는 것 염두.
    // console.log(e.target.value);
    ctx.strokeStyle = e.target.value; // 색상 변경
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
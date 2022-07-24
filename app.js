const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraserBtn = document.getElementById("eraser-btn");
// const colorOptions = document.getElementsByClassName("color-option"); // 배열이 아님.
const colorOptions = Array.from(document.getElementsByClassName("color-option")); // 베열 생성
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800; // 
const CANVAS_HEIGHT = 800; // 

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value; // 초기값, 한번만 실행
let isPainting = false;
let isFilling = false;

const colors = [
    "#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43", "#ee5253", "#0abde3", "#10ac84", "#00d2d3", "#54a0ff", "#5f27cd", "#c8d6e5", "#576574", "#01a3a4", "#2e86de", "#341f97", "#8395a7", "#222f3e", "#333", "#fff"
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
    ctx.strokeStyle = e.target.value; // 라인 색상 변경
    ctx.fillStyle = e.target.value; // 채우기 색상 변경
}

function onColorClick(e) { // 이벤트가 들어가야 하는 것 염두.
    // console.dir(e.target.dataset.color); // 속성 목록을 상호작용 가능한 형태로 표시
    // ctx.strokeStyle = e.target.dataset.color; // 라인 색상 변경
    // ctx.fillStyle = e.target.dataset.color; // 채우기 색상 변경
    const colorValue = e.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue; // 위에서 바꾼 값을 input에도 변경해서 넣어줌
}

function onModeClick() { // fill draw 모드 전환
    //console.log(modeBtn);
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() { // fill 모드일 때 지정된 색상을 캔버스 전체에 덮음
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onResetClick() {
    ctx.fillStyle = "#fff"; // 리셋의 개념은 기본 바탕색인 흰색으로 덮으면 됨
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "#fff"; // 지운다의 개념은 흰바탕 색과 같이 그려주는 것
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mousedown", onCanvasClick); // Click -> mousedown 으로 수정(클릭한 채로 드래그하면 라인이 그려져서)

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick)); // 어떤 색상이 클릭 되었는지 감지. ForEach 함수 사용하려고 배열로 변환

modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraserBtn.addEventListener("click", onEraserClick);




//console.log(colorOptions);
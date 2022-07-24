const modeBtn = document.getElementById("mode-btn");
// const colorOptions = document.getElementsByClassName("color-option"); // 배열이 아님.
const colorOptions = Array.from(document.getElementsByClassName("color-option")); // 베열로 생성
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value; // 초기값
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



canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick)); // 어떤 색상이 클릭 되었는지 감지.





//console.log(colorOptions);
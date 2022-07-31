const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
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
ctx.lineCap = "round";
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
        modeBtn.innerText = "🩸 Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "🩸 Draw";
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
    modeBtn.innerText = "🩸 Fill";
}

function onFileChange(e) {
    // console.dir(e); // target 안의 files
    const file = e.target.files[0]; // 파일을 불러오면 브라우저 메모리에 있음
    const url = URL.createObjectURL(file) // 현재 브라우저에서만 접근 가능한 url 생성
    // console.log(url); 
    const image = new Image(); // 생성자 함수, == <img src="">
    // const image = document.createElement("img"); 윗 코드와 같다.
    image.src = url; // 이미지의 url
    image.onload = function() { // 이미지가 로드 되었을 때
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 이미지를 그림
        fileInput.value = null; // file input 비우기
    }
}

function onDoubleClick(e){ // 저장된 텍스트를 더블 클릭하면
    // console.log(e.offsetX, e.offsetY);
    const text = textInput.value;
    if(text !== ""){ // text 값이 있다면
        ctx.save(); // 현재 설정 값을 저장 이후 restore()가 나올 때까지의 값을 저장하지 않음
        ctx.lineWidth = 1; // 기존에 저장되어 있던 선 굵기를 1로 만들어 줌;
        ctx.font = "68px serif"
        ctx.fillText(text, e.offsetX, e.offsetY); // fillText 혹은 strokeText 중 선택
        ctx.restore(); // 기존 설정 값으로 복구
    }
}

function onSaveClick(){
    //console.log(canvas.toDataURL());
    const url = canvas.toDataURL(); // 캔버스에 그린 이미지를 url로 변환해주는 메소드 // base64 
    const a = document.createElement("a"); // 가상 a태그 생성
    a.href = url; // url
    a.download = "myDrawing.png"; // download 속성을 줌 // 파일명
    a.click(); // 클릭하면...
}

canvas.addEventListener("dblclick", onDoubleClick); // 더블 클릭할 때 저장된 텍스트를...
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
saveBtn.addEventListener("click", onSaveClick);

fileInput.addEventListener("change", onFileChange);




//console.log(colorOptions);
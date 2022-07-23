const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 1;


// ctx.fillRect(50, 50, 100, 200); // 가로, 세로 50px 위치에 100 X 200 사각형

// ctx.moveTo(50, 50); // 이동에 사용
// ctx.lineTo(150, 50); // 선을 그으면서 이동
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill(); // 채워주냐 안채워(stroke)주냐 선택

// ctx.fillRect(200, 200, 50, 200);
// ctx.fillRect(400, 200, 50, 200);
// ctx.fillRect(300, 300, 50, 100);
// ctx.fillRect(200, 200, 200, 20);
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();

// ctx.fillRect(210 - 40, 200 - 30, 15, 100);
// ctx.fillRect(350 - 40, 200 - 30, 15, 100);
// ctx.fillRect(260 - 40, 200 - 30, 60, 200);

// ctx.arc(250, 100, 50, 0, 2 *  Math.PI);
// ctx.fill();

// ctx.beginPath(); // 경로를 시작하거나 현재 경로를 재설정
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, 0, Math.PI, 2 * Math.PI );
// ctx.arc(220 + 10, 80, 8, 0, Math.PI, 2 * Math.PI);
// ctx.fill();

const colors = [
    "#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#ff9f43", "#ee5253", "#0abde3", "#10ac84", "#c8d6e5", "#222f3e"
];

function onclick(e) {

    console.log(e.offsetX, e.offsetY);
    

    ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

}

canvas.addEventListener("click", onclick);
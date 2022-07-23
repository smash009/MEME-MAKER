const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;


// ctx.fillRect(50, 50, 100, 200); // 가로, 세로 50px 위치에 100 X 200 사각형

// ctx.moveTo(50, 50); // 이동에 사용
// ctx.lineTo(150, 50); // 선을 그으면서 이동
// ctx.lineTo(150, 150);
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.fill(); // 채워주냐 안채워(stroke)주냐 선택

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);
ctx.lineWidth = 2; // 순서주의
ctx.strokeRect(300, 300, 50, 100);
ctx.fillRect(200, 200, 200, 20);
ctx.moveTo(200, 200);
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
ctx.fill();
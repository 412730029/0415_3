let bg = ["#FAEBCD"];
let p = ["#E06A4E", "#DEB853", "#789F8A", "#5A3D2B"];

var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  let cells = 8;
  let offset = width / 8;
  let margin = 0;
  let w = (width - offset * 2 - margin * (cells - 1)) / cells;
  let h = (height - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);
      let d = w;
      let c = random(p);                                  // 使用第一個程式碼中的顏色
      let ball = new Ball({
        p: { x: x + w / 2, y: y + h / 2 },                // 球的位置
        r: d,                                             // 球的大小與格子相同
        color: c,                                         // 球的顏色
        v: { x: random(-2, 2), y: random(-2, 2) }         // 球的移動速度，有兩個屬性 (x, y)
      });
      balls.push(ball);                                   // 把產生的球體推(存)入到 balls 陣列內
    }
  }
}

function draw() {
  background(bg);

  for (j = 0; j < balls.length; j = j + 1) {
    let ball = balls[j];
    ball.display();

    ball.move();
  }
}

class Ball {
  constructor(args) {
    this.p = args.p; // 球的位置
    this.r = args.r; // 球的大小
    this.color = args.color; // 球的顏色
    this.v = args.v; // 球的移動速度
  }

  display() {
    push();
    translate(this.p.x, this.p.y);

    // 繪製臉的圖案
    let d = this.r;
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(0, 0, d, d, d / 2, d / 2, 0, 0);

    fill("#000000");
    circle(-d / 6, -d / 50, d / 7.5);
    circle(d / 6, -d / 50, d / 7.5);

    fill(bg);
    ellipse(0, d / 7.5, d / 2.2, d / 3);

    fill(this.color);
    ellipse(0, d / 11, d / 5, d / 7);

    pop();
  }

  move() {
    this.p.x += this.v.x; // x 軸移動
    this.p.y += this.v.y; // y 軸移動

    if (this.p.x < 0 || this.p.x > width) {
      this.v.x *= -1; // 碰到左右邊界則反彈
    }

    if (this.p.y < 0 || this.p.y > height) {
      this.v.y *= -1; // 碰到上下邊界則反彈
    }
  }
}
const NUM_BALLS = 12;

window.onload = function () {
  for (let i = 0; i < NUM_BALLS; i++) {
    var newDomBall = document.createElement("div");
    newDomBall.classList.add("ball");
    document.body.appendChild(newDomBall);
  }
  moveBalls(document.getElementsByClassName("ball"));
};

var balls = [];

const Xmin = 0;
const Xmax = screen.availWidth - 100;
const Ymin = 0;
const Ymax = screen.availHeight - 150;

var cursor = { x: -1000, y: -1000 };
document.onmousemove = (e) => {
  cursor.x = e.pageX;
  cursor.y = e.pageY;
};

function moveBalls(ballElements) {
  for (let i = 0; i < ballElements.length; i++) {
    balls.push({
      x: Math.random() * (Xmax - 200),
      y: Math.random() * (Ymax - 200),
      reverse: {
        x: false,
        y: false
      },
      velocity: {
        x: 2 ^ (Math.random() * 1 + 5),
        y: Math.random() * 1 + 5
      }
    });
    setInterval(() => {
      document.getElementsByClassName("ball")[i].style.background = `rgb(${
        255 - (Xmax - balls[i].x < 125 ? Xmax - balls[i].x : balls[i].x)
      }, ${255 - balls[i].y}, ${255 - (Ymax - balls[i].y)})`;
      balls[i].reverse.x =
        balls[i].x >= Xmax || balls[i].x <= Xmin
          ? !balls[i].reverse.x
          : balls[i].reverse.x;
      balls[i].reverse.y =
        balls[i].y >= Ymax || balls[i].y <= Ymin
          ? !balls[i].reverse.y
          : balls[i].reverse.y;
      const original = { x: balls[i].x, y: balls[i].y };
      balls[i].x = balls[i].reverse.x
        ? balls[i].x + balls[i].velocity.x
        : balls[i].x - balls[i].velocity.x;
      balls[i].y = balls[i].reverse.y
        ? balls[i].y + balls[i].velocity.y
        : balls[i].y - balls[i].velocity.y;
      balls.map((otherBall, index) => {
        if (
          index !== i &&
          balls[i].y >= otherBall.y &&
          balls[i].y <= otherBall.y + 100 &&
          balls[i].x >= otherBall.x &&
          balls[i].x <= otherBall.x + 100
        ) {
          balls[i].reverse.x = !otherBall.reverse.x;
          balls[i].reverse.y = !otherBall.reverse.y;
          otherBall.reverse.x = !balls[i].reverse.x;
          otherBall.reverse.y = !balls[i].reverse.y;
          balls[i].x = original.x;
          balls[i].y = original.y;
        }
        if (
          balls[i].y >= cursor.y - 100 &&
          balls[i].y <= cursor.y + 100 &&
          balls[i].x >= cursor.x - 100 &&
          balls[i].x <= cursor.x + 100
        ) {
          if (
            (balls[i].x >= cursor.x && !balls[i].reverse.x) ||
            (balls[i].x <= cursor.x && balls[i].reverse.x)
          ) {
            balls[i].reverse.x = !balls[i].reverse.x;
          }
          if (
            (balls[i].y >= cursor.y && !balls[i].reverse.y) ||
            (balls[i].y <= cursor.y && balls[i].reverse.y)
          ) {
            balls[i].reverse.y = !balls[i].reverse.y;
          }
        }
      });
      if (
        balls[i].y >= Ymax - 50 ||
        balls[i].y <= Ymin ||
        balls[i].x >= Xmax ||
        balls[i].x <= Xmin
      ) {
        balls[i].velocity.y = Math.random() * 1 + 5;
        balls[i].velocity.x = Math.random() * 1 + 5;
      }
      if (balls[i].x >= Xmax) {
        balls[i].x = Xmax;
      } else if (balls[i].x <= Xmin) {
        balls[i].x = Xmin;
      }
      if (balls[i].y >= Ymax) {
        balls[i].y = Ymax;
      } else if (balls[i].y <= Ymin) {
        balls[i].y = Ymin;
      }
      document.getElementsByClassName("ball")[i].style.left = balls[i].x + "px";
      document.getElementsByClassName("ball")[i].style.top = balls[i].y + "px";
    }, 10);
  }
}

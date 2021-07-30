const balls = document.getElementsByClassName('ball');
let hue = 0;

document.onmousemove = (event) => {
  const x = (event.clientX * 100) / window.innerWidth + '%';
  const y = (event.clientY * 100) / window.innerHeight + '%';

  for (let i = 0; i < balls.length; i++) {
  balls[i].style.left = x;
  balls[i].style.top = y;
  balls[i].transform = 'translate(-' + x + ',-' + y + ')';
  }
};

document.ondblclick = (event) => {
  hue += 10;
  document.body.style.setProperty("background-color", `hsla(${hue}, 100%, 50%, 1)`, "important");
};

const rangeMove = (event) => {
  const opacity = event.target.value / 100;
  const bloodshotImgs = [...document.getElementsByClassName('eye')];
  bloodshotImgs.forEach(eye => {
    eye.style.opacity = opacity;
  });
}
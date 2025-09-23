// Music Toggle
function toggleMusic() {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// Confetti + Fireworks
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = Array.from({length: 200}).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 6 + 2,
  d: Math.random() * 0.5 + 0.5,
  color: `hsl(${Math.random() * 360}, 100%, 50%)`
}));

let fireworks = [];

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
    ctx.fillStyle = c.color;
    ctx.fill();
  });
  updateConfetti();
  drawFireworks();
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += c.d;
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

// Fireworks effect
function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height/2;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  for (let i = 0; i < 100; i++) {
    fireworks.push({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 3 + 2,
      radius: Math.random() * 3,
      color: color,
      life: 100
    });
  }
}

function drawFireworks() {
  fireworks.forEach((f, i) => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI*2);
    ctx.fillStyle = f.color;
    ctx.fill();
    f.x += Math.cos(f.angle) * f.speed;
    f.y += Math.sin(f.angle) * f.speed;
    f.life--;
    if (f.life <= 0) fireworks.splice(i, 1);
  });
}

setInterval(drawConfetti, 20);
setInterval(launchFirework, 2000);
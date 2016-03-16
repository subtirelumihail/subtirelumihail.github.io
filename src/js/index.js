import 'styles/main.scss';

var s = document.getElementById('space');
var ctx = s.getContext('2d');
var w;
var h;
var resizeInterval;

var i = 0;
var y = true;
var z = 360;

//Circle values
const radius = s.height/2;

const resize = () => {
  clearInterval(resizeInterval);
  resizeInterval = setTimeout(() => {
    s.width = w = window.innerWidth;
    s.height = h = w;
  }, 10);
};

const addColors = (gradient) => {
  const colors = ['red', 'green', 'blue'];
  let colorIndex = 0;
  
  for (let i = 0; i < 10; i++) {
    colorIndex = colorIndex > 2 ? 0 : colorIndex;
    gradient.addColorStop(+(`0.${i}`), colors[colorIndex]);
    colorIndex++;
  }
};

const draw = (depth, d) => {
  let direction = d ? 1 : -1;
  let centreX = s.width / 2;
  let centreY = s.height / 2;
  let p = y ? i : z;
  
  let gradient = ctx.createLinearGradient(0, 0, centreX*p/150 + Math.PI, 0);
  addColors(gradient);

  
  ctx.save();
  ctx.beginPath();
  
  ctx.translate(centreX,centreY);
  ctx.rotate(direction*(i*Math.PI/180));
  ctx.translate(-centreX,-centreY);

  ctx.arc(centreX,centreY,radius-depth,0.5,1.8*Math.PI);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = radius/10;
  ctx.stroke();
  ctx.fill();
  
  ctx.restore();
};

const go = () => {
  if (i === 361) {
    i = 0; y = !y; z = 360;
  } else {
    i++;
  }
  
  z = z-1;
  
  ctx.fillStyle = 'hsla(0,0%,0%,1)';
  ctx.fillRect(0,0,w,h); // clear canvas
  
  let d = true;
  for (let n=0; n<=radius; n=n+radius/5){
    draw(n, d);
    d = !d;
  }
  window.requestAnimationFrame(go);
};

go();
resize();

window.addEventListener('resize', resize, false);

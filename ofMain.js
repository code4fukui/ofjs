import { SimplexNoise2D } from "https://code4fukui.github.io/SimplexNoise/SimplexNoise2D.js";
//import { PerlinNoise2D } from "https://code4fukui.github.io/PerlinNoise/PerlinNoise2D.js";
import { Vector2 } from "./Vector2.js";
import { RandomXorshift } from "./RandomXorshift.js";

export const cos = Math.cos;
export const sin = Math.sin;
export const atan2 = Math.atan2;
export const PI = Math.PI;

let canvas;
let g;
if (globalThis.document) {
  document.body.style.margin = 0;
  document.body.style.height = "100vh";
  canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  document.body.appendChild(canvas);
  g = canvas.getContext("2d");
  document.body.onclick = () => {
    document.body.style.cursor = "none";
    canvas.requestFullscreen();
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        document.body.style.cursor = "default";
      }
    });
  };
  
  const onresize = () => {
    const dpr = devicePixelRatio;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  };
  addEventListener("resize", onresize);
  onresize();
}

export const OF_WINDOW = 1;


/*
export const ofSetupOpenGL = (w, h, opt) => {
  canvas.width = w;
  canvas.height = h;
};
*/

export const ofGetWindowSize = () => {
  return new Vector2(canvas.width, canvas.height);
};

export const ofTranslate = (vec2) => {
  g.translate(vec2.x, vec2.y);
};

export const ofSetColor = (color) => {
  g.fillStyle = g.strokeStyle = color;
};

let fillmode = false;
let firstpoint = true;
export const ofBeginShape = () => {
  firstpoint = true;
  g.beginPath();
};

export const ofFill = () => {
  fillmode = true;
};

export const ofNoFill = () => {
  fillmode = false;
};

export const ofVertex = (vec) => {
  if (firstpoint) {
    g.moveTo(vec.x, vec.y);
    firstpoint = false;
  } else {
    g.lineTo(vec.x, vec.y);
  }
};

export const ofEndShape = (opt) => {
  if (fillmode) {
    g.fill();
  } else {
    g.stroke();
  }
};

export const ofSetWindowTitle = (title) => {
  document.title = title;
};

let bgcolor = "rgb(0,0,0)";

export const ofBackground = (color) => {
  bgcolor = `rgb(${color}, ${color}, ${color})`;
};

export const ofColor = (r, g, b) => {
  if (g === undefined) {
    return `rgb(${r},${r},${r})`;
  }
  return `rgb(${r},${g},${b})`;
};

export const ofSetLineWidth = (n) => {
  g.lineWidth = n;
};

const rnd = new RandomXorshift();
//rnd.setSeed(100);
const noise = new SimplexNoise2D(rnd);
//const noise = new PerlinNoise2D();

export const ofSeedRandom = (n) => {
  rnd.setSeed(n);
  //noise = new SimplexNoise2D(rnd);
};

export const ofRandom = (n = 1) => {
  return (rnd.next() * n) >> 0;
};

let framecnt = 0;
export const ofGetFrameNum = () => {
  return framecnt;
};

export const ofMap = (n, min, max, min2, max2) => {
  //if (n < min) n = min;
  //if (n > max) n = max;
  return (n - min) / (max - min) * (max2 - min2) + min2;
};

export const ofNoise = (x, y) => {
  return (noise.noise(x, y) / 2) + 0.5;
};

/*
let lastFrameTime = performance.now();
let fps;
const calcFPS = () => {
  const now = performance.now();
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  fps = 1000 / delta; // FPS = 1000ms / フレーム間の時間差
};
*/

const calcFPS = async () => {
  return new Promise((resolve) => {
    const dts = [];
    const tick = () => {
      dts.push(performance.now());
      if (dts.length <= 10) {
        requestAnimationFrame(tick);
        return;
      }
      let t = dts[0];
      let dtsum = 0;
      for (let i = 1; i < dts.length; i++) {
        const dt = dts[i] - t;
        t = dts[i];
        dtsum += dt;
      }
      const fps = 1000 / (dtsum / (dts.length - 1));
      resolve(fps);
    };
    tick();
  });
};

let fps = 60; // default
export const ofGetFramePerSecond = () => {
  return fps;
};

export const ofRunApp = async (app) => {
  fps = await calcFPS();
  console.log("fps", fps);
  app.setup();
  const tick = () => {
    app.update();
    g.save();
    g.fillStyle = bgcolor;
    g.fillRect(0, 0, canvas.width, canvas.height);
    app.draw(fps);
    g.restore();
    framecnt++;
    requestAnimationFrame(tick);
  };
  tick();
};

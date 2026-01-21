const canvas = document.getElementById("videoCanvas");
const ctx = canvas.getContext("2d");
const loader = document.getElementById("loader");

/* ---------------------------
   GLOBAL STATE
---------------------------- */
let images = [];
let frameIndex = 0;
let lastTime = 0;
let rafId = null;
let currentMode = null;

/* ---------------------------
   SMOOTHNESS TUNING
---------------------------- */
const ENABLE_FRAME_BLEND = true; // 👈 toggle
const MAX_FRAME_SKIP = 3;        // safety limit

/* ---------------------------
   MODE + CONFIG
---------------------------- */
function getMode() {
  return window.innerWidth <= 768 ? "mobile" : "desktop";
}

function getConfig(mode) {
  return mode === "mobile"
    ? {
        dir: "framesMobile",
        total: 190,
        width: 720,
        height: 1280,
        fps: 30,
        startFrame: 1
      }
    : {
        dir: "frames",
        total: 240,
        width: 1280,
        height: 720,
        fps: 30,
        startFrame: 33
      };
}

/* ---------------------------
   CLEANUP
---------------------------- */
function stop() {
  if (rafId) cancelAnimationFrame(rafId);
  images = [];
  frameIndex = 0;
  lastTime = 0;
}

/* ---------------------------
   IMAGE LOADER (WEBP + FALLBACK)
---------------------------- */
function loadFrame(dir, i) {
  return new Promise(resolve => {
    const img = new Image();
    img.decoding = "async";

    const base =
      `https://celegance.live/${dir}/frame_${String(i).padStart(4, "0")}`;

    img.src = `${base}.webp`;
    img.onerror = () => {
      img.src = `${base}.jpg`;
    };

    img.onload = () => resolve(img);
  });
}

/* ---------------------------
   START PLAYER (FULL PRELOAD)
---------------------------- */
async function start(mode) {
  stop();
  currentMode = mode;

  loader.style.display = "flex";
  loader.style.opacity = "1";

  const cfg = getConfig(mode);
  canvas.width = cfg.width;
  canvas.height = cfg.height;

  const frameDuration = 1000 / cfg.fps;
  const tempImages = [];
  const totalToLoad = cfg.total - cfg.startFrame + 1;
  const BATCH_SIZE = 6;

  for (let i = cfg.startFrame; i <= cfg.total; i += BATCH_SIZE) {
    if (currentMode !== mode) return;

    const batch = [];
    for (let j = i; j < i + BATCH_SIZE && j <= cfg.total; j++) {
      batch.push(loadFrame(cfg.dir, j));
    }

    const loaded = await Promise.all(batch);
    tempImages.push(...loaded);

    const progress = Math.round(
      (tempImages.length / totalToLoad) * 100
    );
    loader.textContent = `L O A D I N G   ${progress}%`;
  }

  images = tempImages;

  loader.style.opacity = "0";
  setTimeout(() => (loader.style.display = "none"), 500);

  rafId = requestAnimationFrame(play.bind(null, frameDuration));
}

/* ---------------------------
   PLAY LOOP (SMOOTH)
---------------------------- */
function play(frameDuration, time) {
  if (!lastTime) lastTime = time;

  const delta = time - lastTime;

  if (delta >= frameDuration && images.length) {
    // How many frames should we advance?
    let advance = Math.floor(delta / frameDuration);
    advance = Math.min(advance, MAX_FRAME_SKIP);

    frameIndex = (frameIndex + advance) % images.length;

    // Correct timing drift
    lastTime = time - (delta % frameDuration);

    // DRAW
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ENABLE_FRAME_BLEND && images.length > 1) {
      const nextIndex = (frameIndex + 1) % images.length;

      ctx.globalAlpha = 0.6;
      ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 0.4;
      ctx.drawImage(images[nextIndex], 0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
    } else {
      ctx.drawImage(
        images[frameIndex],
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
  }

  rafId = requestAnimationFrame(play.bind(null, frameDuration));
}

/* ---------------------------
   RESIZE HANDLER
---------------------------- */
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const mode = getMode();
    if (mode !== currentMode) start(mode);
  }, 200);
});

/* ---------------------------
   INIT
---------------------------- */
start(getMode());

// =======================
// Page Detection
// =======================
const page = document.body.id || "";

if (page === "home") {
  runTypewriter();
}

if (page === "about") {
  runHintButton();
}

runPlayButton();
runClickSound();
runButtonClickSound();
runDraggable();
// =======================
// Functions
// =======================
function runTypewriter() {
  const lines = document.querySelectorAll(".typewriter-effect");
  if (!lines.length) return;

  let delay = 0;
  lines.forEach((line) => {
    const durationSec = parseFloat(
      getComputedStyle(line).getPropertyValue("--typing-duration")
    );
    const durationMs = durationSec * 1000;

    setTimeout(() => {
      line.classList.add("typing");
      setTimeout(() => {
        line.classList.remove("typing");
        line.classList.add("finished");
      }, durationMs);
    }, delay);

    delay += durationMs;
  });
}
let isDragging = false;
let activeBox = null;
let currentZIndex = 100;

function runDraggable() {
  const draggableElements = document.getElementsByClassName("draggable");
  if (!draggableElements.length) return;
  let offsetX, offsetY;

  Array.from(draggableElements).forEach((box) => {
    box.addEventListener("mousedown", (e) => {
      document.body.style.overflow = "hidden";

      currentZIndex++;
      box.style.zIndex = currentZIndex;

      activeBox = box;
      isDragging = true;

      offsetX = e.clientX - box.offsetLeft;
      offsetY = e.clientY - box.offsetTop;
      box.style.cursor = "grabbing";
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging && activeBox) {
      activeBox.style.left = e.clientX - offsetX + "px";
      activeBox.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    document.body.style.overflow = "";

    isDragging = false;
    if (activeBox) {
      activeBox.style.cursor = "grab";
      activeBox = null;
    }
  });
}

function runHintButton() {
  const hintButton = document.querySelector(".hint-button");
  if (!hintButton) return;

  hintButton.addEventListener("click", function () {
    const hintText = this.nextElementSibling;
    if (hintText) {
      hintText.classList.toggle("show");
    }
  });
}

function runClickSound() {
  const clickSound = document.getElementById("click-sound-1");
  if (!clickSound) return;

  const excludeSelectors = ["button", "a", ".draggable"];
  document.addEventListener("click", (e) => {
    if (isDragging) return;
    if (excludeSelectors.some((sel) => e.target.closest(sel))) return;

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  });
}

function runButtonClickSound() {
  const buttonClickSound = document.getElementById("click-sound-2");
  if (!buttonClickSound) return;

  const clickableElements = document.querySelectorAll("button, a");

  clickableElements.forEach((element) => {
    element.addEventListener("click", () => {
      buttonClickSound.currentTime = 0;
      buttonClickSound.play().catch(() => {});
    });
  });
}

document.querySelectorAll(".close-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

function runPlayButton() {
  const playbtn = document.getElementById("playbutton");
  const backgroundMusic = document.getElementById("bgm");

  if (!playbtn) return;

  backgroundMusic.loop = true;

  let isPlaying = false;

  playbtn.addEventListener("click", () => {
    if (!isPlaying) {
      playbtn.classList.replace("bi-volume-off-fill", "bi-volume-up-fill");
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch(() => {});
      isPlaying = true;
    } else {
      playbtn.classList.replace("bi-volume-up-fill", "bi-volume-off-fill");
      backgroundMusic.pause();
      isPlaying = false;
    }
  });
}

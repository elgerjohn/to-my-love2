const correctCode = "052026"; // CHANGE THIS
let heartInterval = null;
let musicPlaying = false;
let revealActive = false;

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const bouquetReveal = document.getElementById("bouquetReveal");
const codeDisplay = document.querySelector(".code-display");

const secretCodeInput = document.getElementById("secretCode");

if (secretCodeInput) {
secretCodeInput.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
checkCode();
}
});

secretCodeInput.addEventListener("input", () => {
document.getElementById("error").innerText = "";
});
}

function flashCodeDisplay() {
if (!codeDisplay) {
return;
}

codeDisplay.classList.remove("pulse");
void codeDisplay.offsetWidth;
codeDisplay.classList.add("pulse");

setTimeout(() => {
codeDisplay.classList.remove("pulse");
}, 220);
}

function pressCodeDigit(digit) {
if (!secretCodeInput) {
return;
}

if (secretCodeInput.value.length >= correctCode.length) {
flashCodeDisplay();
return;
}

secretCodeInput.value += digit;
document.getElementById("error").innerText = "";
flashCodeDisplay();
}

function clearCode() {
if (!secretCodeInput) {
return;
}

secretCodeInput.value = "";
document.getElementById("error").innerText = "";
flashCodeDisplay();
}

async function startMusicAuto() {
if (!bgMusic || !musicToggle || !musicStatus) {
return;
}

try {
bgMusic.currentTime = 0;
await bgMusic.play();
musicPlaying = true;
musicToggle.textContent = "Pause Music";
musicStatus.textContent = "Soft music is playing";
} catch (error) {
musicPlaying = false;
musicToggle.textContent = "Play Music";
musicStatus.textContent = "Tap Play Music if autoplay is blocked";
}
}

function checkCode() {
const code = document.getElementById("secretCode").value.trim();

if (code === correctCode) {
if (revealActive) {
return;
}

revealActive = true;
document.getElementById("error").innerText = "";
document.getElementById("lockScreen").style.opacity = "0";

if (bouquetReveal) {
bouquetReveal.classList.add("show");
}

setTimeout(() => {
document.getElementById("lockScreen").style.display = "none";
document.getElementById("homePage").style.display = "block";

if (bouquetReveal) {
bouquetReveal.classList.remove("show");
}

startHearts();
startMusicAuto();
}, 2600);
} else {
document.getElementById("error").innerText = "Wrong date my love \uD83D\uDC94";
}
}

function startHearts() {
if (heartInterval) {
clearInterval(heartInterval);
}

const container = document.querySelector(".hearts");

if (!container) {
return;
}

heartInterval = setInterval(() => {
const roll = Math.random();

if (roll < 0.72) {
const heart = document.createElement("div");

heart.classList.add("heart");
heart.classList.add(Math.random() > 0.5 ? "heart-pink" : "heart-blue");
heart.textContent = "\u2764";
heart.style.left = Math.random() * 100 + "%";
heart.style.fontSize = 14 + Math.random() * 18 + "px";
heart.style.animationDuration = 4 + Math.random() * 4 + "s";
heart.style.setProperty("--move", Math.random() * 200 - 100 + "px");

container.appendChild(heart);

setTimeout(() => {
heart.remove();
}, 8000);
} else {
const stitch = document.createElement("div");

stitch.className = "stitch-fountain";
stitch.style.left = Math.random() * 100 + "%";
stitch.style.animationDuration = 4.5 + Math.random() * 3.5 + "s";
stitch.style.setProperty("--move", Math.random() * 180 - 90 + "px");

container.appendChild(stitch);

setTimeout(() => {
stitch.remove();
}, 8500);
}
}, 120);
}

function openLetter() {
document.querySelector(".envelope").classList.toggle("open");
}

async function toggleMusic() {
if (!bgMusic || !musicToggle || !musicStatus) {
return;
}

try {
if (musicPlaying) {
bgMusic.pause();
musicPlaying = false;
musicToggle.textContent = "Play Music";
musicStatus.textContent = "Soft music is off";
return;
}

await bgMusic.play();
musicPlaying = true;
musicToggle.textContent = "Pause Music";
musicStatus.textContent = "Soft music is playing";
} catch (error) {
musicPlaying = false;
musicToggle.textContent = "Play Music";
musicStatus.textContent = "Add the media file in /music";
}
}

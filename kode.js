const audio = document.getElementById("lagu");
const nextAfterSong = document.getElementById("nextAfterSong");

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const result = document.getElementById("result");
  const btn = document.getElementById("nextStepBtn");
  const benar = document.getElementById("img-correct");
  const salah = document.getElementById("img-wrong");

  if (answer === "esmosi") {
    result.textContent = "INII BARUU KAMUU!!";
    result.style.color = "green";
    benar.classList.remove("hidden");
    salah.classList.add("hidden");
    btn.classList.remove("hidden");
  } else {
    result.textContent = "AH PAYAHHH, COBA LAGI DONG 😏 Ah ku kasi klu dehh, klunya emosi";
    result.style.color = "red";
    salah.classList.remove("hidden");
    benar.classList.add("hidden");
    btn.classList.add("hidden");
  }
}

function goToStep(step) {
  document.querySelectorAll(".container")
    .forEach(el => el.classList.add("hidden"));

  document.getElementById("step" + step)
    .classList.remove("hidden");
   if (step === 2) startGame();
  if (step === 3) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
} nextAfterSong.classList.remove("hidden");

function notif() {
  alert("Coklat kamu udah di depan rumah 🍫🔥\nAmbil donggg panas 😭");
}


// --- RUNAWAY NO BUTTON ---
const noBtn = document.getElementById("noBtn");

if (noBtn) {

  // Kabur saat mouse mendekat
  noBtn.addEventListener("mouseover", function () {
    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });

  // Kabur saat diclick (tidak bisa dipencet)
  noBtn.addEventListener("click", function (e) {
    e.preventDefault(); // mencegah klik berfungsi

    const x = Math.random() * window.innerWidth * 0.7;
    const y = Math.random() * window.innerHeight * 0.7;
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  });
}

// ================== AUDIO ==================
const bgmGame = document.getElementById("bgmGame");
const soundBomb = document.getElementById("soundBomb");
const soundWin = document.getElementById("soundWin");

// ================== MINI GAME ==================
let score = 0;
let gameOver = false;
let gameInterval = null;

function startGame() {
  const area = document.getElementById("gameArea");

  area.innerHTML = "";
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "0 / 5";

  // play musik game
  bgmGame.currentTime = 0;
  bgmGame.play();

  gameInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(gameInterval);
      return;
    }

    const head = document.createElement("div");
    head.classList.add("poto");

    const isBomb = Math.random() < 0.7;

    if (isBomb) {
      head.innerHTML = `<img src="bom.png" class="bomimg">`;
      head.dataset.type = "bom";
    } else {
      head.innerHTML = `<img src="boy.jpg" class="potoimg">`;
      head.dataset.type = "kepala";
    }

    const x = Math.random() * (area.clientWidth - 40);
    const y = Math.random() * (area.clientHeight - 40);

    head.style.left = x + "px";
    head.style.top = y + "px";

    head.onclick = () => {
      // KENA BOM
      if (head.dataset.type === "bom") {
        gameOver = true;
        clearInterval(gameInterval);

        soundBomb.currentTime = 0;
        soundBomb.play();

        stopGameMusic();
        showGameOver();
        return;
      }

      // KLIK KEPALA
      head.remove();
      score++;
      document.getElementById("score").innerText = score + " / 5";

      // MENANG
      if (score >= 1) {
        gameOver = true;
        clearInterval(gameInterval);

        stopGameMusic();

        soundWin.currentTime = 0;
        soundWin.play();

        setTimeout(() => goToStep(3), 900);
      }
    };

    area.appendChild(head);
    setTimeout(() => head.remove(), 3000); resetStep6Animation();
  }, 900);
}

// ================== GAME OVER ==================
function showGameOver() {
  document.getElementById("gameOverScreen").style.display = "flex";
}

function restartGame() {
  stopGameMusic();
  document.getElementById("gameOverScreen").style.display = "none";
  startGame();
}

function stopGameMusic() {
  bgmGame.pause();
  bgmGame.currentTime = 0;
}

function openMail(btn) {
  // ubah button jadi gambar
  btn.classList.add("opened");

  // delay biar keliatan animasinya
  setTimeout(() => {
    goToStep(5);
  }, 700);
}
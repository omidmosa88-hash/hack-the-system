// SUPABASE CONNECTION
const SUPABASE_URL = "https://twiglzobfxragspqfhtg.supabase.co";
const SUPABASE_KEY = "sb_publishable_2U1DeaIiifzJl23Y3ShRzg_gAn5CCzV";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
// TELEGRAM USER
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const telegramUser = tg?.initDataUnsafe?.user || null;
const answer = document.getElementById("answer");
const button = document.getElementById("submit");
const feedback = document.getElementById("feedback");
const title = document.querySelector(".mission h2");
const tag = document.querySelector(".mission .tag");
const question = document.querySelector(".question");
const sequence = document.querySelector(".sequence");
const missionElement = document.querySelector(".mission");

const hintButton = document.getElementById("hint-button");
const hintText = document.getElementById("hint-text");
const scoreDisplay = document.getElementById("score");

const investigationRoom = document.getElementById("investigation-room");

const missions = [
  {
    title: { en: "Sequence Protocol", fa: "پروتکل دنباله" },
    question: {
      en: "Find the next number in this sequence.",
      fa: "عدد بعدی این دنباله را پیدا کن."
    },
    numbers: ["02", "04", "08", "16", "??"],
    answer: "32",
    hints: {
      en: [
        "Look carefully at how each number changes.",
        "Each number is multiplied by the same value.",
        "Multiply the last number by 2."
      ],
      fa: [
        "با دقت به تغییر هر عدد توجه کن.",
        "هر عدد در یک مقدار ثابت ضرب می‌شود.",
        "عدد آخر را در ۲ ضرب کن."
      ]
    }
  },
  {
    title: { en: "Double Trouble", fa: "چالش دوبرابر" },
    question: {
      en: "Find the missing number.",
      fa: "عدد گمشده را پیدا کن."
    },
    numbers: ["03", "06", "12", "24", "??"],
    answer: "48",
    hints: {
      en: [
        "The numbers follow a repeating mathematical rule.",
        "Each number is twice the previous one.",
        "Multiply 24 by 2."
      ],
      fa: [
        "اعداد از یک قانون ریاضی مشخص پیروی می‌کنند.",
        "هر عدد دو برابر عدد قبلی است.",
        "عدد ۲۴ را در ۲ ضرب کن."
      ]
    }
  },
  {
    title: { en: "Fibonacci Protocol", fa: "پروتکل فیبوناچی" },
    question: {
      en: "Find the next number.",
      fa: "عدد بعدی را پیدا کن."
    },
    numbers: ["01", "01", "02", "03", "05", "??"],
    answer: "8",
    hints: {
      en: [
        "Look at the relationship between neighboring numbers.",
        "Add the previous two numbers together.",
        "5 + 3 = ?"
      ],
      fa: [
        "به رابطه بین اعداد کنار هم دقت کن.",
        "دو عدد قبلی را با هم جمع کن.",
        "حاصل ۵ + ۳ چند می‌شود؟"
      ]
    }
  },
  {
    title: { en: "The Lost Country", fa: "کشور گمشده" },
    question: {
      en: "Decrypt the message and discover the hidden country.",
      fa: "پیام را رمزگشایی کن و کشور مخفی را پیدا کن."
    },
    numbers: ["L", "U", "D", "Q"],
    answer: "IRAN",
    hints: {
      en: [
        "This message is encoded using the English alphabet.",
        "The hidden message is the name of a country in the Middle East.",
        "Move each letter 3 places backward. For example, L becomes I."
      ],
      fa: [
        "این پیام با حروف الفبای انگلیسی رمزگذاری شده است.",
        "پیام مخفی، نام یک کشور در خاورمیانه است.",
        "هر چهار حرف را سه جایگاه به عقب برگردان. مثلاً L به I تبدیل می‌شود."
      ]
    }
  },
  {
    type: "investigation",
    title: { en: "The Last Access", fa: "آخرین ورود" },
    answer: "CARTER",
    hints: {
      en: [
        "Start by finding who entered the Control Room.",
        "Alex cannot be in the Archive or the Server Room.",
        "Carter entered later than Alex, and Carter could not access Control."
      ],
      fa: [
        "با پیدا کردن فردی که وارد اتاق کنترل شده شروع کن.",
        "الکس نمی‌توانسته وارد بایگانی یا اتاق سرور شده باشد.",
        "کارتر دیرتر از الکس وارد شده و اجازه ورود به اتاق کنترل را نداشته است."
      ]
    }
  }
];

const translations = {
  en: {
    select: "SELECT YOUR LANGUAGE",
    status: "● SYSTEM ONLINE",
    subtitle: "BREAK THE CODE. UNLOCK THE TRUTH.",
    mission: "MISSION",
    label: "ENTER ACCESS CODE",
    placeholder: "Your answer...",
    execute: "EXECUTE",
    waiting: "WAITING FOR INPUT...",
    hintTitle: "HINT SYSTEM",
    noHints: "No hints unlocked yet.",
    getHint: "GET A HINT",
    allHints: "ALL HINTS USED",
    score: "TOTAL SCORE: ",
    rankLabel: "HACKER RANK",
    progress: " / 400 XP",
    granted: "ACCESS GRANTED. +",
    points: " POINTS",
    denied: "ACCESS DENIED. TRY AGAIN.",
    next: "NEXT MISSION",
    completeTitle: "SYSTEM BREACHED",
    completeQuestion: "All missions completed. You have unlocked the system!",
    congratulations: "CONGRATULATIONS. YOU WON.",
    gameComplete: "GAME COMPLETE",
    ranks: ["ROOKIE", "CODE RUNNER", "CIPHER AGENT", "SYSTEM GHOST", "ELITE HACKER"],
    footer1: "ENCRYPTED CONNECTION",
    footer2: "© HACK THE SYSTEM"
  },

  fa: {
    select: "زبان خود را انتخاب کنید",
    status: "● سیستم آنلاین است",
    subtitle: "رمز را بشکن. حقیقت را کشف کن.",
    mission: "مأموریت",
    label: "کد دسترسی را وارد کن",
    placeholder: "پاسخ شما...",
    execute: "اجرا",
    waiting: "در انتظار پاسخ...",
    hintTitle: "سیستم راهنما",
    noHints: "هنوز راهنمایی دریافت نکرده‌ای.",
    getHint: "دریافت راهنما",
    allHints: "تمام راهنماها استفاده شدند",
    score: "امتیاز کل: ",
    rankLabel: "رتبه هکر",
    progress: " / 400 امتیاز",
    granted: "دسترسی تأیید شد. +",
    points: " امتیاز",
    denied: "دسترسی رد شد. دوباره تلاش کن.",
    next: "مأموریت بعدی",
    completeTitle: "سیستم هک شد",
    completeQuestion: "تمام مأموریت‌ها را کامل کردی. سیستم در اختیار توست!",
    congratulations: "تبریک! تو برنده شدی.",
    gameComplete: "پایان بازی",
    ranks: ["تازه‌کار", "کدنویس", "مأمور رمزگشایی", "شبح سیستم", "هکر حرفه‌ای"],
    footer1: "ارتباط رمزگذاری‌شده",
    footer2: "© HACK THE SYSTEM"
  }
};

let currentMission = 0;
let totalScore = 0;
let hintsUsed = 0;
let solved = false;

// اصلاح اول: انتخاب زبان در شروع بازی از نو انجام می‌شود.
let gameLanguage = "";

function t(key) {
  return translations[gameLanguage][key];
}

function chooseLanguage(language) {
  gameLanguage = language;
  localStorage.setItem("gameLanguage", language);

  document.getElementById("language-screen").style.display = "none";

  translateInterface();
  loadMission();
}

function translateInterface() {
  document.documentElement.lang = gameLanguage;

  document.querySelector(".language-content p").textContent = t("select");
  document.querySelector(".status").textContent = t("status");
  document.querySelector(".subtitle").textContent = t("subtitle");
  document.querySelector(".mission label").textContent = t("label");

  answer.placeholder = t("placeholder");

  document.getElementById("hint-title").textContent = t("hintTitle");
  document.getElementById("rank-label").textContent = t("rankLabel");

  document.querySelector(".bottom span:first-child").textContent = t("footer1");
  document.querySelector(".bottom span:last-child").textContent = t("footer2");

  question.dir = gameLanguage === "fa" ? "rtl" : "ltr";
  hintText.dir = gameLanguage === "fa" ? "rtl" : "ltr";
  feedback.dir = gameLanguage === "fa" ? "rtl" : "ltr";
  answer.dir = "ltr";
  sequence.dir = "ltr";
}

function updateRank() {
  let rankIndex = 0;

  if (totalScore >= 400) rankIndex = 4;
  else if (totalScore >= 300) rankIndex = 3;
  else if (totalScore >= 200) rankIndex = 2;
  else if (totalScore >= 100) rankIndex = 1;

  document.getElementById("rank").textContent = t("ranks")[rankIndex];

  document.getElementById("progress-bar").style.width =
    Math.min(totalScore / 400 * 100, 100) + "%";

  document.getElementById("progress-text").textContent =
    totalScore + t("progress");
}

function loadMission() {
  const mission = missions[currentMission];

  hintsUsed = 0;
  solved = false;

  hintText.textContent = t("noHints");
  hintButton.textContent = t("getHint");
  hintButton.disabled = false;

  scoreDisplay.textContent = t("score") + totalScore;
  updateRank();

  if (mission.type === "investigation") {
    missionElement.style.display = "none";
    investigationRoom.style.display = "block";

    renderInvestigation();
    return;
  }

  investigationRoom.style.display = "none";
  missionElement.style.display = "block";

  tag.textContent = t("mission") + " 0" + (currentMission + 1);

  title.textContent = mission.title[gameLanguage];
  question.textContent = mission.question[gameLanguage];

  sequence.innerHTML = mission.numbers
    .map(number =>
      `<span class="${number === "??" ? "unknown" : ""}">${number}</span>`
    )
    .join("");

  answer.value = "";
  answer.disabled = false;

  button.disabled = false;
  button.textContent = t("execute");

  feedback.textContent = t("waiting");
  feedback.style.color = "#00ff72";
}

function getHint() {
  if (solved || hintsUsed >= 3) return;

  const mission = missions[currentMission];

  hintText.textContent = mission.hints[gameLanguage][hintsUsed];

  hintsUsed++;

  if (hintsUsed === 3) {
    hintButton.textContent = t("allHints");
    hintButton.disabled = true;
  }
}

/* ============================= */
/* INVESTIGATION ROOM */
/* ============================= */

const suspects = [
  {
    name: "Alex",
    role: { en: "Security Officer", fa: "مسئول امنیت" }
  },
  {
    name: "Blake",
    role: { en: "Technician", fa: "تکنسین" }
  },
  {
    name: "Carter",
    role: { en: "Network Manager", fa: "مدیر شبکه" }
  },
  {
    name: "Dana",
    role: { en: "Archivist", fa: "مسئول بایگانی" }
  }
];

const clues = [
  {
    en: "The Archive was accessed exactly one hour before the Lab.",
    fa: "اتاق بایگانی دقیقاً یک ساعت قبل از آزمایشگاه مورد دسترسی قرار گرفته است."
  },
  {
    en: "Dana entered after the person who went to the Lab.",
    fa: "دانا بعد از فردی وارد شده که به آزمایشگاه رفته است."
  },
  {
    en: "Alex did not enter the Archive or the Server Room.",
    fa: "الکس وارد بایگانی یا اتاق سرور نشده است."
  },
  {
    en: "The Control Room was accessed at 00:00.",
    fa: "اتاق کنترل در ساعت ۰۰:۰۰ مورد دسترسی قرار گرفته است."
  },
  {
    en: "Blake entered before Carter.",
    fa: "بلیک زودتر از کارتر وارد ساختمان شده است."
  },
  {
    en: "Carter entered later than Alex.",
    fa: "کارتر دیرتر از الکس وارد ساختمان شده است."
  },
  {
    en: "Carter's access card could not open the Control Room.",
    fa: "کارت دسترسی کارتر امکان ورود به اتاق کنترل را نداشته است."
  }
];

const rooms = [
  { value: "Archive", en: "Archive", fa: "بایگانی" },
  { value: "Lab", en: "Lab", fa: "آزمایشگاه" },
  { value: "Server", en: "Server Room", fa: "اتاق سرور" },
  { value: "Control", en: "Control Room", fa: "اتاق کنترل" }
];

const times = ["21:00", "22:00", "23:00", "00:00"];

function renderInvestigation() {
  const fa = gameLanguage === "fa";

  document.querySelector("#tab-case h3").textContent =
    fa ? "شرح حادثه" : "THE INCIDENT";

  document.querySelector("#tab-case").innerHTML = `
    <h3>${fa ? "شرح حادثه" : "THE INCIDENT"}</h3>
    <p>${fa
      ? "ساعت ۰۰:۱۵، یک مرکز تحقیقاتی مخفی مورد نفوذ قرار گرفت. اطلاعات محرمانه‌ای از سرور اصلی به سرقت رفت."
      : "At 00:15, a secret research facility was hacked. Confidential information was stolen from the main server."
    }</p>
    <p>${fa
      ? "چهار مظنون به ساختمان دسترسی داشته‌اند. یکی از آن‌ها عامل نفوذ است."
      : "Four suspects had access to the building. One of them is the intruder."
    }</p>
    <p class="objective">${fa
      ? "هدف تو: فردی را که وارد اتاق سرور شده شناسایی کن."
      : "YOUR OBJECTIVE: IDENTIFY WHO ENTERED THE SERVER ROOM."
    }</p>
  `;

  document.querySelector("#tab-suspects h3").textContent =
    fa ? "پرونده مظنون‌ها" : "SUSPECT PROFILES";

  document.getElementById("suspect-list").innerHTML =
    suspects.map((suspect, index) => `
      <div class="suspect-card">
        <strong>${String(index + 1).padStart(2, "0")} // ${suspect.name}</strong>
        <p>${suspect.role[gameLanguage]}</p>
      </div>
    `).join("");

  document.querySelector("#tab-evidence h3").textContent =
    fa ? "مدارک و شواهد" : "EVIDENCE FILES";

  document.getElementById("evidence-list").innerHTML = `
    <p>${fa
      ? "برای مشاهده هر مدرک روی آن بزن:"
      : "Select a file to reveal its evidence:"
    }</p>
    <div class="evidence-progress" id="evidence-progress">
      ${fa ? "مدارک مشاهده‌شده: ۰ از ۷" : "FILES REVIEWED: 0 / 7"}
    </div>
    ${clues.map((clue, index) => `
      <div class="evidence-card">
        <button type="button" class="evidence-toggle" data-clue="${index}">
          ${fa ? "مدرک شماره " : "EVIDENCE FILE "}0${index + 1}
          <span>+</span>
        </button>
        <p class="evidence-detail" id="clue-${index}" hidden>
          ${clue[gameLanguage]}
        </p>
      </div>
    `).join("")}
  `;

  document.querySelector("#tab-deduction h3").textContent =
    fa ? "جدول استنتاج" : "DEDUCTION BOARD";

  document.getElementById("deduction-board").innerHTML = `
    <p>${fa
      ? "با استفاده از سرنخ‌ها، محل و زمان ورود هر مظنون را مشخص کن."
      : "Use the clues to determine where and when each suspect entered."
    }</p>

    <div class="deduction-table">
      ${suspects.map(suspect => `
        <div class="deduction-row">
          <strong>${suspect.name}</strong>

          <select aria-label="${suspect.name} ${fa ? "محل" : "room"}">
            <option value="">${fa ? "انتخاب محل" : "Select room"}</option>
            ${rooms.map(room => `
              <option value="${room.value}">${room[gameLanguage]}</option>
            `).join("")}
          </select>

          <select aria-label="${suspect.name} ${fa ? "زمان" : "time"}">
            <option value="">${fa ? "انتخاب زمان" : "Select time"}</option>
            ${times.map(time => `
              <option value="${time}">${time}</option>
            `).join("")}
          </select>
        </div>
      `).join("")}
    </div>

    <div class="final-answer">
      <h3>${fa ? "چه کسی وارد اتاق سرور شد؟" : "WHO ENTERED THE SERVER ROOM?"}</h3>

      <select id="final-suspect">
        <option value="">${fa ? "انتخاب مظنون" : "Select a suspect"}</option>
        ${suspects.map(suspect => `
          <option value="${suspect.name}">${suspect.name}</option>
        `).join("")}
      </select>

      <button id="case-submit" type="button">
        ${fa ? "ثبت پاسخ" : "SUBMIT ANSWER"}
      </button>

      <p id="case-feedback">
        ${fa ? "در انتظار نتیجه..." : "AWAITING YOUR DECISION..."}
      </p>
    </div>
  `;

  document.querySelectorAll(".case-tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".tab-content").forEach(content => {
    content.classList.remove("active");
  });

  document.querySelector('[data-tab="case"]').classList.add("active");
  document.getElementById("tab-case").classList.add("active");

  setupEvidence();
  setupCaseTabs();
  setupCaseSubmit();
}

function setupCaseTabs() {
  const tabs = document.querySelectorAll(".case-tab");
  const contents = document.querySelectorAll("#investigation-room .tab-content");

  tabs.forEach(tab => {
    tab.onclick = function() {
      const target = this.dataset.tab;

      tabs.forEach(item => item.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      this.classList.add("active");

      const selectedContent = document.getElementById("tab-" + target);

      if (selectedContent) {
        selectedContent.classList.add("active");
      }
    };
  });
}

function setupEvidence() {
  let reviewed = 0;
  const reviewedFiles = new Set();

  document.querySelectorAll(".evidence-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const index = Number(toggle.dataset.clue);
      const detail = document.getElementById("clue-" + index);

      detail.hidden = !detail.hidden;
      toggle.querySelector("span").textContent = detail.hidden ? "+" : "−";

      if (!reviewedFiles.has(index)) {
        reviewedFiles.add(index);
        reviewed++;

        const fa = gameLanguage === "fa";

        document.getElementById("evidence-progress").textContent =
          fa
            ? `مدارک مشاهده‌شده: ${reviewed} از ۷`
            : `FILES REVIEWED: ${reviewed} / 7`;
      }
    });
  });
}

function setupCaseSubmit() {
  const submit = document.getElementById("case-submit");

  submit.addEventListener("click", () => {
    const caseFeedback = document.getElementById("case-feedback");

    if (solved) {
      currentMission++;

      if (currentMission >= missions.length) {
        completeGame();
      } else {
        loadMission();
      }

      return;
    }

    const rows = document.querySelectorAll(".deduction-row");

    // بررسی پاسخ‌ها بر اساس نام مظنون
    const correctAnswers = {
      Alex: { room: "Lab", time: "22:00" },
      Blake: { room: "Archive", time: "21:00" },
      Carter: { room: "Server", time: "23:00" },
      Dana: { room: "Control", time: "00:00" }
    };

    for (const row of rows) {
      const name = row.querySelector("strong").textContent.trim();
      const selects = row.querySelectorAll("select");

      if (!selects[0].value || !selects[1].value) {
        caseFeedback.textContent =
          gameLanguage === "fa"
            ? "تمام محل‌ها و زمان‌ها را انتخاب کن."
            : "COMPLETE ALL ROOM AND TIME SELECTIONS.";
        return;
      }

      const expected = correctAnswers[name];

      if (
        !expected ||
        selects[0].value !== expected.room ||
        selects[1].value !== expected.time
      ) {
        caseFeedback.textContent =
          gameLanguage === "fa"
            ? "جدول استنتاج اشتباه است. دوباره سرنخ‌ها را بررسی کن."
            : "INCORRECT DEDUCTION. REVIEW THE EVIDENCE.";

        caseFeedback.style.color = "#ff4444";
        return;
      }
    }

    const selected = document.getElementById("final-suspect").value;

    if (!selected) {
      caseFeedback.textContent =
        gameLanguage === "fa"
          ? "مظنون نهایی را هم انتخاب کن."
          : "SELECT THE FINAL SUSPECT.";
      return;
    }

    if (selected === "Carter") {
      solved = true;

      const earnedPoints = 100 - hintsUsed * 20;
      totalScore += earnedPoints;

      caseFeedback.textContent =
        gameLanguage === "fa"
          ? `پرونده حل شد! +${earnedPoints} امتیاز`
          : `CASE SOLVED! +${earnedPoints} XP`;

      caseFeedback.style.color = "#00ff72";

      submit.textContent =
        gameLanguage === "fa" ? "مأموریت بعدی" : "NEXT MISSION";

      hintButton.disabled = true;
      updateRank();

      scoreDisplay.textContent = t("score") + totalScore;

    } else {
      caseFeedback.textContent =
        gameLanguage === "fa"
          ? "مظنون اشتباه است. دوباره بررسی کن."
          : "WRONG SUSPECT. TRY AGAIN.";

      caseFeedback.style.color = "#ff4444";
    }
  });
}

async function completeGame() {
  investigationRoom.style.display = "none";
  missionElement.style.display = "block";

  title.textContent = t("completeTitle");
  question.textContent = t("completeQuestion");

  sequence.innerHTML = "<span>ACCESS</span><span>GRANTED</span>";

  feedback.textContent = t("congratulations");

  button.textContent = t("gameComplete");
  button.disabled = true;

  answer.disabled = true;
  hintButton.disabled = true;

  updateRank();

  // SAVE SCORE TO SUPABASE
  feedback.textContent = "USER: " + (telegramUser ? telegramUser.id : "NOT FOUND");
  if (!telegramUser) {
    feedback.textContent += " | Telegram user not found.";
    return;
  }

  const { error } = await supabaseClient
    .from("omid_soldiers")
    .upsert(
      {
        telegram_id: String(telegramUser.id),
        username: telegramUser.username || "Anonymous",
        score: totalScore
      },
      {
        onConflict: "telegram_id",
        ignoreDuplicates: true
      }
    );

  if (error) {
  feedback.textContent += " | ERROR: " + error.message;
  console.error("SUPABASE ERROR:", error);
} else {
  feedback.textContent += " | Score submitted!";
}

function checkAnswer() {
  if (currentMission === 4) return;

  if (solved) {
    currentMission++;

    if (currentMission >= missions.length) {
      completeGame();
      return;
    }

    loadMission();
    return;
  }

  const value = answer.value.trim().toUpperCase();

  if (value === missions[currentMission].answer) {
    solved = true;

    const earnedPoints = 100 - hintsUsed * 20;
    totalScore += earnedPoints;

    feedback.textContent = t("granted") + earnedPoints + t("points");
    feedback.style.color = "#00ff72";

    scoreDisplay.textContent = t("score") + totalScore;

    updateRank();

    button.textContent = t("next");
    answer.disabled = true;
    hintButton.disabled = true;

  } else {
    feedback.textContent = t("denied");
    feedback.style.color = "#ff4444";
  }
}

/* ============================= */
/* EVENT LISTENERS */
/* ============================= */

button.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", getHint);

answer.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

/* ============================= */
/* START GAME */
/* ============================= */

// اصلاح دوم: همیشه ابتدا صفحه انتخاب زبان نمایش داده می‌شود.
document.getElementById("language-screen").style.display = "flex";

investigationRoom.style.display = "none";
missionElement.style.display = "block";

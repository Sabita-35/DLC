// Default language
let currentLang = "en";

async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const t = await response.json();

    const textMap = {
      siteTitle: t.siteTitle,
      tagline: t.tagline,
      navHome: t.navHome,
      navTutorials: t.navTutorials,
      navChat: t.navChat,
      navFeedback: t.navFeedback,
      tutorialsTitle: t.tutorialsTitle,
      waTitle: t?.tutorials?.whatsapp?.title,
      waDesc: t?.tutorials?.whatsapp?.desc,
      paytmTitle: t?.tutorials?.paytm?.title,
      paytmDesc: t?.tutorials?.paytm?.desc,
      mapsTitle: t?.tutorials?.maps?.title,
      mapsDesc: t?.tutorials?.maps?.desc,
      chatTitle: t.chatTitle,
      chatButton: t.chatButton,
      navFeedback: t.navFeedback,
      feedbackTitle: t.feedbackTitle,
      feedbackNameLabel: t.feedbackNameLabel,
      feedbackAgeLabel: t.feedbackAgeLabel,
      feedbackMsgLabel: t.feedbackMsgLabel,
      feedbackSubmitBtn: t.feedbackSubmitBtn,
      feedbackThanks: t.feedbackThanks,
    };

    for (let id in textMap) {
      const el = document.getElementById(id);
      if (el && textMap[id]) el.textContent = textMap[id];
    }

    // Update input placeholder (e.g., chatbot input)
    const input = document.getElementById("userInput");
    if (input && t.chatPlaceholder) {
      input.placeholder = t.chatPlaceholder;
    }
  } catch (err) {
    console.error("Language load error:", err);
  }
}

function setFontSize(size) {
  document.body.className = size;
}

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage(currentLang);
  document
    .querySelector("#languageSelector")
    .addEventListener("change", (e) => {
      currentLang = e.target.value;
      loadLanguage(currentLang);
    });
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const avatar = document.createElement("span");
  avatar.classList.add("avatar");
  avatar.innerHTML = sender === "user" ? "🧑" : "🤖";

  const content = document.createElement("div");
  content.classList.add("bubble");
  content.textContent = text;

  msg.appendChild(avatar);
  msg.appendChild(content);
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function simulateBotReply(input) {
  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage("bot", getBotReply(input));
  }, 900);
}

document.getElementById("themeSwitcher").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});

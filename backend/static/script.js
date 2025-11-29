 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const clearBtn = document.getElementById("clearBtn");
  const startBtn = document.getElementById("startChatBtn");
  const micBtn = document.getElementById("micBtn");

  // --- Chat Message Append ---
  function appendMessage(text, cls) {
    const elem = document.createElement("div");
    elem.className = `message ${cls}`;
    if (cls === "bot") {
      if (/<(p|ul|ol|li|br|h\d|div|table|blockquote)[^>]*>/i.test(text)) {
        elem.innerHTML = text;
      } else {
        elem.innerHTML = text.replace(/\n/g, "<br>");
      }
    } else {
      elem.innerText = text;
    }
    elem.setAttribute("role", "article");
    chatbox.appendChild(elem);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // --- Welcome message ---
  function showWelcome() {
    chatbox.innerHTML = "";
    appendMessage(
      "Lawyer: <p>Welcome! I am your Constitution Lawyer AI. How can I help you today?</p>",
      "bot"
    );
  }

  showWelcome();

  // --- Send message to backend ---
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendMessage("You: " + text, "user");
    input.value = "";

    const typing = document.createElement("div");
    typing.className = "message bot";
    typing.innerText = "Lawyer is typing…";
    chatbox.appendChild(typing);
    chatbox.scrollTop = chatbox.scrollHeight;

    const stateSelect = document.getElementById("stateSelect");
    const selectedState = stateSelect ? stateSelect.value : "India";

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          state: selectedState
        }),
      });

      const data = await res.json();
      typing.remove();
      appendMessage("Lawyer: " + (data.reply || "[No response]"), "bot");
    } catch (err) {
      typing.remove();
      appendMessage("⚠️ Error: Could not reach server. Try again.", "bot");
      console.error(err);
    }
  }

  // --- Event Bindings ---
  document.getElementById("sendBtn").addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  clearBtn.addEventListener("click", async () => {
    chatbox.innerHTML = "";
    input.value = "";
    await fetch("/clear", { method: "POST" });
    showWelcome();
  });

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      input.value = "Hey lawyer!";
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  // --- 🎤 Speech to Text Feature ---
  if (micBtn && "webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
      recognition.start();
      micBtn.innerText = "🎙️";
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      micBtn.innerText = "🎤";
    };

    recognition.onerror = () => {
      micBtn.innerText = "🎤";
    };
  } else if (micBtn) {
    micBtn.disabled = true;
  }

  // --- OCR Redirect Handling ---
  const ocrBtn = document.querySelector(".ocr-btn");
  if (ocrBtn) {
    ocrBtn.addEventListener("click", () => {
      window.location.href = "/ocr";
    });
  }
});

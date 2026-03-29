document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const chatPanel = document.getElementById("chatPanel");
  const closeFullscreenBtn = document.getElementById("closeChatFullscreen");

  let isFullscreen = false;
  let overlay = null;

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

  // --- Fullscreen Chat ---
  function openFullscreen() {
    if (isFullscreen) return;
    isFullscreen = true;

    // Create overlay
    overlay = document.createElement("div");
    overlay.className = "chat-fullscreen-overlay";
    overlay.id = "chatOverlay";
    document.body.appendChild(overlay);

    // Move chat panel into overlay
    overlay.appendChild(chatPanel);

    // Show close button
    closeFullscreenBtn.style.display = "flex";

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Activate with slight delay for animation
    requestAnimationFrame(() => {
      overlay.classList.add("active");
    });

    // Focus input
    setTimeout(() => input.focus(), 400);
  }

  function closeFullscreen() {
    if (!isFullscreen) return;

    overlay.classList.remove("active");

    setTimeout(() => {
      // Move chat panel back to its original section
      const chatLayout = document.querySelector(".chat-layout");
      if (chatLayout) {
        chatLayout.appendChild(chatPanel);
      }
      closeFullscreenBtn.style.display = "none";
      document.body.style.overflow = "";
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      overlay = null;
      isFullscreen = false;
    }, 350);
  }

  closeFullscreenBtn.addEventListener("click", closeFullscreen);

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isFullscreen) closeFullscreen();
  });

  // --- Send message to backend ---
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Open fullscreen on first send
    if (!isFullscreen) {
      openFullscreen();
    }

    appendMessage("" + text, "user");
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

  // --- OCR Redirect Handling ---
  const ocrBtn = document.querySelector(".ocr-btn");
  if (ocrBtn) {
    ocrBtn.addEventListener("click", () => {
      window.location.href = "/ocr";
    });
  }
});

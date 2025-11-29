document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const statusBadge = document.getElementById("connection-status");
    const statusText = document.getElementById("status-text");
    const micBtn = document.getElementById("mic-btn");
    const chatHistory = document.getElementById("chat-history");
    const visualizer = document.getElementById("visualizer");
    const welcomeMsg = document.querySelector(".welcome-message");

    // State
    let socket;
    let recognition;
    let isListening = false;
    let isSpeaking = false;
    let isConnected = false;

    // Check for Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        statusText.textContent = "Error: Speech Recognition API not supported in this browser.";
        statusBadge.textContent = "Error";
        statusBadge.classList.add("error");
        return;
    }

    // --- UI Helpers ---

    function setUiState(state) {
        // Reset classes
        micBtn.classList.remove("listening", "active");
        visualizer.classList.remove("active");

        switch (state) {
            case "CONNECTING":
                statusText.textContent = "Connecting to server...";
                statusBadge.className = "status-badge connecting";
                statusBadge.textContent = "Connecting";
                micBtn.disabled = true;
                break;
            case "READY":
                statusText.textContent = "Tap microphone to speak";
                statusBadge.className = "status-badge connected";
                statusBadge.textContent = "Online";
                micBtn.disabled = false;
                break;
            case "LISTENING":
                statusText.textContent = "Listening...";
                micBtn.classList.add("listening");
                visualizer.classList.add("active"); // Show visualizer
                break;
            case "THINKING":
                statusText.textContent = "Processing...";
                visualizer.classList.add("active"); // Keep visualizer for "thinking" effect
                break;
            case "SPEAKING":
                statusText.textContent = "AI is speaking...";
                visualizer.classList.add("active");
                break;
            case "DISCONNECTED":
                statusText.textContent = "Disconnected. Retrying...";
                statusBadge.className = "status-badge error";
                statusBadge.textContent = "Offline";
                micBtn.disabled = true;
                break;
        }
    }

    function addMessage(sender, text) {
        if (welcomeMsg) welcomeMsg.style.display = 'none';

        const msgDiv = document.createElement("div");
        msgDiv.classList.add("chat-message", sender);

        // Simple markdown cleanup for display
        // Bold: **text** -> <strong>text</strong>
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic: *text* -> <em>text</em>
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Newlines to <br>
        formattedText = formattedText.replace(/\n/g, '<br>');

        msgDiv.innerHTML = formattedText;
        chatHistory.appendChild(msgDiv);

        // Scroll to bottom
        const chatInterface = document.querySelector('.chat-interface');
        chatInterface.scrollTop = chatInterface.scrollHeight;
    }

    // --- Core Logic ---

    function connect() {
        setUiState("CONNECTING");
        socket = new WebSocket("ws://localhost:8000/ws");

        socket.onopen = () => {
            isConnected = true;
            setUiState("READY");
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "ai_response") {
                const rawText = message.text;
                // Clean text for speech (remove markdown symbols)
                const speechText = rawText.replace(/[*#_]/g, '');

                addMessage("ai", rawText);
                speakText(speechText);
            }
        };

        socket.onclose = () => {
            isConnected = false;
            setUiState("DISCONNECTED");
            stopListening();
            window.speechSynthesis.cancel();
            setTimeout(connect, 3000);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            socket.close();
        };
    }

    function setupRecognition() {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            isListening = true;
            setUiState("LISTENING");
        };

        recognition.onend = () => {
            isListening = false;
            if (!isSpeaking && isConnected) {
                setUiState("READY");
            }
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript && socket.readyState === WebSocket.OPEN) {
                addMessage("user", transcript);
                setUiState("THINKING");
                socket.send(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            isListening = false;
            setUiState("READY");
        };
    }

    function startListening() {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
        }
        try {
            recognition.start();
        } catch (e) {
            console.error("Recognition already started", e);
        }
    }

    function stopListening() {
        if (recognition) recognition.stop();
    }

    // Voice loading
    let voices = [];
    function loadVoices() {
        voices = window.speechSynthesis.getVoices();
    }
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    function speakText(text) {
        window.speechSynthesis.cancel(); // Stop any current speech
        isSpeaking = true;
        setUiState("SPEAKING");

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Voice selection logic
        if (voices.length === 0) loadVoices();

        // Try to find a good English voice
        const preferredVoice = voices.find(v =>
            (v.name.includes("Google US English") || v.name.includes("Samantha")) && v.lang.startsWith("en")
        ) || voices.find(v => v.lang.startsWith("en"));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log("Using voice:", preferredVoice.name);
        } else {
            console.log("Using default voice");
        }

        utterance.onend = () => {
            isSpeaking = false;
            setUiState("READY");
        };

        utterance.onerror = (e) => {
            console.error("TTS Error:", e);
            isSpeaking = false;
            setUiState("READY");
        };

        window.speechSynthesis.speak(utterance);

        // Chrome infinite speech workaround
        let r = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
                clearInterval(r);
            } else {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 14000);
    }

    // --- Event Listeners ---

    micBtn.addEventListener("click", () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    });

    // Initialize
    setupRecognition();
    connect();
});

document.addEventListener("DOMContentLoaded", () => {
    const statusDiv = document.getElementById("status");
    const startBtn = document.getElementById("start-btn");
    const recordBtn = document.getElementById("record-btn");
    const chatBox = document.getElementById("transcript");

    let socket;
    let conversationStarted = false;
    let mediaRecorder;
    let audioChunks = [];
    let mediaStream = null;
    let isRecording = false;

    function addMessageToChat(sender, text) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", sender);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function playAudioBase64(base64Audio) {
        return new Promise((resolve, reject) => {
            if (!base64Audio) {
                resolve();
                return;
            }
            const audio = new Audio("data:audio/mp3;base64," + base64Audio);
            audio.playbackRate = 1.3; // Speed up TTS playback
            audio.onended = () => resolve();
            audio.onerror = (e) => {
                console.error("Audio playback error:", e);
                resolve(); // Resolve anyway so flow continues
            };
            audio.play().catch(err => {
                console.error("Audio play() failed:", err);
                resolve();
            });
        });
    }

    function connect() {
        socket = new WebSocket("ws://localhost:8000/ws");

        socket.onopen = () => {
            statusDiv.textContent = "Ready to talk.";
            startBtn.disabled = false;
        };

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "greeting") {
                addMessageToChat("ai", `AI: ${message.text}`);
                statusDiv.textContent = "AI is speaking...";
                await playAudioBase64(message.audio);
                statusDiv.textContent = "Hold the button and speak...";

            } else if (message.type === "transcription") {
                // Show what the server recognized from the audio
                addMessageToChat("user", message.text);

            } else if (message.type === "ai_response") {
                addMessageToChat("ai", `AI: ${message.text}`);
                statusDiv.textContent = "AI is speaking...";
                await playAudioBase64(message.audio);
                if (conversationStarted) {
                    statusDiv.textContent = "Hold the button and speak...";
                }

            } else if (message.type === "error") {
                statusDiv.textContent = message.text;
                setTimeout(() => {
                    if (conversationStarted) {
                        statusDiv.textContent = "Hold the button and speak...";
                    }
                }, 2500);
            }
        };

        socket.onclose = () => {
            statusDiv.textContent = "Connection lost. Retrying...";
            stopRecording();
            setTimeout(connect, 3000);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            statusDiv.textContent = "Connection error.";
            stopRecording();
            socket.close();
        };
    }

    async function requestMicAccess() {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            return true;
        } catch (err) {
            console.error("Microphone access denied:", err);
            statusDiv.textContent = "Microphone access denied. Please allow microphone.";
            return false;
        }
    }

    function startRecording() {
        if (!mediaStream || isRecording) return;

        audioChunks = [];

        // Use a widely supported MIME type
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
                    ? 'audio/ogg;codecs=opus'
                    : MediaRecorder.isTypeSupported('audio/mp4')
                        ? 'audio/mp4'
                        : '';

        const options = mimeType ? { mimeType } : {};
        mediaRecorder = new MediaRecorder(mediaStream, options);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });

            if (audioBlob.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
                socket.send(audioBlob);
                statusDiv.textContent = "AI is thinking...";
            }
        };

        mediaRecorder.start();
        isRecording = true;
        recordBtn.classList.add("recording");
        recordBtn.textContent = "🎙️ Recording...";
        statusDiv.textContent = "Listening...";
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
        }
        isRecording = false;
        recordBtn.classList.remove("recording");
        recordBtn.textContent = "🎤 Hold to Talk";
    }

    function releaseMic() {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
    }

    // --- Hold to Talk button events (mouse + touch) ---
    recordBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        if (conversationStarted) startRecording();
    });
    recordBtn.addEventListener("mouseup", (e) => {
        e.preventDefault();
        if (isRecording) stopRecording();
    });
    recordBtn.addEventListener("mouseleave", (e) => {
        if (isRecording) stopRecording();
    });

    // Touch events for mobile
    recordBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (conversationStarted) startRecording();
    });
    recordBtn.addEventListener("touchend", (e) => {
        e.preventDefault();
        if (isRecording) stopRecording();
    });
    recordBtn.addEventListener("touchcancel", (e) => {
        if (isRecording) stopRecording();
    });

    // --- Start / End Conversation ---
    startBtn.addEventListener("click", async () => {
        if (!conversationStarted) {
            const micGranted = await requestMicAccess();
            if (!micGranted) return;

            conversationStarted = true;
            startBtn.textContent = "End Conversation";
            startBtn.classList.add("active");
            recordBtn.style.display = "flex";
            statusDiv.textContent = "Starting conversation...";

        } else {
            conversationStarted = false;
            startBtn.textContent = "Start Conversation";
            startBtn.classList.remove("active");
            recordBtn.style.display = "none";
            stopRecording();
            releaseMic();
            statusDiv.textContent = "Ready to talk.";
            chatBox.innerHTML = '';
        }
    });

    connect();
});

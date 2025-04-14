async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const userMessage = input.value;
  if (!userMessage.trim()) return;

  chatBox.innerHTML += `<div><b>You:</b> ${userMessage}</div>`;
  input.value = "";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Error in response.";
  chatBox.innerHTML += `<div><b>Tori:</b> ${reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

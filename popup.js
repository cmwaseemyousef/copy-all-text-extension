document.getElementById("copyBtn").addEventListener("click", async () => {
  // Get the current active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Inject and run copyAllText function in that tab
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: copyAllText,
  });

  // Update status text in popup
  document.getElementById("status").innerText = "✅ Text copied!";
});

function copyAllText() {
  // Get all text on the page
  let text = document.body.innerText;

  // Create a temporary textarea to copy text
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

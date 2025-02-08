document.getElementById("compareBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  // Inject content script to scrape page
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });

  // Send message to content script to start comparison
  chrome.tabs.sendMessage(tab.id, { action: "startComparison" }, (response) => {
    document.getElementById("status").textContent = 
      response?.success ? "Comparison started!" : "Error: No job data found";
  });
});

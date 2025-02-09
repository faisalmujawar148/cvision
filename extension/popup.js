// Inject the payload.js script into the current tab when the popup loads
window.addEventListener('load', function () {
  chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
      file: 'payload.js'
  });
});

// Listen for the job details message from payload.js and update popup UI
chrome.runtime.onMessage.addListener(function (message) {
  document.getElementById('jobTitle').innerText = message.jobTitle;
  document.getElementById('companyName').innerText = message.companyName;
  document.getElementById('jobDescription').innerText = message.jobDescription;
});

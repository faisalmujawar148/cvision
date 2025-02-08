document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['analysis'], (result) => {
    const analysisResult = document.getElementById('analysisResult');
    if (result.analysis) {
      analysisResult.textContent = result.analysis;
    } else {
      analysisResult.textContent = "No analysis found.";
    }
  });
});

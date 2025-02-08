let cvContent = "";

// Handle CV file upload
document.getElementById('cvUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    cvContent = e.target.result;
    document.getElementById('status').textContent = "CV loaded!";
  };

  if (file) {
    reader.readAsText(file); // For text-based formats
  }
});

// Handle "Start Comparing" button click
document.getElementById('compareBtn').addEventListener('click', async () => {
  if (!cvContent) {
    document.getElementById('status').textContent = "Upload CV first!";
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Scrape job description from the current page
  const jobDescription = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => document.body.innerText,
  });

  // Send data to the backend
  document.getElementById('status').textContent = "Analyzing...";

  try {
    const response = await fetch('http://localhost:8501/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cv_text: cvContent,
        job_description: jobDescription[0].result,
      }),
    });

    const result = await response.json();

    if (result.ai_analysis) {
      chrome.storage.local.set({ analysis: result.ai_analysis }, () => {
        document.getElementById('status').textContent = "Analysis complete!";
        // Open results page
        chrome.tabs.create({ url: chrome.runtime.getURL('results.html') });
      });
    } else {
      document.getElementById('status').textContent = "Error: No analysis found.";
    }
  } catch (error) {
    document.getElementById('status').textContent = "Connection failed";
    console.error(error);
  }
});

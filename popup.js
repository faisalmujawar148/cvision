// At the top of your file or before its first use:
const o = {}; // or assign it a proper value

document.getElementById('scrapeBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: 'scrapeJobDescription' }, async (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error scraping job:', chrome.runtime.lastError);
      return;
    }

    chrome.storage.local.set({ currentJob: response }, async () => {
      console.log('Job data saved:', response);

      // Fetch CV text
      const cvText = await getCVText();

      // Send to Python backend
      fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: response.description,
          cvText: cvText
        })
      }).then(res => res.json())
        .then(data => console.log('Analysis result:', data))
        .catch(err => console.error('Error sending job data:', err));
    });
  });
});


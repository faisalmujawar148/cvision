(function () {
    function getJobDetails() {
        // Adjust these selectors as needed for the target page
        let jobTitle = document.querySelector('h1')?.innerText || 'Job title not found';
        let companyName = document.querySelector('[class*="company"], [class*="employer"], [data-company-name]')?.innerText || 'Company not found';
        let jobDescription = document.querySelector('[class*="job-description"], [class*="description"], [id*="job-desc"], [id*="description"]')?.innerText || 'Description not found';

        return {
            jobTitle,
            companyName,
            jobDescription
        };
    }

    let jobDetails = getJobDetails();

    // Send extracted details to your Flask backend as JSON
    fetch("http://127.0.0.1:5000/receive_job", {  // Make sure the URL and port match your Flask app
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobDetails)
    })
    .then(response => response.json())
    .then(data => console.log("Response from backend:", data))
    .catch(error => console.error("Error sending data:", error));

    // Also send the details to popup.js so the extension popup can update its UI
    chrome.runtime.sendMessage(jobDetails);
})();

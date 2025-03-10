(function () {
    // Get the current page URL
    const currentURL = window.location.href;
    console.log("Sending request to:", "http://127.0.0.1:5000/scrape?url=" + currentURL);
    // Send the URL to your Flask backend scrape endpoint without encoding
    fetch("http://127.0.0.1:5000/scrape?url=" + currentURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Scraped data from backend:", data);
        
        // Process the scraped data
        let jobDetails = {
            jobTitle: "Not found",
            companyName: "Not found",
            jobDescription: "Not found"
        };
        
        // Try to extract relevant information from the scraped data
        if (data.job_titles && data.job_titles.length > 0) {
            jobDetails.jobTitle = data.job_titles[0];
        } else if (data.headings && data.headings.length > 0) {
            jobDetails.jobTitle = data.headings[0];
        }
        
        if (data.companies && data.companies.length > 0) {
            jobDetails.companyName = data.companies[0];
        }
        
        if (data.job_descriptions && data.job_descriptions.length > 0) {
            jobDetails.jobDescription = data.job_descriptions[0];
        } else if (data.paragraphs && data.paragraphs.length > 0) {
            // Combine paragraphs to form a job description
            jobDetails.jobDescription = data.paragraphs.join('\n\n');
        } else if (data.full_body) {
            jobDetails.jobDescription = data.full_body;
        }
        
        // Send the processed job details to popup.js
        chrome.runtime.sendMessage(jobDetails);
        
        // You can also send the processed data back to your Flask backend if needed
        return fetch("http://127.0.0.1:5000/receive_job", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobDetails)
        });
    })
    .then(response => response.json())
    .then(data => console.log("Response from receive_job endpoint:", data))
    .catch(error => console.error("Error in scraping process:", error));
})();

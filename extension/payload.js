




  // Example snippet from your payload.js

let jobDetails = {

    jobTitle: document.querySelector('h1')?.innerText || 'Job title not found',

    companyName: document.querySelector('[class*="company"]')?.innerText || 'Company not found',

    jobDescription: document.querySelector('[class*="job-description"]')?.innerText || 'Description not found'

};



fetch("http://127.0.0.1:5000/upload", {

    method: "POST",

    headers: {

        "Content-Type": "application/json"

    },

    body: JSON.stringify(jobDetails)

})

.then(response => response.json())

.then(data => {

    console.log("Response from backend:", data);

    // You can now display data.analysis in your popup if needed.

})

.catch(error => console.error("Error sending data:", error));



// Also, send the job details to your popup (if desired)

chrome.runtime.sendMessage(jobDetails);



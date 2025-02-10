// Inject payload.js into the current tab when the popup loads
window.addEventListener("load", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["payload.js"]
      }).catch(err => console.error("Injection failed:", err));
    });
  });
  
  // Listen for messages from payload.js and update the popup content
  chrome.runtime.onMessage.addListener(function (message) {
    console.log("Received message from backend:", message);
  
    if (message.status === "success" || message.analysis) {
      // Hide the job details and upload sections
      document.getElementById("jobSection").style.display = "none";
      document.getElementById("uploadSection").style.display = "none";
  
      // Format and display the response in the JSON section
      document.getElementById("jsonOutput").innerHTML = formatResponse(message);
      document.getElementById("jsonSection").style.display = "block";
  
      // Resize the popup after updating the content
      resizePopup();
    } else {
      // Populate job details normally
      document.getElementById("jobTitle").innerText = message.jobTitle || "N/A";
      document.getElementById("companyName").innerText = message.companyName || "N/A";
      document.getElementById("jobDescription").innerText = message.jobDescription || "N/A";
  
      // Save details globally for later use
      window.jobDetails = {
        jobTitle: message.jobTitle,
        companyName: message.companyName,
        jobDescription: message.jobDescription
      };
    }
  });
  
  // Helper function to generate pretty HTML from the response data
  function formatResponse(data) {
    let html = "";
  
    if (data.jobTitle) {
      html += `<h2>Job Title:</h2><p>${data.jobTitle}</p>`;
    }
    if (data.companyName) {
      html += `<h2>Company Name:</h2><p>${data.companyName}</p>`;
    }
    if (data.analysis) {
      html += `<h2>Analysis</h2>`;
      if (data.analysis.ai_analysis) {
        html += `<h3>AI Analysis:</h3><p>${data.analysis.ai_analysis}</p>`;
      }
      if (data.analysis.missing_keywords && data.analysis.missing_keywords.length > 0) {
        html += `<h3>Missing Keywords:</h3><ul>`;
        data.analysis.missing_keywords.forEach(keyword => {
          html += `<li>${keyword}</li>`;
        });
        html += `</ul>`;
      }
    } else {
      // Fallback: show the entire JSON prettily formatted
      html += `<h2>Response:</h2><pre>${JSON.stringify(data, null, 4)}</pre>`;
    }
    return html;
  }
  
  // Function to smoothly resize the popup by updating the body's height
  function resizePopup() {
    // Use a small delay to ensure content has rendered
    setTimeout(() => {
      const newHeight = document.body.scrollHeight;
      // Set the body's height; CSS transition will animate the change
      document.body.style.height = `${newHeight}px`;
    }, 150);
  }
  
  // File upload functionality
  document.addEventListener("DOMContentLoaded", function () {
    const uploadButton = document.getElementById("uploadButton");
    const resumeInput = document.getElementById("resumeUpload");
  
    uploadButton.addEventListener("click", function () {
      const file = resumeInput.files[0];
      if (!file) {
        alert("Please select a file.");
        return;
      }
  
      // Retrieve job details (or use defaults)
      const jobDetails = window.jobDetails || {
        jobTitle: document.getElementById("jobTitle").textContent,
        companyName: document.getElementById("companyName").textContent,
        jobDescription: document.getElementById("jobDescription").textContent
      };
  
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobTitle", jobDetails.jobTitle);
      formData.append("companyName", jobDetails.companyName);
      formData.append("jobDescription", jobDetails.jobDescription);
  
      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          alert("Upload successful!");
          console.log("Upload response:", data);
  
          // Hide job details and upload sections, then show the formatted response
          document.getElementById("jobSection").style.display = "none";
          document.getElementById("uploadSection").style.display = "none";
          document.getElementById("jsonSection").style.display = "block";
          document.getElementById("jsonOutput").innerHTML = formatResponse(data);
  
          // Resize the popup to fit the new content
          resizePopup();
        })
        .catch(error => {
          console.error("Error:", error);
          alert("Upload failed. Please check the console for details.");
        });
    });
  });
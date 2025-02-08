// Listen for the "startComparison" message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startComparison") {
    const jobData = scrapeJobData();
  }
});

// Function to scrape job data
function scrapeJobData() {
  // Define selectors for job title, company, and description
  const selectors = {
    description: ".main-description-section, .job-title, #title, .description__text, .top-card-layout__title ", // Common job title selectors
    company: ".company-name, .employer, .topcard__org-name-link", // Common company selectors
    title: ".job-description, #job-details, h1,.article__content__view__field__value, .article__content" // Common description selectors
  };

  // Scrape data using the selectors
  const jobData = {
    title: document.querySelector(selectors.title)?.innerText?.trim() || "N/A",
    company: document.querySelector(selectors.company)?.innerText?.trim() || "N/A",
    description: document.querySelector(selectors.description)?.innerText?.trim() || "N/A"
  };

  return jobData;
}

// Print scraped data to the console
const jobData = scrapeJobData();
console.log("Scraped Job Data:", jobData);

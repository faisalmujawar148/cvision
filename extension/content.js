
















// Listen for the "startComparison" message

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "startComparison") {

    const jobData = scrapeJobData();

    console.log("Scraped Job Data:", jobData);

    sendResponse(jobData); // Send the data back

  }

});



// Function to scrape job data

function scrapeJobData() {

  // Define selectors for job title, company, and description

  const selectors = {

    title: [

      "h1", 

      ".topcard__title", 

      ".job-title", 

      ".listing-title", 

      ".job-title-text",

      "#title"

    ],

    company: [

      ".topcard__org-name-link", 

      ".employer", 

      ".company-name", 

      ".tw-text-sm", 

      ".company"

    ],

    description: [

      ".description__text", 

      ".job-description", 

      "#job-details", 

      ".section__description",

      ".main-description-section",

      ".job-content",

      ".job-body",

      ".article__content",

      "*"

    ]

  };



  // Function to find text from multiple selectors

  function getText(selectors) {

    for (let selector of selectors) {

      let element = document.querySelector(selector);

      if (element) return element.innerText.trim();

    }

    return "Description not found";

  }



  // Scrape data using the selectors

  const jobData = {

    title: getText(selectors.title),

    company: getText(selectors.company),

    description: getText(selectors.description)

  };



  return jobData;

}



// Debugging: Print scraped data

const jobData = scrapeJobData();

console.log("Scraped Job Data:", jobData);

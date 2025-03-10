from flask import Flask, request, jsonify
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import time
import random

app = Flask(__name__)

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        # Initialize undetected_chromedriver for stealth browsing
        options = uc.ChromeOptions()
        options.headless = True  # Run headless
        driver = uc.Chrome(options=options)
        
        # Set a random delay to mimic human behavior
        time.sleep(random.uniform(2, 5))
        driver.get(url)
        
        # Wait for dynamic content to load
        time.sleep(random.uniform(3, 6))
        
        # Example: extract job titles by CSS selector (update as needed)
        job_titles = [elem.text for elem in driver.find_elements(By.CSS_SELECTOR, '.job-title')]
        
        driver.quit()
        return jsonify({"url": url, "job_titles": job_titles})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


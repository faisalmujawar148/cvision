import os
import re
import json
from io import BytesIO

import streamlit as st
import requests
import PyPDF2
from docx import Document
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST"], "allow_headers": ["Content-Type"]}})




# Folder to store uploaded resumes
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Use your Streamlit secrets to store the API key (ensure st.secrets is configured in your environment)
API_KEY = st.secrets["Mistral_AI_Key"]
API_URL = 'https://api.mistral.ai/v1/chat/completions'

def analyze_gaps(cv_text: str, job_description: str) -> dict:
    # First API prompt: Detailed Analysis
    analysis_prompt = f"""
        Analyze this resume against the job description, make sure pick out the job description from the random website div elements. Provide **only criticisms and actionable suggestions** in bullet points. Do not mention any positive aspects. Be extremely precise and concise. Follow these rules:
        
        1. **Focus on missing skills or experiences** directly related to the job description.
        2. **Highlight weak areas** in the resume (e.g., vague descriptions, lack of quantifiable results).
        3. **Suggest specific projects** to add or improve, tailored to the job requirements.
        4. **Target exact sentences** in the resume that need revision.
        5. **Word limit**: 100 words. Be direct and avoid fluff.
        
        Resume:
        {cv_text[:2000]}  
        
        Job Description:
        {job_description[:5000]}
        
        Format your response as:
        - **Missing Skills**: [specific skills missing]
        - **Weak Areas**: [exact sentences or sections to improve]
        - **Project Suggestions**: [specific projects to add or improve]
    """

    # Second API prompt: Extract Missing Keywords
    keyword_prompt = f"""
        Identify **keywords** from the job description that are **missing** in the resume. These should be:
        - Hard skills, technologies, or industry-specific terms.
        - Certifications or qualifications.
        - Important soft skills mentioned in the job description.
        
        Resume:
        {cv_text[:2000]}
        
        Job Description:
        {job_description[:2000]}
        
        Return the missing keywords **as a comma-separated list** without explanations. Example:
        Missing Keywords: [keyword1, keyword2, keyword3, ...]
    """

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    # First API Call: Detailed Analysis
    payload_analysis = {
        'model': 'open-mixtral-8x22b',
        'messages': [{'role': 'user', 'content': analysis_prompt}]
    }

    # Second API Call: Extract Missing Keywords
    payload_keywords = {
        'model': 'open-mixtral-8x22b',
        'messages': [{'role': 'user', 'content': keyword_prompt}]
    }

    try:
        # Call the API for detailed analysis
        response_analysis = requests.post(API_URL, headers=headers, data=json.dumps(payload_analysis))
        response_analysis.raise_for_status()
        analysis_result = response_analysis.json()
        ai_analysis = analysis_result['choices'][0]['message']['content']

        # Call the API for missing keywords
        response_keywords = requests.post(API_URL, headers=headers, data=json.dumps(payload_keywords))
        response_keywords.raise_for_status()
        keyword_result = response_keywords.json()
        missing_keywords = keyword_result['choices'][0]['message']['content']

        # Clean up the response to extract the keywords
        missing_keywords = missing_keywords.replace("Missing Keywords:", "").strip()
        missing_keywords_list = [keyword.strip() for keyword in missing_keywords.split(",") if keyword.strip()]

        return {
            "ai_analysis": ai_analysis,
            "missing_keywords": missing_keywords_list
        }

    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return {
            "ai_analysis": "Error during analysis.",
            "missing_keywords": []
        }

def parse_cv(file: BytesIO) -> str:
    """
    Parse the uploaded CV file (PDF, DOCX, or TXT) and return its text.
    """
    filename = file.name.lower()
    text = ""
    if filename.endswith('.pdf'):
        try:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        except Exception as e:
            print(f"Error reading PDF: {e}")
    elif filename.endswith('.docx'):
        try:
            doc = Document(file)
            text = "\n".join([para.text for para in doc.paragraphs])
        except Exception as e:
            print(f"Error reading DOCX: {e}")
    elif filename.endswith('.txt'):
        try:
            text = file.read().decode("utf-8")
        except Exception as e:
            print(f"Error reading TXT: {e}")
    else:
        print("Unsupported file format.")
    # Clean extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

@app.route("/upload", methods=["POST"])
def upload_file():
    # Check for the resume file
    if "resume" not in request.files:
        return jsonify({"error": "No resume file provided"}), 400

    file = request.files["resume"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Sanitize filename and save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Retrieve job details from form data (if provided)
    job_title = request.form.get("jobTitle", "Unknown")
    company_name = request.form.get("companyName", "Unknown")
    job_description = request.form.get("jobDescription", "")

    # Parse the resume to extract its text
    try:
        with open(file_path, "rb") as f:
            resume_text = parse_cv(f)
    except Exception as e:
        print(f"Error reading resume file: {e}")
        resume_text = "Error reading resume file."

    # If a job description was provided, perform analysis
    if job_description:
        analysis = analyze_gaps(resume_text, job_description)
        response_data = {
            "jobTitle": job_title,
            "companyName": company_name,
            "analysis": analysis
        }
    else:
        response_data = {
            "message": "File uploaded successfully, but no job description provided for analysis",
            "file_path": file_path
        }
    return jsonify(response_data)




from flask import Flask, request, jsonify
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
import time
import random

@app.route('/scrape', methods=['GET'])
def scrape_job():
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
        
        # Try to get specific job content first
        job_titles = [elem.text.strip() for elem in driver.find_elements(By.CSS_SELECTOR, '.job-title') if elem.text.strip()]
        job_descriptions = [elem.text.strip() for elem in driver.find_elements(By.CSS_SELECTOR, '.job-description') if elem.text.strip()]
        companies = [elem.text.strip() for elem in driver.find_elements(By.CSS_SELECTOR, '.company-name') if elem.text.strip()]
        
        # Check if we got enough content
        all_text_length = sum(len(text) for text in job_titles + job_descriptions + companies)
        
        # If not enough specific content found, extract all text from the page
        if all_text_length < 100:  # Arbitrary threshold - adjust as needed
            print("Insufficient specific content, scraping full page")
            
            # Get all text from body
            body_text = driver.find_element(By.TAG_NAME, 'body').text.strip()
            
            # Get all paragraphs (non-empty)
            paragraphs = [elem.text.strip() for elem in driver.find_elements(By.TAG_NAME, 'p') if elem.text.strip()]
            
            # Get all divs (non-empty)
            divs = [elem.text.strip() for elem in driver.find_elements(By.TAG_NAME, 'div') 
                   if elem.text.strip() and len(elem.text.strip()) > 20]  # Only get divs with substantial content
            
            # Get all headings (non-empty)
            headings = []
            for i in range(1, 7):
                headings.extend([elem.text.strip() for elem in driver.find_elements(By.TAG_NAME, f'h{i}') if elem.text.strip()])
            
            # Get all list items (non-empty)
            list_items = [elem.text.strip() for elem in driver.find_elements(By.TAG_NAME, 'li') if elem.text.strip()]
            
            # Clean up the data by removing duplicates
            # Remove duplicated content between divs and paragraphs
            unique_divs = []
            for div in divs:
                if not any(div in p for p in paragraphs) and not any(div in d for d in unique_divs):
                    unique_divs.append(div)
            
            # Process the raw content with AI model
            raw_content = "\n\n".join([
                f"PAGE TITLE: {driver.title}",
                "HEADINGS: " + "\n".join(headings) if headings else "",
                "PARAGRAPHS: " + "\n\n".join(paragraphs) if paragraphs else "",
                "LIST ITEMS: " + "\n- ".join(list_items) if list_items else "",
                "DIVS: " + "\n\n".join(unique_divs) if unique_divs else ""
            ])
            
            # Process with AI
            processed_content = process_with_ai(raw_content, url)
            
            driver.quit()
            return jsonify(processed_content)
        
        # If specific job content was found, format it
        job_data = {
            "job_title": job_titles[0] if job_titles else driver.title,
            "company_name": companies[0] if companies else "Unknown",
            "job_description": job_descriptions[0] if job_descriptions else "Not found"
        }
        
        # Process with AI
        processed_content = process_with_ai(json.dumps(job_data), url)
        print(processed_content)
        driver.quit()
        return jsonify(processed_content)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def process_with_ai(content, url):
    """
    Use the Mistral AI model to process and format the scraped content
    """
    formatting_prompt = f"""
    You are analyzing content from a job posting website. Extract and organize the following information from the scraped content:
    
    1. Job Title (be precise and professional)
    2. Company Name
    3. Job Description (clean and well-formatted)
    4. Required Skills (bullet list)
    5. Required Experience (years and type)
    6. Education Requirements
    7. Salary Range (if available)
    8. Job Location
    9. Employment Type (full-time, part-time, contract, etc.)
    
    Source URL: {url}
    
    Scraped Content:
    {content[:7000]}
    
    Format your response as a JSON object with these fields. Use null for any fields you cannot identify.
    """

    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = {
        'model': 'open-mixtral-8x22b',
        'messages': [{'role': 'user', 'content': formatting_prompt}]
    }

    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        result = response.json()
        formatted_content = result['choices'][0]['message']['content']
        
        # Try to parse the response as JSON
        try:
            formatted_json = json.loads(formatted_content)
            return formatted_json
        except json.JSONDecodeError:
            # If AI didn't return valid JSON, create a structured response
            return {
                "raw_ai_response": formatted_content,
                "url": url,
                "processed": False
            }
            
    except requests.exceptions.RequestException as e:
        print(f"AI processing failed: {e}")
        return {
            "error": "Failed to process with AI model",
            "url": url,
            "raw_content": content[:500] + "..." if len(content) > 500 else content
        }

if __name__ == '__main__':
    app.run(debug=True)

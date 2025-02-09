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
        Analyze this resume against the job description. Provide **only criticisms and actionable suggestions** in bullet points. Do not mention any positive aspects. Be extremely precise and concise. Follow these rules:
        
        1. **Focus on missing skills or experiences** directly related to the job description.
        2. **Highlight weak areas** in the resume (e.g., vague descriptions, lack of quantifiable results).
        3. **Suggest specific projects** to add or improve, tailored to the job requirements.
        4. **Target exact sentences** in the resume that need revision.
        5. **Word limit**: 100 words. Be direct and avoid fluff.
        
        Resume:
        {cv_text[:2000]}  
        
        Job Description:
        {job_description[:2000]}
        
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

if __name__ == '__main__':
    app.run(debug=True)


import streamlit as st
import os
import re
from io import BytesIO
from docx import Document
import PyPDF2
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
import requests
import json

# Replace 'your_api_key_here' with your actual Mistral API key
API_KEY = st.secrets["Mistral_AI_Key"]
API_URL = 'https://api.mistral.ai/v1/chat/completions'

def analyze_gaps(cv_text: str, job_description: str) -> dict:
    prompt = f"""
        Analyze this resume against the job description. Provide **only criticisms and actionable suggestions** in bullet points. Do not mention any positive aspects. Be extremely precise and concise. Follow these rules:
        
        1. **Focus on missing skills or experiences** directly related to the job description.
        2. **Highlight weak areas** in the resume (e.g., vague descriptions, lack of quantifiable results).
        3. **Suggest specific projects** to add or improve, tailored to the job requirements.
        4. **Target exact sentences** in the resume that need revision.
        5. **Word limit**: 100 words. Be direct and avoid fluff.
        
        Resume:
        {cv_text[:2000]}  # Truncate to avoid exceeding token limits
        
        Job Description:
        {job_description[:2000]}
        
        Format your response as:
        - **Missing Skills**: [specific skills missing]
        - **Weak Areas**: [exact sentences or sections to improve]
        - **Project Suggestions**: [specific projects to add or improve]
        """ 
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'model': 'open-mixtral-8x22b',  # Specify the model you want to use
        'messages': [
            {'role': 'user', 'content': prompt}
        ]
    }
    try:
        response = requests.post(API_URL, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        result = response.json()
        ai_analysis = result['choices'][0]['message']['content']
        return {"ai_analysis": ai_analysis, "missing_keywords": []}
    except requests.exceptions.RequestException as e:
        st.error(f"API request failed: {e}")
        return {"ai_analysis": "Error during analysis.", "missing_keywords": []}


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
            st.error(f"Error reading PDF: {e}")
    elif filename.endswith('.docx'):
        try:
            doc = Document(file)
            text = "\n".join([para.text for para in doc.paragraphs])
        except Exception as e:
            st.error(f"Error reading DOCX: {e}")
    elif filename.endswith('.txt'):
        try:
            text = file.read().decode("utf-8")
        except Exception as e:
            st.error(f"Error reading TXT: {e}")
    else:
        st.error("Unsupported file format.")

    # Clean extra whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_keywords(text: str) -> set:
    """
    Tokenize the text and remove common stopwords to extract a set of keywords.
    """
    tokens = re.findall(r'\b\w+\b', text.lower())
    keywords = {token for token in tokens if token.isalpha() and token not in ENGLISH_STOP_WORDS}
    return keywords

# def analyze_gaps(cv_text: str, job_description: str) -> dict:
#    """
#    Perform a simple gap analysis by comparing keywords and then use GPT-4 to provide recommendations.
#    """
#    # 1. Simple Keyword Extraction (without spaCy)
#    job_keywords = extract_keywords(job_description)
#    cv_keywords = extract_keywords(cv_text)
#    missing_keywords = list(job_keywords - cv_keywords)
#
#    # Limit to a handful of missing keywords for display
#    top_missing = missing_keywords[:10]
#
#    # 2. GPT-4 Analysis
#    prompt = f"""
#    Analyze this resume against the job description below. Provide specific, actionable recommendations:
#    
#    Resume:
#    {cv_text}
#    
#    Job Description:
#    {job_description}
#    
#    Format your response as:
#    - Missing Skills: [comma-separated list]
#    - Weak Areas: [bulleted list]
#    - Recommendations: [bulleted list]
#    """
#
#    try:
#        response = openai.ChatCompletion.create(
#            model="gpt-3",
#            messages=[{"role": "user", "content": prompt}],
#            temperature=0.7,
#            max_tokens=500
#        )
#        # Accessing the response using dictionary keys
#        ai_analysis = response["choices"][0]["message"]["content"]
#    except Exception as e:
#        ai_analysis = f"Error calling OpenAI API: {e}"
#
#    return {
#        "missing_keywords": top_missing,
#        "ai_analysis": ai_analysis
#    }

def main():
    st.title("AI-Powered Resume Optimization")
    st.markdown(
        "Upload your CV and paste a job description below to analyze gaps and get actionable recommendations."
    )

    st.sidebar.header("Upload Your CV")
    uploaded_file = st.sidebar.file_uploader("Choose a file (PDF, DOCX, TXT)", type=["pdf", "docx", "txt"])

    cv_text = ""
    if uploaded_file is not None:
        cv_text = parse_cv(uploaded_file)
        if cv_text:
            st.sidebar.success("CV successfully loaded!")
        else:
            st.sidebar.error("Failed to extract text from the CV.")

    job_description = st.text_area("Job Description", "Enter the job description here...", height=200)

    if st.button("Analyze"):
        if not cv_text:
            st.error("Please upload a CV file.")
        elif not job_description.strip():
            st.error("Please enter a job description.")
        else:
            with st.spinner("Analyzing..."):
                analysis = analyze_gaps(cv_text, job_description)

            st.subheader("Missing Keywords (from Job Description)")
            if analysis["missing_keywords"]:
                st.write(", ".join(analysis["missing_keywords"]))
            else:
                st.write("No significant missing keywords found!")

            st.subheader("GPT-4 Analysis & Recommendations")
            st.write(analysis["ai_analysis"])

if __name__ == "__main__":
    main()

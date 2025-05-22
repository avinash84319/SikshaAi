# Import necessary modules and packages
from flask import Flask, request, jsonify
import logging  # For logging errors
import requests  # For HTTP requests
from flask_cors import CORS, cross_origin  # For enabling CORS
import base64  # For encoding/decoding data
from helper.model import check_model  # For checking model readiness
from controllers import greet, materials, auth, sections, classes, students, tests,assignment  # Controller functions for routing
from database import create_db,  seed_fake_data, is_database_empty  
from helper.gcpUpload import check_bucket  # For checking GCP bucket readiness
from google.cloud import storage
from google.oauth2 import service_account

def check_bucket_func(bucket_name, service_account_path):
    credentials = service_account.Credentials.from_service_account_file(
        service_account_path
    )
    client = storage.Client(credentials=credentials)
    bucket = client.bucket(bucket_name)

    # Example check
    return bucket.exists()

# Initialize Flask app
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# -------------------------------
# Define Routes and Handlers
# -------------------------------

# ------------------------------- main flow -------------------------------

# Root and Hello World routes
app.add_url_rule('/', 'hellop', greet.hellop, methods=['GET'])  # Simple hello endpoint
app.add_url_rule('/api', 'hello', greet.hello, methods=['GET'])  # Another hello endpoint for API

# Authentication routes
app.add_url_rule('/auth/google', 'google_a', auth.google_a, methods=['POST'])  # Google auth via POST
app.add_url_rule("/auth/signup", "signup", auth.signup, methods=["POST"])
app.add_url_rule("/auth/signin", "signin", auth.signin, methods=["POST"])
app.add_url_rule('/auth/verify', 'verify', auth.verify, methods=['POST'])
app.add_url_rule('/api/profile', 'profile_a', auth.profile_a, methods=['GET'])  # Get user profile

# Materials related routes
app.add_url_rule('/api/pdfupload', 'pdfupload', materials.pdfupload, methods=['POST'])  # Upload PDF

# Section management routes
app.add_url_rule('/api/sectionUpload', 'sectionUpload', sections.sectionUpload, methods=['POST'])  # Upload section data

# Class management routes
app.add_url_rule('/api/createClass', 'createClass', classes.createClass, methods=['POST'])  # Create new class
app.add_url_rule('/api/addstudent', 'addstudent', classes.addstudent, methods=['GET'])  # Add student to class

# Student analytics routes
app.add_url_rule('/api/updateStudentAnalytics', 'update_analysis', students.update_analysis, methods=['POST'])  # Update student analytics
app.add_url_rule('/api/getStudentAnalytics', 'get_analysis', students.get_analysis, methods=['GET'])  # Get student analytics

# Test management routes
app.add_url_rule('/api/createTest', 'createTest', tests.createTest, methods=['POST'])  # Create new test
app.add_url_rule('/api/generateQuestions', 'generateQuestions', tests.generateQuestions, methods=['POST'])  # Generate test questions
app.add_url_rule('/api/getTestSectionsData', 'getTestSections', tests.getTestSections, methods=['GET'])  # Get test sections data
app.add_url_rule('/api/getTestQuestions', 'getTestQuestions', tests.getTestQuestions, methods=['GET'])  # Get test questions
app.add_url_rule('/api/getTestSingleQuestion', 'getTestSingleQuestion', tests.getTestSingleQuestion, methods=['GET'])  # Get single test question
app.add_url_rule('/api/submitQuestion', 'submitQuestion', tests.submitQuestion, methods=['POST'])  # Submit test question

# Class and Student retrieval routes
app.add_url_rule('/api/getTeachersClasses', 'classes_teacher', classes.classes_teacher, methods=['GET'])  # Get classes for teacher
app.add_url_rule('/api/getClassStudents', 'students_class', classes.students_class, methods=['GET'])  # Get students in a class
app.add_url_rule('/api/getAllStudents', 'students_all', students.students_all, methods=['GET'])  # Get all students

# ------------------------------- main flow -------------------------------

# ------------------------------- Screen Flows -------------------------------

#materials page
app.add_url_rule('/api/uploadMaterial', 'uploadMaterial', materials.uploadMaterial, methods=['POST'])  # Upload material

#assignments page
app.add_url_rule('/api/createAssignment', 'createAssignment', assignment.createAssignment, methods=['POST'])  # Create new assignment

#students page
app.add_url_rule('/api/getStudentwithtests', 'getStudentwithtests', students.getStudentwithtests, methods=['GET'])  # Get students with tests

#classes page
app.add_url_rule('/api/getClasseswithtests', 'classes_all', classes.classes_with_tests, methods=['GET'])  # Get classes with tests

#classes/materials page
app.add_url_rule('/api/getClassMaterials', 'materials_class', materials.materials_class, methods=['POST'])  # Get materials for class

# -------------------------------
# Server Initialization and Checks
# -------------------------------

if __name__ == '__main__':

    # 1. Check if the database tables are created
    result = create_db()
    if result is not True:
        logging.error(result)
        print("SERVER: " + result)

    # 2. Seed only if DB is empty
    if result is True:
        if is_database_empty():
            seed_fake_data()


    # 3. Check if the machine learning model is ready
    result = check_model()  
    if result is not True:
        logging.error(result)  

    # 4. Check if the Google Cloud Platform (GCP) bucket is ready
    bucket_exists = check_bucket_func("teacherstudent", "gkey.json")
    result = bucket_exists
    if result is not True:
        logging.error(result) 

    # 5. Start the Flask app in debug mode
    app.run(debug=True)

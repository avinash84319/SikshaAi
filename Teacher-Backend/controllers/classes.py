from database import create_student, creat_class, get_classes_teacher, get_students_class, get_classes_with_tests
import logging
from flask import request,jsonify

def createClass():
    try:
        data = request.get_json()

        class_name=data['class_name']
        user_id=data['user_id']
        description=data['description']

        # storing the class details in the database
        id=creat_class(user_id,class_name,description)

        if id is False:
            raise Exception("An error occurred while creating the class")

        return jsonify({"message": "Class created","id":id})

    except Exception as e:
        logging.error(e)
        return jsonify({"error": "An error occurred " + str(e)})

def addstudent():
    try:
        class_id=request.args.get('class_id')
        student_name=request.args.get('student_name')

        # storing the student details in the database
        id=create_student(student_name,class_id)

        if id is False:
            raise Exception("An error occurred while adding the student")

        return jsonify({"message": "Student added","id":id})

    except Exception as e:
        logging.error(e)
        return jsonify({"error": "An error occurred " + str(e)})


def classes_teacher():
    try:
        user_id = request.args.get('user_id')
        if user_id is None:
            return jsonify({"error": "user_id is required"}), 400
        classes = get_classes_teacher(user_id)

        return jsonify({"classes":classes})

    except Exception as e:
        logging.error(e)
        return jsonify({"error": "An error occurred " + str(e)}),500

def students_class():

    try:
        class_id = request.args.get('class_id')

        students = get_students_class(class_id)

        return jsonify({"students":students})

    except Exception as e:
        logging.error(e)
        return jsonify({"error": "An error occurred " + str(e)})

def classes_with_tests():

    try:
        classes = get_classes_with_tests()

        return jsonify({"classes":classes})

    except Exception as e:
        logging.error(e)
        return jsonify({"error": "An error occurred " + str(e)})
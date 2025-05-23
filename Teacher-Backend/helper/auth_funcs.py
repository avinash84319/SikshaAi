from flask import jsonify
import firebase_admin
from firebase_admin import credentials, auth
from database import get_user, add_user, get_user_by_email, add_password, get_password
import uuid
import bcrypt
import os
from dotenv import load_dotenv
import jwt
import datetime
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

# Initialize Firebase Admin SDK
cred = credentials.Certificate("teacher-auth.json")
firebase_admin.initialize_app(cred)


def google_auth(data):

    print("data",data)
    id_token = data['result']["_tokenResponse"]["idToken"]

    if not id_token:
        return jsonify({"error": "ID token is missing"}), 400

    try:
        decoded_token = auth.verify_id_token(id_token)
        print("decoded_token",decoded_token)
        name=decoded_token['name']
        email=decoded_token['email']
        picture=decoded_token['picture']
        user_id=decoded_token['uid']

        # Check if user exists in the database
        user = get_user(user_id)

        if not user:
            # Add user to the database
            add_user(user_id,name,email)


        # You can perform additional user verification or database operations here

        return jsonify({"user_id":user_id,"name": name, "email": email, "picture": picture,"token":id_token}), 200
    except Exception as e:
        print(f"Error verifying Google token: {e}")
        return jsonify({"error": e}), 401


def profile(auth_header):
    
    if not auth_header:
        return jsonify({"error": "Authorization header is missing"}), 400

    token = auth_header.split(' ')[1]

    try:
        decoded_token = auth.verify_id_token(token)
        name = decoded_token.get('name')
        email = decoded_token.get('email')
        picture = decoded_token.get('picture')

        return jsonify({"name": name, "email": email, "photoURL": picture}), 200
    except Exception as e:
        print(f"Error fetching user details: {e}")
        return jsonify({"error": "Unauthorized"}), 401


def signup(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "Missing fields"}), 400

    existing = get_user_by_email(email)
    if existing:
        return jsonify({"error": "User already exists"}), 409

    user_id = str(uuid.uuid4())
    hashed_pwd = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    try:
        add_user(user_id, name, email)
        add_password(user_id, hashed_pwd.decode("utf-8"))
        return jsonify({"message": "Signup successful", "user_id": user_id}), 201
    except Exception as e:
        print(e)
        return jsonify({"error": "Signup failed"}), 500


def signin(data):
    payload_email = data.get("email")
    payload_password = data.get("password")
    payload_user_type = data.get("user_type")

    if not all([payload_email, payload_password, payload_user_type]):
        return jsonify({"error": "Missing fields"}), 400
    
    user = get_user_by_email(payload_email)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    user_id = user[0]
    name = user[1]
    email = user[2]
    user_type = user[3]
    if(user_type != payload_user_type):
        return jsonify({"error": "Invalid credentials"}), 401
    stored = get_password(user_id)

    hashed_password = stored[0]
    if not bcrypt.checkpw(
        password=payload_password.encode("utf-8"),
        hashed_password=hashed_password.encode("utf-8"),
    ):
        return jsonify({"error": "Hi, Invalid credentials"}), 401

    # Generate JWT token
    payload = {
        "user_id": user_id,
        "email": email,
        "name": name,
        "user_type": user_type,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1),
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return jsonify(
        {
            "accessToken": token,
            "user_id": user_id,
            "name": name,
            "email": email,
            "user_type": user_type,
        }
    ), 200


def verify(data):
    token = data.get("accessToken")

    if not token:
        return jsonify({"error": "Token missing"}), 400

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({
            "valid": True,
            "user_id": decoded["user_id"],
            "name": decoded["name"],
            "email": decoded["email"],
            "user_type": decoded["user_type"],
        }), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

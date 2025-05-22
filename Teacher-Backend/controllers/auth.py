import logging
from flask import request,jsonify
from helper.auth_funcs import (
    google_auth,
    profile,
    signup as do_signup,
    signin as do_signin,
    verify as do_verify,
)

def google_a():
    data = request.json
    return google_auth(data)

def profile_a():
    auth_header = request.headers.get('Authorization')
    return profile(auth_header)


def signup():
    data = request.get_json()
    return do_signup(data)


def signin():
    data = request.get_json()
    return do_signin(data)

def verify():
    data = request.get_json()
    return do_verify(data)
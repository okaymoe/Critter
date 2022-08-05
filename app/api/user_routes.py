from flask import Blueprint, jsonify, request
from datetime import datetime
from flask_login import login_required, login_user
import profile
from app.models import User, db
from app.forms.signup_form import SignUpForm
from .utils import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    user = User.query.get(id)
    return user.to_dict()
    

@user_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=data['username'],
            name=data['name'],
            bio=data['bio'],
            profile_img=data['profile_img'],
            header_img=data['header_img'],
            email=data['email'],
            password=data['password'],
            birthday=datetime.now(),
            location=data['location'],
            joined=datetime.now()
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
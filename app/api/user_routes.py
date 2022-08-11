from flask import Blueprint, jsonify, request
from datetime import datetime
from flask_login import login_required, login_user
from app.models import User, db
from app.forms.signup_form import SignUpForm
from app.forms.profile_form import ProfileForm
from app.s3_helpers import allowed_file, get_unique_filename, upload_file_to_s3
from .utils import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('')
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

@user_routes.route('/edit/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    form = ProfileForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():

        if 'profile_img' in request.files:
            profile_img = request.files["profile_img"]

            if not allowed_file(profile_img.filename):
                return {"errors": "file type not permitted"}, 400

            profile_img.filename = get_unique_filename(profile_img.filename)

            upload = upload_file_to_s3(profile_img)

            if "url" not in upload:
                return upload, 400

            profile_img = upload['url']
        else:
            profile_img =user.profile_img


        if 'header_img' in request.files:
            header_img = request.files["header_img"]

            if not allowed_file(header_img.filename):
                return {"errors": "file type not permitted"}, 400

            header_img.filename = get_unique_filename(header_img.filename)

            upload = upload_file_to_s3(header_img)

            if "url" not in upload:
                return upload, 400

            header_img = upload['url']
        else:
            header_img =user.header_img


        user.username = data['username']
        user.email = data['email']
        user.header_img = header_img
        user.profile_img = profile_img
        user.name = data['name']
        user.bio = data['bio']
        user.location = data['location']
        user.birthday = data['birthday']
        user.joined = datetime.now()

        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
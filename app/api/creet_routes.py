from datetime import datetime
from distutils.command.upload import upload
from turtle import up
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Creet, db
from app.forms.creet_form import CreetForm
from app.aws_s3 import *
from .utils import validation_errors_to_error_messages

creet_routes = Blueprint('creets', __name__)

# Grab all creets - no specific query
@creet_routes.route('/')
def all_creets():
    creets = Creet.query.all()
    return {creet.id: creet.to_dict() for creet in creets}

# Get one creet
@creet_routes.route('/<int:creet_id>')
@login_required
def one_creet(creet_id):
    creet = Creet.query.get(creet_id)
    if creet:
        return creet.to_dict()
    else:
        return "Sorry, we can't find this Creet..."

# Creating a Creet
@creet_routes.route('/new', methods=['POST'])
@login_required
def create_creet():
    form = CreetForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if "image_url" in request.files:
            image_url = request.files["image_url"]
            image_url.filename = get_unique_filename(image_url.filename)

            upload = upload_file_to_s3(image_url)

            if "url" not in upload:
                return upload, 400

            image_url = upload["url"]

        else:
            image_url = None

        create_creet = Creet(
            user_id=current_user.to_dict()['id'],
            content=data['content'],
            image_url=image_url,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(create_creet)
        db.session.commit()
        return create_creet.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Updating a user Creet
@creet_routes.route('/edit/<int:creet_id>', methods=['PUT'])
@login_required
def update_creet(creet_id):
    creet = Creet.query.get(creet_id)
    form = CreetForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if "image_url" in request.files:
            image_url = request.files["image_url"]

            image_url.filename = get_unique_filename(image_url.filename)

            upload = upload_file_to_s3(image_url)

            if "url" not in upload:

                return upload, 400

            image_url = upload["url"]

        else:
            image_url = None

        creet.content = data['content']
        creet.image_url = image_url
        creet.created_at = datetime.now()
        creet.updated_at = datetime.now()

        db.session.commit()
        return creet.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Route deletes a creet for a user
@creet_routes.route('/<int:creet_id>', methods=['DELETE'])
@login_required
def delete_creet(creet_id):
    creet = Creet.query.get(creet_id)
    db.session.delete(creet)
    db.session.commit()
    return "creet has been deleted"

from flask_wtf import FlaskForm
from sqlalchemy import DateTime
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length, ValidationError, Email
from app.models import User


def e_mail_not_used(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('This email is already being used by a registered account.')


def username_unique(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already taken.')


class SignUpForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired("Name must be between 1 and 50 characters"), Length(min=1, max=50, message="Display name must be between 1 and 50 characters.")])
    username = StringField('Username', validators=[DataRequired("Username must be between 1 and 30 characters"), Length(min=1, max=15, message="Username must be between 1 and 15 characters"), username_unique])
    bio = StringField("Bio")
    profile_pic = StringField("Profile Picture")
    header_img = StringField("Header Photo")
    email = StringField('Email', validators=[DataRequired("Email must be between 1 and 255 characters"), e_mail_not_used, Email("Enter a valid email address")])
    hashed_password = StringField('Password', validators=[DataRequired("Password must be between 8 and 25 characters"), Length(min=7, max=30, message="Password must be between 7 and 30 characters")])
    header = StringField("Header Photo")
    birthday = DateField("Birthday")
    location = StringField("Location")
    joined = DateTime('Created At')

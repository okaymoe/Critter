from sqlalchemy import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length, ValidationError, Email
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class ProfileForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=1, max=15, message="Username must be between 1 and 15.")])
    email = StringField('Email', validators=[DataRequired(), Email()])
    header_img = StringField("Header Photo")
    name = StringField("Display Name", validators=[DataRequired(), Length(min=1, max=50, message="Display name must be between 1 and 50.")])
    bio = StringField("Bio", validators=[Length(max=160, message="Bio cannot be longer than 160 characters")])
    location = StringField("Location", validators=[Length(max=50, message="Bio cannot be longer than 50 characters")])
    birthday = DateField("Birthday")
    joined = DateTime('Joined')
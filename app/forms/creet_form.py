from sqlalchemy import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length

class CreetForm(FlaskForm):
    content = StringField("Creet", validators=[Length(max=280, message="Creet must be between 1 and 280 characters.")])
    created_at = DateTime('Created At')
    updated_at = DateTime('Updated At')

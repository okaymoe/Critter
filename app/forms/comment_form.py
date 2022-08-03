from sqlalchemy import DateTime
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    content = StringField("Comment", validators=[Length(max=280, message="Comment must be between 1 and 280 characters.")])
    creet_id = IntegerField("Creet Id")
    created_at = DateTime('Created At')
    updated_at = DateTime('Updated At')

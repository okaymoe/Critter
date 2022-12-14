"""empty message

Revision ID: 68edb88591e7
Revises: ffdc0a98111c
Create Date: 2022-08-02 12:10:27.128602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '68edb88591e7'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('creets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('content', sa.String(length=280), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('creet_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=280), nullable=False),
    sa.Column('image_url', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creet_id'], ['creets.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('name', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('bio', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('profile_img', sa.String(length=255), nullable=True))
    op.add_column('users', sa.Column('birthday', sa.String(length=35), nullable=True))
    op.add_column('users', sa.Column('location', sa.String(length=50), nullable=True))
    op.add_column('users', sa.Column('joined', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'joined')
    op.drop_column('users', 'location')
    op.drop_column('users', 'birthday')
    op.drop_column('users', 'profile_img')
    op.drop_column('users', 'bio')
    op.drop_column('users', 'name')
    op.drop_table('comments')
    op.drop_table('creets')
    # ### end Alembic commands ###

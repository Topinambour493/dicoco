"""first migration

Revision ID: 6fd69e9b02dd
Revises: 
Create Date: 2024-09-25 19:17:15.937833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6fd69e9b02dd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_of_syllables', sa.Integer(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('word', schema=None) as batch_op:
        batch_op.drop_column('number_of_syllables')

    # ### end Alembic commands ###

from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user_and_ride import User
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer
from alembic import op


# Adds a demo user, you can add other users here if you want
def seed_users():

    one = User(username='Demo', email='demo@aa.io',
                password='password', city='Denver',
                state="Colorado",
                level="Intermediate+")
    two = User(username='Demo2', email='demo2@aa.io',
                password='password', city='Colorado Springs',
                state="Colorado",
                level="Advanced")
    three = User(username='Demo3', email='demo3@aa.io',
                password='password', city='Buena Vista',
                state="Colorado",
                level="Advanced")
    four = User(username='Demo4', email='demo4@aa.io',
                password='password', city='Eagle',
                state="Colorado",
                level="Advanced+")

    db.session.add_all([one, two, three, four])


    users_committed_rides = table('users_committed_rides',
        column('userId', Integer),
        column('rideId', Integer),
    )

    following = table('followings',
        column('user_id', Integer),
        column('following_user_id', Integer),
    )

    op.bulk_insert(users_committed_rides,
    [
        {"userId": 1, "rideId": 1},
        {"userId": 1, "rideId": 2},
        {"userId": 2, "rideId": 3},
        {"userId": 2, "rideId": 4},
        {"userId": 3, "rideId": 2},
        {"userId": 3, "rideId": 4},
        {"userId": 4, "rideId": 1},
        {"userId": 4, "rideId": 2},
        {"userId": 4, "rideId": 3},
        {"userId": 4, "rideId": 4},
    ])

    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()

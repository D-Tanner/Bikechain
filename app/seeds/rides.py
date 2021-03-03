from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user_and_ride import Ride

# Adds a demo user, you can add other users here if you want
def seed_rides():

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

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_rides():
    db.session.execute('TRUNCATE rides;')
    db.session.commit()

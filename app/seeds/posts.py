from werkzeug.security import generate_password_hash
from app.models import db
from app.models import Post

# Adds a demo user, you can add other users here if you want
def seed_posts():

    one = Post(userId=1,
              rideId=1,
              content="So fun!",
              )

    two = Post(userId=2,
              rideId=1,
              content="Would totally do again!",
              )

    three = Post(userId=3,
              rideId=1,
              content="I'll bring knee pads next time",
              )

    four = Post(userId=4,
              rideId=2,
              content="Best easy ride!",
              )

    five = Post(userId=2,
              rideId=3,
              content="Would totally do again!",
              )

    six = Post(userId=3,
              rideId=3,
              content="I'll bring knee pads next time",
              )

    seven = Post(userId=4,
              rideId=4,
              content="Best easy ride!",
              )

    eight = Post(userId=1,
            rideId=3,
            content="So fun!",
      )

    db.session.add_all([one, two, three, four, five, six, seven, eight])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()

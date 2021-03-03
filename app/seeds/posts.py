from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user_and_ride import Ride
import datetime
# Adds a demo user, you can add other users here if you want
def seed_rides():

    one = User(userId=1,
              title="Get stoked!",
              content="riding very soon",
              startTime=datetime.datetime.utcnow,
              endTime=datetime.datetime.utcnow,
              latitude=39.739235,
              longitude=-104.990250,
              isLocal=True,
              level="Easy",
              )

    two = User(userId=2,
              title="Bring a helmet",
              content="riding very soon",
              startTime=datetime.datetime.utcnow,
              endTime=datetime.datetime.utcnow,
              latitude=38.833881,
              longitude=-104.821365,
              isLocal=False,
              level="Easy",
              )

    three = User(userId=3,
              title="Ever ridden in snow?",
              content="riding very soon",
              startTime=datetime.datetime.utcnow,
              endTime=datetime.datetime.utcnow,
              latitude=38.841770,
              longitude=-106.132561,
              isLocal=True,
              level="More Difficult",
              )

    four = User(userId=3,
              title="Get ready for drops",
              content="riding very soon",
              startTime=datetime.datetime.utcnow,
              endTime=datetime.datetime.utcnow,
              latitude=39.654251,
              longitude=-106.823601,
              isLocal=True,
              level="Extremely Difficult",
              )

    db.session.add_all([one, two, three, four])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_rides():
    db.session.execute('TRUNCATE rides;')
    db.session.commit()

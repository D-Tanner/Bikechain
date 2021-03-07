from werkzeug.security import generate_password_hash
from app.models import db
from app.models.user_and_ride import User, Ride
import datetime

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

    ride_one = Ride(userId=1,
              title="Get stoked!",
              content="riding very soon",
              date=datetime.datetime.now().strftime("%x"),
              latitude=39.739235,
              longitude=-104.990250,
              isLocal=True,
              level="Easy",
              )

    ride_two = Ride(userId=2,
              title="Bring a helmet",
              content="riding very soon",
              date=datetime.datetime.now().strftime("%x"),
              latitude=38.833881,
              longitude=-104.821365,
              isLocal=False,
              level="Easy",
              )

    ride_three = Ride(userId=3,
              title="Ever ridden in snow?",
              content="riding very soon",
              date=datetime.datetime.now().strftime("%x"),
              latitude=38.841770,
              longitude=-106.132561,
              isLocal=True,
              level="More Difficult",
              )

    ride_four = Ride(userId=3,
              title="Get ready for drops",
              content="riding very soon",
              date=datetime.datetime.now().strftime("%x"),
              latitude=39.654251,
              longitude=-106.823601,
              isLocal=True,
              level="Extremely Difficult",
              )


    db.session.add_all([one,
                        two,
                        three,
                        four,
                        ride_one,
                        ride_two,
                        ride_three,
                        ride_four
                        ])

    one.committed_rides.extend([ride_one, ride_two, ride_three])
    one.followers.extend([two, three])

    two.committed_rides.extend([ride_two, ride_three])
    two.followers.extend([three, four])

    three.committed_rides.extend([ride_two, ride_four, ride_one])
    three.followers.extend([one, four, two])

    four.committed_rides.extend([ride_two, ride_one])
    four.followers.extend([one, three, two])


    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute('TRUNCATE users_committed_rides;')
    db.session.execute('TRUNCATE follows;')
    db.session.commit()

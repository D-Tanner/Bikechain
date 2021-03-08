from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Ride, users_committed_rides

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    rides = Ride.query.filter(Ride.userId == id).all()
    rides_dict = [ride.to_dict() for ride in rides]
    # committed_rides = Ride.query.filter(Ride.committed_riders).all()
    committed_rides_dict = [ride.to_dict() for ride in user.committed_rides]
    return {"user": user.to_dict(), "rides": rides_dict, "committedRides": committed_rides_dict}
    # return {"user": user.to_dict(), "rides": rides_dict}

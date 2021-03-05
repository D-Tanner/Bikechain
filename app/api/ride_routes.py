from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.user_and_ride import Ride

ride_routes = Blueprint('rides', __name__)


@ride_routes.route('/')
def get_rides():
    rides = Ride.query.all()
    print("hello", rides)
    return {"Rides": [ride.to_dict() for ride in rides]}

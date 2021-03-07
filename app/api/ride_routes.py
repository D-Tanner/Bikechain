from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models.user_and_ride import Ride
from app.forms import CreateRide
from app.helpers import validation_errors_to_error_messages
ride_routes = Blueprint('rides', __name__)


@ride_routes.route('/')
def get_rides():
    rides = Ride.query.all()
    return {"Rides": [ride.to_dict() for ride in rides]}

@ride_routes.route('/new-ride', methods=["POST"])
def create_ride():
    form = CreateRide()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        ride = Ride()
        form.populate_obj(ride)
        db.session.add(project)
        db.session.commit()

        return project.to_dict()
    return {'errors':  validation_errors_to_error_messages(form.errors)}

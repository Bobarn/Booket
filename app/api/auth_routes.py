from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProfileEditForm
from flask_login import current_user, login_user, logout_user, login_required
from .AWS import get_unique_filename, upload_file_to_s3, remove_file_from_s3


auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = {
            "username": form.data['username'],
            "email": form.data['email'],
            "password": form.data['password'],
        }

        if form.about:
            user["about"] = form.about.data

        if form.data["profile_image"]:
            image = form.profile_image.data
            profileImageName = image.filename
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400
            else:
                user["profileImage"] = upload["url"]
                user["profileImageName"] = profileImageName

        if form.data["banner_image"]:
            ban_image = form.banner_image.data
            bannerImageName = ban_image.filename
            ban_image.filename = get_unique_filename(ban_image.filename)
            ban_upload = upload_file_to_s3(ban_image)

            if "url" not in ban_upload:
                return ban_upload, 400
            else:
                user["bannerImage"] = ban_upload["url"]
                user["bannerImageName"] = bannerImageName

        new_user = User(**user)
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return new_user.to_dict()
    return form.errors, 401

@auth_routes.route('/edit_profile', methods=['PUT'])
@login_required
def edit_profile():
    """
    Edits a user's profile
    """
    form = ProfileEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        if form.about.data:
            current_user["about"] = form.about.data

        if form.profile_image.data:
            remove_file_from_s3(current_user.profileImage)
            image = form.profile_image.data
            profileImageName = image.filename
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400
            else:
                current_user["profileImage"] = upload["url"]
                current_user["profileImageName"] = profileImageName

        if form.banner_image.data:
            remove_file_from_s3(current_user.bannerImage)
            ban_image = form.banner_image.data
            bannerImageName = ban_image.filename
            ban_image.filename = get_unique_filename(ban_image.filename)
            ban_upload = upload_file_to_s3(ban_image)

            if "url" not in ban_upload:
                return ban_upload, 400
            else:
                current_user["bannerImage"] = ban_upload["url"]
                current_user["bannerImageName"] = bannerImageName

        db.session.commit()
        return updated_user.to_dict()
    return form.errors, 401

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401

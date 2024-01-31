from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import PageForm, AnnotationForm
from app.models import db, Page, Annotation, User
from datetime import datetime
from .AWS import get_unique_filename, upload_file_to_s3, remove_file_from_s3


page_routes = Blueprint("pages", __name__)

# GET ALL PAGES
@page_routes.route('/all')
def get_all_pages():
    """
    Get all pages and return as a list of dicts
    """

    pages = Page.query.all()
    return {"Pages": [page.to_dict() for page in pages]}, 200

# GET SPECIFIC PAGE
@page_routes.route('/<int:id>')
def get_page(id):
    """
    Get a specific page by id
    """
    page = Page.query.get(id)
    return page.to_dict(), 200


# UPDATE Page (REVISE)
@page_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def revise_book(id):
    """
    Edit the page and return the newly edited page as a dictionary
    """

    page = Page.query.get(id)

    if page is None:
        return {'message': "Page not found"}, 404
    if current_user.id != page.user_id:
        return {'message': "You are not authorized for this action."}, 403

    form = PageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        page.title_name = form.page_name.data
        page.caption = form.caption.data

        remove_file_from_s3(page.image)

        image = form.image.data

        imageName =  image.filename

        image.filename = get_unique_filename(image.filename)

        newUpload = upload_file_to_s3(image)

        if "url" not in newUpload:
                return newUpload, 401

        page.image = newUpload["url"]
        page.imageName = imageName

        db.session.commit()

        return page.to_dict(), 201
    else:
        return {"errors": form.errors}, 400

# DELETE PAGE BY ID
@page_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_page(id):
    page = Page.query.get(id)
    if not page:
        return {"message": "Page not found"}, 404
    elif page.user_id != current_user.id:
        return {"message": "You are not authorized for this action"}, 403
    else:
        db.session.delete(page)
        db.session.commit()
        return {"message": "Page successfully deleted"}

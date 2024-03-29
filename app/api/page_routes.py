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

        page.page_name = form.page_name.data
        page.caption = form.caption.data

        if form.image.data:

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
        remove_file_from_s3(page.image)
        db.session.delete(page)
        db.session.commit()
        return {"message": "Page successfully deleted"}

# CREATE ANNOTATION FOR A POST
@page_routes.route('/<int:id>/annotations/new', methods=["POST"])
@login_required
def create_annotation(id):
    page = Page.query.get(id)
    if not page:
        return {"message": "Page not found"}, 404
    form = AnnotationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        annotation = Annotation (
            user_id = current_user.id,
            page_id = id,
            text = form.data["text"],
            createdAt = datetime.now()
        )

        db.session.add(annotation)
        db.session.commit()
        return annotation.to_dict()

@page_routes.route('/bookmarks')
@login_required
def get_bookmarks():

    return {"pages": [page.to_dict() for page in current_user.bookmarks]}, 200


@page_routes.route('/bookmarks/<int:id>', methods=["POST"])
def add_bookmark(id):
    page = Page.query.get(id)

    current_user.bookmarks.append(page)
    db.session.commit()

    return page.to_dict(), 201


@page_routes.route('/bookmarks/<int:id>', methods=['DELETE'])
@login_required
def remove_bookmark(id):

    page = Page.query.get(id)

    if not page:
        return {"error": "Page not found"}, 404

    current_user.bookmarks.remove(page)
    db.session.commit()

    return {"message": "Successfully removed bookmark"}, 201

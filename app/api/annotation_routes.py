from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Annotation
from app.forms import AnnotationForm

annotation_routes = Blueprint("annotations", __name__)

# GET ALL ANNOTATIONS
@annotation_routes.route('/')
def get_all_annotations():
    """
    Query for all annotations and return them in a list of dicts
    """

    annotations = Annotation.query.all()
    return {"annotations": [annotation.to_dict() for annotation in annotations]}, 200


# GET ANNOTATION BY ID
@annotation_routes.route('/<int:id>')
def get_annotation(id):
    """
    Query for an annotation by id and returns it in a dictionary
    """
    annotation = Annotation.query.get(id)
    return annotation.to_dict(), 200


# UPDATE AN ANNOTATION BY ID
@annotation_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_annotation(id):
    """
    Query for a annotation by id, then edit the annotation and return in a dict
    """
    annotation = Annotation.query.get(id)
    if not annotation:
        return {"message": "Annotation not found"}, 404

    elif annotation.user_id != current_user.id:
        return {"message": "Forbidden"}, 403

    else:
        form = AnnotationForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():

            annotation.text=form.data["text"]

        db.session.commit()
        return annotation.to_dict(), 201



# DELETE ANNOTATION BY ID
@annotation_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def erase_annotation(id):
    annotation = Annotation.query.get(id)
    if not annotation:
        return {"message": "Annotation not found"}, 404
    elif annotation.user_id != current_user.id:
        return {"message": "Forbidden"}, 403
    else:
        db.session.delete(annotation)
        db.session.commit()
        return {"message": "Annotation successfully deleted"}

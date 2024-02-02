from app.models import db, User, Annotation, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_annotations():


    annotation1 = Annotation(
        page_id = 10,
        user_id = 1,
        text = "Note to self: Take more pictures next time, Doofus!",
        createdAt = datetime.now()
    )

    annotation2 = Annotation(
        page_id = 9,
        user_id = 1,
        text = "Great work, looks like a solid foundation. Looking forward to seeing more from you soon.",
        createdAt = datetime.now()
    )

    annotation3 = Annotation(
        page_id = 1,
        user_id = 2,
        text = "Can't believe you're only NOW getting into cooking. Looks like you have major talent, can't wait for more!",
        createdAt = datetime.now()
    )

    annotation4 = Annotation(
        page_id = 2,
        user_id = 2,
        text = "Even this looks good, consider me a fan! Wow! Bookmarking this one!",
        createdAt = datetime.now()
    )

    annotation5 = Annotation(
        page_id = 3,
        user_id = 3,
        text = "Keep your chin up! We can fix it! I believe in you, your limiters are just removed now if anything!",
        createdAt = datetime.now()
    )

    annotation6 = Annotation(
        page_id = 4,
        user_id = 3,
        text = "WHAT DID I TELL YOU! It's like when Rock Lee took off his weights!",
        createdAt = datetime.now()
    )

    annotation7 = Annotation(
        page_id = 5,
        user_id = 3,
        text = "Ouch, looks painful. Can't fix that easily. You'll just have to build yourself back up slowly!",
        createdAt = datetime.now()
    )

    annotation8 = Annotation(
        page_id = 5,
        user_id = 2,
        text = "Feel better soon! It sounds awful but I'm sure you'll come back stronger and it was a strong lesson to learn!",
        createdAt = datetime.now()
    )

    annotation9 = Annotation(
        page_id = 6,
        user_id = 4,
        text = "Very brave of you, personally I don't think I could bring myself to go out there on a board without a suit of armor, I get it!",
        createdAt = datetime.now()
    )

    annotation10 = Annotation(
        page_id = 8,
        user_id = 3,
        text = "Slowly but surely, you're getting there for sure!",
        createdAt = datetime.now()
    )


    annotation11 = Annotation(
        page_id = 9,
        user_id = 4,
        text = "That's brilliant, excellent work. Nothing like nailing the basics.",
        createdAt = datetime.now()
    )


    annotation12 = Annotation(
        page_id = 7,
        user_id = 5,
        text = "What a lovely post. I will have to bake some for my neighbors and friends <3",
        createdAt = datetime.now()
    )

    annotation13 = Annotation(
        page_id = 7,
        user_id = 1,
        text = "LET'S GOOOOOOOOOOOO! I love cookies like these, now I gotta make some myself.",
        createdAt = datetime.now()
    )

    annotation14 = Annotation(
        page_id = 7,
        user_id = 6,
        text = "Thanks for always being such a light in the world.",
        createdAt = datetime.now()
    )

    annotation15 = Annotation(
        page_id = 1,
        user_id = 6,
        text = "DELISHHHHHHH. Man, I would get lost in there too!",
        createdAt = datetime.now()
    )


    annotation16 = Annotation(
        page_id = 4,
        user_id = 5,
        text = "Personally, I prefer the old ones BUT you def look good in either.",
        createdAt = datetime.now()
    )

    annotation17 = Annotation(
        page_id = 6,
        user_id = 2,
        text = "It will get better with time! I used to be scared on my board too, but you'll learn confidence soon!",
        createdAt = datetime.now()
    )

    annotation18 = Annotation(
        page_id = 7,
        user_id = 4,
        text = " Just couldn't agree more with you and everyone else, cookies like these are a MUST.",
        createdAt = datetime.now()
    )





    all_annotations = [annotation1, annotation2, annotation3, annotation4, annotation5, annotation6, annotation7, annotation8, annotation9, annotation10, annotation11, annotation12, annotation13, annotation14, annotation15, annotation16, annotation17, annotation18]
    db.session.add_all(all_annotations)
    db.session.commit()



def undo_annotations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.annotations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM annotations"))

    db.session.commit()

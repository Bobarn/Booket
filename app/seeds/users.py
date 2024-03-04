from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

usernames = ['AdventureSeeker', 'NatureLover23', 'BookwormDreamer', 'SunflowerSmiles']


about = [
    'Adventure enthusiast exploring the world one destination at a time. From scaling mountain peaks to diving into deep blue seas, I thrive on adrenaline and capturing moments that take your breath away. Life is an adventure, and I am here for the thrill!',
    'Tech guru by day, gaming legend by night. Whether I am coding the next big thing or defeating virtual foes, I am always in pursuit of innovation and fun. Join me on a journey through the digital realm, where every line of code tells a story.',
    "Savoring life's finest flavors and weaving tales with words. As a connoisseur of both literature and culinary arts, I believe in the magic of storytelling over a delicious meal. Join me for a literary feast where every page turned and every dish savored adds another layer to the story of life.",
    "I write tutorials! You might have seen some of my work!"
]

f = Faker(locale='en_US')
# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', about='I am the demo user! A way for you to peek into this site without signing up!')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', about='My name is Marnie! You might remember my name from Halloween Town! Different person though!')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', about='My friends call me The Builder. Ironically though, I have never touched a tool in my life.')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    newUsers = []

    for i in range(4):
        newUser = User(
            username=usernames[i],
            email=f.email(),
            password='password',
            about=about[i]
        )
        newUsers.append(newUser)
    db.session.add_all(newUsers)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

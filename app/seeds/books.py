from app.models import db, Book, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choices, randint

fake = Faker(locale='en_US')


def seed_books():

    book1 = Book(
        user_id=1,
        title="Cheffing on my own",
        category='Home',
        coverImage="https://media.istockphoto.com/id/1297236904/photo/handsome-young-man-tasting-sauce-with-a-mixing-spoon-in-a-kitchen.jpg?s=612x612&w=0&k=20&c=u2ovNjs9FnhRSLordO2a2GaVemYcrkyjmyK8nOa7JS8=",
        coverImageName="Tasting_Sauce.jpg",
        synopsis="Slowly but surely I am learning to cook, each recipe a new chapter and every bite another word on my page. I will surely get there someday",
        private=False,
        createdAt=fake.date_between(start_date='-1y', end_date="today")
    )

    book2 = Book(
        user_id=2,
        title="The Big Scramble",
        category='Outdoors',
        coverImage="https://gohikevirginia.com/wp-content/uploads/2020/11/White-Rock-Falls-Spur-Trail-Rock-Scramble.jpg",
        coverImageName="Rocking_around.jpg",
        synopsis="I go out, I conquer, this is the story of me going to the top and all the times I tumbled back down.",
        private=False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )


    book3 = Book(
        user_id = 3,
        title = "Indoor Warrior",
        category='Fitness',
        coverImage = "https://images.squarespace-cdn.com/content/v1/62df4bb2e773e77f68c22f0f/9b170720-a384-494f-a92b-396b0f03059c/First+Visit+Header.jpeg?format=2500w",
        coverImageName = "Grotto.jpeg",
        synopsis = "My journey has been a long one, starting from being too afraid to climb a ladder and now I freely climb upside down (with a mat). Watch my next little win and we'll see how high I can go.",
        private=False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )
    book4 = Book(
        user_id = 4,
        title = "Thank God for Helmets",
        category='Fitness',
        coverImage = "https://i.ytimg.com/vi/b9yL5usLFgY/maxresdefault.jpg",
        coverImageName="I_love_helmets.jpg",
        synopsis="Hit the ground hard then get back up again. That's the process, at least as long as you have your safety gear on like I do. (Please tell me you are too)",
        private=False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book5 = Book(
        user_id = 6,
        title = "The Joy of Baking",
        category='Home',
        coverImage = "https://m.media-amazon.com/images/I/81ReIFbO+TL._AC_UF1000,1000_QL80_.jpg",
        coverImageName="Joy_of_baking_book.jpg",
        synopsis="This book is one of those great classics. I want to share with you all some of my favorites as I delve into a yummy, cozy baking adventure.",
        private=False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book6 = Book(
        user_id = 5,
        title = "One Line at a Time",
        category='Tech',
        coverImage = "https://www.codecademy.com/resources/blog/wp-content/uploads/2022/12/What-is-collaborative-coding--1.png",
        coverImageName="coding_pink.png",
        synopsis = "Each line is one step closer to my goal. The goal post may always be moving but so am I, so I'll catch up one day. Just you wait. In the meantime, all of you can checkout how chasing the finish line has been going.",
        private=False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book7 = Book(
        user_id = 1,
        title = "Music Hall Memory Lane",
        category='Other',
        coverImage = "https://i0.wp.com/uwmpost.com/wp-content/uploads/2016/05/TribalSeeds2.jpg?ssl=1",
        coverImageName = "Reggae_SD.jpg",
        synopsis = "This is really just for me, it's kind of embarrassing but I'm just such a reggae music nerd sometimes. It doesn't really match the rest of my aesthetic tho so Imma keep this to me for now...",
        private=True,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book8 = Book(
        user_id = 7,
        title = "Navigating the Site",
        category = "Other",
        coverImage = "https://photobooket.s3.amazonaws.com/012a6453f1734cc883a78e051da50965.png",
        coverImageName = "Booket_Logo.png",
        synopsis = "Quick tutorial on how to navigate the site and the key elements to expect as a user!",
        private = True,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
        )
    # Fill the next series of books with information pertaining to the user's interests and hobbies with a private status of False and a user_id between 1 and 6
    book9 = Book(
        user_id = 6,
        title = "The Art of the Deal",
        category = "Other",
        coverImage = "https://yt3.googleusercontent.com/ytc/AIf8zZSi7oUZfmShaPxRy6j1WUh3Q6-M_O8tQzIwMfQl=s900-c-k-c0x00ffffff-no-rj",
        coverImageName = "Business_Book.jpg",
        synopsis = "I've been in the business world for a while now and I've learned a lot. I want to share my experiences and the lessons I've learned with you all.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book10 = Book(
        user_id = 3,
        title = "The Great Outdoors",
        category = "Outdoors",
        coverImage = "https://ctparks.com/sites/default/files/styles/social_media_1200x630/public/images/2023-05/Camping-Hero-SStock-BlackRockBackdrop.jpg?h=e8a8b91c&itok=uboRdiqk",
        coverImageName = "Camping_Guide.jpg",
        synopsis = "Camping is one of my favorite things to do. I've been to so many places and I want to share my experiences with you all. I hope you enjoy it as much as I do.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book11 = Book(
        user_id = 2,
        title = "The World of Fitness",
        category = "Fitness",
        coverImage = "https://d2rhgntcjgwkhf.cloudfront.net/organizations/66877/original_logo.gif?1680864735",
        coverImageName = "Fitness_Book.jpg",
        synopsis = "I've been a personal trainer for a while now and I've learned a lot. I want to share my experiences and the lessons I've learned with you all.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book12 = Book(
        user_id = 4,
        title = "The Art of Self Help",
        coverImage = "https://www.heart.org/-/media/Images/News/2022/September-2022/0912MHSelfCareChecklist_SC.jpg",
        coverImageName = "Self_Help.jpg",
        category = "Self-Improvement",
        synopsis = "Every day I try to make myself a better person. I've learned a lot and I want to share my experiences and the lessons I've learned with you all.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book13 = Book(
        user_id = 5,
        title = "The World of Tech",
        coverImage = "https://www.consultantsreview.com/newstransfer/upload/289jpXiaomi-VR.jpg",
        coverImageName = "VR_Cover.jpg",
        category = "Tech",
        synopsis = "Lately I have been engrossed in the world of VR. I have been having so much playing around and learning about it.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book14 = Book(
        user_id = 1,
        title = "Sobriety",
        coverImage = "https://domf5oio6qrcr.cloudfront.net/medialibrary/9780/GettyImages-1125383709.jpg",
        coverImageName = "Sobriety.jpg",
        category = "Self-Improvement",
        synopsis = "I have been sober for a year now after struggling with abuse problems of several different substances and I want to share my experiences and the lessons I've learned with you all.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book15 = Book(
        user_id = 3,
        title = "Keeping Myself Company",
        coverImage = "https://www.minimalismmadesimple.com/wp-content/uploads/2022/10/clean-out-your-house.png",
        coverImageName = "Minimalism.jpg",
        category = "Home",
        synopsis = "I have been trying to live a more minimalistic lifestyle and clean out all the things I don't need or use anymore.",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )

    book16 = Book(
        user_id = 4,
        title = "Fighting It Out",
        coverImage = "https://gray-wifr-prod.cdn.arcpublishing.com/resizer/v2/375T7VWUHBOV5P2YB7WDHSKVNU.jpg?auth=b842bb20f3ed3a80058569ef47e3d38a7048c8601e09ab681c4605627e8c5bb4&width=800&height=450&smart=true",
        coverImageName = "Boxing.jpg",
        category = "Fitness",
        synopsis = "I have been trying to get into boxing lately and I have been having so much fun learning and practicing. Come see how I have been doing!",
        private = False,
        createdAt = fake.date_between(start_date='-1y', end_date="today")
    )


    users = User.query.all()

    all_books = [book1, book2, book3, book4, book5, book6, book9, book10, book11, book12, book13, book14, book15, book16]

    for book in all_books:
        usersToAdd = list(set(choices(users, k=randint(1,5))))
        for user in usersToAdd:
            book.borrowing.append(user)

    db.session.add_all(all_books)
    db.session.add(book7)
    db.session.add(book8)
    db.session.commit()



def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()

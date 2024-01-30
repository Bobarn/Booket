from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from faker import Faker

fake = Faker()


def seed_pages():

    page1 = Page(
        user_id = 1,
        book_id = 1,
        page_name = "Lost in the Sauce",
        caption = "What can I say? I'm a sauce guy. I tried making myself a nice simple pasta today and I mayyyyyy have made myself sauce in excess. But ya know what, it tastes DARN good.",
        image = "https://images.halaal.recipes/05-09-17/2017-02-27-20-46-18-weSE7.jpg",
        imageName="SAUCE.jpg",
        createdAt = datetime.now()
    )

    page2 = Page(
        user_id = 1,
        book_id = 1,
        page_name = "Game Day Dip",
        caption = "Alright, today was game day so I didn't make anything too fancy but MAN did this hit the spot. Beans and cheese, a classic. I like to imagine this is the reason our team won.",
        image = "https://www.modernhoney.com/wp-content/uploads/2023/01/Bean-and-Cheese-Dip-13-scaled.jpg",
        imageName="Bean_Day.jpg",
        createdAt = datetime.now()
    )

    page3 = Page(
        user_id = 2,
        book_id = 2,
        page_name = "A Friend Lost",
        caption = "Tried out a local trail nearby. It was harder than I thought and I tore my best pants... But hey! That's just another memory. My wallet might be crying now, but later I'll laugh, right? Rest in Peach buddy ^^;",
        image = "https://www.shutterstock.com/image-photo/detailed-view-duct-tape-used-600nw-1975151426.jpg",
        imageName= "RIP_Pants.jpg",
        createdAt = datetime.now()
    )

    page4 = Page(
        user_id = 2,
        book_id = 2,
        page_name = "A Friend Gained",
        caption = "I got some new pants and, as much as I hate to say it, maybe my old ones were holding me back? Today I gelt stronger than ever (Plus I think they look pretty good)",
        image = "https://cdn.outsideonline.com/wp-content/uploads/2021/02/24/pants-big-butts-inline_h.jpg?width=800",
        imageName="Action_Pants.jpg",
        createdAt = datetime.now()
    )



    page5 = Page(
        user_id = 3,
        book_id = 3,
        page_name = "Learning the Dangers",
        caption = "Alright so admittedly I thought I was much stronger than I am so I mayyyy have been a little overzealous in my movements today and gotten a pulley injury ^^;",
        image = "https://movemend.info/wp-content/uploads/2022/09/MoveMend-Seattle-WA-Finger-Pulley-Injury.png",
        imageName="Pulley.png",
        createdAt = datetime.now()
    )


    page6 = Page(
        user_id = 4,
        book_id = 4,
        page_name = "Bubble Boy",
        caption = "I want to emphasize that I am just a VERY nervous and VERY cautious person. BUT today I really felt like the Michelin marshmallow-looking guy, I had wristguards, knee/elbow pads, and a (slightly oversized) helmet. ",
        image = "https://i5.walmartimages.com/asr/a95179cf-ef17-4905-aada-28b05bfac2ac.d34228d0d57413ecd4247216e51429bc.jpeg",
        imageName='WristArmor.jpeg',
        createdAt = datetime.now()
    )


    page7 = Page(
        user_id = 6,
        book_id = 5,
        page_name = "A Classic Treat",
        caption = "We're no stranger to these, and for good reason! There's little in this world better than a warm chocolate chip cookie and a fresh glass of milk.",
        image = "https://mojo.generalmills.com/api/public/content/3DtES9QUkU2MJMGzN0RZ2A_gmi_hi_res_jpeg.jpeg?v=86446c38&t=18b75f2ac6c640089422f4304a24a319",
        imageName= 'choc_chip_cookies.jpeg',
        createdAt = datetime.now()
    )

    page8 = Page(
        user_id = 3,
        book_id = 3,
        page_name = "Working It Through",
        caption = "Since the injury, I have been taking it nice and easy. I have learned a few techniques to get me extra warmed up before hitting the wall. Now I even do these warm ups when I'm out and about. This little mini bar thing helps so much, check it out!",
        image = "https://physivantage.com/cdn/shop/products/6030182_2048x.jpg?v=1670449112",
        imageName="mini_bar.jpg",
        createdAt = datetime.now()
    )

    page9 = Page(
        user_id = 5,
        book_id = 6,
        page_name = "Laying down the skeleton",
        caption = "There is a lot for me to learn but I found a few websites the other day that have really been helping me stay focused and on track with the basics. Keep on going! We all have to, so let's just do it!",
        image = "https://www.researchgate.net/publication/348480602/figure/fig3/AS:979962773393409@1610652740879/Good-coding-practice-Two-functionally-identical-codes-in-R-17-can-look-very-different.jpg",
        imageName="practice_code.jpg",
        createdAt = datetime.now()
    )


    page10 = Page(
        user_id = 5,
        book_id = 7,
        page_name = "Roots Concert",
        caption = "So excited for this upcoming concert. I gotta make sure I record, posting so I remember to mark down my thoughts.",
        image = "https://patch.com/img/cdn20/users/26276110/20231205/043958/img-1128___05163955653.jpg",
        imageName="Roots_SD_Poster.jpg",
        createdAt = datetime.now()
    )



    all_pages = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10]

    db.session.add_all(all_pages)

    db.session.commit()



def undo_pages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pages"))

    db.session.commit()

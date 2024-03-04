from app.models import db, Page, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import choices, randint
from faker import Faker

fake = Faker()


def seed_pages():

    page1 = Page(
        user_id = 1,
        book_id = 1,
        page_name = "Lost in the Sauce",
        page_number = 1,
        caption = "What can I say? I'm a sauce guy. I tried making myself a nice simple pasta today and I mayyyyyy have made myself sauce in excess. But ya know what, it tastes DARN good.",
        image = "https://images.halaal.recipes/05-09-17/2017-02-27-20-46-18-weSE7.jpg",
        imageName="SAUCE.jpg",
        createdAt = datetime.now()
    )

    page2 = Page(
        user_id = 1,
        book_id = 1,
        page_name = "Game Day Dip",
        page_number = 2,
        caption = "Alright, today was game day so I didn't make anything too fancy but MAN did this hit the spot. Beans and cheese, a classic. I like to imagine this is the reason our team won.",
        image = "https://www.modernhoney.com/wp-content/uploads/2023/01/Bean-and-Cheese-Dip-13-scaled.jpg",
        imageName="Bean_Day.jpg",
        createdAt = datetime.now()
    )

    page3 = Page(
        user_id = 2,
        book_id = 2,
        page_name = "A Friend Lost",
        page_number = 1,
        caption = "Tried out a local trail nearby. It was harder than I thought and I tore my best pants... But hey! That's just another memory. My wallet might be crying now, but later I'll laugh, right? Rest in Peach buddy ^^;",
        image = "https://www.shutterstock.com/image-photo/detailed-view-duct-tape-used-600nw-1975151426.jpg",
        imageName= "RIP_Pants.jpg",
        createdAt = datetime.now()
    )

    page4 = Page(
        user_id = 2,
        book_id = 2,
        page_name = "A Friend Gained",
        page_number = 2,
        caption = "I got some new pants and, as much as I hate to say it, maybe my old ones were holding me back? Today I gelt stronger than ever (Plus I think they look pretty good)",
        image = "https://cdn.outsideonline.com/wp-content/uploads/2021/02/24/pants-big-butts-inline_h.jpg?width=800",
        imageName="Action_Pants.jpg",
        createdAt = datetime.now()
    )



    page5 = Page(
        user_id = 3,
        book_id = 3,
        page_name = "Learning the Dangers",
        page_number = 1,
        caption = "Alright so admittedly I thought I was much stronger than I am so I mayyyy have been a little overzealous in my movements today and gotten a pulley injury ^^;",
        image = "https://movemend.info/wp-content/uploads/2022/09/MoveMend-Seattle-WA-Finger-Pulley-Injury.png",
        imageName="Pulley.png",
        createdAt = datetime.now()
    )


    page6 = Page(
        user_id = 4,
        book_id = 4,
        page_name = "Bubble Boy",
        page_number = 1,
        caption = "I want to emphasize that I am just a VERY nervous and VERY cautious person. BUT today I really felt like the Michelin marshmallow-looking guy, I had wristguards, knee/elbow pads, and a (slightly oversized) helmet. ",
        image = "https://i5.walmartimages.com/asr/a95179cf-ef17-4905-aada-28b05bfac2ac.d34228d0d57413ecd4247216e51429bc.jpeg",
        imageName='WristArmor.jpeg',
        createdAt = datetime.now()
    )


    page7 = Page(
        user_id = 6,
        book_id = 5,
        page_name = "A Classic Treat",
        page_number = 1,
        caption = "We're no stranger to these, and for good reason! There's little in this world better than a warm chocolate chip cookie and a fresh glass of milk.",
        image = "https://mojo.generalmills.com/api/public/content/3DtES9QUkU2MJMGzN0RZ2A_gmi_hi_res_jpeg.jpeg?v=86446c38&t=18b75f2ac6c640089422f4304a24a319",
        imageName= 'choc_chip_cookies.jpeg',
        createdAt = datetime.now()
    )

    page8 = Page(
        user_id = 3,
        book_id = 3,
        page_name = "Working It Through",
        page_number = 2,
        caption = "Since the injury, I have been taking it nice and easy. I have learned a few techniques to get me extra warmed up before hitting the wall. Now I even do these warm ups when I'm out and about. This little mini bar thing helps so much, check it out!",
        image = "https://physivantage.com/cdn/shop/products/6030182_2048x.jpg?v=1670449112",
        imageName="mini_bar.jpg",
        createdAt = datetime.now()
    )

    page9 = Page(
        user_id = 5,
        book_id = 6,
        page_name = "Laying down the skeleton",
        page_number = 1,
        caption = "There is a lot for me to learn but I found a few websites the other day that have really been helping me stay focused and on track with the basics. Keep on going! We all have to, so let's just do it!",
        image = "https://www.researchgate.net/publication/348480602/figure/fig3/AS:979962773393409@1610652740879/Good-coding-practice-Two-functionally-identical-codes-in-R-17-can-look-very-different.jpg",
        imageName="practice_code.jpg",
        createdAt = datetime.now()
    )


    page10 = Page(
        user_id = 1,
        book_id = 7,
        page_name = "Roots Concert",
        page_number = 1,
        caption = "So excited for this upcoming concert. I gotta make sure I record, posting so I remember to mark down my thoughts.",
        image = "https://patch.com/img/cdn20/users/26276110/20231205/043958/img-1128___05163955653.jpg",
        imageName="Roots_SD_Poster.jpg",
        createdAt = datetime.now()
    )

    page11 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "Looking for a Book",
        page_number = 2,
        caption = "Upon signing up you'll be brought to the home feed where you can find all books or browse by category. There are six categories 'Home', 'Fitness, 'Outdoors', 'Self-Improvement', 'Tech', and 'Other'. Additionally, hovering over books reveals additional information.",
        image= "https://cdn.discordapp.com/attachments/1187515837817557065/1204319755477975070/Screenshot_2024-02-05_225517.png?ex=65effcac&is=65dd87ac&hm=e4b8a0b3a40b1a4fc34a698a7bddb8f730e5cb6d405d9caae4b48da20b9f503c&",
        imageName="Landing_page.jpg",
        createdAt = datetime.now()
    )

    page12 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "Reading a book/Viewing a Page",
        page_number = 3,
        caption = "Once you have found a book you like, you can hover over it to reveal additional details. If you click the (1)synopsis, you get taken to the book's page, clicking the (2)author takes you to their page, and clicking the links in the (3)Table of Contents brings you to that page!",
        image = "https://cdn.discordapp.com/attachments/1187515837817557065/1204685625522126889/Navigating_Book.png?ex=65f1516b&is=65dedc6b&hm=a4e0f4694752368bad6720059a42a288f2e9f7d491016e12c4d81a884801568b&",
        imageName = "Book_View.jpg",
        createdAt = datetime.now()
    )

    page13 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "Managing Your Book",
        page_number = 4,
        caption = "While we're here let us also go over the options for your book. You can (1) edit your book by clicking on the blue pencil and paper icon on the book's tile, (2)burn your book and delete it by clicking the red fire icon, or (3)add a page to your book by clicking the green plus page icon.",
        image = "https://cdn.discordapp.com/attachments/1187515837817557065/1204685625287122974/Book_Options.png?ex=65f1516b&is=65dedc6b&hm=0a72430a6fba91957c71206adda2ed4b59ab2dda4ce32156bdcc22483c6d9e4a&",
        imageName = "Book_Options.jpg",
        createdAt = datetime.now()
    )

    page14 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "Viewing a Page",
        page_number = 1,
        caption = "When viewing a page, you can see the page's name and photo (left side) as well as the caption, and associated comments from yourself and other users(right side). You can navigate between pages in books by clicking the arrows pointing left and right on the pages",
        image = "https://cdn.discordapp.com/attachments/1187515837817557065/1204687488766058586/Screenshot_2024-02-06_231745.png?ex=65f15327&is=65dede27&hm=d750a4d13eb3b5cc23ecd2af470825da2535d18f54f788238f7822e5e32b5e88&",
        imageName = "Page_View.jpg",
        createdAt = datetime.now()
    )

    page15 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "Options on a Page",
        page_number = 5,
        caption = "You will also notice the option to (1)bookmark the viewed page. Bookmarking the page will save it on the 'Your Picks' page to view later. Additionally, if the page is yours, you can (2)tear out(delete) the page by clicking the scissors icon or (3)edit the page with the blue paper and pencil icon.",
        image = "https://cdn.discordapp.com/attachments/1187515837817557065/1204688700638760991/Page_View_Actions.png?ex=65f15448&is=65dedf48&hm=87ed2666abcbc8804c41150dc7d034277bc59c24a8bb58d198356da0791cbd7d&",
        imageName = "Page_Action.jpg",
        createdAt = datetime.now()
    )

    page16 = Page(
        user_id = 7,
        book_id = 8,
        page_name = "The Nav Bar",
        page_number = 6,
        caption = "Looking to the top of the screen you'll see a few options, (1)a button to visit your own page to view your books/pages and edit your profile, (2)a button to navigate to the form to make a new book, and (3)a user button to view a drop down to logout or view your saved books/pages.",
        image = "https://cdn.discordapp.com/attachments/1187515837817557065/1204690180905107497/Screenshot_2024-02-06_232728.png?ex=65f155a9&is=65dee0a9&hm=82393bd6bd844f2a476c113fb09e8c3271a1f6ac1dfa9e325c8b870907643bd1&",
        imageName = "Page_Action.jpg",
        createdAt = datetime.now()
    )

    page17 = Page(user_id=1, book_id=1, page_name="Gourmet Adventure", page_number=3, caption="Attempting to cook a gourmet meal: So far, my smoke alarm is an excellent cheerleader!", image="https://beeflovingtexans.com/wp-content/uploads/2022/04/burnt_ends_hero-thumb.jpg", imageName="Burnt_Recipe.jpg")

    page18 = Page(user_id=1, book_id=1, page_name="Cooking Experiment", page_number=4, caption="Tried a new recipe today. My kitchen looks like a crime scene, but at least the food is edible!", image="https://images.squarespace-cdn.com/content/v1/6014c67f05ed324961a0efd0/1632506259406-TKTSGKR0MB8VNFCC38LN/IMG_3536_jpg.jpeg", imageName="Messy_Recipe.jpeg")

    page19 = Page(user_id=6, book_id=9, page_name="Deal-Making Mastery", page_number=1, caption="Unlocking the secrets of successful business deals: Where negotiations feel more like a win-win dance.", image="https://foundersguide.com/wp-content/uploads/2018/05/pexels-photo-886465.jpeg", imageName="Deal Image 1")

    page20 = Page(user_id=6, book_id=9 , page_name="Strategies for Success", page_number=2, caption="In the world of business, a good deal is like a masterpiece - crafted with strategy, negotiation, and a touch of finesse.", image="https://www.aranca.com/assets/uploads/blogs/valution_banner.jpg", imageName="Deal Image 2")

    page21 = Page(user_id=3, book_id=10, page_name="Nature Retreat", page_number=1, caption="Embracing the great outdoors: Camping is not just a getaway; it's a reconnection with nature's wonders.", image="https://media.cntraveler.com/photos/5ef635b25a986932f31237d9/16:9/w_2560%2Cc_limit/CampingGear-2020-GettyImages-sb10070057l-001.jpg", imageName="Camping Image 1")

    page22 = Page(user_id=3, book_id=10, page_name="Under the Stars", page_number=2, caption="Camping nights - where the sky becomes a canvas and every campfire story feels like an epic adventure.", image="https://www.onetravel.com/going-places/wp-content/uploads/2020/10/camping-outdoors.jpg", imageName="Camping Image 2")

    page23 = Page(user_id=2, book_id=11, page_name="Fitness Foundations", page_number=1, caption="Becoming a personal trainer is more than lifting weights. It's about sculpting lives, one workout at a time.", image="https://dfstore.ie/wp-content/uploads/2019/08/inspirational-gym-quotes.jpg", imageName="Trainer Image 1")

    page24 = Page(user_id=2, book_id=11, page_name="Empowering Others", page_number=2, caption="In the world of personal training, motivation is the currency, and helping clients reach their fitness goals is the ultimate reward.", image="https://media.istockphoto.com/id/953476148/vector/finish-strong-inspiring-workout-and-fitness-gym-motivation-quote-illustration-sign-creative.jpg?s=612x612&w=0&k=20&c=84sRmqmJhgmR_hKA5kDhIax5kvO15CCyUgXe2hl-R6U=", imageName="Trainer Image 2")

    page25 = Page(user_id=4, book_id=12, page_name="The Path to Personal Growth", page_number=1, caption="Embarking on a journey of self-discovery: Unraveling the layers to reveal the empowered, authentic you.", image="https://www.rappler.com/tachyon/2021/10/rappler-blogs-shutterstock-self-help-books-sq.jpg", imageName="Self-Help Image 1")

    page26 = Page(user_id=4, book_id=12, page_name="Empower Your Mind", page_number=2, caption="In the realm of self-help, every challenge is an opportunity, and every setback is a stepping stone to a stronger, more resilient you.", image="https://www.insperity.com/wp-content/uploads/Selfcare_Leadership1200x630.png", imageName="Self-Help Image 2")

    page27 = Page(user_id=5, book_id=13, page_name="Virtual Adventures Await", page_number=1, caption="Step into the extraordinary world of virtual reality: Where reality blurs with imagination, and every adventure feels larger than life.", image="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/09/dragon-in-The-Elder-Scrolls-V-Skyrim-VR-girl-in-RUINSMAGUS-skeleton-monster-in-Legendary-Tales.jpg", imageName="VR Image 1")

    page28 = Page(user_id=5, book_id=13, page_name="Gaming in a New Dimension", page_number=2, caption="In the realm of virtual reality gaming, the only limit is your creativity. Immerse yourself in a world where pixels come to life.", image="https://zybervr.com/cdn/shop/articles/beat-saber-scoring-system.jpg?v=1692331211", imageName="VR Image 2")

    page29 = Page(user_id=1, book_id=14, page_name="A Sober Beginning", page_number=1, caption="Embarking on a journey of sobriety: It's not easy. I reward myself though with mocktails like these!", image="https://cleanfoodiecravings.com/wp-content/uploads/2022/07/Pomegranate-mocktails-11-scaled-1-768x1024.jpg", imageName="Sobriety Image 1")

    page30 = Page(user_id=1, book_id=14, page_name="Reclaiming Happiness", page_number=2, caption="In the world of sobriety, every day is a triumph. And that's a good thing for me since I did NOT triumph in basketball today.", image="https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg", imageName="Sobriety Image 2")

    page31 = Page(user_id=3, book_id=15, page_name="The Great Clutter Caper", page_number=1, caption="Embarking on a decluttering adventure: Where misplaced items play hide and seek, and winning means finding your favorite sock.", image="https://goodtobehomemag.com/wp-content/uploads/sites/5/2018/01/cleaning-tips-for-working-moms-intext1-910x683-1.jpeg", imageName="Cleaning Image 1")

    page32 = Page(user_id=3, book_id=15, page_name="Journey to the Land of Lost Keys", page_number=2, caption="In the world of house cleaning, every lost item has a secret society. Uncover the mysteries of the missing with laughter and a dustpan.", image="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2018_04/2305306/180125-better-cleaning-115a-rs.jpg", imageName="Cleaning Image 2")

    page33 = Page(user_id=4, book_id=16, page_name="Gloves and Glory", page_number=1, caption="Stepping into the ring: Where the heartbeat is the rhythm of the fight, and victory is the sweetest melody.", image="https://european-games.org/wp-content/uploads/2022/10/30657454202_f715da9e46_k.jpg", imageName="Boxing Image 1")

    page34 = Page(user_id=4, book_id=16, page_name="The Art of the Jab", page_number=2, caption="In the world of boxing, every jab is a brushstroke, and the canvas is the opponent. Paint your masterpiece with determination and skill.", image="https://www.aljazeera.com/wp-content/uploads/2023/12/2023-12-24T003620Z_2048767767_UP1EJCO01OIUH_RTRMADP_3_BOXING-HEAVYWEIGHT-JOSHUA-WALLIN-1703391885.jpg?resize=1800%2C1800", imageName="Boxing Image 2")

    page35 = Page(user_id=2, book_id=2, page_name="The Wacky Wanderer", page_number=3, caption="When the trail is as twisted as my sense of direction, and the compass is just a fancy paperweight.", image="https://img.redbull.com/images/q_auto,f_auto/redbullcom/2019/02/14/065a097d-c3b9-4784-86fc-e619315d4b19/ryan-sandes-scramble", imageName="Hiking Image 1")

    page36 = Page(user_id=2, book_id=2, page_name="Dance of the Lost Socks", page_number=4, caption="In the world of scramble-style hiking, every sock lost to the wilderness becomes a sacrifice to the sock gods. Cue the dramatic music and the search party!", image="https://images.squarespace-cdn.com/content/v1/531722ebe4b01396b755c991/1616060588818-Y1DBZSPJPSC1FGHSXCCN/John+Fleetwood+scrambling+02+1500px.jpg", imageName="Hiking Image 2")


    users = User.query.all()


    all_pages = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page17, page18, page19, page20, page21, page22, page23, page24, page25, page26, page27, page28, page29, page30, page31, page32, page33, page34, page35, page36]
    tutorial_pages = [page10, page14, page11, page12, page13, page15, page16]

    for page in all_pages:
        usersToAdd = list(set(choices(users, k=randint(1,5))))
        for user in usersToAdd:
            page.readers.append(user)

    db.session.add_all(all_pages)
    db.session.add_all(tutorial_pages)
    db.session.commit()



def undo_pages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pages"))

    db.session.commit()

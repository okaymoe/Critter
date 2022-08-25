from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demopuppy', 
        name="Demo Puppy", 
        bio='Just taking a sniff of this website...I like it!', 
        profile_img='https://pbs.twimg.com/profile_images/1552995729014247425/TaJbIdmK_400x400.jpg', 
        header_img='https://www.allandetrobert.com/wp-content/uploads/2017/09/header-pet-food.jpg', 
        email='demo@asa.io', 
        password='password', 
        birthday='1995-03-15', 
        joined='2019-03-17 12:12:22', 
        location='Las Vegas, NV')
    bobbie = User(
        username='bobbie', 
        name="bobbie boa", 
        bio='ssssssssssssssssssss', 
        profile_img='https://cdn.hpm.io/wp-content/uploads/2019/04/22120714/venomous-snake-pixabay.jpg', 
        header_img='https://64.media.tumblr.com/1ae7aa55c229f7e17df93a85f8589ea2/tumblr_pr4gt41bI21vxg6x3o2_1280.jpg', 
        email='bobbie@aa.io', 
        password='password', 
        birthday='1996-06-21', 
        joined='2018-10-02 12:12:22', 
        location='New York, NY')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

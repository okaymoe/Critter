from app.models import db, Creet

def seed_creets():
    creet1 = Creet(
        user_id=1,
        content="Testing...Woof Woof.",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet2 = Creet(
        user_id=2,
        content="Goodbye, World!",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet3 = Creet(
        user_id=3,
        content="This is going to be fun!",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet4 = Creet(
        user_id=2,
        content="Nevermind, I want to go home.",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet5 = Creet(
        user_id=1,
        content="Where do you go, my lovely?",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )

    db.session.add(creet1)
    db.session.add(creet2)
    db.session.add(creet3)
    db.session.add(creet4)
    db.session.add(creet5)


    db.session.commit()




def undo_creets():
    db.session.execute('TRUNCATE creets RESTART IDENTITY CASCADE;')
    db.session.commit()

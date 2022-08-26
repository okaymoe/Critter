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
        content="I'm hungry, when owner feed me?????????",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet3 = Creet(
        user_id=2,
        content="Wow so cool! Reminds me of another website!",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet4 = Creet(
        user_id=2,
        content="how 2 social media",
        created_at="2022-08-01 11:11:12",
        updated_at="2022-08-01 11:11:12"
    )
    creet5 = Creet(
        user_id=1,
        content="I love bones",
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

db.createrUser({
    user:'dev_mongosys',
    pwd:'bb1be0a5da0b16e730eeaeb764c1c3f7489590c924f167f5330ff4fb533241ebd',
    role:[
        {
            role:'userAdmin',
            db:'dev_Adquisiciones'
        },
        {
            role:'readWrite',
            db:'dev_Adquisiciones'
        },
        {
            role:'root',
            db:'admin'
        }
    ]
});
db=db.getSiblingDB('dev_Adquisiciones');
db.createCollection('dummy_collection');
db.dummy_collection.insertOne({'initialized':true});
Meteor.publish("chatrooms",function(){
    return ChatRooms.find({});
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});

Meteor.publish("chatMessages",function(){
    return ChatMsgs.find({},{
        sort : {
            publishedAt : -1
        }
    })
});

Meteor.startup(function () {
    console.log('url:', Avatar.getUrl());
    console.log('startup...');
    console.log('options:', Avatar.options);
    console.log('url:', Avatar.getUrl());
});

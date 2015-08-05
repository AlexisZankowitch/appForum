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
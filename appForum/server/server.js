Meteor.publish("chatrooms",function(){
    return ChatRooms.find({});
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});

Meteor.publish("usersChat",function(chatId){
    return ChatRooms.find({
        _id: this.chatRoomId
    }, {
        fields : {users :1}
    });
});

Meteor.publish("chatMessages",function(limit){
    if(limit > ChatMsgs.find().count()){
        limit=0;
    }
    return ChatMsgs.find({},{limit: limit});
});

Meteor.startup(function () {
    console.log('url:', Avatar.getUrl());
    console.log('startup...');
    console.log('options:', Avatar.options);
    console.log('url:', Avatar.getUrl());
});

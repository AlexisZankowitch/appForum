Template.searchUsers.events({
    'click .addUsersToChat' : function(e,t){
        var chatroom =  ChatRooms.find({
            _id : $('#chat-room-id').text()
        }).fetch();
        e.preventDefault();
        var data = {
            chatRoomId : chatroom[0]._id,
            userId : this._id,
            name : chatroom[0].name,
            pass : chatroom[0].password
        };
        Meteor.call('addUserToChat',data,function(err,t){
            if(t>0){
                var usr = Meteor.users.find({
                    _id : data.userId
                }).fetch();
                Meteor.call('sendEmail',
                    usr[0].emails[0].address,
                    "talkietalk@meteor.com",
                    'Hello from TalkieTalk!',
                    Blaze.toHTMLWithData(Template.chatemail,data));
                $("#list-users").mCustomScrollbar("destroy");
                $("#list-users").mCustomScrollbar();
            }
        });
    }
});

Template.searchUsers.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
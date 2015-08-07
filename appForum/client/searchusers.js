Template.searchUsers.events({
    'click .addUsersToChat' : function(e,t){
        console.log('aze');
        e.preventDefault();
        var data = {
            chatRoomId : $('#chat-room-id').text(),
            userId : this._id
        };
        Meteor.call('addUserToChat',data,function(){
            $("#list-users").mCustomScrollbar("destroy");
            $("#list-users").mCustomScrollbar();
        });

    }
});

Template.searchUsers.helpers({
    email: function(){
        return this.emails[0].address;
    }
});
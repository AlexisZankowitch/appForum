Template.searchUsers.events({
    'click .addUsersToChat' : function(e,t){
        e.preventDefault();
        var data = {
            chatRoomId : $('#chat-room-id').text(),
            userId : this._id
        }
        Meteor.call('addUserToChat',data);
    }
});
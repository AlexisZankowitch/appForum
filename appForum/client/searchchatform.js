Template.searchChatForm.events({
    'click .joinChat' : function(e,t){
        e.preventDefault();
        var chatRoomUsers = ChatRooms.find({
            _id :  this._id
        }).fetch();
        if(jQuery.inArray(Meteor.userId(),chatRoomUsers[0].users)>=0){
            console.log('/chatroom/'+this._id);
            Router.go('/chatroom/'+this._id);
        }else{
            $("#hideidchatroom").val(this._id);
            $('#joinchat-dialog').modal('toggle');
        }
    }
});
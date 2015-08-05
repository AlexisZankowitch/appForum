Template.searchChatForm.events({
    'click .joinChat' : function(e,t){
        e.preventDefault();
        var chatRoom = ChatRooms.find({
            _id :  this._id
        }).fetch();
        console.log(chatRoom.password);
        if(!chatRoom.password){
            var data = {
                chatRoomId : this._id,
                userId : Meteor.userId()
            };
            Meteor.call('addUserToChat',data);
            Router.go('/chatroom/'+this._id);
        }else{
            if(jQuery.inArray(Meteor.userId(),chatRoom[0].users)>=0){
                Router.go('/chatroom/'+this._id);
            }else{
                $("#hideidchatroom").val(this._id);
                $('#joinchat-dialog').modal('toggle');
            }
        }
    }
});
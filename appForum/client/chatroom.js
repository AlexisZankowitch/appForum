Template.chatroom.events({
    'submit #chat-form' : function(e,t){
        e.preventDefault();
        var data = {
            chatRoomId : this.chatRoomId,
            chatRoomMsg : t.find('#chat-input').value
        };
        Meteor.call('sendMsgToChat',data, function (err,t) {
            if(err){
                console.log(err);
            }else{
                console.log(t);
            }
        });
        $('#chat-input').val('');
    }
});
Template.chatroom.helpers({
    users : function(){
        var users = [];
        var res = ChatRooms.find({
            _id: this.chatRoomId
        }, {
            fields : {users :1}
        }).fetch();
        res[0].users.forEach(function(userid){
            console.log(userid);
            var user= Meteor.users.findOne({
                _id : userid
            });
            users.push(user);
        });
        return users;
    }
});

Template.chatroom.events({
    'submit #chat-form' : function(e,t){
        e.preventDefault();
        var chatBox = $('#chatBox');
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
        chatBox.mCustomScrollbar("update");
    },
    'focus #chat-input' : function(){
        var i=0;
        console.log(i++);
        var chatRoomId = this.chatRoomId;
        var chatBox = $('#chatBox');
        $(document).keypress(function(e) {
            if(!e.shiftKey){
                var chatInput = $('#chat-input');
                if(e.which == 13) {
                    var data = {
                        chatRoomId : chatRoomId,
                        chatRoomMsg : chatInput.val()
                    };
                    Meteor.call('sendMsgToChat',data, function (err,t) {
                        if(err){
                            console.log(err);
                        }
                    });
                    chatInput.val('');
                    chatBox.mCustomScrollbar("update");
                    chatBox.mCustomScrollbar("scrollTo",$('.mCSB_container').height());
                }
            }
        });
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
            var user= Meteor.users.findOne({
                _id : userid
            });
            users.push(user);
        });
        return users;
    }
});

Template.chatroom.onRendered(function () {
    var chatBox = $('#chatBox');
    chatBox.mCustomScrollbar({
        theme:"minimal"
    });
    chatBox.mCustomScrollbar("scrollTo",$('.mCSB_container').height());
});
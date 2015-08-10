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
    'click .kickuser' : function(e,t){
        e.preventDefault();
        var data = {
            chatRoomId : t.data.chatRoomId,
            userId : this._id
        };
        $("#list-users").mCustomScrollbar("destroy");
        Meteor.call('removeUserFromChat',data);
        $("#list-users").mCustomScrollbar();
    },
    'focus #chat-input' : function(){
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
                    chatBox.mCustomScrollbar("scrollTo",$('#chatBox .mCSB_container').height());
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
    $('.modal-backdrop ').fadeOut();
    var chatBox = $('#chatBox');
    chatBox.mCustomScrollbar({
        theme:"minimal"
    });
    $("#list-users").mCustomScrollbar({
       theme:"minimal-dark"
    });
    chatBox.mCustomScrollbar("scrollTo",chatBox.find('.mCSB_container').height());
});



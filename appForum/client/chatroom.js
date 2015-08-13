Template.chatroom.events({
    'submit #chat-form' : function(e,t){
        e.preventDefault();
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
    'click #chat-btn' :function(e,t){
        var chatInput = $('#chat-input');
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
                chatInput.val('');
                chatBox.mCustomScrollbar("scrollTo",$('#scrool').position().top+$('#scrool').height());
            }
        });
    },
    'focus #chat-input' : function(){
        var chatRoomId = this.chatRoomId;
        var chatInput = $('#chat-input');
        var chatBox = $('#chatBox');
        $(document).keypress(function(e) {
            if(!e.shiftKey){
                if(e.which == 13) {
                    var data = {
                        chatRoomId : chatRoomId,
                        chatRoomMsg : chatInput.val()
                    };
                    Meteor.call('sendMsgToChat',data, function (err,t) {
                        if(err){
                            console.log(err);
                        }else{
                            chatInput.val('');
                            chatBox.mCustomScrollbar("scrollTo",$('#scrool').position().top+$('#scrool').height());
                        }
                    });

                }
            }
        });
    },
    'click #show-users' : function(e,t){
        e.preventDefault();
        var div = $("#chatUsers");
        if(!div.attr('style') || div.attr('style')==="left: -100%;"){
            div.stop().animate({
                "left" : "0%"
            },"ease-in");
        }else{
            div.stop().animate({
                "left" : "-100%"
            },"ease-in");
        }
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
    if(Session.equals('limit',20)){
        chatBox.mCustomScrollbar("scrollTo",$('#scrool').position().top+$('#scrool').height());
    }
});

incrementLimit = function(inc,callback){
    inc = (!inc)?20:inc;
    newLimit = Session.get('limit') + inc;
    Session.set('limit',newLimit);
};


Template.chatroom.events({
    'click #delChat' : function(e,t){
        e.preventDefault();
        var data = {
            chatRoomId : this.chatRoomId
        };
        Meteor.call('deleteChatRoom',data,function(err){
            if(err){
                if(err.error==="OK-Confirmation"){
                    Session.set(this.chatRoomId,true);
                    $("#deleteButton").hide();
                    var data = {
                        txt : err.reason
                    };
                    Blaze.renderWithData(Template.alert,data,t.$('.displayAlert').get(0));
                    $('.alert').slideDown();
                }
            }
        });
    },
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
            }
        });
    },
    'keyup #chat-input' : function(e){
        Session.set('blur',false);
        //enable scrool
        Session.set('scroll',true);
        var chatRoomId = this.chatRoomId;
        var chatInput = $('#chat-input');
        var chatBox = $('#chatBox');
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
                    }
                });

            }
        }
    },
    'blur #chat-input': function(e,t){
        Session.set('sendMsg',true);
        Session.set('blur',true);
        $('.list-chat-item:last-child').attr('id','last-seen');
    },
    'focus #chat-input': function(e,t){
        if(Session.get('title')!=""){
            var title = $('title');
            title.text(Session.get('title'));
        }
    },
    'click #show-users' : function(e,t){
        e.preventDefault();
        var div = $("#chatUsers");
        if(!div.attr('style') || div.attr('style')==="left: -100%;"){
            $("#show-users").addClass('animation-roundin');
            $("#show-users").removeClass('animation-roundout');
            div.stop().animate({
                "left" : "0%"
            },"ease-in");
        }else{
            $("#show-users").removeClass('animation-roundin');
            $("#show-users").addClass('animation-roundout');
            div.stop().animate({
                "left" : "-100%"
            },"ease-in",function(){

            });
        }
    },
    'submit #invite-form' : function (e,t){
        e.preventDefault();
        var alert = $('.alert');
        if($("#invite-form")[0].checkValidity()){
            var input = t.find('#email-friend-input');
            if(alert){
                alert.slideUp();
                $(".form-group").removeClass('has-error');
            }
            var email = {
                id : Math.floor(Math.random()*1000),
                email : t.find('#email-friend-input').value
            };
            $(input).val("");
            Blaze.renderWithData(Template.emailinvite,email,t.$('#friends-invited').get(0));
            $('#friends-invited').stop().slideDown();
        }else{
            $(".form-group").addClass('has-error');
            var data = {
                txt : "Please enter a valid email !!"
            };
            Blaze.renderWithData(Template.alert,data,t.$('#alert-email-friend').get(0));
            $('.alert').slideDown();
        }
    },
    'click .remove-email' : function(e,t){
        var id = "#"+this.id;
        $(id).stop().slideUp('fast',function(){
            if($('.friends-invited').length<2){
                $('#friends-invited').stop().fadeOut();
            }
            $(this).remove();
        });
    },
    'submit #send-invitation-emails' : function(e,t){
        e.preventDefault();
        var alert = $('.alert');
        var emails = t.findAll(".friends-invited");
        if(emails.length<1){
            var data = {
                txt : "Please enter at least one email !!"
            };
            Blaze.renderWithData(Template.alert,data,t.$('#alert-email-friend').get(0));
            alert.slideDown();
        }else{
            if(alert){
                alert.remove();
            }
            emails.forEach(function(email){
                var data = {
                    email : email.value
                };
                Meteor.call("sendEmailInvite",data,function(err,res){
                    if(err){
                        data = {
                            txt : err.reason+ " "+ data.email
                        };
                        Blaze.renderWithData(Template.alert,data,t.$('#alert-email-friend').get(0));
                        $('.alert').slideDown();
                    }else{
                        var chatroom =  ChatRooms.find({
                            _id : $('#chat-room-id').text()
                        }).fetch();
                        var user = Meteor.users.find({
                            _id : res
                        }).fetch();
                        console.log(user[0]);
                        data = {
                            chatRoomId : chatroom[0]._id,
                            userId : user[0]._id,
                            name : chatroom[0].name,
                            pass : chatroom[0].password,
                            description : chatroom[0].description,
                            useremail : user[0].emails[0].address
                        };
                        Meteor.call('sendEmail',
                            "zankowitch@gmail.com",
                            "talkietalk@meteor.com",
                            'Hello from TalkieTalk!',
                            Blaze.toHTMLWithData(Template.invitationemail,data));
                        data = {
                            txt : "Your invitation has been send to "+data.useremail
                        };
                        Blaze.renderWithData(Template.success,data,t.$('#alert-email-friend').get(0));
                        $('.alert').slideDown();
                    }
                });
            });
            $('.email-invite-block').slideUp('fast',function(){
                if($('.friends-invited').length<2){
                    $('#friends-invited').stop().fadeOut();
                }
                $(this).remove();
            });
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
    },
    deleteChat : function(){
        var chat = ChatRooms.find({
            _id: this.chatRoomId
        }).fetch();
        var user = Meteor.user();
        return (chat[0].createdBy === user._id)
    }
});

Template.chatroom.onRendered(function () {
    //session title
    Session.set('title',$('title').text());

    $('.modal-backdrop ').fadeOut();

    //customscrollbar
    var chatBox = $('#chatBox');
    chatBox.mCustomScrollbar({
        theme:"minimal"
    });
    $("#list-users").mCustomScrollbar({
       theme:"minimal-dark"
    });
    if($('#scrool').position() && Session.equals('limit',20)){
        chatBox.mCustomScrollbar("scrollTo",$('#scrool').position().top+$('#scrool').height());
    }

    //notification

    if(notify.requestPermission()==="default"){
        notify.requestPermission();
    }
    //todo move config into profile
    notify.config({pageVisibility: true, autoClose: 2000});

});

incrementLimit = function(inc,callback){
    inc = (!inc)?20:inc;
    newLimit = Session.get('limit') + inc;
    Session.set('limit',newLimit);
};

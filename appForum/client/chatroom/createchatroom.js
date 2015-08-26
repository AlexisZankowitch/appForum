Template.createChatRoom.events({
    'submit #formCreateChatRoom' : function(e,t){
        e.preventDefault();
        var data = {
            name : t.find('#inputNameChatRoom').value,
            password : t.find('#inputPassword').value,
            description : t.find('#inputDescription').value
        };
        Meteor.call('createChatRoom',data,function(err,t){
            if(err){
                console.log(err);
            }else{
                data = {
                    chatRoomId : t,
                    userId : Meteor.userId()
                };
                Meteor.call('addUserToChat',data);
                Router.go('/chatroom/'+t);
            }
        });
    },
    'reset #formCreateChatRoom' : function(e,t){
        $('#inputNameChatRoom').val('');
        $('#inputPassword').val('');
        $('#inputDescription').val('');
    }
});
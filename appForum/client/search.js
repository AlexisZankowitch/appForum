Template.search.events({
    'submit #searchFormPage' : function(e,t){
        e.preventDefault();
        var chatroom = t.find('#cChatRoom').value;
        $(".inputSearchChatRoom").val(chatroom);
        Router.go('/search/'+chatroom);
    },
    'click .btn-reset' : function(e,t){
        e.preventDefault();
        $(".inputSearchChatRoom").val('');
        Router.go('/search');
    },
    'submit #passChat' : function(e,t){
        e.preventDefault();
        var pass = t.find('#inputPasswordSignUp').value,
            chatRoomId = $("#hideidchatroom").val();
        var chatroom = ChatRooms.find({
            _id :  chatRoomId
        }).fetch();
        if(pass===chatroom[0].password){
            var data = {
                chatRoomId : chatRoomId,
                userId : Meteor.userId()
            };
            Meteor.call('addUserToChat',data);
            Router.go('/chatroom/'+chatRoomId);
        }else{
            //TODO boulet mauvais pass envoie erreur et toutiquanti
            console.log('bad password');
        }
    }
});

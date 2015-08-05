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
        var pass = t.find('#inputPasswordSignUp').value;
        var chatroom = ChatRooms.find({
            _id :  $("#hideidchatroom").val()
        }).fetch();
        if(pass===chatroom[0].password){
            //TODO peut rentrer dans le chat => ajouter l'users au chat
        }else{
            //TODO boulet mauvais pass envoie erreur et toutiquanti
        }
    }
});

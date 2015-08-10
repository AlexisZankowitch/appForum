Template.menu.events({
   'click #logout' : function (e,t){
       e.preventDefault();
       Meteor.logout(function(err){
           if(err){
               console.log(err);
           }else{
               Meteor.logoutOtherClients();
               Router.go('/');
           }
       })
   },
    'submit #searchFormMenu' : function(e,t){
        e.preventDefault();
        var chatroom = $('#chatRoom').val();
        console.log(chatroom);
        $(".inputSearchChatRoom").val(chatroom);
        EasySearch
            .getComponentInstance({ index: 'chatrooms' })
            .search(chatroom)
        ;
        $(".inputSearchChatRoom").val('');
        Router.go('/search/'+chatroom);
    }
});
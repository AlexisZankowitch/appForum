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
        var inputSearch = $(".inputSearchChatRoom");
        inputSearch.val(chatroom);
        EasySearch
            .getComponentInstance({ index: 'chatrooms' })
            .search(chatroom)
        ;
        inputSearch.val('');
        Router.go('/search/'+chatroom);
    }
});
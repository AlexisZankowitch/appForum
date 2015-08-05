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
        var chatroom = t.find('#chatRoom').value;
        $(".inputSearchChatRoom").val(chatroom);
        EasySearch
            .getComponentInstance({ index: 'chatrooms' })
            .search(chatroom)
        ;
        Router.go('/search/'+chatroom);
    }
});
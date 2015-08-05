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
    }
});

Template.alert.helpers({
    deleteChat : function(){
        return Session.get(this.chatRoomId);
    }
});

Template.alert.events({
   'click #goMain' : function(e,t){
       $('.modal-backdrop').fadeOut();
       Router.go('/main');
   }
});
Template.invitationemail.helpers({
   location : function(){
       return location.hostname;
   },
    invite : function(){
        return Meteor.users.find({
            _id : Meteor.userId()
        }).fetch()[0].emails[0].address;
    }
});
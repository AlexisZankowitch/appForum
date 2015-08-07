Meteor.subscribe("chatrooms");
Meteor.subscribe("users");
Meteor.subscribe("chatMessages");

Template.registerHelper('userprofile', function() {
    return Meteor.users.find({
        _id : Meteor.userId()
    }).fetch();
});
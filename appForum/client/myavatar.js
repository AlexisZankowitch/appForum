Template.myavatar.helpers({
    userProfile: function () {
        return Meteor.users.find({
            _id : Meteor.userId()
        }).fetch();
    }
});
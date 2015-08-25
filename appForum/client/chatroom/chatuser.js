Template.chatuser.helpers({
    userProfilePicture: function(){
        return Meteor.users.find({
            _id : this._id
        }).fetch();
    }
});
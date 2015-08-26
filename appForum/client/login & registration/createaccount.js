Template.createaccount.events({
    'submit #invted-user-account-creation' : function(e,t){
        e.preventDefault();
        var credentials = {
            email : t.find('#email').value,
            pass : t.find('#password').value
        };
        Meteor.loginWithPassword(credentials.email,credentials.pass,function(err){
            if(err){
                $(".form-group").addClass('has-error');
                var data = {
                    txt : err.reason
                };
                Blaze.renderWithData(Template.alert,data,t.$('.displayAlert').get(0));
                $('.alert').slideDown();
            }
            else{
                var data = {
                    chatRoomId : Session.get('talkieroom'),
                    userId : Session.get('userId')
                };
                Meteor.call('addUserToChat',data);
                Router.go('/chatroom/'+Session.get('talkieroom'));
            }
        });
        return false;
    }
});

Template.createaccount.helpers({
    email : function(){
        return Meteor.users.find({
            _id : Session.get('userId')
        }).fetch()[0].emails[0].address;
    }
});
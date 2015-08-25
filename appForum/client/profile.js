//todo user can change username

Template.profile.helpers({
    email : function(){
        return Meteor.users.find({
            _id : Meteor.userId()
        }).fetch()[0].emails[0].address;
    }
});

Template.profile.events({
    'click #resetProfile': function(e,t){
        e.preventDefault();
        console.log();
        $('#Email').val(Meteor.user().emails[0].address);
    },
    'submit #formProfile': function(e,t){
        e.preventDefault();
        var data = {
            oldPassword : t.find('#oldPassword').value,
            newPassword : t.find('#newPassword').value,
            email : t.find('#Email').value
        };
        if(data.newPassword!=''){
            Accounts.changePassword(data.oldPassword,data.newPassword,function(err){
                if(err){
                    $('#pass').addClass('has-error');
                    $('.alert p').text(err.reason);
                    $('#passFailure').slideDown();
                }else{
                    $('#passOk').slideDown();
                }
            })
        }
        $('#oldPassword').val('');
        $('#newPassword').val('');
    }
});
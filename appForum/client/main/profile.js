
Template.profile.helpers({
    email : function(){
        return Meteor.users.find({
            _id : Meteor.userId()
        }).fetch()[0].emails[0].address;
    },
    username : function(){
        return Meteor.user().username;
    }
});

Template.profile.events({
    'click #resetProfile': function(e,t){
        e.preventDefault();
        $('#Email').val(Meteor.user().emails[0].address);
    },
    'submit #formProfile': function(e,t){
        e.preventDefault();

        var data = {
            userId : Meteor.userId(),
            username : t.find('#username').value,
            oldPassword : t.find('#oldPassword').value,
            newPassword : t.find('#newPassword').value,
            email : t.find('#Email').value
        };


        if(Meteor.user().username != data.username){
            Meteor.call('setUsername',data,function(err,result){
                if(result>0){
                    displaySuccess(t);
                }
            });
        }

        if(data.newPassword!=''){
            Accounts.changePassword(data.oldPassword,data.newPassword,function(err){
                if(err){
                    $('#pass').addClass('has-error');
                    $('.alert p').text(err.reason);
                    data = {
                        txt : err.reason
                    };
                    Blaze.renderWithData(Template.alert,data,t.$('#displayAlert').get(0));
                    $('.alert').slideDown();
                }else{
                    displaySuccess(t);
                }
            })
        }


        $('#oldPassword').val('');
        $('#newPassword').val('');
    },

    'change #notifications' : function(e,t){
        var toggle = $('#notifications');
        if(toggle.prop('checked')){

        }else{

        }
        var data = {
            userId : Meteor.userId(),
            notification : (Meteor.user().profile.notification !== 'undefined') ? !Meteor.user().profile.notification : true
        };
        Meteor.call('setNotifications',data);
    }
});

var displaySuccess = function(t){
    data = {
        txt : "Your infos have been changed"
    };
    Blaze.renderWithData(Template.success,data,t.$('#displayAlert').get(0));
    $('.alert').slideDown();
};

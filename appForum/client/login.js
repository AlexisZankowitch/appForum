Template.login.events({
    'submit #loginForm' : function(e,t){
        e.preventDefault();
        var email = t.find('#inputEmail').value,
            password = t.find('#inputPassword').value;
        Meteor.loginWithPassword(email,password,function(err){
            if(err){
                $(".form-group").addClass('has-error');
                var data = {
                    txt : err.reason
                };
                Blaze.renderWithData(Template.alert,data,t.$('.displayAlert').get(0));
                $('.alert').slideDown();
            }
            else{
                Router.go('/main');
            }
        });
        return false;
    },
    'click #registerLink' : function(e,t){
        e.preventDefault();
        var email = t.find('#inputEmail').value,
            password = t.find('#inputPassword').value;
        $("#inputEmailSignUp").val(email);
        $("#inputPasswordSignUp").val(password);
        $('#loginForm').slideToggle();
        $('#formRegistration').slideToggle();
    }
});
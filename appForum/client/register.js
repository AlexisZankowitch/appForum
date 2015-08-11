Template.signup.events({
    'submit #formRegistration': function(e,t){
        e.preventDefault();
        var data ={
            email : t.find('#inputEmailSignUp').value,
            password : t.find('#inputPasswordSignUp').value,
            username : t.find('#inputUserNameSignUp').value,
        }
        console.log(data);
        Accounts.createUser({email : data.email, password : data.password, username : data.username},function(err){
            if(err){
                $('#labelEmail').addClass('has-error');
                var data = {
                    txt : err.reason
                };
                Blaze.renderWithData(Template.alert,data,t.$('.displayAlert').get(0));
                $('.alert').slideDown();
            }
            else
                Router.go('/main');
        });
        return false;
    },
    'click #cancelLink' : function(e,t){
        e.preventDefault();
        $("#inputEmail").val('');
        $("#inputPassword").val('');
        $('#loginForm').slideToggle();
        $('#formRegistration').slideToggle();
    }
});
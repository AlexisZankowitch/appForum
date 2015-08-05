Template.signup.events({
    'submit #formRegistration': function(e,t){
        e.preventDefault();
        var data ={
            email : t.find('#inputEmailSignUp').value,
            password : t.find('#inputPasswordSignUp').value,
            username : t.find('#inputUserNameSignUp').value,
            name : t.find('#inputNameSignUp').value,
            firstname : t.find('#inputFirstnameSignUp').value
        }
        console.log(data);
        Accounts.createUser({email : data.email, password : data.password, username : data.username , profile : {firstname : data.firstname,name : data.name}},function(err){
            if(err){
                $('#labelEmail').addClass('has-error');
                $('.alert p').text(err.reason);
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
Router.configure({
    layoutTemplate: 'mainLayout'
});


Router.route('/', function () {
    if(!Meteor.userId())
        this.render('Home');
    else
        this.render('main');
});

Router.route('/signup',function(){
    this.render('signup');
});

Router.route('/main',function(){
    this.render('main');
});

Router.route('/search',function(){
   this.render('search');
});

Router.route('/search/:_chatroom',function(){
    this.render('search',{
       data : function (){
           var templateData = {
               chatRooms : ChatRooms.find({name:this.params._chatroom},{
                   sort : {
                     createdAt : -1
                   }
               }),
               searchText : this.params._chatroom
           };
           return templateData;
       }
    });
});

Router.route('/profile',function(){
    this.render('profile');
});

Router.route('/create',function(){
   this.render('createChatRoom');
});

Router.route('/chatroom/:_id',function(){
    name : 'chatroom',
    //limit msg loaded
    Session.set('limit',20);
    //Session notification
    Session.set('sendMsg',false);
    Session.set('nbMsg',0);
    Session.set('scroll',false);

    this.wait(Meteor.subscribe('usersChat',this.params._id));
    if(this.ready()){
        var chatRoomUsers = ChatRooms.find({
            _id : this.params._id
        },{
            fields : {
                users : 1
            }
        }).fetch();
        if(jQuery.inArray(Meteor.userId(),chatRoomUsers[0].users)>=0){
            this.render('chatroom',{
                data : function(){
                    var templateData = {
                        chatRoomId : this.params._id
                    };
                    return templateData;
                }
            });
        }else{
            this.render('main');
        }
    }else{
        this.render('Loading');
        if(ChatRooms.find({_id : this.params._id}).fetch().length === 0){
            Meteor.setTimeout(function(){
                var data = {
                    txt : "The chat room has been delete."
                };
                Blaze.renderWithData(Template.alert,data,document.getElementById("alertDelete"));
                $('<a>',{
                    text : "GO HOME",
                    href : "/main",
                    class : " btn btn-primary btn-raised"
                }).appendTo($('.alert'));
                $('.alert').slideDown();
            },5000);
        }
    }

});

Router.route('/createaccount/:_userId/talkieroom/:_chatroomId',function(){
    var user = Meteor.users.find({
        _id : this.params._userId
    }).fetch();
    if(user.length<1 || !user[0].profile.invited){
        this.render('main');
    }else{
        Session.set('userId',user[0]._id);
        Session.set('talkieroom',this.params._chatroomId);
        this.render('createaccount');
    }
},{
    name : 'createaccount'
});

Router.onBeforeAction(function(){

    if(!Meteor.userId()){
        this.render('home');
    }else{
        this.next();
    }
},{
    except : ['createaccount']
});

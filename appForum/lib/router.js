
Router.route('/', function () {
    this.render('Home');
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
    /*this.wait(Meteor.subscribe('chatrooms',this.params._chatroom));
    if(this.ready()){
        this.render();
    }else
        this.render('Loading');*/
    this.render('search',{
       data : function (){
           templateData = {
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
    this.render('chatroom',{
        data : function(){
            templateData = {
               chatRoomId : this.params._id,
                chatMessages : ChatMsgs.find({
                    chatRoomId : this.params._id
                })
            };
            return templateData;
        }
    });
});

Router.onBeforeAction(function(){
    if(!Meteor.userId()){
        this.render('home');
    }else{
        this.next();
    }
});

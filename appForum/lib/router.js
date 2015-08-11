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
    name : 'chatroom',
    /*Session.setDefault('limit',20);
    //TODO console warning : Route dispatch never rendered. Did you forget to call this.next() in an onBeforeAction?
    this.wait(Meteor.subscribe('chatMessages',Session.get('limit')));
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
                    //TODO limit nb old messages
                    templateData = {
                        chatRoomId : this.params._id,
                        chatMessages : ChatMsgs.find({
                            chatRoomId : this.params._id
                        },{
                            skip : ChatMsgs.find({
                                chatRoomId : this.params._id
                            }).count()-Session.get('limit'),
                            limit:Session.get('limit')
                        })
                    };
                    return templateData;
                }
            });
        }else{
            this.render('main');
        }
    }else{
        this.render('Loading');
    }*/
    this.wait(Meteor.subscribe('usersChat',this.params._id));
    if(this.ready()){
        Session.setDefault('limit',20);
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
                    //TODO limit nb old messages
                    templateData = {
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
    }
});



Router.onBeforeAction(function(){
    if(!Meteor.userId()){
        this.render('home');
    }else{
        this.next();
    }
});

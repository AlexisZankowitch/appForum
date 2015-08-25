Template.chatbox.helpers({
    chatMessages: function(){
        return  ChatMsgs.find({
            chatRoomId : this.chatRoomId
        },{
            skip : (ChatMsgs.find({
                chatRoomId : this.chatRoomId
            }).count()-Session.get('limit')<0)?0:ChatMsgs.find({
                chatRoomId : this.chatRoomId
            }).count()-Session.get('limit'),
            limit:Session.get('limit')
        });
    }
});
//TODO infinite scroll
Template.chatbox.events({
    'click .give-me-more' : function(e){
        var chatBox = $('#chatBox');
        var inc = 20;
        e.preventDefault();
        incrementLimit(inc);
    }
});
Template.chatmsg.onRendered(function(){
    //todo return page scrollto #last-seen
    var chatBox = $('#chatBox');
    chatBox.mCustomScrollbar("update");
    if(!Session.equals('limit',20)){
        chatBox.mCustomScrollbar("scrollTo",$(this.firstNode).position().top-$("#chatBox").height()+$("#chatBox").height()*30/100);
    }
    else{
        if($('.list-chat-item:last-child').prev().attr('id')!="last-seen"){
            $('.list-chat-item:last-child').prev().removeAttr('id');
        }
        $('.list-chat-item:last-child').attr('id','scrool');
    }
    if(Session.get('sendMsg')===true){
        notify.createNotification( "Hey", {
            body: "There is a new message !!",
            icon: "/hipsterlogogenerator_1439211532769.png"
        });
        if(Session.get('blur')){
            var title = $('title');
            Session.set('nbMsg',Session.get('nbMsg')+1);
            title.text(Session.get('nbMsg') +" - " + Session.get('title'));
        }
    }
    if(Session.get('scroll')){
        chatBox.mCustomScrollbar("scrollTo",$('#scrool').position().top+$('#scrool').height());
    }
});

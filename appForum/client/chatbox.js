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
    var chatBox = $('#chatBox');
    chatBox.mCustomScrollbar("update");
    if(!Session.equals('limit',20)){
        chatBox.mCustomScrollbar("scrollTo",$(this.firstNode).position().top-$("#chatBox").height()+$("#chatBox").height()*30/100);
    }
    else{
        $('.list-chat-item:last-child').attr('id','scrool');
    }
});

Template.chatmsg.rendered = function(){
    $(window).scroll(function(){
        console.log('aze');
    });
};
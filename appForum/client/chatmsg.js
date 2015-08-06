Template.chatmsg.helpers({
    username : function(){
        var userId = this.publishedBy;
        var author = Meteor.users.find({
            _id : userId
        }).fetch();
        return author[0].username;
    },
    date : function (){
        return moment(this.publishedAt).format('DD-MMM-YYYY HH-mm');
    }
});

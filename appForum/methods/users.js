Meteor.methods({
    setUsername : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        return Meteor.users.update({
            _id : data.userId
        },{
            $set : {
                username : data.username
            }
        });
    },
    setNotifications : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        return Meteor.users.update({
            _id : data.userId
        },{
            $set : {
                profile : {
                    notification : data.notification
                }
            }
        })
    }
});
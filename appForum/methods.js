ChatRooms = new Mongo.Collection('chatrooms');
ChatMsgs = new Mongo.Collection('chatmsgs');

//Todo make invitation system : send mail et tutiquanti

Avatar.setOptions({
    fallbackType: "default image",
    gravatarDefault: "identicon"
});

EasySearch.createSearchIndex('users', {
    field: 'username',
    collection: Meteor.users,
    use: 'mongo-db',
    query: function (searchString, opts) {
        // Default query that is used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

        // Make the emails searchable
        query.$or.push({
            emails: {
                $elemMatch: {
                    address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
                }
            }
        });

        return query;
    }
});

ChatRooms.initEasySearch('name');

Meteor.methods({
   createChatRoom : function(data){
       if(!Meteor.userId()){
           throw new Meteor.Error('not authorized');
       }
       return ChatRooms.insert({
           name : data.name,
           password : data.password,
           description : data.description,
           createdBy : Meteor.userId(),
           createAt : new Date(),
           users : []
       });
   },
    addUserToChat : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        return ChatRooms.update({
            _id : data.chatRoomId
        },{
            $addToSet:{
                users : {
                    $each : [data.userId]
                }
            }
        });
    },
    'sendMsgToChat' : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        if(data.chatRoomMsg){
            return ChatMsgs.insert({
                chatRoomId : data.chatRoomId,
                chatRoomMsg : data.chatRoomMsg,
                publishedAt : new Date(),
                publishedBy : Meteor.userId()
            });
        }
    },
    'removeUserFromChat' : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        ChatRooms.update({
            _id : data.chatRoomId
        },{
            $pull: {
                users : data.userId
            }
        })
    },
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject], [String]);
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            html: text
        });
    },
    deleteChatRoom : function(data){
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        ChatMsgs.remove({
            chatRoomId : data.chatRoomId
        });
        ChatRooms.remove({
            _id : data.chatRoomId
        });
        throw new Meteor.Error('OK-Confirmation','Chat room has been delete');
    }
});

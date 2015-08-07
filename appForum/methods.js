ChatRooms = new Mongo.Collection('chatrooms');
ChatMsgs = new Mongo.Collection('chatmsgs');

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
        //TODO send email to user
        if(!Meteor.userId()){
            throw new Meteor.Error('not authorized');
        }
        ChatRooms.update({
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
    }
});
Template.searchChatForm.events({
    'click .joinChat' : function(e,t){
        //TODO vérifier si l'user est pas deja dans la liste si oui ne pas lui demander le pass
        $("#hideidchatroom").val(this._id);
    }
});
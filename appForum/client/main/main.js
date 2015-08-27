Template.main.onRendered(function(){
    //notification
    if(notify.permissionLevel()==="default"){
        notify.requestPermission();
        notify.config({pageVisibility: true, autoClose: 2000});
    }
});
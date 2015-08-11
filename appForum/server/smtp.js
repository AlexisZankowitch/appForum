// server/smtp.js
Meteor.startup(function () {
    smtp = {
        username: 'apptalkietalk', // eg: server@gentlenode.com
        password: 'a5$ry/mN', // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com', // eg: mail.gandi.net
        port: 465
    }



    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + '%40gmail.com:' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port + '/';
});
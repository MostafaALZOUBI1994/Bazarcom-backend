'use strict';

var FCM = require('fcm-node');
var serverKey = 'AAAAnr-Q3ds:APA91bEc1IsFl7cdQMf7cEB2GbvU4z4YoazUNaNo5JEnjIRqS-KkG7qPga1kn9njVOAX9trbZqW3ih5400r4aBi5Qz1ZtzbddVqXpjIFOlPZNYC3JpDL4Yc2dabwH8mx4y_5gyM3eZZC'; //put your server key here
var fcm = new FCM(serverKey);
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#cron-tasks
 */

 module.exports = {
  '*/1 * * * *': async () => {
    try{
    // fetch articles to publish
    const draftArticleToPublish = await strapi.api.advertisment.services.advertisment.find({_limit: -1});
  
        
   

        //console.log(Difference_In_Days)

        draftArticleToPublish.forEach(async article => {
          var date1 = new Date(article.published_date);  
        var date2 = new Date();
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 3600 * 24));
         console.log(Difference_In_Days)
         if(Difference_In_Days>5){
          strapi.query('advertisment').delete({
            id: article.id
          })
          var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: 'ft1z8mwjSgOxo0JOhmP3M5:APA91bEaz7buY8M3JOBbz1yt__o3TK0uErBKUDgSr0EjgP8G4n0Fpw8D5EepsN78brxXNw_zoK-jSRugyvzysEbJS8MK_L6wFd5Epq297Mjo9761uZIqF1IVal3m31lDLItWn7Dg8u_L', 
            collapse_key: 'your_collapse_key',
            
            notification: {
                title: ' هذاالاشعار من تطبيق بزاركم مصطفى يرحب بكم', 
                body: 'Body of your push notification' 
            },
            
            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };
        fcm.send(message, function(err, response){
          if (err) {
              console.log(err+"Something has gone wrong!");
          } else {
              console.log("Successfully sent with response: ", response);
          }});
         }
        });}catch(ex){console.log(ex)}
      },
  
};



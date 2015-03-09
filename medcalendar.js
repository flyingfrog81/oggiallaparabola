var baseUrl = "https://www.googleapis.com/calendar/v3";
var medicinaid = "gmaccaferriit@gmail.com";
var reqUrl = baseUrl + "/calendars/" + medicinaid + "/";
var visibleElement = null;
//ATTENTION!
//googleApiKey variable must be defined in a previously included file

function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
         + pad(d.getUTCMonth()+1)+'-'
         + pad(d.getUTCDate())+'T'
         + pad(d.getUTCHours())+':'
         + pad(d.getUTCMinutes())+':'
         + pad(d.getUTCSeconds())+'Z'}

function parseEventDescription(text){
    pattern = /\[.+\]/;
    result = pattern.exec(text);
    if(result){
        return result[0].replace(/[\[\]]/g,"").trim().toLowerCase();
    }
    else 
        return "maintenance";
}

function nextEvent(){
    $.get(
        url = reqUrl + "events",
        data = {key: googleApiKey, 
                singleEvents: true,
                orderBy: "startTime",
                timeMin: ISODateString(new Date()),
                maxResults: 1},
        success = function(data){
            event = data.items[0];
            description = parseEventDescription(event.summary);
            start_datetime = new Date(event.start.dateTime);
            now = new Date();
            if(start_datetime > now){
                description = "maintenance";
             }
            //console.log("event:", event);
            //console.log("start: ", start_datetime);
            //console.log("now: ", now);
            //console.log("ID: ", description);
            newVisibleElementt = $("#" + description);
            if(visibleElement[0] != newVisibleElement[0]){
                visibleElement.hide();
                newVisibleElement.show();
                visibleElement = newVisibleElement;
            }
        },
        dataType = "json"
     );
};


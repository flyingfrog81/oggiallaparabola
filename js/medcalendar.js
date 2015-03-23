var baseUrl = "https://www.googleapis.com/calendar/v3";
var medicinaid = "gmaccaferriit@gmail.com";
var reqUrl = baseUrl + "/calendars/" + medicinaid + "/events";
var visibleElement = null;
var fallback = "maintenance";
//ATTENTION!
//googleApiKey variable must be defined in a previously included file

function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
         + pad(d.getUTCMonth()+1)+'-'
         + pad(d.getUTCDate())+'T'
         + pad(d.getUTCHours())+':'
         + pad(d.getUTCMinutes())+':'
         + pad(d.getUTCSeconds())+'Z'
};

function parseEventDescription(text){
    pattern = /\[.+\]/;
    result = pattern.exec(text);
    if(result){
        return result[0].replace(/[\[\]]/g,"").trim().toLowerCase();
    }
    else 
        return fallback;
};

function showCurrentEvent(){
    console.debug("showCurrentEvent()");
    $.getJSON(
        reqUrl,
        {
            key: googleApiKey, 
            singleEvents: true,
            orderBy: "startTime",
            timeMin: ISODateString(new Date()),
            maxResults: 1
        },
        function(data){
            console.debug("success");
        })
        .done(function(data){
            first_event = data.items[0];
            description = parseEventDescription(first_event.summary);
            start_datetime = new Date(first_event.start.dateTime);
            now = new Date();
            if(start_datetime > now){
                description = fallback;
             }
            console.debug("next event:", first_event);
            console.debug("start date: ", start_datetime);
            console.debug("now: ", now);
            console.debug("ID: ", description);
        })
        .fail(function(){
            console.debug("could not access google calendar");
            description = fallback;
        })
        .always(function(){
            console.debug("showing: ", description);
            newVisibleElement = $("#" + description);
            if(newVisibleElement.length == 0)
            {
                console.debug("Cannot find element: ", description);
                newVisibleElement = $("#"  + fallback);
            }
            if(visibleElement == null)
            {
                visibleElement = newVisibleElement;
                visibleElement.show();
            }else{
                if(visibleElement[0] != newVisibleElement[0])
                {
                    visibleElement.hide();
                    newVisibleElement.show();
                    visibleElement = newVisibleElement;
                }
            }
        });
};


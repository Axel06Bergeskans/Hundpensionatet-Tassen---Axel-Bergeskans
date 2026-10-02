const openHeading = document.getElementById("openHeading");
const isOpenButton = document.getElementById("isOpenButton");
const time = document.getElementById("counter");
const weekDay = document.getElementById("date")


function isOpen(){
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 7 && hour < 18) {
       openHeading.innerHTML = "Just nu: Öppet";
       isOpenButton.innerHTML = "Stängt just nu"
    } else {
        openHeading.innerHTML = "Just nu: Stängt"
        isOpenButton.innerHTML = "Stängt just nu"
    }
}

setInterval(isOpen, 1000);

function localTime(element){
    const now = new Date();
    const timeToday = now.toLocaleTimeString();
    element.innerHTML = timeToday;
    return element;
}

setInterval(() => localTime(time), 1000);


function dayToday(element){
    const date = new Date()
    const dayToday = date.getDay(); // Tydligen ger detta en siffra från 0-6

    const day = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag"
    ];

    element.innerHTML = day[dayToday];

}

setInterval(() => dayToday(date), 1000);
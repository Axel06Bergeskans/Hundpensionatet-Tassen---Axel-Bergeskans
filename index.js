const openHeading = document.getElementById("openHeading");
const isOpenButton = document.getElementById("isOpenButton");
const openCardButton = document.getElementById("openCardButton");
const time = document.getElementById("counter");
const weekDay = document.getElementById("date")
const monday = document.getElementById("monday")
const tuesday = document.getElementById("tuesday")
const wednesday = document.getElementById("wednesday")
const thursday = document.getElementById("thursday")
const friday = document.getElementById("friday")

const allDays = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday
]


function isOpen() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 13 && hour < 18) {
        openHeading.innerHTML = "Just nu: Öppet";
        isOpenButton.innerHTML = "Öppet just nu";
        openCardButton.classList.add("isOpen");
        
    } else {
        openHeading.innerHTML = "Just nu: Stängt"
        isOpenButton.innerHTML = "Stängt just nu"
        openCardButton.classList.add("isClosed")
    }
}

setInterval(isOpen, 1000);

function localTime(element) {
    const now = new Date();
    const timeToday = now.toLocaleTimeString();
    element.innerHTML = timeToday;
    return element;
}

setInterval(() => localTime(time), 1000);


function dayToday(element) {
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


function dayList(element) {
    const date = new Date()
    const dayToday = date.getDay()

    if (dayToday >= 1 && dayToday <= 5) {
        allDays[dayToday - 1].classList.add("openWeekListActive");
    }
}

dayList(allDays);
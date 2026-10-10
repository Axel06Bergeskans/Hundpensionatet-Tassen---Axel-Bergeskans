
const weather = document.getElementById("weather");
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


function dateAndMonth(element) {
    const date = new Date();
    const dayToday = date.getDay();
    const month = date.getMonth();

    const months = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December"
    ];

    const days = [
        "Söndag",
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag"
    ];
    return element.innerHTML = months[month] + " " + days[dayToday];
}

setInterval(() => dateAndMonth(weekDay), 1000);

function dayList(element) {
    const date = new Date()
    const dayToday = date.getDay()

    if (dayToday >= 1 && dayToday <= 5) {
        allDays[dayToday - 1].classList.add("openWeekListActive");
    }
}


dayList(allDays);


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "October",
    "November",
    "December"
]


const date = new Date();
const month = date.getMonth()
const result = date.getDate();
console.log(result + " " + months[month]);

fetch("https://api.open-meteo.com/v1/forecast?latitude=59.38&longitude=17.03&hourly=rain,cloud_cover&timezone=Europe%2FStockholm")
    .then(result => result.json())
    .then(data => {
        const time = date.getHours();
        console.log(data);
        const clouds = data.hourly.cloud_cover[time];
        const rain = data.hourly.rain[time];

        if (clouds < 20 && rain < 0.5) {
            weather.innerHTML = "☀️";
            weather.style.backgroundColor = "#4f8153";

        } else if (clouds < 50 && rain < 0.5) {
            weather.innerHTML = "🌤️";
            weather.style.backgroundColor = "#2a2e66";

        } else if (clouds < 80 && rain < 0.5) {
            weather.innerHTML = "⛅";
            weather.style.backgroundColor = "#292C51";

        } else if (clouds <= 100 && rain < 0.5) {
            weather.innerHTML = "☁️";
            weather.style.backgroundColor = "#262630";

        } else if (rain < 1) {
            weather.innerHTML = "☔";
            weather.style.backgroundColor = "#262630";
        } else {
            weather.innerHTML = "🌧️";
            weather.style.backgroundColor = "#262630";

        }
    }
    )




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
const cards = document.querySelectorAll(".bokaCard");
const bokade = document.querySelector(".bokade");
const weatherText = document.getElementById("weatherText");

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

    if (hour >= 7 && hour < 18) {
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
    return element.innerHTML = days[dayToday] + " " + date.getDate() + " " + months[month];
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
            weatherText.innerHTML = "Just nu: Soligt"

        } else if (clouds < 50 && rain < 0.5) {
            weather.innerHTML = "🌤️";
            weather.style.backgroundColor = "#2a2e66";
            weatherText.innerHTML = "Just nu: Växlande molnighet"

        } else if (clouds < 80 && rain < 0.5) {
            weather.innerHTML = "⛅";
            weather.style.backgroundColor = "#292C51";
            weatherText.innerHTML = "Just nu: Mestadels molnigt"

        } else if (clouds <= 100 && rain < 0.5) {
            weather.innerHTML = "☁️";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Molnigt"

        } else if (rain < 1) {
            weather.innerHTML = "☔";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Duggregn"
        } else {
            weather.innerHTML = "🌧️";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Mycket regn"
        }
    }
    )


cards.forEach((card, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    const formatted = date.toLocaleDateString("sv-SE", {
        year: "2-digit",
        month: "long",
        day: "numeric"
    });

    card.textContent = formatted;
});


const bokadeTider = []; 

cards.forEach(card => {
    card.addEventListener("click", () => {

        const selectedDate = card.textContent; // <-- måste ligga först
        const antalBokade = bokade.children.length;

        // Max 5 bokningar
        if (antalBokade >= 5) {
            alert("Det går inte att boka fler tider, max 5 tider");
            return;
        }

        // Redan bokad?
        if (bokadeTider.includes(selectedDate)) {
            alert("Du har redan bokat denna tid");
            return;
        }

        // Skapa bokningskort
        const bookingCard = document.createElement("div");
        bookingCard.classList.add("bokadCard");
        bookingCard.textContent = "Bokad tid: " + selectedDate;

        bokade.appendChild(bookingCard);
        card.classList.add("isBokad");

        // Lägg till i listan
        bokadeTider.push(selectedDate);
    });
});

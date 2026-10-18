
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
const saturday = document.getElementById("saturday")
const sunday = document.getElementById("sunday")
const cards = document.querySelectorAll(".bokaCard");
const bokade = document.querySelector(".bokade");
const weatherText = document.getElementById("weatherText");
const dogName = document.getElementById("dogName");

const allDays = [
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
]


function isOpen() {
    const now = new Date();
    const hour = now.getHours();
    const dayToday = now.getDay();

    if (dayToday >= 1 && dayToday <= 5 && hour >= 7 && hour < 18) {
        openHeading.innerHTML = "Just nu: Öppet";
        isOpenButton.innerHTML = "Öppet just nu";
        openCardButton.classList.add("isOpen");
        openCardButton.classList.remove("isClosed");
    }

    else if (dayToday === 6 && hour >= 9 && hour < 14) {
        openHeading.innerHTML = "Just nu: Öppet";
        isOpenButton.innerHTML = "Öppet just nu";
        openCardButton.classList.add("isOpen");
        openCardButton.classList.remove("isClosed");
    }

    else {
        openHeading.innerHTML = "Just nu: Stängt";
        isOpenButton.innerHTML = "Stängt just nu";
        openCardButton.classList.add("isClosed");
        openCardButton.classList.remove("isOpen");
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

    if (dayToday === 0) {
        return allDays[6].classList.add("openWeekListActive");
    }

    return allDays[dayToday - 1].classList.add("openWeekListActive");
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
            weatherText.innerHTML = "Just nu: Soligt";

        } else if (clouds < 50 && rain < 0.5) {
            weather.innerHTML = "🌤️";
            weather.style.backgroundColor = "#2a2e66";
            weatherText.innerHTML = "Just nu: Växlande molnighet";

        } else if (clouds < 80 && rain < 0.5) {
            weather.innerHTML = "⛅";
            weather.style.backgroundColor = "#292C51";
            weatherText.innerHTML = "Just nu: Mestadels molnigt";

        } else if (clouds <= 100 && rain < 0.5) {
            weather.innerHTML = "☁️";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Molnigt";

        } else if (rain < 1) {
            weather.innerHTML = "☔";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Duggregn";

        } else {
            weather.innerHTML = "🌧️";
            weather.style.backgroundColor = "#262630";
            weatherText.innerHTML = "Just nu: Mycket regn";
        }
    })
    .catch(error => {
        console.error("Fel vid hämtning av väder:", error);
        weatherText.innerHTML = "Kunde inte ladda vädret.";
    });

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



let bokadeTider = JSON.parse(localStorage.getItem("bokadeTider")) || [];

function visaBokningar() {
    bokade.innerHTML = "";

    cards.forEach(card => {
        card.classList.remove("isBokad");
    });

    bokadeTider.forEach((bokning, index) => {
        const bookingCard = document.createElement("div");
        bookingCard.classList.add("bokadCard");

        bookingCard.textContent =
            "Hund: " + bokning.hundensNamn +
            " | Bokad tid: " + bokning.datum;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Ta bort tid";

        deleteButton.addEventListener("click", () => {
            bokadeTider.splice(index, 1);

            localStorage.setItem(
                "bokadeTider",
                JSON.stringify(bokadeTider)
            );

            visaBokningar();
        });

        bookingCard.appendChild(deleteButton);
        bokade.appendChild(bookingCard);

        cards.forEach(card => {
            if (card.textContent === bokning.datum) {
                card.classList.add("isBokad");
            }
        });
    });
}

visaBokningar();

cards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedDate = card.textContent;
        const hundensNamn = dogName.value.trim();

        if (hundensNamn === "") {
            alert("Skriv hundens namn först!");
            return;
        }

        if (bokadeTider.length >= 5) {
            alert("Det går inte att boka fler tider, max 5 tider");
            return;
        }

        if (bokadeTider.some(bokning => bokning.datum === selectedDate)) {
            alert("Du har redan bokat denna tid");
            return;
        }

        const nyBokning = {
            hundensNamn: hundensNamn,
            datum: selectedDate
        };

        bokadeTider.push(nyBokning);

        localStorage.setItem(
            "bokadeTider",
            JSON.stringify(bokadeTider)
        );

        visaBokningar();
    });
});


class Hundpensionat {
    constructor(namn) {
        this.namn = namn;
    }

    presentera() {
        return "Välkommen till " + this.namn + "!";
    }
}

const tassen = new Hundpensionat("Tassen");
console.log(tassen.presentera());
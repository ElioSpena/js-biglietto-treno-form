//recupero gli Input dal DOM

const inputKm = document.getElementById("km-number");
const inputAge = document.getElementById("age");
const userNameInput = document.getElementById("user-name");
const userSurnameInput = document.getElementById("surname");
const userStationInput = document.getElementById("station");
const userTelInput = document.getElementById("phone");
const userEmailInput = document.getElementById("email");
const userTermsInput = document.getElementById("grid-check");



//recupero gli elementi dal DOM

const ticketForm = document.querySelector("form");
const passengerNameElem = document.getElementById("passenger");
const passengerAgeElem = document.getElementById("passenger-age");
const passengerTelElem = document.getElementById("passenger-tel");
const passengerEmailElem = document.getElementById("passenger-mail");
const passengerStationElem = document.getElementById("passenger-station");
const passengerKmElem = document.getElementById("passenger-km");
const passengerDiscountElem = document.getElementById("passenger-discount");
const ticketPriceElem = document.getElementById("ticket-price");
const ticketCard = document.getElementById("ticket-card");
const intercityElem = document.getElementById("intercity");
const vagonElem = document.getElementById("vagon");




//al submit stampo in pagina i dati in ingresso 

ticketForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //salvo in variabili il valore dell'input utente

    const userKm = parseFloat(inputKm.value);
    const userAge = inputAge.value;
    let userName = userNameInput.value.trim();
    const userSurname = userSurnameInput.value.trim();
    const userStation = userStationInput.value;
    const userTel = userTelInput.value;
    const userEmail = userEmailInput.value.trim();
    const userTerms = userTermsInput.value;


    //faccio un controllo sull' input utente 

    if (userKm <= 0) {
        alert("Errore: Inserire i Km!");
    }

    //invoco la funzione salvandola in una variabile

    const priceCalc = priceCalculator(userKm, userAge);
    const finalPrice = priceCalc.toFixed(2);
    const numberIdTrain = getRandomNumb(6);
    const numberVagon = getRandomNumb(2);
    console.log(numberIdTrain, numberVagon, finalPrice);


    //stampo in console il risultato

    console.log(`km = ${userKm}; età = ${userAge}; prezzo = ${finalPrice}€`);

    //passo gli elementi al DOM

    passengerNameElem.innerHTML = `${userSurname} ${userName}`;
    passengerAgeElem.innerHTML = userAge;
    passengerTelElem.innerHTML = userTel;
    passengerEmailElem.innerHTML = userEmail;
    passengerKmElem.innerHTML = userKm;
    passengerStationElem.innerHTML = userStation;
    intercityElem.innerHTML += numberIdTrain;
    vagonElem.innerHTML += numberVagon;
    //passengerDiscountElem.innerHTML += " " 
    ticketPriceElem.innerHTML = `Il costo del biglietto è: ${finalPrice} €`;

    //mostro a schermo il ticket
    ticketCard.classList.remove("d-none");
    ticketCard.classList.add("d-block");

    //ripulisco il form
    ticketForm.reset();
})



//FUNZIONI

/**creo una funzione per calcolare il prezzo
 * 
 * @param {number}; km 
 * @param {string}; età 
 * @returns {string} prezzo in decimali
 */

function priceCalculator(km, age) {

    let price;

    //creo delle variabili per il prezzo fisso e scontato
    const defaultPrice = 0.21 * km;
    const discounted20 = defaultPrice - (defaultPrice * 20 / 100);
    const discounted40 = defaultPrice - (defaultPrice * 40 / 100);

    //imposto la condizione per lo sconto
    if (age === "Minorenne") {
        price = discounted20;
    } else if (age === "Over65") {
        price = discounted40;
    } else {
        price = defaultPrice;
    }

    return price;
}

/**creo una funzione che genera numeri casuali per quante cifre vogliamo
 * @param {number}; cifra di numeri da creare
 * @returns {string}; numero casuale * cifra in stringa 
 */

function getRandomNumb(cifra) {
    let randomNumber = "";
    for (let i = 0; i < cifra; i++) {
        let curNumber
        if (i === 0) {
            curNumber = Math.floor(Math.random() * 9) + 1;
        } else {
            curNumber = Math.floor(Math.random() * 10);
        }
        randomNumber += curNumber;
    }

    return randomNumber
}


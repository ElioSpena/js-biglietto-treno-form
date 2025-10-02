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
const homeButton = document.getElementById("btn-home");


//al submit stampo in pagina i dati in ingresso 

ticketForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //salvo in variabili il valore dell'input utente

    const userKm = parseFloat(inputKm.value);
    const userAge = inputAge.value;
    const userName = userNameInput.value.trim();
    const userSurname = userSurnameInput.value.trim();
    const userStation = userStationInput.value;
    const userTel = userTelInput.value;
    const userEmail = userEmailInput.value.trim();
    const userTerms = userTermsInput.checked;


    //invoco la funzione salvandola in una variabile

    const priceCalc = priceCalculator(userKm, userAge);
    const finalPrice = priceCalc.toFixed(2);
    const numberIdTrain = getRandomTrain(6);
    const numberVagon = getRandomVagon(2);
    const discount = getDiscountType(userAge, passengerDiscountElem);
    const capitalizePassenger = capitalizeWord(userName, userSurname);

    //faccio un controllo sul form 
    const isValid = isFormValid(userKm, inputKm, userName, userNameInput, userSurname, userSurnameInput, userTel, userTelInput, userEmail, userEmailInput, userTerms, userTermsInput);
    if (!isValid) {
        return;
    }

    //passo gli elementi al DOM

    passengerNameElem.innerHTML = capitalizePassenger;
    passengerAgeElem.innerHTML = userAge;
    passengerTelElem.innerHTML = userTel;
    passengerEmailElem.innerHTML = userEmail;
    passengerKmElem.innerHTML = userKm;
    passengerStationElem.innerHTML = userStation;
    intercityElem.innerHTML += numberIdTrain;
    vagonElem.innerHTML += numberVagon;
    ticketPriceElem.innerHTML = `Il costo del biglietto è: ${finalPrice} €`;


    //rimuovo il form 
    ticketForm.classList.add("d-none");

    //mostro a schermo il ticket
    ticketCard.classList.remove("d-none");
    ticketCard.classList.add("d-block");

    //ripulisco il form
    ticketForm.reset();
})



//al click home nascondo il ticket e mostro il form
homeButton.addEventListener("click", function () {
    ticketForm.classList.remove("d-none");
    ticketCard.classList.add("d-none");
    intercityElem.innerHTML = "Intercity n° ";
    vagonElem.innerHTML = "Carrozza n° ";
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

function getRandomTrain(cifraTrain) {
    let randomNumberTrain = "";
    for (let i = 0; i < cifraTrain; i++) {
        let curNumberTrain
        if (i === 0) {
            curNumberTrain = Math.floor(Math.random() * 9) + 1;
        } else {
            curNumberTrain = Math.floor(Math.random() * 10);
        }

        randomNumberTrain += curNumberTrain;
    }

    return randomNumberTrain

}

function getRandomVagon(cifraVagon) {

    let numberVagon = Math.floor(Math.random() * 20);
    let result
    if (numberVagon < 10) {
        result = "0" + numberVagon;
    } else {
        result = numberVagon;
    }

    return result

}



/**creo una funzione per le istruzioni condizionali
 * @param {string}; valore dell'input
 * @param {object}; elemento da modificare
 * @returns {bool}; se la condizione è true/false
 */

function isFormValid(km, kmWarning, name, warningName, surname, warningSurname, tel, warningTel, email, warningEmail, terms, warningTerms) {
    let isValid = true;

    if (km <= 0) {
        kmWarning.classList.add("border");
        kmWarning.classList.add("border-danger");
        isValid = false;
    } else {
        kmWarning.classList.remove("border");
        kmWarning.classList.remove("border-danger");
    }

    if (name === "") {
        warningName.classList.add("border");
        warningName.classList.add("border-danger");
        isValid = false;
    } else {
        warningName.classList.remove("border");
        warningName.classList.remove("border-danger");
    }

    if (surname === "") {
        warningSurname.classList.add("border");
        warningSurname.classList.add("border-danger");
        isValid = false;
    } else {
        warningSurname.classList.remove("border");
        warningSurname.classList.remove("border-danger");
    }


    if (tel === "" || tel.length < 10) {
        warningTel.classList.add("border");
        warningTel.classList.add("border-danger");
        isValid = false;
    } else {
        warningTel.classList.remove("border");
        warningTel.classList.remove("border-danger");
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
        warningEmail.classList.add("border");
        warningEmail.classList.add("border-danger");
        isValid = false;
    } else {
        warningEmail.classList.remove("border");
        warningEmail.classList.remove("border-danger");
    }


    if (!terms) {
        warningTerms.classList.add("border");
        warningTerms.classList.add("border-danger");
        isValid = false;
    } else {
        warningTerms.classList.remove("border");
        warningTerms.classList.remove("border-danger");
    }


    return isValid
}

/**funzione per mostrare il tipo di sconto
 * @param {string}; valore dell'input
 * @param {object}; elemento da modificare
 * @returns {object}; elemento modificato 
 */

function getDiscountType(age, ageElem) {
    if (age === "Minorenne") {
        ageElem.innerHTML = "Studenti";
    } else if (age === "Over65") {
        ageElem.innerHTML = "GoldenAge";
    } else {
        ageElem.innerHTML = "Intero";
    }
}

/**funzione per lettera maiuscola passeggero
 * @param {string}; input string
 * @returns {string}; stringa modificata
*/
function capitalizeWord(name, surname) {
    const capitalizedName = name[0].toUpperCase() + name.substring(1).toLowerCase();
    const capitalizedSurname = surname[0].toUpperCase() + surname.substring(1).toLowerCase();
    return capitalizedName + " " + capitalizedSurname;
}
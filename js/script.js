//recupero gli Input dal DOM

const inputKm = document.getElementById("km-number");
const inputAge = document.getElementById("age");
const ticketForm = document.querySelector("form");
console.log(inputKm, inputAge, ticketForm);

//al submit stampo in console i dati in ingresso e l'output
ticketForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //salvo in variabili il valore dell'input utente
    const userKm = parseFloat(inputKm.value);
    const userAge = inputAge.value;
    console.log(userKm, userAge);

    //faccio un controllo sull' input utente 
    if (userKm <= 0) {
        alert("Errore: Inserire i Km!");
    }

    //invoco la funzione salvandola in una variabile
    const priceCalc = priceCalculator(userKm, userAge);
    const finalPrice = priceCalc.toFixed(2); 

        //stampo in console il risultato
        console.log(`km = ${userKm}; età = ${userAge}; prezzo = ${finalPrice}€`);

    //ripulisco il form
    ticketForm.reset();
})



//FUNZIONI
// creo una funzione per calcolare il prezzo 

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

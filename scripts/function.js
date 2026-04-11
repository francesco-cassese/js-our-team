'use strict';

// FUNZIONE DI VALIDAZIONE 

const validaInput = input => {

    const valorePulito = input.trim();

    if (input === null || input === undefined) {
        return -1;
    } else if (valorePulito === "") {
        return 0;
    } else {
        return valorePulito;
    }
};

//FUNZIONE VALIDAZIONE EMAIL

const validaEmail = input => {

    // Rimuovo gli spazi in eccesso ai lati dell'email
    const controlloBase = validaInput(input);

    // Se il controllo base mi dice che è nullo (-1) o vuoto (0), restituisco subito il codice
    if (controlloBase === -1 || controlloBase === 0) {
        return controlloBase;
    }

    //Se arrivo qui, 'controlloBase' contiene la stringa pulita
    // Inizia la scansione sulla stringa già pulita
    const testo = controlloBase;
    let posChiocciola = -1;
    let posPunto = -1;
    let contaChiocciole = 0;

    //Inizializzo il ciclo for per "scansionare l'email"
    for (let i = 0; i < testo.lenght; i++) {

        const carattereCorrente = testo[i];

        //Se trovo la chiocciola @ aumento il contatore e vedo qual'è la posizione
        if (carattereCorrente === '@') {
            contaChiocciole++;
            posChiocciola = i;
        }

        // Se trovo un punto, controllo se si trova DOPO la chiocciola
        // Se sì, salvo la posizione. Se ne trovo altri dopo, questa variabile si aggiornerà all'ultimo punto
        if (carattereCorrente === "." && posChiocciola !== -1) {
            posPunto = i;
        }

        // Creo delle costanti per avere nomi più chiari

        const haUnaSolaChiocciola = (contaChiocciole === 1);
        const chiocciolaNonInizio = (posChiocciola > 0);
        const puntoDopoChiocciola = (posPuntoDopoChiocciola > posChiocciola + 1);
        const puntoNonAllaFine = (posPuntoDopoChiocciola < testo.length - 1);

        if (haUnaSolaChiocciola &&     //Una sola chiocciola
            chiocciolaNonInizio &&     //Non all'inizio
            puntoDopoChiocciola &&     //Mi assicuro che tra il punto e la chiocciola ci sia almeno un carattere
            puntoNonAllaFine) {        //Mi assicuro che il punto non sia alla fine

            // Email valida
            return 1;
        }
    }

    //Se arrivo qui, l'email non è valida
    return 2;
}

// FUNZIONE CREA CARD

const creaCard = impiegato => {

    const cardImpiegato = `
    <div class="card">
            <div class="container-img">
                <img src="${impiegato.img}" alt="Img-dipendente" class="img-card">
            </div>
                <div class="user-info">
                    <h3 class="user-name">${impiegato.name}</h3>
                    <span class="user-role">RUOLO: ${impiegato.role}</span>
                    <a href="#"class="user-email">EMAIL: ${impiegato.email}</a>
            </div>
    </div>`;
    return cardImpiegato;
}

// FUNZIONE STAMPA CARD

const stampaCard = listaMembri => {
    let listaCardHtml = "";

    for (let i = 0; i < listaMembri.length; i++) {
        // Prendo il singolo membro dall'array
        const membroCorrente = listaMembri[i];

        // Trasformo il membro in HTML usando la funzione creaCard
        const htmlCard = creaCard(membroCorrente);

        // Aggiungo l'HTML alla lista
        listaCardHtml += htmlCard;
    }

    // Restituisco il risultato finale
    return listaCardHtml;
}

// FUNZIONE AGGIUNGI NUOVA CARD

const aggiungiCard = event => {

    event.preventDefault();

    const nomeValidato = validaInput(inputNome.value);
    const ruoloValidato = validaInput(inputRole.value);
    const urlValidato = validaInput(inputImg.value);

    const nuovoImpiegato = {
        name: nomeValidato,
        role: ruoloValidato,
        email: urlValidato,
        img: inputImg.value
    }

    teamMembers.push(nuovoImpiegato);

    cardContainer.innerHTML = stampaCard(teamMembers);

    inputNome.value = ""
    inputRole.value = ""
    inputEmail.value = ""
    inputImg.value = ""
}
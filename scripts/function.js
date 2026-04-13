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

const validaEmail = (input) => {

    // 1. Pulizia e controllo base (ritorna -1 o 0 se nullo/vuoto)
    const controlloBase = validaInput(input);

    if (controlloBase === -1 || controlloBase === 0) {
        return controlloBase;
    }

    // 2. Analisi del testo pulito
    const testo = controlloBase;
    let posChiocciola = -1;
    let posPunto = -1;
    let contaChiocciole = 0;

    for (let i = 0; i < testo.length; i++) {
        const carattereCorrente = testo[i];

        if (carattereCorrente === '@') {
            contaChiocciole++;
            posChiocciola = i;
        }

        if (carattereCorrente === "." && posChiocciola !== -1) {
            posPunto = i;
        }
    }

    // 3. Verifiche di validità
    const haUnaSolaChiocciola = (contaChiocciole === 1);
    const chiocciolaNonInizio = (posChiocciola > 0);
    const puntoDopoChiocciola = (posPunto > posChiocciola + 1);
    const puntoNonAllaFine = (posPunto < testo.length - 1);

    // 4. Gestione Errori
    if (!haUnaSolaChiocciola) {
        return 1; // Errore: numero di @ non valido
    }

    if (!chiocciolaNonInizio) {
        return 2; // Errore: @ all'inizio
    }

    if (!puntoDopoChiocciola) {
        return 3; // Errore: manca punto dopo @
    }

    if (!puntoNonAllaFine) {
        return 4; // Errore: termina con punto
    }

    // Ritorno l'email pulita (stringa)
    return testo;
};

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
                    <a href="#"class="user-email">${impiegato.email}</a>
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

    // Richiamo le funzioni di validazione e salvo i risultati
    const nomeValidato = validaInput(inputNome.value);
    const ruoloValidato = validaInput(inputRole.value);
    const emailStato = validaEmail(inputEmail.value);
    const urlValidato = validaInput(inputImg.value);

    // Catena di controlli IF / ELSE IF con alert specifici
    if (nomeValidato === 0 || nomeValidato === -1) {
        alert("Errore: Il campo Nome è obbligatorio.");
    }
    else if (ruoloValidato === 0 || ruoloValidato === -1) {
        alert("Errore: Il campo Ruolo è obbligatorio.");
    }
    else if (emailStato === 0 || emailStato === -1) {
        alert("Errore: Il campo Email è obbligatorio.");
    }
    else if (emailStato === 1) {
        alert("L'email deve contenere esattamente una chiocciola (@).");
    }
    else if (emailStato === 2) {
        alert("L'email non può iniziare con una chiocciola (@).");
    }
    else if (emailStato === 3) {
        alert("Manca il punto (.) dopo la chiocciola o non c'è testo tra i due.");
    }
    else if (emailStato === 4) {
        alert("L'email non può terminare con un punto (.).");
    }
    else {
        // SE ARRIVO QUI, TUTTO È CORRETTO
        // Creo l'oggetto usando i valori puliti
        const nuovoImpiegato = {
            name: nomeValidato,
            role: ruoloValidato,
            email: inputEmail.value.trim(),
            img: urlValidato
        };

        // Aggiungo all'array globale
        teamMembers.push(nuovoImpiegato);

        // Richiamo la funzione di stampa per aggiornare il DOM
        cardContainer.innerHTML = stampaCard(teamMembers);

        //resetto tutto 
        inputNome.value = ""
        inputRole.value = ""
        inputEmail.value = ""
        inputImg.value = ""
    }
}
'use strict';

// --- FUNZIONE DI VALIDAZIONE GENERICA ---
const validaInput = input => {
    const valorePulito = input.trim();                                          // Tolgo gli spazi inutili ai bordi

    if (input === null || input === undefined) {                                // Se il dato non esiste proprio
        return -1;                                                              // Ritorno -1 (errore tecnico)
    } else if (valorePulito === "") {                                           // Se dopo la pulizia è vuoto
        return 0;                                                               // Ritorno 0 (campo mancante)
    } else {
        return valorePulito;                                                    // Altrimenti ritorno il testo pulito
    }
};

// --- FUNZIONE VALIDAZIONE EMAIL ---
const validaEmail = input => {
    const controlloBase = validaInput(input);                                   // Riutilizzo la logica di base qui sopra

    if (controlloBase === -1 || controlloBase === 0) {                          // Se è già nulla o vuota
        return controlloBase;                                                   // Esco subito con il codice errore
    }

    const testo = controlloBase;                                                // Lavoro sulla stringa già pulita
    let posChiocciola = -1;                                                     // Preparo la variabile per la pos @
    let posPunto = -1;                                                          // Preparo la variabile per la pos .
    let contaChiocciole = 0;                                                    // Preparo il contatore delle @

    for (let i = 0; i < testo.length; i++) {                                    // Scansiono l'email carattere per carattere
        const carattereCorrente = testo[i];

        if (carattereCorrente === '@') {                                        // Se trovo una chiocciola
            contaChiocciole++;                                                  // La conto
            posChiocciola = i;                                                  // Salvo dove l'ho trovata
        }

        if (carattereCorrente === "." && posChiocciola !== -1) {                // Se trovo un punto DOPO la @
            posPunto = i;                                                       // Salvo/Aggiorno la posizione del punto
        }
    }

    const haUnaSolaChiocciola = (contaChiocciole === 1);                        // Verifico che ci sia solo una @
    const chiocciolaNonInizio = (posChiocciola > 0);                            // Verifico che non sia il primo carattere
    const puntoDopoChiocciola = (posPunto > posChiocciola + 1);                 // Verifico che ci sia testo tra @ e .
    const puntoNonAllaFine = (posPunto < testo.length - 1);                     // Verifico che non sia l'ultimo carattere

    if (!haUnaSolaChiocciola) return 1;                                         // Ritorno 1: errore quantità @
    if (!chiocciolaNonInizio) return 2;                                         // Ritorno 2: @ all'inizio
    if (!puntoDopoChiocciola) return 3;                                         // Ritorno 3: errore dominio/punto
    if (!puntoNonAllaFine) return 4;                                            // Ritorno 4: punto finale errato

    return testo;                                                               // Se tutto è OK, ritorno l'email pulita
};

// --- FUNZIONE CREA CARD ---
const creaCard = (impiegato, indice) => {
    const cardImpiegato = `
    <div class="card">
            <div class="container-img">
                <img src="${impiegato.img}" alt="Img" class="img-card">
            </div>
            <div class="user-info">
                <h3 class="user-name">${impiegato.name}</h3>
                <span class="user-role">RUOLO: ${impiegato.role}</span>
                <a href="#" class="user-email">${impiegato.email}</a> 
                <button class="btn-delete" data-index="${indice}">FIRE</button>      
            </div>
    </div>`;
    return cardImpiegato;                                                       // Genero e restituisco il pezzo di HTML
}

// --- FUNZIONE STAMPA CARD ---
const stampaCard = listaMembri => {
    let listaCardHtml = "";                                                     // Preparo una stringa HTML vuota

    for (let i = 0; i < listaMembri.length; i++) {                              // Ciclo l'array dei membri
        const membroCorrente = listaMembri[i];                                  // Prendo l'impiegato corrente
        const htmlCard = creaCard(membroCorrente, i);                           // Creo la sua card passandogli la posizione
        listaCardHtml += htmlCard;                                              // Attacco la card alla stringa finale
    }

    return listaCardHtml;                                                       // Restituisco l'HTML di tutte le card
}

// --- FUNZIONE AGGIUNGI NUOVA CARD ---
const aggiungiCard = event => {
    event.preventDefault();                                                     // Fermo il caricamento della pagina

    const nomeValidato = validaInput(inputNome.value);                          // Valido il nome
    const ruoloValidato = validaInput(inputRole.value);                        // Valido il ruolo
    const emailStato = validaEmail(inputEmail.value);                          // Valido l'email (stringa o errore)
    const urlValidato = validaInput(inputImg.value);                            // Valido l'URL immagine

    if (nomeValidato === 0 || nomeValidato === -1) {                            // Controllo se il nome manca
        alert("Errore: Il campo Nome è obbligatorio.");
    }
    else if (ruoloValidato === 0 || ruoloValidato === -1) {                     // Controllo se il ruolo manca
        alert("Errore: Il campo Ruolo è obbligatorio.");
    }
    else if (emailStato === 0 || emailStato === -1) {                           // Controllo se l'email manca
        alert("Errore: Il campo Email è obbligatorio.");
    }
    else if (emailStato === 1) alert("Manca la @ o ce ne sono troppe.");        // Alert per codice errore 1
    else if (emailStato === 2) alert("L'email non può iniziare con @.");        // Alert per codice errore 2
    else if (emailStato === 3) alert("Manca il punto dopo la chiocciola.");     // Alert per codice errore 3
    else if (emailStato === 4) alert("L'email non può finire con un punto.");   // Alert per codice errore 4
    else {                                                                      // Se supero tutti i controlli...
        const nuovoImpiegato = {                                                // ...creo l'oggetto del nuovo dipendente
            name: nomeValidato,
            role: ruoloValidato,
            email: emailStato,                                                  // Qui emailStato è sicuramente la stringa
            img: urlValidato
        };

        teamMembers.push(nuovoImpiegato);                                       // Lo aggiungo alla mia lista dati
        cardContainer.innerHTML = stampaCard(teamMembers);                      // Rinfresco la visualizzazione nel browser

        inputNome.value = ""; inputRole.value = "";                             // Pulisco i campi di input del form
        inputEmail.value = ""; inputImg.value = "";                             // (continuo la pulizia)
    }
}

// --- FUNZIONE RIMUOVI CARD ---
const eliminaCard = (indiceDaRimuovere) => {
    teamMembers.splice(indiceDaRimuovere, 1);                                   // Cancello 1 elemento alla posizione scelta
    cardContainer.innerHTML = stampaCard(teamMembers);                          // Ristampo tutto per aggiornare gli indici
    console.log(` rimosso membro all'indice ${indiceDaRimuovere}`);             // Loggo l'operazione in console
}

// --- FUNZIONE DI GESTIONE CLICK ---
const gestisciClickEliminazione = event => {

    const elementoCliccato = event.target;                                      // Mi segno chi ha ricevuto il click

    // Controllo se ho cliccato proprio sul tasto con la classe giusta
    if (elementoCliccato.classList.contains('btn-delete')) {                    // "Se il bersaglio ha la classe btn-delete..."

        // Recupero l'indice dal data-attribute del bottone
        const indice = elementoCliccato.getAttribute('data-index');             // Leggo l'indice salvato nell'HTML
        const indiceNumerico = parseInt(indice);                                // Trasformo la stringa in numero

        // Chiamo la logica di rimozione
        teamMembers.splice(indiceNumerico, 1);                                  // Tolgo l'elemento dall'array globale

        // Aggiorno la lista
        cardContainer.innerHTML = stampaCard(teamMembers);                      // Ristampo le card rimaste

        console.log(`rimosso l'impiegato alla posizione ${indiceNumerico}`); // Loggo eliminazione
    }
}
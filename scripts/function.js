'use strict';

// FUNZIONE DI VALIDAZIONE 

const validaInput = (input) => {

    const valorePulito = input.trim();

    if (input === null || input === undefined) {
        return -1;
    } else if (valorePulito === "") {
        return 0;
    } else {
        return valorePulito;
    }
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
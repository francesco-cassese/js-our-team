'use strict';

// FUNZIONE CREA CARD

const creaCard = impiegato => {

    const cardImpiegato = `
    <div class="card">
                    <div class="container-img">
                        <img src="${impiegato.img}" alt="Img-dipendente" class="img-card">
                    </div>
                    <div class="user-info">
                        <h3>NOME: ${impiegato.name}</h3>
                        <span>RUOLO: ${impiegato.role}</span>
                        <span>EMAIL: ${impiegato.email}</span>
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
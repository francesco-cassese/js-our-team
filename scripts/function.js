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
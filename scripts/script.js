'use strict';

const cardContainer = document.querySelector('.container-cards');
const form = document.querySelector('#form-work-whit-us');
const inputNome = document.querySelector('#input-name');
const inputRole = document.querySelector('#input-role');
const inputImg = document.querySelector('#input-img');
const inputEmail = document.querySelector('#input-email');

cardContainer.innerHTML = stampaCard(teamMembers);                   // Eseguo la prima stampa delle card all'avvio

form.addEventListener('submit', controllaCard);                       // Resto in ascolto del "submit" per aggiungere un impiegato

cardContainer.addEventListener('click', gestisciClickEliminazione);  // Uso l'event delegation per gestire i click sui tasti elimina
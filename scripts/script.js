'use strict';

const cardContainer = document.querySelector('.container-cards');
const form = document.querySelector('#form-work-whit-us');
const inputNome = document.querySelector('#input-name');
const inputRole = document.querySelector('#input-role');
const inputImg = document.querySelector('#input-img');
const inputEmail = document.querySelector('#input-email');

cardContainer.innerHTML = stampaCard(teamMembers);

form.addEventListener('submit', aggiungiCard);
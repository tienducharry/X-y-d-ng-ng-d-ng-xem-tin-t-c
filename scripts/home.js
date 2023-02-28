'use strict'

//lay thong tin user
let currentUser = getFromStorage("current");
//ham luu thong tin user
const storeUser = (x) => saveToStorage("current", x);
//elements

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMess = document.querySelector('#welcome-message');
const btnLogout = document.getElementById('btn-logout');


if (currentUser.length > 0) {
    //an nut login va register
    loginModal.classList.add('hidden');
    welcomeMess.textContent = `Welcome ${currentUser[0].firstName}`;} else {
    //an nut logout
    mainContent.classList.add('hidden');
};


//bat su kien nut logout
btnLogout.addEventListener('click', function(){
    currentUser.pop();
    //update current user sau khi logout
    storeUser(currentUser);
    console.log(currentUser);
    //hien lai button
    mainContent.classList.add('hidden');
    loginModal.classList.remove('hidden');
});



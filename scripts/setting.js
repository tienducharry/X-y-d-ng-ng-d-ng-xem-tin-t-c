'use strict'

let currentUser = getFromStorage('current');
const inputNewsNum = document.getElementById('input-page-size');
const inputCategory = document.getElementById('input-category');
const saveBtn = document.getElementById('btn-submit');

const storeSetting = (x) => saveToStorage("settings", x);
let setArr = getFromStorage('settings') || [];
let users = getFromStorage('users') || [];
console.log(users);
console.log(setArr);

//lay ra vi tri setting trong array
let indexS = 0;
for (let i = 0; i < setArr.length; i++) {
     if(currentUser[0].userName === setArr[i].user)
        indexS = i;
    };

//neu users la moi va chua co settings    
if(users.length > setArr.length) {
    setArr.push([]);
    indexS = (setArr.length-1);
};

//ham luu setting
function saveSetting(){
    const sets = new Setting(
        currentUser[0].userName,inputNewsNum.value, inputCategory.value
    );
        setArr[indexS] = sets;
        storeSetting(setArr); //luu/update setting vao storage
        alert('Saved successful!');
};

//bat su kien click nut save setting
saveBtn.addEventListener('click', saveSetting);


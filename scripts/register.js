'use strict'

//elements
const userArr = getFromStorage("users") || [];
console.log(userArr);
const storeUser = (x) => saveToStorage("users", x);

const submitBtn = document.getElementById('btn-submit');

const inputFirstName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputUserName = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputConfirm = document.getElementById('input-password-confirm');

//tao array username 
let userID =[];
userArr.forEach(element => {
    userID.push(element.userName)
    return userID;
});
console.log(userID);
//bat su kien nut Register
submitBtn.addEventListener('click', function(){
   //lay du lieu tu form
    const data = {
        firstName : inputFirstName.value,
        lastName: inputLastName.value,
        userName: inputUserName.value,
        password: inputPassword.value,
        confirmPass: inputConfirm.value,
    };
    let req = true;
    function validate() {
        //kiem tra k co truong nao bi bo trong
        if(inputFirstName.value === '' || inputLastName.value === '' || inputUserName.value == '' || inputPassword.value === '' || inputConfirm.value === '') {
            alert('Please fill all blank!')
            req = false;} 
        //kiem tra username da su dung chua     
            else {
        if(userID.includes(inputUserName.value)){
           alert('This username have already in use');
           req = false; }
        //kiem tra password co du do dai
        if (inputPassword.value.split('').length < 8) {
            alert('Password must be at least 8 characters!!!')
            req = false;
        }
        //kiem tra password confirm
        if (inputPassword.value !== inputConfirm.value) {
            alert('Password is not correct!')
            req = false;}};
        }
//goi ham de kiem tra
validate();
console.log(req);
    //neu thoa man
    if (req) {
        //tao user moi
        const member = new User(
            inputFirstName.value, 
            inputLastName.value, 
            inputUserName.value, 
            inputPassword.value);
        
        //them user moi vao array    
        userArr.push(member);
        console.log(userArr);
        //luu tru & update userArr trong storage
        storeUser(userArr);
        //chuyen den man hinh login
        window.location = './login.html';
    };
});
'use strict'

const userArr = getFromStorage("users") || [];
const storeUser = (x) => saveToStorage("current", x);
// let userID = [];
// userArr.forEach(el => {
//     userID.push(el.userName)
//     return userID;})
console.log(userArr);

let currentUser;
const inputPassword = document.getElementById('input-password');
const inputUserName = document.getElementById('input-username');

const btnLogin = document.getElementById('btn-submit');

let val = true;

//ham
function submit() {
    //ham kiem tra du lieu
    function validate(){
        if(inputUserName.value === '') {
            alert('Please enter your User name!');
            return false;
        }
        else if ((inputPassword.value === '')) {
            alert('Please enter your password!');
            return false;
        };
    };
    // loc user phu hop
    currentUser = userArr.filter(a => 
        a.userName === inputUserName.value 
        && a.password ===  inputPassword.value);
    console.log(currentUser);
    
    //neu co user phu hop
    if(currentUser.length > 0) {
        storeUser(currentUser); // luu current User vao storage
        window.location = '../index.html' // chuyen toi home
    } else // neu khong co user phu hop thi bao loi
    {
        alert('Your username or password is incorrect!!');
    };
}

//bat su kien nut submit
btnLogin.addEventListener('click', submit);

//bat su kien enter
inputPassword.addEventListener('keydown', function(e){
    if (e.key === 'Enter') submit()
});
inputUserName.addEventListener('keydown', function(e){
    if (e.key === 'Enter') submit()
});


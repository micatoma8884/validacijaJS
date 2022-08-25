
//uzima elemente iz html-a preko f-je query i stavlja u promenljive
const form = document.querySelector('#create-account-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
//na formu kaci eventlistener, klikom na submit poziva se f-ja valideteForm. Uslov- ako je forma tacna, ??
form.addEventListener('submit', (event)=>{
    event.preventDefault();

    validateForm()

    if(isFormValid == true){
form.submit();
    }else{
        event.preventDefault();
    }
});
// u telu f-je pravimo promeljivu i u nnju stavljamo element iz forme - ovo je div element (input-group), 
//ali je div u okviru forme. Pravimo promenljivu result koja ima vrednost true. Prolazimo kroz niz divova
//i proverava se da li neki div ima css klasu sa nayivom error i onda 
function isFormValid(){
const inputContainers = form.querySelectorAll('.input-group');
let result = true;
inputContainers.forEach((container)=>{
    if(container.classList.contains('error')){
        result=false;
    }
} );
     return result;
}


//u telu f-je validateForm imamo uslov. Ako je vrednost inputa prazno polje, poziva f-ju setError(setuj gresku)
//klikom na submit ispid ovog inputa ce da stoji "name can be..."
//osim ako je vrednost duzine inputa manja od 5 ili veca od 15 karaktera
//onda ce klikom na submit da se pojavi "name must..."
//a ako nista od toga onda poziva f/ju setSuccess
function validateForm(){
    if(usernameInput.value.trim() ==''){
        setError(usernameInput, 'Name can not be empty');
    }else if(usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15){
        setError(usernameInput, 'Name must be min 5 and max 15 karaktera');
    }else{
        setSuccess(usernameInput);
    }
//ovde sve isto kao gore, ako je vrednost inputa prazno polje, poyiva se f-ja setError
//osim ako je vrednost email-a validan email, poyiva se f-ja setSuccess-(skroz dole je f-ja)
//a ako nije, onda se poziva f-ja setError
    if(emailInput.value.trim() == ''){
        setError(emailInput, 'Provide email addresse');
    }else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput);
    }else{
        setError(emailInput, 'Provide valide email address');
    }
//sve isto
    if(passwordInput.value.trim()==''){
        setError(passwordInput, 'Password can not be empty');
    }else if(passwordInput.value.trim().length <6 || passwordInput.value.trim().length >20){
        setError(passwordInput, 'Password min 6 max 20 charecters');
    }else {
        setSuccess(passwordInput);


        if(confirmPasswordInput.value.trim()==''){
            setError(confirmPasswordInput, 'Password can not be empty');
        }else if(confirmPasswordInput.value !== passwordInput.value){
            setError(confirmPasswordInput, 'Password does not match');
        }else {
            setSuccess(confirmPasswordInput);
        }
}} 
//f-ja setError ima dva parametra, uyimamo parent element od inputa(element) a to je div, 
//ako parent (div), ima css klasu sa nazivom success, onda nema error
function setError(element, errorMessage){
    const parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    //parent elementu dodajemo css klasu i dodajemo nayiv error
    //
    parent.classList.add('error');
    const paragraf = parent.querySelector('p');
    paragraf.textContent = errorMessage;
}
// f-ja setSuccess - uzimamo parent element od od elementa(div), ako parent element ima css klasu sa nazivom error, 
//onda je sucess tj dodaj css klasu sa nayivom success
function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}
// f-ja isEmailValid, parametar emil, stvaramo promenljivu reg koja ima vrednost neke adrese. Prilikom poyiva ove f-je
//vraca tu adresu tj taj email
function isEmailValid(email){
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}
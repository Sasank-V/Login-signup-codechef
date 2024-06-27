const email = document.querySelector(".email");
const pass = document.querySelector(".pass");
const remChk = document.querySelector(".rem-check");
const submit = document.querySelector(".login");
const showPass = document.querySelector(".show-pass");

const isValidEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidPass = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(pass);
}

submit.addEventListener("click",()=>{
    let userEmail = email.value;
    let userPass = pass.value;
    let remCheck = remChk.checked;

    let emailCheck = isValidEmail(userEmail);
    let passCheck = isValidPass(userPass);
    
    let eparDiv = email.parentElement.parentElement; 
    if(!emailCheck){
        if(!eparDiv.children[2]){
            let warn = document.createElement("h3");
            warn.innerText = "Enter a valid Email ID"
            warn.classList.add("text-red-400","font-semibold");
            eparDiv.append(warn);
        }
    }
    let pparDiv = pass.parentElement.parentElement.parentElement;
    if(!passCheck){
        if(!pparDiv.children[2]){
            let warn = document.createElement("h3");
            warn.innerText = "Enter a valid password";
            warn.classList.add("text-red-400","font-semibold");
            pparDiv.append(warn);
        }
    }
    email.value = "";
    pass.value = "";
    if(passCheck && emailCheck){
        if(eparDiv.children[2] || pparDiv.children[2]){
            eparDiv.removeChild(eparDiv.lastChild);
            pparDiv.removeChild(pparDiv.lastChild);
        }
        console.log("User Email :",userEmail);
        console.log("User Password :",userPass);
        console.log("Remember Me: ",remCheck);
    }
});

showPass.addEventListener("mousedown",()=>{
    pass.type = "text";
})
showPass.addEventListener("mouseup",()=>{
    pass.type = "password";
})
showPass.addEventListener("mouseout",()=>{
    pass.type = "password";
})



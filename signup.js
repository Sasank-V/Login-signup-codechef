const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const pass = document.querySelector(".pass");
const conPass = document.querySelector(".conPass");
const submit = document.querySelector(".signup");

const isValidEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidPass = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(pass);
}

const isValidPhone = (phoneNo) =>{
    const regex = /^\+91[6-9]\d{9}$/;
    return regex.test(phoneNo);
}

const createWarn =(error)=>{
    let warn = document.createElement("h3");
    warn.innerText = "Enter a valid "+error;
    warn.classList.add("text-red-400","font-semibold");
    return warn;
}

const clearAllValues = ()=>{
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    phone.value = "";
    pass.value = "";
    conPass.value = "";
}

const showSuccess = ()=>{
    let success = document.createElement("h3");
    success.innerHTML = "<h3>Your account has been created successfully<br>Log in to continue</h3>";
    success.classList.add("text-green-500","font-semibold","text-center");
    submit.parentElement.append(success);
}

const checkAtSubmit = ()=>{
    let first = firstName.value;
    let last = lastName.value;
    let phoneNo = phone.value;
    let emailId = email.value;
    let passwd = pass.value;
    let conPasswd = conPass.value;

    let checkEmail = isValidEmail(emailId);
    let checkPass = isValidPass(passwd);
    let checkPhone = isValidPhone(phoneNo);

    let namePar = firstName.parentElement.parentElement.parentElement;
    let emailPar = email.parentElement.parentElement;
    let phonePar = phone.parentElement.parentElement;
    let passPar = pass.parentElement.parentElement;
    let conPassPar = conPass.parentElement.parentElement;

    if(!first || !last){
        if(!namePar.children[2]){
            namePar.append(createWarn("name"));
        }
    }
    
    if(!checkEmail){
        if(!emailPar.children[2]){
            emailPar.append(createWarn("email id"));
        }
    }
    if(!checkPhone){
        if(!phonePar.children[2]){
            phonePar.append(createWarn("phone number"));
        }
    }
    if(!checkPass){
        if(!passPar.children[2]){
            passPar.append(createWarn("password"));
        }
    }
    if(passwd != conPasswd){        
        let warn = document.createElement("h3");
        warn.innerText = "Passwords don't match";
        warn.classList.add("text-red-400","font-semibold");
        if(!conPassPar.children[2]){
            conPassPar.append(warn);
        }
        
    }

    if(checkEmail && checkPass && checkPhone && passwd === conPasswd){
        for(par of [namePar,emailPar,passPar,phonePar,conPassPar]){
            if(par.children[2]){
                par.removeChild(par.lastChild);
            }
        }
        console.log("Full Name :",first,last);
        console.log("Email ID :",emailId);
        console.log("Phone No :",phoneNo);
        console.log("Password: ",passwd);
        clearAllValues();
        showSuccess();
    }
}

submit.addEventListener("click",checkAtSubmit);


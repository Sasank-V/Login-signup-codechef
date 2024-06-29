const firstName = document.querySelector(".firstName");
const lastName = document.querySelector(".lastName");
const email = document.querySelector(".email");
const phone = document.querySelector(".phone");
const pass = document.querySelector(".pass");
const conPass = document.querySelector(".conPass");
const submit = document.querySelector(".signup");

const namePar = firstName.parentElement.parentElement.parentElement;
const emailPar = email.parentElement.parentElement;
const phonePar = phone.parentElement.parentElement;
const passPar = pass.parentElement.parentElement;
const conPassPar = conPass.parentElement.parentElement;

const checkName = (name)=>{
    if (!name) {
        return { valid: false, message: "Name cannot be empty." };
    }
    const namePattern = /^[a-zA-Z\s-]+$/;
    if (!namePattern.test(name)) {
        return { valid: false, message: "Name can only contain letters, spaces, and hyphens." };
    }
    if (name.length < 1 || name.length > 50) {
        return { valid: false, message: "Name must be between 1 and 50 characters long." };
    }
    return { valid: true, message: "Name is valid." };
}

const isValidEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidPass = (password) => {
    if (password.length < 8) {
        return {valid : false , msg: "Password must be at least 8 characters long"};
    }
    if (!/[A-Z]/.test(password)) {
        return {valid : false , msg : "Password must contain at least one uppercase letter"};
    }
    if (!/[a-z]/.test(password)) {
        return {valid:false , msg :"Password must contain at least one lowercase letter"};
    }
    if (!/\d/.test(password)) {
        return {valid :false , msg :"Password must contain at least one digit."};
    }
    if (!/[@$!%*?&#]/.test(password)) {
        return {valid:false, msg :"Password must contain at least one special character."};
    }

    return { valid: true,msg: "Password is valid."};
        
}

const isValidPhone = (phoneNo) =>{
    const phonePattern = /^\+91[0-9]+$/;
    if (!phonePattern.test(phoneNo)) {
        return { valid: false, msg: "Phone number can only contain digits and +." };
    }
    const regex = /^\+91[6-9]\d{9}$/;
    if(regex.test(phoneNo)){
        return {valid:true , msg:"Valid Phone number"}
    }
    return {valid:false , msg : "Invalid phone number"}
}

const createWarn =(msg)=>{
    let warn = document.createElement("h3");
    warn.innerText = msg;
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
    let details = document.querySelector(".details");
    let otherInp = document.querySelector(".other-inp");
    
    let success = document.createElement("h3");
    success.innerHTML = "<h3>Your account has been created successfully<br>Log in to continue</h3>";
    success.classList.add("text-green-500","font-bold","text-center","text-xl");
    
    let contDiv = document.createElement("div");
    let login = document.createElement("button");
    login.innerText = "Login";
    login.addEventListener("click",()=>{
        window.location.href = "/index.html";
    });
    login.classList.add("py-3", "bg-blue-500", "text-white", "w-96", "rounded-3xl","font-bold","text-xl" ,"hover:bg-green-600", "active:bg-green-950");
    contDiv.append(login);
    contDiv.classList.add("flex","justify-center","items-center","mt-5");

    details.insertAdjacentElement("beforebegin",success);
    details.insertAdjacentElement("afterend",contDiv);
    details.classList.add("hidden");
}


for(let name of [firstName,lastName]){
    name.addEventListener("input",()=>{
        let {valid,message} = checkName(name.value);
        if(!valid){
            if(!namePar.children[2]){
                namePar.append(createWarn(message));
            }else{
                namePar.removeChild(namePar.lastChild);
                namePar.append(createWarn(message));
            }
            if(name.classList.contains("bg-green-200")){
                name.classList.remove("bg-green-200");
            }
        }else{
            if(namePar.children[2]){
                namePar.removeChild(namePar.lastChild);
            }
            name.classList.add("bg-green-200");
            name.parentElement.classList.add("bg-green-200");
        }
    })
}

email.addEventListener("input",()=>{
    if(!isValidEmail(email.value)){
        if(!emailPar.children[2]){
            emailPar.append(createWarn("Enter a valid email id"));
        }
        if(email.classList.contains("bg-green-200")){
            email.classList.remove("bg-green-200");
            email.parentElement.classList.remove("bg-green-200")
        }
    }else{
        if(emailPar.children[2]){
            emailPar.removeChild(emailPar.lastChild);
        }
        email.parentElement.classList.add("bg-green-200")
        email.classList.add("bg-green-200")
    }
});

phone.addEventListener("input",()=>{
    let {valid,msg} = isValidPhone(phone.value); 
    if(!valid){
        if(!phonePar.children[2]){
            phonePar.append(createWarn(msg));
        }else{
            phonePar.removeChild(phonePar.lastChild);
            phonePar.append(createWarn(msg));
        }
        if(phone.classList.contains("bg-green-200")){
            phone.classList.remove("bg-green-200");
            phone.parentElement.classList.remove("bg-green-200")
        }
    }else{
        if(phonePar.children[2]){
            phonePar.removeChild(phonePar.lastChild);
            phone.parentElement.classList.add("bg-green-200")
            phone.classList.add("bg-green-200")
        }
    }
});

pass.addEventListener("input",()=>{
    let {valid,msg} = isValidPass(pass.value);
    if(!valid){
        if(!passPar.children[2]){
            passPar.append(createWarn(msg));
        }else{
            passPar.removeChild(passPar.lastChild);
            passPar.append(createWarn(msg));
        }
        if(pass.classList.contains("bg-green-200")){
            pass.classList.remove("bg-green-200");
            pass.parentElement.classList.remove("bg-green-200")
        }
    }else{
        if(passPar.children[2]){
            passPar.removeChild(passPar.lastChild);
            pass.parentElement.classList.add("bg-green-200")
            pass.classList.add("bg-green-200")
        }
    }
});

conPass.addEventListener("input",()=>{
    let msg = "Passwords don't match";
    if(conPass.value != pass.value || !pass.value){
        if(!conPassPar.children[2]){
            conPassPar.append(createWarn(msg));
        }
        if(conPass.classList.contains("bg-green-200")){
            conPass.parentElement.classList.remove("bg-green-200")
            conPass.classList.remove("bg-green-200")
        }
    }else{
        if(conPassPar.children[2]){
            conPassPar.removeChild(conPassPar.lastChild);
            conPass.parentElement.classList.add("bg-green-200")
            conPass.classList.add("bg-green-200")
        }
    }
})


const checkAtSubmit = ()=>{
    let validName = checkName(firstName.value).valid && checkName(lastName.value).valid;
    let checkEmail = isValidEmail(email.value);
    let checkPass= isValidPass(pass.value).valid;
    let checkPhone = isValidPhone(phone.value).valid;
    let matchPass = (conPass.value == pass.value && pass);

    if(!validName){
        if(!namePar.children[2]){
            namePar.append(createWarn("Name can't be empty"));
        }
    }
    
    if(!checkEmail){
        if(!emailPar.children[2]){
            emailPar.append(createWarn("Enter a valid email id"));
        }
    }
    if(!checkPhone){
        if(!phonePar.children[2]){
            phonePar.append(createWarn("Enter a valid phone number"));
        }
    }
    if(!checkPass){
        if(!passPar.children[2]){
            passPar.append(createWarn("Enter a valid password"));
        }
    }
    if(!matchPass){        
        if(!conPassPar.children[2]){
            conPassPar.append(createWarn("Passwords don't match"));
        }
        
    }

    if(validName && checkEmail && checkPass && checkPhone && matchPass){
        for(par of [namePar,emailPar,passPar,phonePar,conPassPar]){
            if(par.children[2]){
                par.removeChild(par.lastChild);
            }
        }
        console.log("Full Name :",firstName.value,lastName.value);
        console.log("Email ID :",email.value);
        console.log("Phone No :",phone.value);
        console.log("Password: ",pass.value);
        clearAllValues();
        showSuccess();
    }
}
submit.addEventListener("click",checkAtSubmit);


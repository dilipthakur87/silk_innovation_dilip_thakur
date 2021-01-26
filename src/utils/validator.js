const numReg = /^[0-9]+$/

export const validate_email_phone = (input) => {
    console.log(input, " inside validator");
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneReg = /^(984|985|986|974|975|980|981|982|961|988|972|963)\d{7}$/;

    if(numReg.test(input) === false) {
        // it's not phone number
        if(emailReg.test(input) === false) {
            return [false, "email"]
        } else {
            return [true, "email"]
        }
    } else {
        if (phoneReg.test(input) === false) {
            console.log("Phone is Not Correct");
            return [false, "mobile_no"]
        }
        else {
          return [true, "mobile_no"];
        }
    }
    
}
  

export const validate_pin = (pin) => {
    let pinReg = /^(\d{4})$/

    if(numReg.test(pin) === false) {
        return [true, "password"]
    } else {
        if (pinReg.test(pin)) {
            return [true, "pin"];
        } else {
            return [false, "pin"];
        }
    }
}
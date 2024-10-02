const BAD_PASS = "badPassStyle";
const MIDDLE_PASS = "middlePassStyle"
const GOOD_PASS = "goodPassStyle"
export const checkPsdStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 5;
    if(/[a-z]/.test(pass)) strength += 1;
    if(/[A-Z]{2}/.test(pass)) strength += 1;
    if(/[0-9]/.test(pass)) strength += 1;
    if(/[\W_]/.test(pass)) strength += 1;//Спец символы
    strength = (strength / 9) * 100 //0 - 100%
    if (strength <= 61.0)
         return BAD_PASS
    else if (strength > 61.0 && strength <= 70.0)
        return MIDDLE_PASS
    return GOOD_PASS
}
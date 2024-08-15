export const isAlpha = (str) => {
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122)) {
        return false;
      }
    }
    return true;
  };
  
export  const isValidEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
  
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  };
  
 export const isValidPassword = (password) => {
    return password.length >= 8 && password.length <= 12;
  };

export  const isValidMobile = (mobile) => {
    if (mobile.length !== 10) {
      return false;
    }
    const firstDigit = mobile[0];
    return !['0', '1', '2', '3', '4', '5'].includes(firstDigit);
  };


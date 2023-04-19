function validateMobileNumber() {
    var number = document.getElementById('mobileno');
    // Remove any non-numeric characters from the number
    number = number.replace(/\D/g,'');
    
    // Check if the number is a valid mobile number
    if (/^[0-9]{10}$/.test(number)) {
      return true;
    } else {
      return false;
    }
  }
  
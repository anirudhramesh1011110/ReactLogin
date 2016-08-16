var express = require('express');
var router = express.Router();

router.post('/register', function(req, res){
  console.log(req.body);

  var emailM = validateEmail(req.body.email);
  console.log('emailM', emailM);

  var m = validatePassword(req.body.password, req.body.passwordConfirm);
  console.log('passwordm', m);

  if(m === "ok" && emailM == true){
    res.send({status: m, error: 'Thank You for Registering'});
  }else if(m !== "ok" && emailM === true){
    res.send({status: 'error', error: m});
  }else if(m ==="ok" && emailM === false){
    res.send({status: 'error', emailError: 'Please enter valid email'});
  }else{
    res.send({status: 'error', error: m, emailError: 'Please enter valid email'});
  }

});

/*
 * The function validates the password for the following:
 *  1. At least 8 characters in length.
 *  2. At least 1 special character (!, @, #, $, %, ^, &, *).
 *  3. At least 1 uppercase letter.
 *  4. At least 1 lowercase letter.
 *  5. At least 1 number (0-9).
 *
 * @param pass: password
 * @param passConfirm: confirmation password
 * @return validation results of type string
 */
var validatePassword = function(pass, passConfirm) {
  //if (pass.length <= 7) return 
    var errMsg;
    if(pass === passConfirm){
      if(pass.length > 7){
        if(/[!@#$%^&*]/.test(pass)){
          if(/[A-Z]/.test(pass)){
            if(/[a-z]/.test(pass)){
              if(/[0-9]/.test(pass)){
                errMsg = "ok";
              }else{
                 errMsg = "Password must contain some numbers!";
              }
            }else{
              errMsg = "Password must contain some lowercase character!";
            }
          }else{
            errMsg = "Password must contain some uppercase character!";
          }
        }else{
          errMsg = "Password must contain special character!";
        }
      }else{
         errMsg = "Password must be at least 8 characters!";
      }
    }else{
      errMsg = "Passwords don't match!"
    }
    return errMsg;
};

/*
 * Validates string and return true if valid email string. Checks for any
 * combination of characters followed by '@', '.', then characters indicating
 * domain.
 *
 * @param email the email to validateEmail
 * @return true if valid, false otherwise
 */
var validateEmail = function(email){

  var x = email.substring(email.indexOf('.'), email.length);

  if(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
    return true;
  }
  return false;

};


module.exports = router;

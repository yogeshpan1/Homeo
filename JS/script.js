(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });

    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

})(jQuery);

// ====================== VALIDATE FUNCTIONS (Moved outside) ======================
function validate(input) {
    if (input.type === 'email' || input.name === 'email') {
        const regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
        return regex.test(input.value.trim());
    } else {
        return input.value.trim() !== '';
    }
}

function showValidate(input) {
    if (input instanceof jQuery) {
        input.parent().addClass('alert-validate');
    } else {
        input.parentElement.classList.add('alert-validate');
    }
}

function hideValidate(input) {
    if (input instanceof jQuery) {
        input.parent().removeClass('alert-validate');
    } else {
        input.parentElement.classList.remove('alert-validate');
    }
}

// ====================== TOGGLE FORMS ======================
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

// ====================== REDIRECT ON VALID SUBMIT ======================

// Login redirect
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let check = true;
    loginForm.querySelectorAll('.input100').forEach(input => {
        if (!validate(input)) {
            showValidate(input);
            check = false;
        }
    });
    if (check) {
        window.location.href = 'index.html';
    }
});

// Signup redirect
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let check = true;
    signupForm.querySelectorAll('.input100').forEach(input => {
        if (!validate(input)) {
            showValidate(input);
            check = false;
        }
    });

    const privacy = signupForm.querySelector('input[name="privacy"]');
    if (!privacy.checked) {
        check = false;
        alert('You must agree to the Privacy Policy and Terms of Service.');
    }

    if (check) {
        window.location.href = 'index.html';
    }
});

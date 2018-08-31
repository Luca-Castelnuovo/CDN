const CSRFtoken = document.querySelector('#CSRFtoken');
const btnRegister = document.querySelector('#gen_register');
const inputRegister = document.querySelector('#gen_register_email');

btnRegister.addEventListener("click", function() {
    btnRegisterSend.innerHTML = 'Loading';

    $.ajax({
        type: "POST",
        url: '/admin/process.php',
        dataType: "JSON",
        timeout: (2 * 1000),
        data: {
            CSRFtoken: CSRFtoken.value,
            type: 'gen',
            user:  inputRegister.value
        },

        success: function(response) {
            if (response.status) {
                btnRegister.innerHTML = 'Success';
            } else {
                btnRegister.innerHTML = 'Failed';
            }
        },

        error: function() {
            btnRegister.innerHTML = 'Failed';
        }
    });
});

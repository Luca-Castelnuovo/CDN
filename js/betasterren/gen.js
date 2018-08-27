const CSRFtoken = document.querySelector('#CSRFtoken');
const btnRegister = document.querySelector('#gen_register');
const btnRegisterSend = document.querySelector('#gen_register_send');


btnRegister.addEventListener("click", function() {
    btnRegister.innerHTML = '<i class="material-icons left">code</i>Loading...';

    $.ajax({
        type: "POST",
        url: '/admin/process.php',
        dataType: "JSON",
        timeout: (2 * 1000),
        data: {
            CSRFtoken: CSRFtoken.value,
            type: 'gen',
            gen: 'register_code'
        },

        success: function(response) {
            if (response.status) {
                btnRegister.innerHTML = response.url;
            } else {
                btnRegister.innerHTML = '<i class="material-icons left">code</i>Failed, please try again';
            }
        },

        error: function(xhr, ajaxOptions, thrownError) {
            btnRegister.innerHTML = '<i class="material-icons left">code</i>Failed, please try again';
        }
    });
});

btnRegisterSend.addEventListener("click", function() {
    btnRegisterSend.innerHTML = 'Loading';

    $.ajax({
        type: "POST",
        url: '/admin/process.php',
        dataType: "JSON",
        timeout: (2 * 1000),
        data: {
            CSRFtoken: CSRFtoken.value,
            type: 'gen',
            gen: 'register_send',
            user:  document.querySelector('#gen_register_send_user')
        },

        success: function(response) {
            if (response.status) {
                btnRegister.innerHTML = 'Success';
            } else {
                btnRegister.innerHTML = 'Failed';
            }
        },

        error: function(xhr, ajaxOptions, thrownError) {
            btnRegister.innerHTML = 'Failed';
        }
    });
});

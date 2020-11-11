import Swal from 'sweetalert2'
import * as $ from 'jquery'


let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");

});

var ref = location.search.split('ref=')[1] ? location.search.split('ref=')[1] : 'null';

$(document).ready(function () {
    if (ref != 'null') {
        $.ajax({
            url: "/getVal",
            type: "POST",
            data: {
                name: JSON.stringify(ref)
            },
            success: function (response) {
                window.companyID = response.id
                $('#setCompany').html("Willkommen bei " +response.name + ".")
            },
            error: function (error) {
                Swal.fire({
                    title: 'Der Laden ist nicht im System registiert',
                    text: 'Bitte melden Sie sich beim Personal',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    icon: "error",
                })
            }
        })
    }
})
if (ref != 'null') {
    $('#register').on('click', function () {
        if ($('#first_name').val() && $('#last_name').val() && $('#tel').val() && $('#your_email').val() && $('#checkbox').is(':checked')) {
            var req = $.ajax({
                url: "/register",
                type: "POST",
                data: {
                    first_name: JSON.stringify($('#first_name').val()),
                    last_name: JSON.stringify($('#last_name').val()),
                    email: JSON.stringify($('#your_email').val()),
                    tel: JSON.stringify($('#tel').val()),
                    company: JSON.stringify(window.companyID),
                },
                success: function (response) {
                    Swal.fire({
                        title: 'Vielen Dank für die Registrierung',
                        html: $('#first_name').val() + ' ' + $('#last_name').val() +'<br>Mail: ' + $('#your_email').val()+'<br>Tel.: ' + $('#tel').val(),
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        icon: "success",
                    })
                },error: function (error) {
                    console.log(error)
                }
            })
            try {
                $('.warn').hide()
            } catch (e) {
            }
        } else {
            $('.warn').show()
        }
    });
} else {
    Swal.fire({
        title: 'Der Laden ist nicht im System registiert',
        text: 'Bitte melden Sie sich beim Personal',
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: "error",
    })
}

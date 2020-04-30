var loader = {};
loader.show = function () {
    $('#loader').removeClass('d-none');
};
loader.hide = function () {
    $('#loader').addClass('d-none');
};
var login = {};
login.logged = false;
login.check = function () {
    $.ajax({
        type: 'GET',
        url: 'https://entiras.herokuapp.com/',
        success: login.checked,
        error: login.failed
    });
};
login.checked = function () {
    if (login.logged) {
        content.logged();
    } else {
        content.guest();
    }
};
login.failed = function () {
    $('#network-err').removeClass('d-none');
};
var content = {};
content.logged = function () {
    loader.hide();
    $('.logged').removeClass('d-none');
};
content.guest = function () {
    loader.hide();
    $('.guest').removeClass('d-none');
};
$(document).ready(function () {
    loader.show();
    login.check();
});
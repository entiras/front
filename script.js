// loader message
var loader = {};
loader.active = false;
loader.show = function () {
    loader.active = true;
    setTimeout(loader.wait, 500);
};
loader.hide = function () {
    loader.active = false;
    $('#loader').addClass('d-none');
};
loader.wait = function () {
    if (loader.active) {
        $('#loader').removeClass('d-none');
    }
}
// check if logged in
var login = {};
login.logged = false;
login.check = function () {
    $.ajax({
        type: 'GET',
        url: 'https://entiras.herokuapp.com/',
        success: login.checked,
        error: actions.failed
    });
};
login.checked = function () {
    if (login.logged) {
        content.logged();
    } else {
        content.guest();
    }
};
// show content depending on log and view
var content = {};
content.logged = function () {
    loader.hide();
    $('.logged').removeClass('d-none');
};
content.guest = function () {
    loader.hide();
    $('.guest').removeClass('d-none');
};
content.view = function () {
    var url = new URL(window.location.href);
    var route = url.pathname;
    $('title').append(' - ');
    switch (route) {
        case '/':
            $('#home').removeClass('d-none');
            $('title').append('Raíz');
            break;
        case '/signup':
            $('#signup').removeClass('d-none');
            $('title').append('Registro');
            break;
        case '/login':
            $('#login').removeClass('d-none');
            $('title').append('Entrar');
            break;
        default:
            $('#notfound').removeClass('d-none');
            $('title').append('Error');
    }
}
// actions
var actions = {};
actions.failed = function () {
    loader.hide();
    $('#network-err').removeClass('d-none');
};
actions.csrf = function (callback) {
    $.ajax({
        type: 'GET',
        url: 'https://entiras.herokuapp.com/csrf',
        processData: false,
        contentType: false,
        data: data,
        success: callback,
        error: actions.failed
    });
};
actions.signup = function (data) {
    if (data === null) {
        actions.csrf();
    } else {
        console.log(data);
        //var data = new FormData($('#signup-form')[0]);
    }
};
$(document).ready(function () {
    loader.show();
    login.check();
    content.view();
});
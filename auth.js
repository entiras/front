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
    loader.hide();
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
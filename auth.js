var loader = {};
loader.show = function () {
    $('#loader').removeClass('d-none');
}
loader.hide = function () {
    $('#loader').addClass('d-none');
}
$(document).ready(function () {
    loader.show();
    if (login.check()) {
        content.logged();
    } else {
        content.guest();
    }
});
var login = {};
login.check = function () {
    return false;
}
var content = {};
content.logged = function () {
    loader.hide();
    $('.logged').removeClass('d-none');
}
content.guest = function () {
    loader.hide();
    $('.guest').removeClass('d-none');
}
var loader = {};
loader.show = function () {
    $('#loader').removeClass('d-none');
}
loader.hide = function () {
    $('#loader').addClass('d-none');
}
$(document).ready(function () {
    loader.show();
});
var loader={active:!1,show:function(){loader.active=!0;setTimeout(loader.wait,500)},hide:function(){loader.active=!1;$("#loader").addClass("d-none")},wait:function(){loader.active&&$("#loader").removeClass("d-none")}},login={logged:!1,check:function(){var c=Cookies.get("user");void 0===c?login.logged=!1:(login.logged=!0,$("#username").text(c));login.checked()},checked:function(){login.logged?content.logged():content.guest()}},content={logged:function(){$(".logged").removeClass("d-none")},guest:function(){$(".guest").removeClass("d-none")}},
actions={failed:function(){$("#network-err").removeClass("d-none")},csrf:function(c){$.ajax({type:"GET",url:"/api/csrf",success:c,error:actions.failed})},form:function(c){c=$(c).serializeArray();for(var b={},a=0;a<c.length;a++)b[c[a].name]=c[a].value;return b},redirect:function(c){setTimeout(function(b){window.location.href=b},500,c)},logout:function(){actions.csrf(function(c){$("input[name=_csrf]").val(c.token);c=actions.form("#logout");$.ajax({type:"POST",url:"/api/logout",data:c,error:actions.failed,
success:function(b){actions.redirect("/")}})})},login:function(c){c.preventDefault();$("#login :submit").prop("disabled",!0);$(".alert").addClass("d-none");$("input").removeClass("is-invalid");actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#login");$.ajax({type:"POST",url:"/api/login",data:b,error:actions.failed,success:function(a){$("#login :submit").prop("disabled",!1);if("validation"===a.message){var b=a.error.field;$("#"+b+"-"+a.error.validation).removeClass("d-none");
$("input[name="+b+"]").addClass("is-invalid")}else"credentials"===a.message?($("#credentials").removeClass("d-none"),$("input[name=username]").addClass("is-invalid"),$("input[name=password]").addClass("is-invalid")):"unconfirmed"===a.message?$("#unconfirmed").removeClass("d-none"):"logged"===a.message&&($("#logged").removeClass("d-none"),actions.redirect("/"))}})})},signup:function(c){c.preventDefault();$("#signup :submit").prop("disabled",!0);$(".alert").addClass("d-none");$("input").removeClass("is-invalid");
actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#signup");$.ajax({type:"POST",url:"/api/signup",data:b,error:actions.failed,success:function(a){$("#signup :submit").prop("disabled",!1);if("validation"===a.message){var b=a.error.field;$("#"+b+"-"+a.error.validation).removeClass("d-none");$("input[name="+b+"]").addClass("is-invalid")}else"url"===a.message?($("#username-url").removeClass("d-none"),$("input[name=username]").addClass("is-invalid")):"clone"===a.message?($("#clone").removeClass("d-none"),
$("input[name=username]").addClass("is-invalid"),$("input[name=email]").addClass("is-invalid")):"sent"===a.message&&($("#sent").removeClass("d-none"),actions.redirect("/signup/confirm/"))}})})},confirm:function(c){c.preventDefault();$("#confirm :submit").prop("disabled",!0);$(".alert").addClass("d-none");$("input").removeClass("is-invalid");actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#confirm");$.ajax({type:"POST",url:"/api/signup/confirm",data:b,error:actions.failed,
success:function(a){$("#confirm :submit").prop("disabled",!1);"danger"===a.type?$("input[name=token]").addClass("is-invalid"):actions.redirect("/login/");$("#"+a.message).removeClass("d-none")}})})},resend:function(c){c.preventDefault();$("#resend :submit").prop("disabled",!0);$(".alert").addClass("d-none");$("input").removeClass("is-invalid");actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#resend");$.ajax({type:"POST",url:"/api/signup/resend",data:b,error:actions.failed,
success:function(a){$("#resend :submit").prop("disabled",!1);"required"===a.message||"email"===a.message?$("input[name=email]").addClass("is-invalid"):"captcha"===a.message&&$("input[name=captcha]").addClass("is-invalid");$("#"+a.message).removeClass("d-none");"sent"===a.message&&actions.redirect("/signup/confirm/");"sent"!==a.message&&$("#_captcha").attr("src","/api/captcha?"+Math.random())}})})},forgot:function(c){c.preventDefault();$("#forgot :submit").prop("disabled",!0);$(".alert").addClass("d-none");
$("input").removeClass("is-invalid");actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#forgot");$.ajax({type:"POST",url:"/api/login/forgot",data:b,error:actions.failed,success:function(a){$("#forgot :submit").prop("disabled",!1);"required"===a.message||"email"===a.message?$("input[name=email]").addClass("is-invalid"):"captcha"===a.message&&$("input[name=captcha]").addClass("is-invalid");$("#"+a.message).removeClass("d-none");"sent"===a.message&&actions.redirect("/login/reset/");
"sent"!==a.message&&$("#_captcha").attr("src","/api/captcha?"+Math.random())}})})},reset:function(c){c.preventDefault();$("#reset :submit").prop("disabled",!0);$(".alert").addClass("d-none");$("input").removeClass("is-invalid");actions.csrf(function(b){$("input[name=_csrf]").val(b.token);b=actions.form("#reset");console.log(b);$.ajax({type:"POST",url:"/api/login/reset",data:b,error:actions.failed,success:function(a){$("#reset :submit").prop("disabled",!1);"danger"!==a.type&&actions.redirect("/login/");
"required"===a.message||"min"===a.message?$("input[name=password]").addClass("is-invalid"):"invalid"===a.message&&$("input[name=token]").addClass("is-invalid");$("#"+a.message).removeClass("d-none")}})})}};$(document).ready(function(){login.check()});$.ajaxSetup({beforeSend:loader.show,complete:loader.hide});
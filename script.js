const session={user:void 0,init:()=>{session.user=Cookies.get('user'),session.user?($('#username').text(session.user),$('.logged').removeClass('d-none')):$('.guest').removeClass('d-none')}},util={jumbo:async a=>{await new Promise((b,c)=>{const d=new Image;d.onload=b,d.onerror=c,d.src=a}),$('.jumbotron').css('background-image','url('+a+')')},redirect:a=>{setTimeout(a=>{window.location.href=a},500,a)},form:async a=>{await act.csrf();for(var b=$(a).serializeArray(),c={},d=0;d<b.length;d++)c[b[d].name]=b[d].value;return c},alert:a=>{$('#form-alert').addClass('alert-'+a.type),$('#form-alert').removeClass('d-none'),$('#form-alert span').addClass('d-none'),$('#'+a.message+'-'+a.field).removeClass('d-none'),$('input[name='+a.field+']').addClass('is-invalid')},unalert:()=>{$('#form-alert').removeClass('alert-danger'),$('#form-alert').removeClass('alert-success'),$('#form-alert').addClass('d-none'),$('input').removeClass('is-invalid')}},act={fail:()=>{$('#network-err').removeClass('d-none'),$(':submit').prop('disabled',!1)},wait:()=>{$('#loader').removeClass('d-none'),$(':submit').prop('disabled',!0)},end:()=>{$('#loader').addClass('d-none'),$(':submit').prop('disabled',!1)},csrf:async()=>{const a=await $.ajax({type:'GET',url:'/api/csrf'});$('input[name=_csrf]').val(a.token)},login:{main:async a=>{a.preventDefault(),util.unalert();const b=await util.form('#login'),c=await $.ajax({type:'POST',url:'/api/login',data:b});util.alert(c),'success'===c.type&&util.redirect('/')},logout:async a=>{a.preventDefault();const b=await util.form('#logout');await $.ajax({type:'POST',url:'/api/logout',data:b}),util.redirect('/')}}},page={label:void 0,init:()=>{$(':submit').prop('disabled',!1),$('#logout-btn').click(act.login.logout),page.label=$('meta[name=label]').attr('content'),page.label&&(console.log(page.label),page[page.label]())},home:async()=>{await util.jumbo('https://i.imgur.com/duUZ0Tp.jpg')},login:async()=>{$('#login').on('submit',act.login.main),await util.jumbo('https://i.imgur.com/ZiLd6zZ.jpg')}};$(document).ready(()=>{session.init(),page.init()}),$.ajaxSetup({beforeSend:act.wait,complete:act.end,error:act.fail});
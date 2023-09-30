document.onkeydown = function(){
    if(event.keyCode === "13"){
        document.getElementById("login").click();
    }
}


$(function () {
    let headline=[];
    let copyright=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/login/returnImage",
        dataType:'json',
        async:true,
        success:function(data){
            let headline = data.headline[0];
            let copyright = data.copyright[0].replace(/\([^\)]*\)/g,"");
            document.getElementById("copyright").innerHTML="<b>" + headline + "</b>" + "<br>—" + copyright;
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
        }
    });
});
function Login(){
    let formData = $("#LoginForm").serialize();
    let staff_id=document.getElementById('staff_id').value;
    let password=document.getElementById('password').value;
    if(!staff_id || !password){
        round_warning_noti();
        return ;
    }
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/login/AjaxLogin",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                round_error_noti();
            }
            if(data===1){
                round_success_noti();
                setTimeout(function(){
                    window.location.href = "../index/main";
                },2000);
            }
        },
    });
}
function round_error_noti() {
    Lobibox.notify('error', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        delayIndicator: false,
        icon: 'bx bx-x-circle',
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: '登陆失败，请检查用户名及密码！'
    });
}
function round_success_noti() {
    Lobibox.notify('success', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        icon: 'bx bx-check-circle',
        delayIndicator: false,
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: '登陆成功，请等待页面跳转~'
    });
}
function round_warning_noti() {
    Lobibox.notify('warning', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        delayIndicator: false,
        icon: 'bx bx-error',
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: '用户名或密码为空！'
    });
}

//  获取修改信息
function GetUpdateID(id){
    $("#update_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/maintain/getMaintainInfoById",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //  模态框赋值
                $("#update_company").val(data[i].company);
                $("#update_guarantee").val(data[i].guarantee);
                $("#update_paid_index").val(data[i].paid_index);
                $("#update_paid").val(data[i].paid);
                $("#update_maintain_object").val(data[i].maintain_object);
                $("#update_transfer_rate_index").val(data[i].transfer_rate_index);
                $("#update_transfer_rate_complete").val(data[i].transfer_rate_complete);
                $("#update_season_paid_index").val(data[i].season_paid_index);
                $("#update_season_paid").val(data[i].season_paid);
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//  修改保养台量信息
function UpdateMaintainNum(){
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/maintain/updateMaintainNum",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                Alert("修改失败！");
                window.location.reload();
            }
            if(data===1){
                Alert("修改成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
function showTips( content, height, time ){
    //窗口的宽度
    let windowWidth  = $(window).width();
    let tipsDiv = '<div class="tipsClass">' + content + '</div>';
    $( 'body' ).append( tipsDiv );
    $( 'div.tipsClass' ).css({
        'top'       : height + 'px',
        'left'      : ( windowWidth / 2 ) - 350/2 + 'px',
        'position'  : 'absolute',
        'padding'   : '3px 5px',
        'background': '#8FBC8F',
        'font-size' : 12 + 'px',
        'margin'    : '0 auto',
        'text-align': 'center',
        'width'     : '350px',
        'height'    : 'auto',
        'color'     : '#fff',
        'opacity'   : '0.8'
    }).show();
    setTimeout( function(){$( 'div.tipsClass' ).fadeOut();}, ( time * 1000 ) );
}
function Alert(str) {
    let msgw,msgh,bordercolor;
    msgw=150;//提示窗口的宽度
    msgh=80;//提示窗口的高度
    titleheight=25 //提示窗口标题高度
    bordercolor="#336699";//提示窗口的边框颜色
    titlecolor="#99CCFF";//提示窗口的标题颜色
    let sWidth,sHeight;
//获取当前窗口尺寸
    sWidth = document.body.offsetWidth;
    sHeight = document.body.offsetHeight;
// //背景div
    let bgObj=document.createElement("div");
    bgObj.setAttribute('id','alertbgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="#E8E8E8";
    bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.6";
    bgObj.style.left="0";
    bgObj.style.width = sWidth + "px";
    bgObj.style.height = sHeight + "px";
    bgObj.style.zIndex = "10000";
    document.body.appendChild(bgObj);
//创建提示窗口的div
    let msgObj = document.createElement("div")
    msgObj.setAttribute("id","alertMsgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.background="white";
    msgObj.style.border="1px solid " + bordercolor;
    msgObj.style.position = "absolute";
    msgObj.style.left = "50%";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
//窗口距离左侧和顶端的距离
    msgObj.style.marginLeft = "-225px";
//窗口被卷去的高+（屏幕可用工作区高/2）-150
    msgObj.style.top = document.body.scrollTop+(window.screen.availHeight/2)-150 +"px";
    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.textAlign = "center";
    msgObj.style.lineHeight ="25px";
    msgObj.style.zIndex = "10001";
    document.body.appendChild(msgObj);
//提示信息标题
    let title=document.createElement("h4");
    title.setAttribute("id","alertmsgTitle");
    title.setAttribute("align","left");
    title.style.margin="0";
    title.style.padding="3px";
    title.style.background = bordercolor;
    title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
    title.style.opacity="0.75";
    title.style.border="1px solid " + bordercolor;
    title.style.height="18px";
    title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.color="white";
    title.innerHTML="提示信息";
    document.getElementById("alertMsgDiv").appendChild(title);
//提示信息
    let txt = document.createElement("p");
    txt.setAttribute("id","msgTxt");
    txt.style.margin="16px 0";
    txt.innerHTML = str;
    document.getElementById("alertMsgDiv").appendChild(txt);
//设置关闭时间
    window.setTimeout("closewin()",1000);
}
function closewin() {
    document.body.removeChild(document.getElementById("alertbgDiv"));
    document.getElementById("alertMsgDiv").removeChild(document.getElementById("alertmsgTitle"));
    document.body.removeChild(document.getElementById("alertMsgDiv"));
}
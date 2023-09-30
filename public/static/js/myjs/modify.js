$(function () {
    $('#d_drawing_rec_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#d_drew_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#d_drew_review_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#d_drew_upload_time').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });

});
//多选框赋值到input
$('#m_modify_type').on('changed.bs.select', function(e) {
    $("#modify_type").val($(this).val());
});
//获取图纸编辑ID
function GetEditDrawingID(id){
    $("#modify_edit_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/modify/GetModifyInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#edit_modify_id").val(data[i].modify_id);
                $("#modify_type").val(data[i].modify_type);
                let drawing_status=data[i].drawing_status;
                if(drawing_status==='已上传'){
                    document.getElementById("e_modify_num").readOnly=true;
                    document.getElementById("e_plus_num").readOnly=true;
                    document.getElementById("e_model_change_num").readOnly=true;
                }

                $("#e_modify_num").val(data[i].modify_num);
                $("#e_plus_num").val(data[i].plus_num);
                $("#e_model_change_num").val(data[i].model_change_num);
                //出图备注
                $("#e_drew_people_remarks").val(data[i].drew_people_remarks);
                //上传备注
                $("#e_upload_remarks").val(data[i].upload_remarks);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//编辑备注信息
function EditDrawing(){
    let formData = $("#EditDrawingForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/EditDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("修改失败！");
                window.location.reload();
            }
            if(data===1){
                alert("修改成功！");
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
//获取指派修改单ID
function GetAssignmentID(id){
    $("#modify_assignment_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/modify/GetModifyInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#d_modify_id").val(data[i].modify_id);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//指派修改单
function Assignment(){
    let drawing_rec_date=document.getElementById('drawing_rec_date').value;
    if(!drawing_rec_date){
        alert('资料接收日期不能为空！');
        document.getElementById('drawing_rec_date').focus();
        document.getElementById('drawing_rec_date').select();
        return ;
    }
    let formData = $("#AssignmentForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/Assignment",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("指派失败！");
                window.location.reload();
            }
            if(data===1){
                alert("指派成功！");
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
//获取出图ID
function GetDrewID(id){
    $("#modify_drew_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/modify/GetModifyInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#drew_modify_id").val(data[i].modify_id);
                //出图日期
                let $drew_date=data[i].drew_date;
                let drew_date = document.getElementById("drew_date");
                if(!drew_date || drew_date==='0000-00-00'){
                    $("#drew_date").val('');
                }else{
                    $("#drew_date").val(data[i].drew_date);
                }
                //图纸张数
                $("#drawing_num").val(data[i].drawing_num);
                //图纸版本
                $("#drew_version").val(data[i].drew_version);
                //出图备注
                $("#drew_people_remarks").val(data[i].drew_people_remarks);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//出图
function Drew(){
    let drew_date=document.getElementById('drew_date').value;
    let drawing_num=document.getElementById('drawing_num').value;
    if(!drew_date){
        alert('出图日期不能为空！');
        document.getElementById('drew_date').focus();
        document.getElementById('drew_date').select();
        return ;
    }
    if(!drawing_num){
        alert('图纸张数不能为空！');
        document.getElementById('drawing_num').focus();
        document.getElementById('drawing_num').select();
        return ;
    }
    let formData = $("#DrewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/Drew",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("出图失败！");
                window.location.reload();
            }
            if(data===1){
                alert("出图成功！");
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
//获取图纸校审ID
function GetReviewDrawingID(id){
    $("#modify_review_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/modify/GetModifyInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#review_modify_id").val(data[i].modify_id);
                //校审日期
                let drew_review_date = document.getElementById("drew_review_date");
                if(!drew_review_date || drew_review_date==='0000-00-00'){
                    $("#drew_review_date").val('');
                }else{
                    $("#drew_review_date").val(data[i].drew_review_date);
                }
                //准确率
                $("#proof_accuracy_rate").val(data[i].proof_accuracy_rate);
                //审核备注
                $("#drew_review_remarks").val(data[i].drew_review_remarks);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//校审
function ReviewDrawing(){
    let drew_review_date=document.getElementById('drew_review_date').value;
    if(!drew_review_date){
        alert('校审日期不能为空！');
        document.getElementById('drew_review_date').focus();
        document.getElementById('drew_review_date').select();
        return ;
    }
    let formData = $("#ReviewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/ReviewDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("校审失败！");
                window.location.reload();
            }
            if(data===1){
                alert("校审完成！");
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
//获取图纸上传ID
function GetUploadDrawingID(id){
    $("#modify_upload_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/modify/GetModifyInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#upload_modify_id").val(data[i].modify_id);
                //上传位置
                $("#drew_position").val(data[i].drew_position);
                //校审日期
                let drew_upload_time = document.getElementById("drew_upload_time");
                if(!drew_upload_time || drew_upload_time==='0000-00-00'){
                    $("#drew_upload_time").val('');
                }else{
                    $("#drew_upload_time").val(data[i].drew_upload_time);
                }
                //上传备注
                $("#upload_remarks").val(data[i].upload_remarks);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//上传
function UploadDrawing(){
    let drew_position=document.getElementById('drew_position').value;
    let drew_upload_time=document.getElementById('drew_upload_time').value;
    if(!drew_position){
        alert('存放位置不能为空！');
        document.getElementById('drew_position').focus();
        document.getElementById('drew_position').select();
        return ;
    }
    if(!drew_upload_time){
        alert('上传日期不能为空！');
        document.getElementById('drew_upload_time').focus();
        document.getElementById('drew_upload_time').select();
        return ;
    }
    let formData = $("#UploadDrawingForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/UploadDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("上传失败！");
                window.location.reload();
            }
            if(data===1){
                alert("上传完成！");
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
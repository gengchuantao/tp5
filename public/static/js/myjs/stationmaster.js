
//  模态框加载时渲染
$(function () {
    //区域赋值
    let  $Company=$("#company");
    $Company.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/staff/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $Company.append($option);
                $('#company').selectpicker('refresh');
                $('#company').selectpicker('render');
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
});
//  新增保养站
function AddNew() {
    let station_name=document.getElementById('station_name').value;
    let stationmaster_id=document.getElementById('stationmaster_id').value;
    if(!station_name){
        alert('保养站名不能为空！');
        document.getElementById('station_name').focus();
        document.getElementById('station_name').select();
        return ;
    }
    if(!stationmaster_id){
        alert('站长工号不能为空！');
        document.getElementById('stationmaster_id').focus();
        document.getElementById('stationmaster_id').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/stationmaster/newStationmaster",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("添加失败！");
            }
            if(data===1){
                alert("添加成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//  获取删除ID
function GetDeleteID(id) {
    $("#delete_id").val(id);
}
//  删除保养站
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/stationmaster/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("删除失败！");
                return false;
            }
            if(data===1){
                alert("删除成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            //  当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("状态:"+xhr.readyState);
        }
    });
}
//  获取保养站信息
function GetUpdateID(id){
    $("#update_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/stationmaster/getStationmasterInfo",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //  模态框赋值
                $("#update_station_name").val(data[i].station_name);
                $("#update_company").val(data[i].company);
                $("#update_stationmaster_name").val(data[i].stationmaster_name);
                $("#update_stationmaster_id").val(data[i].stationmaster_id);
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//  修改保养站信息
function UpdatePost(){
    let update_id=document.getElementById('update_id').value;
    let update_company=document.getElementById('update_company').value;
    let update_stationmaster_name=document.getElementById('update_stationmaster_name').value;
    let update_stationmaster_id=document.getElementById('update_stationmaster_id').value;

    if(!update_company){
        alert('区域不能为空！');
        document.getElementById('update_company').focus();
        document.getElementById('update_company').select();
        return ;
    }
    if(!update_stationmaster_name){
        alert('站长不能为空！');
        document.getElementById('update_stationmaster_name').focus();
        document.getElementById('update_stationmaster_name').select();
        return ;
    }
    if(!update_stationmaster_id){
        alert('站长工号不能为空！');
        document.getElementById('update_stationmaster_id').focus();
        document.getElementById('update_stationmaster_id').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/stationmaster/Edit",
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
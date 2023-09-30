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
                $("#update_repair_sale_index").val(data[i].repair_sale_index);
                $("#update_repair_sale").val(data[i].repair_sale);
                $("#update_repair_income_index").val(data[i].repair_income_index);
                $("#update_repair_income").val(data[i].repair_income);
                $("#update_repair_history_arrears_index").val(data[i].repair_history_arrears_index);
                $("#update_repair_history_arrears_complete").val(data[i].repair_history_arrears_complete);
                $("#update_m0_index").val(data[i].m0_index);
                $("#update_m0_complete").val(data[i].m0_complete);
                $("#update_maintenance_reform_income_index").val(data[i].maintenance_reform_income_index);
                $("#update_maintenance_reform_income_complete").val(data[i].maintenance_reform_income_complete);
                $("#update_repair_history_arrears_season_index").val(data[i].repair_history_arrears_season_index);
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//  修改保养业务信息
function UpdateMaintainRepair(){
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/maintain/updateMaintainRepair",
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
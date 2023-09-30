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
                $("#update_paid_output_value_index").val(data[i].paid_output_value_index);
                $("#update_paid_output_value_complete").val(data[i].paid_output_value_complete);
                $("#update_maintain_sale_index").val(data[i].maintain_sale_index);
                $("#update_maintain_sale").val(data[i].maintain_sale);
                $("#update_maintain_income_index").val(data[i].maintain_income_index);
                $("#update_maintain_income").val(data[i].maintain_income);
                $("#update_maintain_cost_rate_index").val(data[i].maintain_cost_rate_index);
                $("#update_maintain_cost_rate_complete").val(data[i].maintain_cost_rate_complete);
                $("#update_maintain_history_arrears_index").val(data[i].maintain_history_arrears_index);
                $("#update_maintain_history_arrears_complete").val(data[i].maintain_history_arrears_complete);
                $("#update_after_service_income_index").val(data[i].after_service_income_index);
                $("#update_after_service_income_complete").val(data[i].after_service_income_complete);
                $("#update_maintenance_history_recovery_index").val(data[i].maintenance_history_recovery_index);
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
function UpdateMaintainBusiness(){
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/maintain/updateMaintainBusiness",
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
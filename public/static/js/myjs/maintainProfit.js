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
                $("#update_begin_guarantee_ave_year").val(data[i].begin_guarantee_ave_year);
                $("#update_guarantee_ave_year").val(data[i].guarantee_ave_year);
                $("#update_new_ave_year").val(data[i].new_ave_year);
                $("#update_maintain_cost_single").val(data[i].maintain_cost_single);
                $("#update_gross_profit_margin").val(data[i].gross_profit_margin);
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
function UpdateProfit(){
    let formData = $("#editProfitForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/maintain/profitEdit",
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
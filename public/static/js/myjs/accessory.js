function AddNew(){
    let accessory_contract_id=document.getElementById('accessory_contract_id').value;
    let buyer_unit=document.getElementById('buyer_unit').value;
    let contract_num=document.getElementById('contract_num').value;
    let distributor=document.getElementById('distributor').value;
    let subcontract_amount=document.getElementById('subcontract_amount').value;
    if(!accessory_contract_id){
        alert('配套合同号不能为空！');
        document.getElementById('accessory_contract_id').focus();
        document.getElementById('accessory_contract_id').select();
        return ;
    }
    if(!buyer_unit){
        alert('买方单位不能为空！');
        document.getElementById('buyer_unit').focus();
        document.getElementById('buyer_unit').select();
        return ;
    }
    if(!contract_num){
        alert('合同台量不能为空！');
        document.getElementById('contract_num').focus();
        document.getElementById('contract_num').select();
        return ;
    }
    if(!distributor){
        alert('经销商不能为空！');
        document.getElementById('distributor').focus();
        document.getElementById('distributor').select();
        return ;
    }
    if(!subcontract_amount){
        alert('分包金额不能为空！');
        document.getElementById('subcontract_amount').focus();
        document.getElementById('subcontract_amount').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/accessory/NewAccessory",
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
//获取删除ID
function GetDeleteID(id) {
    $("#delete_id").val(id);
    console.log(id);
}
//删除项目
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/accessory/Delete",
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
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//获取更新ID
function getAccessoryEditID(id){
    $("#accessory_edit_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/accessory/GetAccessoryInfo",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                $("#update_accessory_contract_id").val(data[i].accessory_contract_id);
                $("#update_company").val(data[i].company);
                $("#update_buyer_unit").val(data[i].buyer_unit);
                $("#update_contract_num").val(data[i].contract_num);
                $("#update_distributor").val(data[i].distributor);
                $("#update_subcontract_amount").val(data[i].subcontract_amount);
                $("#update_entrust_id").val(data[i].entrust_id);
                $("#update_approval_value").val(data[i].approval_value);
                $("#update_payment_amount").val(data[i].payment_amount);
                $('#update_subcontract_status').selectpicker('val',data[i].subcontract_status);//设置选中
                $('#update_subcontract_status').selectpicker('refresh');
                $('#update_approval_status').selectpicker('val',data[i].approval_status);//设置选中
                $('#update_approval_status').selectpicker('refresh');
                $('#update_subcontract_sign_status').selectpicker('val',data[i].subcontract_sign_status);//设置选中
                $('#update_subcontract_sign_status').selectpicker('refresh');
                $("#update_project_name").val(data[i].project_name);
                $("#update_project_address").val(data[i].project_address);
                $("#update_progress").val(data[i].progress);
                $("#update_remarks").val(data[i].remarks);
            }
        },
        //  错误信息处理
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//更新项目
function UpdateAccessory(){
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/accessory/updateAccessory",
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
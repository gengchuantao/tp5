/**
 * 异步获取计提人员
 * @type {*|jQuery|HTMLElement}
 */
let  $selectParent=$("#staff_name");
//$selectParent.empty();
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/responsible/getDrawingStaffByCompany",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $selectParent.append($option);
            $('#staff_name').selectpicker('refresh');
            $('#staff_name').selectpicker('render');
        }
    },
    error: function (xhr) {
        /*错误信息处理*/
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//获取员工编号
function GetStaffId(){
    //市赋值
    //获取已录入的省份
    let staff_name=document.getElementById('staff_name').value;
    console.log(staff_name);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/getDrawingStaffIdByName",
        data:{
            staff_name:staff_name
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                $("#staff_id").val(data[i].emid);
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
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/bufinance/getQuarterPayBalanceByBuName",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            $("#bu_accrued_amount").val(data[i].quarter_pay_balance);
        }
    },
    error: function (xhr) {
        /*错误信息处理*/
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//新建项目
function AddNew(){
    let type=document.getElementById('type').value;
    let staff_name=document.getElementById('staff_name').value;
    let bu_accrued_amount=document.getElementById('bu_accrued_amount').value;
    let drawing_amount=document.getElementById('drawing_amount').value;
    if(!type){
        alert('请选择类别！');
        return ;
    }
    if(!staff_name){
        alert('请选择计提人员！');
        return ;
    }
    if(!bu_accrued_amount){
        alert('未获取到可计提金额,请联系管理员！');
        return ;
    }
    if(!drawing_amount){
        alert('计提金额不能为空！');
        drawing_amount=0;
        document.getElementById('drawing_amount').focus();
        document.getElementById('drawing_amount').select();
        return ;
    }
    let sum_amount=bu_accrued_amount-drawing_amount;
    if(sum_amount<0){
        alert('计提金额超出可计提金额，请重新输入！');
        document.getElementById('drawing_amount').focus();
        document.getElementById('drawing_amount').select();
        return ;
    }
    $("#addButton").attr("disabled",true);
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/budrawing/addNew",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("添加失败！");
                $("#addButton").attr("disabled",false);
            }
            if(data===1){
                alert("添加成功！");
                $("#addButton").attr("disabled",false);
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
function GetDeleteId(id){
    $("#delete_id").val(id);
}
//  删除绩效
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/budrawing/Delete",
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
//获取审核ID
function GetVerifyId(id){
    $("#verify_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/budrawing/getInfoById",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //  模态框赋值
                $("#verify_company").val(data[i].company);
                $("#verify_type").val(data[i].type);
                $("#verify_staff_bu").val(data[i].staff_bu);
                let staff_bu=data[i].staff_bu;
                GetVerifyQuarterPayBalance(staff_bu);
                $("#verify_staff_name").val(data[i].staff_name);
                $("#verify_staff_id").val(data[i].staff_id);

                $("#verify_drawing_amount").val(data[i].drawing_amount);
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
function Verify(){
    let formData = $("#VerifyForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/budrawing/verifyDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("审核失败！");
                window.location.reload();
            }
            if(data===1){
                alert("审核成功！");
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
function GetVerifyQuarterPayBalance(staff_bu){
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/bufinance/getVerifyQuarterPayBalanceByBuName",
        data:{
            staff_bu:staff_bu
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //  模态框赋值
                $("#verify_bu_accrued_amount").val(data[i].quarter_pay_balance);
            }
        }
    });

}
function delSubstring() {
    let str2=document.getElementById('bill_amount').value;
    document.getElementById("bill_amount").value=str2.replace(/,/g,"");
}
$(function () {
    $('#issue_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    });
    $('#due_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    });
    $('#income_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    });
});
function AddEvergrande(){
    console.log('新增开始');
    let type=document.getElementById('type').value;
    let bill_id=document.getElementById('bill_id').value;
    let bill_amount=document.getElementById('bill_amount').value;
    if(!type){
        alert('类别不能为空！');
        document.getElementById('type').focus();
        document.getElementById('type').select();
        return ;
    }
    else if(!bill_id){
        alert('商票编号不能为空！');
        document.getElementById('bill_id').focus();
        document.getElementById('bill_id').select();
        return ;
    }
    else if(!bill_amount){
        alert('票面金额不能为空！');
        document.getElementById('bill_amount').focus();
        document.getElementById('bill_amount').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    $('#AddEvergrande').modal('hide');
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/evergrande/AddForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("[合同号&收款编号]唯一性验证不通过，请核查是否重复录入！");
                window.location.reload();
            }
            if(date==1){
                //$("#AddInvoice").modal('hide');
                alert("原票信息添加成功！");
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
function GetDeleteID(id) {
    let evergrande_check = document.getElementsByName("evergrande_check");
    // 获取总共有多少个checkbox
    let len = evergrande_check.length;
    let flag = false;
    let str="";
    for (let i = 0; i < len; i++) {
        if (evergrande_check[i].checked) {
            str=str+','+evergrande_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#DeleteModal").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#delete_id").val(id);
    }
}
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/evergrande/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("删除失败！");
                return false;
            }
            if(date==1){
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
function GetEditID(id){
    $("#edit_id").val(id);
    let send_id=id;
    let edit_type=[];
    let edit_bill_id=[];
    let edit_bill_amount=[];
    let edit_issue_date=[];
    let edit_due_date=[];
    let edit_agent=[];
    let edit_receipt_id=[];
    let edit_contract_id=[];
    let edit_split_amount=[];
    let edit_income_date=[];
    let edit_discount_protocol=[];
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/evergrande/SendForm",
        data:{
            send_id:send_id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                edit_type.push(data[i].type);
                edit_bill_id.push(data[i].bill_id);
                edit_bill_amount.push(data[i].bill_amount);
                edit_issue_date.push(data[i].issue_date);
                edit_due_date.push(data[i].due_date);
                edit_agent.push(data[i].agent);
                edit_receipt_id.push(data[i].receipt_id);
                edit_contract_id.push(data[i].contract_id);
                edit_split_amount.push(data[i].split_amount);
                edit_income_date.push(data[i].income_date);
                edit_discount_protocol.push(data[i].discount_protocol);
                //模态框赋值
                $("#edit_type").val(edit_type);
                $("#edit_bill_id").val(edit_bill_id);
                $("#edit_bill_amount").val(edit_bill_amount);
                $("#edit_issue_date").val(edit_issue_date);
                $("#edit_due_date").val(edit_due_date);
                $("#edit_agent").val(edit_agent);
                $("#edit_receipt_id").val(edit_receipt_id);
                $("#edit_contract_id").val(edit_contract_id);
                $("#edit_split_amount").val(edit_split_amount);
                $("#edit_income_date").val(edit_income_date);
                $("#edit_discount_protocol").val(edit_discount_protocol);
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
        }
    });
}
function EditPost(){
    console.log("修改数据并重新提交");
    let edit_discount_protocol=document.getElementById('edit_discount_protocol').value;
    if(!edit_discount_protocol){
        alert('协议号不能为空！');
        document.getElementById('edit_discount_protocol').focus();
        document.getElementById('edit_discount_protocol').select();
        return ;
    }

    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/evergrande/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("添加失败！");
                window.location.reload();
            }
            if(date==1){
                alert("添加成功！");
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
let uid=0;
function CheckLimit(obj) {
    uid = obj.value;
    let cks=document.getElementsByName("evergrande_check");
    for(let i=0;i<cks.length;i++){
        cks[i].checked = false;
    }
    obj.checked = true;
    cks.closest("tr").css("background-color","yellow");
}
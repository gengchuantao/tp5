let day2 = new Date();
day2.setTime(day2.getTime());
let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
let dateCheck = new Date().getDate();
$(function () {
    let date=new Date();
    //获取第一天
    date.setDate(1);
    let y=date.getFullYear();
    let m=date.getMonth()+1;
    let d=date.getDate();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
    let nextMonthOneDay = y+"-"+m+"-"+d+` `+`00:00:00`
    $('#c_entry_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#c_complete_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#c_temp_elevator_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#into_force_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#b_complete_date').datetimepicker({
        minDate: moment(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#b_temp_elevator_date').datetimepicker({
        minDate: moment(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#b_issuing_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#b_temp_issuing_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#expected_delivery_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#b_predict_delivery_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        minDate: nextMonthOneDay,
        locale: moment.locale('zh-cn')
    });
    //区域赋值
    let  $selectParent=$("#b_belong_to");
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');

            }
            //GetSalesPerson();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    let  $u_belong_to=$("#u_belong_to");
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $u_belong_to.append($option);
                $u_belong_to.selectpicker('refresh');
                $u_belong_to.selectpicker('render');
            }
            //GetSalesPerson();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });

});
function GetRevokeID(id){
    $("#revoke_id").val(id);
}
function HeadRevoke(){
    let formData = $("#RevokeForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/HeadRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("撤销失败！");
                return false;
            }
            if(date==1){
                alert("撤销成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
function SdRevoke(){
    let formData = $("#RevokeForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/SdRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("撤销失败！");
                return false;
            }
            if(date==1){
                alert("撤销成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
function GetCompleteID(id){
    $("#complete_id").val(id);
    let product_id=[];
    let supervisor=[];
    let entry_date=[];
    let complete_date=[];
    let temp_elevator_date=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/product/CompletePost",
        data:{
            complete_id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                product_id.push(data[i].product_id);
                supervisor.push(data[i].supervisor);
                entry_date.push(data[i].entry_date);
                complete_date.push(data[i].complete_date);
                temp_elevator_date.push(data[i].temp_elevator_date);
                //模态框赋值
                $("#product_id").val(product_id);
                $("#supervisor").val(supervisor);
                $("#entry_date").val(entry_date);
                $("#complete_date").val(complete_date);
                $("#temp_elevator_date").val(temp_elevator_date);
                $("#complete_bu").val(data[i].complete_bu);
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
        }
    });
}
function CompleteUpdate(){
    let formData = $("#CompleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/CompleteUpdate",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("没有该项目经理，请检查名称是否正确！");
                return false;
            }
            if(data===1){
                alert("提交成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
//获取删除ID
function GetDeleteID(id) {
    $("#delete_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/product/GetProductInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#delete_product_id").val(data[i].product_id);
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
//删除工号
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("该工号已经生效，无法删除！");
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
function CheckAll(){
    // 获取全选按钮的状态，让上面的按钮的选中状态和它的状态相同，
    let flag=document.getElementById("check_all").checked;
    let cks=document.getElementsByName("product_check");
    for(let i=0;i<cks.length;i++){
        cks[i].checked=flag;
    }

}

//批量待生效获取ID
function SelectUnIntoForce(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchUnIntoForce").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_un_into_force_id").val(id);
        $("#u_into_force_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#u_contract_id").val(contract_ids);
    }
}
//批量撤销获取ID
function SelectRevoke(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchRevoke").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_revoke_id").val(id);
        $("#r_revoke_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#r_contract_id").val(contract_ids);
    }

}
//山东司撤销
function SdBatchRevoke(){
    let formData = $("#BatchRevokeForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/SdBatchRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功撤销！");
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
//总翁司撤销
function HBatchRevoke(){
    let formData = $("#BatchRevokeForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/HBatchRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功撤销！");
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
//批量拆款获取ID
function SelectSplit(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchSplit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_split_id").val(id);
        $("#s_split_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#s_contract_id").val(contract_ids);
    }

}
//批量转拆分
function BatchSplit(){
    let formData = $("#BatchSplitForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchSplit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功转拆分！");
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
//批量生效获取ID
function SelectIntoForce(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchIntoForce").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_into_force_id").val(id);
        $("#b_into_force_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#b_contract_id").val(contract_ids);
    }

}
//批量转生效
function BatchIntoForce(){
    let formData = $("#BatchIntoForceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchIntoForce",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功转生效！");
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
//批量发货预计获取ID
function SelectDelivery(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchDelivery").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_delivery_id").val(id);
        $("#b_expected_delivery_sum").val(k);
    }
}
//批量发货预计
function BatchExpectedDelivery(){
    let formData = $("#BatchDeliveryForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchExpectedDelivery",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功！");
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
//批量转待生效
function BatchUnIntoForce(){
    let formData = $("#BatchUnIntoForceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchUnIntoForce",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功转待生效！");
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
//生效获取营业员
function GetSalesPerson(){
    //营业员赋值
    //获取已选择的区域
    let belong_to=document.getElementById('b_belong_to').value;
    let  $selectParent=$("#b_sales_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSalesPerson",
        data:{
            company:belong_to
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//待生效获取营业员
function GetUnSalesPerson(){
    //营业员赋值
    //获取已选择的区域
    let belong_to=document.getElementById('u_belong_to').value;
    let  $selectParent=$("#u_sales_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSalesPerson",
        data:{
            company:belong_to
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//导出工号明细
function Export(){
    window.location.href = "http://101.201.57.190/tp5/public/index.php/index/product/Export"
}
//批量完工获取ID
function SelectComplete(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchComplete").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_id").val(id);
        $("#b_complete_sum").val(k);
        $("#temp_elevator_date").val('');

    }
}
//批量预测发货获取ID
function SelectPredict(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchDeliveryPredict").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_predict_id").val(id);
        $("#b_predict_delivery_sum").val(k);

    }
}
//完工获取项目经理
function GetSupervisor(){
    let install_company=document.getElementById('install_company').value;
    let  $selectParent=$("#supervisor");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSupervisor",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工批量修改获取项目经理
function CompleteEditGetSupervisor(){
    let install_company=document.getElementById('e_install_company').value;
    let  $selectParent=$("#e_supervisor");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSupervisor",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工获取完工事业部
function GetBuName(){
    let install_company=document.getElementById('install_company').value;
    let  $selectParent=$("#complete_bu");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/bustaff/GetBuName",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<=data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工批量修改获取完工事业部
function CompleteEditGetBuName(){
    let install_company=document.getElementById('e_install_company').value;
    let  $selectParent=$("#e_complete_bu");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/bustaff/GetBuName",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<=data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//批量转完工
function BatchComplete() {
    let complete_date=document.getElementById('complete_date').value;
    let temp_elevator_date=document.getElementById('temp_elevator_date').value;
    if(!complete_date && !temp_elevator_date){
        alert('完工日期不能为空，请检查！');
        document.getElementById('complete_date').focus();
        document.getElementById('complete_date').select();
        return ;
    }
    let formData = $("#BatchCompleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchComplete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功转完工！");
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
//批量发货预测
function BatchPredict() {
    let predict_delivery_date=document.getElementById('predict_delivery_date').value;
    if(!predict_delivery_date){
        alert('预计发货日期不能为空，请检查！');
        document.getElementById('predict_delivery_date').focus();
        document.getElementById('predict_delivery_date').select();
        return ;
    }
    let formData = $("#BatchDeliveryPredictForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/bathchDeliveryPredict",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功！");
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
//批量完工审核获取id
function SelectCompleteAudit() {
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchCompleteAudit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_id").val(id);
        $("#b_complete_sum").val(k);
    }
}
//批量完工审核通过
function BatchCompleteAudit() {
    let formData = $("#BatchCompleteAuditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteAudit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
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
//批量完工审核拒绝
function BatchCompleteRefuse() {
    let formData = $("#BatchCompleteAuditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteRefuse",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已拒绝！");
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
//获取完工信息批量修改ID
function SelectBatchCompleteEdit() {
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchCompleteEdit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_edit_id").val(id);
        $("#b_complete_edit_sum").val(k);

    }
}
//完工信息批量修改
function BatchCompleteEdit() {
    let complete_date=document.getElementById('e_complete_date').value;
    let temp_elevator_date=document.getElementById('e_temp_elevator_date').value;
    if(!complete_date && !temp_elevator_date){
        alert('完工日期不能为空，请检查！');
        document.getElementById('e_complete_date').focus();
        document.getElementById('e_temp_elevator_date').select();
        return ;
    }
    let formData = $("#BatchCompleteEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
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
//完工信息批量修改(仅修改区域、项目经理、事业部
function BatchCompleteBuEdit() {
    let formData = $("#BatchCompleteEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteBuEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
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


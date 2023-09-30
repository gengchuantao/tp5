function Add(){
    let hiddenBtn=document.getElementById('update_btn');
    hiddenBtn.style.display="none";
    let displayBtn=document.getElementById('add_btn');
    displayBtn.style.display="block";
    $('#addModal').modal('show');

}
function addPost(){
    let add_supplier=document.getElementById('add_supplier').value;
    let add_company=document.getElementById('add_company').value;
    let add_city=document.getElementById('add_city').value;

    if(add_supplier===''){
        alert('安装网点不能为空！');
        document.getElementById('add_supplier').focus();
        return ;
    }
    let formData = $("#addform").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/installer/Add",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("人员已存在，请检查！");
            }
            if(date==1){
                alert("添加成功！");
                window.location.reload();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
function GetDeleteID(id) {
    $("#delete_id").val(id);
}
function Delete(){
    var formData = $("#deleteform").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/installer/Delete",
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
    let hiddenBtn=document.getElementById('add_btn');
    hiddenBtn.style.display="none";
    let displayBtn=document.getElementById('update_btn');
    displayBtn.style.display="block";
    $('#addModal').modal('show');
    $("#id").val(id);
    let send_id=id;
    let add_id=[];
    let add_supplier=[];
    let add_company=[];
    let add_city=[];
    let add_staff_name=[];
    let add_id_card=[];
    let add_foreman=[];
    let add_certificate_no=[];
    let add_issue_date=[];
    let add_closing_date=[];
    let add_issuing_authority=[];
    let add_head_records=[];
    let add_record_date=[];
    let add_insurance_period_from=[];
    let add_insurance_period_to=[];
    let add_captain=[];
    let add_electrician_certificate=[];
    let add_electrician_certificate_due_date=[];
    let add_welder_certificate=[];
    let add_welder_certificate_due_date=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/installer/SendForm",
        data:{
            send_id:send_id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(var i=0;i<data.length;i++){
                add_id.push(data[i].id);
                add_supplier.push(data[i].supplier);
                add_company.push(data[i].company);
                add_city.push(data[i].city);
                add_staff_name.push(data[i].staff_name);
                add_id_card.push(data[i].id_card);
                add_foreman.push(data[i].foreman);
                add_certificate_no.push(data[i].certificate_no);
                add_issue_date.push(data[i].issue_date);
                add_closing_date.push(data[i].closing_date);
                add_issuing_authority.push(data[i].issuing_authority);
                add_head_records.push(data[i].head_records);
                add_record_date.push(data[i].record_date);
                add_insurance_period_from.push(data[i].insurance_period_from);
                add_insurance_period_to.push(data[i].insurance_period_to);
                add_captain.push(data[i].captain);
                add_electrician_certificate.push(data[i].electrician_certificate);
                add_electrician_certificate_due_date.push(data[i].electrician_certificate_due_date);
                add_welder_certificate.push(data[i].welder_certificate);
                add_welder_certificate_due_date.push(data[i].welder_certificate_due_date);
                //模态框赋值
                $("#add_supplier").val(add_supplier);
                $('#add_company').selectpicker('val',add_company);//设置选中
                $('#add_company').selectpicker('refresh');
                $('#add_city').selectpicker('val',add_city);//设置选中
                $('#add_city').selectpicker('refresh');
                $("#add_staff_name").val(add_staff_name);
                $("#add_id_card").val(add_id_card);
                $('#add_foreman').selectpicker('val',add_foreman);//设置选中
                $('#add_foreman').selectpicker('refresh');
                $("#add_certificate_no").val(add_certificate_no);
                $("#add_issue_date").val(add_issue_date);
                $("#add_closing_date").val(add_closing_date);
                $("#add_issuing_authority").val(add_issuing_authority);
                $('#add_head_records').selectpicker('val',add_head_records);//设置选中
                $('#add_head_records').selectpicker('refresh');
                $("#add_record_date").val(add_record_date);
                $("#add_insurance_period_from").val(add_insurance_period_from);
                $("#add_insurance_period_to").val(add_insurance_period_to);
                $("#add_captain").val(add_captain);
                $('#add_electrician_certificate').selectpicker('val',add_electrician_certificate);//设置选中
                $('#add_electrician_certificate').selectpicker('refresh');
                $("#add_electrician_certificate_due_date").val(add_electrician_certificate_due_date);
                $('#add_welder_certificate').selectpicker('val',add_welder_certificate);//设置选中
                $('#add_welder_certificate').selectpicker('refresh');
                $("#add_welder_certificate_due_date").val(add_welder_certificate_due_date);
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
function editPost() {
    let formData = $("#addform").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/installer/UpdateForm",
        data:formData,
        success:function(date){
            if(date==0){
                alert("人员不存在！");
                return false;
            }
            if(date==1){
                alert("更新成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
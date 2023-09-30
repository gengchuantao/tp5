$("#fileUpload").fileinput({
    language: 'zh', //设置语言
    //uploadUrl: "./list.json", //上传的地址(访问接口地址)
    allowedFileExtensions: ['jpg', 'gif', 'png','jpeg'],//接收的文件后缀
    //uploadExtraData:{"id": 1, "fileName":'123.mp3'},
    uploadAsync: true, //默认异步上传
    showUpload: false, //是否显示上传按钮
    showRemove : true, //显示移除按钮
    showPreview : true, //是否显示预览
    showCaption: false,//是否显示标题
    showCancel: true,   //是否显示取消按钮
    showClose: true,    //是否显示关闭按钮
    browseClass: "btn btn-primary", //按钮样式
    dropZoneEnabled: false,//是否显示拖拽区域
    //minImageWidth: 50, //图片的最小宽度
    //minImageHeight: 50,//图片的最小高度
    //maxImageWidth: 1000,//图片的最大宽度
    //maxImageHeight: 1000,//图片的最大高度
    //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
    maxFileCount: 1, //表示允许同时上传的最大文件个数
    enctype: 'multipart/form-data',
    validateInitialCount:true,  //验证初始计数
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
});
function delSubstring() {
    let str2=document.getElementById('invoice_amount').value;
    document.getElementById("invoice_amount").value=str2.replace(/,/g,"");
}
function AddPost(){
    console.log('新增开始');
    let invoice_type=document.getElementById('invoice_type').value;
    let contract_id=document.getElementById('contract_id').value;
    let product_id=document.getElementById('product_id').value;
    let unit_name=document.getElementById('unit_name').value;
    let invoice_amount=document.getElementById('invoice_amount').value;
    let project_location=document.getElementById('project_location').value;
    let taxpayer_id=document.getElementById('taxpayer_id').value;
    let address=document.getElementById('address').value;
    let phone_number=document.getElementById('phone_number').value;
    let deposit_bank=document.getElementById('deposit_bank').value;
    let bank_account=document.getElementById('bank_account').value;
    let invoice_remarks=document.getElementById('invoice_remarks').value;
    let applicant=document.getElementById('applicant').value;
    if(!contract_id){
        alert('合同号不能为空！');
        document.getElementById('contract_id').focus();
        document.getElementById('contract_id').select();
        return ;
    }
    else if(!product_id){
        alert('工号不能为空！');
        document.getElementById('product_id').focus();
        document.getElementById('product_id').select();
        return ;
    }
    else if(!unit_name){
        alert('单位名称不能为空！');
        document.getElementById('unit_name').focus();
        document.getElementById('unit_name').select();
        return ;
    }
    else if(!invoice_amount){
        alert('本次开票金额不能为空！');
        document.getElementById('invoice_amount').focus();
        document.getElementById('invoice_amount').select();
        return ;
    }
    else if(!project_location){
        alert('项目所在地不能为空！');
        document.getElementById('project_location').focus();
        document.getElementById('project_location').select();
        return ;
    }
    else if(!taxpayer_id){
        alert('税号不能为空！');
        document.getElementById('taxpayer_id').focus();
        document.getElementById('taxpayer_id').select();
        return ;
    }
    else if(!address){
        alert('地址不能为空！');
        document.getElementById('address').focus();
        document.getElementById('address').select();
        return ;
    }
    else if(!phone_number){
        alert('电话号码不能为空！');
        document.getElementById('phone_number').focus();
        document.getElementById('phone_number').select();
        return ;
    }
    else if(invoice_type==='增值税专用发票'&&!deposit_bank){
        alert('开专票时开户银行不能为空！');
        document.getElementById('deposit_bank').focus();
        document.getElementById('deposit_bank').select();
        return ;
    }
    else if(invoice_type==='增值税专用发票'&&!bank_account){
        alert('开专票时银行账户不能为空！');
        document.getElementById('bank_account').focus();
        document.getElementById('bank_account').select();
        return ;
    }
    else if(!invoice_remarks){
        alert('发票备注不能为空！');
        document.getElementById('invoice_remarks').focus();
        document.getElementById('invoice_remarks').select();
        return ;
    }
    else if(!applicant){
        alert('申请人不能为空！');
        document.getElementById('applicant').focus();
        document.getElementById('applicant').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    $('#AddInvoice').modal('hide');
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/AddForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("已存在该收款编号，请检查是否重复登记！");
                window.location.reload();
            }
            if(date==1){
                //$("#AddInvoice").modal('hide');
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
function GetDeleteID(id) {
    $("#delete_id").val(id);
    console.log(id);
}
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/Delete",
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
    let edit_invoice_type=[];
    let edit_business_type=[];
    let edit_contract_id=[];
    let edit_product_id=[];
    let edit_unit_name=[];
    let edit_invoice_amount=[];
    let edit_project_location=[];
    let edit_taxpayer_id=[];
    let edit_address=[];
    let edit_phone_number=[];
    let edit_deposit_bank=[];
    let edit_bank_account=[];
    let edit_invoice_remarks=[];
    let edit_special_request=[];
    let edit_applicant=[];
    let edit_vanke_model=[];
    let edit_agent=[];
    let edit_application_date=[];
    let edit_status=[];
    let edit_section_chief=[];
    let section_chief_approve_date=[];
    let edit_section_chief_approve=[];
    let edit_regional_finance=[];
    let edit_regional_finance_date=[];
    let edit_regional_finance_remarks=[];
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/invoice/SendForm",
        data:{
            send_id:send_id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                edit_invoice_type.push(data[i].invoice_type);
                edit_business_type.push(data[i].business_type);
                edit_contract_id.push(data[i].contract_id);
                edit_product_id.push(data[i].product_id);
                edit_unit_name.push(data[i].unit_name);
                edit_invoice_amount.push(data[i].invoice_amount);
                edit_project_location.push(data[i].project_location);
                edit_taxpayer_id.push(data[i].taxpayer_id);
                edit_address.push(data[i].address);
                edit_phone_number.push(data[i].phone_number);
                edit_deposit_bank.push(data[i].deposit_bank);
                edit_bank_account.push(data[i].bank_account);
                edit_invoice_remarks.push(data[i].invoice_remarks);
                edit_special_request.push(data[i].special_request);
                edit_applicant.push(data[i].applicant);
                edit_vanke_model.push(data[i].vanke_model);
                edit_agent.push(data[i].agent);
                edit_application_date.push(data[i].application_date);
                edit_status.push(data[i].status);
                edit_section_chief.push(data[i].section_chief);
                section_chief_approve_date.push(data[i].section_chief_approve_date);
                edit_section_chief_approve.push(data[i].section_chief_approve);
                edit_regional_finance.push(data[i].regional_finance);
                edit_regional_finance_date.push(data[i].regional_finance_date);
                edit_regional_finance_remarks.push(data[i].regional_finance_remarks);
                //模态框赋值
                let select01=$("#edit_invoice_type");
                select01.val(edit_invoice_type);
                select01.trigger('change');
                let select02=$("#edit_business_type");
                select02.val(edit_business_type);
                select02.trigger('change');
                $("#edit_contract_id").val(edit_contract_id);
                $("#edit_product_id").val(edit_product_id);
                $("#edit_unit_name").val(edit_unit_name);
                $("#edit_invoice_amount").val(edit_invoice_amount);
                $("#edit_project_location").val(edit_project_location);
                $("#edit_taxpayer_id").val(edit_taxpayer_id);
                $("#edit_address").val(edit_address);
                $("#edit_phone_number").val(edit_phone_number);
                $("#edit_deposit_bank").val(edit_deposit_bank);
                $("#edit_bank_account").val(edit_bank_account);
                $("#edit_invoice_remarks").val(edit_invoice_remarks);
                $("#edit_special_request").val(edit_special_request);
                $("#edit_applicant").val(edit_applicant);
                let select03=$("#edit_vanke_model");
                select03.val(edit_vanke_model);
                select03.trigger('change');
                $("#edit_agent").val(edit_agent);
                $("#edit_application_date").val(edit_application_date);
                $("#edit_status").val(edit_status);
                $("#edit_section_chief").val(edit_section_chief);
                $("#section_chief_approve_date").val(section_chief_approve_date);
                $("#edit_section_chief_approve1").val(edit_section_chief_approve);
                $("#edit_section_chief_approve").val(edit_section_chief_approve);
                $("#edit_regional_finance").val(edit_regional_finance);
                $("#edit_regional_finance_date").val(edit_regional_finance_date);
                $("#edit_regional_finance_remarks1").val(edit_regional_finance_remarks);
                $("#edit_regional_finance_remarks").val(edit_regional_finance_remarks);
                $('#edit_tax_rate').selectpicker('val',data[i].tax_rate);//设置选中
                $('#edit_tax_rate').selectpicker('refresh');
            }
        },
        //如果失败,则调用这个函数
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
    $("#edit_invoice_type").val(edit_invoice_type);
}
function EditPost(){
    console.log("修改数据并重新提交");
    let edit_invoice_type=document.getElementById('edit_invoice_type').value;
    let edit_contract_id=document.getElementById('edit_contract_id').value;
    let edit_product_id=document.getElementById('edit_product_id').value;
    let edit_unit_name=document.getElementById('edit_unit_name').value;
    let edit_invoice_amount=document.getElementById('edit_invoice_amount').value;
    let edit_project_location=document.getElementById('edit_project_location').value;
    let edit_taxpayer_id=document.getElementById('edit_taxpayer_id').value;
    let edit_address=document.getElementById('edit_address').value;
    let edit_phone_number=document.getElementById('edit_phone_number').value;
    let edit_deposit_bank=document.getElementById('edit_deposit_bank').value;
    let edit_bank_account=document.getElementById('edit_bank_account').value;
    let edit_invoice_remarks=document.getElementById('edit_invoice_remarks').value;
    let edit_applicant=document.getElementById('edit_applicant').value;
    let edit_status=document.getElementById('edit_status').value;
    if(!edit_contract_id){
        alert('合同号不能为空！');
        document.getElementById('edit_contract_id').focus();
        document.getElementById('edit_contract_id').select();
        return ;
    }
    else if(!edit_product_id){
        alert('工号不能为空！');
        document.getElementById('edit_product_id').focus();
        document.getElementById('edit_product_id').select();
        return ;
    }
    else if(!edit_unit_name){
        alert('单位名称不能为空！');
        document.getElementById('edit_unit_name').focus();
        document.getElementById('edit_unit_name').select();
        return ;
    }
    else if(!edit_invoice_amount){
        alert('本次开票金额不能为空！');
        document.getElementById('edit_invoice_amount').focus();
        document.getElementById('edit_invoice_amount').select();
        return ;
    }
    else if(!edit_project_location){
        alert('项目所在地不能为空！');
        document.getElementById('edit_project_location').focus();
        document.getElementById('edit_project_location').select();
        return ;
    }
    else if(!edit_taxpayer_id){
        alert('税号不能为空！');
        document.getElementById('edit_taxpayer_id').focus();
        document.getElementById('edit_taxpayer_id').select();
        return ;
    }
    else if(!edit_address){
        alert('地址不能为空！');
        document.getElementById('edit_address').focus();
        document.getElementById('edit_address').select();
        return ;
    }
    else if(!edit_phone_number){
        alert('电话号码不能为空！');
        document.getElementById('edit_phone_number').focus();
        document.getElementById('edit_phone_number').select();
        return ;
    }
    else if(edit_invoice_type==='增值税专用发票'&&!edit_deposit_bank){
        alert('开专票时开户银行不能为空！');
        document.getElementById('edit_deposit_bank').focus();
        document.getElementById('edit_deposit_bank').select();
        return ;
    }
    else if(edit_invoice_type==='增值税专用发票'&&!edit_bank_account){
        alert('开专票时银行账户不能为空！');
        document.getElementById('edit_bank_account').focus();
        document.getElementById('edit_bank_account').select();
        return ;
    }
    else if(!edit_invoice_remarks){
        alert('发票备注不能为空！');
        document.getElementById('edit_invoice_remarks').focus();
        document.getElementById('edit_invoice_remarks').select();
        return ;
    }
    else if(!edit_applicant){
        alert('申请人不能为空！');
        document.getElementById('edit_applicant').focus();
        document.getElementById('edit_applicant').select();
        return ;
    }
    else if(edit_status==='已结束'){
        alert('已结束流程不能再重新提交！');
        $("#EditModal").modal('hide');
        return ;
    }

    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("仅申请人有权限重新提交流程！");
                window.location.reload();
            }
            if(date==1){
                //$("#AddInvoice").modal('hide');
                alert("重新提交成功！");
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
function RejectPost(){
console.log('拒绝流程');
    let check_status=document.getElementById('check_status').value;
    if(check_status==='已结束'){
        alert('已结束流程不能再重新提交！');
        $("#CheckModal").modal('hide');
        return ;
    }
    else if(check_status==='区域主管审核'){
        let check_section_chief_approve1=document.getElementById('check_section_chief_approve1').value;
        if(!check_section_chief_approve1){
            alert('拒绝流程时必须写明拒绝原因！');
            document.getElementById('check_section_chief_approve1').focus();
            document.getElementById('check_section_chief_approve1').select();
            return ;
        }
    }
    else if(check_status==='区域财务审核'){
        let check_regional_finance_remarks1=document.getElementById('check_regional_finance_remarks1').value;
        if(!check_regional_finance_remarks1){
            alert('拒绝流程时必须写明拒绝原因！');
            document.getElementById('check_regional_finance_remarks1').focus();
            document.getElementById('check_regional_finance_remarks1').select();
            return ;
        }
    }
    else if(check_status==='山东司核算审核'){
        let check_sd_accounting_remarks1=document.getElementById('check_sd_accounting_remarks1').value;
        if(!check_sd_accounting_remarks1){
            alert('拒绝流程时必须写明拒绝原因！');
            document.getElementById('check_sd_accounting_remarks1').focus();
            document.getElementById('check_sd_accounting_remarks1').select();
            return ;
        }
    }
    else if(check_status==='山东司税务岗A审核'){
        let check_sd_taxation_a_remarks1=document.getElementById('check_sd_taxation_a_remarks1').value;
        if(!check_sd_taxation_a_remarks1){
            alert('拒绝流程时必须写明拒绝原因！');
            document.getElementById('check_sd_taxation_a_remarks1').focus();
            document.getElementById('check_sd_taxation_a_remarks1').select();
            return ;
        }
    }
    else if(check_status==='山东司税务岗B审核'){
        let check_sd_taxation_b_remarks1=document.getElementById('check_sd_taxation_b_remarks1').value;
        if(!check_sd_taxation_b_remarks1){
            alert('拒绝流程时必须写明拒绝原因！');
            document.getElementById('check_sd_taxation_b_remarks1').focus();
            document.getElementById('check_sd_taxation_b_remarks1').select();
            return ;
        }
    }
    let formData = $("#CheckForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/RejectForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("流程中，无法退还流程！");
                window.location.reload();
            }
            if(date==1){
                alert("已退还给申请人，请通知申请人重新提交！");
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
function GetCheckID(id){
    $("#check_id").val(id);
    let send_id=id;
    let check_invoice_type=[];
    let check_business_type=[];
    let check_contract_id=[];
    let check_product_id=[];
    let check_unit_name=[];
    let check_invoice_amount=[];
    let check_project_location=[];
    let check_taxpayer_id=[];
    let check_address=[];
    let check_phone_number=[];
    let check_deposit_bank=[];
    let check_bank_account=[];
    let check_invoice_remarks=[];
    let check_special_request=[];
    let check_applicant=[];
    let check_vanke_model=[];
    let check_agent=[];
    let check_application_date=[];
    let check_status=[];
    let check_section_chief=[];
    let section_chief_approve_date=[];
    let check_section_chief_approve=[];
    let check_regional_finance=[];
    let check_regional_finance_date=[];
    let check_regional_finance_remarks=[];
    let check_sd_accounting=[];
    let check_sd_accounting_date=[];
    let check_sd_accounting_remarks=[];
    let check_sd_taxation_a=[];
    let check_sd_taxation_a_date=[];
    let check_sd_taxation_a_remarks=[];
    let check_sd_taxation_b=[];
    let check_sd_taxation_b_date=[];
    let check_sd_taxation_b_remarks=[];
    let check_tax_rate=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/invoice/SendForm",
        data:{
            send_id:send_id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                check_invoice_type.push(data[i].invoice_type);
                check_business_type.push(data[i].business_type);
                check_contract_id.push(data[i].contract_id);
                check_product_id.push(data[i].product_id);
                check_unit_name.push(data[i].unit_name);
                check_invoice_amount.push(data[i].invoice_amount);
                check_project_location.push(data[i].project_location);
                check_taxpayer_id.push(data[i].taxpayer_id);
                check_address.push(data[i].address);
                check_phone_number.push(data[i].phone_number);
                check_deposit_bank.push(data[i].deposit_bank);
                check_bank_account.push(data[i].bank_account);
                check_invoice_remarks.push(data[i].invoice_remarks);
                check_special_request.push(data[i].special_request);
                check_applicant.push(data[i].applicant);
                check_vanke_model.push(data[i].vanke_model);
                check_agent.push(data[i].agent);
                check_application_date.push(data[i].application_date);
                check_status.push(data[i].status);
                check_section_chief.push(data[i].section_chief);
                section_chief_approve_date.push(data[i].section_chief_approve_date);
                check_section_chief_approve.push(data[i].section_chief_approve);
                check_regional_finance.push(data[i].regional_finance);
                check_regional_finance_date.push(data[i].regional_finance_date);
                check_regional_finance_remarks.push(data[i].regional_finance_remarks);
                check_sd_accounting.push(data[i].sd_accounting);
                check_sd_accounting_date.push(data[i].sd_accounting_date);
                check_sd_accounting_remarks.push(data[i].sd_accounting_remarks);
                check_sd_taxation_a.push(data[i].sd_taxation_a);
                check_sd_taxation_a_date.push(data[i].sd_taxation_a_date);
                check_sd_taxation_a_remarks.push(data[i].sd_taxation_a_remarks);
                check_sd_taxation_b.push(data[i].sd_taxation_b);
                check_sd_taxation_b_date.push(data[i].sd_taxation_b_date);
                check_sd_taxation_b_remarks.push(data[i].sd_taxation_b_remarks);
                check_tax_rate.push(data[i].tax_rate);
                //模态框赋值
                $("#check_invoice_type").val(check_invoice_type);
                $("#check_business_type").val(check_business_type);
                $("#check_contract_id").val(check_contract_id);
                $("#check_product_id").val(check_product_id);
                $("#check_unit_name").val(check_unit_name);
                $("#check_invoice_amount").val(check_invoice_amount);
                $("#check_project_location").val(check_project_location);
                $("#check_taxpayer_id").val(check_taxpayer_id);
                $("#check_address").val(check_address);
                $("#check_phone_number").val(check_phone_number);
                $("#check_deposit_bank").val(check_deposit_bank);
                $("#check_bank_account").val(check_bank_account);
                $("#check_invoice_remarks").val(check_invoice_remarks);
                $("#check_special_request").val(check_special_request);
                $("#check_applicant").val(check_applicant);
                $("#check_vanke_model").val(check_vanke_model);
                $("#check_agent").val(check_agent);
                $("#check_application_date").val(check_application_date);
                $("#check_status").val(check_status);
                $("#check_section_chief").val(check_section_chief);
                $("#section_chief_approve_date").val(section_chief_approve_date);
                $("#check_section_chief_approve1").val(check_section_chief_approve);
                $("#check_section_chief_approve").val(check_section_chief_approve);
                $("#check_regional_finance").val(check_regional_finance);
                $("#check_regional_finance_date").val(check_regional_finance_date);
                $("#check_regional_finance_remarks1").val(check_regional_finance_remarks);
                $("#check_regional_finance_remarks").val(check_regional_finance_remarks);
                $("#check_sd_accounting").val(check_sd_accounting);
                $("#check_sd_accounting_date").val(check_sd_accounting_date);
                $("#check_sd_accounting_remarks").val(check_sd_accounting_remarks);
                $("#check_sd_taxation_a").val(check_sd_taxation_a);
                $("#check_sd_taxation_a_date").val(check_sd_taxation_a_date);
                $("#check_sd_taxation_a_remarks").val(check_sd_taxation_a_remarks);
                $("#check_sd_taxation_b").val(check_sd_taxation_b);
                $("#check_sd_taxation_b_date").val(check_sd_taxation_b_date);
                $("#check_sd_taxation_b_remarks").val(check_sd_taxation_b_remarks);
                $("#check_tax_rate").val(check_tax_rate);
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
function AgreePost(){
console.log('同意流程');
    let check_status=document.getElementById('check_status').value;
    if(check_status==='已结束'){
        alert('已结束流程不能再重新提交！');
        $("#CheckModal").modal('hide');
        return ;
    }
    let formData = $("#CheckForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/CheckForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("流程中，不能重复审核！");
                window.location.reload();
            }
            if(date==1){
                alert("已审核！");
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
//批量选中
function CheckAll(){
    // 获取全选按钮的状态，让上面的按钮的选中状态和它的状态相同，
    let flag=document.getElementById("check_all").checked;
    let cks=document.getElementsByName("invoice_check");
    for(let i=0;i<cks.length;i++){
        cks[i].checked=flag;
    }
}
//税务B批量审核获取ID
function SelectInvoice(){
    let invoice_check = document.getElementsByName("invoice_check");
    // 获取总共有多少个checkbox
    let len = invoice_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (invoice_check[i].checked) {
            str=str+','+invoice_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchInvoice").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_invoice_id").val(id);
    }
}
//税务B批量审核
function BatchInvoiceVerifyB(){
    let formData = $("#BatchInvoiceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/BatchInvoiceVerifyB",
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
//税务A批量审核
function BatchInvoiceVerifyA(){
    let formData = $("#BatchInvoiceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/invoice/BatchInvoiceVerifyA",
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


// 上传文件
/*$("#fileUpload").fileinput({
    language : 'zh',//设置文中文
    showCaption : true,//显示标题
    showRemove : true, //显示移除按钮
    showUpload: false, //是否显示上传按钮
    showPreview : true,//是否显示预览
    textEncoding : "UTF-8",//文本编码
    autoReplaceBoolean : false,//选择图片时不清空原图片
    maxFileCount: 5, //表示允许同时上传的最大文件个数
    msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
})*/
function GetUploadID(id){
    $("#upload_id").val(id);
    document.getElementById("uploadedImg").innerHTML="";
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/invoice/getInfoById",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data1){
            $.ajax({
                type:"post",
                cache:false,
                url:"/../tp5/public/index.php/index/invoice/getImgInfoById",
                data:{
                    id:id
                },
                dataType:'json',
                ifModified:true,
                async:true,
                success:function(data2){
                    for(let i=0;i<data1.length;i++){
                        //  模态框赋值
                        $("#upload_contract_id").val(data1[i].contract_id);
                        $("#upload_unit_name").val(data1[i].unit_name);
                        $("#upload_invoice_amount").val(data1[i].invoice_amount);
                    }
                    let imgs='';
                    for(let i=0;i<data2.length;i++){
                        //  模态框赋值
                        imgs+='<img class="img-responsive" src="'+data2[i].images_address+'" />'
                        //$("#uploadImg").attr("src",data2[i].images_address);
                        document.getElementById("uploadedImg").innerHTML=imgs;
                    }
                }
            })

        }
    });
    $("#edit_invoice_type").val(edit_invoice_type);
}
$("#uploadForm").on("submit", function(e) {
    e.preventDefault();
    let btnVal=document.getElementById("submitBtn");
    btnVal.innerHTML="上传中……";
    let fileSelect = document.getElementById('fileUpload');
    let files = fileSelect.files;
    if(files.length===0){
        alert("没有选择任何文件！");
        btnVal.innerHTML="上传";
    }
    //var mainstr=formToJsonObject("#uploadForm");
    let upload_id=document.getElementById('upload_id').value;
    let formData = new FormData(this);
    formData.append('upload_id',upload_id);
    console.log(formData);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/../tp5/public/index.php/index/invoice/uploadApi',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if(data===0){
                alert("上传失败！");
            }
            if(data===1){
                alert("上传成功！");
                btnVal.innerHTML="上传";
                $('#uploadModal').modal('hide');
            }
            if(data===2){
                alert("获取文件失败！");
            }
        }
    });
});
function uploadFile(){
    let form = document.getElementById('uploadForm');
    let fileSelect = document.getElementById('fileUpload');
    let files = fileSelect.files;
    let formData = new FormData();
    // 对每个文件进行循环处理
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        // 检查文件类型
        /*if (!file.type.match('image.*')) {
            continue;
        }*/
        // 添加文件到formData
        formData.append('image[]', file);
    }
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/../tp5/public/index.php/index/invoice/uploadApi',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if(data===0){
                alert("上传失败！");
            }
            if(data===1){
                alert("上传成功！");
            }
            if(data===2){
                alert("获取文件失败！");
            }
        }
    });
    console.log(formData);
    console.log(files.length);

}

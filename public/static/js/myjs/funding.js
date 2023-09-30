
 // 多选框赋值到input
$('#select_id').on('changed.bs.select', function(e) {
    $("#input_select_id").val($(this).val());
});
$(function () {
 // 初始化选择器
    $("#add_classification").selectpicker('refresh');
    $("#add_funding_way").selectpicker('refresh');
    $("#select_id").selectpicker('refresh');
    $("#add_first_ratio").selectpicker('refresh');
    $("#add_second_ratio").selectpicker('refresh');
    $("#add_status").selectpicker('refresh');

    $("#fundingIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'post', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/funding/GetFundingInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        cache: false,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        //默认排序字段
        uniqueId: "id",
        sortName: "id",
        sortOrder: "desc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 6, //固定列数
        //fixedNumberWidth: 80,
        locale:"zh-CN",//支持中文
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_receipt_id: $('#search_receipt_id').val(),
                search_contract_id: $('#search_contract_id').val(),
                search_split_five_days: $('#search_split_five_days').val(),
                search_check_status: $('#search_check_status').val(),
                search_classification: $('#search_classification').val(),
            };
        },
        formatLoadingMessage: function () {
            return "请稍后，正在加载";
        },
        formatNoMatches: function () {
            return "暂无匹配数据";
        },
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: true                  //是否显示复选框
        }, {
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: true,
        }, {
            field: 'check_status',
            title: '状态',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==='已拒绝'){
                    return "<span class='badge' style='background-color: darkred'>"+value+"</span>";
                }else if(value==='待审核'){
                    return "<span class='badge' style='background-color: orange'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }
            },
        },{
            field: 'receipt_id',
            title: '收款编号',
            align: 'left',
            sortable: false
        },  {
            field: 'classification',
            title: '入金分类',
            align: 'right',
            sortable: false
        },{
            field: 'funding_way',
            title: '来款方式',
            align: 'left',
            sortable: false
        },{
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        },{
            field: 'amount_money',
            title: '金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'split_summary',
            title: '拆分汇总',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'expect_split_amount',
            title: '预计拆分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'record_date',
            title: '录入时间',
            align: 'left',
            sortable: false
        },{
            field: 'payment_type',
            title: '款项类型',
            align: 'left',
            sortable: false
        },{
            field: 'payer',
            title: '来款单位',
            align: 'left',
            sortable: false
        },{
            field: 'first_payee',
            title: '收款人1',
            align: 'left',
            sortable: false
        },{
            field: 'first_bu',
            title: '事业部1',
            align: 'left',
            sortable: false
        },{
            field: 'first_ratio',
            title: '分配比例1',
            align: 'left',
            sortable: false
        },{
            field: 'second_payee',
            title: '收款人2',
            align: 'left',
            sortable: false
        },{
            field: 'second_bu',
            title: '事业部2',
            align: 'left',
            sortable: false
        },{
            field: 'second_ratio',
            title: '分配比例2',
            align: 'left',
            sortable: false
        },{
            field: 'bill_cash_status',
            title: '票据状态',
            align: 'left',
            sortable: false
        },{
            field: 'funding_way_checked',
            title: '来款方式验证',
            align: 'left',
            sortable: false
        },{
            field: 'classification_checked',
            title: '入金分类验证',
            align: 'left',
            sortable: false
        },{
            field: 'cross_region_checked',
            title: '跨区域验证',
            align: 'left',
            sortable: false
        },{
            field: 'expect_split_amount_checked',
            title: '预计拆分金额验证',
            align: 'left',
            sortable: false
        },{
            field: 'invoiced_split_checked',
            title: '开票拆分验证',
            align: 'left',
            sortable: false
        },{
            field: 'bill_cash_status',
            title: '票据兑现情况',
            align: 'left',
            sortable: false
        },{
            field: 'split_five_days',
            title: '5天内拆分',
            align: 'left',
            sortable: false
        },{
            field: 'check_remarks',
            title: '审核意见',
            align: 'left',
            sortable: false
        }, {
                field: 'special_instructions',
                title: '特殊说明',
                align: 'left',
                sortable: false
            },],
    });
    $('#fundingIndex').bootstrapTable('refresh');
    //回车查询(button模式)(全页面-解决下拉框及日期选择无法回车查询的问题)
    document.onkeydown = function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            $('#query').click();
        }
    };
});
/**查询*/
$('#query').click(function () {
    let search_receipt_id = $("#search_receipt_id").val();
    let search_contract_id = $("#search_contract_id").val();
    let search_split_five_days = $("#search_split_five_days").val();
    let search_classification = $("#search_classification").val();
    let search_check_status = $("#search_check_status").val();
    $.ajax({
        type: "post",
        url: "/../tp5/public/index.php/index/funding/GetFundingInfoByCondition",
        data: [
            {search_receipt_id : search_receipt_id},
            {search_contract_id : search_contract_id},
            {search_split_five_days : search_split_five_days},
            {search_classification : search_classification},
            {search_check_status : search_check_status},
        ],
        dataType:"json",
        success : function(json) {
            $("#fundingIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
function addPost(){
    let add_receipt_id=document.getElementById('add_receipt_id').value;
    let add_payer=document.getElementById('add_payer').value;
    //var add_payment_type=document.getElementById('add_payment_type').value;
    //var add_classification=document.getElementById('add_classification').value;
    let add_contract_id=document.getElementById('add_contract_id').value;
    let add_product_id=document.getElementById('add_product_id').value;
    let add_amount_money=document.getElementById('add_amount_money').value;
    let add_expect_split_amount=document.getElementById('add_expect_split_amount').value;
    //var add_funding_way=document.getElementById('add_funding_way').value;
    //var add_status=document.getElementById('add_status').value;
    let add_first_payee=document.getElementById('add_first_payee').value;
    let add_first_ratio=document.getElementById('add_first_ratio').value;
    let add_second_payee=document.getElementById('add_second_payee').value;
    let add_second_ratio=document.getElementById('add_second_ratio').value;
    //var add_remarks=document.getElementById('add_remarks').value;
    let num_second_payee=Number(add_second_payee);
    let num_amount_money=Number(add_amount_money);
    let num_expect_split_amount=Number(add_expect_split_amount);
    let length_second_payee=add_second_payee.length;
    let summary=Number(add_first_ratio)+Number(add_second_ratio);
    //alert(add_second_ratio);
    if(!add_receipt_id){
        alert('收款编号不能为空！');
        document.getElementById('add_receipt_id').focus();
        document.getElementById('add_receipt_id').select();
        return ;
    }
    if(!add_payer){
        alert('来款单位不能为空！');
        document.getElementById('add_payer').focus();
        document.getElementById('add_payer').select();
        return ;
    }
    if(!add_contract_id){
        alert('合同号不能为空！');
        document.getElementById('add_contract_id').focus();
        return ;
    }
    if(add_amount_money===''){
        alert('金额不能为空！');
        //add_amount_money.focus();
        return ;
    }
    if(add_expect_split_amount===''){
        alert('预计拆分金额不能为空！');
        //add_expect_split_amount.focus();
        return ;
    }
    if(num_expect_split_amount>num_amount_money){
        alert('预计拆分金额不能大于来款金额！');
        //add_expect_split_amount.focus();
        return ;
    }
    if(!add_first_payee){
        alert('第一收款人不能为空！');
        //add_first_payee.focus();
        return ;
    }
    if(num_second_payee===0 && add_second_ratio>0){
        alert('第二分配比例大于0时其收款人不能为空！');
        //add_second_payee.focus();
        return ;
    }
    if(length_second_payee>0 && add_second_ratio===0){
        alert('第二收款人不为空时分配比例需大于0！');
        //add_second_payee.focus();
        return ;
    }
    if(summary!==100){
        alert('分配比例之和不等于100%！');
        //document.getElementById('add_first_ratio').focus();
        return ;
    }
    let formData = $("#addForm").serialize();
    console.log(formData);
    document.getElementById('fundingAddButton').disabled=true;
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/funding/AddForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("该收款编号下的预计拆分金额将超过总收款额，不予登记！");
                document.getElementById('fundingAddButton').disabled=false;
                window.location.reload();
            }
            if(data===1){
                alert("添加成功！");
                document.getElementById('fundingAddButton').disabled=false;
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
//获取审核ID值
function GetCheckID(id) {
    let row=$("#fundingIndex").bootstrapTable('getSelections');
    $("#check_id").val(row[0].id);
    $("#check_status").selectpicker('val',(row[0].check_status));
    $("#check_status").selectpicker('refresh');
    $("#record_date").val(row[0].record_date);
    $("#check_remarks").val(row[0].check_remarks);
    $("#special_instructions").val(row[0].special_instructions);
}
function CheckPost(){
    let check_id=$("input[name='check_id']").val();
    let check_status=$("input[name='check_status']").val();
    let check_remarks=$("input[name='check_remarks']").val();
    let formData = $("#checkForm").serialize();
    $('#CheckModal').modal('hide');
    document.getElementById('checkButton').disabled=true;
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/funding/CheckForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                document.getElementById('checkButton').disabled=false;
                alert("失败！");
                $('#fundingIndex').bootstrapTable('refresh');
            }
            if(date===1){
                document.getElementById('checkButton').disabled=false;
                Lobibox.notify('success', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-check-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '成功！'
                });
                $('#fundingIndex').bootstrapTable('refresh');
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
//获取编辑ID值
$('#edit_payment_type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#edit_payment_type_input").val($(this).val());
});
function GetEditID(){
    document.getElementById('editButton').disabled=false;
    let row=$("#fundingIndex").bootstrapTable('getSelections');
    $("#edit_id").val(row[0].id);
    $("#edit_receipt_id").val(row[0].receipt_id);
    $("#edit_payer").val(row[0].payer);
    let payment_type=row[0].payment_type.split(',');
    let select_edit_payment_type=$("#edit_payment_type");
    select_edit_payment_type.selectpicker ('val',payment_type).trigger('change');
    select_edit_payment_type.selectpicker('refresh');
    $("#edit_payment_type_input").val(row[0].payment_type);

    $('#edit_classification').selectpicker('val',row[0].classification);//设置选中
    $('#edit_classification').selectpicker('refresh');

    $("#edit_contract_id").val(row[0].contract_id);
    $("#edit_product_id").val(row[0].product_id);
    $("#edit_amount_money").val(row[0].amount_money);
    $("#edit_expect_split_amount").val(row[0].expect_split_amount);
    $('#edit_funding_way').selectpicker('val',row[0].funding_way);//设置选中
    $('#edit_funding_way').selectpicker('refresh');
    $('#edit_status').selectpicker('val',row[0].status);//设置选中
    $('#edit_status').selectpicker('refresh');
    $("#edit_first_payee").val(row[0].first_payee);
    $('#edit_first_ratio').selectpicker('val',row[0].first_ratio);//设置选中
    $('#edit_first_ratio').selectpicker('refresh');
    $("#edit_second_payee").val(row[0].second_payee);
    $('#edit_second_ratio').selectpicker('val',row[0].second_ratio);//设置选中
    $('#edit_second_ratio').selectpicker('refresh');
    $("#edit_remarks").val(row[0].remarks);
}
function EditForm(){
    var edit_id=document.getElementById('edit_id').value;
    var edit_receipt_id=document.getElementById('edit_receipt_id').value;
    var edit_payer=document.getElementById('edit_payer').value;
    var edit_payment_type_input=$("input[name='edit_payment_type_input']").val();
    var edit_classification=$("input[name='edit_classification']").val();
    var edit_contract_id=document.getElementById('edit_contract_id').value;
    var edit_product_id=$("input[name='edit_product_id']").val();
    var edit_amount_money=document.getElementById('edit_amount_money').value;
    var edit_expect_split_amount=document.getElementById('edit_expect_split_amount').value;
    var edit_funding_way=$("input[name='edit_funding_way']").val();
    var edit_status=$("input[name='edit_status']").val();
    var edit_first_payee=$("input[name='edit_first_payee']").val();
    var edit_first_ratio=document.getElementById('edit_first_ratio').value;
    var edit_second_payee=document.getElementById('edit_second_payee').value;
    var edit_second_ratio=document.getElementById('edit_second_ratio').value;
    //var edit_remarks=$("input[name='edit_remarks']").val();
    var nums_second_payee=Number(edit_second_payee);
    var summary=Number(edit_first_ratio)+Number(edit_second_ratio);
    if(edit_receipt_id===''){
        alert('收款编号不能为空！');
        edit_receipt_id.focus();
        return ;
    }
    if(edit_payer===''){
        alert('来款单位不能为空！');
        edit_payer.focus();
        return ;
    }
    if(edit_contract_id===''){
        alert('合同号不能为空！');
        edit_contract_id.focus();
        return ;
    }
    if(edit_amount_money===''){
        alert('金额不能为空！');
        edit_amount_money.focus();
        return ;
    }
    if(edit_expect_split_amount===''){
        alert('预计拆分金额不能为空！');
        edit_expect_split_amount.focus();
        return ;
    }
    if(Number(edit_expect_split_amount)>Number(edit_amount_money)){
        alert('预计拆分金额不能大于来款金额！');
        edit_expect_split_amount.focus();
        return ;
    }
    if(nums_second_payee===0 && edit_second_ratio>0){
        alert('第二分配比例大于0时其收款人不能为空！');
        //add_second_payee.focus();
        return ;
    }
    if(summary!==100){
        alert('分配比例之和不等于100%！');
        edit_first_ratio.focus();
        return ;
    }
    document.getElementById('editButton').disabled=true;
    $('#EditModal').modal('hide');
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/funding/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                $('#EditModal').modal('hide');
                Lobibox.notify('error', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-x-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '更新失败！'
                });
            }
            if(date===1){
                $('#EditModal').modal('hide');
                Lobibox.notify('success', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-check-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '更新成功！'
                });
                $('#fundingIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
function delSubstr() {
    let str1=document.getElementById('add_amount_money').value;
    document.getElementById("add_amount_money").value=str1.replace(/,/g,"");

}
function delSubstring() {
    let str2=document.getElementById('add_expect_split_amount').value;
    document.getElementById("add_expect_split_amount").value=str2.replace(/,/g,"");
}
function delAmountMoney() {
    let str3=document.getElementById('edit_amount_money').value;
    document.getElementById("edit_amount_money").value=str3.replace(/,/g,"");
}
function delExpectAmount() {
    let str4=document.getElementById('edit_expect_split_amount').value;
    document.getElementById("edit_expect_split_amount").value=str4.replace(/,/g,"");
}
function GetDeleteID() {
    let row=$("#fundingIndex").bootstrapTable('getSelections')
    $("#delete_id").val(row[0].id);
}
function Delete(){
    let delete_id=document.getElementById('delete_id').value;
    if(delete_id.length===0){
        alert('未获取到数据！');
        $("#DeleteModal").modal('hide');
        return ;
    }
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/funding/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                $('#DeleteModal').modal('hide');
                Lobibox.notify('error', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-x-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '删除失败！'
                });
            }
            if(date===1){
                $('#DeleteModal').modal('hide');
                Lobibox.notify('success', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-check-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '删除成功！'
                });
                $('#fundingIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
/*function delZero() {
    let str5=document.getElementById('add_receipt_id').value;
    document.getElementById("add_receipt_id").value=str5.replace(/\b(0+)/gi,"");
}*/

//多选框赋值到input
$('#payment_type').on('changed.bs.select', function() {
    $("#input_payment_type").val($(this).val());
});
$('#update_payment_type').on('changed.bs.select', function() {
    $("#input_update_payment_type").val($(this).val());
});
/*function delSubstring() {
    let str2=document.getElementById('bill_amount').value;
    document.getElementById("bill_amount").value=str2.replace(/,/g,"");
}*/
$(function () {
    $('#c_issue_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    });
    $('#c_due_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    });
    $('#income_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')

    })
    $("#acceptanceIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/acceptance/GetAcceptanceInfo", // 服务器数据的加载地址
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
        search : true, // 是否显示搜索框
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
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_bill_id: $('#search_bill_id').val(),                        // 票据编号
                search_bill_status: $('#search_bill_status').val()                     // 票据状态
            };
        },
        formatLoadingMessage: function () {
            return "请稍后，正在加载....";
        },
        formatNoMatches: function () {
            return "暂无匹配数据.";
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
            field: 'attachments_url',
            title: '附件',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                return "<a href='"+value+"#' class='btn btn-xs btn-warning bi bi-arrow-down-square' target='_blank'></a>";
            },
        },{
            field: 'bill_id',
            title: '票据编号',
            align: 'left',
            sortable: false
        }, {
            field: 'contract_type',
            title: '分类',
            align: 'left',
            sortable: false
        },{
            field: 'bill_status',
            title: '票据状态',
            align: 'left',
            sortable: true
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'bill_classification',
            title: '票据分类',
            align: 'left',
            sortable: true
        },{
            field: 'bill_amount',
            title: '票面金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'issue_date',
            title: '出票日期',
            align: 'right',
            sortable: false
        },{
            field: 'due_date',
            title: '到期日期',
            align: 'right',
            sortable: true
        },{
            field: 'receipt_id',
            title: '收款编号',
            align: 'left',
            sortable: false
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        },{
            field: 'transferable',
            title: '是否可转让',
            align: 'left',
            sortable: false
        },{
            field: 'creat_date',
            title: '创建日期',
            align: 'left',
            sortable: false
        },  ],
    });
    $('#acceptanceIndex').bootstrapTable('refresh');
});
    /*查询*/
$('#query').click(function () {
    let search_bill_id = $("#search_bill_id").val();
    let search_bill_status = $("#search_bill_status").val();
    $.ajax({
        type: "post",
        url: "/../tp5/public/index.php/index/acceptance/GetAcceptanceInfo",
        data: [
            {search_bill_id : search_bill_id},
            {search_bill_status : search_bill_status},
        ],
        dataType:"json",
        success : function(json) {
            $("#acceptanceIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
//新建商业票据
function AddNew(){
    let bill_id=document.getElementById('bill_id').value;
    let bill_status=document.getElementById('bill_status').value;
    let company=document.getElementById('company').value;
    let bill_classification=document.getElementById('bill_classification').value;
    if(!bill_id){
        alert('票据编号不能为空！');
        document.getElementById('bill_id').focus();
        document.getElementById('bill_id').select();
        return ;
    }
    if(!bill_status){
        alert('票据状态不能为空！');
        document.getElementById('bill_status').focus();
        document.getElementById('bill_status').select();
        return ;
    }
    if(!company){
        alert('区域不能为空！');
        document.getElementById('company').focus();
        document.getElementById('company').select();
        return ;
    }
    if(!bill_classification){
        alert('票据分类不能为空！');
        document.getElementById('bill_classification').focus();
        document.getElementById('bill_classification').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/acceptance/NewAcceptance",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
            }
            if(data===1){
                alert("成功！");
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
function GetDeleteID() {
    let row=$("#acceptanceIndex").bootstrapTable('getSelections')
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
        url:"/../tp5/public/index.php/index/acceptance/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                alert("删除失败！");
                return false;
            }
            if(date===1){
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
    let row=$("#acceptanceIndex").bootstrapTable('getSelections');
    $("#update_id").val(row[0].id);
    $("#update_bill_id").val(row[0].bill_id);
    $("#update_bill_status").val(row[0].bill_status);
    $("#update_company").val(row[0].company);
    $("#update_bill_classification").val(row[0].bill_classification);
    $("#update_bill_amount").val(row[0].bill_amount);
    $("#update_issue_date").val(row[0].issue_date);
    $("#update_due_date").val(row[0].due_date);
    $("#update_receipt_id").val(row[0].receipt_id);
    $("#update_transferable").val(row[0].transferable);

    $("#update_contract_id").val(row[0].contract_id);
    $("#update_contract_type").val(row[0].contract_type);
    $("#update_customer").val(row[0].customer);
    $("#update_accepting_bank").val(row[0].accepting_bank);
    $("#update_remarks").val(row[0].remarks);
    let payment_type=row[0].payment_type.split(',');
    let update_payment_type=$("#update_payment_type");
    update_payment_type.selectpicker ('val',payment_type).trigger('change');
    update_payment_type.selectpicker('refresh');
    $("#input_update_payment_type").val(row[0].payment_type);
}
function updatePost(){
    let update_id=document.getElementById('update_id').value;
    if(!update_id){
        alert('未获取到数据！');
        $("#EditModal").modal('hide');
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/acceptance/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                $("#EditModal").modal('hide');
                alert("失败！");
            }
            if(date===1){
                $("#EditModal").modal('hide');
                alert("成功！");
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    $('#acceptanceIndex').bootstrapTable('refresh');
}
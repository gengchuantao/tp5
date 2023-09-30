
function delSubstring() {
    let str2=document.getElementById('bill_amount').value;
    document.getElementById("bill_amount").value=str2.replace(/,/g,"");
}
$(function () {
    $('#c_apply_date').datetimepicker({
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

    });
    $("#uncollectibleIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/uncollectible/GetUncollectibleInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        //cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 100, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        //sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        //minimumCountColumns: 2,
        //默认排序字段
        uniqueId: "id",
        /*sortName: "id",
        sortOrder: "desc",*/
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 5, //固定列数
        //fixedNumberWidth: 80,
        locale:"zh-CN",//支持中文
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                search_contract_id: $('#search_contract_id').val(),                        // 票据编号
                search_contract_type: $('#search_contract_type').val()                     // 票据状态
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
            formatter: function (value,row,index) {
                return "<a href='"+value+"#' class='btn btn-xs btn-warning bi bi-arrow-down-square' target='_blank'></a>";
            },
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        }, {
            field: 'uncollectible_status',
            title: '状态',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                if(value==='待审核'){
                    return "<span class='badge' style='background-color: orangered'>"+value+"</span>";
                }else if(value==='待做坏账'){
                    return "<span class='badge' style='background-color: deeppink'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: grey'>"+value+"</span>";
                }
            },
        },{
            field: 'contract_type',
            title: '类别',
            align: 'left',
            sortable: true
        },  {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'contract_total_arrears',
            title: '合同总欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'uncollectible_arrears',
            title: '本次申报金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'uncollectible_arrears_invoice',
            title: '其中已开票',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'apply_date',
            title: '申请日期',
            align: 'left',
            sortable: false
        },{
            field: 'verify_date',
            title: '总部审核日期',
            align: 'left',
            sortable: false
        },{
            field: 'bad_debt_deal_date',
            title: '处理坏账日期',
            align: 'left',
            sortable: false
        },{
            field: 'customer',
            title: '客户',
            align: 'left',
            sortable: false
        },{
            field: 'uncollectible_type',
            title: '不可收类型',
            align: 'left',
            sortable: false
        },{
            field: 'max_account_age_month',
            title: '最长账龄(月)',
            align: 'left',
            sortable: false
        },{
            field: 'remarks',
            title: '备注',
            align: 'right',
            sortable: false
        },  ],
    });
    $('#uncollectibleIndex').bootstrapTable('refresh');
});
// 查询按钮
$('#query').click(function () {
    let search_contract_id = $("#search_contract_id").val();
    let search_contract_type = $("#search_contract_type").val();
    $.ajax({
        type: "post",
        url: "/../tp5/public/index.php/index/uncollectible/GetUncollectibleInfo",
        data: [{search_contract_id : search_contract_id},{search_contract_type : search_contract_type},],
        dataType:"json",
        success : function(json) {
            $("#uncollectibleIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#uncollectibleIndex').bootstrapTable('load', json);
})
//新建商业票据
function AddNew(){
    let contract_id=document.getElementById('contract_id').value;
    let contract_type=document.getElementById('contract_type').value;
    let company=document.getElementById('company').value;
    let customer=document.getElementById('customer').value;
    let uncollectible_type=document.getElementById('uncollectible_type').value;
    if(!contract_id){
        alert('合同号不能为空！');
        document.getElementById('contract_id').focus();
        document.getElementById('contract_id').select();
        return ;
    }
    if(!customer){
        alert('客户不能为空！');
        document.getElementById('customer').focus();
        document.getElementById('customer').select();
        return ;
    }
    if(!contract_type){
        alert('合同类型不能为空！');
        document.getElementById('contract_type').focus();
        document.getElementById('contract_type').select();
        return ;
    }
    if(!company){
        alert('区域不能为空！');
        document.getElementById('company').focus();
        document.getElementById('company').select();
        return ;
    }
    if(!uncollectible_type){
        alert('不可收类型不能为空！');
        document.getElementById('uncollectible_type').focus();
        document.getElementById('uncollectible_type').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/uncollectible/NewUncollectible",
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
function GetDeleteID() {
    let row=$("#uncollectibleIndex").bootstrapTable('getSelections')
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
        url:"/../tp5/public/index.php/index/uncollectible/Delete",
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
    let row=$("#uncollectibleIndex").bootstrapTable('getSelections');
    $("#update_id").val(row[0].id);
    $("#update_contract_id").val(row[0].contract_id);
    $("#update_customer").val(row[0].customer);
    $("#update_contract_type").val(row[0].contract_type);
    $("#update_company").val(row[0].company);
    $("#update_uncollectible_type").val(row[0].uncollectible_type);
    $("#update_contract_total_arrears").val(row[0].contract_total_arrears);
    $("#update_uncollectible_arrears").val(row[0].uncollectible_arrears);
    $("#update_uncollectible_arrears_invoice").val(row[0].uncollectible_arrears_invoice);
    $("#update_max_account_age_month").val(row[0].max_account_age_month);
    $("#update_apply_date").val(row[0].apply_date);
    $("#update_verify_date").val(row[0].verify_date);
    $("#update_bad_debt_deal_date").val(row[0].bad_debt_deal_date);
    $("#update_product_ids").val(row[0].product_ids);
    $("#update_remarks").val(row[0].remarks);
}
function updatePost(){
    console.log("修改数据并重新提交");
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
        url:"/../tp5/public/index.php/index/uncollectible/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                alert("失败！");
                window.location.reload();
            }
            if(date===1){
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

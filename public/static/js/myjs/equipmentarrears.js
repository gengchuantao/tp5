let nowdays = new Date();
let year = nowdays.getFullYear();
let month = nowdays.getMonth();
if(month===0){
    month = 12;
    year = year-1;
}
if(month<10){
    month = '0'+month;
}
let myDate = new Date(year,month,0);
let startDate = year+'-'+month+'-01 00:00:00'; //上个月第一天
let endDate = year+'-'+month+'-'+myDate.getDate();//上个月最后一天
//查询日期赋值
$("#comprehensive_month").val(endDate);
$('#e_update_company').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#update_company").val($(this).val());
});
$('#e_update_follow_person').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#update_follow_person").val($(this).val());
});
$('#e_update_bu_name').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#update_bu_name").val($(this).val());
});
$('#e_update_last_month_arrears_method').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#update_last_month_arrears_method").val($(this).val());
});
$(function () {
    $('#u_this_year_arrears_expected_collection_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#u_history_arrears_expected_collection_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    //当年欠款金额检验
    $('#update_this_year_arrears_expected').bind('input propertychange', function () {
        let a=document.getElementById("update_this_year_arrears").value;
        let b=document.getElementById("update_this_year_arrears_expected").value;
        if(!b){
            b=0;
        }
        let c=document.getElementById("update_history_arrears_expected").value;
        if(!c){
            c=0;
        }
        let sum=parseFloat(b)+parseFloat(c);
        if(b-a>0){
            alert('当年欠款预计收款金额不能高于欠款总金额,请重新录入！');
            document.getElementById('update_this_year_arrears_expected').value="";
            document.getElementById('update_expected_collection_money').value="";
            document.getElementById('update_this_year_arrears_expected').focus();
            document.getElementById('update_this_year_arrears_expected').select();
            return ;
        }else{
            document.getElementById('update_expected_collection_money').value=sum;
        }
    });
    //历史欠款金额检验
    $('#update_history_arrears_expected').bind('input propertychange', function () {
        let a=document.getElementById("update_history_arrears").value;
        let b=document.getElementById("update_history_arrears_expected").value;
        if(!b){
            b=0;
        }
        let c=document.getElementById("update_this_year_arrears_expected").value;
        if(!c){
            c=0;
        }
        let sum=parseFloat(b)+parseFloat(c);
        if(b-a>0){
            alert('历史欠款预计收款金额不能高于欠款总金额,请重新录入！');
            document.getElementById('update_history_arrears_expected').value="";
            document.getElementById('update_expected_collection_money').value="";
            document.getElementById('update_history_arrears_expected').focus();
            document.getElementById('update_history_arrears_expected').select();
            return ;
        }else{
            document.getElementById('update_expected_collection_money').value=sum;
        }
    });
    $("#equipmentArrears").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../equipmentarrears/GetEquipmentArrearsInfoByCondition", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        toolbarAlign:'left',//工具栏的位置
        iconSize : "xs",
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        singleSelect : true, // 设置为true将禁止多选
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        queryParamsType: "",//查询参数组织方式
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        uniqueId: "id",
        sortName: "id", //默认排序字段
        sortOrder: "desc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 6, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item" ><div class="ph-picture" ></div></div>';
        },
        showExport: true,
        buttonsAlign: "right",               //按钮位置
        //Icons:'glyphicon-export',           //按钮图标
        // exportButton: $('#btn_export'),  //为按钮btn_export 绑定导出事件自定义导出按钮(可以不用)
        exportDataType: "basic", // basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            fileName: '设备欠款查询结果导出' +　new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称

        },
        locale:"zh-CN",//支持中文
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                deadline: $('#deadline').val(),
                search_contract_id: $('#search_contract_id').val(),
                search_arrears_status: $('#search_arrears_status').val(),
                search_company: $('#search_company').val(),
                search_bu_name: $('#search_bu_name').val(),
                search_follow_person: $('#search_follow_person').val(),
                search_clause_customer: $('#search_clause_customer').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val()
            };
        },
        formatLoadingMessage: function () {
            return "<span class=\"label label-primary\" style=\"font-size: small\">请稍后，正在加载</span>";
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
        },{
            field: 'comprehensive_month',
            title: '截止日期',
            align: 'left',
            sortable: false
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        },{
            field: 'periods',
            title: '期数',
            align: 'left',
            sortable: false
        },{
            field: 'expire_arrears',
            title: '最终欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return "<a  style='color: red;font-weight: bold'>"+value+"</a>";
            },
        },{
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: false,
        },{
            field: 'fyear',
            title: '财年',
            align: 'left',
            sortable: false
        },{
            field: 'arrears_status',
            title: '状态',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                if(value==='新建'){
                    return "<span class='badge' style='background-color: darkorange'>"+value+"</span>";
                }else if(value==='已提交'){
                    return "<span class='badge' style='background-color: deeppink'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }

            },
        },{
            field: 'legal_status',
            title: '法务',
            align: 'left',
            sortable: false
        },{
            field: 'this_year_arrears',
            title: '当年欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'history_arrears',
            title: '历史欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'min_account_age_month',
            title: '最短账龄(月)',
            align: 'right',
            sortable: false
        },{
            field: 'max_account_age_month',
            title: '最长账龄(月)',
            align: 'right',
            sortable: false
        },{
            field: 'follow_person',
            title: '跟进人',
            align: 'left',
            sortable: false
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: false
        },{
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'arrears',
            title: '系统欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'bad_debt_amount',
            title: '已处理坏账',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'report_reduction',
            title: '报告调减',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'clause_customer',
            title: '买方单位',
            align: 'left',
            sortable: false
        },{
            field: 'customer_classification',
            title: '客户类型',
            align: 'left',
            sortable: false
        },{
            field: 'customer_abbreviation',
            title: '客户简称',
            align: 'left',
            sortable: false
        },{
            field: 'litigation_expire_date',
            title: '诉讼时效到期日',
            align: 'left',
            sortable: false
        },{
            field: 'company_reply',
            title: '分子公司回复',
            align: 'left',
            sortable: false
        },{
            field: 'arrears_reason',
            title: '本月欠款原因',
            align: 'left',
            sortable: false
        },{
            field: 'last_month_arrears_reason',
            title: '上月欠款原因',
            align: 'left',
            sortable: false
        },   ],
    });
    $('#equipmentArrears').bootstrapTable('refresh');
    //回车查询(button模式)(全页面-解决下拉框及日期选择无法回车查询的问题)
    document.onkeydown = function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            $('#query').click();
        }
    };
});
$('#query').click(function () {
    let deadline = $("#deadline").val();
    let search_contract_id = $("#search_contract_id").val();
    let search_arrears_status = $("#search_arrears_status").val();
    let search_company = $("#search_company").val();
    let search_bu_name = $("#search_bu_name").val();
    let search_follow_person = $("#search_follow_person").val();
    let search_clause_customer = $("#search_clause_customer").val();
    let search_customer_abbreviation = $("#search_customer_abbreviation").val();
    $.ajax({
        type: "post",
        url: "/../tp5/public/index.php/index/equipmentarrears/GetEquipmentArrearsInfoByCondition",
        data: [
            {deadline : deadline},
            {search_contract_id : search_contract_id},
            {search_arrears_status : search_arrears_status},
            {search_company : search_company},
            {search_bu_name : search_bu_name},
            {search_follow_person : search_follow_person},
            {search_clause_customer : search_clause_customer},
            {search_customer_abbreviation : search_customer_abbreviation},
        ],
        dataType:"json",
        success : function(json) {
            $("#equipmentArrears").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
//截止日期赋值
let $contractSelectParent=$("#closing_date");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetClosingDate",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $contractSelectParent.append($option);
            $('#closing_date').selectpicker('refresh');
            $('#closing_date').selectpicker('render');
        }
    },
    error: function (xhr) {
        /*错误信息处理*/
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
})
let $productSelectParent=$("#product_closing_date");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetClosingDate",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $productSelectParent.append($option);
            $('#product_closing_date').selectpicker('refresh');
            $('#product_closing_date').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
let $indexSelectParent=$("#index_closing_date");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetClosingDate",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $indexSelectParent.append($option);
            $('#index_closing_date').selectpicker('refresh');
            $('#index_closing_date').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
let $deadline=$("#deadline");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetClosingDate",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $deadline.append($option);
            $('#deadline').selectpicker('refresh');
            $('#deadline').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
let $replyHeadSelectParent=$("#reply_head_product_closing_date");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetClosingDate",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $replyHeadSelectParent.append($option);
            $('#reply_head_product_closing_date').selectpicker('refresh');
            $('#reply_head_product_closing_date').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
function GetUpdateID(id){
    $("#update_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/equipmentarrears/GetEquipmentArrearsInfo",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值update_client_attributes
                $("#update_contract_id_and_periods").val(data[i].contract_id_and_periods);
                $("#update_clause_customer").val(data[i].clause_customer);
                $("#update_customer_type").val(data[i].customer_type);
                $("#update_fix_project_name").val(data[i].fix_project_name);
                $("#update_contract_arrears").val(data[i].contract_arrears);
                $("#update_expire_arrears").val(data[i].expire_arrears);
                $("#update_this_year_arrears").val(data[i].this_year_arrears);
                let u_update_this_year_arrears=data[i].this_year_arrears;
                if(!u_update_this_year_arrears || u_update_this_year_arrears===0){
                    $("#update_this_year_arrears_expected").attr("readOnly",true);
                    $("#this_year_arrears_expected_collection_date").attr("readOnly",true);
                }else{
                    $("#update_this_year_arrears_expected").removeAttr("readOnly");
                    $("#this_year_arrears_expected_collection_date").removeAttr("readOnly");
                }
                $("#update_history_arrears").val(data[i].history_arrears);
                let u_update_history_arrears=data[i].history_arrears;
                if(!u_update_history_arrears || u_update_history_arrears===0){
                    $("#update_history_arrears_expected").attr("readOnly",true);
                    $("#history_arrears_expected_collection_date").attr("readOnly",true);
                }else{
                    $("#update_history_arrears_expected").removeAttr("readOnly");
                    $("#history_arrears_expected_collection_date").removeAttr("readOnly");
                }
                $("#update_company").val(data[i].company);
                $("#update_follow_person").val(data[i].follow_person);
                $("#update_bu_name").val(data[i].bu_name);
                $("#update_last_month_arrears_method").val(data[i].last_month_arrears_method);
                $("#update_last_month_arrears_reason").val(data[i].last_month_arrears_reason);
                $("#update_arrears_reason").val(data[i].arrears_reason);
                //当年欠款预计回收金额
                let u_this_year_arrears_expected=data[i].this_year_arrears_expected;
                if(!u_this_year_arrears_expected || u_this_year_arrears_expected===0){
                    $("#update_this_year_arrears_expected").val('');
                }else{
                    $("#update_this_year_arrears_expected").val(data[i].this_year_arrears_expected);
                }
                //历史欠款预计回收金额
                let u_history_arrears_expected=data[i].history_arrears_expected;
                if(!u_history_arrears_expected || u_history_arrears_expected===0){
                    $("#update_history_arrears_expected").val('');
                }else{
                    $("#update_history_arrears_expected").val(data[i].history_arrears_expected);
                }
                //预计回收总金额
                let u_expected_collection_money=data[i].expected_collection_money;
                if(!u_expected_collection_money || u_expected_collection_money===0){
                    $("#update_expected_collection_money").val('');
                    $("#update_expected_collection_money").attr("readOnly",true);
                }else{
                    $("#update_expected_collection_money").val(data[i].expected_collection_money);
                    $("#update_expected_collection_money").attr("readOnly",true);
                }
                //当年欠款预计回收日期
                let u_this_year_arrears_expected_collection_date=data[i].this_year_arrears_expected_collection_date;
                if(!u_this_year_arrears_expected_collection_date || u_this_year_arrears_expected_collection_date==='0000-00-00'){
                    $("#this_year_arrears_expected_collection_date").val('');
                }else{
                    $("#this_year_arrears_expected_collection_date").val(data[i].this_year_arrears_expected_collection_date);
                }
                //历史欠款预计回收日期
                let u_history_arrears_expected_collection_date=data[i].history_arrears_expected_collection_date;
                if(!u_history_arrears_expected_collection_date || u_history_arrears_expected_collection_date==='0000-00-00'){
                    $("#history_arrears_expected_collection_date").val('');
                }else{
                    $("#history_arrears_expected_collection_date").val(data[i].history_arrears_expected_collection_date);
                }
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
//财年赋值
let $fyearSelectParent=$("#equipment_income_fyear");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipmentarrears/GetEquipmentIncomeHistoryFyear",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $fyearSelectParent.append($option);
            $('#equipment_income_fyear').selectpicker('refresh');
            $('#equipment_income_fyear').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//完工批量修改获取跟进人
function GetAll(){
    let install_company=document.getElementById('update_company').value;
    let  $selectParent=$("#e_update_follow_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetAll",
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
    let install_company=document.getElementById('e_update_company').value;
    let  $selectParent=$("#e_update_bu_name");
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
//更新跟进人及事业部
function UpdatePost(){
    let send_id=document.getElementById('update_id').value;
    let update_company=document.getElementById('update_company').value;
    let update_follow_person=document.getElementById('update_follow_person').value;
    let update_this_year_arrears=document.getElementById('update_this_year_arrears').value;
    let update_history_arrears=document.getElementById('update_history_arrears').value;
    let sum=parseFloat(update_this_year_arrears)+parseFloat(update_history_arrears);
    let update_last_month_arrears_method=document.getElementById('update_last_month_arrears_method').value;
    let update_last_month_arrears_reason=document.getElementById('update_last_month_arrears_reason').value;
    let update_arrears_reason=document.getElementById('update_arrears_reason').value;
    let update_expected_collection_money=document.getElementById('update_expected_collection_money').value;
    let update_this_year_arrears_expected=document.getElementById('update_this_year_arrears_expected').value;
    let update_history_arrears_expected=document.getElementById('update_history_arrears_expected').value;
    let this_year_arrears_expected_collection_date=document.getElementById('this_year_arrears_expected_collection_date').value;
    let history_arrears_expected_collection_date=document.getElementById('history_arrears_expected_collection_date').value;
    if(!update_company){
        alert('区域不能为空！');
        document.getElementById('update_company').focus();
        document.getElementById('update_company').select();
        return ;
    }
    if(!update_follow_person){
        alert('跟进人不能为空！');
        document.getElementById('update_follow_person').focus();
        document.getElementById('update_follow_person').select();
        return ;
    }
    if(!update_last_month_arrears_method){
        alert('欠款处理方法不能为空！');
        document.getElementById('update_last_month_arrears_method').focus();
        document.getElementById('update_last_month_arrears_method').select();
        return ;
    }
    if(!update_arrears_reason){
        alert('本月欠款原因不能为空！');
        document.getElementById('update_arrears_reason').focus();
        document.getElementById('update_arrears_reason').select();
        return ;
    }
    if(update_arrears_reason===update_last_month_arrears_reason){
        alert('本月欠款原因不能与上月一致，请认真填写！');
        document.getElementById('update_arrears_reason').focus();
        document.getElementById('update_arrears_reason').select();
        return ;
    }
    if(sum>0){
        if(!update_expected_collection_money||update_expected_collection_money===0){
            alert('预计回收总金额不能为空或0！');
            document.getElementById('update_expected_collection_money').focus();
            document.getElementById('update_expected_collection_money').select();
            return ;
        }
    }
    if(!this_year_arrears_expected_collection_date && update_this_year_arrears>0){
        alert('当年欠款预计回收日期不能为空');
        document.getElementById('this_year_arrears_expected_collection_date').focus();
        document.getElementById('this_year_arrears_expected_collection_date').select();
        return ;
    }else{
        let day = new Date(); let Year = 0;
        let Month = 0;
        let Day = 0;
        let CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth()+1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10 ) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10 ) {
            CurrentDate += Day ;
        } else {
            CurrentDate += "0" + Day ;
        }
        let startDate = new Date(CurrentDate.replace("-",",")).getTime() ;
        let endDate = new Date(this_year_arrears_expected_collection_date.replace("-",",")).getTime() ;
        if( startDate > endDate ) {
            alert('当年欠款预计回收日期不能小于当前日期！');
            document.getElementById('this_year_arrears_expected_collection_date').focus();
            return ;
        }
    }
    if(!history_arrears_expected_collection_date && update_history_arrears_expected>0){
        alert('历史欠款预计回收日期不能为空');
        document.getElementById('history_arrears_expected_collection_date').focus();
        document.getElementById('history_arrears_expected_collection_date').select();
        return ;
    }else{
        let day = new Date(); let Year = 0;
        let Month = 0;
        let Day = 0;
        let CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth()+1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10 ) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10 ) {
            CurrentDate += Day ;
        } else {
            CurrentDate += "0" + Day ;
        }
        let startDate = new Date(CurrentDate.replace("-",",")).getTime() ;
        let endDate = new Date(history_arrears_expected_collection_date.replace("-",",")).getTime() ;
        if( startDate > endDate ) {
            alert('历史欠款预计回收日期不能小于当前日期！');
            document.getElementById('history_arrears_expected_collection_date').focus();
            return ;
        }
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/equipmentarrears/edit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
            }
            if(data===1){
                alert("成功！");
                $('#EditModal').modal('hide');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//事业部更新欠款原因
function RefreshPost(){
    let send_id=document.getElementById('update_id').value;
    let update_company=document.getElementById('update_company').value;
    let update_follow_person=document.getElementById('update_follow_person').value;
    let update_this_year_arrears=document.getElementById('update_this_year_arrears').value;
    let update_history_arrears=document.getElementById('update_history_arrears').value;
    let sum=parseFloat(update_this_year_arrears)+parseFloat(update_history_arrears);
    let update_last_month_arrears_method=document.getElementById('update_last_month_arrears_method').value;
    let update_last_month_arrears_reason=document.getElementById('update_last_month_arrears_reason').value;
    let update_arrears_reason=document.getElementById('update_arrears_reason').value;
    let update_expected_collection_money=document.getElementById('update_expected_collection_money').value;
    let update_this_year_arrears_expected=document.getElementById('update_this_year_arrears_expected').value;
    let update_history_arrears_expected=document.getElementById('update_history_arrears_expected').value;
    let this_year_arrears_expected_collection_date=document.getElementById('this_year_arrears_expected_collection_date').value;
    let history_arrears_expected_collection_date=document.getElementById('history_arrears_expected_collection_date').value;
    if(!update_company){
        alert('区域不能为空！');
        document.getElementById('update_company').focus();
        document.getElementById('update_company').select();
        return ;
    }
    if(!update_follow_person){
        alert('跟进人不能为空！');
        document.getElementById('update_follow_person').focus();
        document.getElementById('update_follow_person').select();
        return ;
    }
    if(!update_last_month_arrears_method){
        alert('欠款处理方法不能为空！');
        document.getElementById('update_last_month_arrears_method').focus();
        document.getElementById('update_last_month_arrears_method').select();
        return ;
    }
    if(!update_arrears_reason){
        alert('本月欠款原因不能为空！');
        document.getElementById('update_arrears_reason').focus();
        document.getElementById('update_arrears_reason').select();
        return ;
    }
    if(update_arrears_reason===update_last_month_arrears_reason){
        alert('本月欠款原因不能与上月一致，请认真填写！');
        document.getElementById('update_arrears_reason').focus();
        document.getElementById('update_arrears_reason').select();
        return ;
    }
    if(sum>0){
        if(!update_expected_collection_money||update_expected_collection_money===0){
            alert('预计回收总金额不能为空或0！');
            document.getElementById('update_expected_collection_money').focus();
            document.getElementById('update_expected_collection_money').select();
            return ;
        }
    }
    if(!this_year_arrears_expected_collection_date && update_this_year_arrears>0){
        alert('当年欠款预计回收日期不能为空');
        document.getElementById('this_year_arrears_expected_collection_date').focus();
        document.getElementById('this_year_arrears_expected_collection_date').select();
        return ;
    }else{
        let day = new Date(); let Year = 0;
        let Month = 0;
        let Day = 0;
        let CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth()+1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10 ) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10 ) {
            CurrentDate += Day ;
        } else {
            CurrentDate += "0" + Day ;
        }
        let startDate = new Date(CurrentDate.replace("-",",")).getTime() ;
        let endDate = new Date(this_year_arrears_expected_collection_date.replace("-",",")).getTime() ;
        if( startDate > endDate ) {
            alert('当年欠款预计回收日期不能小于当前日期！');
            document.getElementById('this_year_arrears_expected_collection_date').focus();
            return ;
        }
    }
    if(!history_arrears_expected_collection_date && update_history_arrears_expected>0){
        alert('历史欠款预计回收日期不能为空');
        document.getElementById('history_arrears_expected_collection_date').focus();
        document.getElementById('history_arrears_expected_collection_date').select();
        return ;
    }else{
        let day = new Date(); let Year = 0;
        let Month = 0;
        let Day = 0;
        let CurrentDate = "";
        Year = day.getFullYear();
        Month = day.getMonth()+1;
        Day = day.getDate();
        CurrentDate += Year + "-";
        if (Month >= 10 ) {
            CurrentDate += Month + "-";
        } else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10 ) {
            CurrentDate += Day ;
        } else {
            CurrentDate += "0" + Day ;
        }
        let startDate = new Date(CurrentDate.replace("-",",")).getTime() ;
        let endDate = new Date(history_arrears_expected_collection_date.replace("-",",")).getTime() ;
        if( startDate > endDate ) {
            alert('历史欠款预计回收日期不能小于当前日期！');
            document.getElementById('history_arrears_expected_collection_date').focus();
            return ;
        }
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/equipmentarrears/refresh",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
            }
            if(data===1){
                alert("成功！");
                $('#EditModal').modal('hide');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//仅更新跟进人和事业部
function OnlySave(){
    let send_id=document.getElementById('update_id').value;
    let update_company=document.getElementById('update_company').value;
    let update_follow_person=document.getElementById('update_follow_person').value;
    let update_last_month_arrears_method=document.getElementById('update_last_month_arrears_method').value;
    let update_arrears_reason=document.getElementById('update_arrears_reason').value;
    if(!update_company){
        alert('区域不能为空！');
        document.getElementById('update_company').focus();
        document.getElementById('update_company').select();
        return ;
    }
    if(!update_follow_person){
        alert('跟进人不能为空！');
        document.getElementById('update_follow_person').focus();
        document.getElementById('update_follow_person').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/equipmentarrears/onlysave",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
            }
            if(data===1){
                alert("成功！");
                $('#EditModal').modal('hide');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//全选
function CheckAll(){
    // 获取全选按钮的状态，让上面的按钮的选中状态和它的状态相同，
    let flag=document.getElementById("check_all").checked;
    let cks=document.getElementsByName("arrears_check");
    for(let i=0;i<cks.length;i++){
        cks[i].checked=flag;
    }
}
//批量审核获取ID
function SelectAudit(){
    let arrears_check = document.getElementsByName("arrears_check");
    // 获取总共有多少个checkbox
    let len = arrears_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (arrears_check[i].checked) {
            str=str+','+arrears_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchAudit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_audit_id").val(id);
        $("#b_audit_sum").val(k);
    }
}
//批量审核
function BatchAudit(){
    let formData = $("#BatchAuditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/equipmentarrears/BatchAudit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("审核完毕！");
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
//设备欠款合同明细导出
function EquipmentArrearsContractExport() {
    let closing_date=document.getElementById('closing_date').value;
    if(!closing_date){
        alert('截止日期不能为空！');
    }else{
        $('#EquipmentArrearsContractExport').modal('hide');
        let formData = $("#EquipmentArrearsContractExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/equipmentarrears/EquipmentArrearsContractExport?"+formData;
    }
}
//设备欠款工号明细导出
function EquipmentArrearsProductExport() {
    let product_closing_date=document.getElementById('product_closing_date').value;
    if(!product_closing_date){
        alert('截止日期不能为空！');
    }else{
        $('#EquipmentArrearsProductExport').modal('hide');
        let formData = $("#EquipmentArrearsProductExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/equipmentarrears/EquipmentProductArrearsExport?"+formData;
    }
}
//设备历史欠款明细导出
function EquipmentIncomeProductExport(){
    let equipment_income_fyear=document.getElementById('equipment_income_fyear').value;
    if(!equipment_income_fyear){
        alert('财年不能为空！');
    }else{
        $('#EquipmentIncomeProductExport').modal('hide');
        let formData = $("#EquipmentIncomeProductExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/equipmentarrears/EquipmentProductArrearsIncomeExport?"+formData;
    }
}
//总部回复导出
function EquipmentArrearsReplyHeadExport(){
    let reply_head_product_closing_date=document.getElementById('reply_head_product_closing_date').value;
    if(!reply_head_product_closing_date){
        alert('截止日期不能为空！');
    }else{
        $('#EquipmentArrearsReplyHeadExport').modal('hide');
        let formData = $("#EquipmentArrearsReplyHeadExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/equipmentarrears/EquipmentArrearsHeadExport?"+formData;
    }
}
//更新跟进级别
function GetUpdateFollowUpLevelID(id){
    $("#f_update_id").val(id);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/equipmentarrears/GetEquipmentArrearsInfo",
        data:{
            id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值update_client_attributes
                $("#f_update_contract_id_and_periods").val(data[i].contract_id_and_periods);
                $("#f_update_clause_customer").val(data[i].clause_customer);
                $("#f_update_customer_type").val(data[i].customer_type);
                $("#f_update_fix_project_name").val(data[i].fix_project_name);
                $("#f_update_expire_arrears").val(data[i].expire_arrears);
                $("#f_update_this_year_arrears").val(data[i].this_year_arrears);
                $("#f_update_history_arrears").val(data[i].history_arrears);
                $("#f_update_follow_up_level").val(data[i].follow_up_level);
                $("#f_update_solutions").val(data[i].solutions);
                $("#f_update_solution_progress").val(data[i].solution_progress);

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
function UpdateFollowUpLevel(){
    let formData = $("#FollowUpLevelForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/equipmentarrears/UpdateFollowUpLevel",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("提交失败！");
                window.location.reload();
            }
            if(data===1){
                alert("提交成功！");
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
//回复欠款原因
function equipmentArrearsReply(){
    let row=$("#equipmentArrears").bootstrapTable('getSelections');
    //模态框赋值update_client_attributes
    $("#update_id").val(row[0].id);
    $("#update_contract_id_and_periods").val(row[0].contract_id_and_periods);
    $("#update_clause_customer").val(row[0].clause_customer);
    $("#update_customer_type").val(row[0].customer_type);
    $("#update_fix_project_name").val(row[0].fix_project_name);
    $("#update_contract_arrears").val(row[0].contract_arrears);
    $("#update_expire_arrears").val(row[0].expire_arrears);
    $("#update_this_year_arrears").val(row[0].this_year_arrears);
    let u_update_this_year_arrears=row[0].this_year_arrears;
    if(!u_update_this_year_arrears || u_update_this_year_arrears===0){
        $("#update_this_year_arrears_expected").attr("readOnly",true);
        $("#this_year_arrears_expected_collection_date").attr("readOnly",true);
    }else{
        $("#update_this_year_arrears_expected").removeAttr("readOnly");
        $("#this_year_arrears_expected_collection_date").removeAttr("readOnly");
    }
    $("#update_history_arrears").val(row[0].history_arrears);
    let u_update_history_arrears=row[0].history_arrears;
    if(!u_update_history_arrears || u_update_history_arrears===0){
        $("#update_history_arrears_expected").attr("readOnly",true);
        $("#history_arrears_expected_collection_date").attr("readOnly",true);
    }else{
        $("#update_history_arrears_expected").removeAttr("readOnly");
        $("#history_arrears_expected_collection_date").removeAttr("readOnly");
    }
    $("#update_company").val(row[0].company);
    $("#update_follow_person").val(row[0].follow_person);
    $("#update_bu_name").val(row[0].bu_name);
    $("#update_last_month_arrears_method").val(row[0].last_month_arrears_method);
    $("#update_last_month_arrears_reason").val(row[0].last_month_arrears_reason);
    $("#update_arrears_reason").val(row[0].arrears_reason);
    //当年欠款预计回收金额
    let u_this_year_arrears_expected=row[0].this_year_arrears_expected;
    if(!u_this_year_arrears_expected || u_this_year_arrears_expected===0){
        $("#update_this_year_arrears_expected").val('');
    }else{
        $("#update_this_year_arrears_expected").val(row[0].this_year_arrears_expected);
    }
    //历史欠款预计回收金额
    let u_history_arrears_expected=row[0].history_arrears_expected;
    if(!u_history_arrears_expected || u_history_arrears_expected===0){
        $("#update_history_arrears_expected").val('');
    }else{
        $("#update_history_arrears_expected").val(row[0].history_arrears_expected);
    }
    //预计回收总金额
    let u_expected_collection_money=row[0].expected_collection_money;
    if(!u_expected_collection_money || u_expected_collection_money===0){
        $("#update_expected_collection_money").val('');
        $("#update_expected_collection_money").attr("readOnly",true);
    }else{
        $("#update_expected_collection_money").val(row[0].expected_collection_money);
        $("#update_expected_collection_money").attr("readOnly",true);
    }
    //当年欠款预计回收日期
    let u_this_year_arrears_expected_collection_date=row[0].this_year_arrears_expected_collection_date;
    if(!u_this_year_arrears_expected_collection_date || u_this_year_arrears_expected_collection_date==='0000-00-00'){
        $("#this_year_arrears_expected_collection_date").val('');
    }else{
        $("#this_year_arrears_expected_collection_date").val(row[0].this_year_arrears_expected_collection_date);
    }
    //历史欠款预计回收日期
    let u_history_arrears_expected_collection_date=row[0].history_arrears_expected_collection_date;
    if(!u_history_arrears_expected_collection_date || u_history_arrears_expected_collection_date==='0000-00-00'){
        $("#history_arrears_expected_collection_date").val('');
    }else{
        $("#history_arrears_expected_collection_date").val(row[0].history_arrears_expected_collection_date);
    }
    $("#EditModal").modal('show');
}
//标记欠款
function equipmentArrearsMark(){
    let row=$("#equipmentArrears").bootstrapTable('getSelections');
    $("#f_update_id").val(row[0].id);
    $("#f_update_contract_id_and_periods").val(row[0].contract_id_and_periods);
    $("#f_update_clause_customer").val(row[0].clause_customer);
    $("#f_update_customer_type").val(row[0].customer_type);
    $("#f_update_fix_project_name").val(row[0].fix_project_name);
    $("#f_update_expire_arrears").val(row[0].expire_arrears);
    $("#f_update_this_year_arrears").val(row[0].this_year_arrears);
    $("#f_update_history_arrears").val(row[0].history_arrears);
    $("#f_update_follow_up_level").val(row[0].follow_up_level);
    $("#f_update_solutions").val(row[0].solutions);
    $("#f_update_solution_progress").val(row[0].solution_progress);
    $("#FollowUpLevelModal").modal('show');
}
//导出excel
function outExcel() {
    $('#tableGrid').tableExport({
        type: 'excel',
        escape: 'true',
        fileName: 'Excel统计表',  //导出Excel的名称
        ignoreColumn: [0, 1] //删除第0，1列
    })
}
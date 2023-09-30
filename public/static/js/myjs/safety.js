$(function () {
    $("#safetyIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../safety/GetSafetyInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        toolbarAlign:'left',//工具栏的位置
        buttonsClass:'sm',
        cache: true,            //禁用或启用缓存
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
        showToggle:true,    //是否显示详细视图和列表视图的切换按钮
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        /*sortName: "id",
        sortOrder: "desc",*/
        clickToSelect: true,  //点击选择
        showExport: true,
        exportDataType: "all", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 4, //固定列数
        //fixedNumberWidth: 80,
        locale:"zh-CN",//支持中文
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_contract_id: $('#search_contract_id').val(),
                search_buyer_unit: $('#search_buyer_unit').val(),
                search_sales_person: $('#search_sales_person').val(),
                search_project_name: $('#search_project_name').val(),
                search_status: $('#search_status').val(),
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
        }, {
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: true,
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'center',
            sortable: true,
        }, {
            field: 'audit_status',
            title: '审核状态',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='已拒绝'){
                    return "<span class='badge' style='background-color: darkred'>"+value+"</span>";
                }else if(value==='待审核'){
                    return "<span class='badge' style='background-color: orange'>"+value+"</span>";
                }else if(value==='已审核'){
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: grey'>"+value+"</span>";
                }
            },
        },{
            field: 'project_name',
            title: '项目名称',
            align: 'left',
            sortable: false,
        },{
            field: 'project_type',
            title: '类型',
            align: 'left',
            sortable: false,
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
            field: 'contract_num',
            title: '台量',
            align: 'center',
            sortable: false
        },{
            field: 'debuggers',
            title: '作业经理/站长',
            align: 'center',
            sortable: false
        },{
            field: 'team',
            title: '班组',
            align: 'center',
            sortable: false
        },{
            field: 'check_date',
            title: '检查日期',
            align: 'center',
            sortable: false
        },{
            field: 'project_status',
            title: '项目状态',
            align: 'center',
            sortable: false
        },{
            field: 'create_time',
            title: '创建时间',
            align: 'right',
            sortable: false,
        },{
            field: 'update_time',
            title: '更新时间',
            align: 'left',
            sortable: false
        }, ],
    });
    $('#safetyIndex').bootstrapTable('refresh');
    //回车查询(button模式)(全页面-解决下拉框及日期选择无法回车查询的问题)
    document.onkeydown = function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            $('#query').click();
        }
    };
});
$('#query').click(refreshData);
function refreshData() {
    let search_contract_id = $("#search_contract_id").val();
    let search_company = $("#search_company").val();
    let search_project_name = $("#search_project_name").val();
    let search_project_type = $("#search_project_type").val();
    $.ajax({
        type: "post",
        url: "../safety/GetSafetyInfoByCondition",
        data: [
            {search_contract_id : search_contract_id},
            {search_company : search_company},
            {search_project_name : search_project_name},
            {search_project_type : search_project_type},
        ],
        dataType:"json",
        success : function(json) {
            $("#safetyIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
}
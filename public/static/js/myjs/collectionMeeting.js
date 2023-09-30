$(function () {
    $("#search_company").selectpicker('refresh');
    $("#search_attention_level").selectpicker('refresh');
    $("#collectionMeeting").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../collection_meeting/getCollectionMeetingInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        iconSize : "sm",
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        singleSelect : true, // 设置为true将禁止多选
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 20, 50, 100],
        queryParamsType: "",//查询参数组织方式
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        search : true, // 是否显示搜索框
        searchAlign: 'left', //默认搜索框靠左
        searchOnEnterKey: true, // 默认关闭回车搜索
        searchText: ' ', // 搜索框默认填充内容，默认为空
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: true,
        uniqueId: "id",
        sortName: "id", //默认排序字段
        sortOrder: "desc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 4, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        showExport: true,
        buttonsAlign: "left",               //按钮位置
        Icons:'glyphicon-export',           //按钮图标
        exportButton: $('#btn_export'),  //为按钮btn_export 绑定导出事件自定义导出按钮(可以不用)
        exportDataType: "all", // basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: '收款会议资料导出' +　new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称

        },
        locale:"zh-CN",//支持中文
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_company: $('#search_company').val(),
                search_attention_level: $('#search_attention_level').val(),
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
        columns: [
        {
            checkbox: true,
            visible: true                  //是否显示复选框
        },{
                field: 'id',
                title: 'ID',
                visible: true,
                formatter: function (value,row,index) {
                    return index+1;
                },
            },{
            field: 'closing_date',
            title: '截止日期',
            align: 'left',
            sortable: false
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        },{
            field: 'attention_level',
            title: '级别',
            align: 'center',
            sortable: true
        },{
            field: 'delayed_payment_days',
            title: '延迟天数',
            align: 'right',
            sortable: true
        },{
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
                field: 'customer_abbreviation',
                title: '客户简称',
                align: 'left',
                sortable: true
            },{
                field: 'install_arrears',
                title: '总欠款',
                align: 'right',
                sortable: true,
                formatter: function (value,row,index) {
                    let new_value=row["equipment_arrears"]+row["install_arrears"];
                    value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return "<a  style='color: red;font-weight: bold'>"+value+"</a>";
                },
            },{
                field: 'project_name',
                title: '项目名称',
                align: 'left',
                sortable: false
            },{
                field: 'equipment_arrears',
                title: '设备欠款',
                align: 'right',
                sortable: true,
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return "<a  style='color: cadetblue;font-weight: bold'>"+value+"</a>";
                },
            },{
                field: 'install_arrears',
                title: '安装欠款',
                align: 'right',
                sortable: true,
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return "<a  style='color: purple;font-weight: bold'>"+value+"</a>";
                },
            },{
                field: 'equipment_contract_customer',
                title: '设备|安装合同客户',
                align: 'left',
                sortable: false,
                formatter: function (value,row,index) {
                    if(!row["equipment_contract_customer"] || !row["install_contract_customer"]){
                        return row["equipment_contract_customer"]+row["install_contract_customer"];
                    }else{
                        if (row["equipment_contract_customer"]===row["install_contract_customer"]){
                            return row["equipment_contract_customer"];
                        }else{
                            return row["equipment_contract_customer"]+'|'+row["install_contract_customer"];
                        }
                    }

                },
            },{
                field: 'equipment_max_collection_date',
                title: '设备最大收款日期',
                align: 'left',
                sortable: false
            },{
                field: 'install_max_collection_date',
                title: '安装最大收款日期',
                align: 'left',
                sortable: false
            },{
                field: 'litigation_type',
                title: '诉讼类型',
                align: 'left',
                sortable: false
            },],
    });
    $('#collectionMeeting').bootstrapTable('refresh');
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
    let search_company = $("#search_company").val();
    let search_attention_level = $("#search_attention_level").val();
    let search_customer_abbreviation = $("#search_customer_abbreviation").val();
    $.ajax({
        type: "post",
        url: "../collection_meeting/getCollectionMeetingInfo",
        data: [
            {search_company : search_company},
            {search_attention_level : search_attention_level},
            {search_customer_abbreviation : search_customer_abbreviation},
        ],
        dataType:"json",
        success : function(json) {
            $("#collectionMeeting").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
function viewArrearsReason(){
    let row=$("#collectionMeeting").bootstrapTable('getSelections');
    //模态框赋值update_client_attributes
    $("#view_contract_id").val(row[0].contract_id);
    $("#view_project_name").val(row[0].project_name);
    let contract_id = row[0].contract_id;
    let check_equipment_arrears=row[0].equipment_arrears;
    let check_install_arrears=row[0].install_arrears;
    let viewEquipmentArrearsReasonDiv = document.getElementById("viewEquipmentArrearsReasonDiv");
    let viewInstallArrearsReasonDiv = document.getElementById("viewInstallArrearsReasonDiv");
    $('#viewArrearsReason').modal('show');
    $("#viewEquipmentArrearsReasonForm").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/equipmentarrears/GetEquipmentArrearsInfoByContractId", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        singleSelect : true, // 设置为true将禁止多选
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
        pageList: [ 10, 100, 500, 1000,2000],
        queryParamsType: "",//查询参数组织方式
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        search : false, // 是否显示搜索框
        searchAlign: 'left', //默认搜索框靠左
        searchOnEnterKey: false, // 默认关闭回车搜索
        searchText: ' ', // 搜索框默认填充内容，默认为空
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        uniqueId: "id",
        sortName: "id", //默认排序字段
        sortOrder: "desc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 4, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        showExport: false,
        buttonsAlign: "left",               //按钮位置
        Icons:'glyphicon-export',           //按钮图标
        exportButton: $('#btn_export'),  //为按钮btn_export 绑定导出事件自定义导出按钮(可以不用)
        exportDataType: "all", // basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: '收款会议资料导出' +　new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称

        },
        locale:"zh-CN",//支持中文
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                contract_id: contract_id,
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
        columns: [
           {
                field: 'id',
                title: '设备',
                visible: true,
                formatter: function (value,row,index) {
                    return index+1;
                },
            },{
                field: 'comprehensive_month',
                title: '截止日期',
                align: 'left',
                sortable: false
            },{
                field: 'contract_id_and_periods',
                title: '合同号&期数',
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
                field: 'arrears_reason',
                title: '欠款原因',
                align: 'left',
                sortable: true
            },{
                field: 'follow_person',
                title: '跟进人',
                align: 'left',
                sortable: true,
            },],
    });
    $('#viewEquipmentArrearsReasonForm').bootstrapTable('refresh');
    $("#viewInstallArrearsReasonForm").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/installarrears/GetInstallArrearsInfoByContractId", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        singleSelect : true, // 设置为true将禁止多选
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
        pageList: [ 10, 100, 500, 1000,2000],
        queryParamsType: "",//查询参数组织方式
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        search : false, // 是否显示搜索框
        searchAlign: 'left', //默认搜索框靠左
        searchOnEnterKey: false, // 默认关闭回车搜索
        searchText: ' ', // 搜索框默认填充内容，默认为空
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        uniqueId: "id",
        sortName: "id", //默认排序字段
        sortOrder: "desc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 4, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        showExport: false,
        buttonsAlign: "left",               //按钮位置
        Icons:'glyphicon-export',           //按钮图标
        exportButton: $('#btn_export'),  //为按钮btn_export 绑定导出事件自定义导出按钮(可以不用)
        exportDataType: "all", // basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: '收款会议资料导出' +　new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称

        },
        locale:"zh-CN",//支持中文
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                contract_id: contract_id,
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
        columns: [
            {
                field: 'id',
                title: '安装',
                visible: true,
                formatter: function (value,row,index) {
                    return index+1;
                },
            },{
                field: 'comprehensive_month',
                title: '截止日期',
                align: 'left',
                sortable: false
            },{
                field: 'contract_id_and_periods',
                title: '合同号&期数',
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
                field: 'arrears_reason',
                title: '欠款原因',
                align: 'left',
                sortable: true
            },{
                field: 'follow_person',
                title: '跟进人',
                align: 'left',
                sortable: true,
            },],
    });
    $('#viewInstallArrearsReasonForm').bootstrapTable('refresh');
    if(check_equipment_arrears===0){
        viewEquipmentArrearsReasonDiv.style.display="none";
    }else{
        viewEquipmentArrearsReasonDiv.style.display="block";
    }
    if(check_install_arrears===0){
        viewInstallArrearsReasonDiv.style.display="none";
    }else{
        viewInstallArrearsReasonDiv.style.display="block";
    }
}
function meetingRecords(){
    let row=$("#collectionMeeting").bootstrapTable('getSelections');
    if (row.length>0){
        //模态框赋值update_client_attributes
        $("#records_id").val(row[0].id);
        $("#records_contract_id").val(row[0].contract_id);
        $("#records_project_name").val(row[0].project_name);
        let  records_attention_level=$("#records_attention_level");
        records_attention_level.val(row[0].attention_level);
        records_attention_level.selectpicker('refresh');
        $("#records_meeting_records").val(row[0].meeting_records);
        $('#meetingRecords').modal('show');
    }else{

    }

}
function meetingRecordsEdit(){
    let update_id=document.getElementById('records_id').value;
    if(!update_id){
        alert('未获取到数据！');
        $("#meetingRecords").modal('hide');
        return ;
    }
    let formData = $("#meetingRecordsForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"../collection_meeting/meetingRecordsEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                $("#meetingRecords").modal('hide');
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
                    msg: '修改失败！'
                });
            }
            if(date===1){
                $("#meetingRecords").modal('hide');
                Lobibox.notify('success', {
                    pauseDelayOnHover: true,
                    size: 'normal',
                    rounded: true,
                    delayIndicator: false,
                    icon: 'bx bx-x-circle',
                    continueDelayOnInactiveTab: false,
                    position: 'top right',
                    delay: 2000,
                    sound: false,
                    msg: '修改成功！'
                });
                $('#collectionMeeting').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });

}
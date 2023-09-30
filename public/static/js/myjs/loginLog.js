$(function(){
    $("#loginLog").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../Log/getLoginInfo", // 服务器数据的加载地址
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 100, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : true, // 是否显示搜索框
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        //sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: true,
        //minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        showExport: true,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            fileName: '保养站KPI完成情况' +　new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称

        },
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [
            {
                checkbox: true,
                visible: false                  //是否显示复选框
            },{
                field: 'id',
                title: 'ID',
                sortable: true,
            }, {
                field: 'staff_id',
                title: '工号',
                sortable: false
            }, {
                field: 'staff_name',
                title: '姓名',
                align: 'left',
            },{
                field: 'create_time',
                title: '登陆时间',
                align: 'left',
            },{
                field: 'login_ip',
                title: '登陆IP',
                align: 'left',
            },{
                field: 'device',
                title: '登陆设备',
                align: 'left',
            },],
    });
    $('#loginLog').bootstrapTable('refresh');
})

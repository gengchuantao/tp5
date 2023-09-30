
$(function(){
    //#区域PPM
    $("#companyPPM").bootstrapTable('destroy').bootstrapTable({
        method : 'post', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/performance/companyJsonDataCompanyPPM", // 服务器数据的加载地址
        //height:$(window).height() - 250,
        striped: true,  //是否显示行间隔色
        cache: false,  //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        iconSize : 'outline',
        theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit", //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 50, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        search : true, // 是否显示搜索框
        //showFullscreen : true, //显示全屏
        showColumnsToggleAll : true,
        showColumnsSearch: true,
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: true,
        minimumCountColumns: 2,
        showToggle: true,
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        clickToSelect: true,  //点击选择
        showFooter: true,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
        fixedNumberWidth: 80,
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'right',
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        }, {
            field: 'performance_level',
            title: '级别',
            align: 'right',
        }, {
            field: 'total_score',
            title: '总分',
            align: 'right',
            sortable: true,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'fyear',
            title: '财年',
            align: 'right',
            sortable: true
        }, {
            field: 'season',
            title: '季度',
            align: 'right',
            sortable: true
        }, {
            field: 'intoforce_score',
            title: '生效┃25%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'eq_thisyear_score',
            title: '设备当年欠款┃3%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'in_thisyear_score',
            title: '安装当年欠款┃4%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'eq_history_score',
            title: '设备历史欠款┃3%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'in_history_score',
            title: '安装历史欠款┃4%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'eq_income_score',
            title: '设备入金┃5%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'in_income_score',
            title: '安装入金┃4%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'install_complete_score',
            title: '安装完工┃10%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'paid_score',
            title: '有偿保养台量┃7%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'after_service_income_score',
            title: '售后服务入金┃5%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintenance_history_recovery_score',
            title: '保养历史欠款┃3%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintenance_reform_income_score',
            title: '维改类收入┃5%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'repair_history_arrears_score',
            title: '大修改造历史欠款┃2%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'direct_cost_rate_score',
            title: '直接成本率┃10%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'm0_score',
            title: 'M0┃2%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'safe_score',
            title: '安全┃4%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'quality_score',
            title: '质量┃4%',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'install_close_score',
            title: '安装关闭率',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'equipment_close_score',
            title: '设备关闭率',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'delivery_score',
            title: '发货',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'safe_reduction',
            title: '安全减分',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'quality_extra',
            title: '质量加分',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'quality_reduction',
            title: '质量减分',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },],
        onLoadSuccess: function(){  //加载成功时执行
            console.info("加载成功");
        },
        onLoadError: function(){  //加载失败时执行
            console.info("加载数据失败");
        },
        showExport: true,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['excel','xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            fileName: new Date().getTime(),//设置导出的表的默认名称
            worksheetName: 'sheet1',  //表格工作区名称
            //ignoreColumn: [0,11],  //忽略某一列的索引
            // tableName: '总台帐报表',

        },
    });
    $('#companyPPM').bootstrapTable('refresh');
    $('#companyPPM').bootstrapTable('resetView');
})

$(function () {
    $('#r_delivery_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#readiness_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#rejection_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#c_contract_rec_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#c_check_bail_rec_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#c_check_bail_bac_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#both_seal_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#c_both_seal_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#d_drew_date').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#d_drew_review_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#d_drew_upload_time').datepicker({
        //startDate: Date(),
        //endDate:moment(),
        todayBtn: true,
        //clearBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $("#contractIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../contract/GetContractInfoByCondition", // 服务器数据的加载地址
        /*height:$(window).height() -280,*/
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        iconSize : "sm",
        toolbar:"#toolbar",
        toolbarAlign:'left',//工具栏的位置
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        //contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        /*sortName: "id",
        sortOrder: "desc",*/
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 6, //固定列数
        //fixedNumberWidth: 80,
        locale:"zh-CN",//支持中文
        queryParamsType: "",//查询参数组织方式
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        showExport: true,
        exportDataType: "all", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //Icons:'glyphicon-export',
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: '合同明细导出' +　new Date().getTime(),//设置导出的表的默认名称
            tableName:'合同明细表',
            worksheetName: 'sheet1',  //表格工作区名称
        },
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_contract_id: $('#search_contract_id').val(),
                search_buyer_unit: $('#search_buyer_unit').val(),
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
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
            align: 'left',
            sortable: false,
            formatter: function (value,row,index) {
                return "<a href='../product/index?contract_id="+value+"' target='_blank'>"+value+"</a>";
            },
        },{
            field: 'contract_status',
            title: '状态',
            align: 'center',
            sortable: false
        },{
            field: 'process',
            title: '流程',
            align: 'center',
            sortable: true,
            formatter: function (value) {
                if(value==='待提交'){
                    return "<span class='badge' style='background-color: orangered'>"+value+"</span>";
                }else if(value==='待评审'){
                    return "<span class='badge' style='background-color: orange'>"+value+"</span>";
                }else if(value==='已过审'){
                    return "<span class='badge' style='background-color: deeppink'>"+value+"</span>";
                }else if(value==='评审中'){
                    return "<span class='badge' style='background-color: deepskyblue'>"+value+"</span>";
                }else if(value==='已归档'){
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: grey'>"+value+"</span>";
                }
            },
        },{
            field: 'contract_num',
            title: '台量',
            align: 'right',
            sortable: false
        }, {
            field: 'branch',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        }, {
            field: 'buyer_unit',
            title: '买方单位',
            align: 'left',
            sortable: false
        },{
            field: 'cross_region',
            title: '跨区域',
            align: 'center',
            sortable: false
        },{
            field: 'sales_clerk',
            title: '营业员',
            align: 'center',
            sortable: false
        },{
            field: 'intoforce_sum',
            title: '生效',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'if_three_party',
            title: '三方',
            align: 'center',
            sortable: false
        },{
            field: 'if_check',
            title: '调验',
            align: 'center',
            sortable: false
        },{
            field: 'contract_auditor',
            title: '商审',
            align: 'center',
            sortable: false
        },{
            field: 'customer_classification',
            title: '客户分类',
            align: 'center',
            sortable: false
        },{
            field: 'big_client_code',
            title: 'KA编号',
            align: 'center',
            sortable: false
        },{
            field: 'customer_abbreviation',
            title: '客户简称',
            align: 'center',
            sortable: false
        },{
            field: 'project_name',
            title: '项目名称',
            align: 'left',
            sortable: false,
            formatter: function (value,row,index) {
                return "<a href='/../tp5/public/index.php/index/quote/index?project_name="+value+"' target='_blank'>"+value+"</a>";
            },
        },{
            field: 'clarify_cost',
            title: '澄清',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'supporting_cost',
            title: '配套',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'installation_expenditure',
            title: '支出',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_contract_advance',
            title: '设备预收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_contract_received',
            title: '设备实收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_contract_arrears',
            title: '设备欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_expire_arrears',
            title: '设备到期应收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_contract_advance',
            title: '安装预收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_contract_received',
            title: '安装实收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_contract_arrears',
            title: '安装欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_expire_arrears',
            title: '安装到期应收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'collection_person',
            title: '收款人',
            align: 'center',
            sortable: false
        },{
            field: 'elevator_model',
            title: '电梯型号',
            align: 'center',
            sortable: false
        },{
            field: 'branch_service_points',
            title: '分公司服务费',
            align: 'right',
            sortable: false,

        },{
            field: 'equipment_floating_rate',
            title: '设备下浮',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'equipment_floating_rate_with_service',
            title: '设备下浮(含服务费)',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'delivery_status',
            title: '发货状态',
            align: 'center',
            sortable: false
        },{
            field: 'subcontract_status',
            title: '分包状态',
            align: 'center',
            sortable: false
        },{
            field: 'complete_status',
            title: '完工状态',
            align: 'center',
            sortable: false
        },{
            field: 'sd_approved_date',
            title: '过审日期',
            align: 'center',
            sortable: false
        },{
            field: 'both_seal_date',
            title: '双方盖章日期',
            align: 'center',
            sortable: false
        },{
            field: 'enterprise_background',
            title: '企业背景',
            align: 'center',
            sortable: false
        }, {
            field: 'project_type',
            title: '项目属性',
            align: 'center',
            sortable: false
        },],
    });
    $('#contractIndex').bootstrapTable('refresh');
    $("#notEnteredERP").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/contract/notEnteredERP", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
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
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: true,
        }, {
            field: 'branch',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },  ],
    });
    $('#notEnteredERP').bootstrapTable('refresh');
    $("#integrationNotEnteredERP").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/contract/integrationNotEnteredERP", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
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
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: true,
        }, {
            field: 'branch',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },  ],
    });
    $('#integrationNotEnteredERP').bootstrapTable('refresh');
    $("#notEnteredProduct").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/contract/notEnteredProduct", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选

        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
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
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: true,
        },{
            field: 'branch',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },  ],
    });
    $('#notEnteredProduct').bootstrapTable('refresh');
    $("#checkBailUncollected").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/contract/checkBailUncollected", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 5, // 如果设置了分页，每页数据条数
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
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: true,
        },{
            field: 'branch',
            title: '区域',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },  ],
    });
    $('#checkBailUncollected').bootstrapTable('refresh');
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
    let search_contract_id = $("#search_contract_id").val();
    let search_buyer_unit = $("#search_buyer_unit").val();
    let search_process = $("#search_process").val();
    $.ajax({
        type: "post",
        url: "../contract/GetContractInfoByCondition",
        data: [
            {search_contract_id : search_contract_id},
            {search_buyer_unit : search_buyer_unit},
            {search_project_name : search_project_name},
            {search_customer_abbreviation : search_customer_abbreviation},
            {search_process : search_process},
        ],
        dataType:"json",
        success : function(json) {
            $("#contractIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
//获取需要编辑的合同信息
function GetEditID(id) {
    $("#edit_id").val(id);
    let contract_position=[];
    let contract_folder_num=[];
    let contract_folder_order=[];
    let contract_filing_remarks=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/contract/EditPost",
        data:{
            edit_id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                contract_position.push(data[i].contract_position);
                contract_folder_num.push(data[i].contract_folder_num);
                contract_folder_order.push(data[i].contract_folder_order);
                contract_filing_remarks.push(data[i].contract_filing_remarks);
                //模态框赋值
                $("#contract_position").val(contract_position);
                $("#contract_folder_num").val(contract_folder_num);
                $("#contract_folder_order").val(contract_folder_order);
                $("#contract_filing_remarks").val(contract_filing_remarks);
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
//提交编辑合同
function EditForm(){
    let contract_position=document.getElementById('contract_position').value;
    let contract_folder_num=document.getElementById('contract_folder_num').value;
    if(contract_position===''){
        alert('位置不能为空！');
        contract_position.focus();
        return ;
    }
    if(contract_folder_num===''){
        alert('夹号不能为空！');
        contract_folder_num.focus();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/UpdateForm",
        //url:"{:url('Index/funding/UpdateForm')}",  //数据传输的控制器方法
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("合同号不存在！");
                return false;
            }
            if(date==1){
                alert("更新成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
function GetUpdateID(id){
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#update_id").val(row[0].id);
        $("#update_contract_id").val(row[0].contract_id);
        $("#update_contract_num").val(row[0].contract_num);
        $("#update_project_name").val(row[0].project_name);
        $("#update_province").val(row[0].province);
        $("#update_area").val(row[0].area);
        $("#update_county").val(row[0].county);
        $("#update_project_type").selectpicker();
        $("#update_project_type").selectpicker('val',(row[0].project_type));
        $("#update_project_type").selectpicker('refresh');
        $("#update_project_classification").selectpicker();
        $("#update_project_classification").selectpicker('val',(row[0].project_classification));
        $("#update_project_classification").selectpicker('refresh');
        $("#update_buyer_unit").val(row[0].buyer_unit);
        $("#update_use_unit").val(row[0].use_unit);
        $("#update_customer_classification").selectpicker();
        $("#update_customer_classification").selectpicker('val',(row[0].customer_classification));
        $("#update_customer_classification").selectpicker('refresh');
        $("#update_big_client_code").val(row[0].big_client_code);
        $("#update_customer_abbreviation").val(row[0].customer_abbreviation);
        $("#update_sales_clerk").val(row[0].sales_clerk);
        $("#update_collection_person").val(row[0].collection_person);
        $("#update_contract_status").val(row[0].contract_status);
        $("#update_both_seal_date").val(row[0].both_seal_date);
        $("#update_cross_region").selectpicker();
        $("#update_cross_region").selectpicker('val',(row[0].cross_region));
        $("#update_cross_region").selectpicker('refresh');
        $("#update_sale_bu").val(row[0].sale_bu);
        $("#update_install_bu").val(row[0].install_bu);
        $("#update_share_ratio").val(row[0].share_ratio);
        $("#update_install_company").val(row[0].install_company);

        $('#EditModal').modal('show');

    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
    }

}
function UpdatePost(){
    let send_id=document.getElementById('update_id').value;
    let update_contract_id=document.getElementById('update_contract_id').value;
    let update_sales_clerk=document.getElementById('update_sales_clerk').value;
    let update_collection_person=document.getElementById('update_collection_person').value;
    if(!update_contract_id){
        alert('合同号不能为空！');
        document.getElementById('update_contract_id').focus();
        document.getElementById('update_contract_id').select();
        return ;
    }
    if(!update_sales_clerk){
        alert('营业员不能为空！');
        document.getElementById('update_sales_clerk').focus();
        document.getElementById('update_sales_clerk').select();
        return ;
    }
    if(!update_collection_person){
        alert('收款人不能为空！');
        document.getElementById('update_collection_person').focus();
        document.getElementById('update_collection_person').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"../contract/edit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                error_prompt();
            }
            if(data===1){
             $("#EditModal").modal('hide');
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
            $('#contractIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//获取删除ID
function GetDeleteID() {
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#delete_id").val(row[0].id);
        $("#delete_contract_id").val(row[0].contract_id);
        /*显示模态框*/
        $('#DeleteModal').modal('show');
    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
    }
}
//删除合同
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"../contract/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                let time=new Date();
                $("#DeleteModal").modal('hide');
                document.getElementById('failTime').innerHTML=time.toLocaleString();
                document.getElementById('failContents').innerHTML="您需要删除该合同下的工号才能再删除合同！";
                $("#failToast").toast('show');
                $('#contractIndex').bootstrapTable('refresh');
            }
            if(data===1){
                let time=new Date();
                $("#DeleteModal").modal('hide');
                document.getElementById('successTime').innerHTML=time.toLocaleString();
                document.getElementById('successContents').innerHTML="删除成功！";
                $("#successToast").toast('show');
                $('#contractIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//获取提交商务审核ID
function GetSubmitReviewID(){
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#submit_review_id").val(row[0].id);
        $("#s_contract_id").val(row[0].contract_id);
        //过审日期
        let s_sd_approved_date=row[0].sd_approved_date;
        let delivery_date = document.getElementById("s_sd_approved_date");
        if(!s_sd_approved_date || s_sd_approved_date==='0000-00-00'){
            $("#s_sd_approved_date").val('');
        }else{
            $("#s_sd_approved_date").val(row[0].sd_approved_date);
            delivery_date.setAttribute("readOnly",'true');
        }
        $("#s_contract_num").val(row[0].contract_num);
        $("#s_branch").val(row[0].branch);
        $("#s_sales_clerk").val(row[0].sales_clerk);

        $("#s_project_name").val(row[0].project_name);
        $("#s_province").val(row[0].province);
        $("#s_area").val(row[0].area);
        $("#s_county").val(row[0].county);

        $("#s_project_type").val(row[0].project_type);
        $("#s_buyer_unit").val(row[0].buyer_unit);
        $("#s_use_unit").val(row[0].use_unit);
        $("#s_customer_classification").val(row[0].customer_classification);

        $("#s_big_client_code").val(row[0].big_client_code);
        $("#s_big_client_short").val(row[0].big_client_short);
        let s_if_three_party=$('#s_if_three_party');
        s_if_three_party.selectpicker('val',row[0].if_three_party);//设置选中
        s_if_three_party.selectpicker('refresh');
        $('#s_if_check').selectpicker('val',row[0].if_check);//设置选中
        $('#s_if_check').selectpicker('refresh');
        $('#s_before_delivery_per').selectpicker('val',row[0].before_delivery_per);//设置选中
        $('#s_before_delivery_per').selectpicker('refresh');
        $('#s_quality_assurance_per').selectpicker('val',row[0].quality_assurance_per);//设置选中
        $('#s_quality_assurance_per').selectpicker('refresh');
        $('#s_install_contract_sign').selectpicker('val',row[0].install_contract_sign);//设置选中
        $('#s_install_contract_sign').selectpicker('refresh');
        $("#s_branch_service_points").val(row[0].branch_service_points);
        $("#s_first_distributor").val(row[0].first_distributor);
        $("#s_service_charge_points1").val(row[0].service_charge_points1);
        $("#s_second_distributor").val(row[0].second_distributor);
        $("#s_service_charge_points2").val(row[0].service_charge_points2);
        $("#s_clarify").val(row[0].clarify);
        $("#s_both_seal_date").val(row[0].both_seal_date);
        let s_both_seal_date=row[0].both_seal_date;
        let both_seal_date = document.getElementById("s_both_seal_date");
        if(!s_both_seal_date || s_both_seal_date==='0000-00-00'){
            $("#s_both_seal_date").val('');
        }else{
            $("#s_both_seal_date").val(row[0].both_seal_date);
            both_seal_date.setAttribute("readOnly",'true');
        }
        $("#s_process").val(row[0].process);

        /*显示模态框*/
        $('#SubmitReview').modal('show');
    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
    }

}
//分公司提交商务审核
function SubmitReview(){
    let s_sd_approved_date=document.getElementById('s_sd_approved_date').value;
    let s_both_seal_date=document.getElementById('s_both_seal_date').value;
    let s_if_three_party=document.getElementById('s_if_three_party').value;
    let s_if_check=document.getElementById('s_if_check').value;
    let s_before_delivery_per=document.getElementById('s_before_delivery_per').value;
    let s_quality_assurance_per=document.getElementById('s_quality_assurance_per').value;
    let s_install_contract_sign=document.getElementById('s_install_contract_sign').value;
    if(!s_if_three_party){
        alert('是否三方合同不能为空！');
        document.getElementById('s_if_three_party').focus();
        return ;
    }
    if(!s_if_check){
        alert('是否调验合同不能为空！');
        document.getElementById('s_if_check').focus();
        return ;
    }
    if(!s_before_delivery_per){
        alert('设备提货前支付比例不能为空！');
        document.getElementById('s_before_delivery_per').focus();
        return ;
    }
    if(!s_quality_assurance_per){
        alert('设备质保金比例不能为空！');
        document.getElementById('s_quality_assurance_per').focus();
        return ;
    }
    if(!s_install_contract_sign){
        alert('安装合同签订方不能为空！');
        document.getElementById('s_install_contract_sign').focus();
        return ;
    }
    if(s_sd_approved_date.length>0){
        alert('已过审合同不能重新提交！');
        return ;
    }
    if(s_both_seal_date.length>0){
        alert('已归档合同不能重新提交！');
        return ;
    }
    let formData = $("#SubmitReviewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/contract/SubmitReview",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("提交失败！");
            }
            if(data===1){
                alert("提交成功！");
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
//分公司修改信息
function CompanyEdit(){
    let s_both_seal_date=document.getElementById('s_both_seal_date').value;
    let s_if_three_party=document.getElementById('s_if_three_party').value;
    let s_if_check=document.getElementById('s_if_check').value;
    let s_before_delivery_per=document.getElementById('s_before_delivery_per').value;
    let s_quality_assurance_per=document.getElementById('s_quality_assurance_per').value;
    let s_install_contract_sign=document.getElementById('s_install_contract_sign').value;
    if(!s_if_three_party){
        alert('是否三方合同不能为空！');
        document.getElementById('s_if_three_party').focus();
        return ;
    }
    if(!s_if_check){
        alert('是否调验合同不能为空！');
        document.getElementById('s_if_check').focus();
        return ;
    }
    if(!s_before_delivery_per){
        alert('设备提货前支付比例不能为空！');
        document.getElementById('s_before_delivery_per').focus();
        return ;
    }
    if(!s_quality_assurance_per){
        alert('设备质保金比例不能为空！');
        document.getElementById('s_quality_assurance_per').focus();
        return ;
    }
    if(!s_install_contract_sign){
        alert('安装合同签订方不能为空！');
        document.getElementById('s_install_contract_sign').focus();
        return ;
    }
    if(s_both_seal_date.length>0){
        alert('已归档合同不能修改信息，如需修改澄清内容或服务费点数，请联系商审！');
        return ;
    }
    let formData = $("#SubmitReviewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/contract/CompanyEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("修改失败！");
            }
            if(data===1){
                alert("修改成功！");
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
//合同部获取商审信息
function GetCommerceReviewID(id){
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#commerce_review_id").val(row[0].id);
        let c_delivery_date=row[0].delivery_date;
        let delivery_date = document.getElementById("c_delivery_date");
        if(!c_delivery_date || c_delivery_date==='0000-00-00'){
            delivery_date.removeAttribute("readOnly");
            $("#c_delivery_date").val('');
        }else{
            $("#c_delivery_date").val(row[0].delivery_date);
            delivery_date.setAttribute("readOnly",'true');
        }
        $("#c_contract_id").val(row[0].contract_id);
        $("#c_contract_num").val(row[0].contract_num);
        $("#c_branch").val(row[0].branch);
        $("#c_sales_clerk").val(row[0].sales_clerk);
        $("#c_project_name").val(row[0].project_name);
        $("#c_buyer_unit").val(row[0].buyer_unit);
        $("#c_use_unit").val(row[0].use_unit);
        $("#c_customer_classification").val(row[0].customer_classification);

        $("#c_equipment_spl").val(row[0].equipment_spl);
        $("#c_equipment_sign").val(row[0].equipment_sign);
        $("#c_transport_spl").val(row[0].transport_spl);
        $("#c_transport_sign").val(row[0].transport_sign);
        $("#c_installation_spl").val(row[0].installation_spl);
        $("#c_installation_sign").val(row[0].installation_sign);

        $("#c_big_client_code").val(row[0].big_client_code);
        $("#c_customer_abbreviation").val(row[0].customer_abbreviation);
        $("#c_technical_assistance_contract_amount").val(row[0].technical_assistance_contract_amount);
        $('#c_service_fee_agreement_status').selectpicker('val',row[0].service_fee_agreement_status);//服务费协议状态
        $('#c_service_fee_agreement_status').selectpicker('refresh');
        //$("#c_if_three_party").val(row[0].if_three_party);
        $('#c_if_three_party').selectpicker('val',row[0].if_three_party);//是否三方合同
        $('#c_if_three_party').selectpicker('refresh');
        //$("#c_if_check").val(row[0].if_check);
        $('#c_if_check').selectpicker('val',row[0].if_check);//是否调验合同
        $('#c_if_check').selectpicker('refresh');
        //$("#c_before_delivery_per").val(row[0].before_delivery_per);
        $('#c_before_delivery_per').selectpicker('val',row[0].before_delivery_per);//安装合同签订方
        $('#c_before_delivery_per').selectpicker('refresh');
        //$("#c_quality_assurance_per").val(row[0].quality_assurance_per);
        $('#c_quality_assurance_per').selectpicker('val',row[0].quality_assurance_per);//安装合同签订方
        $('#c_quality_assurance_per').selectpicker('refresh');
        //$("#c_install_contract_sign").val(row[0].install_contract_sign);
        $('#c_install_contract_sign').selectpicker('val',row[0].install_contract_sign);//安装合同签订方
        $('#c_install_contract_sign').selectpicker('refresh');
        $("#c_branch_service_points").val(row[0].branch_service_points);
        $("#c_first_distributor").val(row[0].first_distributor);
        $("#c_service_charge_points1").val(row[0].service_charge_points1);
        $("#c_second_distributor").val(row[0].second_distributor);
        $("#c_service_charge_points2").val(row[0].service_charge_points2);
        $("#c_third_distributor").val(row[0].third_distributor);
        $("#c_service_charge_points3").val(row[0].service_charge_points3);
        $("#c_clarify").val(row[0].clarify);
        $("#c_supporting_contract_amount").val(row[0].supporting_contract_amount);
        $("#c_supporting_expenditure").val(row[0].supporting_expenditure);
        $("#c_contract_remarks").val(row[0].contract_remarks);
        //$("#c_branch_submit_date").val(row[0].branch_submit_date);
        //分公司提交日期
        let c_branch_submit_date=row[0].branch_submit_date;
        let branch_submit_date = document.getElementById("c_branch_submit_date");
        if(!c_branch_submit_date || c_branch_submit_date==='0000-00-00'){
            $("#c_branch_submit_date").val('');
        }else{
            $("#c_branch_submit_date").val(row[0].branch_submit_date);
            branch_submit_date.setAttribute("readOnly",'true');
        }

        //首次接收日期判断
        let c_contract_rec_date=row[0].contract_rec_date;
        let contract_rec_date = document.getElementById("c_contract_rec_date");
        if(!c_contract_rec_date || c_contract_rec_date==='0000-00-00'){
            contract_rec_date.removeAttribute("readOnly");
            $("#c_contract_rec_date").val('');
        }else{
            $("#c_contract_rec_date").val(row[0].contract_rec_date);
            contract_rec_date.setAttribute("readOnly",'true');
        }

        $("#c_audit_date").val(row[0].audit_date);
        $("#c_audit_version").val(row[0].audit_version);

        $("#c_clarify_cost").val(row[0].clarify_cost);
        $("#c_supporting_cost").val(row[0].supporting_cost);
        $("#c_check_bail").val(row[0].check_bail);
        //调验保证金收款日期
        let c_check_bail_rec_date=row[0].check_bail_rec_date;
        let check_bail_rec_date = document.getElementById("c_check_bail_rec_date");
        if(!c_check_bail_rec_date || c_check_bail_rec_date==='0000-00-00'){
            check_bail_rec_date.removeAttribute("readOnly");
            $("#c_check_bail_rec_date").val('');
        }else{
            $("#c_check_bail_rec_date").val(row[0].check_bail_rec_date);
            check_bail_rec_date.setAttribute("readOnly",'true');
        }
        //调验保证金退回日期
        let c_check_bail_bac_date=row[0].check_bail_bac_date;
        let check_bail_bac_date = document.getElementById("c_check_bail_bac_date");
        if(!c_check_bail_bac_date || c_check_bail_bac_date==='0000-00-00'){
            check_bail_bac_date.removeAttribute("readOnly");
            $("#c_check_bail_bac_date").val('');
        }else{
            $("#c_check_bail_bac_date").val(row[0].check_bail_bac_date);
            check_bail_bac_date.setAttribute("readOnly",'true');
        }
        //$("#c_check_bail_bac_date").val(row[0].check_bail_bac_date);
        //合同双方盖章日期
        let c_both_seal_date=row[0].both_seal_date;
        let both_seal_date = document.getElementById("c_both_seal_date");
        if(!c_both_seal_date || c_both_seal_date==='0000-00-00'){
            both_seal_date.removeAttribute("readOnly");
            $("#c_both_seal_date").val('');
        }else{
            $("#c_both_seal_date").val(row[0].both_seal_date);
            both_seal_date.setAttribute("readOnly",'true');
            //$("#c_both_seal_date").val(row[0].both_seal_date);
        }
        /*显示模态框*/
        $('#CommerceReview').modal('show');
    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
    }


}
//商审提交
function CommerceReview(){
    let c_delivery_date=document.getElementById('c_delivery_date').value;
    let c_branch_submit_date=document.getElementById('c_branch_submit_date').value;
    let c_contract_rec_date=document.getElementById('c_contract_rec_date').value;

    if(c_delivery_date.length>0){
        alert('总公司已接收合同不能重新提交！');
        return ;
    }
    if(!c_branch_submit_date){
        alert('分公司未提交商审，无法审核！');
        return ;
    }
    if(!c_contract_rec_date){
        alert('未录入资料首次接收日期！');
        document.getElementById('c_contract_rec_date').focus();
        return ;
    }
    let formData = $("#CommerceReviewForm").serialize();
    $('#CommerceReview').modal('hide');
    $.ajax({
        type:"get",
        async:true,
        url:"../contract/CommerceReview",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                Lobibox.notify('warning', {
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
            if(data===1){
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
                $('#contractIndex').bootstrapTable('refresh');
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
//配套澄清修改
function SupportingEdit(){
    let formData = $("#CommerceReviewForm").serialize();
    $('#CommerceReview').modal('hide');
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/contract/SupportingEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
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
            if(data===1){
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
                $('#contractIndex').bootstrapTable('refresh');
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
//合同归档
function ContractFile(){
    let c_both_seal_date=document.getElementById('c_both_seal_date').value;
    let c_clarify=document.getElementById('c_clarify').value;
    let c_clarify_cost=document.getElementById('c_clarify_cost').value;
    if(!c_both_seal_date){
        alert('未录入双方盖章日期！');
        document.getElementById('c_both_seal_date').focus();
        return ;
    }
    if(!c_clarify && c_clarify_cost>0){
        alert('请确认澄清内容！');
        document.getElementById('c_clarify').focus();
        return ;
    }
    let formData = $("#CommerceReviewForm").serialize();
    $('#CommerceReview').modal('hide');
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/contract/ContractFile",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
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
                    msg: '归档失败！'
                });
            }
            if(data===1){
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
                    msg: '归档成功！'
                });
                $('#contractIndex').bootstrapTable('refresh');
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
//获取合同预览信息
function GetContractPreviewID(){
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#p_contract_id").val(row[0].contract_id);
        $("#p_contract_num").val(row[0].contract_num);
        $("#p_branch").val(row[0].branch);
        $("#p_sales_clerk").val(row[0].sales_clerk);
        $("#p_project_name").val(row[0].project_name);
        $("#p_province").val(row[0].province);
        $("#p_area").val(row[0].area);
        $("#p_county").val(row[0].county);
        $("#p_installation_location").val(row[0].installation_location);
        $("#p_project_type").val(row[0].project_type);
        $("#p_buyer_unit").val(row[0].buyer_unit);
        $("#p_use_unit").val(row[0].use_unit);
        $("#p_customer_classification").val(row[0].customer_classification);

        $("#p_equipment_spl").val(row[0].equipment_spl);
        $("#p_equipment_sign").val(row[0].equipment_sign);
        $("#p_transport_spl").val(row[0].transport_spl);
        $("#p_transport_sign").val(row[0].transport_sign);
        $("#p_installation_spl").val(row[0].installation_spl);
        $("#p_installation_sign").val(row[0].installation_sign);

        $("#p_big_client_code").val(row[0].big_client_code);
        $("#p_customer_abbreviation").val(row[0].customer_abbreviation);
        $("#p_if_three_party").val(row[0].if_three_party);
        $("#p_if_check").val(row[0].if_check);
        $("#p_before_delivery_per").val(row[0].before_delivery_per);
        $("#p_quality_assurance_per").val(row[0].quality_assurance_per);
        $("#p_install_contract_sign").val(row[0].install_contract_sign);
        $("#p_branch_service_points").val(row[0].branch_service_points);
        $("#p_first_distributor").val(row[0].first_distributor);
        $("#p_service_charge_points1").val(row[0].service_charge_points1);
        $("#p_second_distributor").val(row[0].second_distributor);
        $("#p_service_charge_points2").val(row[0].service_charge_points2);
        $("#p_clarify").val(row[0].clarify);
        $("#p_supporting_contract_amount").val(row[0].supporting_contract_amount);
        $("#p_supporting_expenditure").val(row[0].supporting_expenditure);
        $("#p_contract_remarks").val(row[0].contract_remarks);
        $("#p_branch_submit_date").val(row[0].branch_submit_date);
        //首次接收日期判断
        $("#p_contract_rec_date").val(row[0].contract_rec_date);

        $("#p_audit_date").val(row[0].audit_date);
        $("#p_audit_version").val(row[0].audit_version);

        $("#p_clarify_cost").val(row[0].clarify_cost);
        $("#p_supporting_cost").val(row[0].supporting_cost);
        $("#p_check_bail").val(row[0].check_bail);
        //调验保证金收款日期
        let p_check_bail_rec_date=row[0].check_bail_rec_date;
        let check_bail_rec_date = document.getElementById("p_check_bail_rec_date");
        if(!p_check_bail_rec_date || p_check_bail_rec_date==='0000-00-00'){
            $("#p_check_bail_rec_date").val('');
        }else{
            $("#p_check_bail_rec_date").val(row[0].check_bail_rec_date);
            check_bail_rec_date.setAttribute("readOnly",'true');
        }
        //调验保证金退回日期
        let p_check_bail_bac_date=row[0].check_bail_bac_date;
        let check_bail_bac_date = document.getElementById("p_check_bail_bac_date");
        if(!p_check_bail_bac_date || p_check_bail_bac_date==='0000-00-00'){
            $("#p_check_bail_bac_date").val('');
        }else{
            $("#p_check_bail_bac_date").val(row[0].check_bail_bac_date);
            check_bail_bac_date.setAttribute("readOnly",'true');
        }
        //$("#c_check_bail_bac_date").val(row[0].check_bail_bac_date);
        //合同双方盖章日期
        let p_both_seal_date=row[0].both_seal_date;
        let both_seal_date = document.getElementById("p_both_seal_date");
        if(!p_both_seal_date || p_both_seal_date==='0000-00-00'){
            $("#p_both_seal_date").val('');
        }else{
            $("#p_both_seal_date").val(row[0].both_seal_date);
            both_seal_date.setAttribute("readOnly",'true');
        }
        $("#p_head_salesperson").val(row[0].head_salesperson);
        $("#p_delivery_date").val(row[0].delivery_date);
        $("#p_send_date").val(row[0].send_date);
        $("#p_send_number").val(row[0].send_number);
        $("#p_contract_auditor").val(row[0].contract_auditor);
        $("#p_head_auditor").val(row[0].head_auditor);
        $('#ContractPreview').modal('show');
    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
    }

}
//获取修改合同号信息
function GetChangeContractID(id){
    let row=$("#contractIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#change_contract_id").val(row[0].id);
        $("#old_contract_id").val(row[0].contract_id);
        /*显示模态框*/
        $('#ChangeContractID').modal('show');
    }else{
        Lobibox.notify('warning', {
            pauseDelayOnHover: true,
            size: 'normal',
            rounded: true,
            delayIndicator: false,
            icon: 'bx bx-x-circle',
            continueDelayOnInactiveTab: false,
            position: 'top right',
            delay: 2000,
            sound: false,
            msg: '请选择合同！'
        });
        $('#ChangeContractID').modal('hide');
    }
}
//修改合同号
function ChangeContractID(){
    let new_contract_id=document.getElementById('new_contract_id').value;
    if(!new_contract_id){
        alert('新合同号不能为空！');
        document.getElementById('new_contract_id').focus();
        document.getElementById('new_contract_id').select();
        return ;
    }
    let formData = $("#ChangeContractIDForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/ChangeContractID",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("已存在的合同号，修改失败！");
                window.location.reload();
            }
            if(data===1){
                alert("修改成功！");
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
//获取指派合同ID
function GetAssignmentID(id){
    $("#contract_assignment_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#d_contract_id").val(data[i].contract_id);
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
//指派合同
function Assignment(){
    let drawing_rec_date=document.getElementById('drawing_rec_date').value;
    if(!drawing_rec_date){
        alert('资料接收日期不能为空！');
        document.getElementById('drawing_rec_date').focus();
        document.getElementById('drawing_rec_date').select();
        return ;
    }
    let formData = $("#AssignmentForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/Assignment",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("指派失败！");
                window.location.reload();
            }
            if(data===1){
                alert("指派成功！");
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
//获取出图ID
function GetDrewID(id){
    $("#contract_drew_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#drew_contract_id").val(data[i].contract_id);
                //出图日期
                let $drew_date=data[i].drew_date;
                let drew_date = document.getElementById("drew_date");
                if(!drew_date || drew_date==='0000-00-00'){
                    $("#drew_date").val('');
                }else{
                    $("#drew_date").val(data[i].drew_date);
                }
                //图纸张数
                $("#drawing_num").val(data[i].drawing_num);
                //图纸版本
                $("#drew_version").val(data[i].drew_version);
                //出图备注
                $("#drew_people_remarks").val(data[i].drew_people_remarks);
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
//出图
function Drew(){
    let drew_date=document.getElementById('drew_date').value;
    let drawing_num=document.getElementById('drawing_num').value;
    if(!drew_date){
        alert('出图日期不能为空！');
        document.getElementById('drew_date').focus();
        document.getElementById('drew_date').select();
        return ;
    }
    if(!drawing_num){
        alert('图纸张数不能为空！');
        document.getElementById('drawing_num').focus();
        document.getElementById('drawing_num').select();
        return ;
    }
    let formData = $("#DrewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/Drew",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("出图失败！");
                window.location.reload();
            }
            if(data===1){
                alert("出图成功！");
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
//获取图纸校审ID
function GetReviewDrawingID(id){
    $("#contract_review_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#review_contract_id").val(data[i].contract_id);
                //校审日期
                let drew_review_date = document.getElementById("drew_review_date");
                if(!drew_review_date || drew_review_date==='0000-00-00'){
                    $("#drew_review_date").val('');
                }else{
                    $("#drew_review_date").val(data[i].drew_review_date);
                }
                //准确率
                $("#proof_accuracy_rate").val(data[i].proof_accuracy_rate);
                //审核备注
                $("#drew_review_remarks").val(data[i].drew_review_remarks);
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
//校审
function ReviewDrawing(){
    let drew_review_date=document.getElementById('drew_review_date').value;
    if(!drew_review_date){
        alert('校审日期不能为空！');
        document.getElementById('drew_review_date').focus();
        document.getElementById('drew_review_date').select();
        return ;
    }
    let formData = $("#ReviewForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/ReviewDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("校审失败！");
                window.location.reload();
            }
            if(data===1){
                alert("校审完成！");
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
//获取图纸上传ID
function GetUploadDrawingID(id){
    $("#contract_upload_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#upload_contract_id").val(data[i].contract_id);
                //上传位置
                $("#drew_position").val(data[i].drew_position);
                //校审日期
                let drew_upload_time = document.getElementById("drew_upload_time");
                if(!drew_upload_time || drew_upload_time==='0000-00-00'){
                    $("#drew_upload_time").val('');
                }else{
                    $("#drew_upload_time").val(data[i].drew_upload_time);
                }
                //上传备注
                $("#upload_remarks").val(data[i].upload_remarks);
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
//上传
function UploadDrawing(){
    let drew_position=document.getElementById('drew_position').value;
    let drew_upload_time=document.getElementById('drew_upload_time').value;
    if(!drew_position){
        alert('存放位置不能为空！');
        document.getElementById('drew_position').focus();
        document.getElementById('drew_position').select();
        return ;
    }
    if(!drew_upload_time){
        alert('上传日期不能为空！');
        document.getElementById('drew_upload_time').focus();
        document.getElementById('drew_upload_time').select();
        return ;
    }
    let formData = $("#UploadDrawingForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/UploadDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("上传失败！");
                window.location.reload();
            }
            if(data===1){
                alert("上传完成！");
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
//获取图纸编辑ID
function GetEditDrawingID(id){
    $("#contract_edit_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#edit_contract_id").val(data[i].contract_id);
                //出图备注
                $("#e_drew_people_remarks").val(data[i].drew_people_remarks);
                //上传备注
                $("#e_upload_remarks").val(data[i].upload_remarks);
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
//编辑备注信息
function EditDrawing(){
    let formData = $("#EditDrawingForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/contract/EditDrawing",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("修改失败！");
                window.location.reload();
            }
            if(data===1){
                alert("修改成功！");
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
//获取新修改单ID
function GetAddModifyID(id) {
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#m_contract_id").val(data[i].contract_id);
                $("#m_branch").val(data[i].branch);
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
//新增修改单
function AddModify() {
    let formData = $("#AddModifyForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/modify/AddModify",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("修改单号重复，请重新录入！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功增加修改单！");
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
//合同归档导出
function ContractFileExport() {
    $('#ContractFileModal').modal('hide');
    let formData = $("#ContractFileForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/contract/ContractFileExport?"+formData;
}
//完工明细导出
function CompleteExport() {
    $('#CompleteExport').modal('hide');
    let formData = $("#CompleteExportForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/product/CompleteExport?"+formData;
}
//过审核表
function Approved(){
    let c_both_seal_date=document.getElementById('c_both_seal_date').value;
    if(c_both_seal_date){
        alert('已归档合同不能重复过审！');
        return ;
    }
    let formData = $("#CommerceReviewForm").serialize();
    $('#CommerceReview').modal('hide');
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/contract/contractApproved",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
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
            if(data===1){
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
                $('#contractIndex').bootstrapTable('refresh');
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
//安装合同预览
function getInstallContractPreviewID(id){
    $("#contract_preview_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/contract/GetContractInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                $("#p_contract_id").val(data[i].contract_id);
                $("#p_contract_num").val(data[i].contract_num);
                $("#p_branch").val(data[i].branch);
                $("#p_sales_clerk").val(data[i].sales_clerk);
                $("#p_project_name").val(data[i].project_name);
                $("#p_province").val(data[i].province);
                $("#p_area").val(data[i].area);
                $("#p_county").val(data[i].county);
                $("#p_installation_location").val(data[i].installation_location);
                $("#p_project_type").val(data[i].project_type);
                $("#p_buyer_unit").val(data[i].buyer_unit);
                $("#p_use_unit").val(data[i].use_unit);
                $("#p_customer_classification").val(data[i].customer_classification);

                $("#p_equipment_spl").val(data[i].equipment_spl);
                $("#p_equipment_sign").val(data[i].equipment_sign);
                $("#p_transport_spl").val(data[i].transport_spl);
                $("#p_transport_sign").val(data[i].transport_sign);
                $("#p_installation_spl").val(data[i].installation_spl);
                $("#p_installation_sign").val(data[i].installation_sign);

                $("#p_big_client_code").val(data[i].big_client_code);
                $("#p_big_client_short").val(data[i].big_client_short);
                $("#p_if_three_party").val(data[i].if_three_party);
                $("#p_if_check").val(data[i].if_check);
                $("#p_before_delivery_per").val(data[i].before_delivery_per);
                $("#p_quality_assurance_per").val(data[i].quality_assurance_per);
                $("#p_install_contract_sign").val(data[i].install_contract_sign);
                $("#p_branch_service_points").val(data[i].branch_service_points);
                $("#p_first_distributor").val(data[i].first_distributor);
                $("#p_service_charge_points1").val(data[i].service_charge_points1);
                $("#p_second_distributor").val(data[i].second_distributor);
                $("#p_service_charge_points2").val(data[i].service_charge_points2);
                $("#p_clarify").val(data[i].clarify);
                $("#p_supporting_contract_amount").val(data[i].supporting_contract_amount);
                $("#p_supporting_expenditure").val(data[i].supporting_expenditure);
                $("#p_contract_remarks").val(data[i].contract_remarks);
                $("#p_branch_submit_date").val(data[i].branch_submit_date);
                //首次接收日期判断
                $("#p_contract_rec_date").val(data[i].contract_rec_date);

                $("#p_audit_date").val(data[i].audit_date);
                $("#p_audit_version").val(data[i].audit_version);

                $("#p_clarify_cost").val(data[i].clarify_cost);
                $("#p_supporting_cost").val(data[i].supporting_cost);
                $("#p_check_bail").val(data[i].check_bail);
                //调验保证金收款日期
                let p_check_bail_rec_date=data[i].check_bail_rec_date;
                let check_bail_rec_date = document.getElementById("p_check_bail_rec_date");
                if(!p_check_bail_rec_date || p_check_bail_rec_date==='0000-00-00'){
                    $("#p_check_bail_rec_date").val('');
                }else{
                    $("#p_check_bail_rec_date").val(data[i].check_bail_rec_date);
                    check_bail_rec_date.setAttribute("readOnly",'true');
                }
                //调验保证金退回日期
                let p_check_bail_bac_date=data[i].check_bail_bac_date;
                let check_bail_bac_date = document.getElementById("p_check_bail_bac_date");
                if(!p_check_bail_bac_date || p_check_bail_bac_date==='0000-00-00'){
                    $("#p_check_bail_bac_date").val('');
                }else{
                    $("#p_check_bail_bac_date").val(data[i].check_bail_bac_date);
                    check_bail_bac_date.setAttribute("readOnly",'true');
                }
                //$("#c_check_bail_bac_date").val(data[i].check_bail_bac_date);
                //合同双方盖章日期
                let p_both_seal_date=data[i].both_seal_date;
                let both_seal_date = document.getElementById("p_both_seal_date");
                if(!p_both_seal_date || p_both_seal_date==='0000-00-00'){
                    $("#p_both_seal_date").val('');
                }else{
                    $("#p_both_seal_date").val(data[i].both_seal_date);
                    both_seal_date.setAttribute("readOnly",'true');
                }
                $("#p_head_salesperson").val(data[i].head_salesperson);
                $("#p_delivery_date").val(data[i].delivery_date);
                $("#p_send_date").val(data[i].send_date);
                $("#p_send_number").val(data[i].send_number);
                $("#p_contract_auditor").val(data[i].contract_auditor);
                $("#p_head_auditor").val(data[i].head_auditor);
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

function error_prompt(msg) {
    Lobibox.notify('error', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        delayIndicator: false,
        icon: 'bx bx-x-circle',
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: '失败！'
    });
}
function success_prompt() {
    Lobibox.notify('success', {
        pauseDelayOnHover: true,
        size: 'mini',
        rounded: true,
        icon: 'bx bx-check-circle',
        delayIndicator: false,
        continueDelayOnInactiveTab: false,
        position: 'top right',
        msg: '成功！'
    });
}

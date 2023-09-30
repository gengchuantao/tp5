$(function () {
    $("#BuScore").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        sortName: "rank",
        sortOrder: "esc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
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
            visible: false                  //是否显示复选框
        }, {
            field: 'rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'score',
            title: '总分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'intoforce_score',
            title: '生效',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_score',
            title: '完工',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'thisyear_score',
            title: '当年欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'history_score',
            title: '历史欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'quote_score',
            title: '报价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'delivery_score',
            title: '发货',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },],
    });
    $('#BuScore').bootstrapTable('refresh');

    $("#BuIntoForce").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        sortName: "intoforce_rank",
        sortOrder: "esc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
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
            visible: false                  //是否显示复选框
        }, {
            field: 'intoforce_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'intoforce_score',
            title: '得分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'intoforce_index',
            title: '指标',
            align: 'right',
            sortable: false
        },{
            field: 'intoforce_complete',
            title: '生效',
            align: 'right',
            sortable: false
        },{
            field: 'company_avg',
            title: '单价指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'conversion',
            title: '折合台量',
            align: 'right',
            sortable: false
        },{
            field: 'intoforce_rate',
            title: '完成率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value).toFixed(2);
                percent += "%";
                return percent;
            },
        },],
    });
    $('#BuIntoForce').bootstrapTable('refresh');
    $("#BuInstall").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        sortName: "install_rank",
        sortOrder: "esc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
            };
        },
        formatLoadingMessage: function () {
            return "请稍后，正在加载";
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
            visible: false                  //是否显示复选框
        }, {
            field: 'install_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'install_score',
            title: '得分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_index',
            title: '指标',
            align: 'right',
            sortable: false
        },{
            field: 'install_complete',
            title: '完工',
            align: 'right',
            sortable: false
        },{
            field: 'install_rate',
            title: '完成率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value).toFixed(2);
                percent += "%";
                return percent;
            },
        },],
    });
    $('#BuInstall').bootstrapTable('refresh');
    $("#BuThisYear").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        sortName: "thisyear_rank",
        sortOrder: "esc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
            };
        },
        formatLoadingMessage: function () {
            return "请稍后，正在加载";
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
            visible: false                  //是否显示复选框
        }, {
            field: 'thisyear_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'thisyear_score',
            title: '得分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_amount',
            title: '设备合同',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_thisyear_arrears',
            title: '设备欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_thisyear_rate',
            title: '欠款率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'in_amount',
            title: '安装合同',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_thisyear_arrears',
            title: '安装欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_thisyear_rate',
            title: '欠款率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        },],
    });
    $('#BuThisYear').bootstrapTable('refresh');
    $("#BuHistory").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
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
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
            };
        },
        formatLoadingMessage: function () {
            return "请稍后，正在加载";
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
            visible: false                  //是否显示复选框
        }, {
            field: 'history_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'history_score',
            title: '得分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_recovery',
            title: '设备入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_balance',
            title: '设备结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_unsplit',
            title: '设备未拆',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_history_rate',
            title: '回收率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'in_recovery',
            title: '安装入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_balance',
            title: '安装结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_unsplit',
            title: '安装未拆',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_history_rate',
            title: '回收率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value).toFixed(2);
                percent += "%";
                return percent;
            },
        },],
    });
    $('#BuHistory').bootstrapTable('refresh');
    $("#BuQuote").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
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
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
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
            visible: false                  //是否显示复选框
        }, {
            field: 'quote_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'quote_index',
            title: '报价指标',
            align: 'right',
            sortable: false
        },{
            field: 'quote_complete',
            title: '实际报价',
            align: 'right',
            sortable: false
        },{
            field: 'bid_index',
            title: '中标指标',
            align: 'right',
            sortable: false
        },{
            field: 'bid_complete',
            title: '实际中标',
            align: 'right',
            sortable: false
        },{
            field: 'quote_score',
            title: '报价加分',
            align: 'right',
            sortable: false
        },],
    });
    $('#BuQuote').bootstrapTable('refresh');
    $("#BuDelivery").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/buscore/GetBuScoreInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 100, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:false,    //是否显示详细视图和列表视图的切换按钮
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        sortName: "delivery_rank",
        sortOrder: "esc",
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 3, //固定列数
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
                search_project_name: $('#search_project_name').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_process: $('#search_process').val(),
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
            visible: false                  //是否显示复选框
        }, {
            field: 'delivery_rank',
            title: '排名',
            align: 'center',
            sortable: true,
        },{
            field: 'bu_name',
            title: '事业部',
            align: 'left',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,value.length-3);
                return value;
            },
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'delivery_index',
            title: '发货指标',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_complete',
            title: '实际发货',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_rate',
            title: '完成率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'delivery_score',
            title: '发货加分',
            align: 'right',
            sortable: false
        },],
    });
    $('#BuDelivery').bootstrapTable('refresh');

});
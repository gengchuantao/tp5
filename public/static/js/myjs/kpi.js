$(function(){
    /*签梯台量*/
    $("#intoForceIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getIntoForceMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#intoForceIndexComplete').bootstrapTable('refresh');
    /*签梯金额(不含税)*/
    $("#IntoForcePriceMonthIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getIntoForcePriceMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#IntoForcePriceMonthIndex').bootstrapTable('refresh');
    /*发货台量*/
    $("#DeliveryMonthIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getDeliveryMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#DeliveryMonthIndex').bootstrapTable('refresh');
    //生效台量按业务类型分类
    $("#intoForceByBusinessType").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/intoForceByContractType", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'sign_complete',
            title: '生效',
            align: 'right',
            sortable: false
        },{
            field: 'distributor_tripartite_contract_into_force',
            title: '经销商三方合同',
            align: 'right',
            sortable: false
        },{
            field: 'distributor_tripartite_contract_into_force_per',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.distributor_tripartite_contract_into_force*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        }, {
            field: 'two_party_contract_into_force',
            title: '两方合同',
            align: 'right',
            sortable: false
        },{
            field: 'two_party_contract_into_force_per',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.two_party_contract_into_force*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        }, {
            field: 'marketing_branch_tripartite_contract_into_force',
            title: '营销司三方合同',
            align: 'right',
            sortable: false
        },{
            field: 'marketing_branch_tripartite_contract_into_force_per',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.marketing_branch_tripartite_contract_into_force*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#intoForceByBusinessType').bootstrapTable('refresh');
    //待生效数据
    $("#preIntoForce").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'pre_intoforce',
            title: '待生效',
            align: 'right',
            sortable: false
        },{
            field: 'pre_intoforce_365days',
            title: '365天内',
            align: 'right',
            sortable: false
        },{
            field: 'pre_intoforce_365days',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.pre_intoforce===0.00){
                    return 0;
                }else{
                    value = (row.pre_intoforce_365days*100/row.pre_intoforce).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'pre_intoforce_730days',
            title: '730天内',
            align: 'right',
            sortable: false
        },{
            field: 'pre_intoforce_730days',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.pre_intoforce===0.00){
                    return 0;
                }else{
                    value = (row.pre_intoforce_730days*100/row.pre_intoforce).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'month_now',
            title: '本月新增',
            align: 'right',
            sortable: false
        }, ],
    });
    $('#preIntoForce').bootstrapTable('refresh');
    //发货完成情况
    $("#deliveryComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/deliveryComplete", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'delivery_index',
            title: '指标',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_complete',
            title: '完成',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_complete',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                if(row.delivery_index===0.00){
                    return 0;
                }else{
                    value = (row.delivery_complete*100/row.delivery_index).toFixed(2)+ "%";
                    return value;
                }
            },
        }, {
            field: 'delivery_over_the_same_period',
            title: '去年同期',
            align: 'right',
            sortable: false
        },{
            field: 'this_month_actual_delivery',
            title: '当月发货',
            align: 'right',
            sortable: false
        },],
    });
    $('#deliveryComplete').bootstrapTable('refresh');
    //生效台量按客户分类
    $("#intoForceByCustomerClassification").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/intoForceByCustomerClassification", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'sign_complete',
            title: '生效台量',
            align: 'right',
            sortable: false
        }, {
            field: 'big_customer',
            title: 'KA客户',
            align: 'right',
            sortable: false
        }, {
            field: 'big_customer_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.big_customer*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'local_customer',
            title: '本地大客户',
            align: 'right',
            sortable: false
        }, {
            field: 'local_customer_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.local_customer*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'distributor',
            title: '经销商',
            align: 'right',
            sortable: false
        }, {
            field: 'distributor_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.distributor*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'general_contractor',
            title: '总包',
            align: 'right',
            sortable: false
        }, {
            field: 'general_contractor_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.general_contractor*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'ordinary_customer',
            title: '普通客户',
            align: 'right',
            sortable: false
        }, {
            field: 'ordinary_customer_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.sign_complete===0.00){
                    return 0;
                }else{
                    value = (row.ordinary_customer*100/row.sign_complete).toFixed(2)+ "%";
                    return value;
                }
            },
        },],
    });
    $('#intoForceByCustomerClassification').bootstrapTable('refresh');
    //生效梯均价
    $("#intoForceAveragePrice").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'eq_average',
            title: '设备本财年',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'last_year_eq_average',
            title: '设备上财年',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'in_average',
            title: '安装本财年',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'last_year_in_average',
            title: '安装上财年',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, ],
    });
    $('#intoForceAveragePrice').bootstrapTable('refresh');
    //新签台量按客户分类
    $("#newSignByCustomerClassification").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/newSignByCustomerClassification", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'new_sign',
            title: '新签台量',
            align: 'right',
            sortable: false
        }, {
            field: 'big_customer_sign',
            title: 'KA客户',
            align: 'right',
            sortable: false
        }, {
            field: 'big_customer_sign_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.new_sign===0.00){
                    return 0;
                }else{
                    value = (row.big_customer_sign*100/row.new_sign).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'local_customer_sign',
            title: '本地大客户',
            align: 'right',
            sortable: false
        }, {
            field: 'local_customer_sign_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.new_sign===0.00){
                    return 0;
                }else{
                    value = (row.local_customer_sign*100/row.new_sign).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'distributor_sign',
            title: '经销商',
            align: 'right',
            sortable: false
        }, {
            field: 'distributor_sign_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.new_sign===0.00){
                    return 0;
                }else{
                    value = (row.distributor_sign*100/row.new_sign).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'general_contractor_sign',
            title: '总包',
            align: 'right',
            sortable: false
        }, {
            field: 'general_contractor_sign_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.new_sign===0.00){
                    return 0;
                }else{
                    value = (row.general_contractor_sign*100/row.new_sign).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'ordinary_customer_sign',
            title: '普通客户',
            align: 'right',
            sortable: false
        }, {
            field: 'ordinary_customer_sign_per',
            title: '占比',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.new_sign===0.00){
                    return 0;
                }else{
                    value = (row.ordinary_customer_sign*100/row.new_sign).toFixed(2)+ "%";
                    return value;
                }
            },
        },],
    });
    $('#newSignByCustomerClassification').bootstrapTable('refresh');
    //各区域新签层站对比
    $("#newSignByAvgFloor").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/newSignByAvgFloor", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'new_sign_avg_floor',
            title: '平均层站',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            sortable: false
        }, {
            field: 'new_sign_avg_equipment_price',
            title: '设备均价',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            sortable: false
        },{
            field: 'new_sign_avg_install_price',
            title: '安装均价',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            sortable: false
        },],
    });
    $('#newSignByAvgFloor').bootstrapTable('refresh');
    //完工指标完成情况
    $("#installIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getInstallCompleteMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'making',
            title: '在制台量',
            align: 'right',
            sortable: false
        }, ],
    });
    $('#installIndexComplete').bootstrapTable('refresh');
    //区域完工产值完成情况
    $("#installWorthIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getInstallWorthMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#installWorthIndexComplete').bootstrapTable('refresh');
    //在制梯情况
    $("#makingAge").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getInstallCompleteMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'making',
            title: '在制台量',
            align: 'right',
            sortable: false
        },{
            field: 'making',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                value = (row.making*100/row.sum_making).toFixed(2)+ "%";
                return value;
            },
        },{
            field: 'making_in_180_days',
            title: '180天内',
            align: 'right',
            sortable: false
        },{
            field: 'making_in_180_days',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                value = (row.making_in_180_days*100/row.making).toFixed(2)+ "%";
                return value;
            },
        },{
            field: 'making_between_180_and_270_days',
            title: '180~270天',
            align: 'right',
            sortable: false
        },{
            field: 'making_between_180_and_270_days',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                value = (row.making_between_180_and_270_days*100/row.making).toFixed(2)+ "%";
                return value;
            },
        },{
            field: 'making_between_270_and_365_days',
            title: '270~365天',
            align: 'right',
            sortable: false
        },{
            field: 'making_between_270_and_365_days',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                value = (row.making_between_270_and_365_days*100/row.making).toFixed(2)+ "%";
                return value;
            },
        },{
            field: 'making_beyond_365_days',
            title: '1年以上',
            align: 'right',
            sortable: false
        },{
            field: 'making_beyond_365_days',
            title: '占比',
            align: 'right',
            sortable: false,
            formatter: function (value,row,index) {
                value = (row.making_beyond_365_days*100/row.making).toFixed(2)+ "%";
                return value;
            },
        },],
    });
    $('#makingAge').bootstrapTable('refresh');
    //区域安装入金完成情况
    $("#installIncomeComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/installIncomeComplete", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#installIncomeComplete').bootstrapTable('refresh');
    //区域设备入金（发货后入金）完成情况
    $("#equipmentIncomeComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/equipmentIncomeComplete", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
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
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                return value;
            },
        },{
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '当月完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(2)+ "%";
                    return value;
                }
            },
        },{
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'accumulated_target',
            title: '累计完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.accumulated_target===0.00){
                    return 0;
                }else{
                    value = (row.accumulated_complete*100/row.accumulated_target).toFixed(2)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#equipmentIncomeComplete').bootstrapTable('refresh');
    // 保养台量数据
    $("#maintainData").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfo", // 服务器数据的加载地址
        /*height:$(window).height() - 250,
        iconSize : 'outline',
        theadClasses: "thead-dark",*/
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 50, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        /*fixedNumberWidth: 80,*/
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },

        columns: [{
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'guarantee',
            title: '合计',
            sortable: false,
            align: 'right',
            formatter: function (value,row) {
                value = value+row.paid;
                return value;
            },
        }, {
            field: 'guarantee',
            title: '三包',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'paid',
            title: '有偿',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'paid_index',
            title: '有偿指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'paid_index',
            title: '有偿完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row.paid/row.paid_index;
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_object',
            title: '保养对象',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintain_object',
            title: '保养率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row.paid/row["maintain_object"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'transfer_rate_index',
            title: '转签率指标',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["transfer_rate_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'transfer_rate_complete',
            title: '转签率实绩',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["transfer_rate_complete"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'transfer_rate_complete',
            title: '转签完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["transfer_rate_complete"]/row["transfer_rate_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'paid',
            title: '有偿:三包',
            align: 'right',
            formatter: function (value,row) {
                value = row.paid/row.guarantee;
                value = value.toFixed(2);
                return value;
            },
        }, ],
    });
    $('#maintainData').bootstrapTable('refresh');
    // 保养业务数据
    $("#maintainBusinessData").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfo", // 服务器数据的加载地址
        /*height:$(window).height() - 250,
        iconSize : 'outline',
        theadClasses: "thead-dark",*/
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 50, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        /*fixedNumberWidth: 80,*/
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },

        columns: [{
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'paid_output_value_index',
            title: '有偿产值指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'paid_output_value_complete',
            title: '有偿产值实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'paid_output_value_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["paid_output_value_complete"]/row["paid_output_value_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_sale_index',
            title: '产值指标',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'maintain_sale',
            title: '产值实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'maintain_sale_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row.maintain_sale/row["maintain_sale_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_income_index',
            title: '入金指标',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'maintain_income',
            title: '入金实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'maintain_income_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_income"]/row["maintain_income_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_cost_rate_index',
            title: '利润率指标',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_cost_rate_index"]
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_cost_rate_complete',
            title: '利润率实际',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_cost_rate_complete"]
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_cost_rate_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                if(row["maintain_cost_rate_complete"]<=0){
                    value = 0.00+"%";
                }else{
                    value = row["maintain_cost_rate_complete"]/row["maintain_cost_rate_index"];
                    value = value.toFixed(2)+"%";
                }
                return value;
            },
        }, {
            field: 'maintain_history_arrears_index',
            title: '历史欠款指标',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'maintain_history_arrears_complete',
            title: '历史欠款实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        },{
            field: 'transfer_rate_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_history_arrears_complete"]/row["maintain_history_arrears_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, ],
    });
    $('#maintainBusinessData').bootstrapTable('refresh');
    // 维改业务数据
    $("#repairBusinessData").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfo", // 服务器数据的加载地址
        /*height:$(window).height() - 250,
        iconSize : 'outline',
        theadClasses: "thead-dark",*/
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 50, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        /*fixedNumberWidth: 80,*/
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },

        columns: [{
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'repair_sale_index',
            title: '销售指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_sale',
            title: '销售实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_sale_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["repair_sale"]/row["repair_sale_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'repair_income_index',
            title: '入金指标',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_income',
            title: '入金实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_income_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["repair_income"]/row["repair_income_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'repair_history_arrears_index',
            title: '历史欠款指标',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_history_arrears_complete',
            title: '历史欠款实际',
            align: 'right',
            formatter: function (value) {
                let reg = /\B(?=(\d{3})+$)/g;
                value=value/1000;
                value = value.toFixed(0);
                value = String(value).replace(reg, ','); //"1,234,567,890";
                return value;
            },
        }, {
            field: 'repair_history_arrears_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["repair_history_arrears_complete"]/row["repair_history_arrears_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'm1m2_index',
            title: 'M1M2指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'm1m2_complete',
            title: 'M1M2实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'm1m2_index',
            title: 'M1M2完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["m1m2_complete"]/row["m1m2_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        },  ],
    });
    $('#repairBusinessData').bootstrapTable('refresh');
    // 区域保养成本及毛利率
    $("#maintainCostData").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfo", // 服务器数据的加载地址
        /*height:$(window).height() - 250,
        iconSize : 'outline',
        theadClasses: "thead-dark",*/
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 50, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        /*fixedNumberWidth: 80,*/
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },

        columns: [{
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'begin_guarantee_ave_year',
            title: '期初在保月平均价格',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'guarantee_ave_year',
            title: '在保月平均价格',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'guarantee_ave_year',
            title: '变化',
            align: 'right',
            formatter: function (value,row) {
                value = row["guarantee_ave_year"]-row["begin_guarantee_ave_year"];
                value = value.toFixed(2);
                return value;
            },
        }, {
            field: 'new_ave_year',
            title: '新签月平均价格',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintain_cost_single',
            title: '单梯保养成本',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'gross_profit_margin',
            title: '利润率',
            align: 'right',
            formatter: function (value,row) {
                value = row["gross_profit_margin"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, ],
    });
    $('#maintainCostData').bootstrapTable('refresh');
    //保养站KPI情况
    $("#stationmasterKpi").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/stationmaster_kpi/biStationmasterKpi", // 服务器数据的加载地址
        height:$(window).height() - 200,
        iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
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
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,3);
                return value;
            },
        }, {
            field: 'station_name',
            title: '保养站',
            sortable: false
        }, {
            field: 'safety_evaluation',
            title: '安全评价',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'quality_evaluation',
            title: '质量评价',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'maintain_num',
            title: '保养台量',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'warranty_num',
            title: '保修台量',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'all_maintain',
            title: '在保台量',
            align: 'right',
            formatter: function (value,row,index) {
                return (row.maintain_num)+(row.warranty_num);//行合计
            },
        },{
            field: 'cost_rate_target',
            title: '利润率指标',
            align: 'right',
            formatter: function (value) {
                value = (Math.round(value*10000))/100 + "%";
                return value;
            },
        },{
            field: 'cost_rate',
            title: '利润率',
            align: 'right',
            formatter: function (value) {
                value = (Math.round(value*10000))/100 + "%";
                return value;
            },
        },{
            field: 'cost_rate_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row["cost_rate"]<=0){
                    value = 0.00+"%";
                }else{
                    value = row["cost_rate"]/row["cost_rate_target"];
                    value = value.toFixed(2)+"%";
                }
                return value;
            },
        },{
            field: 'personnel_efficiency_index',
            title: '人员效率指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'personnel_efficiency',
            title: '人员效率实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'personnel_efficiency_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row["personnel_efficiency_index"]===0){
                    return 0;
                }else{
                    value = Math.round(row["personnel_efficiency"]*100/row.personnel_efficiency_index)+ "%";
                    return value;
                }

            },
        },{
            field: 'repair_income_index',
            title: '改修类入金指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'repair_income',
            title: '改修类入金实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'repair_income_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.repair_income_index===0.00){
                    return 0;
                }else{
                    value = Math.round(row.repair_income*100/row.repair_income_index)+ "%";
                    return value;
                }

            },
        },],
    });
    $('#stationmasterKpi').bootstrapTable('refresh');
})

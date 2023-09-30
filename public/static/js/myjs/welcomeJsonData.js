
$(function(){
    let columns_data=[
        {
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'fyear_index',
            title: '财年指标',
            align: 'right',
            sortable: false
        },{
            field: 'fyear_index',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                let into_force_rate=row.accumulated_complete * 100 / row.fyear_index;
                let fyear_pass = 1*row.fyear_pass;
                if (row.fyear_index === 0.00) {
                    return 0;
                } else {
                    value = into_force_rate.toFixed(1) + "%";
                    if(into_force_rate<fyear_pass){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
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
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                let accumulated_target_into_force_rate=row.accumulated_complete*100/row.accumulated_target;
                if (row.accumulated_complete === 0.00) {
                    return 0;
                } else {
                    value = accumulated_target_into_force_rate.toFixed(1) + "%";
                    if(accumulated_target_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
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
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.current_month_index===0.00){
                    return 0;
                }else{
                    value = (row.current_month_complete*100/row.current_month_index).toFixed(1)+ "%";
                    return value;
                }
            },
        },{
            field: 'quarterly1_index',
            title: 'Q1指标',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly1_complete',
            title: 'Q1完成',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly1_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                let quarterly1_into_force_rate=row.quarterly1_complete*100/row.quarterly1_index;
                if (row.quarterly1_complete === 0.00) {
                    return 0;
                } else {
                    value = quarterly1_into_force_rate.toFixed(1) + "%";
                    if(quarterly1_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
            },
        },{
            field: 'quarterly2_index',
            title: 'Q2指标',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly2_complete',
            title: 'Q2完成',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly2_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                let quarterly2_into_force_rate=row.quarterly2_complete*100/row.quarterly2_index;
                if (row.quarterly2_complete === 0.00) {
                    return 0;
                } else {
                    value = quarterly2_into_force_rate.toFixed(1) + "%";
                    if(quarterly2_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
            },
        },{
            field: 'quarterly3_index',
            title: 'Q3指标',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly3_complete',
            title: 'Q3完成',
            align: 'right',
            sortable: false
        },{
            field: 'quarterly3_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                let quarterly3_into_force_rate=row.quarterly3_complete*100/row.quarterly3_index;
                if (row.quarterly3_complete === 0.00) {
                    return 0;
                } else {
                    value = quarterly3_into_force_rate.toFixed(1) + "%";
                    if(quarterly3_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
            },
        }, ];
    let columns_income_data=[
            {
                checkbox: true,
                visible: false                  //是否显示复选框
            }, {
                field: 'company',
                title: '区域',
                align: 'center',
                sortable: false,
                formatter: function (value) {
                    value = value.substring(0,2);
                    return value;
                },
            },{
                field: 'fyear_index',
                title: '财年指标',
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
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                    let fyear_complete_rate=row.accumulated_complete * 100 / row.fyear_index;
                    let fyear_pass = 1*row.fyear_pass;
                    if (row.accumulated_complete === 0.00) {
                        return 0;
                    } else {
                        value = fyear_complete_rate.toFixed(1) + "%";
                        if(fyear_complete_rate<fyear_pass){
                            return "<a style='color: green' >"+value+"</a>";
                        }else{
                            return "<a style='color: red' >"+value+"</a>";
                        }
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
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                let accumulated_target_into_force_rate=(row.accumulated_complete+row.current_month_complete)*100/row.accumulated_target;
                if (row.accumulated_complete === 0.00) {
                    return 0;
                } else {
                    value = accumulated_target_into_force_rate.toFixed(1) + "%";
                    if(accumulated_target_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
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
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                    if(row.current_month_index===0.00){
                        return 0;
                    }else{
                        value = (row.current_month_complete*100/row.current_month_index).toFixed(1)+ "%";
                        return value;
                    }
                },
            },{
                field: 'quarterly1_index',
                title: 'Q1指标',
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
                field: 'quarterly1_complete',
                title: 'Q1完成',
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
                field: 'quarterly1_complete',
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                    let quarterly1_into_force_rate=row.quarterly1_complete*100/row.quarterly1_index;
                    if (row.quarterly1_complete === 0.00) {
                        return 0;
                    } else {
                        value = quarterly1_into_force_rate.toFixed(1) + "%";
                        if(quarterly1_into_force_rate<100){
                            return "<a style='color: green' >"+value+"</a>";
                        }else{
                            return "<a style='color: red' >"+value+"</a>";
                        }
                    }
                },
            },{
                field: 'quarterly2_index',
                title: 'Q2指标',
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
                field: 'quarterly2_complete',
                title: 'Q2完成',
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
                field: 'quarterly2_complete',
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                    let quarterly2_into_force_rate=row.quarterly2_complete*100/row.quarterly2_index;
                    if (row.quarterly2_complete === 0.00) {
                        return 0;
                    } else {
                        value = quarterly2_into_force_rate.toFixed(1) + "%";
                        if(quarterly2_into_force_rate<100){
                            return "<a style='color: green' >"+value+"</a>";
                        }else{
                            return "<a style='color: red' >"+value+"</a>";
                        }
                    }
                },
            },{
                field: 'quarterly3_index',
                title: 'Q3指标',
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
                field: 'quarterly3_complete',
                title: 'Q3完成',
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
                field: 'quarterly3_complete',
                title: '完成率',
                align: 'right',
            formatter: function (value,row,index) {
                let quarterly3_into_force_rate=row.quarterly3_complete*100/row.quarterly3_index;
                if (row.quarterly3_complete === 0.00) {
                    return 0;
                } else {
                    value = quarterly3_into_force_rate.toFixed(1) + "%";
                    if(quarterly3_into_force_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                }
            },
            },];
    /*区域生效KPI完成情况*/
    $("#intoForceIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getIntoForceMonthIndexInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        //toolbar:"#get",
        iconSize:"xs",
        theadClasses: "bg-secondary text-white",
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server",
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_data,
        showExport: false,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
    });
    $('#intoForceIndexComplete').bootstrapTable('refresh');
    /*办事处生效KPI完成情况*/
    $("#officeIntoForceIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method: 'get', // 服务器数据的请求方式 get or post
        url: "/../tp5/public/index.php/index/office_index/getIntoForceOfficeIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType: "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination: false, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect: false, // 设置为true将禁止多选
        //contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        // pageList: [ 5, 10, 20],
        //pageSize : 100, // 如果设置了分页，每页数据条数
        // pageNumber : 1, // 如果设置了分布，首页页码
        search: false, // 是否显示搜索框
        showColumns: false, // 是否显示工具栏中内容下拉框（选择显示的列）
        //sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        //minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture" ></div></div>';
        },
        //fixedNumberWidth: 80,
        onClickRow: function (row, $element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        columns: columns_data,
    });
    $('#officeIntoForceIndexComplete').bootstrapTable('refresh');
    /*重点项目KPI完成情况*/
    $("#keyProjectIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/keyProjectIndexComplete", // 服务器数据的加载地址
        ajaxOptions: {async:true,},
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        theadClasses: "bg-secondary text-white",
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_data,
    });
    $('#keyProjectIndexComplete').bootstrapTable('refresh');
    /*报价KPI完成情况*/
    $("#quoteIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/quoteIndexComplete", // 服务器数据的加载地址
        ajaxOptions: {async:true,},
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        theadClasses: "bg-secondary text-white",
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_data,
    });
    $('#quoteIndexComplete').bootstrapTable('refresh');
    /*发货KPI完成情况*/
    $("#deliveryIndexKpiComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getDeliveryMonthIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_data,
    });
    $('#deliveryIndexKpiComplete').bootstrapTable('refresh');
    /*完工KPI完成情况*/
    $("#installCompleteIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'POST', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getInstallCompleteMonthIndexInfoByCompany", // 服务器数据的加载地址
        ajaxOptions: {async:true,},
        iconSize : 'sm',
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        theadClasses: "bg-secondary text-white",
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_data,
    });
    /*设备入金完成情况*/
    $("#equipmentIncomeIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/equipmentIncomeCompleteByCompany", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_income_data,
    });
    $('#equipmentIncomeIndexComplete').bootstrapTable('refresh');
    /*安装入金完成情况*/
    $("#installIncomeIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/installIncomeCompleteByCompany", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: columns_income_data,
    });
    $('#installIncomeIndexComplete').bootstrapTable('refresh');
    /*区域当年欠款(元)-->目标值（设备≤10%,安装≤15%)*/
    $("#thisYearArrearsIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
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
            field: 'eq_amount',
            title: '设备合同',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_amount',
            title: '欠款率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.fyear_index===0.00){
                    return 0+ "%";
                }else{
                    value = (row.eq_thisyear_arrears*100/row.eq_amount).toFixed(1)+ "%";
                    return value;
                }
            },
        }, {
            field: 'in_thisyear_arrears',
            title: '安装欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
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
            field: 'in_amount',
            title: '欠款率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.fyear_index===0.00){
                    return 0+ "%";
                }else{
                    value = (row.in_thisyear_arrears*100/row.in_amount).toFixed(1)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#thisYearArrearsIndexComplete').bootstrapTable('refresh');
    /*设备历史欠款回收情况*/
    $("#equipmentHistoryArrears").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'eq_recovery',
            title: '入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_balance',
            title: '结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_unsplit',
            title: '未拆分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_balance',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.eq_arrears_balance===0.00){
                    return 0+ "%";
                }else{
                    value = ((row.eq_recovery+row.eq_arrears_unsplit)*100/(row.eq_arrears_balance+row.eq_recovery)).toFixed(1)+ "%";
                    return value;
                }
            },
        },  ],
    });
    $('#equipmentHistoryArrears').bootstrapTable('refresh');
    /*安装历史欠款回收情况*/
    $("#installHistoryArrears").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "bg-secondary text-white",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'in_recovery',
            title: '入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_balance',
            title: '结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_unsplit',
            title: '未拆分',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_balance',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.in_arrears_balance===0.00){
                    return 0+ "%";
                }else{
                    value = ((row.in_recovery+row.in_arrears_unsplit)*100/(row.in_arrears_balance+row.in_recovery)).toFixed(1)+ "%";
                    return value;
                }
            },
        }, ],
    });
    $('#installHistoryArrears').bootstrapTable('refresh');
    /*731天以上欠款回收情况*/
    $("#historyArrearsOver731Days").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
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
        fixedNumber: 1, //固定列数
        //fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'eq_income_over_731_days',
            title: '设备入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_balance_over731_days',
            title: '设备结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'eq_arrears_balance_over731_days',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.fyear_index===0.00){
                    return 0+ "%";
                }else{
                    value = (row.eq_income_over_731_days*100/(row.eq_income_over_731_days+row.eq_arrears_balance_over731_days)).toFixed(1)+ "%";
                    return value;
                }
            },
        },{
            field: 'in_income_over_731_days',
            title: '安装入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_balance_over731_days',
            title: '安装结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_arrears_balance_over731_days',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.in_income_over_731_days===0.00){
                    return 0+ "%";
                }else{
                    value = (row.in_income_over_731_days*100/(row.in_income_over_731_days+row.in_arrears_balance_over731_days)).toFixed(1)+ "%";
                    return value;
                }
            },
        },  ],
    });
    $('#historyArrearsOver731Days').bootstrapTable('refresh');
    /*366~730天以上欠款回收情况*/
    $("#historyArrearsBetween366And730Days").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: true,
            visible: false                  //是否显示复选框
            }, {
            field: 'company',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
            },{
            field: 'eq_income_between366_and_731_days',
            title: '设备入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            },{
            field: 'eq_arrears_balance_between366_and_731_days',
            title: '设备结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            },{
            field: 'eq_arrears_balance_between366_and_731_days',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.eq_arrears_balance_between366_and_731_days===0.00){
                    return 0+ "%";
                }else{
                    value = (row.eq_income_between366_and_731_days*100/(row.eq_income_between366_and_731_days+row.eq_arrears_balance_between366_and_731_days)).toFixed(1)+ "%";
                    return value;
                }
            },
            },{
            field: 'in_income_between366_and_731_days',
            title: '安装入金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            },{
            field: 'in_arrears_balance_between366_and_731_days',
            title: '安装结余',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
            },{
            field: 'in_arrears_balance_between366_and_731_days',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                if(row.in_income_between366_and_731_days===0.00){
                    return 0+ "%";
                }else{
                    let newValue=row.in_income_between366_and_731_days+row.in_arrears_balance_between366_and_731_days;
                    value = (row.in_income_between366_and_731_days*100/newValue).toFixed(1)+ "%";
                    return value;
                }
            },
            },
        ],
    });
    $('#historyArrearsBetween366And730Days').bootstrapTable('refresh');
    /*生效、待生效、待签订数据*/
    $("#intoForcePreIntoForcePreSign").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'sign_index',
            title: '指标',
            align: 'right',
            sortable: false
        },{
            field: 'sign_complete',
            title: '生效',
            align: 'right',
            sortable: false
        },{
            field: 'sign_rate',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                value = value.toFixed(2)+ "%";
                if(row.sign_rate<row.year_pass){
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: orangered'>"+value+"</span>";
                }
            },
        },{
            field: 'pre_intoforce',
            title: '待生效',
            align: 'right',
            sortable: false
        },{
            field: 'pre_sign',
            title: '待签订',
            align: 'right',
            sortable: false
        },{
            field: 'pre_sign',
            title: '合计',
            align: 'right',
            formatter: function (value,row,index) {
                    value = row.pre_sign+row.pre_intoforce+row.sign_complete;
                    return value;
            },
        },{
            field: 'excellent',
            title: '卓越线',
            align: 'right',
        },{
                field: 'into_force_debug_index',
                title: '调验线',
                align: 'right',
            },{
                field: 'into_force_debug_complete',
                title: '完成',
                align: 'right',
            },{
                field: 'into_force_debug_complete',
                title: '完成率',
                align: 'right',
                formatter: function (value,row,index) {
                    let into_force_debug_complete_rate=row.into_force_debug_complete * 100 / row.into_force_debug_index;
                    value = into_force_debug_complete_rate.toFixed(1) + "%";
                    if(into_force_debug_complete_rate<100){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                },
            }, ],
    });
    $('#intoForcePreIntoForcePreSign').bootstrapTable('refresh');
    /*发货指标及完成情况*/
    $("#deliveryIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'delivery_index',
            title: '指标',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_complete',
            title: '发货',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_rate',
            title: '完成率',
            align: 'right',
            formatter: function (value,row,index) {
                value=100*value;
                value = value.toFixed(2)+ "%";
                if(row.delivery_rate*100<row.year_pass){
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: orangered'>"+value+"</span>";
                }

            },
        },{
            field: 'delivery_over_the_same_period',
            title: '上财年同期发货',
            align: 'right',
            sortable: false
        },{
            field: 'delivery_over_the_same_period',
            title: '同比',
            align: 'right',
            formatter: function (value,row,index) {
                 value=100*(row.delivery_complete-row.delivery_over_the_same_period)/row.delivery_over_the_same_period;
                 new_value = value.toFixed(2)+ "%";
                if(value<0){
                    return "<a style='color: green' >"+new_value+"↓</a>";
                }else{
                    return "<a style='color: red' >"+new_value+"↑</a>";
                }
            },
        },{
            field: 'this_month_actual_delivery',
            title: '当月发货',
            align: 'right',
            sortable: false
        }, ],
    });
    $('#deliveryIndexComplete').bootstrapTable('refresh');
    //生效台量按客户分类
    $("#intoForceByCustomerClassification").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/intoforceByCustomerClassification", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
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
    //新签台量按客户分类
    $("#newSignByCustomerClassification").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/newSignByCustomerClassification", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
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
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
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
    //#事业部安装收款预测
    $("#buInstallPredict").bootstrapTable('destroy').bootstrapTable({
        method : 'post', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/installarrears/jsonDataBuInstallPredict", // 服务器数据的加载地址
        height:$(window).height() - 250,
        striped: true,  //是否显示行间隔色
        cache: true,  //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        iconSize : 'outline',
        theadClasses: "thead-dark",
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
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },
        //search : true, // 是否显示搜索框
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: true,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: true,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        fixedNumberWidth: 80,

        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'bu_sname',
            title: '事业部',
            sortable: true
        }, {
            field: 'company',
            title: '区域',
            sortable: true
        }, {
            field: 'month4_1',
            title: '4月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month4_2',
            title: '4月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month5_1',
            title: '5月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month5_2',
            title: '5月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month6_1',
            title: '6月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month6_2',
            title: '6月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month7_1',
            title: '7月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month7_2',
            title: '7月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month8_1',
            title: '8月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month8_2',
            title: '8月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month9_1',
            title: '9月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month9_2',
            title: '9月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month10_1',
            title: '10月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month10_2',
            title: '10月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month11_1',
            title: '11月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month11_2',
            title: '11月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month12_1',
            title: '12月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month12_2',
            title: '12月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month1_1',
            title: '1月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month1_2',
            title: '1月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month2_1',
            title: '2月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month2_2',
            title: '2月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month3_1',
            title: '3月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month3_2',
            title: '3月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'total_1',
            title: '当年合计',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'total_2',
            title: '历史合计',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },],
    });
    $('#buInstallPredict').bootstrapTable('refresh');
    // 事业部设备收款预测
    $("#buEquipmentPredict").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/equipmentarrears/jsonDataBuEquipmentPredict", // 服务器数据的加载地址
        height:$(window).height() - 250,
        iconSize : 'outline',
        theadClasses: "thead-dark",
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
        //search : true, // 是否显示搜索框
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: true,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: true,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
        fixedNumberWidth: 80,
        onClickRow:function (row,$element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
        },

        columns: [{
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'bu_sname',
            title: '事业部',
            sortable: true
        }, {
            field: 'company',
            title: '区域',
            sortable: true
        }, {
            field: 'month4_1',
            title: '4月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month4_2',
            title: '4月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month5_1',
            title: '5月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month5_2',
            title: '5月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month6_1',
            title: '6月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month6_2',
            title: '6月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month7_1',
            title: '7月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month7_2',
            title: '7月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month8_1',
            title: '8月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month8_2',
            title: '8月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month9_1',
            title: '9月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month9_2',
            title: '9月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month10_1',
            title: '10月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month10_2',
            title: '10月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month11_1',
            title: '11月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month11_2',
            title: '11月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month12_1',
            title: '12月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month12_2',
            title: '12月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month1_1',
            title: '1月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month1_2',
            title: '1月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month2_1',
            title: '2月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month2_2',
            title: '2月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month3_1',
            title: '3月当年',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'month3_2',
            title: '3月历史',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'total_1',
            title: '当年合计',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'total_2',
            title: '历史合计',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },],
    });
    $('#buEquipmentPredict').bootstrapTable('refresh');
    // 保养台量数据
    $("#maintainData").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../Maintain/getMaintainInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
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
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        }, {
            field: 'paid_output_value_index',
            title: '有偿产值指标',
            align: 'right',
            sortable: false,
            formatter: function (value,row) {
                value = value+row.paid;
                return value;
            },
        }, {
            field: 'paid_output_value_complete',
            title: '有偿产值实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
            title: '销售指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintain_sale',
            title: '销售实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'maintain_income',
            title: '入金实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
            title: '成本率指标',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_cost_rate_index"]
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_cost_rate_complete',
            title: '成本率实际',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_cost_rate_complete"]
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_cost_rate_complete',
            title: '折合完成率',
            align: 'right',
            formatter: function (value,row) {
                value = row["maintain_cost_rate_complete"]*-100/row["maintain_cost_rate_index"]+200;
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'maintain_history_arrears_index',
            title: '历史欠款指标',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_history_arrears_index"]
                value = value.toFixed(2)+"%";
                return value;
            },
        },{
            field: 'maintain_history_arrears_complete',
            title: '历史欠款实际',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["maintain_history_arrears_complete"]
                value = value.toFixed(2)+"%";
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
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        }, {
            field: 'repair_sale_index',
            title: '销售指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'repair_sale',
            title: '销售实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'repair_income',
            title: '入金实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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
            formatter: function (value,row) {
                value = 100*row["repair_history_arrears_index"];
                value = value.toFixed(2)+"%";
                return value;
            },
        }, {
            field: 'repair_history_arrears_complete',
            title: '历史欠款实际',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["repair_history_arrears_complete"];
                value = value.toFixed(2)+"%";
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
            field: 'm0_index',
            title: 'M0指标',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'm0_complete',
            title: 'M0实际',
            align: 'right',
            formatter: function (value) {
                value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'm0_index',
            title: 'M0完成率',
            align: 'right',
            formatter: function (value,row) {
                value = 100*row["m0_complete"]/row["m0_index"];
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
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: false,
        minimumCountColumns: 2,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            {
            checkbox: false,
            visible: false                  //是否显示复选框
        }, {
            field: 'company',
            title: '区域',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        }, {
            field: 'begin_guarantee_ave_year',
            title: '期初在保年平均价格',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        }, {
            field: 'guarantee_ave_year',
            title: '在保年平均价格',
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
            title: '新签年平均价格',
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
            title: '毛利率',
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
        dataType : "json", // 服务器返回的数据类型
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : true, // 是否显示搜索框
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        showRefresh: true,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 2, //固定列数
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
            field: 'company',
            title: '区域',
            sortable: true,
            formatter: function (value) {
                value = value.substring(0,2);
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
            title: '成本率指标',
            align: 'right',
            formatter: function (value) {
                value = (Math.round(value*10000))/100 + "%";
                return value;
            },
        },{
            field: 'cost_rate',
            title: '成本率',
            align: 'right',
            formatter: function (value) {
                value = (Math.round(value*10000))/100 + "%";
                return value;
            },
        },{
            field: 'cost_rate_complete',
            title: '折合完成率',
            align: 'right',
            formatter: function (value,row,index) {
                value = Math.round((200-((row.cost_rate*10000)/row.cost_rate_target)/100)) + "%";
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

    $('#salePrint').click(function () {
        $("#saleKpi").printThis(
            {
                header: "<h4 class='text-center'>售前端KPI完成情况</h4>"
            }
        );
        //$('#acceptanceIndex').bootstrapTable('load', json);
    })
})


$(function () { $('#collapseOne').collapse('show')});
$(function () { $('#collapseTwo').collapse('show')});
$(function () { $('#collapseThree').collapse('show')});
$(function(){
    let columns_data=[
        {
            checkbox: true,
            visible: false                  //是否显示复选框
        }, {
            field: 'index_name',
            title: '指标名称',
            align: 'left',
            sortable: false,
        },{
            field: 'fyear_index',
            title: '财年指标',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>60000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
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
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
        },{
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
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
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
        },{
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
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
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
        },{
            field: 'quarterly1_complete',
            title: 'Q1完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
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
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
        },{
            field: 'quarterly2_complete',
            title: 'Q2完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
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
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
            },
        },{
            field: 'quarterly3_complete',
            title: 'Q3完成',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value>50000){
                    let reg = /\B(?=(\d{3})+$)/g;
                    value=value/1000;
                    value = value.toFixed(0);
                    value = String(value).replace(reg, ','); //"1,234,567,890";
                    return value;
                }else{
                    return value;
                }
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
        }, ];
    /*生效KPI完成情况*/
    $("#companyOperations").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/month_index/getCompanyMonthIndexInfo", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: false,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        //toolbar:"#get",
        iconSize:"xs",
        theadClasses: "bg-info",
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
    window.addEventListener("resize",function(){
        $('#companyOperations').bootstrapTable('refresh');
    });
    // 应收账款
    $("#accountsReceivable").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/sdcompanyindex/getSdCompanyInfoByCompany", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        //toolbar:"#get",
        iconSize:"xs",
        //theadClasses: "bg-info",
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server",
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        showExport: false,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        mergeCells: true, // 开启单元格合并
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            [
                {
                title: '当年欠款',
                halign:'center',
                align:'center',
                colspan: 4,
                },{
                title: '历史欠款',
                halign:'center',
                align:'center',
                colspan: 8,
                },
            ],
            [
                {
                    title: '设备',
                    halign:'center',
                    align:'center',
                    colspan: 2,
                },{
                title: '安装',
                halign:'center',
                align:'center',
                colspan: 2,
            },
                {
                    title: '设备',
                    halign:'center',
                    align:'center',
                    colspan:4,
                },{
                title: '安装',
                halign:'center',
                align:'center',
                colspan: 4,
            },
            ],
            [
            {
                field: 'eq_thisyear_arrears',
                title: '指标',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value) {
                    return '10%';
                },

            }, {
                field: 'eq_thisyear_rate',
                title: '实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = value.toFixed(1) + "%";
                    if(value>=25){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'in_thisyear_arrears',
                title: '指标',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value) {
                    return '15%';
                },
            }, {
                field: 'in_thisyear_rate',
                title: '实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = value.toFixed(1) + "%";
                    if(value>=35){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'eq_arrears_balance',
                title: '指标',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value) {
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let eq_history_index=0;
                    if(res<=12 && res>=10){
                        eq_history_index=65;
                    }else if(res<=9 && res>=7){
                        eq_history_index=50;
                    }else if(res<=6 && res>=4){
                        eq_history_index=25;
                    }else if(res<=3 && res>=1){
                        eq_history_index=85;
                    }else{
                    }
                    return  eq_history_index+'%';
                },
            }, {
                field: 'eq_rate',
                title: '实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let eq_history_index=0;
                    if(res<=12 && res>=10){
                        eq_history_index=65;
                    }else if(res<=9 && res>=7){
                        eq_history_index=50;
                    }else if(res<=6 && res>=4){
                        eq_history_index=25;
                    }else if(res<=3 && res>=1){
                        eq_history_index=85;
                    }else{
                    }
                    if(value>=eq_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            }, {
                field: 'eq_arrears_balance_over731_days',
                title: '≥731实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = 100*row.eq_income_over_731_days/(row.eq_arrears_balance_over731_days+row.eq_income_over_731_days);
                    value = new_value.toFixed(1);
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let eq_history_index=0;
                    if(res<=12 && res>=10){
                        eq_history_index=65;
                    }else if(res<=9 && res>=7){
                        eq_history_index=50;
                    }else if(res<=6 && res>=4){
                        eq_history_index=25;
                    }else if(res<=3 && res>=1){
                        eq_history_index=85;
                    }else{
                    }
                    if(value>=eq_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            }, {
                field: 'eq_arrears_balance_between366_and_731_days',
                title: '366~730实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = 100*row.eq_income_between366_and_731_days/(row.eq_arrears_balance_between366_and_731_days+row.eq_income_between366_and_731_days);
                    value = new_value.toFixed(1);
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let eq_history_index=0;
                    if(res<=12 && res>=10){
                        eq_history_index=65;
                    }else if(res<=9 && res>=7){
                        eq_history_index=50;
                    }else if(res<=6 && res>=4){
                        eq_history_index=25;
                    }else if(res<=3 && res>=1){
                        eq_history_index=85;
                    }else{
                    }
                    if(value>=eq_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            }, {
                field: 'in_arrears_balance',
                title: '指标',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value) {
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    if(res<=12 && res>=10){
                        return '65%';
                    }else if(res<=9 && res>=7){
                        return '50%';
                    }else if(res<=6 && res>=4){
                        return '25%';
                    }else if(res<=3 && res>=1){
                        return '85%';
                    }else{
                    }
                },
            }, {
                field: 'in_rate',
                title: '实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let in_history_index=0;
                    if(res<=12 && res>=10){
                        in_history_index=65;
                    }else if(res<=9 && res>=7){
                        in_history_index=50;
                    }else if(res<=6 && res>=4){
                        in_history_index=25;
                    }else if(res<=3 && res>=1){
                        in_history_index=85;
                    }else{
                    }
                    if(value>=in_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            }, {
                field: 'in_arrears_balance_over731_days',
                title: '≥731实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = 100*row.in_income_over_731_days/(row.in_arrears_balance_over731_days+row.in_income_over_731_days);
                    value = new_value.toFixed(1);
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let in_history_index=0;
                    if(res<=12 && res>=10){
                        in_history_index=65;
                    }else if(res<=9 && res>=7){
                        in_history_index=50;
                    }else if(res<=6 && res>=4){
                        in_history_index=25;
                    }else if(res<=3 && res>=1){
                        in_history_index=85;
                    }else{
                    }
                    if(value>=in_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            }, {
                field: 'in_arrears_balance_between366_and_731_days',
                title: '366~730实绩',
                width:'8.3%',
                sortable: false,
                align: 'center',
                formatter: function (value,row) {
                    let new_value = 100*row.in_income_between366_and_731_days/(row.in_arrears_balance_between366_and_731_days+row.in_income_between366_and_731_days);
                    value = new_value.toFixed(1);
                    let ct = new Date();
                    let res = ct.getMonth()+1;
                    let eq_history_index=0;
                    if(res<=12 && res>=10){
                        eq_history_index=65;
                    }else if(res<=9 && res>=7){
                        eq_history_index=50;
                    }else if(res<=6 && res>=4){
                        eq_history_index=25;
                    }else if(res<=3 && res>=1){
                        eq_history_index=85;
                    }else{
                    }
                    if(value>=eq_history_index){
                        return "<a style='color: red' >"+value+"%</a>";
                    }else{
                        return "<a style='color: green' >"+value+"%</a>";
                    }
                },
            },  ]
        ],

    });
    $('#accountsReceivable').bootstrapTable('refresh');
    // 保养台量数据
    $("#maintainOperate").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfoByCompany", // 服务器数据的加载地址
        dataType : "json", // 服务器返回的数据类型
        cache: true,            //禁用ajax缓存
        pagination : false, // 设置为true会在底部显示分页条
        singleSelect : false, // 设置为true将禁止多选
        search : false, // 是否显示搜索框
        //toolbar:"#get",
        iconSize:"xs",
        //theadClasses: "bg-info",
        showColumns : false, // 是否显示工具栏中内容下拉框（选择显示的列）
        sidePagination : "server",
        showRefresh: false,
        clickToSelect: true,  //点击选择
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 1, //固定列数
        showExport: false,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        columns: [
            [
                {
                    title: '市场规模',
                    halign:'center',
                    align:'center',
                    colspan:3,
                    cellStyle: function(row, index) {
                        return {css:{"color":"red"}}
                    },
                },{
                    title: '三包业务',
                    halign:'center',
                    align:'center',
                    colspan: 4,
                },{
                title: '有偿业务',
                halign:'center',
                align:'center',
                colspan: 6,
            },
            ],
            [
                {
                    field: 'maintain_object',
                    title: '保养对象',
                    align: 'center',
                    width: '8.3%',
                    formatter: function (value) {
                        value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
                }, {
                    field: 'guarantee',
                    title: '在保台量',
                    sortable: false,
                    width: '8.3%',
                    align: 'center',
                    formatter: function (value,row) {
                        value = value+row.paid;
                        return value;
                    },
                }, {
                field: 'maintain_object',
                title: '保养率',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    value = 100*row.paid/row["maintain_object"];
                    value = value.toFixed(1)+"%";
                    return value;
                },
                 },{
                field: 'guarantee',
                title: '三包',
                align: 'center',
                width: '8.3%',
                formatter: function (value) {
                    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            },{
                field: 'transfer_rate_index',
                title: '转签率指标',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    value = 100*row["transfer_rate_index"];
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'transfer_rate_complete',
                title: '转签率实绩',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    value = 100*row["transfer_rate_complete"];
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'transfer_rate_complete',
                title: '转签完成率',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    value = 100*row["transfer_rate_complete"]/row["transfer_rate_index"];
                    value = value.toFixed(1)+"%";
                    return value;
                },
            },  {
                    field: 'paid',
                    title: '有偿',
                    align: 'center',
                    width: '8.3%',
                    formatter: function (value) {
                        value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
            }, {
                    field: 'paid_index',
                    title: '有偿指标',
                    align: 'center',
                    width: '8.3%',
                    formatter: function (value) {
                        value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
            }, {
                field: 'paid_index',
                title: '有偿完成率',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    value = 100*row.paid/row.paid_index;
                    value = value.toFixed(1)+"%";
                    return value;
                },
            }, {
                field: 'paid_output_value_index',
                title: '有偿产值指标',
                align: 'center',
                width: '8.3%',
                sortable: false,
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'paid_output_value_complete',
                title: '有偿产值实际',
                align: 'center',
                width: '8.3%',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'paid_output_value_index',
                title: '完成率',
                align: 'center',
                width: '8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    let new_value = 100*row.paid_output_value_complete/row.paid_output_value_index;
                    value = new_value.toFixed(1)+"%";
                    if(new_value<fyear_pass){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                },
            },   ]
        ],
    });
    $('#maintainOperate').bootstrapTable('refresh');
    // 保养业务数据
    $("#maintainOperate1").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfoByCompany", // 服务器数据的加载地址
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
            [
                {
                    title: '销售',
                    halign:'center',
                    align:'center',
                    colspan:3,
                },{
                title: '入金',
                halign:'center',
                align:'center',
                colspan: 3,
            },{
                title: '成本率',
                halign:'center',
                align:'center',
                colspan: 3,
            },{
                title: '历史欠款',
                halign:'center',
                align:'center',
                colspan: 3,
            },
            ],
            [
                {
                    field: 'maintain_sale_index',
                    title: '销售指标',
                    align: 'center',
                    width:'8.3%',
                    formatter: function (value) {
                        value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
                }, {
                field: 'maintain_sale',
                title: '销售实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'maintain_sale_index',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["maintain_sale"]/row["maintain_sale_index"];
                    let new_value = value.toFixed(1)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'maintain_income_index',
                title: '入金指标',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'maintain_income',
                title: '入金实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'maintain_income_index',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["maintain_income"]/row["maintain_income_index"];
                    let new_value = value.toFixed(1)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'maintain_cost_rate_index',
                title: '成本率指标',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["maintain_cost_rate_index"]
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'maintain_cost_rate_complete',
                title: '成本率实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["maintain_cost_rate_complete"]
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'maintain_cost_rate_complete',
                title: '折合完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = row["maintain_cost_rate_complete"]*-100/row["maintain_cost_rate_index"]+200;
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'maintain_history_arrears_index',
                title: '历史欠款指标',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["maintain_history_arrears_index"]
                    value = value.toFixed(2)+"%";
                    return value;
                },
            },{
                field: 'maintain_history_arrears_complete',
                title: '历史欠款实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["maintain_history_arrears_complete"]
                    value = value.toFixed(2)+"%";
                    return value;
                },
            },{
                field: 'maintain_history_arrears_complete',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["maintain_history_arrears_complete"]/row["maintain_history_arrears_index"];
                    let new_value = value.toFixed(2)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, ]
        ],
    });
    $('#maintainOperate1').bootstrapTable('refresh');
    // 维改业务数据
    $("#maintainOperate2").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfoByCompany", // 服务器数据的加载地址
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
            [
                {
                    title: 'M0业务',
                    halign:'center',
                    align:'center',
                    colspan: 3,
                },{
                    title: 'M1M2业务',
                    halign:'center',
                    align:'center',
                    colspan: 9,
                },
            ],
            [
                {
                    field: 'm0_index',
                    title: 'M0指标',
                    align: 'center',
                    width:'8.3%',
                    formatter: function (value) {
                        value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
                }, {
                field: 'm0_complete',
                title: 'M0实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'm0_index',
                title: 'M0完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["m0_complete"]/row["m0_index"];
                    let new_value = value.toFixed(2)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            },{
                field: 'repair_sale_index',
                title: '销售指标',
                align: 'center',
                sortable: false,
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'repair_sale',
                title: '销售实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'repair_sale',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["repair_sale"]/row["repair_sale_index"];
                    let new_value = value.toFixed(2)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'repair_income_index',
                title: '入金指标',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'repair_income',
                title: '入金实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'repair_income_index',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["repair_income"]/row["repair_income_index"];
                    let new_value = value.toFixed(2)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            }, {
                field: 'repair_history_arrears_index',
                title: '历史欠款指标',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["repair_history_arrears_index"];
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'repair_history_arrears_complete',
                title: '历史欠款实际',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    value = 100*row["repair_history_arrears_complete"];
                    value = value.toFixed(2)+"%";
                    return value;
                },
            }, {
                field: 'repair_history_arrears_index',
                title: '完成率',
                align: 'center',
                width:'8.3%',
                formatter: function (value,row) {
                    let fyear_pass = 100*row.fyear_pass;
                    value = 100*row["repair_history_arrears_complete"]/row["repair_history_arrears_index"];
                    let new_value = value.toFixed(2)+"%";
                    if(value<fyear_pass){
                        return "<a style='color: green' >"+new_value+"</a>";
                    }else{
                        return "<a style='color: red' >"+new_value+"</a>";
                    }
                },
            },   ]
        ],
    });
    $('#maintainOperate2').bootstrapTable('refresh');
    // 区域保养成本及毛利率
    $("#maintainOperate3").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/maintain/getMaintainInfoByCompany", // 服务器数据的加载地址
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
            [
                {
                    title: '保养单价及成本',
                    halign:'center',
                    align:'center',
                    colspan: 6,
                },
            ],
            [
                {
                    field: 'begin_guarantee_ave_year',
                    title: '期初在保年平均价格',
                    align: 'center',
                    sortable: false,
                    formatter: function (value) {
                        value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        return value;
                    },
                }, {
                field: 'guarantee_ave_year',
                title: '在保年平均价格',
                align: 'center',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'guarantee_ave_year',
                title: '变化',
                align: 'center',
                formatter: function (value,row) {
                    value = row["guarantee_ave_year"]-row["begin_guarantee_ave_year"];
                    value = value.toFixed(2);
                    if(value<0){
                        return "<a style='color: green' >"+value+"</a>";
                    }else{
                        return "<a style='color: red' >"+value+"</a>";
                    }
                },
            }, {
                field: 'new_ave_year',
                title: '新签年平均价格',
                align: 'center',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'maintain_cost_single',
                title: '单梯保养成本',
                align: 'center',
                formatter: function (value) {
                    value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    return value;
                },
            }, {
                field: 'gross_profit_margin',
                title: '毛利率',
                align: 'center',
                formatter: function (value,row) {
                    value = row["gross_profit_margin"];
                    let newValue = value.toFixed(2)+"%";
                    if(value<0){
                        return "<a style='color: green' >"+newValue+"</a>";
                    }else{
                        return "<a style='color: red' >"+newValue+"</a>";
                    }
                },
            }, ]
        ],
    });
    $('#maintainOperate3').bootstrapTable('refresh');
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
})




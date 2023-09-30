$(function() {
    /*生效KPI完成情况*/
    $("#intoForceIndexComplete").bootstrapTable('destroy').bootstrapTable({
        method: 'get', // 服务器数据的请求方式 get or post
        url: "/../tp5/public/index.php/index/office_index/getIntoForceOfficeIndexInfo", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
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
        //fixedNumberWidth: 80,
        onClickRow: function (row, $element) {
            $('.info').removeClass('info');
            $($element).addClass('info');
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
                value = value.substring(0, 2);
                return value;
            },
        }, {
            field: 'fyear_index',
            title: '财年指标',
            align: 'right',
            sortable: false
        }, {
            field: 'fyear_index',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.fyear_index === 0.00) {
                    return 0;
                } else {
                    value = (row.accumulated_complete * 100 / row.fyear_index).toFixed(1) + "%";
                    return value;
                }
            },
        }, {
            field: 'accumulated_target',
            title: '累计指标',
            align: 'right',
            sortable: false
        }, {
            field: 'accumulated_complete',
            title: '累计完成',
            align: 'right',
            sortable: false
        }, {
            field: 'accumulated_target',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.accumulated_target === 0.00) {
                    return 0;
                } else {
                    value = (row.accumulated_complete * 100 / row.accumulated_target).toFixed(1) + "%";
                    return value;
                }
            },
        }, {
            field: 'current_month_index',
            title: '当月指标',
            align: 'right',
            sortable: false
        }, {
            field: 'current_month_complete',
            title: '当月完成',
            align: 'right',
            sortable: false
        }, {
            field: 'fyear_index',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.current_month_index === 0.00) {
                    return 0;
                } else {
                    value = (row.current_month_complete * 100 / row.current_month_index).toFixed(1) + "%";
                    return value;
                }
            },
        }, {
            field: 'quarterly1_index',
            title: 'Q1指标',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly1_complete',
            title: 'Q1完成',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly1_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.quarterly1_index === 0.00) {
                    return 0;
                } else {
                    value = (row.quarterly1_complete * 100 / row.quarterly1_index).toFixed(1) + "%";
                    return value;
                }
            },
        }, {
            field: 'quarterly2_index',
            title: 'Q2指标',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly2_complete',
            title: 'Q2完成',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly2_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.quarterly2_index === 0.00) {
                    return 0;
                } else {
                    value = (row.quarterly2_complete * 100 / row.quarterly2_index).toFixed(1) + "%";
                    return value;
                }
            },
        }, {
            field: 'quarterly3_index',
            title: 'Q3指标',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly3_complete',
            title: 'Q3完成',
            align: 'right',
            sortable: false
        }, {
            field: 'quarterly3_complete',
            title: '完成率',
            align: 'right',
            formatter: function (value, row, index) {
                if (row.quarterly3_index === 0.00) {
                    return 0;
                } else {
                    value = (row.quarterly3_complete * 100 / row.quarterly3_index).toFixed(1) + "%";
                    return value;
                }
            },
        },],
    });
    $('#intoForceIndexComplete').bootstrapTable('refresh');
})
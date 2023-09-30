let day2 = new Date();
day2.setTime(day2.getTime());
let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
let dateCheck = new Date().getDate();
let btn = document.getElementById("deliveryPredict");
/*每月26~31日预测*/
/*if (dateCheck<25){
    btn.style.display = "none";
}else{
    btn.style.display = "block";
}*/
//查询日期赋值
$("#complete_date_from").val('0000-00-00');
$("#complete_date_to").val(s2);
$(function () {
    let date=new Date();
    //获取第一天
    date.setDate(1);
    let y=date.getFullYear();
    let m=date.getMonth()+1;
    let d=date.getDate();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
    let nextMonthOneDay = y+"-"+m+"-"+d+` `+`00:00:00`
    $('#c_entry_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#c_complete_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#c_temp_elevator_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
/*    $('#into_force_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });*/
    $('#b_into_force_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#b_complete_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#b_temp_elevator_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#b_issuing_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#b_temp_issuing_date').datepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#expected_delivery_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#b_predict_delivery_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        startDate:nextMonthOneDay,
        //endDate:moment(),
        //clearBtn: true,
    });
    //区域赋值
    let  $selectParent=$("#b_belong_to");
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');

            }
            //GetSalesPerson();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    let  $u_belong_to=$("#u_belong_to");
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $u_belong_to.append($option);
                $u_belong_to.selectpicker('refresh');
                $u_belong_to.selectpicker('render');
            }
            //GetSalesPerson();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    $("#productIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../product/getProductInfoByContractId", // 服务器数据的加载地址
        height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        toolbarAlign:'left',//工具栏的位置
        cache: true,            //禁用ajax缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : false, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10,50, 100,200,300],
        search : true, // 是否显示搜索框
        showToggle:true,    //是否显示详细视图和列表视图的切换按钮
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: true,
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
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        showExport: true,
        exportDataType: "basic", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        //导出设置
        exportOptions: {
            //导出文件的名称
            type: 'excel',
            escape: 'false',
            ignoreColumn: [0,1],  //忽略某一列的索引
            fileName: '工号明细导出' +　new Date().getTime(),//设置导出的表的默认名称
            tableName:'工号明细表',
            worksheetName: 'sheet1',  //表格工作区名称
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
        },{
            field: '',
            title: '序号',
            align: 'center',
            sortable: true,
            formatter: function (value, row, index) {
               return index+1;
            },
        },{
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: true,
        }, {
            field: 'product_id',
            title: '工号',
            align: 'center',
            sortable: true,
        }, {
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false,
        },{
            field: 'status',
            title: '总状态',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='取消'){
                    return "<span class='badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3'>"+value+"</span>";
                }else{
                    return "<span class='badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3' >"+value+"</span>";
                }
            },
        },{
            field: 'sd_status',
            title: '分状态',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='取消'){
                    return "<span class='badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3'>"+value+"</span>";
                }else{
                    return "<span class='badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3' >"+value+"</span>";
                }
            },
        },{
            field: 'if_split',
            title: '拆分',
            align: 'right',
            sortable: false
        }, {
            field: 'enough_5_percent',
            title: '超5%',
            align: 'right',
            sortable: false
        }, {
            field: 'if_into_force',
            title: '生效',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                if(value==='是'){
                    return "<span class='badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3'>"+value+"</span>";
                }else{
                    return "<span class='badge rounded-pill text-info bg-light-info p-2 text-uppercase px-3' >"+value+"</span>";
                }
            },
        }, {
            field: 'into_force_date',
            title: '生效日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a>"+value+"</a>";
                }
            },
        },  {
            field: 'statistical_date',
            title: '统计日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a>"+value+"</a>";
                }
            },
        },{
            field: 'report_delivery_date',
            title: '上报出仓日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a>"+value+"</a>";
                }
            },
        }, {
            field: 'entry_date',
            title: '进场日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a>"+value+"</a>";
                }
            },
        }, {
            field: 'complete_date',
            title: '完工日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a>"+value+"</a>";
                }
            },
        }, {
            field: 'belong_to',
            title: '业绩',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'sales_person',
            title: '营业员',
            align: 'center',
            sortable: false
        },{
            field: 'equipment_receipt_ratio',
            title: '设备收款比例',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        },{
            field: 'expected_delivery_date',
            title: '预计发货日期',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='0000-00-00'){
                    return"-";
                }else{
                    return "<a class='text-danger'>"+value+"</a>";
                }
            },
        }, {
            field: 'receipt_id',
            title: '收款编号',
            align: 'left',
            sortable: false,
        },{
            field: 'elevator_model',
            title: '电梯型号',
            align: 'center',
            sortable: false
        },{
            field: 'floor',
            title: '层',
            align: 'center',
            sortable: false
        },{
            field: 'stop',
            title: '站',
            align: 'center',
            sortable: false
        },{
            field: 'door',
            title: '门',
            align: 'center',
            sortable: false
        },{
            field: 'standard_equipment_price',
            title: '设备SPL价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'contract_equipment_price',
            title: '设备签约价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_prices_fall',
            title: '设备浮率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let new_value=value*100;
                value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '%';
                return value;
            },
        },{
            field: 'standard_transport_price',
            title: '运输SPL价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'contract_transport_price',
            title: '运输签约价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'transport_prices_fall',
            title: '运输浮率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let new_value=value*100;
                value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '%';
                return value;
            },
        },{
            field: 'standard_installation_price',
            title: '安装SPL价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'contract_installation_price',
            title: '安装签约价',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_prices_fall',
            title: '安装浮率',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let new_value=value*100;
                value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '%';
                return value;
            },
        },{
            field: 'equipment_expected_collected',
            title: '设备预收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_invoiced_amount',
            title: '设备已开票',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_amount_collected',
            title: '设备实收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'equipment_receipt_ratio',
            title: '设备收款比例',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let new_value=value*100;
                value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '%';
                return value;
            },
        },{
            field: 'install_expected_collected',
            title: '安装预收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_invoiced_amount',
            title: '安装已开票',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_amount_collected',
            title: '安装实收',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'install_receip_ratio',
            title: '安装收款比例',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                let new_value=value*100;
                value = new_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '%';
                return value;
            },
        },  ],
    });
    $('#productIndex').bootstrapTable('refresh');

});

function getSelectProductId(){
    let row = $('#productIndex').bootstrapTable('getSelections');
    let product_ids="";
    for (let i = 0; i < row.length; i++) {//循环读取选中行数据
         product_ids = product_ids+','+ row[i].id;//获取选择行的值
    }
    let product_id = product_ids.substr(1);
    console.log(product_id);
    $("#batch_into_force_id").val(product_id);
    $("#b_into_force_sum").val(row.length);
    $("#b_contract_id").val(row[0].contract_id);

}
//批量转生效
function BatchIntoForce(){
    let formData = $("#BatchIntoForceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchIntoForce",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                $('#BatchIntoForce').modal('hide');
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
                    msg: '失败！'
                });
            }
            if(data===1){
                $("#BatchIntoForce").modal('hide');
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
                    msg: '成功转生效！'
                });
                $('#productIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
function GetRevokeID(id){
    $("#revoke_id").val(id);
}
function HeadRevoke(){
    let formData = $("#RevokeForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/HeadRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("撤销失败！");
                return false;
            }
            if(date==1){
                alert("撤销成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
function SdRevoke(){
    let formData = $("#RevokeForm").serialize();
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/SdRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("撤销失败！");
                return false;
            }
            if(date==1){
                alert("撤销成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
function GetCompleteID(id){
    $("#complete_id").val(id);
    let product_id=[];
    let supervisor=[];
    let entry_date=[];
    let complete_date=[];
    let temp_elevator_date=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/product/CompletePost",
        data:{
            complete_id:id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                product_id.push(data[i].product_id);
                supervisor.push(data[i].supervisor);
                entry_date.push(data[i].entry_date);
                complete_date.push(data[i].complete_date);
                temp_elevator_date.push(data[i].temp_elevator_date);
                //模态框赋值
                $("#product_id").val(product_id);
                $("#supervisor").val(supervisor);
                $("#entry_date").val(entry_date);
                $("#complete_date").val(complete_date);
                $("#temp_elevator_date").val(temp_elevator_date);
                $("#complete_bu").val(data[i].complete_bu);
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
function CompleteUpdate(){
    let formData = $("#CompleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/CompleteUpdate",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("没有该项目经理，请检查名称是否正确！");
                return false;
            }
            if(data===1){
                alert("提交成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
            alert("返回响应信息："+xhr.responseText );//这里是详细的信息
        }
    });
}
//获取删除ID
function GetDeleteID(id) {
    $("#delete_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/product/GetProductInfo",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#delete_product_id").val(data[i].product_id);
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
//删除工号
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("该工号已经生效，无法删除！");
                return false;
            }
            if(data===1){
                alert("删除成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
function CheckAll(){
    // 获取全选按钮的状态，让上面的按钮的选中状态和它的状态相同，
    let flag=document.getElementById("check_all").checked;
    let cks=document.getElementsByName("product_check");
    for(let i=0;i<cks.length;i++){
        cks[i].checked=flag;
    }

}

//批量待生效获取ID
function SelectUnIntoForce(){
    let row = $('#productIndex').bootstrapTable('getSelections');
    if(row.length>0){
        let batch_un_into_force_id="";
        for (let i = 0; i < row.length; i++) {//循环读取选中行数据
            batch_un_into_force_id = batch_un_into_force_id+','+ row[i].id;//获取选择行的值
        }
        let un_into_force_ids = batch_un_into_force_id.substr(1);
        $("#batch_un_into_force_id").val(un_into_force_ids);
        $("#u_into_force_sum").val(row.length);
        $("#BatchUnIntoForce").modal('show');
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
            msg: '请选择工号！'
        });
    }
}
//批量转待生效
function BatchUnIntoForce(){
    let formData = $("#BatchUnIntoForceForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"../product/BatchUnIntoForce",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                $("#BatchUnIntoForce").modal('hide');
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
                    msg: '成功转待生效！'
                });
                $('#productIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//批量撤销获取ID
function SelectRevoke(){
    let row = $('#productIndex').bootstrapTable('getSelections');
    let product_ids="";
    for (let i = 0; i < row.length; i++) {//循环读取选中行数据
        product_ids = product_ids+','+ row[i].id;//获取选择行的值
    }
    let product_id = product_ids.substr(1);
    console.log(product_id);
    $("#BatchRevoke").modal('show');
    $("#batch_revoke_id").val(product_id);
    $("#r_revoke_sum").val(row.length);
    $("#r_contract_id").val(row[0].contract_id);
}
//山东司撤销
function SdBatchRevoke(){
    let formData = $("#BatchRevokeForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/SdBatchRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功撤销！");
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
//总公司撤销
function HBatchRevoke(){
    let formData = $("#BatchRevokeForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/HBatchRevoke",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                $("#BatchRevoke").modal('hide');
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
                    msg: '撤销成功！'
                });
                $('#productIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//批量拆款获取ID
function SelectSplit(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchSplit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_split_id").val(id);
        $("#s_split_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#s_contract_id").val(contract_ids);
    }

}
//批量转拆分
function BatchSplit(){
    let formData = $("#BatchSplitForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchSplit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已成功转拆分！");
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
//批量生效获取ID
function SelectIntoForce(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchIntoForce").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_into_force_id").val(id);
        $("#b_into_force_sum").val(k);
        //工号明细中获取分公司及营业员
        let contract_ids=document.getElementById('contract_id').value;
        $("#b_contract_id").val(contract_ids);
    }

}

//批量发货预计获取ID
function SelectDelivery(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchDelivery").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_delivery_id").val(id);
        $("#b_expected_delivery_sum").val(k);
    }
}
//批量发货预计
function BatchExpectedDelivery(){
    let formData = $("#BatchDeliveryForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchExpectedDelivery",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功！");
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

//生效获取营业员
function GetSalesPerson(){
    //营业员赋值
    //获取已选择的区域
    let belong_to=document.getElementById('b_belong_to').value;
    let  $selectParent=$("#b_sales_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSalesPerson",
        data:{
            company:belong_to
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//待生效获取营业员
function GetUnSalesPerson(){
    //营业员赋值
    //获取已选择的区域
    let belong_to=document.getElementById('u_belong_to').value;
    let  $selectParent=$("#u_sales_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSalesPerson",
        data:{
            company:belong_to
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//导出工号明细
function Export(){
    window.location.href = "http://101.201.57.190/tp5/public/index.php/index/product/Export"
}
//批量完工获取ID
function SelectComplete(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchComplete").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_id").val(id);
        $("#b_complete_sum").val(k);
        $("#temp_elevator_date").val('');

    }
}
//批量预测发货获取ID
function SelectPredict(){
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchDeliveryPredict").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_predict_id").val(id);
        $("#b_predict_delivery_sum").val(k);

    }
}
//完工获取项目经理
function GetSupervisor(){
    let install_company=document.getElementById('install_company').value;
    let  $selectParent=$("#supervisor");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSupervisor",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工批量修改获取项目经理
function CompleteEditGetSupervisor(){
    let install_company=document.getElementById('e_install_company').value;
    let  $selectParent=$("#e_supervisor");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSupervisor",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工获取完工事业部
function GetBuName(){
    let install_company=document.getElementById('install_company').value;
    let  $selectParent=$("#complete_bu");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/bustaff/GetBuName",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<=data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//完工批量修改获取完工事业部
function CompleteEditGetBuName(){
    let install_company=document.getElementById('e_install_company').value;
    let  $selectParent=$("#e_complete_bu");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/bustaff/GetBuName",
        data:{
            company:install_company
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<=data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $selectParent.selectpicker('refresh');
                $selectParent.selectpicker('render');
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
//批量转完工
function BatchComplete() {
    let complete_date=document.getElementById('complete_date').value;
    let temp_elevator_date=document.getElementById('temp_elevator_date').value;
    if(!complete_date && !temp_elevator_date){
        alert('完工日期不能为空，请检查！');
        document.getElementById('complete_date').focus();
        document.getElementById('complete_date').select();
        return ;
    }
    let formData = $("#BatchCompleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchComplete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功转完工！");
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
//批量发货预测
function BatchPredict() {
    let predict_delivery_date=document.getElementById('predict_delivery_date').value;
    if(!predict_delivery_date){
        alert('预计发货日期不能为空，请检查！');
        document.getElementById('predict_delivery_date').focus();
        document.getElementById('predict_delivery_date').select();
        return ;
    }
    let formData = $("#BatchDeliveryPredictForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/bathchDeliveryPredict",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("成功！");
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
//批量完工审核获取id
function SelectCompleteAudit() {
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();

    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchCompleteAudit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_id").val(id);
        $("#b_complete_sum").val(k);
    }
}
//批量完工审核通过
function BatchCompleteAudit() {
    let formData = $("#BatchCompleteAuditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteAudit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("审核成功！");
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
//批量完工审核拒绝
function BatchCompleteRefuse() {
    let formData = $("#BatchCompleteAuditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteRefuse",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                window.location.reload();
            }
            if(data===1){
                alert("已拒绝！");
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
//获取完工信息批量修改ID
function SelectBatchCompleteEdit() {
    let product_check = document.getElementsByName("product_check");
    // 获取总共有多少个checkbox
    let len = product_check.length;
    let flag = false;
    let str="";
    let k=0;
    let arr=new Array();
    for (let i = 0; i < len; i++) {
        if (product_check[i].checked) {
            // console.log(usercheck[i].value)//拼接id　　　　
            //str=arr.push(product_check[i].value,
            str=str+','+product_check[i].value;
            flag = true;
        }
    }
    if (!flag) {
        alert('至少选择一个');
        return;
    }else{
        $("#BatchCompleteEdit").modal('show');
        let id = str.substr(1);
        let k=id.split(',').length;
        $("#batch_complete_edit_id").val(id);
        $("#b_complete_edit_sum").val(k);

    }
}
//完工信息批量修改
function BatchCompleteEdit() {
    let complete_date=document.getElementById('e_complete_date').value;
    let temp_elevator_date=document.getElementById('e_temp_elevator_date').value;
    if(!complete_date && !temp_elevator_date){
        alert('完工日期不能为空，请检查！');
        document.getElementById('e_complete_date').focus();
        document.getElementById('e_temp_elevator_date').select();
        return ;
    }
    let formData = $("#BatchCompleteEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
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
//完工信息批量修改(仅修改区域、项目经理、事业部
function BatchCompleteBuEdit() {
    let formData = $("#BatchCompleteEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/product/BatchCompleteBuEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
        if(data===0){
                alert("失败！");
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


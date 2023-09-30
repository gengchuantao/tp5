//多选框赋值到input
$('#select_elevator_model').on('changed.bs.select', function() {
    $("#elevator_model").val($(this).val());
});
//模态框加载时渲染
$(function () {
    // 初始化选择器
    $("#project_type").selectpicker('refresh');
    $("#bidding_type").selectpicker('refresh');
    $("#bid_type").selectpicker('refresh');
    $("#customer_classification").selectpicker('refresh');
    $("#select_elevator_model").selectpicker('refresh');

    $('#q_bid_opening_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    $('#quote_date').datepicker({
        startDate: Date(),
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });
    $('#bond_apply_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //保证金汇出日期
    $('#bond_remit_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //应退回日期
    $('#band_expect_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //保证金退回日期
    $('#bond_return_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //承诺收回日期
    $('#agreement_back_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //催款函寄出日期
    $('#reminder_letter_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //律师函寄出日期
    $('#lawyer_letter_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
    });
    //验证项目名称是否重复
    $('#project_name').blur(function () {
        //清除空格
        $(".project_name").bind("blur",function(){
            let result=$(this).attr("value").replace(/(^\s+)|(\s+$)/g, "");
            $(this).attr("value",result);
        });
        //获取项目名称的值
        let project_name=document.getElementById('project_name').value;
        project_name.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
        $("#project_name").val(project_name);
        $.ajax({
            type:"post",
            url:"/../tp5/public/index.php/index/quote/CheckProjectName",
            data:{
                project_name:project_name
            },
            dataType:'json',
            async:true,
            success:function(data){
                if(data===0){
                    return ;
                }
                if(data===1){
                    alert('项目名称重复,再想一个吧！');
                    document.getElementById('project_name').focus();
                    document.getElementById('project_name').select();
                }
            },
            error: function (xhr) {
                /*错误信息处理*/
                alert("状态码："+xhr.status);
                alert("状态:"+xhr.readyState);
                alert("错误信息:"+xhr.statusText );
            }
        });
    });
    //省份赋值
    let  $selectParent=$("#province");
    //$selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/china/GetProvince",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $('#province').selectpicker('refresh');
                $('#province').selectpicker('render');
            }
            GetCity();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    //营业员赋值
    let branch_office=document.getElementById('branch_office').value;
    let  $sales_person_parent=$("#sales_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetSalesPerson",
        data:{
            company:branch_office
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $sales_person_parent.append($option);
                $('#sales_person').selectpicker('refresh');
                $('#sales_person').selectpicker('render');
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    $("#quoteIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../quote/GetQuoteInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        toolbarAlign:'left',//工具栏的位置
        buttonsClass:'sm',
        cache: true,            //禁用或启用缓存
        pagination : true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect : true, // 设置为true将禁止多选
        sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        pageNumber : 1, // 如果设置了分布，首页页码
        pageSize : 10, // 如果设置了分页，每页数据条数
        pageList: [ 10, 25, 50, 100],
        contentType : "application/x-www-form-urlencoded", //发送到服务器的数据编码类型
        search : false, // 是否显示搜索框
        showToggle:true,    //是否显示详细视图和列表视图的切换按钮
        showColumns : true, // 是否显示工具栏中内容下拉框（选择显示的列）
        showRefresh: false,
        //minimumCountColumns: 2,
        uniqueId: "id",//默认排序字段
        /*sortName: "id",
        sortOrder: "desc",*/
        clickToSelect: true,  //点击选择
        showExport: true,
        exportDataType: "all", //basic', 'all', 'selected'.
        exportTypes: ['xlsx'],
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 4, //固定列数
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
                search_sales_person: $('#search_sales_person').val(),
                search_project_name: $('#search_project_name').val(),
                search_status: $('#search_status').val(),
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
            field: 'status',
            title: '流程',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                if(value==='跟进中'){
                    return "<span class='badge' style='background-color: orangered'>"+value+"</span>";
                }else if(value==='已报价'){
                    return "<span class='badge' style='background-color: orange'>"+value+"</span>";
                }else if(value==='已中标'){
                    return "<span class='badge' style='background-color: deeppink'>"+value+"</span>";
                }else if(value==='评审中'){
                    return "<span class='badge' style='background-color: deepskyblue'>"+value+"</span>";
                }else if(value==='已签订'){
                    return "<span class='badge' style='background-color: green'>"+value+"</span>";
                }else{
                    return "<span class='badge' style='background-color: grey'>"+value+"</span>";
                }
            },
        },{
            field: 'branch_office',
            title: '区域',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                value = value.substring(0,2);
                return value;
            },
        },{
            field: 'project_name',
            title: '项目名称',
            align: 'left',
            sortable: false,
        },{
            field: 'quote_date',
            title: '报价日期',
            align: 'center',
            sortable: false
        },{
            field: 'bid_opening_date',
            title: '开标日期',
            align: 'center',
            sortable: false
        },{
            field: 'quote_num',
            title: '招标台量',
            align: 'center',
            sortable: false
        },{
            field: 'bid_num',
            title: '中标台量',
            align: 'center',
            sortable: false
        },{
            field: 'win_bidding_date',
            title: '中标日期',
            align: 'center',
            sortable: false
        },{
            field: 'sales_person',
            title: '营业员',
            align: 'center',
            sortable: false
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'center',
            sortable: false,
            formatter: function (value,row,index) {
                return "<a href='/../tp5/public/index.php/index/contract/index?contract_id="+value+"' target='_blank'>"+value+"</a>";
            },
        },{
            field: 'bond_arrears',
            title: '保证金欠款',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'buyer_unit',
            title: '买方单位',
            align: 'left',
            sortable: false
        },{
            field: 'customer_classification',
            title: '客户分类',
            align: 'center',
            sortable: false
        },{
            field: 'bidding_company',
            title: '招标公司',
            align: 'left',
            sortable: false
        },{
            field: 'not_winning_date',
            title: '丢标日期',
            align: 'center',
            sortable: false
        },{
            field: 'winning_bid',
            title: '中标厂家',
            align: 'center',
            sortable: false
        },{
            field: 'competitor_quote',
            title: '对手总价',
            align: 'center',
            sortable: false
        },{
            field: 'winning_bid_relative_float_downward',
            title: '相对我司下浮',
            align: 'center',
            sortable: false,
            formatter: function (value) {
                let percent = Number(value*100).toFixed(2);
                percent += "%";
                return percent;
            },
        }, ],
    });
    $('#quoteIndex').bootstrapTable('refresh');
    //回车查询(button模式)(全页面-解决下拉框及日期选择无法回车查询的问题)
    document.onkeydown = function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            $('#query').click();
        }
    };
});
$('#query').click(refreshData);
function refreshData() {
    let search_contract_id = $("#search_contract_id").val();
    let search_buyer_unit = $("#search_buyer_unit").val();
    let search_project_name = $("#search_project_name").val();
    let search_status = $("#search_status").val();
    let search_sales_person = $("#search_sales_person").val();
    $.ajax({
        type: "post",
        url: "../quote/GetQuoteInfoByCondition",
        data: [
            {search_contract_id : search_contract_id},
            {search_buyer_unit : search_buyer_unit},
            {search_project_name : search_project_name},
            {search_status : search_status},
            {search_sales_person : search_sales_person},
        ],
        dataType:"json",
        success : function(json) {
            $("#quoteIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
}
/*跳转到合同*/
function jumpToContract(){

}
//获取城市
function GetCity(){
    //市赋值
    //获取已录入的省份
    let province=document.getElementById('province').value;
    let  $selectParent=$("#city");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/china/GetCity",
        data:{
            province:province
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $('#city').selectpicker('refresh');
                $('#city').selectpicker('render');
            }
            GetCounty();
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
//获取区县
function GetCounty(){
    //市赋值
    //获取已录入的省份
    let province=document.getElementById('province').value;
    let city=document.getElementById('city').value;
    let  $selectParent=$("#county");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/china/GetCounty",
        data:{
            province:province,
            city:city
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $('#county').selectpicker('refresh');
                $('#county').selectpicker('render');
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
//新建项目
function AddNew(){
    let project_name=document.getElementById('project_name').value;
    let project_type=document.getElementById('project_type').value;
    let bidding_type=document.getElementById('bidding_type').value;
    let bid_type=document.getElementById('bid_type').value;
    let province=document.getElementById('province').value;
    let city=document.getElementById('city').value;
    let county=document.getElementById('county').value;
    let quote_num=document.getElementById('quote_num').value;
    let bidding_company=document.getElementById('bidding_company').value;
    let buyer_unit=document.getElementById('buyer_unit').value;
    let customer_classification=document.getElementById('customer_classification').value;
    let big_client_code=document.getElementById('big_client_code').value;
    let bid_opening_date=document.getElementById('bid_opening_date').value;
    let branch_office=document.getElementById('branch_office').value;
    let sales_person=document.getElementById('sales_person').value;
    let elevator_model=document.getElementById('elevator_model').value;
    let building_height=document.getElementById('building_height').value;
    if(!project_name){
        alert('项目名称不能为空！');
        document.getElementById('project_name').focus();
        document.getElementById('project_name').select();
        return ;
    }
    if(!project_type){
        alert('项目类型不能为空！');
        document.getElementById('project_type').focus();
        document.getElementById('project_type').select();
        return ;
    }
    if(!bidding_type){
        alert('招标类型不能为空！');
        document.getElementById('bidding_type').focus();
        document.getElementById('bidding_type').select();
        return ;
    }
    if(!bid_type){
        alert('投标方式不能为空！');
        document.getElementById('bid_type').focus();
        document.getElementById('bid_type').select();
        return ;
    }
    if(!province){
        alert('安装省份不能为空！');
        document.getElementById('province').focus();
        document.getElementById('province').select();
        return ;
    }
    if(!city){
        alert('安装地市不能为空！');
        document.getElementById('city').focus();
        document.getElementById('city').select();
        return ;
    }
    if(!county){
        alert('安装区县不能为空！');
        document.getElementById('county').focus();
        document.getElementById('county').select();
        return ;
    }
    if(!quote_num){
        alert('招标台量不能为空！');
        document.getElementById('quote_num').focus();
        document.getElementById('quote_num').select();
        return ;
    }
    if(!bidding_company){
        alert('招标公司不能为空！');
        document.getElementById('bidding_company').focus();
        document.getElementById('bidding_company').select();
        return ;
    }
    if(!buyer_unit){
        alert('买方单位不能为空！');
        document.getElementById('buyer_unit').focus();
        document.getElementById('buyer_unit').select();
        return ;
    }
    if(!customer_classification){
        alert('客户属性不能为空！');
        document.getElementById('customer_classification').focus();
        document.getElementById('customer_classification').select();
        return ;
    }
    if(customer_classification==="KA客户" && !big_client_code){
        alert('大客户时客户KA编码不能为空！');
        document.getElementById('big_client_code').focus();
        document.getElementById('big_client_code').select();
        return ;
    }
    if(!bid_opening_date){
        alert('开标日期不能为空！');
        document.getElementById('bid_opening_date').focus();
        document.getElementById('bid_opening_date').select();
        return ;
    }
    if(!branch_office){
        alert('分公司！');
        document.getElementById('branch_office').focus();
        document.getElementById('branch_office').select();
        return ;
    }
    if(!sales_person){
        alert('营业员不能为空！');
        document.getElementById('sales_person').focus();
        document.getElementById('sales_person').select();
        return ;
    }
    if(!elevator_model){
        alert('主要梯种型号不能为空！');
        document.getElementById('elevator_model').focus();
        document.getElementById('elevator_model').select();
        return ;
    }
    if(!building_height){
        alert('建筑物最高高度不能为空！');
        document.getElementById('building_height').focus();
        document.getElementById('building_height').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/NewProject",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("添加失败！");
            }
            if(data===1){
                alert("添加成功！");
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
//获取删除ID
function GetDeleteID(id) {
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    $("#delete_id").val(row[0].id);
}
//删除项目
function Delete(){
    let delete_id=document.getElementById('delete_id').value;
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"../quote/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                $('#DeleteModal').modal('hide');
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
                    msg: '删除失败！'
                });
                return false;
            }
            if(data===1){
                $('#DeleteModal').modal('hide');
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
                    msg: '删除成功！'
                });
                $("#quoteIndex").bootstrapTable('removeByUniqueId', delete_id)
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//获取报价ID
function GetTenderOfferID(id) {
    $("#tender_offer_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#t_project_name").val(data[i].project_name);
                $("#t_project_type").val(data[i].project_type);
                $("#t_bidding_type").val(data[i].bidding_type);
                $("#t_bid_type").val(data[i].bid_type);
                $("#t_bidding_company").val(data[i].bidding_company);
                $("#t_buyer_unit").val(data[i].buyer_unit);
                $("#t_customer_classification").val(data[i].customer_classification);
                $("#t_big_client_code").val(data[i].big_client_code);
                $("#t_bid_opening_date").val(data[i].bid_opening_date);
                $("#t_sales_person").val(data[i].sales_person);
                $("#t_elevator_model").val(data[i].elevator_model);
                $("#t_building_height").val(data[i].building_height);
                //报价日期判断
                let t_quote_date=data[i].quote_date;
                let quote_date = document.getElementById("t_quote_date");
                if(!t_quote_date || t_quote_date==='0000-00-00'){
                    quote_date.removeAttribute("readOnly");
                    $("#t_quote_date").val('');
                }else{
                    $("#t_quote_date").val(data[i].quote_date);
                    quote_date.setAttribute("readOnly",'true');
                }
                $("#standard_equipment_price").val(data[i].standard_equipment_price);
                $("#final_equipment_quotation").val(data[i].final_equipment_quotation);
                $("#total_transport_price").val(data[i].total_transport_price);
                $("#final_installation_quote").val(data[i].final_installation_quote);
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
function getQuoteTenderOfferID(){
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    let quote_status=row[0].status;
    if(quote_status==='跟进中'){
        //模态框赋值
        $("#tender_offer_id").val(row[0].id);
        $("#t_project_name").val(row[0].project_name);
        $("#t_project_type").val(row[0].project_type);
        $("#t_bidding_type").val(row[0].bidding_type);
        $("#t_bid_type").val(row[0].bid_type);
        $("#t_bidding_company").val(row[0].bidding_company);
        $("#t_buyer_unit").val(row[0].buyer_unit);
        $("#t_customer_classification").val(row[0].customer_classification);
        $("#t_big_client_code").val(row[0].big_client_code);
        $("#t_bid_opening_date").val(row[0].bid_opening_date);
        $("#t_sales_person").val(row[0].sales_person);
        $("#t_elevator_model").val(row[0].elevator_model);
        $("#t_building_height").val(row[0].building_height);
        //报价日期判断
        let t_quote_date=row[0].quote_date;
        let quote_date = document.getElementById("t_quote_date");
        if(!t_quote_date || t_quote_date==='0000-00-00'){
            quote_date.removeAttribute("readOnly");
            $("#t_quote_date").val('');
        }else{
            $("#t_quote_date").val(row[0].quote_date);
            quote_date.setAttribute("readOnly",'true');
        }
        $("#standard_equipment_price").val(row[0].standard_equipment_price);
        $("#final_equipment_quotation").val(row[0].final_equipment_quotation);
        $("#total_transport_price").val(row[0].total_transport_price);
        $("#final_installation_quote").val(row[0].final_installation_quote);
        $("#TenderOffer").modal('show');
    }else{
        alert('只有跟进中的项目才能报价！');
    }

}
//提交报价请求
function TenderOffer(){
    let t_quote_date=document.getElementById('t_quote_date').value;
    let standard_equipment_price=document.getElementById('standard_equipment_price').value;
    let final_equipment_quotation=document.getElementById('final_equipment_quotation').value;
    let total_transport_price=document.getElementById('total_transport_price').value;
    let final_installation_quote=document.getElementById('final_installation_quote').value;
    if(!t_quote_date){
        alert('报价日期不能为空！');
        document.getElementById('t_quote_date').focus();
        document.getElementById('t_quote_date').select();
        return ;
    }
    if(standard_equipment_price==='0'){
        alert('设备SPL价必须填入！');
        document.getElementById('standard_equipment_price').focus();
        document.getElementById('standard_equipment_price').select();
        return ;
    }
    if(final_equipment_quotation==='0'){
        alert('最终设备报价必须填入！');
        document.getElementById('final_equipment_quotation').focus();
        document.getElementById('final_equipment_quotation').select();
        return ;
    }
    if(total_transport_price==='0'){
        alert('最终运费报价必须填入！');
        document.getElementById('total_transport_price').focus();
        document.getElementById('total_transport_price').select();
        return ;
    }
    if(final_installation_quote==='0'){
        alert('最终安装报价必须填入！');
        document.getElementById('final_installation_quote').focus();
        document.getElementById('final_installation_quote').select();
        return ;
    }
    let formData = $("#TenderOfferForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/TenderOffer",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("报价失败！");
            }
            if(data===1){
                alert("报价成功！");
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
//获取投标结果ID
function GetTenderResultID(id){
    $("#tender_result_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#r_project_name").val(data[i].project_name);
                $("#r_bid_opening_date").val(data[i].bid_opening_date);
                $("#r_sales_person").val(data[i].sales_person);
                $("#r_quote_num").val(data[i].quote_num);

                $("#r_standard_equipment_price").val(data[i].standard_equipment_price);
                $("#r_final_equipment_quotation").val(data[i].final_equipment_quotation);
                $("#r_total_transport_price").val(data[i].total_transport_price);
                $("#r_final_installation_quote").val(data[i].final_installation_quote);
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
function getQuoteTenderResultID(){
    $("#winning_bid").selectpicker('refresh');
    $("#not_winning_reason").selectpicker('refresh');
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    let quote_status=row[0].status;
    if(quote_status==='已报价'){
        //模态框赋值
        $("#tender_result_id").val(row[0].id);
        $("#r_project_name").val(row[0].project_name);
        $("#r_bid_opening_date").val(row[0].bid_opening_date);
        $("#r_sales_person").val(row[0].sales_person);
        $("#r_quote_num").val(row[0].quote_num);
        $("#r_standard_equipment_price").val(row[0].standard_equipment_price);
        $("#r_final_equipment_quotation").val(row[0].final_equipment_quotation);
        $("#r_total_transport_price").val(row[0].total_transport_price);
        $("#r_final_installation_quote").val(row[0].final_installation_quote);
        $("#TenderResult").modal('show');
    }else{
        alert('必须是已报价状态下的项目才能录投标结果！');
    }

}
//提交投标结果
function TenderResult(){
    let r_standard_equipment_price=document.getElementById('r_standard_equipment_price').value;
    let standard_equipment_price=r_standard_equipment_price*1;
    let r_final_equipment_quotation=document.getElementById('r_final_equipment_quotation').value;
    let final_equipment_quotation=r_final_equipment_quotation*1
    let r_total_transport_price=document.getElementById('r_total_transport_price').value;
    let total_transport_price=r_total_transport_price*1;
    let r_final_installation_quote=document.getElementById('r_final_installation_quote').value;
    let final_installation_quote=r_final_installation_quote*1;
    let winning_bid=document.getElementById('winning_bid').value;
    let bid_num=document.getElementById('bid_num').value;
    let not_winning_reason=document.getElementById('not_winning_reason').value;
    let competitor_quote=document.getElementById('competitor_quote').value;
    let bid_num_check=bid_num*1;
    let competitor_quote_check=competitor_quote*1;
    if(standard_equipment_price<50000){
        alert('设备SPL价不符合逻辑要求，请检查(单位应为元）！');
        document.getElementById('r_standard_equipment_price').focus();
        return ;
    }
    if(final_equipment_quotation<50000){
        alert('最终设备报价不符合逻辑要求，请检查(单位应为元）！');
        document.getElementById('r_final_equipment_quotation').focus();
        return ;
    }
    if(total_transport_price<1000){
        alert('最终运费报价不符合逻辑要求，请检查(单位应为元）！');
        document.getElementById('r_total_transport_price').focus();
        return ;
    }
    if(final_installation_quote<4000){
        alert('最终安装报价不符合逻辑要求，请检查(单位应为元）！');
        document.getElementById('r_final_installation_quote').focus();
        return ;
    }
    if(!winning_bid){
        alert('中标厂家不能为空！');
        document.getElementById('winning_bid').focus();
        return ;
    }
    if(winning_bid==='日立' && bid_num_check===0){
        alert('我司中标时必须录入中标台量！');
        document.getElementById('bid_num').focus();
        return ;
    }
    if(winning_bid==='日立' && not_winning_reason){
        alert('我司中标时无需录入丢标原因！');
        document.getElementById('not_winning_reason').focus();
        return ;
    }
    if(winning_bid==='日立' && competitor_quote>0){
        alert('我司中标时无需录入竞争对手价格！');
        document.getElementById('competitor_quote').focus();
        return ;
    }
    if(winning_bid!=='日立' && bid_num_check>0){
        alert('非我司中标时不能录入中标台量！');
        document.getElementById('bid_num').focus();
        return ;
    }
    if(winning_bid!=='日立' && !not_winning_reason){
        alert('非我司中标时须录入丢标原因！');
        document.getElementById('not_winning_reason').focus();
        return ;
    }
    if(winning_bid!=='日立' && competitor_quote_check===0){
        alert('非我司中标时须录入竞争对手投标总价！拿不到对手报价时联系管理员特殊处理。');
        document.getElementById('competitor_quote').focus();
        return ;
    }
    if(winning_bid!=='日立' && !competitor_quote){
        alert('非我司中标时须录入竞争对手投标总价！拿不到对手报价时联系管理员特殊处理。');
        document.getElementById('competitor_quote').focus();
        return ;
    }
    let formData = $("#TenderResultForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/TenderResult",
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
//获取生成合同ID
function GetCreateContractID(id){
    $("#create_contract_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#c_project_name").val(data[i].project_name);
                $("#c_branch_office").val(data[i].branch_office);
                $("#c_sales_person").val(data[i].sales_person);
                $("#c_bid_num").val(data[i].bid_num);
                $("#c_province").val(data[i].province);
                $("#c_city").val(data[i].city);
                $("#c_county").val(data[i].county);
                $("#c_buyer_unit").val(data[i].buyer_unit);
                $("#c_use_unit").val(data[i].buyer_unit);
                $("#c_customer_classification").val(data[i].customer_classification);
                $("#c_big_client_code").val(data[i].big_client_code);
                $("#c_project_type").val(data[i].project_type);
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
function getQuoteCreateContractID(){
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    let quote_status=row[0].status;
    let contract_id=row[0].contract_id;
    if(!contract_id && quote_status==='已中标'){
        $("#create_contract_id").val(row[0].id);
        $("#c_project_name").val(row[0].project_name);
        $("#c_branch_office").val(row[0].branch_office);
        $("#c_sales_person").val(row[0].sales_person);
        $("#c_bid_num").val(row[0].bid_num);
        $("#c_province").val(row[0].province);
        $("#c_city").val(row[0].city);
        $("#c_county").val(row[0].county);
        $("#c_buyer_unit").val(row[0].buyer_unit);
        $("#c_use_unit").val(row[0].buyer_unit);
        $("#c_customer_classification").val(row[0].customer_classification);
        $("#c_big_client_code").val(row[0].big_client_code);
        $("#c_project_type").val(row[0].project_type);
        $("#CreateContract").modal('show');

    }else{
        alert('不符合生成合同条件！');
    }

}
//生成合同
function CreateContract(){
    let c_buyer_unit=document.getElementById('c_buyer_unit').value;
    let c_use_unit=document.getElementById('c_use_unit').value;
    let c_contract_id=document.getElementById('c_contract_id').value;
    let c_bid_num=document.getElementById('c_bid_num').value;
    let bid_num_check=c_bid_num*1;
    if(!c_buyer_unit){
        alert('买方单位不能为空！');
        document.getElementById('c_buyer_unit').focus();
        return ;
    }
    if(!c_use_unit){
        alert('使用单位不能为空！');
        document.getElementById('c_use_unit').focus();
        return ;
    }
    if(!c_contract_id){
        alert('合同号不能为空！如果没有正式合同号，不妨试试下面的获取临时合同号按钮');
        document.getElementById('c_contract_id').focus();
        return ;
    }
    if(bid_num_check===0){
        alert('合同台量不能为0');
        document.getElementById('c_bid_num').focus();
        return ;
    }
    let formData = $("#CreateContractForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/CreateContract",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("报价更新合同号失败！");
            }
            if(data===1){
                alert("成功生成合同！");
                window.location.reload();
            }
            if(data===2){
                alert("新增合同失败！");
            }
            if(data===3){
                alert("合同号重复，请重新检查！");
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
//获取临时合同号
function GetTempContractID(){
    let num=document.getElementById('create_contract_id').value;
    let date=new Date();
//两位
    let yearFour=date.getFullYear().toString().substr(2,2);
    let temp_contract_id= 'LS' + yearFour + (Array(5).join(0) + num).slice(-5);
    $("#c_contract_id").val(temp_contract_id);
}
//获取申请保证金明细
function GetApplyBondID(id){
    $("#apply_bond_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#a_project_name").val(data[i].project_name);
                $("#a_quote_num").val(data[i].quote_num);
                $("#a_bidding_company").val(data[i].bidding_company);
                $("#a_buyer_unit").val(data[i].buyer_unit);
                $("#a_bid_opening_date").val(data[i].bid_opening_date);
                $("#a_branch_office").val(data[i].branch_office);
                $("#a_sales_person").val(data[i].sales_person);
                $('#a_bond_assortment').selectpicker('val',data[i].bond_assortment);//设置选中
                $('#a_bond_assortment').selectpicker('refresh');
                $("#a_bond").val(data[i].bond);
                $("#a_performance_bond").val(data[i].performance_bond);
                //保证金申请日期
                //首次接收日期判断
                let a_bond_apply_date=data[i].bond_apply_date;
                let bond_apply_date = document.getElementById("a_bond_apply_date");
                if(!a_bond_apply_date || a_bond_apply_date==='0000-00-00'){
                    bond_apply_date.removeAttribute("readOnly");
                    $("#a_bond_apply_date").val('');
                }else{
                    $("#a_bond_apply_date").val(data[i].bond_apply_date);
                    bond_apply_date.setAttribute("readOnly",'true');
                }
                //保证金支付方
                $('#a_bond_payer').selectpicker('val',data[i].bond_payer);//设置选中
                $('#a_bond_payer').selectpicker('refresh');
                //保证金汇出日期
                let a_bond_remit_date=data[i].bond_remit_date;
                let bond_remit_date = document.getElementById("a_bond_remit_date");
                if(!a_bond_remit_date || a_bond_remit_date==='0000-00-00'){
                    bond_remit_date.removeAttribute("readOnly");
                    $("#a_bond_remit_date").val('');
                }else{
                    $("#a_bond_remit_date").val(data[i].bond_remit_date);
                    bond_remit_date.setAttribute("readOnly",'true');
                }
                //保证金受益人
                $("#a_bond_beneficiary").val(data[i].bond_beneficiary);
                //招标文件是否盖章
                $('#a_if_seal').selectpicker('val',data[i].if_seal);//设置选中
                $('#a_if_seal').selectpicker('refresh');
                //应退回日期
                let a_band_expect_date=data[i].band_expect_date;
                let band_expect_date = document.getElementById("a_band_expect_date");
                if(!a_band_expect_date || a_band_expect_date==='0000-00-00'){
                    band_expect_date.removeAttribute("readOnly");
                    $("#a_band_expect_date").val('');
                }else{
                    $("#a_band_expect_date").val(data[i].band_expect_date);
                    band_expect_date.setAttribute("readOnly",'true');
                }
                //保证金退回日期
                let a_bond_return_date=data[i].bond_return_date;
                let bond_return_date = document.getElementById("a_bond_return_date");
                if(!a_bond_return_date || a_bond_return_date==='0000-00-00'){
                    bond_return_date.removeAttribute("readOnly");
                    $("#a_bond_return_date").val('');
                }else{
                    $("#a_bond_return_date").val(data[i].bond_return_date);
                    bond_return_date.setAttribute("readOnly",'true');
                }
                //核销金额
                $("#a_verification_money").val(data[i].verification_money);
                //保证金是否转履约
                $('#a_if_agreement').selectpicker('val',data[i].if_agreement);//设置选中
                $('#a_if_agreement').selectpicker('refresh');
                //承诺收回日期
                let a_agreement_back_date=data[i].agreement_back_date;
                let agreement_back_date = document.getElementById("a_agreement_back_date");
                if(!a_agreement_back_date || a_agreement_back_date==='0000-00-00'){
                    agreement_back_date.removeAttribute("readOnly");
                    $("#a_agreement_back_date").val('');
                }else{
                    $("#a_agreement_back_date").val(data[i].agreement_back_date);
                    agreement_back_date.setAttribute("readOnly",'true');
                }
                //催款函寄出日期
                let a_reminder_letter_date=data[i].reminder_letter_date;
                let reminder_letter_date = document.getElementById("a_reminder_letter_date");
                if(!a_reminder_letter_date || a_reminder_letter_date==='0000-00-00'){
                    reminder_letter_date.removeAttribute("readOnly");
                    $("#a_reminder_letter_date").val('');
                }else{
                    $("#a_reminder_letter_date").val(data[i].reminder_letter_date);
                    reminder_letter_date.setAttribute("readOnly",'true');
                }
                //律师函寄出日期
                let a_lawyer_letter_date=data[i].lawyer_letter_date;
                let lawyer_letter_date = document.getElementById("a_lawyer_letter_date");
                if(!a_lawyer_letter_date || a_lawyer_letter_date==='0000-00-00'){
                    lawyer_letter_date.removeAttribute("readOnly");
                    $("#a_lawyer_letter_date").val('');
                }else{
                    $("#a_lawyer_letter_date").val(data[i].lawyer_letter_date);
                    lawyer_letter_date.setAttribute("readOnly",'true');
                }
                //备注
                $("#a_bond_remarks").val(data[i].bond_remarks);

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
function getQuoteApplyBondID(){
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    $("#apply_bond_id").val(row[0].id);
    $("#a_project_name").val(row[0].project_name);
    $("#a_quote_num").val(row[0].quote_num);
    $("#a_bidding_company").val(row[0].bidding_company);
    $("#a_buyer_unit").val(row[0].buyer_unit);
    $("#a_bid_opening_date").val(row[0].bid_opening_date);
    $("#a_branch_office").val(row[0].branch_office);
    $("#a_sales_person").val(row[0].sales_person);
    $('#a_bond_assortment').selectpicker('val',row[0].bond_assortment);//设置选中
    $('#a_bond_assortment').selectpicker('refresh');
    $("#a_bond").val(row[0].bond);
    $("#a_performance_bond").val(row[0].performance_bond);
    //保证金申请日期
    //首次接收日期判断
    let a_bond_apply_date=row[0].bond_apply_date;
    let bond_apply_date = document.getElementById("a_bond_apply_date");
    if(!a_bond_apply_date || a_bond_apply_date==='0000-00-00'){
        bond_apply_date.removeAttribute("readOnly");
        $("#a_bond_apply_date").val('');
    }else{
        $("#a_bond_apply_date").val(row[0].bond_apply_date);
        bond_apply_date.setAttribute("readOnly",'true');
    }
    //保证金支付方
    $('#a_bond_payer').selectpicker('val',row[0].bond_payer);//设置选中
    $('#a_bond_payer').selectpicker('refresh');
    //保证金汇出日期
    let a_bond_remit_date=row[0].bond_remit_date;
    let bond_remit_date = document.getElementById("a_bond_remit_date");
    if(!a_bond_remit_date || a_bond_remit_date==='0000-00-00'){
        bond_remit_date.removeAttribute("readOnly");
        $("#a_bond_remit_date").val('');
    }else{
        $("#a_bond_remit_date").val(row[0].bond_remit_date);
        bond_remit_date.setAttribute("readOnly",'true');
    }
    //保证金受益人
    $("#a_bond_beneficiary").val(row[0].bond_beneficiary);
    //招标文件是否盖章
    $('#a_if_seal').selectpicker('val',row[0].if_seal);//设置选中
    $('#a_if_seal').selectpicker('refresh');
    //应退回日期
    let a_band_expect_date=row[0].band_expect_date;
    let band_expect_date = document.getElementById("a_band_expect_date");
    if(!a_band_expect_date || a_band_expect_date==='0000-00-00'){
        band_expect_date.removeAttribute("readOnly");
        $("#a_band_expect_date").val('');
    }else{
        $("#a_band_expect_date").val(row[0].band_expect_date);
        band_expect_date.setAttribute("readOnly",'true');
    }
    //保证金退回日期
    let a_bond_return_date=row[0].bond_return_date;
    let bond_return_date = document.getElementById("a_bond_return_date");
    if(!a_bond_return_date || a_bond_return_date==='0000-00-00'){
        bond_return_date.removeAttribute("readOnly");
        $("#a_bond_return_date").val('');
    }else{
        $("#a_bond_return_date").val(row[0].bond_return_date);
        bond_return_date.setAttribute("readOnly",'true');
    }
    //核销金额
    $("#a_verification_money").val(row[0].verification_money);
    //保证金是否转履约
    $('#a_if_agreement').selectpicker('val',row[0].if_agreement);//设置选中
    $('#a_if_agreement').selectpicker('refresh');
    //承诺收回日期
    let a_agreement_back_date=row[0].agreement_back_date;
    let agreement_back_date = document.getElementById("a_agreement_back_date");
    if(!a_agreement_back_date || a_agreement_back_date==='0000-00-00'){
        agreement_back_date.removeAttribute("readOnly");
        $("#a_agreement_back_date").val('');
    }else{
        $("#a_agreement_back_date").val(row[0].agreement_back_date);
        agreement_back_date.setAttribute("readOnly",'true');
    }
    //催款函寄出日期
    let a_reminder_letter_date=row[0].reminder_letter_date;
    let reminder_letter_date = document.getElementById("a_reminder_letter_date");
    if(!a_reminder_letter_date || a_reminder_letter_date==='0000-00-00'){
        reminder_letter_date.removeAttribute("readOnly");
        $("#a_reminder_letter_date").val('');
    }else{
        $("#a_reminder_letter_date").val(row[0].reminder_letter_date);
        reminder_letter_date.setAttribute("readOnly",'true');
    }
    //律师函寄出日期
    let a_lawyer_letter_date=row[0].lawyer_letter_date;
    let lawyer_letter_date = document.getElementById("a_lawyer_letter_date");
    if(!a_lawyer_letter_date || a_lawyer_letter_date==='0000-00-00'){
        lawyer_letter_date.removeAttribute("readOnly");
        $("#a_lawyer_letter_date").val('');
    }else{
        $("#a_lawyer_letter_date").val(row[0].lawyer_letter_date);
        lawyer_letter_date.setAttribute("readOnly",'true');
    }
    //备注
    $("#a_bond_remarks").val(row[0].bond_remarks);

}
//保证金申请
function ApplyBond(){
    let formData = $("#ApplyBondForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/ApplyBond",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("申请失败！");
            }
            if(data===1){
                alert("申请成功！");
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
//保证金审核
function VerifyBond(){
    let formData = $("#ApplyBondForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/VerifyBond",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("审核失败！");
            }
            if(data===1){
                alert("审核成功！");
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
//获取报价预览ID
function GetPreviewID(id){
    $("#quote_preview_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#q_project_name").val(data[i].project_name);
                $("#q_project_type").val(data[i].project_type);
                $("#q_bidding_type").val(data[i].bidding_type);
                $("#q_bid_type").val(data[i].bid_type);

                $("#q_province").val(data[i].province);
                $("#q_city").val(data[i].city);
                $("#q_county").val(data[i].county);
                $("#q_quote_num").val(data[i].quote_num);

                $("#q_bidding_company").val(data[i].bidding_company);
                $("#q_buyer_unit").val(data[i].buyer_unit);
                $("#q_customer_classification").val(data[i].customer_classification);
                $("#q_big_client_code").val(data[i].big_client_code);

                $("#p_bid_opening_date").val(data[i].bid_opening_date);
                $("#q_branch_office").val(data[i].branch_office);
                $("#q_sales_person").val(data[i].sales_person);
                $("#q_elevator_model").val(data[i].elevator_model);
                $("#q_building_height").val(data[i].building_height);
                $("#q_quote_date").val(data[i].quote_date);
                $("#q_standard_equipment_price").val(data[i].standard_equipment_price);
                $("#q_final_equipment_quotation").val(data[i].final_equipment_quotation);
                $("#q_total_transport_price").val(data[i].total_transport_price);
                $("#q_final_installation_quote").val(data[i].final_installation_quote);
                $("#q_winning_bid").val(data[i].winning_bid);
                $("#q_competitor_quote").val(data[i].competitor_quote);
                $("#q_not_winning_reason").val(data[i].not_winning_reason);
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
function getQuotePreviewID(){
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    $("#quote_preview_id").val(row[0].id);
    $("#q_project_name").val(row[0].project_name);
    $("#q_project_type").val(row[0].project_type);
    $("#q_bidding_type").val(row[0].bidding_type);
    $("#q_bid_type").val(row[0].bid_type);
    $("#q_province").val(row[0].province);
    $("#q_city").val(row[0].city);
    $("#q_county").val(row[0].county);
    $("#q_quote_num").val(row[0].quote_num);
    $("#q_bidding_company").val(row[0].bidding_company);
    $("#q_buyer_unit").val(row[0].buyer_unit);
    $("#q_customer_classification").val(row[0].customer_classification);
    $("#q_big_client_code").val(row[0].big_client_code);
    $("#p_bid_opening_date").val(row[0].bid_opening_date);
    $("#q_branch_office").val(row[0].branch_office);
    $("#q_sales_person").val(row[0].sales_person);
    $("#q_elevator_model").val(row[0].elevator_model);
    $("#q_building_height").val(row[0].building_height);
    $("#q_quote_date").val(row[0].quote_date);
    $("#q_standard_equipment_price").val(row[0].standard_equipment_price);
    $("#q_final_equipment_quotation").val(row[0].final_equipment_quotation);
    $("#q_total_transport_price").val(row[0].total_transport_price);
    $("#q_final_installation_quote").val(row[0].final_installation_quote);
    $("#q_winning_bid").val(row[0].winning_bid);
    $("#q_competitor_quote").val(row[0].competitor_quote);
    $("#q_not_winning_reason").val(row[0].not_winning_reason);
}
//获取编辑ID
function GetQuoteEditID(id){
    $("#quote_edit_id").val(id);
    $.ajax({
        type:"post",
        cache:false,
        url:"/../tp5/public/index.php/index/quote/GetTenderOffer",
        data:{
            id:id
        },
        dataType:'json',
        ifModified:true,
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值
                $("#e_project_name").val(data[i].project_name);

                $('#e_project_type').selectpicker('val',data[i].project_type);//设置选中
                $('#e_project_type').selectpicker('refresh');

                $("#e_bidding_type").val(data[i].bidding_type);
                $("#e_bid_type").val(data[i].bid_type);

                $("#e_province").val(data[i].province);
                $("#e_city").val(data[i].city);
                $("#e_county").val(data[i].county);
                $("#e_quote_num").val(data[i].quote_num);

                $("#e_bidding_company").val(data[i].bidding_company);
                $("#e_buyer_unit").val(data[i].buyer_unit);

                $('#e_customer_classification').selectpicker('val',data[i].customer_classification);//设置选中
                $('#e_customer_classification').selectpicker('refresh');

                $("#e_big_client_code").val(data[i].big_client_code);

                $("#e_bid_opening_date").val(data[i].bid_opening_date);
                $("#e_elevator_model").val(data[i].elevator_model);
                $("#e_branch_office").val(data[i].branch_office);
                $("#e_sales_person").val(data[i].sales_person);
                $("#e_quote_date").val(data[i].quote_date);
                $("#e_standard_equipment_price").val(data[i].standard_equipment_price);
                $("#e_final_equipment_quotation").val(data[i].final_equipment_quotation);
                $("#e_total_transport_price").val(data[i].total_transport_price);
                $("#e_final_installation_quote").val(data[i].final_installation_quote);
                $("#e_win_bidding_date").val(data[i].win_bidding_date);
                //中标厂家
                $('#e_winning_bid').selectpicker('val',data[i].winning_bid);//设置选中
                $('#e_winning_bid').selectpicker('refresh');

                $("#e_competitor_quote").val(data[i].competitor_quote);
                $("#e_contract_id").val(data[i].contract_id);

                $('#e_status').selectpicker('val',data[i].status);//设置选中
                $('#e_status').selectpicker('refresh');

                $("#e_bid_num").val(data[i].bid_num);

                $('#e_if_not_winning').selectpicker('val',data[i].if_not_winning);//设置选中
                $('#e_if_not_winning').selectpicker('refresh');

                $("#e_not_winning_date").val(data[i].not_winning_date);

                $('#e_not_winning_reason').selectpicker('val',data[i].not_winning_reason);//设置选中
                $('#e_not_winning_reason').selectpicker('refresh');
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
function getQuoteUpdateID(){
    let row=$("#quoteIndex").bootstrapTable('getSelections');
    $("#quote_edit_id").val(row[0].id);
    $("#e_project_name").val(row[0].project_name);
    $('#e_project_type').selectpicker('val',row[0].project_type);//设置选中
    $('#e_project_type').selectpicker('refresh');
    $("#e_bidding_type").val(row[0].bidding_type);
    $("#e_bid_type").val(row[0].bid_type);
    $("#e_province").val(row[0].province);
    $("#e_city").val(row[0].city);
    $("#e_county").val(row[0].county);
    $("#e_quote_num").val(row[0].quote_num);
    $("#e_bidding_company").val(row[0].bidding_company);
    $("#e_buyer_unit").val(row[0].buyer_unit);
    $('#e_customer_classification').selectpicker('val',row[0].customer_classification);//设置选中
    $('#e_customer_classification').selectpicker('refresh');
    $("#e_big_client_code").val(row[0].big_client_code);
    $("#e_bid_opening_date").val(row[0].bid_opening_date);
    $("#e_elevator_model").val(row[0].elevator_model);
    $("#e_branch_office").val(row[0].branch_office);
    $("#e_sales_person").val(row[0].sales_person);
    $("#e_quote_date").val(row[0].quote_date);
    $("#e_standard_equipment_price").val(row[0].standard_equipment_price);
    $("#e_final_equipment_quotation").val(row[0].final_equipment_quotation);
    $("#e_total_transport_price").val(row[0].total_transport_price);
    $("#e_final_installation_quote").val(row[0].final_installation_quote);
    $("#e_win_bidding_date").val(row[0].win_bidding_date);
    $('#e_winning_bid').selectpicker('val',row[0].winning_bid);//设置选中
    $('#e_winning_bid').selectpicker('refresh');
    $("#e_competitor_quote").val(row[0].competitor_quote);
    $("#e_contract_id").val(row[0].contract_id);
    $('#e_status').selectpicker('val',row[0].status);//设置选中
    $('#e_status').selectpicker('refresh');
    $("#e_bid_num").val(row[0].bid_num);
    $('#e_if_not_winning').selectpicker('val',row[0].if_not_winning);//设置选中
    $('#e_if_not_winning').selectpicker('refresh');
    $("#e_not_winning_date").val(row[0].not_winning_date);
    $('#e_not_winning_reason').selectpicker('val',row[0].not_winning_reason);//设置选中
    $('#e_not_winning_reason').selectpicker('refresh');
}
//  修改报价状态
function ChangeQuoteStatus(){
    let e_status=document.getElementById('e_status').value;
    let e_bid_opening_date=document.getElementById('e_bid_opening_date').value;
    if(e_status==="已丢标"){
        $("#e_bid_num").val(0);
        $('#e_if_not_winning').selectpicker('val','是');//设置选中
        $('#e_if_not_winning').selectpicker('refresh');
        $("#e_not_winning_date").val(e_bid_opening_date);
        //中标厂家
        $('#e_winning_bid').selectpicker('val','其他');//设置选中
        $('#e_winning_bid').selectpicker('refresh');
        $('#e_not_winning_reason').selectpicker('val','价格');//设置选中
        $('#e_not_winning_reason').selectpicker('refresh');
    }
}
//编辑报价
function QuoteEdit(){
    let formData = $("#QuoteEditForm").serialize();
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/quote/QuoteEdit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("编辑失败！");
            }
            if(data===1){
                $("#QuoteEdit").modal('hide');
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
                $('#quoteIndex').bootstrapTable('refresh');
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



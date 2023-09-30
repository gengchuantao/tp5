//模态框加载时渲染
$(function () {
    /*$('#d_apply_date').datetimepicker({
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        locale: moment.locale('zh-cn')
    });*/
    //发函日期
    $('#l_letter_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#l_submission_process_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    $('#l_process_end_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //提交流程时间
    $('#f_submission_process_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //流程结束时间
    $('#f_process_end_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //提交资料至律师日期
    $('#f_submit_information_to_lawyer_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //立案日期
    $('#f_filling_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //缴费日期
    $('#f_payment_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //开庭日期
    $('#f_hearing_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    //结案日期
    $('#f_close_date').datepicker({
        todayBtn: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
        language: "zh-CN",
        autoclose: true,
        //startDate: Date(),
        //endDate:moment(),
        //clearBtn: true,
    });
    /*选择器初始化*/
    $("#search_litigation_type").selectpicker('refresh');
    $("#litigation_type").selectpicker('refresh');
    $("#company").selectpicker('refresh');

    $('#sendingSubject').change(function () {
        document.getElementById('paymentNotificationFrom').innerHTML = "自：" + $(this).val();
        document.getElementById('paymentNotificationFrom1').innerHTML = $(this).val();
    });
    $("#litigationIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../Litigation/GetLitigationInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
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
            fileName: '法务信息导出' +　new Date().getTime(),//设置导出的表的默认名称
            tableName:'法务信息表',
            worksheetName: 'sheet1',  //表格工作区名称
        },
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_contract_id: $('#search_contract_id').val(),
                search_company: $('#search_company').val(),
                search_buyer_unit: $('#search_buyer_unit').val(),
                search_customer_abbreviation: $('#search_customer_abbreviation').val(),
                search_litigation_type: $('#search_litigation_type').val(),
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
            field: 'litigation_type',
            title: '类型',
            align: 'left',
            sortable: false
        },{
            field: 'litigation_status',
            title: '状态',
            align: 'center',
            sortable: false
        },{
            field: 'collection_status',
            title: '收款',
            align: 'center',
            sortable: true
        },{
            field: 'contract_id',
            title: '合同号',
            align: 'left',
            sortable: false
        }, {
            field: 'company',
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
            field: 'eq_litigation',
            title: '设备金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'in_litigation',
            title: '安装金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'ma_litigation',
            title: '维保金额',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'bid_bond',
            title: '投标保证金',
            align: 'right',
            sortable: false,
            formatter: function (value) {
                value = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                return value;
            },
        },{
            field: 'apply_date',
            title: '申请日期',
            align: 'right',
            sortable: false
        },{
            field: 'letter_date',
            title: '发函日期',
            align: 'right',
            sortable: false
        },{
            field: 'lawyer',
            title: '律师',
            align: 'center',
            sortable: false
        },{
            field: 'applicant',
            title: '申请人',
            align: 'center',
            sortable: false
        },{
            field: 'agent',
            title: '经办人',
            align: 'center',
            sortable: false
        },{
            field: 'letter_no',
            title: '函字',
            align: 'center',
            sortable: false
        },],
    });
    $('#litigationIndex').bootstrapTable('refresh');
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
    let search_company = $("#search_company").val();
    let search_buyer_unit = $("#search_buyer_unit").val();
    let search_customer_abbreviation = $("#search_customer_abbreviation").val();
    let search_litigation_type = $("#search_litigation_type").val();
    $.ajax({
        type: "post",
        url : "../Litigation/GetLitigationInfoByCondition", // 服务器数据的加载地址
        data: [
            {search_contract_id : search_contract_id},
            {search_company : search_company},
            {search_buyer_unit : search_buyer_unit},
            {search_customer_abbreviation : search_customer_abbreviation},
            {search_litigation_type : search_litigation_type},
        ],
        dataType:"json",
        success : function(json) {
            $("#litigationIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
})
//新建诉讼
function AddNew(){
    let role_company = document.getElementById('session_company').value
    let litigation_type=document.getElementById('litigation_type').value;
    let company=document.getElementById('company').value;
    let contract_id=document.getElementById('contract_id').value;
    let applicant=document.getElementById('applicant').value;
    let applicant_contact=document.getElementById('applicant_contact').value;
    console.log(role_company);
    if(!litigation_type){
        alert('类型不能为空！');
        document.getElementById('litigation_type').focus();
        document.getElementById('litigation_type').select();
        return ;
    }
    if(role_company !== '山东分公司' && litigation_type === '律师函'){
        alert('您的权限无法创建律师函！');
        document.getElementById('litigation_type').focus();
        document.getElementById('litigation_type').select();
        return ;
    }
    if(role_company !== '山东分公司' && litigation_type === '诉讼'){
        alert('您的权限无法创建诉讼！');
        document.getElementById('litigation_type').focus();
        document.getElementById('litigation_type').select();
        return ;
    }
    if(!company){
        alert('区域不能为空！');
        document.getElementById('company').focus();
        document.getElementById('company').select();
        return ;
    }
    if(!contract_id){
        alert('合同号不能为空！');
        document.getElementById('contract_id').focus();
        document.getElementById('contract_id').select();
        return ;
    }
    if(!applicant){
        alert('申请人不能为空！');
        document.getElementById('applicant').focus();
        document.getElementById('applicant').select();
        return ;
    }
    if(!applicant_contact){
        alert('联系方式不能为空！');
        document.getElementById('applicant_contact').focus();
        document.getElementById('applicant_contact').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    document.getElementById('litigationAddButton').disabled=true;
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/NewLitigation",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("添加失败！");
            }
            if(data===1){
                alert("添加成功！");
                document.getElementById('litigationAddButton').disabled=false;
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
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#delete_id").val(row[0].id);
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
//删除项目
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                $('#DeleteModal').modal('hide');
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
                    msg: '删除失败！'
                });
            }
            if(data===1){
                $('#DeleteModal').modal('hide');
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
                    msg: '删除成功！'
                });
                $('#litigationIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//获取更新ID
function getLitigationEditID(id){
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#litigation_edit_id").val(row[0].id);
        let e_litigation_type= $('#e_litigation_type');
        e_litigation_type.selectpicker('val',(row[0].litigation_type));
        e_litigation_type.selectpicker('refresh');
        let e_litigation_status= $('#e_litigation_status');
        e_litigation_status.selectpicker('val',(row[0].litigation_status));
        e_litigation_status.selectpicker('refresh');
        $("#e_contract_id").val(row[0].contract_id);
        $("#e_company").val(row[0].company);
        $("#e_buyer_unit").val(row[0].buyer_unit);
        $("#e_use_unit").val(row[0].use_unit);
        $("#e_big_client_code").val(row[0].big_client_code);
        $("#e_customer_abbreviation").val(row[0].customer_abbreviation);
        $("#e_eq_litigation").val(row[0].eq_litigation);
        $("#e_in_litigation").val(row[0].in_litigation);
        $("#e_ma_litigation").val(row[0].ma_litigation);
        $("#e_bid_bond").val(row[0].bid_bond);
        $("#e_submission_process_date").val(row[0].submission_process_date);
        $("#e_process_end_date").val(row[0].process_end_date);
        $("#e_courier_number").val(row[0].courier_number);
        $("#e_submit_information_to_lawyer_date").val(row[0].submit_information_to_lawyer_date);
        $("#e_filling_date").val(row[0].filling_date);
        $("#e_target_amount").val(row[0].target_amount);
        $("#e_case_no").val(row[0].case_no);
        $("#e_hearing_date").val(row[0].hearing_date);
        $("#e_close_date").val(row[0].close_date);
        $("#e_close_type").val(row[0].close_type);
        $("#e_judgment").val(row[0].judgment);
        $("#e_apply_execution_date").val(row[0].apply_execution_date);
        $("#e_court_costs").val(row[0].court_costs);
        $("#e_arbitration_costs").val(row[0].arbitration_costs);
        $("#e_maintenamce_costs").val(row[0].maintenamce_costs);
        $("#e_lawyer_costs").val(row[0].lawyer_costs);
        $("#e_applicant").val(row[0].applicant);
        $("#e_applicant_contact").val(row[0].applicant_contact);
        $("#e_apply_date").val(row[0].apply_date);
        $("#e_lawyer").val(row[0].lawyer);
        $("#e_agent").val(row[0].agent);
        $("#e_progress").val(row[0].progress);
        $("#e_remarks").val(row[0].remarks);
        $('#litigationEdit').modal('show');
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
//更新项目
function UpdateLitigation(){
    let formData = $("#litigationEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/updateLitigation",
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
//立案更新内容
function getFillingEditID(id){
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#filling_edit_id").val(row[0].id);
        $("#f_litigation_type").val(row[0].litigation_type);
        $("#f_litigation_status").val(row[0].litigation_status);
        $("#f_contract_id").val(row[0].contract_id);
        $("#f_company").val(row[0].company);
        $("#f_buyer_unit").val(row[0].buyer_unit);
        $("#f_use_unit").val(row[0].use_unit);
        $("#f_eq_litigation").val(row[0].eq_litigation);
        $("#f_in_litigation").val(row[0].in_litigation);
        $("#f_ma_litigation").val(row[0].ma_litigation);
        $("#f_bid_bond").val(row[0].bid_bond);
        $("#f_applicant").val(row[0].applicant);
        $("#f_apply_date").val(row[0].apply_date);
        $("#f_submission_process_date").val(row[0].submission_process_date);
        $("#f_process_end_date").val(row[0].process_end_date);
        $("#f_submit_information_to_lawyer_date").val(row[0].submit_information_to_lawyer_date);
        $("#f_lawyer").val(row[0].lawyer);
        $("#f_filling_date").val(row[0].filling_date);
        $("#f_payment_date").val(row[0].payment_date);
        $("#f_case_no").val(row[0].case_no);
        $("#f_hearing_date").val(row[0].hearing_date);
        $("#f_close_date").val(row[0].close_date);
        let f_close_type= $('#f_close_type');
        f_close_type.selectpicker('val',(row[0].close_type));
        f_close_type.selectpicker('refresh');

        $("#f_judgment").val(row[0].judgment);
        $("#f_collection_status").val(row[0].collection_status);
        $("#f_eq_litigation_collection").val(row[0].eq_litigation_collection);
        $("#f_in_litigation_collection").val(row[0].in_litigation_collection);
        $("#f_ma_litigation_collection").val(row[0].ma_litigation_collection);
        $("#f_bid_bond_collection").val(row[0].bid_bond_collection);
        $("#f_progress").val(row[0].progress);
        $("#f_remarks").val(row[0].remarks);

        let litigation_type=row[0].litigation_type;
        if(litigation_type==='诉讼'){
            $('#fillingEdit').modal('show');
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
                msg: '非诉讼无法使用该功能！'
            });
        }

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
//获取合同信息
function getContractInfo(){
    let contract_id=document.getElementById('contract_id').value;
    if(!contract_id){
        alert('合同号不能为空！');
        document.getElementById('contract_id').focus();
        document.getElementById('contract_id').select();
        return ;
    }
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/contract/GetContractInfoByContractId",
        data:{
            contract_id:contract_id
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                //模态框赋值update_client_attributes
                $('#company').selectpicker('val',data[i].install_company);//设置选中
                $('#company').selectpicker('refresh');
                $("#buyer_unit").val(data[i].buyer_unit);
                $("#big_client_code").val(data[i].big_client_code);
                $("#customer_abbreviation").val(data[i].customer_abbreviation);
                $("#eq_litigation").val(data[i].equipment_expire_arrears);
                $("#in_litigation").val(data[i].install_expire_arrears);
                $("#max_issuing_date").val(data[i].max_issuing_date);
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
//发函获取信息
function GetLetterEditID(id){
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#letter_edit_id").val(row[0].id);
        $("#l_litigation_type").val(row[0].litigation_type);
        $("#l_litigation_status").val(row[0].litigation_status);
        $("#l_contract_id").val(row[0].contract_id);
        $("#l_company").val(row[0].company);
        $("#l_buyer_unit").val(row[0].buyer_unit);
        $("#l_use_unit").val(row[0].use_unit);
        $("#l_eq_litigation").val(row[0].eq_litigation);
        $("#l_in_litigation").val(row[0].in_litigation);
        $("#l_ma_litigation").val(row[0].ma_litigation);
        $("#l_bid_bond").val(row[0].bid_bond);
        $("#l_applicant").val(row[0].applicant);
        $("#l_apply_date").val(row[0].apply_date);
        $("#l_letter_no").val(row[0].letter_no);
        $("#l_submission_process_date").val(row[0].submission_process_date);
        $("#l_process_end_date").val(row[0].process_end_date);
        $("#l_letter_date").val(row[0].letter_date);
        let l_delivery_methods= $('#l_delivery_methods');
        l_delivery_methods.selectpicker('val',(row[0].delivery_methods));
        l_delivery_methods.selectpicker('refresh');
        $("#l_courier_number").val(row[0].courier_number);
        $("#l_progress").val(row[0].progress);
        $("#l_remarks").val(row[0].remarks);

        let litigation_type=row[0].litigation_type;
        let lawyerButton=document.getElementById("lawyerButton");
        let letterButton=document.getElementById("letterButton");
        if(litigation_type==='催款函'){
            letterButton.style.display = "block";
            lawyerButton.style.display = "none";
            $('#letterEdit').modal('show');
        }else if(litigation_type==='律师函'){
            lawyerButton.style.display = "block";
            letterButton.style.display = "none";
            $('#letterEdit').modal('show');
        }else{
            letterButton.style.display = "none";
            lawyerButton.style.display = "none";
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
                msg: '诉讼无法使用该功能！'
            });
        }

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
//发催款函操作
function letterEdit(){
    let l_letter_date=document.getElementById('l_letter_date').value;
    let l_delivery_methods=document.getElementById('l_delivery_methods').value;
    let l_courier_number=document.getElementById('l_courier_number').value;
    if(!l_letter_date){
        alert('发函日期不能为空！');
        document.getElementById('l_letter_date').focus();
        document.getElementById('l_letter_date').select();
        return ;
    }
    if(!l_delivery_methods){
        alert('投递方式不能为空！');
        document.getElementById('l_delivery_methods').focus();
        document.getElementById('l_delivery_methods').select();
        return ;
    }
    if(l_delivery_methods==='邮寄' && !l_courier_number){
        alert('选择邮寄时快递单号不能为空！');
        document.getElementById('l_courier_number').focus();
        document.getElementById('l_courier_number').select();
        return ;
    }
    let formData = $("#letterEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/letterUpdate",
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
//发律师函操作
function lawyerLetterEdit(){
    let l_submission_process_date=document.getElementById('l_submission_process_date').value;
    let l_process_end_date=document.getElementById('l_process_end_date').value;
    let l_letter_date=document.getElementById('l_letter_date').value;
    let l_delivery_methods=document.getElementById('l_delivery_methods').value;
    let l_courier_number=document.getElementById('l_courier_number').value;
    if(!l_submission_process_date){
        alert('流程提交日期不能为空！');
        document.getElementById('l_submission_process_date').focus();
        document.getElementById('l_submission_process_date').select();
        return ;
    }
    if(!l_process_end_date){
        alert('流程结束日期不能为空！');
        document.getElementById('l_process_end_date').focus();
        document.getElementById('l_process_end_date').select();
        return ;
    }
    if(!l_letter_date){
        alert('发函日期不能为空！');
        document.getElementById('l_letter_date').focus();
        document.getElementById('l_letter_date').select();
        return ;
    }
    if(!l_delivery_methods){
        alert('投递方式不能为空！');
        document.getElementById('l_delivery_methods').focus();
        document.getElementById('l_delivery_methods').select();
        return ;
    }
    if(l_delivery_methods==='邮寄' && !l_courier_number){
        alert('选择邮寄时快递单号不能为空！');
        document.getElementById('l_courier_number').focus();
        document.getElementById('l_courier_number').select();
        return ;
    }
    let formData = $("#letterEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/lawyerLetterUpdate",
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
//提交流程操作
function submitFillingEdit(){
    let f_litigation_status=document.getElementById('f_litigation_status').value;
    let f_lawyer=document.getElementById('f_lawyer').value;
    if(f_litigation_status==='已立案'){
        alert('已立案项目不能操作！');
        document.getElementById('f_litigation_status').focus();
        document.getElementById('f_litigation_status').select();
        return ;
    }
    if(f_litigation_status==='已开庭'){
        alert('已开庭项目不能操作！');
        document.getElementById('f_litigation_status').focus();
        document.getElementById('f_litigation_status').select();
        return ;
    }
    if(f_litigation_status==='已结案'){
        alert('已结案项目不能操作！');
        document.getElementById('f_litigation_status').focus();
        document.getElementById('f_litigation_status').select();
        return ;
    }
    if(!f_lawyer){
        alert('律师不能为空！');
        document.getElementById('f_lawyer').focus();
        document.getElementById('f_lawyer').select();
        return ;
    }
    let formData = $("#fillingEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/submitFillingEdit",
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
//立案操作
function submitRegisterEdit(){
    let f_litigation_status=document.getElementById('f_litigation_status').value;
    if(f_litigation_status==='新建'){
        alert('未走流程项目不能直接立案！');
        document.getElementById('f_filling_date').focus();
        document.getElementById('f_filling_date').select();
        return ;
    }
    if(f_litigation_status==='已开庭'){
        alert('已开庭项目不能再立案！');
        document.getElementById('f_filling_date').focus();
        document.getElementById('f_filling_date').select();
        return ;
    }
    if(f_litigation_status==='已结案'){
        alert('已结案项目不能再立案！');
        document.getElementById('f_filling_date').focus();
        document.getElementById('f_filling_date').select();
        return ;
    }
    let formData = $("#fillingEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/submitRegisterEdit",
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
//开庭操作
function holdCourtEdit(){
    let f_litigation_status=document.getElementById('f_litigation_status').value;
    if(f_litigation_status==='新建'){
        alert('未走流程项目不能直接开庭！');
        document.getElementById('f_hearing_date').focus();
        document.getElementById('f_hearing_date').select();
        return ;
    }
    if(f_litigation_status==='流程中'){
        alert('未立案项目不能直接开庭！');
        document.getElementById('f_hearing_date').focus();
        document.getElementById('f_hearing_date').select();
        return ;
    }
    if(f_litigation_status==='已结案'){
        alert('已结案项目不能再开庭！');
        document.getElementById('f_hearing_date').focus();
        document.getElementById('f_hearing_date').select();
        return ;
    }
    let formData = $("#fillingEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/holdCourtEdit",
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
//结案操作
function closeCaseEdit(){
    let f_litigation_status=document.getElementById('f_litigation_status').value;
    if(f_litigation_status==='新建'){
        alert('未走流程项目不能直接结案！');
        document.getElementById('f_filling_date').focus();
        document.getElementById('f_filling_date').select();
        return ;
    }
    /*if(f_litigation_status==='已立案'){
        alert('已立案项目不能直接结案！');
        document.getElementById('f_filling_date').focus();
        document.getElementById('f_filling_date').select();
        return ;
    }*/
    let formData = $("#fillingEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/closeCaseEdit",
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
//仅修改
function onlyEdit(){
    let formData = $("#fillingEditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/litigation/onlyEdit",
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

function printPaymentNotification(){
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        document.getElementById('titleText').innerHTML="付款通知函";
        document.getElementById('subTitleText').innerHTML= row[0].letter_no;
        document.getElementById('paymentNotificationBuyerUnit').innerHTML="致：" + row[0].buyer_unit;
        document.getElementById('paymentNotificationFrom').innerHTML=" 自：日立电梯（中国）有限公司" + row[0].company;
        document.getElementById('paymentNotificationApplicantContact').innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp电话：" + row[0].applicant_contact;
        document.getElementById('paymentNotificationApplicant').innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp联系人：" + row[0].applicant;
        document.getElementById('contractId1').innerHTML=row[0].contract_id;
        document.getElementById('contractId2').innerHTML=row[0].contract_id;
        document.getElementById('maxIssuingDate').innerHTML=row[0].max_issuing_date;
        let eq_litigation=row[0].eq_litigation*1;
        let in_litigation=row[0].in_litigation*1;
        if(eq_litigation>0 && in_litigation===0){
            document.getElementById('arrearsAmount').innerHTML="货款"+row[0].eq_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].eq_litigation_capitalized_numbers+")支付给我司。"
        }else if(in_litigation>0 && eq_litigation===0){
            document.getElementById('arrearsAmount').innerHTML="安装款"+row[0].in_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].in_litigation_capitalized_numbers+")支付给我司。"
        }else if(in_litigation>0 && eq_litigation>0){
            document.getElementById('arrearsAmount').innerHTML="货款"+row[0].eq_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].eq_litigation_capitalized_numbers+")元，安装款"+row[0].in_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].in_litigation_capitalized_numbers+")支付给我司。"
        }else{

        }
        document.getElementById('collectionLettersText').innerHTML="";
        document.getElementById('paymentNotificationFrom1').innerHTML="日立电梯（中国）有限公司" + row[0].company;
        document.getElementById('todayDate').innerHTML=moment().format("YYYY-MM-DD");
        $('#printPaymentNotification').modal('show');
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

function printCollectionLetters(){
    let row=$("#litigationIndex").bootstrapTable('getSelections');
    if(row.length>0){
        document.getElementById('titleText').innerHTML="催款函";
        document.getElementById('subTitleText').innerHTML= row[0].letter_no;
        document.getElementById('paymentNotificationBuyerUnit').innerHTML="致：" + row[0].buyer_unit;
        document.getElementById('paymentNotificationFrom').innerHTML=" 自：日立电梯（中国）有限公司" + row[0].company;
        document.getElementById('paymentNotificationApplicantContact').innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp电话：" + row[0].applicant_contact;
        document.getElementById('paymentNotificationApplicant').innerHTML="&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp联系人：" + row[0].applicant;
        document.getElementById('contractId1').innerHTML=row[0].contract_id;
        document.getElementById('contractId2').innerHTML=row[0].contract_id;
        document.getElementById('maxIssuingDate').innerHTML=row[0].max_issuing_date;
        let eq_litigation=row[0].eq_litigation*1;
        let in_litigation=row[0].in_litigation*1;
        if(eq_litigation>0 && in_litigation===0){
            document.getElementById('arrearsAmount').innerHTML="货款"+row[0].eq_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].eq_litigation_capitalized_numbers+")支付给我司。"
        }else if(in_litigation>0 && eq_litigation===0){
            document.getElementById('arrearsAmount').innerHTML="安装款"+row[0].in_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].in_litigation_capitalized_numbers+")支付给我司。"
        }else if(in_litigation>0 && eq_litigation>0){
            document.getElementById('arrearsAmount').innerHTML="货款"+row[0].eq_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].eq_litigation_capitalized_numbers+")元，安装款"+row[0].in_litigation.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+"元(大写:"+row[0].in_litigation_capitalized_numbers+")支付给我司。"
        }else{

        }
        document.getElementById('collectionLettersText').innerHTML="否则，我司将径循法律途径谋求解决。";
        document.getElementById('paymentNotificationFrom1').innerHTML="日立电梯（中国）有限公司" + row[0].company;
        document.getElementById('todayDate').innerHTML=moment().format("YYYY-MM-DD");
        $('#printPaymentNotification').modal('show');

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
// 打印BODY区域
$('#printPaymentNotificationButton').click(function () {
    $("#printPaymentNotificationBody").printThis({
        importStyle: false,            // import parent page css
        });
})
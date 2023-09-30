$(function () {
    // 初始化选择器
    $("#search_customer_classification").selectpicker('refresh');
    $("#customerIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "../customer/getCustomerInfoByCondition", // 服务器数据的加载地址
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
            fileName: '客户明细导出' +　new Date().getTime(),//设置导出的表的默认名称
            tableName:'客户明细表',
            worksheetName: 'sheet1',  //表格工作区名称
        },
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_full_name: $('#search_full_name').val(),
                search_short_name: $('#search_short_name').val(),
                search_customer_classification: $('#search_customer_classification').val(),
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
            field: 'customer_classification',
            title: '客户分类',
            align: 'left',
            sortable: false,
        },{
            field: 'customer_segment',
            title: '客户细分',
            align: 'center',
            sortable: false
        },{
            field: 'key_account_code',
            title: '大客户编码',
            align: 'left',
            sortable: true,
        },{
            field: 'full_name',
            title: '客户全称',
            align: 'left',
            sortable: false
        }, {
            field: 'short_name',
            title: '客户简称',
            align: 'left',
            sortable: false,
        }, {
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false
        },{
            field: 'create_time',
            title: '创建时间',
            align: 'center',
            sortable: false
        },{
            field: 'update_time',
            title: '更新时间',
            align: 'center',
            sortable: false
        },],
    });
    $('#customerIndex').bootstrapTable('refresh');
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
    let search_full_name = $("#search_full_name").val();
    let search_short_name = $("#search_short_name").val();
    let search_customer_classification = $("#search_customer_classification").val();
    $.ajax({
        type: "post",
        url : "../customer/getCustomerInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        data: [
            {search_full_name : search_full_name},
            {search_short_name : search_short_name},
            {search_customer_classification : search_customer_classification},
        ],
        dataType:"json",
        success : function(json) {
            $("#customerIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
    //$('#acceptanceIndex').bootstrapTable('load', json);
})
//新建客户
function AddNew(){
    let customer_classification=document.getElementById('customer_classification').value;
    let full_name=document.getElementById('full_name').value;
    let short_name=document.getElementById('short_name').value;
    let key_account_code=document.getElementById('key_account_code').value;
    if(!customer_classification){
        alert('客户分类不能为空！');
        document.getElementById('customer_classification').focus();
        document.getElementById('customer_classification').select();
        return ;
    }
    if(!full_name){
        alert('客户全称不能为空！');
        document.getElementById('full_name').focus();
        document.getElementById('full_name').select();
        return ;
    }
    if(customer_classification==="KA客户" && !key_account_code){
        alert('选择KA客户时KA编码不能为空！');
        document.getElementById('key_account_code').focus();
        document.getElementById('key_account_code').select();
        return ;
    }
    if(customer_classification==="KA客户" && !short_name){
        alert('选择KA客户时简称不能为空！');
        document.getElementById('short_name').focus();
        document.getElementById('short_name').select();
        return ;
    }
    if(customer_classification==="本地大客户" && !short_name){
        alert('选择本地大客户时简称不能为空！');
        document.getElementById('short_name').focus();
        document.getElementById('short_name').select();
        return ;
    }

    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/customer/NewCustomer",
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
    let row=$("#customerIndex").bootstrapTable('getSelections');
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
            msg: '请选择客户！'
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
        url:"/../tp5/public/index.php/index/customer/Delete",
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
                $('#customerIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//获取更新ID
function GetUpdateID(id){
    let row=$("#customerIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#update_id").val(row[0].id);
        let update_customer_classification= $('#update_customer_classification');
        update_customer_classification.selectpicker('val',(row[0].customer_classification));
        update_customer_classification.selectpicker('refresh');
        $("#update_key_account_code").val(row[0].key_account_code);
        $("#update_full_name").val(row[0].full_name);
        $("#update_short_name").val(row[0].short_name);
        $("#update_company").val(row[0].company);
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
            msg: '请选择客户！'
        });
    }
}
//  更新项目
function UpdatePost(){
    let send_id=document.getElementById('update_id').value;
    let update_customer_classification=document.getElementById('update_customer_classification').value;
    let update_key_account_code=document.getElementById('update_key_account_code').value;
    let update_full_name=document.getElementById('update_full_name').value;
    if(!update_full_name){
        alert('客户全称不能为空！');
        document.getElementById('update_full_name').focus();
        document.getElementById('update_full_name').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/customer/Edit",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                $('#EditModal').modal('hide');
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
                    msg: '修改失败！'
                });
            }
            if(data===1){
                $('#EditModal').modal('hide');
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
                    msg: '修改成功！'
                });
                $('#customerIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
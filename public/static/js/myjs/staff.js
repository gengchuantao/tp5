//  模态框加载时渲染
$(function () {
    //角色赋值
    let  $selectParent=$("#role");
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/role/GetRole",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $selectParent.append($option);
                $('#role').selectpicker('refresh');
                $('#role').selectpicker('render');
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    //区域赋值
    let  $Company=$("#company");
    $Company.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/staff/GetCompany",
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                let $option=$("<option>"+data[i]+"</option>");
                $option.val(data[i]);
                $Company.append($option);
                $('#company').selectpicker('refresh');
                $('#company').selectpicker('render');
            }
        },
        error: function (xhr) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });

    $("#staffIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'post', // 服务器数据的请求方式 get or post
        url : "../Staff/GetStaffInfoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
        toolbar:"#toolbar",
        cache: false,            //禁用ajax缓存
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
        loadingTemplate:function()  {
            return '<div class="ph-item"><div class="ph-picture"></div></div>';
        },
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_staff_id: $('#search_staff_id').val(),
                search_staff_name: $('#search_staff_name').val(),
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
            visible: true                  //是否显示复选框
        }, {
            field: 'id',
            title: 'ID',
            align: 'center',
            sortable: true,
        },{
            field: 'staff_id',
            title: '员工编号',
            align: 'left',
            sortable: false
        },  {
            field: 'staff_name',
            title: '员工姓名',
            align: 'left',
            sortable: false
        },{
            field: 'sex',
            title: '姓别',
            align: 'left',
            sortable: false
        },{
            field: 'password',
            title: '密码',
            align: 'left',
            sortable: false
        },{
            field: 'role',
            title: '角色',
            align: 'left',
            sortable: false
        },{
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false
        },],
    });
    $('#staffIndex').bootstrapTable('refresh');
    //回车查询(button模式)(全页面-解决下拉框及日期选择无法回车查询的问题)
    document.onkeydown = function (e) {
        let theEvent = e || window.event;
        let code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code === 13) {
            $('#query').click();
        }
    };
});
/**查询*/
$('#query').click(function () {
    let search_staff_id = $("#search_staff_id").val();
    let search_staff_name = $("#search_staff_name").val();
    $.ajax({
        type: "post",
        url : "../Staff/GetStaffInfoByCondition", // 服务器数据的加载地址
        data: [
            {search_staff_id : search_staff_id},
            {search_staff_name : search_staff_name},
        ],
        dataType:"json",
        success : function(json) {
            $("#staffIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
})
function AddNew() {
    let staff_name=document.getElementById('staff_name').value;
    let staff_id=document.getElementById('staff_id').value;
    if(!staff_name){
        alert('姓名不能为空！');
        document.getElementById('staff_name').focus();
        document.getElementById('staff_name').select();
        return ;
    }
    if(!staff_id){
        alert('员工编号不能为空！');
        document.getElementById('staff_id').focus();
        document.getElementById('staff_id').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/staff/NewStaff",
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
function GetResetID(id) {
    let row=$("#staffIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#reset_id").val(row[0].id);
        /*显示模态框*/
        $('#ResetModal').modal('show');
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
            msg: '请选择要重置的人员！'
        });
    }
}
function ResetPassWord(){
    let formData = $("#ResetPassWord").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"../Staff/ResetPassWord",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                alert("重置失败！");
                return false;
            }
            if(date===1){
                alert("重置成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
//  获取删除ID
function GetDeleteID(id) {
    let row=$("#staffIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#delete_id").val(row[0].id);
        $("#delete_staff_id").val(row[0].staff_id);
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
            msg: '请选择要删除的人员！'
        });
    }
}
//  删除员工
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/staff/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("删除失败！");
                return false;
            }
            if(data===1){
                alert("删除成功！");
                window.location.reload();
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            //  当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("状态:"+xhr.readyState);
        }
    });
}
function GetUpdateID(id){
    let row=$("#staffIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#update_id").val(row[0].id);
        $("#update_staff_id").val(row[0].staff_id);
        $("#update_staff_name").val(row[0].staff_name);
        let update_sex=$('#update_sex');
        update_sex.selectpicker('');
        update_sex.selectpicker('val',row[0].sex);
        update_sex.selectpicker('refresh');
        $("#update_password").val(row[0].password);
        $("#update_role").val(row[0].role);
        $("#update_company").val(row[0].company);
        /*显示模态框*/
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
            msg: '请选择要修改的人员！'
        });
    }
}
//  修改员工信息
function UpdatePost(){
    let update_id=document.getElementById('update_id').value;
    let update_staff_id=document.getElementById('update_staff_id').value;
    let update_staff_name=document.getElementById('update_staff_name').value;
    let update_sex=document.getElementById('update_sex').value;
    let update_password=document.getElementById('update_password').value;
    let update_role=document.getElementById('update_role').value;
    let update_company=document.getElementById('update_company').value;
    if(!update_staff_id){
        alert('员工编号不能为空！');
        document.getElementById('update_staff_id').focus();
        document.getElementById('update_staff_id').select();
        return ;
    }
    if(!update_staff_name){
        alert('员工姓名不能为空！');
        document.getElementById('update_staff_name').focus();
        document.getElementById('update_staff_name').select();
        return ;
    }
    if(!update_sex){
        alert('姓别不能为空！');
        document.getElementById('update_sex').focus();
        document.getElementById('update_sex').select();
        return ;
    }
    if(!update_password){
        alert('密码不能为空！');
        document.getElementById('update_password').focus();
        document.getElementById('update_password').select();
        return ;
    }
    if(!update_role){
        alert('角色不能为空！');
        document.getElementById('update_role').focus();
        document.getElementById('update_role').select();
        return ;
    }
    if(!update_company){
        alert('区域不能为空！');
        document.getElementById('update_company').focus();
        document.getElementById('update_company').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/staff/Edit",
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
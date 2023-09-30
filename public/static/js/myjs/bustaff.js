//  模态框加载时渲染
$(function () {
    $("#if_bu_minister").selectpicker('refresh');
    $("#bustaffIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'post', // 服务器数据的请求方式 get or post
        url : "../bustaff/getBuStaffInfoByCondition", // 服务器数据的加载地址
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
                search_staff_name: $('#search_staff_name').val(),
                search_staff_bu: $('#search_staff_bu').val(),
                search_bustaff_company: $('#search_bustaff_company').val(),
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
            field: 'fyear',
            title: '财年',
            align: 'left',
            sortable: false
        },{
            field: 'staff_id',
            title: '员工编号',
            align: 'left',
            sortable: false
        },  {
            field: 'staff_name',
            title: '姓名',
            align: 'left',
            sortable: false
        },{
            field: 'staff_post',
            title: '岗位',
            align: 'left',
            sortable: false
        },{
            field: 'staff_bu',
            title: '事业部',
            align: 'left',
            sortable: false
        },{
            field: 'company',
            title: '区域',
            align: 'left',
            sortable: false
        },{
            field: 'if_bu_minister',
            title: '事业部长',
            align: 'left',
            sortable: false
        },{
            field: 'if_quit',
            title: '是否离职',
            align: 'left',
            sortable: false
        },],
    });
    $('#bustaffIndex').bootstrapTable('refresh');
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
    let search_staff_name = $("#search_staff_name").val();
    let search_staff_bu = $("#search_staff_bu").val();
    let search_bustaff_company = $("#search_bustaff_company").val();
    $.ajax({
        type: "post",
        url : "../bustaff/getBuStaffInfoByCondition", // 服务器数据的加载地址
        data: [
            {search_staff_name : search_staff_name},
            {search_staff_bu : search_staff_bu},
            {search_bustaff_company : search_bustaff_company},
        ],
        dataType:"json",
        success : function(json) {
            $("#bustaffIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
})
/*异步获取计提人员*/
let  $selectParent=$("#staff_name");
//$selectParent.empty();
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/responsible/getDrawingStaffByCompany",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $selectParent.append($option);
            $('#staff_name').selectpicker('refresh');
            $('#staff_name').selectpicker('render');
        }
    },
    error: function (xhr) {
        /*错误信息处理*/
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//获取已录入的岗位
function GetStaffId(){
    let staff_name=document.getElementById('staff_name').value;
    console.log(staff_name);
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/getDrawingStaffIdByName",
        data:{
            staff_name:staff_name
        },
        dataType:'json',
        async:true,
        success:function(data){
            for(let i=0;i<data.length;i++){
                $("#staff_id").val(data[i].emid);
                $("#staff_post").val(data[i].position);
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
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/bufinance/getQuarterPayBalanceByBuName",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            $("#bu_accrued_amount").val(data[i].quarter_pay_balance);
        }
    },
    error: function (xhr) {
        /*错误信息处理*/
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//新建成员
function AddNew(){
    let staff_name=document.getElementById('staff_name').value;
    let staff_bu=document.getElementById('staff_bu').value;
    let if_bu_minister=document.getElementById('if_bu_minister').value;
    if(!staff_name){
        alert('请选择姓名！');
        return ;
    }
    if(!staff_bu){
        alert('请填写事业部！');
        return ;
    }
    if(!if_bu_minister){
        alert('请选择是否为事业部长！');
        return ;
    }
    $("#addButton").attr("disabled",true);
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/bustaff/addNew",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("添加失败！");
                $("#addButton").attr("disabled",false);
            }
            if(data===1){
                alert("添加成功！");
                $("#addButton").attr("disabled",false);
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
function GetDeleteID(id){
    let row=$("#bustaffIndex").bootstrapTable('getSelections');
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
            msg: '请选择要删除的人员！'
        });
    }
}
//删除成员
function Delete(){
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/bustaff/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("删除失败！");
                return false;
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
                $('#bustaffIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            //  当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("状态:"+xhr.readyState);
        }
    });
}
//获取更新信息
function GetUpdateID(id){
    let row=$("#bustaffIndex").bootstrapTable('getSelections');
    if(row.length>0){
        $("#update_id").val(row[0].id);
        $("#bustaff_staff_id").val(row[0].staff_id);
        $("#bustaff_staff_name").val(row[0].staff_name);
        $("#bustaff_staff_post").val(row[0].staff_post);
        let update_sex=$('#update_sex');
        update_sex.selectpicker('');
        update_sex.selectpicker('val',row[0].sex);
        update_sex.selectpicker('refresh');
        $("#bustaff_staff_bu").val(row[0].staff_bu);
        $("#bustaff_company").val(row[0].company);
        $("#bustaff_if_bu_minister").val(row[0].if_bu_minister);
        $("#bustaff_if_quit").val(row[0].if_quit);
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
//更新
function UpdatePost(){
    let send_id=document.getElementById('update_id').value;
    let bustaff_staff_bu=document.getElementById('bustaff_staff_bu').value;
    let bustaff_company=document.getElementById('bustaff_company').value;
    let bustaff_if_bu_minister=document.getElementById('bustaff_if_bu_minister').value;
    let bustaff_if_quit=document.getElementById('bustaff_if_quit').value;
    if(!bustaff_staff_bu){
        alert('事业部不能为空！');
        document.getElementById('bustaff_staff_bu').focus();
        document.getElementById('bustaff_staff_bu').select();
        return ;
    }
    if(!bustaff_company){
        alert('区域不能为空！');
        document.getElementById('bustaff_company').focus();
        document.getElementById('bustaff_company').select();
        return ;
    }
    if(!bustaff_if_bu_minister){
        alert('是否为事业部长不能为空！');
        document.getElementById('bustaff_if_bu_minister').focus();
        document.getElementById('bustaff_if_bu_minister').select();
        return ;
    }
    if(!bustaff_if_quit){
        alert('是否离职不能为空！');
        document.getElementById('bustaff_if_quit').focus();
        document.getElementById('bustaff_if_quit').select();
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/bustaff/Update",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("修改失败！");
                window.location.reload();
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
                    msg: '更新成功！'
                });
                $('#bustaffIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}


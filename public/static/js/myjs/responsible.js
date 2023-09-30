$(function(){
    $("#responsibleIndex").bootstrapTable('destroy').bootstrapTable({
        method : 'get', // 服务器数据的请求方式 get or post
        url : "/../tp5/public/index.php/index/responsible/getResponsibleIntoByCondition", // 服务器数据的加载地址
        //height:$(window).height() - 200,
        //iconSize : 'sm',
        //theadClasses: "thead-dark",
        dataType : "json", // 服务器返回的数据类型
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
        showFooter: false,
        fixedColumns: true,
        fixedNumber: 6, //固定列数
        //fixedNumberWidth: 80,
        locale:"zh-CN",//支持中文
        queryParamsType: "",//查询参数组织方式
        queryParams: function (params) {
            return {
                //每页多少条数据
                pageSize: params.limit,
                //请求第几页
                pageIndex:params.pageNumber,
                search_name: $('#search_name').val(),
                search_company: $('#search_company').val(),
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
            field: 'emid',
            title: '工号',
            align: 'left',
            sortable: false,

        },{
            field: 'name',
            title: '姓名',
            align: 'center',
            sortable: false
        },{
            field: 'company',
            title: '分公司',
            align: 'center',
            sortable: true,
        },{
            field: 'office',
            title: '办事处',
            align: 'right',
            sortable: false
        }, {
            field: 'position',
            title: '职位',
            align: 'center',
        }, {
            field: 'status',
            title: '状态',
            align: 'left',
            sortable: false
        }, ],
    });
    $('#responsibleIndex').bootstrapTable('refresh');
});
$('#query').click(function () {
    let search_name = $("#search_name").val();
    let search_company = $("#search_company").val();
    $.ajax({
        type: "post",
        url: "/../tp5/public/index.php/index/responsible/getResponsibleIntoByCondition",
        data: [
            {search_name : search_name},
            {search_company : search_company},
        ],
        dataType:"json",
        success : function(json) {
            $("#responsibleIndex").bootstrapTable('refreshOptions', json);//主要是要这种写法
        }
    });
})
function AddNew(){
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/responsible/newName",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(data){
            if(data===0){
                alert("失败！");
                $("#NewModal").modal('hide');
                $('#responsibleIndex').bootstrapTable('refresh');
            }
            if(data===1){
                alert("成功！");
                $("#NewModal").modal('hide');
                $('#responsibleIndex').bootstrapTable('refresh');
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
function GetDeleteID() {
    let row=$("#responsibleIndex").bootstrapTable('getSelections')
    $("#delete_id").val(row[0].id);
}
function Delete(){
    let delete_id=document.getElementById('delete_id').value;
    if(delete_id.length===0){
        alert('未获取到数据！');
        $("#DeleteModal").modal('hide');
        return ;
    }
    let formData = $("#DeleteForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/responsible/Delete",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                alert("删除失败！");
                $("#DeleteModal").modal('hide');
            }
            if(date===1){
                alert("删除成功！");
                $("#DeleteModal").modal('hide');
                $('#responsibleIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
function GetEditID(id){
    let row=$("#responsibleIndex").bootstrapTable('getSelections');
    $("#update_id").val(row[0].id);
    $("#update_emid").val(row[0].emid);
    $("#update_name").val(row[0].name);
    $("#update_company").val(row[0].company);
    $("#update_office").val(row[0].office);
    $("#update_position").val(row[0].position);
    $("#update_status").val(row[0].status);
}
function updatePost(){
    let update_id=document.getElementById('update_id').value;
    if(!update_id){
        alert('未获取到数据！');
        $("#EditModal").modal('hide');
        return ;
    }
    let formData = $("#EditForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/responsible/EditForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date===0){
                $("#EditModal").modal('hide');
                alert("失败！");
                $('#responsibleIndex').bootstrapTable('refresh');
            }
            if(date===1){
                $("#EditModal").modal('hide');
                alert("成功！");
                $('#responsibleIndex').bootstrapTable('refresh');
            }
        },
        error: function (xhr) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
    $('#acceptanceIndex').bootstrapTable('refresh');
}
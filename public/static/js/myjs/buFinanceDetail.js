$('#e_add_company').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#add_company").val($(this).val());
});
$('#e_add_liable_person').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#add_liable_person").val($(this).val());
});
$('#e_add_bu_name').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#add_bu_name").val($(this).val());
});
$('#e_add_expenditure_type').on('changed.bs.select', function(e, clickedIndex, isSelected, previousValue) {
    $("#add_expenditure_type").val($(this).val());
});
$("#add_year").val('2022');
$("#add_remarks").val('22年1~3月');
//批量修改获取跟进人
function GetAll(){
    let install_company=document.getElementById('add_company').value;
    let  $selectParent=$("#e_add_liable_person");
    $selectParent.empty();
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/responsible/GetAll",
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
//获取事业部
function GetBuName(){
    let install_company=document.getElementById('e_add_company').value;
    let  $selectParent=$("#e_add_bu_name");
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
//新增
function addNew(){
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/bufdetail/addNew",
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
            /**
             * 错误信息处理
             * */
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);
            alert("错误信息:"+xhr.statusText );
        }
    });
}
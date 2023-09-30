function AddPost(){
    let contract_id=document.getElementById('contract_id').value;
    let content=document.getElementById('content').value;
    let borrower=document.getElementById('borrower').value;

    if(add_supplier===''){
        alert('安装网点不能为空！');
        document.getElementById('add_supplier').focus();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"post",
        async:true,
        url:"/../tp5/public/index.php/index/installer/Add",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("人员已存在，请检查！");
            }
            if(date==1){
                alert("添加成功！");
                window.location.reload();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            /*错误信息处理*/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
        }
    });
}
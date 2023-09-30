/*
$("#province").change(function(){
    console.log("选择");
    $('#province .selectpicker').selectpicker('val', '山东省');
    let provinces=[];
    $.ajax({
        type:"post",
        url:"/../tp5/public/index.php/index/china/GetProvince",
        dataType:'json',
        async:true,
        success:function(data){
            let optionStr = "";
            for(let i=0;i<data.length;i++){
                optionStr += "<option value=\"" + data[i] + "\">" + "</option>";
                //模态框赋值
                $('#province').append(optionStr);
                $('#province').selectpicker('refresh');
                $('#province').selectpicker('render');
            }
        },
        error: function (xhr) {
            /!*错误信息处理*!/
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
        }
    });
})*/

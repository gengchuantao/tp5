//财年赋值
let $fyearSelectParent=$("#install_income_fyear");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/install_income/GetInstallIncomeFyear",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $fyearSelectParent.append($option);
            $('#install_income_fyear').selectpicker('refresh');
            $('#install_income_fyear').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//安装入金明细导出
function InstallIncomeExport(){
    let install_income_fyear=document.getElementById('install_income_fyear').value;
    if(!install_income_fyear){
        alert('财年不能为空！');
    }else{
        $('#InstallIncomeProductExport').modal('hide');
        let formData = $("#InstallIncomeProductExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/install_income/InstallIncomeExport?"+formData;
    }
}
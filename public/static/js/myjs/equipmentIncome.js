//财年赋值
let $fyearSelectParent=$("#equipment_income_fyear");
$.ajax({
    type:"post",
    url:"/../tp5/public/index.php/index/equipment_income/GetEquipmentIncomeFyear",
    dataType:'json',
    async:true,
    success:function(data){
        for(let i=0;i<data.length;i++){
            let $option=$("<option>"+data[i]+"</option>");
            $option.val(data[i]);
            $fyearSelectParent.append($option);
            $('#equipment_income_fyear').selectpicker('refresh');
            $('#equipment_income_fyear').selectpicker('render');
        }
    },
    error: function (xhr) {
        alert("状态码："+xhr.status);
        alert("状态:"+xhr.readyState);
        alert("错误信息:"+xhr.statusText );
    }
});
//安装入金明细导出
function EquipmentIncomeExport(){
    let equipment_income_fyear=document.getElementById('equipment_income_fyear').value;
    if(!equipment_income_fyear){
        alert('财年不能为空！');
    }else{
        $('#EquipmentIncomeProductExport').modal('hide');
        let formData = $("#EquipmentIncomeProductExportForm").serialize();
        console.log(formData);
        window.location.href = "/../tp5/public/index.php/index/equipment_income/EquipmentIncomeExport?"+formData;
    }
}
function IntoForceReport() {
    $('#IntoForceModal').modal('hide');
    let formData = $("#IntoForceForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/product/IntoForce_Excel?"+formData;
}
function M0IntoForceReport() {
    $('#IntoForceModal').modal('hide');
    let formData = $("#IntoForceForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/product/M0_IntoForce_Excel?"+formData;
}
function SignReport() {
    $('#SignModal').modal('hide');
    let formData = $("#SignForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/product/Sign_Excel?"+formData;
}
function DeliveryReport() {
    $('#DeliveryModal').modal('hide');
    let formData = $("#DeliveryForm").serialize();
    console.log(formData);
    window.location.href = "/../tp5/public/index.php/index/product/Delivery_Excel?"+formData;
}
function AllContract() {
    window.location.href = "/../tp5/public/index.php/index/contract/AllContract"
}
function TaxToNoTax() {
    let tax=prompt('请输入含税下浮(输入值为负的小数)：');
    let NoTax=117*tax/113+(4/113);
    alert('不含税下浮为：'+ NoTax);
}
function NoFeeToFee(){
    let a1=prompt('请输入不扣服务费下浮(输入值为负的小数,如下浮-66%时输入-0.66):');
    let a2=prompt('请输入服务费点数(输入值为小数，如2个点的服务费时输入0.02):');
    let a3=a1-a1*a2-a2;
    alert('扣除服务费后的下浮为：'+ a3);
}
function AllQuote(){
    window.location.href = "/../tp5/public/index.php/index/quote/AllQuote"
}
function PreSign(){
    window.location.href = "/../tp5/public/index.php/index/quote/PreSign"
}
function PreIntoForceExport(){
    window.location.href = "/../tp5/public/index.php/index/product/PreIntoForceExport"
}
function BondArrears(){
    window.location.href = "/../tp5/public/index.php/index/quote/BondArrears"
}
function serviceFeeAgreementUnSign() {
    window.location.href = "/../tp5/public/index.php/index/contract/serviceFeeAgreementUnSign"
}
function intoForceUnDelivery(){
    window.location.href = "/../tp5/public/index.php/index/product/intoForceUnDelivery"
}

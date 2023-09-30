<!--下拉菜单-->
$(function () {
    $('[data-submenu]').submenupicker();
});
$(document).ready(function(){
    $('.selectpicker').selectpicker();
});
function phpMyAdmin(){
    window.open("http://101.201.57.190/phpMyAdmin/");
}
function phpInfo(){
    window.open("http://101.201.57.190/phpinfo/");
}
/*权限管理*/
let role_name=[];
let bi_authority = [];
let htglb_authority = [];
let arrears_authority = [];
let powerBI = document.getElementById("powerBI");
let contractDepartment = document.getElementById("contractDepartment");
let arrearsManagement = document.getElementById("arrearsManagement");
let systemSettings = document.getElementById("systemSettings");
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"../Role/GetRoleInfo",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            role_name=data[i].role_name;
            bi_authority=data[i].bi;
            htglb_authority=data[i].htglb;
            arrears_authority=data[i].arrears;

        }
        if(role_name==='系统管理员'){
            systemSettings.style.display = "block"; // 显示该DIV元素
        }else{
            systemSettings.style.display = "none"; // 隐藏该DIV元素
        }
        if(bi_authority===1){
            powerBI.style.display = "block"; // 显示该DIV元素
        }else{
            powerBI.style.display = "none"; // 隐藏该DIV元素
        }
        if(htglb_authority===1){
            contractDepartment.style.display = "block"; // 显示该DIV元素
        }else{
            contractDepartment.style.display = "none"; // 隐藏该DIV元素
        }
        if(arrears_authority===1){
            arrearsManagement.style.display = "block"; // 显示该DIV元素
        }else{
            arrearsManagement.style.display = "none"; // 隐藏该DIV元素
        }
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("获取权限失败！");
    }
});
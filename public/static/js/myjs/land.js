//多选框赋值到input
$('#land_type_select').on('changed.bs.select', function(e) {
    $("#land_type").val($(this).val());
});
let nowdays = new Date();
//查询日期赋值
/*
let day2 = new Date();
day2.setTime(day2.getTime());
let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
//查询日期赋值
$("#deal_date_from").val('2000-1-1');
$("#deal_date_to").val(s2);*/

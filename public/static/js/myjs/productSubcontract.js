let day2 = new Date();
day2.setTime(day2.getTime());
let s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
//查询日期赋值
$("#complete_date_from").val('0000-00-00');
$("#complete_date_to").val(s2);
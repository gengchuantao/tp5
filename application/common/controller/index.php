public function outdata($name,$head = [],$data = [],$keys = [])
{
$count = count($head);  //计算表头数量
$xlsTitle = iconv('utf-8', 'gb2312', $name);//文件名称
$fileName = $xlsTitle.date('_YmdHis');
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
set_time_limit(0);

$key = ord("A");//A代表ASCII 65
$key2 = ord("@");//@代表ASCII 64
$key4 = ord("@");//@代表ASCII 64
foreach($head as $v){
if($key>ord("Z")){
$key2 += 1;
if($key>ord("t")){
if($key>78){

}else{
$key4 += 1;
$key3 = ord("B");
$colum = chr($key3).chr($key4);//超过26个字母时才会启用
}

}else{
$key3 = ord("A");
$colum = chr($key3).chr($key2);//超过26个字母时才会启用
}

}else{
if($key2>=ord("A")){
$colum = chr($key2).chr($key);
}else{
$colum = chr($key);
}
}
$sheet->setCellValue($colum. '1', $head[$key - 65]);
$key += 1;
}
/*--------------开始从数据库提取信息插入Excel表中------------------*/
$column = 2;
foreach($data as $key => $rows){ //行写入
$span = ord("A");
$span2 = ord("@");
$span4 = ord("@");
foreach($head as $k=>$v){
if($span>ord("Z")){
$span2 += 1;
if($span>ord("t")){
$span4 += 1;
$span3 = ord("B");
$j = chr($span3).chr($span4);//超过26个字母时才会启用
}else{
$span3 = ord("A");
$j = chr($span3).chr($span2);//超过26个字母时才会启用
}

}else{
if($span2>=ord("A")){
$j = chr($span2).chr($span);
}else{
$j = chr($span);
}
}
$sheet->setCellValue($j. $column, $rows[$keys[$span - 65]]);
$span++;
}
$column++;
}
ob_end_clean();
ob_start();
// 设置输出头部信息
header('Content-Encoding: UTF-8');
header("Content-Type: text/csv; charset=UTF-8");
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="' . $fileName . '.csv"');
header('Content-Description: File Transfer');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Cache-Control: max-age=0');
echo chr(0xEF).chr(0xBB).chr(0xBF);
$writer = new Csv($spreadsheet);
$writer->save('php://output');
//$fp = fopen('php://output', 'a');//打开output流
mb_convert_encoding($column,'gb2312', 'UTF-8' );
ob_flush();
flush();
//fclose($fp);
unset($spreadsheet);
exit();
}
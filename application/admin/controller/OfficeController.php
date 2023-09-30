<?php
namespace app\admin\controller;     //命名空间，也说明了文件所在的文件夹
use think\Db;
use think\Controller;
use think\Session;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
class OfficeController{
    public function index(){
        return 'this is admin office index!';
    }
    /**
     * 导出excel表
     * $data：要导出excel表的数据，接受一个二维数组
     * $name：excel表的表名
     * $head：excel表的表头，接受一个一维数组
     * $key：$data中对应表头的键的数组，接受一个一维数组
     * 备注：此函数缺点是，表头（对应列数）不能超过52；
     *循环不够灵活，一个单元格中不方便存放两个数据库字段的值
     */
    public function outdata($name,$head = [],$data = [],$keys = [])
    {

        $count = count($head);  //计算表头数量
        $xlsTitle = iconv('utf-8', 'gb2312', $name);//文件名称
        $fileName = $name.date('_YmdHis');
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
                    $key4 += 1;
                    $key3 = ord("B");
                    $colum = chr($key3).chr($key4);//超过26个字母时才会启用
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
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $fileName . '.xlsx"');
        header('Cache-Control: max-age=0');
        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        //删除清空：
        $spreadsheet->disconnectWorksheets();
        unset($spreadsheet);
        exit;
    }
}
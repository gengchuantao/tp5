<?php
namespace app\common\controller;
use app\common\libs\XLSXWriter;
class ExcelController
{
    public function exports($name,$head = [],$data = [],$keys = [])
    {
        $writer = new XLSXWriter();
        if (empty($name)|| empty($head)|| empty($data)|| empty($keys))return false;
        //定义文件名
        $filename = $name.date('_YmdHis');
        //定义工作表名称
        $sheet_name = $name;
        /*设置字段，指定样式*/
        $styles1 = array(
            'font'=>'宋体',
            'font-size'=>9,
            'font-style'=>'bold',
            'fill'=>'#eee',
            'halign'=>'center',
            'valign'=>'center',
            'border'=>'left,right,top,bottom'
        );
        //写入第一行字段
        $writer->writeSheetHeader($sheet_name,$head,$styles1);
        // 最后是数据，foreach写入
        foreach ($data as $value) {
            foreach ($value as $item) {
                $temp[] = $item;
            }
            $rows[] = $temp;
            unset($temp);
        }
        //定义数据格式
        $styles2 = array(
            'height'=>13,
            'font'=>'宋体',
            'font-size'=>9,
            'fill'=>'#ffff',
            'border'=>'left,right,top,bottom'
        );
        //逐条写入数据
        foreach($rows as $row){
            $writer->writeSheetRow($sheet_name,$row,$styles2);
        }
        //设置 header，用于浏览器下载
        $ua = isset ( $_SERVER ["HTTP_USER_AGENT"] ) ? $_SERVER ["HTTP_USER_AGENT"] : '';
        if (preg_match ( "/Trident/", $ua )) {
            //判断是否为IE11浏览器
            $filename=urlencode($filename);
            //定义编码，解决IE下输出文件名乱码
            header('Content-Encoding: GB2312');
            //以下为设置下载类型
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
            header('Content-Transfer-Encoding: binary');
        } else {
            //定义编码
            header('Content-Encoding: UTF-8');
            //以下为设置下载类型
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
            header('Content-Transfer-Encoding: binary');
        }
        header('Content-Description: File Transfer');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Cache-Control: max-age=0');
        //输出文档
        $writer->writeToStdOut();
        exit(0);
    }

}
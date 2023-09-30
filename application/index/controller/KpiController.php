<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Kpi;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class KpiController extends IndexController{
public function index(){
    $fyear=Session::get('fyear');
    // 按条件查询数据并调用分页
    $kpis = Db::query("
 SELECT id,
CASE WHEN id='合计' THEN '-' 
ELSE first_index_name
END  AS first_index_name,
CASE WHEN id='合计' THEN '-' 
ELSE second_index_name
END  AS second_index_name,
CASE WHEN id='合计' THEN '-' 
ELSE department
END  AS department,
index_score,max_score,expected_score,actual_score,actual_score-index_score AS disparity
FROM (SELECT  IFNULL(id,'合计') AS id,first_index_name,second_index_name,department,index_score,max_score,expected_score,actual_score FROM (SELECT id,first_index_name,second_index_name,department,SUM(index_score) AS index_score,SUM(max_score) AS max_score,SUM(expected_score) AS expected_score,SUM(actual_score) AS actual_score
FROM helc_kpi
WHERE fyear='$fyear'
GROUP BY id WITH ROLLUP)  AS A) AS B
            ");

    // 向V层传数据
    $this->assign('kpis', $kpis);
    $this->display();
    return $this->fetch();
}

}
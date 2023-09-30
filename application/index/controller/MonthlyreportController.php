<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Monthlyreport;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class MonthlyreportController extends IndexController{
    public function index(){
        // 从分公司指标表里查询数据
        $fyear = Session::get('fyear');
        $data = Db::name('monthlyreport')
            ->where('fyear','=',$fyear)
            ->select();
        $this->assign('result', $data);
        $this->display();
        return $this->fetch();
    }

}
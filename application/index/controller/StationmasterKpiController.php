<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\StationmasterKpi;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class StationmasterKpiController extends IndexController{
    public function index(){
        // 获取查询信息
        $fyear = input('fyear');
        Session::set('stationmaster_fyear',$fyear);
        $station_name = input('station_name');
        Session::set('stationmaster_station_name',$station_name);
        $company = input('company');
        Session::set('stationmaster_company',$company);
        $stationmaster_name = input('stationmaster_name');
        Session::set('stationmaster_stationmaster_name',$stationmaster_name);
        $pageSize = 10; // 每页显示10条数据
        // 实例化Stationmaster
        $Stationmaster = new Stationmaster;
        $stationmasters = array();
        // 按条件查询数据并调用分页
        try {
            $stationmasters = $Stationmaster
                ->where('fyear', 'like', '%' . $fyear . '%')
                ->where('station_name', 'like', '%' . $station_name . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('stationmaster_name', 'like', '%' . $stationmaster_name . '%')
                ->paginate($pageSize, false, ['query' => request()->param()]);
        } catch (DbException $e) {
        }
        // 向V层传数据
        $this->assign('stationmasters', $stationmasters);
        // 将数据返回给用户
        return $this->fetch();
    }
    //  BI保养站KPI完成情况Api接口
    public function biStationmasterKpi(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $jsonData= Db::name('stationmaster_kpi')
            ->where('active_status', '=', '1')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')")
            ->select();
        echo json_encode($jsonData);
    }
}
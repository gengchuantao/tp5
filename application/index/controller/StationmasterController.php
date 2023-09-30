<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Stationmaster;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class StationmasterController extends IndexController{
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
    //  通过ID获取保养站信息
    public function getStationmasterInfo(){
        $id = $this->request->param("id");
        $data = array();
        try {
            $data = Db::name('stationmaster')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  新增保养站
    public function newStationmaster(Request $request){
        $requestData=$request->param();
        $fyear=Session::get('fyear');
        $data[] = [
            'fyear' => $fyear,
            'station_name' => $requestData['station_name'],
            'company' => $requestData['company'],
            'stationmaster_name' => $requestData['stationmaster_name'],
            'stationmaster_id' => $requestData['stationmaster_id']
        ];
        $result=Db::name('stationmaster')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //  删除保养站
    function Delete ($delete_id){
        $result = array();
        try {
            $result = Db::name('stationmaster')->where('id', '=', $delete_id)->delete();
        } catch (PDOException $e) {
        } catch (Exception $e) {
        }
        if($result){
            return json(1);
        }else {
            return json(0);
        }
    }
    //  修改保养站信息
    public function Edit(Request $request){
        $requestData=$request->param();
        $data=array(
            'station_name' => $requestData['update_station_name'],
            'company' => $requestData['update_company'],
            'stationmaster_name' => $requestData['update_stationmaster_name'],
            'stationmaster_id' => $requestData['update_stationmaster_id'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('stationmaster')
            ->where(['id' => $requestData['update_id']])
            ->count();
        if($check>0){
            $result=Db::name('stationmaster')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //  导出Excel
    function export(){
        $excel = new expExcel();
        $fyear = Session::get('stationmaster_fyear');
        $station_name = Session::get('stationmaster_station_name');
        $stationmaster_name = Session::get('stationmaster_stationmaster_name');
        $company = Session::get('stationmaster_company');
        $xlsName  = "保养站信息表";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '财年'=>'integer',
            '站名'=>'string',
            '区域'=>'string',
            '站长'=>'string',
            '站长工号'=>'integer'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'fyear',
            'station_name',
            'company',
            'stationmaster_name',
            'stationmaster_id'
        ];
        $data = array();
        try {
            $data = Db::name('stationmaster')
                ->field($keys)
                ->where('fyear', 'like', '%' . $fyear . '%')
                ->where('station_name', 'like', '%' . $station_name . '%')
                ->where('stationmaster_name', 'like', '%' . $stationmaster_name . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $excel->exports($xlsName, $head, $data, $keys);
    }
    //13、设备欠款客户类型
    function jsonData(){
        $data=Db::name('stationmaster')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
}
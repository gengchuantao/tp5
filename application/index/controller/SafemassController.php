<?php
namespace app\index\controller;
use app\common\model\Safemass;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
class SafemassController extends IndexController
{
    public function index(){
        $fyear = Session::get('fyear');
        // 获取查询信息
        $pageSize = 10; // 每页显示20条数据
        // 实例化Safemass
        $Safemass = new Safemass;
        // 按条件查询数据并调用分页
        $safemasss = $Safemass
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->order('season','desc')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('safemasss',$safemasss);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //  通过ID获取保养站信息
    public function getSafemassInfoById(){
        $id = $this->request->param("id");
        $data = array();
        try {
            $data = Db::name('safemass')
                ->where('id', '=', $id)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //更新保养台量数据
    public function UpdateSafemass(Request $request){
        $requestData=$request->param();
        $data=array(
            'safe_complete' => $requestData['update_safe_complete'],
            'quality_complete' => $requestData['update_quality_complete'],
            'safe_reduction' => $requestData['update_safe_reduction'],
            'quality_extra' => $requestData['update_quality_extra'],
            'quality_reduction' => $requestData['update_quality_reduction'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('safemass')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('safemass')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //更新保养业务数据
    public function updateSafemassBusiness(Request $request){
        $requestData=$request->param();
        $data=array(
            'paid_output_value_index' => $requestData['update_paid_output_value_index'],
            'paid_output_value_complete' => $requestData['update_paid_output_value_complete'],
            'safemass_sale_index' => $requestData['update_safemass_sale_index'],
            'safemass_sale' => $requestData['update_safemass_sale'],
            'safemass_income_index' => $requestData['update_safemass_income_index'],
            'safemass_income' => $requestData['update_safemass_income'],
            'safemass_cost_rate_index' => $requestData['update_safemass_cost_rate_index'],
            'safemass_cost_rate_complete' => $requestData['update_safemass_cost_rate_complete'],
            'safemass_history_arrears_index' => $requestData['update_safemass_history_arrears_index'],
            'safemass_history_arrears_complete' => $requestData['update_safemass_history_arrears_complete'],
            'after_service_income_index' => $requestData['update_after_service_income_index'],
            'after_service_income_complete' => $requestData['update_after_service_income_complete'],
            'maintenance_history_recovery_index' => $requestData['update_maintenance_history_recovery_index'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('safemass')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('safemass')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //更新维改业务数据
    public function updateSafemassRepair(Request $request){
        $requestData=$request->param();
        $data=array(
            'repair_sale_index' => $requestData['update_repair_sale_index'],
            'repair_sale' => $requestData['update_repair_sale'],
            'repair_income_index' => $requestData['update_repair_income_index'],
            'repair_income' => $requestData['update_repair_income'],
            'repair_history_arrears_index' => $requestData['update_repair_history_arrears_index'],
            'repair_history_arrears_complete' => $requestData['update_repair_history_arrears_complete'],
            'm0_index' => $requestData['update_m0_index'],
            'm0_complete' => $requestData['update_m0_complete'],
            'maintenance_reform_income_index' => $requestData['update_maintenance_reform_income_index'],
            'maintenance_reform_income_complete' => $requestData['update_maintenance_reform_income_complete'],
            'repair_history_arrears_season_index' => $requestData['update_repair_history_arrears_season_index'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('safemass')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('safemass')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function edit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Safemass = Safemass::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Safemass', $Safemass);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function update(){
        // 接收数据
        $safemass = Request::instance()->post();

        // 将数据存入Safemass表
        $Safemass = new Safemass();
        $state = $Safemass->isUpdate(true)->save($safemass);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    public function safemass()
    {
        $fyear = Session::get('fyear');
        $company = input('company');

        $pageSize = 20; // 每页显示20条数据

        // 实例化Safemass
        $Safemass = new Safemass;

        // 按条件查询数据并调用分页
        $safemasss = $Safemass
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('safemasss', $safemasss);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function safemassedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Safemass = Safemass::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Safemass', $Safemass);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function safemassupdate(){
        // 接收数据
        $safemass = Request::instance()->post();

        // 将数据存入Safemass表
        $Safemass = new Safemass();
        $state = $Safemass->isUpdate(true)->save($safemass);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('safemass'));
        } else {
            return '更新失败';
        }
    }
    public function repair()
    {
        $fyear = Session::get('fyear');
        // 获取查询信息
        $company = input('company');

        $pageSize = 20; // 每页显示20条数据

        // 实例化Safemass
        $Safemass = new Safemass;

        // 按条件查询数据并调用分页
        $safemasss = $Safemass
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('safemasss', $safemasss);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function repairedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Safemass = Safemass::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Safemass', $Safemass);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function repairupdate(){
        // 接收数据
        $safemass = Request::instance()->post();

        // 将数据存入Safemass表
        $Safemass = new Safemass();
        $state = $Safemass->isUpdate(true)->save($safemass);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('repair'));
        } else {
            return '更新失败';
        }
    }
    public function profit()
    {
        $fyear = Session::get('fyear');
        // 获取查询信息
        $company = input('company');

        $pageSize = 20; // 每页显示20条数据

        // 实例化Safemass
        $Safemass = new Safemass;

        // 按条件查询数据并调用分页
        $safemasss = $Safemass
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('safemasss', $safemasss);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function profitedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Safemass = Safemass::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Safemass', $Safemass);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function profitupdate(){
        // 接收数据
        $safemass = Request::instance()->post();

        // 将数据存入Safemass表
        $Safemass = new Safemass();
        $state = $Safemass->isUpdate(true)->save($safemass);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('profit'));
        } else {
            return '更新失败';
        }
    }
    public function security(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Safemass = Safemass::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Safemass', $Safemass);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    //报表导出模块
    public function report(){
        return $this->fetch();
    }
}
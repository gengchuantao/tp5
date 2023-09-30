<?php
namespace app\index\controller;
use app\common\model\Maintain;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
class MaintainController extends IndexController
{
    public function index(){
        $fyear = Session::get('fyear');
        // 获取查询信息
        $company = input('company');
        $pageSize = 20; // 每页显示20条数据
        // 实例化Maintain
        $Maintain = new Maintain;
        // 按条件查询数据并调用分页
        $maintains = $Maintain
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('maintains',$maintains);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //保养数据获取

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getMaintainInfo(){
        $data = Db::name('maintain')
            ->where('fyear', 'like', '%' . Session::get('fyear') . '%')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    function getMaintainSumInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('maintain')
            ->where('fyear','=',$fyear)
            ->where('company','=','合计')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getMaintainInfoByCompany(){
        $companys=Session::get('company');
        $month_index_company=Session::get('month_index_company');
        $fyear=Session::get('fyear');
        if($companys=='山东分公司'){
            $company=$month_index_company;
        }else{
            $company=$companys;
        }
        $fyear=Session::get('fyear');
        $data = Db::name('maintain')
            ->where('company', '=', $company)
            ->where('fyear', '=', $fyear)
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  通过ID获取保养站信息
    public function getMaintainInfoById(){
        $id = $this->request->param("id");
        $data = array();
        try {
            $data = Db::name('maintain')
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
    public function updateMaintainNum(Request $request){
        $requestData=$request->param();
        $data=array(
            'guarantee' => $requestData['update_guarantee'],
            'paid_index' => $requestData['update_paid_index'],
            'paid' => $requestData['update_paid'],
            'maintain_object' => $requestData['update_maintain_object'],
            'transfer_rate_index' => $requestData['update_transfer_rate_index'],
            'transfer_rate_complete' => $requestData['update_transfer_rate_complete'],
            'season_paid_index' => $requestData['update_season_paid_index'],
            'season_paid' => $requestData['update_season_paid'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('maintain')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('maintain')->update($data);
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
    public function updateMaintainBusiness(Request $request){
        $requestData=$request->param();
        $data=array(
            'paid_output_value_index' => $requestData['update_paid_output_value_index'],
            'paid_output_value_complete' => $requestData['update_paid_output_value_complete'],
            'maintain_sale_index' => $requestData['update_maintain_sale_index'],
            'maintain_sale' => $requestData['update_maintain_sale'],
            'maintain_income_index' => $requestData['update_maintain_income_index'],
            'maintain_income' => $requestData['update_maintain_income'],
            'maintain_cost_rate_index' => $requestData['update_maintain_cost_rate_index'],
            'maintain_cost_rate_complete' => $requestData['update_maintain_cost_rate_complete'],
            'maintain_history_arrears_index' => $requestData['update_maintain_history_arrears_index'],
            'maintain_history_arrears_complete' => $requestData['update_maintain_history_arrears_complete'],
            'after_service_income_index' => $requestData['update_after_service_income_index'],
            'after_service_income_complete' => $requestData['update_after_service_income_complete'],
            'maintenance_history_recovery_index' => $requestData['update_maintenance_history_recovery_index'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('maintain')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('maintain')->update($data);
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
    public function updateMaintainRepair(Request $request){
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
        $check=Db::name('maintain')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('maintain')->update($data);
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
        if (is_null($Maintain = Maintain::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Maintain', $Maintain);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function update(){
        // 接收数据
        $maintain = Request::instance()->post();

        // 将数据存入Maintain表
        $Maintain = new Maintain();
        $state = $Maintain->isUpdate(true)->save($maintain);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    public function maintain()
    {
        $fyear = Session::get('fyear');
        $company = input('company');

        $pageSize = 20; // 每页显示20条数据

        // 实例化Maintain
        $Maintain = new Maintain;

        // 按条件查询数据并调用分页
        $maintains = $Maintain
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('maintains', $maintains);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function maintainedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Maintain = Maintain::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Maintain', $Maintain);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function maintainupdate(){
        // 接收数据
        $maintain = Request::instance()->post();

        // 将数据存入Maintain表
        $Maintain = new Maintain();
        $state = $Maintain->isUpdate(true)->save($maintain);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('maintain'));
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

        // 实例化Maintain
        $Maintain = new Maintain;

        // 按条件查询数据并调用分页
        $maintains = $Maintain
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('maintains', $maintains);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function repairedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Maintain = Maintain::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Maintain', $Maintain);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function repairupdate(){
        // 接收数据
        $maintain = Request::instance()->post();

        // 将数据存入Maintain表
        $Maintain = new Maintain();
        $state = $Maintain->isUpdate(true)->save($maintain);

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

        // 实例化Maintain
        $Maintain = new Maintain;

        // 按条件查询数据并调用分页
        $maintains = $Maintain
            ->where('company', 'like', '%' . $company . '%')
            ->where('fyear', 'like', '%' . $fyear . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('maintains', $maintains);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function profitEdit(Request $request){
        $requestData=$request->param();
        $data=array(
            'begin_guarantee_ave_year' => $requestData['update_begin_guarantee_ave_year'],
            'guarantee_ave_year' => $requestData['update_guarantee_ave_year'],
            'new_ave_year' => $requestData['update_new_ave_year'],
            'maintain_cost_single' => $requestData['update_maintain_cost_single'],
            'gross_profit_margin' => $requestData['update_gross_profit_margin'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('maintain')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('maintain')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function security(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Maintain = Maintain::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Maintain', $Maintain);
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
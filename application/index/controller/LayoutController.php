<?php
namespace app\index\controller;
use think\Controller;   // 用于与V层进行数据传递
use think\Request;
use app\common\model\Staff;   // 员工模型
use think\Db;
use think\Session;
class LayoutController extends IndexController
{
    // 用户登录表单
    public function header()
    {
        //获取session
        $id = session('staff_id');
        var_dump($id);
        $result= Db::name('staff')->where('id',$id)->select();
        $role=$result[0]['role'];
        Session::set('role',$role);
        $auth=Db::name('role')->where('role_name',$role)->select();
        $bureport = $auth[0]['report'];
        Session::set('report',$bureport);

    }
    public function TruncateMaking(){
        $result= Db::query("TRUNCATE TABLE helc_making");
        $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateEquipmentReceipt(){
        $result= Db::query("TRUNCATE TABLE helc_equipment_receipt");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateInstallReceipt(){
        $result= Db::query("TRUNCATE TABLE helc_install_receipt");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateProductERP(){
        $result= Db::query("TRUNCATE TABLE helc_product_erp");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateEntrustContract(){
        $result= Db::query("TRUNCATE TABLE helc_entrust_contract");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateSubContract(){
        $result= Db::query("TRUNCATE TABLE helc_subcontract");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateArrears(){
        $result= Db::query("TRUNCATE TABLE helc_arrears");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateIncomeErp(){
        $result= Db::query("TRUNCATE TABLE helc_income_erp");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateInstallIncomeTemp(){
        $result= Db::query("TRUNCATE TABLE helc_install_income_temp");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function TruncateEquipmentIncomeTemp(){
        $result= Db::query("TRUNCATE TABLE helc_equipment_income_temp");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function EquipmentDebtCalculation(){
        $result1= Db::query("CALL EquipmentArrearsAccounting");
        $result2= Db::query("CALL bu_function");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function InstallDebtCalculation(){
        $result1= Db::query("CALL InstallArrearsAccounting");
        $result2= Db::query("CALL bu_function");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function IntoForceCalculation(){
        $result1= Db::query("CALL intoforce_function");
        $result2= Db::query("CALL sdcompany_function");
        $result3= Db::query("CALL bu_function");
        $result4= Db::query("CALL proce_month_index");
        $result5= Db::query("CALL proce_month_index");
        $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function InstallCalculation(){
        $result1= Db::query("CALL install_function");
        $result2= Db::query("CALL sdcompany_function");
        $result3= Db::query("CALL bu_function");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
    public function InstallationSubcontractingCalculation(){
        $result1= Db::query("CALL subcontract_fucntion");
         $this->success('执行完毕！', url('Index/admin'),'','1');
    }
}
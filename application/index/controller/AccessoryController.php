<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Accessory;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class AccessoryController extends IndexController
{
    //----------------------------------客户信息-------------------------------------------------
    public function index(){
        // 获取查询信息
        $accessory_contract_id = Request::instance()->get('accessory_contract_id');
        $buyer_unit = Request::instance()->get('buyer_unit');
        $distributor = Request::instance()->get('distributor');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示10条数据
        // 实例化
        $Accessory = new Accessory;
        // 按条件查询数据并调用分页
        $accessorys = $Accessory
            ->where('accessory_contract_id', 'like', '%' . $accessory_contract_id . '%')
            ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
            ->where('distributor', 'like', '%' . $distributor . '%')
            ->order("field(payment_status,'未支付','部分支付','已支付')")
            ->order('id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('accessorys', $accessorys);
        // 将数据返回给用户
        $this->display();
        return $this->fetch();
    }
    //  新建配套合同
    public function NewAccessory(Request $request){
        $today_date=session::get('today_date');
        $requestData=$request->param();
        $data[] = [
            'company' => $requestData['company'],
            'accessory_contract_id' => $requestData['accessory_contract_id'],
            'buyer_unit' => $requestData['buyer_unit'],
            'contract_num' => $requestData['contract_num'],
            'distributor' => $requestData['distributor'],
            'subcontract_amount' => $requestData['subcontract_amount'],
            'entrust_id' => $requestData['entrust_id'],
            'approval_value' => $requestData['approval_value']
        ];
        $result=Db::name('accessory')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //  删除配套合同
    function Delete($delete_id){
        $list = Db::name('accessory')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('accessory')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //刷新后台数据
    public function refresh(){
        $result= Db::execute("CALL proce_accessory();");
        return $this->success('刷新完毕！', url('Accessory/index'),'','3');
    }
    //  通过ID获取配套合同信息信息
    public function GetAccessoryInfo(){
        $id = $this->request->param("id");
        $data=Db::name('accessory')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //更新
    public function updateAccessory(Request $request){
        $requestData=$request->param();
        $data=array(
            'accessory_contract_id' => $requestData['update_accessory_contract_id'],
            'company' => $requestData['update_company'],
            'buyer_unit' => $requestData['update_buyer_unit'],
            'contract_num' => $requestData['update_contract_num'],
            'distributor' => $requestData['update_distributor'],
            'subcontract_amount' => $requestData['update_subcontract_amount'],
            'entrust_id' => $requestData['update_entrust_id'],
            'approval_value' => $requestData['update_approval_value'],
            'payment_amount' => $requestData['update_payment_amount'],
            'subcontract_status' => $requestData['update_subcontract_status'],
            'approval_status' => $requestData['update_approval_status'],
            'subcontract_sign_status' => $requestData['update_subcontract_sign_status'],
            'progress' => $requestData['update_progress'],
            'remarks' => $requestData['update_remarks'],
            'id' => $requestData['accessory_edit_id']
        );
        $check=Db::name('accessory')->where(['id' => $requestData['accessory_edit_id']])->count();
        if($check>0){
            $result=Db::name('accessory')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //导出配套合同信息
    public function exportAccessory(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '配套合同号'=>'string',
            '安装合同号'=>'string',
            '区域'=>'string',
            '买方单位'=>'string',
            '合同台量'=>'integer',
            '经销商'=>'string',
            '分包金额'=>'0.00',
            '委托合同编号'=>'string',
            '分包签订日期'=>'date',
            '审批值'=>'0.00',
            '分包合同状态'=>'string',
            '审批状态'=>'string',
            '付款金额'=>'0.00',
            '已付比例'=>'0.00%',
            '支付状态'=>'string',
            '进展情况'=>'string',
            '备注'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'accessory_contract_id',
            'install_contract_id',
            'company',
            'buyer_unit',
            'contract_num',
            'distributor',
            'subcontract_amount',
            'entrust_id',
            'IF(subcontract_sign_date="0000-00-00","",subcontract_sign_date)'=>'subcontract_sign_date',
            'approval_value',
            'subcontract_status',
            'approval_status',
            'payment_amount',
            'payment_amount_ratio',
            'payment_status',
            'progress',
            'remarks',
        ];
        if($super_admin==1){
            $data  = Db::name('accessory')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('accessory')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('配套合同明细', $head, $data, $keys);
    }
}
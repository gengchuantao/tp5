<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Customer;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class CustomerController extends IndexController
{
    //----------------------------------客户信息-------------------------------------------------
    public function index(){
        return $this->fetch();
    }
    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getCustomerInfoByCondition(Request $request){
        $requestData=$request->param();
        $full_name = $requestData['search_full_name'];
        $short_name = $requestData['search_short_name'];
        $customer_classification = $requestData['search_customer_classification'];

        $data=Db::name('customer')
            ->where('full_name', 'like', '%' . $full_name . '%')
            ->where('short_name', 'like', '%' . $short_name . '%')
            ->where('customer_classification', 'like', '%' . $customer_classification . '%')
            ->order('id','desc')
            ->limit(100)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  新建客户
    public function NewCustomer($customer_classification,$key_account_code,$full_name,$short_name,$company){
        $today_date=session::get('today_date');
        // 实例化
        $data[] = [
            'customer_classification' => $customer_classification,
            'key_account_code' => $key_account_code,
            'full_name' => $full_name,
            'short_name' => $short_name,
            'company' => $company,
            'create_time' => $today_date,
        ];
        $result=Db::name('customer')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //  删除客户
    function Delete($delete_id){
        $list = Db::name('customer')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('customer')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //  通过ID获取合同信息
    public function GetCustomerInfo(){
        $id = $this->request->param("id");
        $data=Db::name('customer')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  修改客户基本信息
    public function Edit($update_id,$update_customer_classification,$update_key_account_code,$update_full_name,$update_short_name,$update_company){
        $data=array(
            'customer_classification' => $update_customer_classification,
            'key_account_code' => $update_key_account_code,
            'full_name' => $update_full_name,
            'short_name' => $update_short_name,
            'company' => $update_company,
            'id' => $update_id
        );
        $check=Db::name('customer')->where(['id' => $update_id])->count();
        if($check>0){
            $result=Db::name('customer')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //----------------------------------------数据导出--------------------------------------------------//
    //导出所有合同信息
    /**
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\db\exception\DataNotFoundException
     */
    public function allCustomer(){
        ini_set ('memory_limit', '1280M');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '客户分类'=>'string',
            '大客户编码'=>'string',
            '客户全称'=>'string',
            '客户简称'=>'string',
            '区域'=>'string',
            '创建时间'=>'date',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'customer_classification',
            'key_account_code',
            'full_name',
            'short_name',
            'company',
            'IF(create_time="0000-00-00","",create_time)'=>'create_time',
        ];

        $data  = Db::name('customer')
                ->field($keys)
                ->select();
        $excel->exports('客户关管理', $head, $data, $keys);
    }
}
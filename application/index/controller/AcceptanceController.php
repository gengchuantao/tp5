<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Acceptance;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class AcceptanceController extends IndexController
{
    /**
     * @throws DbException
     * @throws Exception
     */
    public function index(){
        // 获取查询信息
        $bill_status = Request::instance()->get('bill_status');
        $company = Request::instance()->get('company');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示10条数据
        // 实例化
        $Acceptance = new Acceptance;
        // 按条件查询数据并调用分页
        $acceptances = $Acceptance
            ->where('bill_status', 'like', '%' . $bill_status . '%')
            ->where('company', 'like', '%' . $company . '%')
            ->order('id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('acceptances', $acceptances);
        // 将数据返回给用户
        $this->display();
        return $this->fetch();
    }
    public function getAcceptanceInfoByCondition(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=[];
        try {
            $data = Db::name('acceptance')
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  新建商业承兑汇票
    public function NewAcceptance(Request $request){
        $today_date=session::get('today_date');
        $requestData=$request->param();
        $data[] = [
            'bill_id' => $requestData['bill_id'],
            'bill_status' => $requestData['bill_status'],
            'company' => $requestData['company'],
            'contract_id' => $requestData['contract_id'],
            'contract_type' => $requestData['contract_type'],
            'customer' => $requestData['customer'],
            'accepting_bank' => $requestData['accepting_bank'],
            'payment_type' => $requestData['payment_type'],
            'bill_classification' => $requestData['bill_classification'],
            'bill_amount' => $requestData['bill_amount'],
            'issue_date' => $requestData['issue_date'],
            'due_date' => $requestData['due_date'],
            'transferable' => $requestData['transferable'],
            'remarks' => $requestData['remarks'],
            'creat_date' => $today_date,
            'attachments_url' => '/../tp5/public/uploads/webdav/acceptance/'.$requestData['bill_id'].'.pdf'
        ];
        $result=Db::name('acceptance')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //  删除
    /**
     * @throws PDOException
     * @throws Exception
     */
    function Delete($delete_id){
        $list = Db::name('acceptance')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('acceptance')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //  通过ID获取商票信息

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function GetAcceptanceInfo(Request $request){
        $requestData=$request->param();
        $id = $requestData['id'];
        $bill_id = $requestData['search_bill_id'];
        $bill_status = $requestData['search_bill_status'];
        if(empty($bill_id) && empty($bill_status)){
            $data=Db::name('acceptance')
                ->select();
        }else{
            $data=Db::name('acceptance')
                ->where('bill_id', 'like', '%' . $bill_id . '%')
                ->where('bill_status', 'like', '%' . $bill_status . '%')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  修改商票基本信息

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function EditForm(Request $request){
        $requestData=$request->param();
        $data=array(
            'bill_id' => $requestData['update_bill_id'],
            'bill_status' => $requestData['update_bill_status'],
            'company' => $requestData['update_company'],
            'bill_classification' => $requestData['update_bill_classification'],
            'bill_amount' => $requestData['update_bill_amount'],
            'issue_date' => $requestData['update_issue_date'],
            'due_date' => $requestData['update_due_date'],
            'receipt_id' => $requestData['update_receipt_id'],
            'transferable' => $requestData['update_transferable'],
            'contract_id' => $requestData['update_contract_id'],
            'contract_type' => $requestData['update_contract_type'],
            'customer' => $requestData['update_customer'],
            'accepting_bank' => $requestData['update_accepting_bank'],
            'remarks' => $requestData['update_remarks'],
            'payment_type' => $requestData['update_payment_type'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('acceptance')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('acceptance')->update($data);
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
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function exportToExcel(){

        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '票据分类'=>'string',
            '票据编号'=>'string',
            '票据状态'=>'string',
            '区域'=>'string',
            '合同号'=>'string',
            '合同分类'=>'string',
            '客户名称'=>'string',
            '承兑银行'=>'string',
            '款项类型'=>'string',
            '票面金额'=>'0.00',
            '出票日期'=>'date',
            '到期日期'=>'date',
            '收款编号'=>'string',
            '是否可转让'=>'string',
            '备注'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'bill_classification',
            'bill_id',
            'bill_status',
            'company',
            'contract_id',
            'contract_type',
            'customer',
            'accepting_bank',
            'payment_type',
            'bill_amount',
            'issue_date',
            'due_date',
            'receipt_id',
            'transferable',
            'remarks',
        ];
        if($super_admin==1){
            $data  = Db::name('acceptance')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('acceptance')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('商业承兑汇票明细', $head, $data, $keys);
    }

}
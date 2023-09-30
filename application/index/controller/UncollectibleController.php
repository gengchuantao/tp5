<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Uncollectible;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class UncollectibleController extends IndexController
{
    /*主页*/
    public function index(){
        /*显示主页*/
        return $this->fetch();
    }
    /*查询*/
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function GetUncollectibleInfo(Request $request){
        $requestData=$request->param();
        $contract_id = $requestData['search_contract_id'];
        $contract_type = $requestData['search_contract_type'];
        if(empty($contract_id) && empty($contract_type)){
            $data=Db::name('uncollectible')
                ->order("field(uncollectible_status,'待审核','待做坏账','已完结')")
                ->order('id','desc')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('uncollectible')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('contract_type', 'like', '%' . $contract_type . '%')
                ->order("field(uncollectible_status,'待审核','待做坏账','已完结')")
                ->order('id','desc')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;


    }

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getUncollectibleInfoByCondition(){

        $data=Db::name('uncollectible')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*新建*/
    public function NewUncollectible(Request $request){
        $today_date=session::get('today_date');
        $requestData=$request->param();
        $data[] = [
            'contract_id' => $requestData['contract_id'],
            'customer' => $requestData['customer'],
            'contract_type' => $requestData['contract_type'],
            'company' => $requestData['company'],
            'uncollectible_type' => $requestData['uncollectible_type'],
            'contract_total_arrears' => $requestData['contract_total_arrears'],
            'uncollectible_arrears' => $requestData['uncollectible_arrears'],
            'uncollectible_arrears_invoice' => $requestData['uncollectible_arrears_invoice'],
            'max_account_age_month' => $requestData['max_account_age_month'],
            'product_ids' => $requestData['product_ids'],
            'apply_date' => $requestData['apply_date'],
            'attachments_url' => '/../tp5/public/uploads/webdav/uncollectible/'.$requestData['contract_id'].'.zip'
        ];
        $result=Db::name('uncollectible')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    /*删除*/
    /**
     * @throws PDOException
     * @throws Exception
     */
    function Delete($delete_id){
        $list = Db::name('uncollectible')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('uncollectible')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    /*修改*/
    /**
     * @throws PDOException
     * @throws Exception
     */
    public function EditForm(Request $request){
        $requestData=$request->param();
        $verify_date=$requestData['update_verify_date'];
        $bad_debt_deal_date=$requestData['update_bad_debt_deal_date'];
        $uncollectible_arrears_invoice=$requestData['update_uncollectible_arrears_invoice'];
        if($uncollectible_arrears_invoice==0 && $verify_date!='0000-00-00'){
            $uncollectible_status='已完结';
        }else if($uncollectible_arrears_invoice>0 && $bad_debt_deal_date!='0000-00-00'){
            $uncollectible_status='已完结';
        }else if($uncollectible_arrears_invoice>0 && $bad_debt_deal_date=='0000-00-00'){
            $uncollectible_status='待做坏账';
        }else{
            $uncollectible_status='待审核';
        }
        $data=array(
            'contract_id' => $requestData['update_contract_id'],
            'customer' => $requestData['update_customer'],
            'contract_type' => $requestData['update_contract_type'],
            'company' => $requestData['update_company'],
            'uncollectible_type' => $requestData['update_uncollectible_type'],
            'contract_total_arrears' => $requestData['update_contract_total_arrears'],
            'uncollectible_arrears' => $requestData['update_uncollectible_arrears'],
            'uncollectible_arrears_invoice' => $requestData['update_uncollectible_arrears_invoice'],
            'max_account_age_month' => $requestData['update_max_account_age_month'],
            'product_ids' => $requestData['update_product_ids'],
            'remarks' => $requestData['update_remarks'],
            'apply_date' => $requestData['update_apply_date'],
            'verify_date' => $requestData['update_verify_date'],
            'bad_debt_deal_date' => $requestData['update_bad_debt_deal_date'],
            'uncollectible_status' => $uncollectible_status,
            'id' => $requestData['update_id']
        );
        $check=Db::name('uncollectible')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('uncollectible')->update($data);
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
    /*导出*/
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function exportToExcel(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $admin = Session::get('admin');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '客户'=>'string',
            '合同类型'=>'string',
            '区域'=>'string',
            '不可收类型'=>'string',
            '合同总欠款'=>'0.00',
            '本次申报不可收金额'=>'0.00',
            '其中已开票金额'=>'0.00',
            '最长账龄(月)'=>'integer',
            '工号明细'=>'string',
            '申请日期'=>'date',
            '总部审核日期'=>'date',
            '处理坏账日期'=>'date',
            '状态'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'customer',
            'contract_type',
            'company',
            'uncollectible_type',
            'contract_total_arrears',
            'uncollectible_arrears',
            'uncollectible_arrears_invoice',
            'max_account_age_month',
            'product_ids',
            'IF(apply_date="0000-00-00","",apply_date)'=>'apply_date',
            'IF(verify_date="0000-00-00","",verify_date)'=>'verify_date',
            'IF(bad_debt_deal_date="0000-00-00","",bad_debt_deal_date)'=>'bad_debt_deal_date',
            'uncollectible_status',
        ];
        $excel = new expExcel();
        if($admin==1){
            $data  = Db::name('uncollectible')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('uncollectible')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('不可收明细', $head, $data, $keys);
    }

}
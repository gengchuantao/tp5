<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Funding;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class FundingController extends IndexController
{
    public function index(){
        // 将数据返回给用户
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function GetFundingInfoByCondition(Request $request){
        $requestData=$request->param();
        $id = $requestData['id'];
        $receipt_id = $requestData['search_receipt_id'];
        $contract_id = $requestData['search_contract_id'];
        $split_five_days = $requestData['search_split_five_days'];
        $classification = $requestData['search_classification'];
        $check_status = $requestData['search_check_status'];
        $companys=Session::get('company');
        if($companys==='山东分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        if(empty($receipt_id) && empty($contract_id)&& empty($split_five_days) && empty($check_status)){
            $data=Db::name('funding')
                ->where('company', 'like', '%' . $company . '%')
                ->order('id','desc')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('funding')
                ->where('company', 'like', '%' . $company . '%')
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('classification', 'like', '%' . $classification . '%')
                ->where('split_five_days', 'like', '%' . $split_five_days . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->order('id','desc')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  通过ID获取信息
    public function GetFundingInfo(){
        $id = $this->request->param("id");
        $data=Db::name('funding')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //刷新后台数据
    public function refresh(){
        $result1= Db::execute("CALL fundingCheck();");
        $result2= Db::execute("CALL funding_function();");
        return $this->success('刷新完毕！', url('Funding/index'),'','3');
    }
    public function lookup(){
        $receipt_id = input('receipt_id');
        $check_status = input('check_status');
        $company = input('funding_company');
        $status = input('funding_status');
        $cross_region = input('cross_region');
        $contract_id=input('contract_id');

        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('funding_receipt_id',$receipt_id);
        Session::set('funding_check_status',$check_status);
        Session::set('funding_company',$company);
        Session::set('funding_status',$status);
        Session::set('funding_cross_region',$cross_region);
        Session::set('funding_contract_id',$contract_id);

        // 实例化Income
        $Funding = new Funding;
        if($admin===1){
            $fundings = $Funding
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $fundings = $Funding
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $companys . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }


        // 向V层传数据
        $this->assign('fundings', $fundings);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function AddForm($add_receipt_id,$add_payer,$add_payment_type,$add_classification,$add_contract_id,$add_product_id,$add_amount_money,$add_expect_split_amount,$add_funding_way,$add_status,$add_first_payee,$add_first_ratio,$add_second_payee,$add_second_ratio,$add_remarks){
        $company=session::get('company');
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        // 实例化
        $Funding = new Funding();
        $Funding->receipt_id = $add_receipt_id;
        $Funding->payer = $add_payer;
        $Funding->payment_type = $add_payment_type;
        $Funding->classification = $add_classification;
        $Funding->contract_id = $add_contract_id;
        $Funding->product_id = $add_product_id;
        $Funding->amount_money = $add_amount_money;
        $Funding->expect_split_amount = $add_expect_split_amount;
        $Funding->funding_way = $add_funding_way;
        $Funding->status = $add_status;
        $Funding->first_payee = $add_first_payee;
        $Funding->first_ratio = $add_first_ratio;
        $Funding->second_payee = $add_second_payee;
        $Funding->second_ratio = $add_second_ratio;
        $Funding->remarks = $add_remarks;
        $Funding->recorder = $staff_name;
        $Funding->record_date = $today_date;
        $Funding->company = $company;
        $CheckData= Db::query("SELECT receipt_id,amount_money,split_summary FROM helc_funding WHERE receipt_id='$add_receipt_id'");
        $list = Db::name('funding')->where(['receipt_id'=>$add_receipt_id])->count();
        $amount_money=$CheckData[0]['amount_money'];
        $split_summary=$CheckData[0]['split_summary'];
        $check=ROUND($amount_money,2)-ROUND($split_summary,2)-ROUND($add_expect_split_amount,2);
        // 判断拆分总额是否超过收款金额
        if($list>0){
            if($check<-0.0000001){
                return json(0);
            }else{
                $Funding->save();
                //$CallFunction = Db::execute("CALL funding_function;");
                return json(1);
            }
        }else{
            $Funding->save();
            //$CallFunction = Db::execute("CALL funding_function;");
            return json(1);
        }

    }
    /*删除*/
    /**
     * @throws PDOException
     * @throws Exception
     */
    function Delete($delete_id){
        $list = Db::name('funding')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('funding')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //更新

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function CheckForm(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'check_status' => $requestData['check_status'],
            'record_date' => $requestData['record_date'],
            'check_remarks' => $requestData['check_remarks'],
            'special_instructions' => $requestData['special_instructions'],
            'checker' => $staff_name,
            'check_date' => $today_date,
            'id' => $requestData['check_id']
        );
        $check=Db::name('funding')->where(['id' => $requestData['check_id']])->count();
        if($check>0){
            $result=Db::name('funding')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function SendForm(){
        $id = $this->request->param("send_id");
        $sqldata= Db::query("
 SELECT id,receipt_id,payer,payment_type,classification,contract_id,product_id,amount_money,expect_split_amount,funding_way,status,first_payee,first_ratio,second_payee,second_ratio,remarks
 FROM helc_funding
WHERE id='$id'
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['id']=$sqldata[$i]['id'];
            $sqldata1[$i]['receipt_id']=$sqldata[$i]['receipt_id'];
            $sqldata1[$i]['edit_payer']=$sqldata[$i]['payer'];
            $sqldata1[$i]['edit_payment_type']=$sqldata[$i]['payment_type'];
            $sqldata1[$i]['edit_classification']=$sqldata[$i]['classification'];
            $sqldata1[$i]['edit_contract_id']=$sqldata[$i]['contract_id'];
            $sqldata1[$i]['edit_product_id']=$sqldata[$i]['product_id'];
            $sqldata1[$i]['edit_amount_money']=$sqldata[$i]['amount_money'];
            $sqldata1[$i]['edit_expect_split_amount']=$sqldata[$i]['expect_split_amount'];
            $sqldata1[$i]['edit_funding_way']=$sqldata[$i]['funding_way'];
            $sqldata1[$i]['edit_status']=$sqldata[$i]['status'];
            $sqldata1[$i]['edit_first_payee']=$sqldata[$i]['first_payee'];
            $sqldata1[$i]['edit_first_ratio']=$sqldata[$i]['first_ratio'];
            $sqldata1[$i]['edit_second_payee']=$sqldata[$i]['second_payee'];
            $sqldata1[$i]['edit_second_ratio']=$sqldata[$i]['second_ratio'];
            $sqldata1[$i]['edit_remarks']=$sqldata[$i]['remarks'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
/*    //审核传值
    public function CheckPost(){
        $id = $this->request->param("check_id");
        $sqldata= Db::query("
 SELECT id,check_remarks
 FROM helc_funding
WHERE id='$id'
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['id']=$sqldata[$i]['id'];
            $sqldata1[$i]['check_remarks']=$sqldata[$i]['check_remarks'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }*/
    /*修改*/
    /**
     * @throws PDOException
     * @throws Exception
     */
    public function EditForm(Request $request){
        $requestData=$request->param();
        $data=array(
            'receipt_id' => $requestData['edit_receipt_id'],
            'payer' => $requestData['edit_payer'],
            'payment_type' => $requestData['edit_payment_type_input'],
            'classification' => $requestData['edit_classification'],
            'contract_id' => $requestData['edit_contract_id'],
            'product_id' => $requestData['edit_product_id'],
            'amount_money' => $requestData['edit_amount_money'],
            'expect_split_amount' => $requestData['edit_expect_split_amount'],
            'funding_way' => $requestData['edit_funding_way'],
            'status' => $requestData['edit_status'],
            'first_payee' => $requestData['edit_first_payee'],
            'first_ratio' => $requestData['edit_first_ratio'],
            'second_payee' => $requestData['edit_second_payee'],
            'second_ratio' => $requestData['edit_second_ratio'],
            'remarks' => $requestData['edit_remarks'],
            'check_status' => '待审核',
            'id' => $requestData['edit_id']
        );
        $check=Db::name('funding')->where(['id' => $requestData['edit_id']])->count();
        if($check>0){
            $result=Db::name('funding')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    /*导出Excel*/
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    function exportToExcel(){
        ini_set ('memory_limit', '1280M');
        $receipt_id = Session::get('funding_receipt_id');
        $contract_id = Session::get('funding_contract_id');
        $check_status = Session::get('funding_check_status');
        $status = Session::get('funding_status');
        $cross_region= Session::get('funding_cross_region');
        $admin=Session::get('admin');
        $company = Session::get('funding_company');
        $companys = Session::get('company');
        $excel = new expExcel();
        $xlsName  = "收款拆分明细";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '收款编号'=>'string',
            '来款单位'=>'string',
            '来款方式'=>'string',
            '款项类型'=>'string',
            '入金分类'=>'string',
            '合同号'=>'string',
            '工号'=>'string',
            '金额'=>'price',
            '区域'=>'string',
            '拆分汇总'=>'price',
            '本次拆分金额'=>'price',
            'ERP收款编号拆分汇总'=>'price',
            '第一收款人'=>'string',
            '第一收款人所在事业部'=>'string',
            '第一分配比例'=>'string',
            '第一事业部季度绩效'=>'price',
            '第一事业部年终奖'=>'price',
            '第二收款人'=>'string',
            '第二收款人所在事业部'=>'string',
            '第二分配比例'=>'string',
            '第二事业部季度绩效'=>'price',
            '第二事业部年终奖'=>'price',
            '备注'=>'string',
            '录入人'=>'string',
            '录入时间'=>'date',
            '审核人'=>'string',
            '审核时间'=>'date',
            '审核状态'=>'string',
            '审核意见'=>'string',
            '状态'=>'string',
            '调验合同'=>'string',
            '大项目'=>'string',
            '跨区域'=>'string',
            '修正后收款类别'=>'string',
            '来款方式验证'=>'integer',
            '入金分类验证'=>'integer',
            '跨区域验证'=>'integer',
            '预计拆分金额验证'=>'integer',
            '开票拆分验证'=>'integer',
            '欠款超18个月'=>'string',
            '5天内拆分'=>'string',
            '特殊说明'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'receipt_id',
            'payer',
            'funding_way',
            'payment_type',
            'classification',
            'contract_id',
            'product_id',
            'amount_money',
            'company',
            'split_summary',
            'expect_split_amount',
            'split_amount',
            'first_payee',
            'first_bu',
            'first_ratio',
            'first_bu_achievements',
            'first_bu_bonus',
            'second_payee',
            'second_bu',
            'second_ratio',
            'second_bu_achievements',
            'second_bu_bonus',
            'remarks',
            'recorder',
            'record_date',
            'checker',
            'check_date',
            'check_status',
            'check_remarks',
            'status',
            'if_check',
            'big_project',
            'cross_region',
            'fix_income_type',
            'funding_way_checked',
            'classification_checked',
            'cross_region_checked',
            'expect_split_amount_checked',
            'invoiced_split_checked',
            'exceed_18_months',
            'split_five_days',
            'special_instructions'
        ];
        if($admin==1){
            $data = Db::name('funding')
                ->field($keys)
                ->where('receipt_id','like','%'.$receipt_id.'%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->whereOr('second_company', 'like', '%' . $company . '%')
                ->select();
        }else{
            $data = Db::name('funding')
                ->field($keys)
                ->where('receipt_id','like','%'.$receipt_id.'%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->where('company', '=',  $companys)
                ->whereOr('second_company', '=',  $companys)
                ->select();
        }
        $excel->exports($xlsName,$head,$data,$keys);
    }
}
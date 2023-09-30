<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Installarrears;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class InstallarrearsController extends IndexController{
    //显示表单
    public function index(){
        return $this->fetch();
    }
    //通过ID获取欠款信息
    public function GetInstallArrearsInfo(){
        $id = $this->request->param("id");
        $data=array();
        try {
            $data = Db::name('installarrears')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function GetInstallArrearsInfoByContractId(Request $request){
        $requestData=$request->param();
        $contract_id = $requestData['contract_id'];
        $data = Db::name('installarrears')
            ->where('contract_id', '=', $contract_id)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetInstallArrearsInfoByCondition(Request $request){
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取事业部名称
        $bu_name=Session::get('staff_bu');
        //获取员工姓名
        $staff_name=Session::get('staff_name');
        //获取角色role
        $role=Session::get('role');
        //获取所在区域
        $companys=Session::get('company');
        $requestData=$request->param();
        $comprehensive_month = $requestData['deadline'];
        $contract_id = $requestData['search_contract_id'];
        $arrears_status = $requestData['search_arrears_status'];
        $company = $requestData['search_company'];
        $staff_bu = $requestData['search_bu_name'];
        $follow_person = $requestData['search_follow_person'];
        $buyer_unit = $requestData['search_clause_customer'];
        $customer_abbreviation = $requestData['search_customer_abbreviation'];
        if($companys=='山东分公司'){
            $data = Db::name('installarrears')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('bu_name', 'like', '%' . $staff_bu . '%')
                ->where('follow_person', 'like', '%' . $follow_person . '%')
                ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
                ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
                ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
                ->where('arrears_status', 'like', '%' . $arrears_status . '%')
                ->order('id','desc')
                ->limit('300')
                ->select();
        }else{
            switch ($role){
                case "事业部CEO":
                    $data = Db::name('installarrears')
                        ->where('contract_id', 'like', '%' . $contract_id . '%')
                        ->where('company', 'like', '%' . $companys . '%')
                        ->where('bu_name', 'like', '%' . $bu_name . '%')
                        ->where('follow_person', 'like', '%' . $follow_person . '%')
                        ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
                        ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
                        ->where('arrears_status', 'like', '%' . $arrears_status . '%')
                        ->order('id','desc')
                        ->limit('300')
                        ->select();
                    break;
                case "项目经理":
                    $data = Db::name('installarrears')
                        ->where('contract_id', 'like', '%' . $contract_id . '%')
                        ->where('company', 'like', '%' . $companys . '%')
                        ->where('follow_person', '=', $staff_name)
                        ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
                        ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
                        ->where('arrears_status', 'like', '%' . $arrears_status . '%')
                        ->order('id','desc')
                        ->limit('300')
                        ->select();
                    break;
                case "收款专员":
                    $data = Db::name('installarrears')
                        ->where('contract_id', 'like', '%' . $contract_id . '%')
                        ->where('company', 'like', '%' . $companys . '%')
                        ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
                        ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
                        ->where('arrears_status', 'like', '%' . $arrears_status . '%')
                        ->order('id','desc')
                        ->limit('300')
                        ->select();
                    break;
                default:
                    $data = Db::name('installarrears')
                        ->where('contract_id', 'like', '%' . $contract_id . '%')
                        ->where('company', 'like', '%' . $companys . '%')
                        ->where('bu_name', 'like', '%' . $staff_bu . '%')
                        ->where('follow_person', 'like', '%' . $follow_person . '%')
                        ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
                        ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
                        ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
                        ->where('arrears_status', 'like', '%' . $arrears_status . '%')
                        ->order('id','desc')
                        ->limit('300')
                        ->select();
            }
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //修改跟进人及欠款原因
    public function edit(Request $request){
        $data = $request->param();
        $scompany=mb_substr($data['update_company'],0,4,'gbk');
        $update_data =array(
            'company'=>$data['update_company'],
            'scompany' => $scompany,
            'follow_person' => $data['update_follow_person'],
            'bu_name' => $data['update_bu_name'],
            'arrears_method' => $data['update_last_month_arrears_method'],
            'arrears_reason' => $data['update_arrears_reason'],
            'this_year_arrears_expected' => $data['update_this_year_arrears_expected'],
            'history_arrears_expected' => $data['update_history_arrears_expected'],
            'expected_collection_money' => $data['update_expected_collection_money'],
            'this_year_arrears_expected_collection_date' => $data['this_year_arrears_expected_collection_date'],
            'history_arrears_expected_collection_date' => $data['history_arrears_expected_collection_date'],
            'arrears_status' => '已提交',
            'id' => $data['update_id'],
        );
        $check=Db::name('installarrears')->where(['id' => $data['update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('installarrears')->update($update_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            if($result){
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //事业部更新欠款原因
    public function refresh(Request $request){
        $data = $request->param();
        $update_data =array(
            'arrears_method' => $data['update_last_month_arrears_method'],
            'arrears_reason' => $data['update_arrears_reason'],
            'this_year_arrears_expected' => $data['update_this_year_arrears_expected'],
            'history_arrears_expected' => $data['update_history_arrears_expected'],
            'expected_collection_money' => $data['update_expected_collection_money'],
            'this_year_arrears_expected_collection_date' => $data['this_year_arrears_expected_collection_date'],
            'history_arrears_expected_collection_date' => $data['history_arrears_expected_collection_date'],
            'arrears_status' => '已提交',
            'id' => $data['update_id'],
        );
        $check=Db::name('installarrears')->where(['id' => $data['update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('installarrears')->update($update_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            if($result){
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(0);
            }
        }else{
            $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
            return json(0);
        }
    }
    //仅更新欠款人跟事业部
    public function onlysave(Request $request){
        $requestData = $request->param();
        $scompany=substr($requestData['update_company'],0,2);
        $data=array(
            'company' => $requestData['update_company'],
            'scompany' => $scompany,
            'follow_person' => $requestData['update_follow_person'],
            'bu_name' => $requestData['update_bu_name'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('installarrears')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('installarrears')->update($data);
            if($result){
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
                return json(0);
            }
        }else{
            $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
            return json(0);
        }
    }
    //批量审核
    public function BatchAudit($batch_audit_id){
        $id=array();
        $id=explode(",", $batch_audit_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'arrears_status' =>  '已审核',
                'id' =>  $id[$i]
            );
            $result=Db::name('installarrears')->update($batch_data);
        }
        if($result){
            $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
            return json(1);
        }else{
            $CallFunction = Db::execute("CALL InstallArrearsUpdate;");
            return json(0);
        }

    }
    //获取截止日期
    public function GetClosingDate(){
        $ClosingDates= Db::table('helc_installarrears')
            ->distinct(true)
            ->field('comprehensive_month')
            ->order('id','desc')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($ClosingDates) ; $i++) {
            $MySql[$i]=$ClosingDates[$i]['comprehensive_month'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    //获取历史欠款入金财年
    public function GetInstallIncomeHistoryFyear(){
        $ClosingDates= Db::table('helc_install_income_history')
            ->distinct(true)
            ->field('fyear')
            ->order('id','desc')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($ClosingDates) ; $i++) {
            $MySql[$i]=$ClosingDates[$i]['fyear'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    //更新跟进进度
    public function UpdateFollowUpLevel(Request $request){
        $data = $request->param();
        $update_data =array(
            'follow_up_level' => $data['f_update_follow_up_level'],
            'solutions' => $data['f_update_solutions'],
            'solution_progress' => $data['f_update_solution_progress'],
            'id' => $data['f_update_id'],
        );
        $check=Db::name('installarrears')->where(['id' => $data['f_update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('installarrears')->update($update_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }

    }
    //--------------------------------------数据导出-----------------------------------------------//
    //按条件导出合同信息
    public function InstallContractArrearsExport(Request $request){
        $data = $request->param();
        $closing_date = $data['closing_date'];
        ini_set ('memory_limit', '1280M');
        // 获取查询信息
        $contract_id = Session::get('installarrears_contract_id');
        $buyer_unit = Session::get('installarrears_buyer_unit');
        $comprehensive_month = Session::get('comprehensive_month');
        $branchs = Session::get('installarrears_company');
        $arrears_status = Session::get('installarrears_arrears_status');
        $comprehensive_month = $closing_date;
        $customer_abbreviation = Session::get('installarrears_customer_abbreviation');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        if($companys=='山东分公司'){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //设置表头：
        $head = [
            '状态' => 'string',
            '合同号' => 'string',
            '合同号&期数' => 'string',
            '条款客户' => 'string',
            '项目名称' => 'string',
            '客户类型' => 'string',
            '到期应收日期' => 'date',
            '账龄(月)' => 'integer',
            '账龄(年)' => 'string',
            '期数' => 'string',
            '诉讼时效到期日' => 'date',
            '合同预收金额' => 'price',
            '合同实收金额' => 'price',
            '合同欠款金额' => 'price',
            '已开票金额' => 'price',
            '欠款金额' => 'price',
            '已处理坏账金额' => 'price',
            '山东司调减' => 'price',
            '到期欠款' => 'price',
            '跟进人' => 'string',
            '事业部' => 'string',
            '区域' => 'string',
            '区域简称' => 'string',
            '财年' => 'integer',
            '截止日期' => 'date',
            '分子公司回复' => 'string',
            '上月欠款处理方法' => 'string',
            '本月欠款处理方法' => 'string',
            '上月欠款原因' => 'string',
            '本月欠款原因' => 'string',
            '激活状态' => 'integer',
            '客户分类' => 'string',
            '客户简称' => 'string',
            '其中当年欠款' => 'price',
            '其中历史欠款' => 'price',
            '当年欠款预计收款' => 'price',
            '当年欠款实际收款' => 'price',
            '当年欠款预计收款日期' => 'date',
            '历史欠款预计收款' => 'price',
            '历史欠款实际收款' => 'price',
            '历史欠款预计收款日期' => 'date',
            '预计收款总金额' => 'price',
            '实际收款总金额' => '0.00',
            '法务状态' => 'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'arrears_status',
            'contract_id',
            'contract_id_and_periods',
            'clause_customer',
            'fix_project_name',
            'customer_type',
            'IF(expire_date="0000-00-00","",expire_date)'=>'expire_date',
            'account_age_month',
            'account_age_year',
            'periods',
            'IF(litigation_expire_date="0000-00-00","",litigation_expire_date)'=>'litigation_expire_date',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'invoiced_amount',
            'arrears',
            'bad_debt_amount',
            'report_reduction',
            'expire_arrears',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'fyear',
            'comprehensive_month',
            'company_reply',
            'last_month_arrears_method',
            'arrears_method',
            'last_month_arrears_reason',
            'arrears_reason',
            'active_status',
            'customer_classification',
            'customer_abbreviation',
            'this_year_arrears',
            'history_arrears',
            'this_year_arrears_expected',
            'this_year_actual_collection_money',
            'IF(this_year_arrears_expected_collection_date="0000-00-00","",this_year_arrears_expected_collection_date)'=>'this_year_arrears_expected_collection_date',
            'history_arrears_expected',
            'history_actual_collection_money',
            'IF(history_arrears_expected_collection_date="0000-00-00","",history_arrears_expected_collection_date)'=>'history_arrears_expected_collection_date',
            'expected_collection_money',
            'actual_collection_money',
            'legal_status',
        ];
        $data = Db::name('installarrears')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
            ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
            ->where('arrears_status', 'like', '%' . $arrears_status . '%')
            ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
            ->select();
        $excel->exports('安装欠款合同明细', $head, $data, $keys);
    }
    //按条件导出工号信息

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function InstallProductArrearsExport(Request $request){
        $data = $request->param();
        $product_closing_date = $data['product_closing_date'];
        ini_set ('memory_limit', '2048M');
        set_time_limit(0);
        // 获取查询信息
        $contract_id = Session::get('installarrears_contract_id');
        $buyer_unit = Session::get('installarrears_buyer_unit');
        $comprehensive_month = Session::get('comprehensive_month');
        $branchs = Session::get('installarrears_company');
        $arrears_status = Session::get('installarrears_arrears_status');
        $comprehensive_month = $product_closing_date;
        $sheet_name = "安装欠款工号明细({$comprehensive_month})";
        $customer_abbreviation = Session::get('installarrears_customer_abbreviation');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        if($companys=='山东分公司'){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //设置表头：
        $head = [
            '业务实体' => 'string',
            '合同类型' => 'string',
            '合同号' => 'string',
            '合同备注' => 'string',
            '合同状态' => 'string',
            '销售业务员' => 'string',
            '大客户' => 'string',
            '大客户名称' => 'string',
            '大客户简称' => 'string',
            '项目名称' => 'string',
            '客户编码' => 'string',
            '客户' => 'string',
            '条款客户' => 'string',
            '最终客户' => 'string',
            '工号' => 'string',
            '附加工程合同号' => 'string',
            '附加合同备注' => 'string',
            '合同预收金额' => 'price',
            '合同实收金额' => 'price',
            '合同欠款金额' => 'price',
            '款项类型' => 'string',
            '收款款型名称' => 'string',
            '期数' => 'string',
            '合同行金额' => 'price',
            '拆分比例' => 'string',
            '原金额' => 'price',
            '修改费拆分金额' => 'price',
            '预计收款拆分金额' => 'price',
            '支付条件' => 'string',
            '工号阶段' => 'string',
            '偏差天数' => 'string',
            '到期应收日期' => 'date',
            '已收款金额' => 'price',
            '欠款金额' => 'price',
            '已开票金额'=> 'price',
            '已处理坏账金额'=> 'price',
            '是否可收'=> 'string',
            '分子公司回复'=> 'string',
            '收款跟进人'=> 'string',
            '合同签订人'=> 'string',
            '合同签订日期' => 'date',
            '工程地点' => 'string',
            '省份'=> 'string',
            '地区'=> 'string',
            '跟单分公司'=> 'string',
            '综合月'=> 'string',
            '双方验收日期'=> 'date',
            '移交客户日期'=> 'date',
            '合同最大收款日期'=> 'date',
            '诉讼时效到期日'=> 'date',
            '妥投日期'=> 'date',
            '立案日期'=> 'date',
            '函件日期'=> 'date',
            '进场日期'=> 'date',
            '技监发证日期'=> 'date',
            '客户接收日期'=> 'date',
            '保修起算期'=> 'date',
            '保修期'=> 'integer',
            '保修结束期'=> 'date',
            '维修进场日期'=> 'date',
            '维修完工日期'=> 'date',
            '维改站'=> 'string',
            '大客户1'=> 'string',
            '大项目'=> 'string',
            '工程监理'=> 'string',
            '商机属性'=> 'string',
            '实际安装完工日期'=> 'date',
            '对方合同号'=> 'string',
            '首次校对日期'=> 'date',
            '校对日期'=> 'date',
            '是否有保函'=> 'string',
            '保函种类'=> 'string',
            '保函比率'=> 'string',
            '合同号&期数'=> 'string',
            '条件'=> 'string',
            '山东司调减'=> 'price',
            '客户类型'=> 'string',
            '到期欠款'=> 'price',
            '修正后的项目名称'=> 'string',
            '账龄(月)'=> '0.00',
            '账龄(年)'=> 'string',
            '跟进人'=> 'string',
            '事业部'=> 'string',
            '区域'=> 'string',
            '区域简称'=> 'string',
            '是否考核'=> 'integer',
            '财年'=> 'integer',
            '截止日期'=> 'date',
            '激活状态'=> 'integer',
            '欠款种类'=> 'string',
            '实际回收金额'=> 'price',
            '客户分类'=> 'string',
            '客户简称'=> 'string',
            '新到期应收日期' => 'date',
            'C标识' => 'string',
            '发函级别'=> 'string',
            '已发函属性'=> 'string',
            '修正到期应收日期' => 'date',
            '节点申请流程' => 'string',
            '考核标识' => 'string',
            '账龄(日)'=> '0.00',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'business_entity',
            'contract_type',
            'contract_id',
            'contract_remark',
            'contract_status',
            'salesperson',
            'big_customer',
            'big_customer_name',
            'big_customer_short',
            'project_name',
            'customer_id',
            'customer',
            'clause_customer',
            'final_customer',
            'product_id',
            'sub_contract_id',
            'sub_contract_remark',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'income_type',
            'income_name',
            'periods',
            'contract_line_amount',
            'split_ratio',
            'original_amount',
            'modify_split_amount',
            'expected_split_amount',
            'payment_terms',
            'product_id_stage',
            'deviation_days',
            'expire_date',
            'received_amount',
            'arrears',
            'invoiced_amount',
            'bad_debt_amount',
            'acceptable',
            'company_reply',
            'collection_follower',
            'signer',
            'IF(contract_sign_date="0000-00-00","",contract_sign_date)'=>'contract_sign_date',
            'project_location',
            'province',
            'region',
            'documentary_branch',
            'composite_month',
            'IF(both_check_date="0000-00-00","",both_check_date)'=>'both_check_date',
            'IF(transfer_customers_date="0000-00-00","",transfer_customers_date)'=>'transfer_customers_date',
            'IF(latest_receipt_date="0000-00-00","",latest_receipt_date)'=>'latest_receipt_date',
            'IF(litigation_expire_date="0000-00-00","",litigation_expire_date)'=>'litigation_expire_date',
            'IF(appropriate_date="0000-00-00","",appropriate_date)'=>'appropriate_date',
            'IF(filing_date="0000-00-00","",filing_date)'=>'filing_date',
            'IF(letter_date="0000-00-00","",letter_date)'=>'letter_date',
            'IF(approach_date="0000-00-00","",approach_date)'=>'approach_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(customer_received_date="0000-00-00","",customer_received_date)'=>'customer_received_date',
            'IF(warranty_period="0000-00-00","",warranty_period)'=>'warranty_period',
            'under_warranty',
            'IF(warranty_end="0000-00-00","",warranty_end)'=>'warranty_end',
            'IF(maintenance_mobilization_date="0000-00-00","",maintenance_mobilization_date)'=>'maintenance_mobilization_date',
            'IF(maintenance_completion_date="0000-00-00","",maintenance_completion_date)'=>'maintenance_completion_date',
            'victoria_station',
            'key_account',
            'big_project',
            'supervisor',
            'opportunity_attribute',
            'IF(actual_completion_date="0000-00-00","",actual_completion_date)'=>'actual_completion_date',
            'customer_contract_id',
            'IF(first_proofreading_date="0000-00-00","",first_proofreading_date)'=>'first_proofreading_date',
            'IF(proofreading_date="0000-00-00","",proofreading_date)'=>'proofreading_date',
            'if_guarantee',
            'guarantee_type',
            'guarantee_ratio',
            'contract_id_and_periods',
            'unique_field',
            'report_reduction',
            'customer_type',
            'expire_arrears',
            'fix_project_name',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'assessment',
            'fyear',
            'comprehensive_month',
            'active_status',
            'arrears_type',
            'actual_collection_money',
            'customer_classification',
            'customer_abbreviation',
            'IF(expire_date="0000-00-00","",expire_date)'=>'new_expire_date',
            'c_mark',
            'letter_level',
            'sent_letter_type',
            'fix_expire_date',
            'node_apply_process',
            'assess_mark',
            'account_age_day',
        ];
        //按条件查询
        $data = Db::name('install_arrears')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
            ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
            ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
            ->select();

        $excel->exports($sheet_name, $head, $data, $keys);
    }
    //按条件导出安装历史欠款入金明细
    public function InstallArrearsIncomeExport(Request $request){
        $data = $request->param();
        $install_income_fyear = $data['install_income_fyear'];
        // 获取查询信息
        $contract_id = Session::get('installarrears_contract_id');
        $buyer_unit = Session::get('installarrears_buyer_unit');
        $branchs = Session::get('installarrears_company');
        $comprehensive_month = Session::get('installarrears_comprehensive_month');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=$install_income_fyear;
        //获取所在区域
        $companys=Session::get('company');
        if($super_admin==1){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'receipt_id',
            'e_id',
            'sign_area',
            'contract_type',
            'contract_id',
            'product_id',
            'periods',
            'income_name',
            'income_type',
            'amount_money',
            'split_amount',
            'status',
            'split_date',
            'entry_date',
            'income_date',
            'company_remarks',
            'audit_remarks',
            'delivery_date',
            'delivery_date_description',
            'reporting_period',
            'product_id_stage',
            'deviation_days',
            'condition',
            'company',
            'scompany',
            'arrears_type',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'payment_method',
            'buyer_unit',
            'income_classification',
            'fyear',
            'composite_month',
            'closing_date',
            'fix_expire_date'
        ];
        //设置表头：
        $head = [
            '发布编号'=>'string',
            '序号'=>'integer',
            '签订地区'=>'string',
            '合同大类'=>'string',
            '合同号'=>'string',
            '工号'=>'string',
            '期数'=>'string',
            '收款款型名称'=>'string',
            '款项类型'=>'string',
            '金额'=>'price',
            '拆分金额'=>'price',
            '状态'=>'string',
            '拆分日期'=>'date',
            '入账日期'=>'date',
            '入金日期'=>'date',
            '备注'=>'string',
            '审核备注'=>'string',
            '交货期'=>'string',
            '交货期说明'=>'string',
            '上报期间'=>'date',
            '工号阶段'=>'string',
            '偏差日期'=>'integer',
            '条件'=>'string',
            '区域'=>'string',
            '区域简称'=>'string',
            '欠款类型'=>'string',
            '账龄月'=>'integer',
            '账龄年'=>'string',
            '跟进人'=>'string',
            '事业部'=>'string',
            '付款方式'=>'string',
            '买方单位'=>'string',
            '入金分类[普通/一体化]'=>'string',
            '财年'=>'integer',
            '综合月'=>'integer',
            '截止日期'=>'date',
            '修正后到期应收日期'=>'date'
        ];
        $data = Db::name('install_income_history')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('fyear', '=', $fyear)
            ->select();
        $excel->exports('安装历史欠款入金明细', $head, $data, $keys);
    }
    //按导出安装历史欠款未拆分明细
    public function InstallArrearsUnSplitExport(){
        ini_set ('memory_limit', '4048M');
        ini_set ('max_execution_time', '120');
        // 获取查询信息
        $contract_id = Session::get('equipmentarrears_contract_id');
        $branchs = Session::get('equipmentarrears_company');
        $comprehensive_month = Session::get('equipmentarrears_comprehensive_month');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=Session::get('fyear');
        //获取所在区域
        $companys=Session::get('company');
        if($super_admin==1){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'business_entity',
            'contract_type',
            'contract_id',
            'contract_remark',
            'contract_status',
            'salesperson',
            'big_customer',
            'big_customer_name',
            'big_customer_short',
            'project_name',
            'customer_id',
            'customer',
            'clause_customer',
            'final_customer',
            'product_id',
            'sub_contract_id',
            'sub_contract_remark',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'income_type',
            'income_name',
            'periods',
            'contract_line_amount',
            'split_ratio',
            'original_amount',
            'modify_split_amount',
            'expected_split_amount',
            'payment_terms',
            'product_id_stage',
            'deviation_days',
            'expire_date',
            'received_amount',
            'arrears',
            'invoiced_amount',
            'bad_debt_amount',
            'acceptable',
            'company_reply',
            'collection_follower',
            'signer',
            'contract_sign_date',
            'project_location',
            'province',
            'region',
            'documentary_branch',
            'composite_month',
            'both_check_date',
            'transfer_customers_date',
            'latest_receipt_date',
            'litigation_expire_date',
            'appropriate_date',
            'filing_date',
            'letter_date',
            'approach_date',
            'issuing_date',
            'customer_received_date',
            'warranty_period',
            'under_warranty',
            'warranty_end',
            'maintenance_mobilization_date',
            'maintenance_completion_date',
            'victoria_station',
            'key_account',
            'big_project',
            'supervisor',
            'opportunity_attribute',
            'actual_completion_date',
            'customer_contract_id',
            'first_proofreading_date',
            'proofreading_date',
            'if_guarantee',
            'guarantee_type',
            'guarantee_ratio',
            'contract_id_and_periods',
            'unique_field',
            'report_reduction',
            'customer_type',
            'expire_arrears',
            'fix_project_name',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'assessment',
            'fyear',
            'comprehensive_month',
            'active_status',
            'arrears_type',
            'receipt_id'
        ];
        //设置表头：
        $head = [
            '业务实体' => 'string',
            '合同类型' => 'string',
            '合同号' => 'string',
            '合同备注' => 'string',
            '合同状态' => 'string',
            '销售业务员' => 'string',
            '大客户' => 'string',
            '大客户名称' => 'string',
            '大客户简称' => 'string',
            '项目名称' => 'string',
            '客户编码' => 'string',
            '客户' => 'string',
            '条款客户' => 'string',
            '最终客户' => 'string',
            '工号' => 'string',
            '附加工程合同号' => 'string',
            '附加合同备注' => 'string',
            '合同预收金额' => 'price',
            '合同实收金额' => 'price',
            '合同欠款金额' => 'price',
            '款项类型' => 'string',
            '收款款型名称' => 'string',
            '期数' => 'string',
            '合同行金额' => 'price',
            '拆分比例' => 'string',
            '原金额' => 'price',
            '修改费拆分金额' => 'price',
            '预计收款拆分金额' => 'price',
            '支付条件' => 'string',
            '工号阶段' => 'string',
            '偏差天数' => 'string',
            '到期应收日期' => 'date',
            '已收款金额' => 'price',
            '欠款金额' => 'price',
            '已开票金额'=> 'price',
            '已处理坏账金额'=> 'price',
            '是否可收'=> 'string',
            '分子公司回复'=> 'string',
            '收款跟进人'=> 'string',
            '合同签订人'=> 'string',
            '合同签订日期' => 'date',
            '工程地点' => 'string',
            '省份'=> 'string',
            '地区'=> 'string',
            '跟单分公司'=> 'string',
            '综合月'=> 'string',
            '双方验收日期'=> 'date',
            '移交客户日期'=> 'date',
            '合同最大收款日期'=> 'date',
            '诉讼时效到期日'=> 'date',
            '妥投日期'=> 'date',
            '立案日期'=> 'date',
            '函件日期'=> 'date',
            '进场日期'=> 'date',
            '技监发证日期'=> 'date',
            '客户接收日期'=> 'date',
            '保修起算期'=> 'date',
            '保修期'=> 'integer',
            '保修结束期'=> 'date',
            '维修进场日期'=> 'date',
            '维修完工日期'=> 'date',
            '维改站'=> 'string',
            '大客户1'=> 'string',
            '大项目'=> 'string',
            '工程监理'=> 'string',
            '商机属性'=> 'string',
            '实际安装完工日期'=> 'date',
            '对方合同号'=> 'string',
            '首次校对日期'=> 'date',
            '校对日期'=> 'date',
            '是否有保函'=> 'string',
            '保函种类'=> 'string',
            '保函比率'=> 'string',
            '合同号&期数'=> 'string',
            '条件'=> 'string',
            '山东司调减'=> 'price',
            '客户类型'=> 'string',
            '到期欠款'=> 'price',
            '修正后的项目名称'=> 'string',
            '账龄(月)'=> '0.00',
            '账龄(年)'=> 'string',
            '跟进人'=> 'string',
            '事业部'=> 'string',
            '区域'=> 'string',
            '区域简称'=> 'string',
            '是否考核'=> 'integer',
            '财年'=> 'integer',
            '截止日期'=> 'date',
            '激活状态'=> 'integer',
            '欠款种类'=> 'string',
            '收款编号'=>'string'
        ];
        $data = Db::name('install_arrears_unsplit')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('fyear', '=', $fyear)
            ->select();
        $excel->exports('安装历史欠款未拆分明细', $head, $data, $keys);
    }
    //总公司欠款回复
    public function InstallArrearsReplyHeadExport(Request $request){
        $data = $request->param();
        $comprehensive_month = $data['reply_head_product_closing_date'];
        $branchs = Session::get('installarrears_company');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=Session::get('fyear');
        //获取所在区域
        $companys=Session::get('company');
        if($super_admin==1){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'contract_id',
            'GROUP_CONCAT(CONCAT(periods,arrears_reason))'=>'arrears_reason'
        ];
        //设置表头：
        $head = [
            '合同号' => 'string',
            '欠款原因' => 'string'
        ];
        $data = Db::name('installarrears')
            ->field($keys)
            ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
            ->group('contract_id')
            ->select();
        $excel->exports('总部回复明细', $head, $data, $keys);
    }
    //按条件导出一体化合同应收明细

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function IntegrationArrearsExport(Request $request){
        $data = $request->param();
        $comprehensive_month = $data['integration_closing_date'];
        $branchs = Session::get('installarrears_company');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        if($super_admin==1){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //设置表头：
        $head = [
            '业务实体' => 'string',
            '合同类型' => 'string',
            '合同号' => 'string',
            '合同备注' => 'string',
            '合同状态' => 'string',
            '销售业务员' => 'string',
            '大客户' => 'string',
            '大客户名称' => 'string',
            '大客户简称' => 'string',
            '项目名称' => 'string',
            '客户编码' => 'string',
            '客户' => 'string',
            '条款客户' => 'string',
            '最终客户' => 'string',
            '工号' => 'string',
            '附加工程合同号' => 'string',
            '附加合同备注' => 'string',
            '合同预收金额' => 'price',
            '合同实收金额' => 'price',
            '合同欠款金额' => 'price',
            '款项类型' => 'string',
            '收款款型名称' => 'string',
            '期数' => 'string',
            '合同行金额' => 'price',
            '拆分比例' => 'string',
            '原金额' => 'price',
            '修改费拆分金额' => 'price',
            '预计收款拆分金额' => 'price',
            '支付条件' => 'string',
            '工号阶段' => 'string',
            '偏差天数' => 'string',
            '到期应收日期' => 'date',
            '已收款金额' => 'price',
            '欠款金额' => 'price',
            '已开票金额'=> 'price',
            '已处理坏账金额'=> 'price',
            '是否可收'=> 'string',
            '分子公司回复'=> 'string',
            '收款跟进人'=> 'string',
            '合同签订人'=> 'string',
            '合同签订日期' => 'date',
            '工程地点' => 'string',
            '省份'=> 'string',
            '地区'=> 'string',
            '跟单分公司'=> 'string',
            '综合月'=> 'string',
            '双方验收日期'=> 'date',
            '移交客户日期'=> 'date',
            '合同最大收款日期'=> 'date',
            '诉讼时效到期日'=> 'date',
            '妥投日期'=> 'date',
            '立案日期'=> 'date',
            '函件日期'=> 'date',
            '进场日期'=> 'date',
            '技监发证日期'=> 'date',
            '客户接收日期'=> 'date',
            '保修起算期'=> 'date',
            '保修期'=> 'integer',
            '保修结束期'=> 'date',
            '维修进场日期'=> 'date',
            '维修完工日期'=> 'date',
            '维改站'=> 'string',
            '大客户1'=> 'string',
            '大项目'=> 'string',
            '工程监理'=> 'string',
            '商机属性'=> 'string',
            '实际安装完工日期'=> 'date',
            '对方合同号'=> 'string',
            '首次校对日期'=> 'date',
            '校对日期'=> 'date',
            '是否有保函'=> 'string',
            '保函种类'=> 'string',
            '保函比率'=> 'string',
            '合同号&期数'=> 'string',
            '条件'=> 'string',
            '山东司调减'=> 'price',
            '客户类型'=> 'string',
            '到期欠款'=> 'price',
            '修正后的项目名称'=> 'string',
            '账龄(月)'=> '0.00',
            '账龄(年)'=> 'string',
            '跟进人'=> 'string',
            '事业部'=> 'string',
            '区域'=> 'string',
            '区域简称'=> 'string',
            '是否考核'=> 'integer',
            '财年'=> 'integer',
            '截止日期'=> 'date',
            '激活状态'=> 'integer',
            '欠款种类'=> 'string',
            '实际回收金额'=> 'price',
            '客户分类'=> 'string',
            '客户简称'=> 'string',
            '修正后到期应收日期' => 'date',
            'C标识' => 'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'business_entity',
            'contract_type',
            'contract_id',
            'contract_remark',
            'contract_status',
            'salesperson',
            'big_customer',
            'big_customer_name',
            'big_customer_short',
            'project_name',
            'customer_id',
            'customer',
            'clause_customer',
            'final_customer',
            'product_id',
            'sub_contract_id',
            'sub_contract_remark',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'income_type',
            'income_name',
            'periods',
            'contract_line_amount',
            'split_ratio',
            'original_amount',
            'modify_split_amount',
            'expected_split_amount',
            'payment_terms',
            'product_id_stage',
            'deviation_days',
            'IF(expire_date="0000-00-00","",expire_date)'=>'expire_date',
            'received_amount',
            'arrears',
            'invoiced_amount',
            'bad_debt_amount',
            'acceptable',
            'company_reply',
            'collection_follower',
            'signer',
            'IF(contract_sign_date="0000-00-00","",contract_sign_date)'=>'contract_sign_date',
            'project_location',
            'province',
            'region',
            'documentary_branch',
            'composite_month',
            'IF(both_check_date="0000-00-00","",both_check_date)'=>'both_check_date',
            'IF(transfer_customers_date="0000-00-00","",transfer_customers_date)'=>'transfer_customers_date',
            'IF(latest_receipt_date="0000-00-00","",latest_receipt_date)'=>'latest_receipt_date',
            'IF(litigation_expire_date="0000-00-00","",litigation_expire_date)'=>'litigation_expire_date',
            'IF(appropriate_date="0000-00-00","",appropriate_date)'=>'appropriate_date',
            'IF(filing_date="0000-00-00","",filing_date)'=>'filing_date',
            'IF(letter_date="0000-00-00","",letter_date)'=>'letter_date',
            'IF(approach_date="0000-00-00","",approach_date)'=>'approach_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(customer_received_date="0000-00-00","",customer_received_date)'=>'customer_received_date',
            'IF(warranty_period="0000-00-00","",warranty_period)'=>'warranty_period',
            'under_warranty',
            'IF(warranty_end="0000-00-00","",warranty_end)'=>'warranty_end',
            'IF(maintenance_mobilization_date="0000-00-00","",maintenance_mobilization_date)'=>'maintenance_mobilization_date',
            'IF(maintenance_completion_date="0000-00-00","",maintenance_completion_date)'=>'maintenance_completion_date',
            'victoria_station',
            'key_account',
            'big_project',
            'supervisor',
            'opportunity_attribute',
            'IF(actual_completion_date="0000-00-00","",actual_completion_date)'=>'actual_completion_date',
            'customer_contract_id',
            'IF(first_proofreading_date="0000-00-00","",first_proofreading_date)'=>'first_proofreading_date',
            'IF(proofreading_date="0000-00-00","",proofreading_date)'=>'proofreading_date',
            'if_guarantee',
            'guarantee_type',
            'guarantee_ratio',
            'contract_id_and_periods',
            'unique_field',
            'report_reduction',
            'customer_type',
            'expire_arrears',
            'fix_project_name',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'assessment',
            'fyear',
            'comprehensive_month',
            'active_status',
            'arrears_type',
            'actual_collection_money',
            'customer_classification',
            'customer_abbreviation',
            'IF(expire_date="0000-00-00","",expire_date)'=>'fix_expire_date',
            'c_mark'
        ];
        //按条件查询
        $data = Db::name('integration_arrears')
            ->field($keys)
            ->where('company', 'like', '%' . $branch . '%')
            ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
            ->select();
        $excel->exports('一体化合同应收款工号明细', $head, $data, $keys);
    }
    /**
     * API
     */
    //事业部收款预计
    function jsonDataBuInstallPredict(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sql="
        SELECT
        C.bu_name,
				D.bu_sname,
				D.company,
        IFNULL(month4_1,0) AS month4_1,
        IFNULL(month4_2,0) AS month4_2,
        IFNULL(month5_1,0) AS month5_1,
        IFNULL(month5_2,0) AS month5_2,
        IFNULL(month6_1,0) AS month6_1,
        IFNULL(month6_2,0) AS month6_2,
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_1,0) AS month8_1,
        IFNULL(month8_2,0) AS month8_2,
        IFNULL(month9_1,0) AS month9_1,
        IFNULL(month9_2,0) AS month9_2,
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_1,0) AS total_1,
        IFNULL(total_2,0) AS total_2
    FROM
    (SELECT
        A.bu_name,
				A.bu_sname,
				A.company,
        IFNULL(month4_1,0) AS month4_1,	
        IFNULL(month5_1,0) AS month5_1,	
        IFNULL(month6_1,0) AS month6_1,	
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month8_1,0) AS month8_1,	
        IFNULL(month9_1,0) AS month9_1,	
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(total_1,0) AS total_1
    FROM
        ( SELECT bu_name,bu_sname,SUBSTRING( company, 1, 2 ) AS company FROM helc_buscore WHERE `year` = '$fyear' AND `status`=1) AS A
        LEFT JOIN (
        SELECT
            IFNULL( bu_name, '合计' ) AS bu_name,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '4' THEN this_year_arrears_expected ELSE 0 END ) AS month4_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '5' THEN this_year_arrears_expected ELSE 0 END ) AS month5_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '6' THEN this_year_arrears_expected ELSE 0 END ) AS month6_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '7' THEN this_year_arrears_expected ELSE 0 END ) AS month7_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '8' THEN this_year_arrears_expected ELSE 0 END ) AS month8_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '9' THEN this_year_arrears_expected ELSE 0 END ) AS month9_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '10' THEN this_year_arrears_expected ELSE 0 END ) AS month10_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '11' THEN this_year_arrears_expected ELSE 0 END ) AS month11_1,		
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '12' THEN this_year_arrears_expected ELSE 0 END ) AS month12_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '1' THEN this_year_arrears_expected ELSE 0 END ) AS month1_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '2' THEN this_year_arrears_expected ELSE 0 END ) AS month2_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '3' THEN this_year_arrears_expected ELSE 0 END ) AS month3_1,
            sum( this_year_arrears_expected ) AS total_1
        FROM
            helc_installarrears 
        WHERE
              active_status = 1 
            AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            bu_name
        ) AS B ON A.bu_name = B.bu_name) AS C
        LEFT JOIN
            (SELECT
        A.bu_name,
				A.bu_sname,
				A.company,
        IFNULL(month4_2,0) AS month4_2,	
        IFNULL(month5_2,0) AS month5_2,	
        IFNULL(month6_2,0) AS month6_2,	
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_2,0) AS month8_2,	
        IFNULL(month9_2,0) AS month9_2,	
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_2,0) AS total_2
    FROM
        ( SELECT bu_name,bu_sname,SUBSTRING( company, 1, 2 ) AS company FROM helc_buscore WHERE `year` = '$fyear' AND `status`=1 ) AS A
        LEFT JOIN (
        SELECT
            IFNULL( bu_name, '合计' ) AS bu_name,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '4' THEN history_arrears_expected ELSE 0 END ) AS month4_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '5' THEN history_arrears_expected ELSE 0 END ) AS month5_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '6' THEN history_arrears_expected ELSE 0 END ) AS month6_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '7' THEN history_arrears_expected ELSE 0 END ) AS month7_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '8' THEN history_arrears_expected ELSE 0 END ) AS month8_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '9' THEN history_arrears_expected ELSE 0 END ) AS month9_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '10' THEN history_arrears_expected ELSE 0 END ) AS month10_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '11' THEN history_arrears_expected ELSE 0 END ) AS month11_2,		
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '12' THEN history_arrears_expected ELSE 0 END ) AS month12_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '1' THEN history_arrears_expected ELSE 0 END ) AS month1_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '2' THEN history_arrears_expected ELSE 0 END ) AS month2_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '3' THEN history_arrears_expected ELSE 0 END ) AS month3_2,
            sum( history_arrears_expected ) AS total_2
        FROM
            helc_installarrears 
        WHERE
              active_status = 1 
            AND history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            bu_name 
        ) AS B ON A.bu_name = B.bu_name) AS D
        ON C.bu_name=D.bu_name
				ORDER BY field(D.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽')
        ";
        $data=Db::query($sql);
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //安装欠款按期数分月统计
    function installArrearsOrderByMonthAndPeriod(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sql="
      SELECT
	periods,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month4,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month5,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month6,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month7,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month8,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month9,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month10,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month11,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month12,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month1,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month2,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 2 ) AS month3
FROM
	helc_installarrears 
WHERE
	comprehensive_month BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY
	periods 
ORDER BY
	field( periods, '一期', '二期', '三期', '四期')
        ";
        $data=Db::query($sql);
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

}
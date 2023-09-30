<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Equipmentarrears;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class EquipmentarrearsController extends IndexController{
    //显示表单
    public function index(){
        return $this->fetch();
    }
    //通过ID获取欠款信息
    public function GetEquipmentArrearsInfo(){
        $id = $this->request->param("id");
        try {
            $data = Db::name('equipmentarrears')->where('id', '=', $id)->select();
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
    public function GetEquipmentArrearsInfoByContractId(Request $request){
        $requestData=$request->param();
        $contract_id = $requestData['contract_id'];
        $data = Db::name('equipmentarrears')
            ->where('contract_id', '=', $contract_id)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //通过ID获取欠款信息

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetEquipmentArrearsInfoByCondition(Request $request){
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
            $data = Db::name('equipmentarrears')
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
                    $data = Db::name('equipmentarrears')
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
                    $data = Db::name('equipmentarrears')
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
                    $data = Db::name('equipmentarrears')
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
                    $data = Db::name('equipmentarrears')
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
    //获取截止日期

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetClosingDate(){
        $ClosingDates= Db::table('helc_equipmentarrears')
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
    public function GetEquipmentIncomeHistoryFyear(){
        $ClosingDates= Db::table('helc_equipment_income_history')
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
        $check=Db::name('equipmentarrears')->where(['id' => $data['update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('equipmentarrears')->update($update_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            if($result){
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(0);
            }
        }else{
            $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
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
        $check=Db::name('equipmentarrears')->where(['id' => $data['update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('equipmentarrears')->update($update_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            if($result){
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(0);
            }
        }else{
            $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
            return json(0);
        }
    }
    //仅更新跟进人和事业部
    public function onlysave($update_id,$update_company,$update_follow_person,$update_bu_name,$update_last_month_arrears_method,$update_arrears_reason){
        $scompany=mb_substr($update_company,0,4,'gbk');
        $data=array(
            'company' => $update_company,
            'scompany' => $scompany,
            'follow_person' => $update_follow_person,
            'bu_name' => $update_bu_name,
            'id' => $update_id
        );

        $check=Db::name('equipmentarrears')->where(['id' => $update_id])->count();
        if($check>0){
            $result=Db::name('equipmentarrears')->update($data);
            if($result){
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(1);
            }else{
                $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
                return json(0);
            }
        }else{
            $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
            return json(0);
        }
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
        $check=Db::name('equipmentarrears')->where(['id' => $data['f_update_id']])->count();
        if($check>0){
            try {
                $result = Db::name('equipmentarrears')->update($update_data);
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
    //批量审核
    public function BatchAudit($batch_audit_id){
        $id=array();
        $id=explode(",", $batch_audit_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'arrears_status' =>  '已审核',
                'id' =>  $id[$i]
            );
            $result=Db::name('equipmentarrears')->update($batch_data);
        }
        if($result){
            $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
            return json(1);
        }else{
            $CallFunction = Db::execute("CALL EquipmentArrearsUpdate;");
            return json(0);
        }

    }
    //----------------------------------------数据导出--------------------------------------------------//
    //按条件导出合同信息
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function EquipmentArrearsContractExport(Request $request){
        $data = $request->param();
        $closing_date = $data['closing_date'];

        // 获取查询信息
        $contract_id = Session::get('equipmentarrears_contract_id');
        $buyer_unit = Session::get('equipmentarrears_buyer_unit');
        $comprehensive_month = Session::get('comprehensive_month');
        $branchs = Session::get('equipmentarrears_company');
        $arrears_status = Session::get('equipmentarrears_arrears_status');
        $comprehensive_month = $closing_date;
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
        //设置字段
        $keys = [
            'arrears_status',
            'contract_id',
            'contract_id_and_periods',
            'clause_customer',
            'fix_project_name',
            'customer_type',
            'expire_date',
            'account_age_month',
            'account_age_year',
            'periods',
            'litigation_expire_date',
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
            'legal_status',
            'actual_collection_money',
            'min_account_age_month',
            'max_account_age_month',
            'follow_up_level',
            'solutions',
            'solution_progress',

        ];
        //设置表头：
        $head = [
            '状态'=>'string',
            '合同号'=>'string',
            '合同号&期数'=>'string',
            '条款客户'=>'string',
            '项目名称'=>'string',
            '客户类型'=>'string',
            '到期应收日期'=>'date',
            '账龄(月)'=>'price',
            '账龄(年)'=>'string',
            '期数'=>'string',
            '诉讼时效到期日'=>'date',
            '合同预收金额'=>'price',
            '合同实收金额'=>'price',
            '合同欠款金额'=>'price',
            '已开票金额'=>'price',
            '欠款金额'=>'price',
            '已处理坏账金额'=>'price',
            '山东司调减'=>'price',
            '到期欠款'=>'price',
            '跟进人'=>'string',
            '事业部'=>'string',
            '区域'=>'string',
            '区域简称'=>'string',
            '财年'=>'integer',
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
            '法务状态' => 'string',
            '实际收款总金额' => 'price',
            '最小账龄' => 'string',
            '最长账龄' => 'price',
            '跟进级别' => 'integer',
            '解决方案' => 'string',
            '解决进度' => 'string',
        ];
        //查询数据
        $data = Db::name('equipmentarrears')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('clause_customer', 'like', '%' . $buyer_unit . '%')
            ->where('comprehensive_month', 'like', '%' . $comprehensive_month . '%')
            ->where('arrears_status', 'like', '%' . $arrears_status . '%')
            ->select();
        $excel->exports('设备欠款合同明细', $head, $data, $keys);
    }
    //按条件导出工号信息

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function EquipmentProductArrearsExport(Request $request){
        $data = $request->param();
        $closing_date = $data['product_closing_date'];
        ini_set ('memory_limit', '2048M');
        set_time_limit(0);
        // 获取查询信息
        $contract_id = Session::get('equipmentarrears_contract_id');
        $buyer_unit = Session::get('equipmentarrears_buyer_unit');
        $customer_abbreviation = Session::get('equipmentarrears_customer_abbreviation');
        $branchs = Session::get('equipmentarrears_company');
        $comprehensive_month = $closing_date;
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
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'closing_month',
            'business_entity',
            'collection_department',
            'contract_id',
            'contract_type',
            'product_id',
            'business_category',
            'equipment_number',
            'equipment_settlement_price',
            'income_type',
            'income_name',
            'periods',
            'split_ratio',
            'product_id_stage',
            'deviation_days',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'expected_split_amount',
            'received_amount',
            'arrears',
            'product_invoice',
            'financial_receivable',
            'financial_advance',
            'payment_terms',
            'original_amount',
            'modify_split_amount',
            'composite_month',
            'abc_mark',
            'shift_sign',
            'signing_branch',
            'region',
            'new_region',
            'signer',
            'salesperson',
            'customer',
            'project_name',
            'customer_contract_id',
            'if_head_install',
            'use_unit',
            'documentary_branch',
            'key_account',
            'big_project',
            'bad_debt_amount',
            'latest_receipt_date',
            'both_check_date',
            'litigation_expire_date',
            'litigation_expire_mark',
            'contract_sign_date',
            'expire_date',
            'closing_date',
            'account_age_days',
            'account_age_type',
            'scheduled_release_date',
            'scheduled_output_date',
            'planned_output_date',
            'actual_output_date',
            'delivery_date',
            'fob',
            'arrival_date',
            'approach_date',
            'issuing_date',
            'actual_completion_date',
            'person_liable',
            'business_information',
            'max_appropriate_date',
            'max_filing_date',
            'letter_date',
            'customer_received_date',
            'transfer_customers_date',
            'completion_date',
            'settlement_complete_date',
            'audit_completed_date',
            'clause_customer',
            'elevator_type',
            'collection_letter_no',
            'litigation_letter_no',
            'appropriate_date',
            'filing_date',
            'acceptable',
            'company_reply',
            'company_reply_simple',
            'customer_type',
            'branch_tripartite_contract',
            'agent_tripartite_contract',
            'big_customer_short',
            'big_customer_name',
            'big_customer_mark',
            'big_project_mark',
            'currency',
            'rate',
            'rmb_rate',
            'expected_split_amount_rmb',
            'arrears_rmb',
            'expected_split_amount_usd',
            'arrears_usd',
            'sales_country',
            'social_system',
            'customer_category',
            'IF(report_commissioning_date="0000-00-00","",report_commissioning_date)'=>'report_commissioning_date',
            'IF(commissioning_complete_date="0000-00-00","",commissioning_complete_date)'=>'commissioning_complete_date',
            'unique_field',
            'contract_id_and_periods',
            'report_reduction',
            'expire_arrears',
            'fix_customer_type',
            'fix_project_name',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'assessment',
            'fyear',
            'active_status',
            'arrears_type',
            'actual_collection_money',
            'customer_classification',
            'customer_abbreviation',
            'letter_level',
            'sent_letter_type',
            'fix_expire_date',
            'node_apply_process',
            'assess_mark',
            'money_detail_id',
        ];
        //设置表头：
        $head = [
            '截止月份'=>'integer',
            '业务实体'=>'string',
            '催收部门'=>'string',
            '合同编号'=>'string',
            '合同类型'=>'string',
            '工号'=>'string',
            '事业别'=>'string',
            '设备号'=>'string',
            '设备结算价'=>'string',
            '款项类型'=>'string',
            '收款款型名称'=>'string',
            '期数'=>'string',
            '比率'=>'integer',
            '工号阶段'=>'string',
            '偏差日期'=>'integer',
            '合同预收金额'=>'price',
            '合同实收金额'=>'price',
            '合同欠款金额'=>'price',
            '预计收款金额'=>'price',
            '实际收款金额'=>'price',
            '欠款金额'=>'price',
            '工号已开票金额'=>'price',
            '财务应收金额'=>'price',
            '财务预收金额'=>'price',
            '支付条件'=>'string',
            '原金额'=>'price',
            '修改金额'=>'price',
            '综合月'=>'string',
            'ABC标识'=>'string',
            '推移标识'=>'string',
            '签订分公司'=>'string',
            '签订地区'=>'string',
            '新地区'=>'string',
            '合同签订人'=>'string',
            '合同责任人'=>'string',
            '客户'=>'string',
            '项目名称'=>'string',
            '对方合同号'=>'string',
            '是否总部安装合同'=>'string',
            '使用单位'=>'string',
            '跟单分公司'=>'string',
            '大客户'=>'string',
            '大项目'=>'string',
            '已处理坏账金额'=>'price',
            '最近实际收款日期'=>'date',
            '双方验收日期'=>'date',
            '诉讼时效到期日'=>'date',
            '诉讼到期标识'=>'string',
            '合同签订日期'=>'date',
            '到期应收日期'=>'date',
            '截止日期'=>'date',
            '账龄天数'=>'int',
            '账龄分类'=>'string',
            '预排产下达日期'=>'date',
            '预排产产出日期'=>'date',
            '计划产出日期'=>'date',
            '实际产出日期'=>'date',
            '出仓日期'=>'date',
            'FOB装船日期'=>'date',
            '货到地盘日期'=>'date',
            '安装进场日期'=>'date',
            '技监发证日期'=>'date',
            '上报完工日期'=>'date',
            '销售业务科责任人'=>'string',
            '商务信息'=>'string',
            '最大妥投日期'=>'date',
            '最大立案日期'=>'date',
            '最大函件日期'=>'date',
            '甲方开箱检验日期'=>'date',
            '移交客户日期'=>'date',
            '项目整体竣工日期'=>'date',
            '结算书完成日期'=>'date',
            '审计完成日期'=>'date',
            '条款客户'=>'string',
            '梯种说明'=>'string',
            '函字'=>'string',
            '诉字'=>'string',
            '妥投日期'=>'date',
            '立案日期'=>'date',
            '是否可收'=>'string',
            '分子公司回复'=>'string',
            '回复简称'=>'string',
            '客户分类'=>'string',
            '营销司三方合同'=>'string',
            '代理网点三方合同'=>'string',
            '大客户简称'=>'string',
            '大客户名称'=>'string',
            '大客户标识'=>'string',
            '大项目标识'=>'string',
            '币种'=>'string',
            '兑人民币汇率'=>'price',
            '人民币兑美元汇率'=>'price',
            '预计收款金额RMB'=>'price',
            '欠款金额RMB'=>'price',
            '预计收款金额USD'=>'price',
            '欠款金额USD'=>'price',
            '销售国家地区'=>'string',
            '社系'=>'string',
            '客户类别'=>'string',
            '报调日期'=>'date',
            '调试完成日期'=>'date',
            '条件'=>'string',
            '合同号&期数'=>'string',
            '山东司调减'=>'price',
            '当月到期欠款'=>'price',
            '修正后客户类型'=>'string',
            '修正后项目名称'=>'string',
            '账龄(月)'=>'price',
            '账龄(年)'=>'string',
            '跟进人'=>'string',
            '事业部'=>'string',
            '分公司'=>'string',
            '区域简称'=>'string',
            '是否考核'=>'integer',
            '财年'=>'integer',
            '激活状态'=>'integer',
            '欠款分类'=>'string',
            '实际回收金额'=> 'price',
            '客户最终分类'=> 'string',
            '客户简称'=> 'string',
            '发函级别'=> 'string',
            '已发函属性'=> 'string',
            '修正到期应收日期'=>'date',
            '节点申请流程'=> 'string',
            '考核标识'=> 'string',
            '欠款详细ID'=> 'integer',
        ];
        $data = Db::name('equipment_arrears')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('customer', 'like', '%' . $buyer_unit . '%')
            ->where('closing_date', 'like', '%' . $comprehensive_month . '%')
            ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
            ->select();
        $excel->exports('设备欠款工号明细', $head, $data, $keys);
    }
    //按条件导出设备历史欠款入金明细
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function EquipmentProductArrearsIncomeExport(Request $request){
        $data = $request->param();
        $equipment_income_fyear = $data['equipment_income_fyear'];
        ini_set ('memory_limit', '4048M');
        ini_set ('max_execution_time', '120');
        // 获取查询信息
        $contract_id = Session::get('equipmentarrears_contract_id');
        $buyer_unit = Session::get('equipmentarrears_buyer_unit');
        $branchs = Session::get('equipmentarrears_company');
        $comprehensive_month = Session::get('equipmentarrears_comprehensive_month');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=$equipment_income_fyear;
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
            'period',
            'business_entity',
            'receipt_id',
            'contract_type',
            'contract_id',
            'product_id',
            'opportunity_properties',
            'collection_department',
            'career',
            'customer',
            'signing_branch',
            'region',
            'new_region',
            'province_company',
            'key_account',
            'big_project',
            'business_information',
            'use_unit',
            'person_liable',
            'delivery_date',
            'composite_month',
            'abc_mark',
            'income_mark',
            'income_name',
            'income_type',
            'periods',
            'product_id_stage',
            'deviation_days',
            'expire_date',
            'account_age',
            'account_age_type',
            'split_amount',
            'fix_split_amount',
            'status',
            'split_date',
            'income_date',
            'branch_tripartite',
            'agent_tripartite',
            'customer_type',
            'big_customer_short',
            'big_project_mark',
            'big_customer_mark',
            'branch_reply',
            'collection_letter_no',
            'litigation_letter_no',
            'collection_letter_date',
            'filing_date',
            'currency',
            'exchange_rate',
            'split_remarks',
            'bank_account',
            'unique_field',
            'company',
            'scompany',
            'arrears_type',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'payment_method',
            'fyear',
            'closing_date',
            'fix_expire_date',
        ];
        //设置表头：
        $head = [
            '期间'=>'integer',
            '业务实体'=>'string',
            '收款编号'=>'string',
            '合同类型'=>'string',
            '合同编号'=>'string',
            '生产工号'=>'string',
            '商机属性'=>'string',
            '催收部门'=>'string',
            '事业别'=>'string',
            '客户'=>'string',
            '签订分公司'=>'string',
            '合同签订地区'=>'string',
            '新地区'=>'string',
            '省级司'=>'string',
            '大客户'=>'string',
            '大项目'=>'string',
            '商务信息'=>'string',
            '使用单位'=>'string',
            '销售业务科责任人'=>'string',
            '出仓日期'=>'date',
            '综合月'=>'integer',
            'ABC标识'=>'string',
            '入金标识'=>'string',
            '收款款型名称'=>'string',
            '款项类型'=>'string',
            '期数'=>'string',
            '工号阶段'=>'string',
            '偏差日期'=>'integer',
            '到期应收日期'=>'date',
            '账龄天数'=>'string',
            '账龄分类'=>'string',
            '收款拆分金额'=>'price',
            '修正后收款拆分金额'=>'price',
            '状态'=>'string',
            '拆分日期'=>'date',
            '入金日期'=>'date',
            '营销司三方合同'=>'string',
            '代理网点三方合同'=>'string',
            '客户分类'=>'string',
            '大客户简称'=>'string',
            '大项目标识'=>'string',
            '大客户标识'=>'string',
            '分子公司回复'=>'string',
            '函字'=>'string',
            '诉字'=>'string',
            '发函日期'=>'date',
            '立案日期'=>'date',
            '币种'=>'string',
            '汇率'=>'string',
            '拆分备注'=>'string',
            '银行账户'=>'string',
            '条件'=>'string',
            '区域'=>'string',
            '区域简称'=>'string',
            '欠款类型'=>'string',
            '账龄月'=>'0.00',
            '账龄年'=>'string',
            '跟进人'=>'string',
            '事业部'=>'string',
            '付款方式'=>'string',
            '财年'=>'integer',
            '截止日期'=>'date',
            '修正到期应收日期'=>'date',
        ];
        $data = Db::name('equipment_income_history')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('fyear', '=', $fyear)
            ->select();
        $excel->exports('设备历史欠款入金明细', $head, $data, $keys);
    }
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    //按导出设备历史欠款未拆分明细
    public function EquipmentArrearsUnSplitExport(){
        ini_set ('memory_limit', '4048M');
        ini_set ('max_execution_time', '120');
        // 获取查询信息
        $contract_id = Session::get('equipmentarrears_contract_id');
        $buyer_unit = Session::get('equipmentarrears_buyer_unit');
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
            'closing_month',
            'business_entity',
            'collection_department',
            'contract_id',
            'contract_type',
            'product_id',
            'business_category',
            'equipment_number',
            'equipment_settlement_price',
            'income_type',
            'income_name',
            'periods',
            'split_ratio',
            'product_id_stage',
            'deviation_days',
            'contract_advance',
            'contract_received',
            'contract_arrears',
            'expected_split_amount',
            'received_amount',
            'arrears',
            'product_invoice',
            'financial_receivable',
            'financial_advance',
            'payment_terms',
            'original_amount',
            'modify_split_amount',
            'composite_month',
            'abc_mark',
            'shift_sign',
            'signing_branch',
            'region',
            'new_region',
            'signer',
            'salesperson',
            'customer',
            'project_name',
            'customer_contract_id',
            'if_head_install',
            'use_unit',
            'documentary_branch',
            'key_account',
            'big_project',
            'bad_debt_amount',
            'latest_receipt_date',
            'both_check_date',
            'litigation_expire_date',
            'litigation_expire_mark',
            'contract_sign_date',
            'expire_date',
            'closing_date',
            'account_age_days',
            'account_age_type',
            'scheduled_release_date',
            'scheduled_output_date',
            'planned_output_date',
            'actual_output_date',
            'delivery_date',
            'fob',
            'arrival_date',
            'approach_date',
            'issuing_date',
            'actual_completion_date',
            'person_liable',
            'business_information',
            'max_appropriate_date',
            'max_filing_date',
            'letter_date',
            'customer_received_date',
            'transfer_customers_date',
            'completion_date',
            'settlement_complete_date',
            'audit_completed_date',
            'clause_customer',
            'elevator_type',
            'collection_letter_no',
            'litigation_letter_no',
            'appropriate_date',
            'filing_date',
            'acceptable',
            'company_reply',
            'company_reply_simple',
            'customer_type',
            'branch_tripartite_contract',
            'agent_tripartite_contract',
            'big_customer_short',
            'big_customer_name',
            'big_customer_mark',
            'big_project_mark',
            'currency',
            'rate',
            'rmb_rate',
            'expected_split_amount_rmb',
            'arrears_rmb',
            'expected_split_amount_usd',
            'arrears_usd',
            'sales_country',
            'social_system',
            'customer_category',
            'unique_field',
            'contract_id_and_periods',
            'report_reduction',
            'expire_arrears',
            'fix_customer_type',
            'fix_project_name',
            'account_age_month',
            'account_age_year',
            'follow_person',
            'bu_name',
            'company',
            'scompany',
            'assessment',
            'fyear',
            'active_status',
            'arrears_type',
            'receipt_id'
        ];
        //设置表头：
        $head = [
            '截止月份'=>'integer',
            '业务实体'=>'string',
            '催收部门'=>'string',
            '合同编号'=>'string',
            '合同类型'=>'string',
            '工号'=>'string',
            '事业别'=>'string',
            '设备号'=>'string',
            '设备结算价'=>'string',
            '款项类型'=>'string',
            '收款款型名称'=>'string',
            '期数'=>'string',
            '比率'=>'integer',
            '工号阶段'=>'string',
            '偏差日期'=>'integer',
            '合同预收金额'=>'price',
            '合同实收金额'=>'price',
            '合同欠款金额'=>'price',
            '预计收款金额'=>'price',
            '实际收款金额'=>'price',
            '欠款金额'=>'price',
            '工号已开票金额'=>'price',
            '财务应收金额'=>'price',
            '财务预收金额'=>'price',
            '支付条件'=>'string',
            '原金额'=>'price',
            '修改金额'=>'price',
            '综合月'=>'string',
            'ABC标识'=>'string',
            '推移标识'=>'string',
            '签订分公司'=>'string',
            '签订地区'=>'string',
            '新地区'=>'string',
            '合同签订人'=>'string',
            '合同责任人'=>'string',
            '客户'=>'string',
            '项目名称'=>'string',
            '对方合同号'=>'string',
            '是否总部安装合同'=>'string',
            '使用单位'=>'string',
            '跟单分公司'=>'string',
            '大客户'=>'string',
            '大项目'=>'string',
            '已处理坏账金额'=>'price',
            '最近实际收款日期'=>'date',
            '双方验收日期'=>'date',
            '诉讼时效到期日'=>'date',
            '诉讼到期标识'=>'string',
            '合同签订日期'=>'date',
            '到期应收日期'=>'date',
            '截止日期'=>'date',
            '账龄天数'=>'string',
            '账龄分类'=>'string',
            '预排产下达日期'=>'date',
            '预排产产出日期'=>'date',
            '计划产出日期'=>'date',
            '实际产出日期'=>'date',
            '出仓日期'=>'date',
            'FOB装船日期'=>'date',
            '货到地盘日期'=>'date',
            '安装进场日期'=>'date',
            '技监发证日期'=>'date',
            '上报完工日期'=>'date',
            '销售业务科责任人'=>'string',
            '商务信息'=>'string',
            '最大妥投日期'=>'date',
            '最大立案日期'=>'date',
            '最大函件日期'=>'date',
            '甲方开箱检验日期'=>'date',
            '移交客户日期'=>'date',
            '项目整体竣工日期'=>'date',
            '结算书完成日期'=>'date',
            '审计完成日期'=>'date',
            '条款客户'=>'string',
            '梯种说明'=>'string',
            '函字'=>'string',
            '诉字'=>'string',
            '妥投日期'=>'date',
            '立案日期'=>'date',
            '是否可收'=>'string',
            '分子公司回复'=>'string',
            '回复简称'=>'string',
            '客户分类'=>'string',
            '营销司三方合同'=>'string',
            '代理网点三方合同'=>'string',
            '大客户简称'=>'string',
            '大客户名称'=>'string',
            '大客户标识'=>'string',
            '大项目标识'=>'string',
            '币种'=>'string',
            '兑人民币汇率'=>'price',
            '人民币兑美元汇率'=>'price',
            '预计收款金额RMB'=>'price',
            '欠款金额RMB'=>'price',
            '预计收款金额USD'=>'price',
            '欠款金额USD'=>'price',
            '销售国家地区'=>'string',
            '社系'=>'string',
            '客户类别'=>'string',
            '条件'=>'string',
            '合同号&期数'=>'string',
            '山东司调减'=>'price',
            '当月到期欠款'=>'price',
            '修正后客户类型'=>'string',
            '修正后项目名称'=>'string',
            '账龄(月)'=>'price',
            '账龄(年)'=>'string',
            '跟进人'=>'string',
            '事业部'=>'string',
            '分公司'=>'string',
            '区域简称'=>'string',
            '是否考核'=>'integer',
            '财年'=>'integer',
            '激活状态'=>'integer',
            '欠款分类'=>'string',
            '收款编号'=>'string'
        ];
        $data = Db::name('equipment_arrears_unsplit')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('company', 'like', '%' . $branch . '%')
            ->where('fyear', '=', $fyear)
            ->select();
        $excel->exports('设备历史欠款未拆分明细', $head, $data, $keys);
    }
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    //总公司欠款回复
    public function EquipmentArrearsHeadExport(Request $request){
        $data = $request->param();
        $comprehensive_month = $data['reply_head_product_closing_date'];
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
        $data = Db::name('equipmentarrears')
            ->field($keys)
            ->where('comprehensive_month', '=', $comprehensive_month)
            ->group('contract_id')
            ->select();
        $excel->exports('总部回复明细', $head, $data, $keys);
    }
    /**
     * Api
     */
    //事业部设备收款预测
    function jsonDataBuEquipmentPredict(){
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
        ( SELECT bu_name,bu_sname,SUBSTRING( company, 1, 2 ) AS company FROM helc_buscore WHERE `year` = '$fyear' AND `status`=1 ) AS A
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
            helc_equipmentarrears 
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
            helc_equipmentarrears 
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
        echo json_encode($data);
    }

    //设备欠款按期数分月统计
    function equipmentArrearsOrderByMonthAndPeriod(){
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
	helc_equipmentarrears 
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
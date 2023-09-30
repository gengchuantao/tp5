<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Quote;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class QuoteController extends IndexController {
    public function index(Request $request){
        $requestData=$request->param();
        $jump_project_name = $requestData['project_name'];
        Session::set('jump_project_name',$jump_project_name);
        return $this->fetch();
    }
    //新建项目
    function NewProject($project_name,$project_type,$bidding_type,$bid_type,$province,$city,$county,$quote_num,$bidding_company,$buyer_unit,$customer_classification,$big_client_code,$bid_opening_date,$branch_office,$sales_person,$elevator_model,$building_height){
        $company=session::get('company');
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        // 实例化
        $data[] = [
            'project_name' => $project_name,
            'project_type' => $project_type,
            'bidding_type' => $bidding_type,
            'bid_type' => $bid_type,
            'province' => $province,
            'city' => $city,
            'county' => $county,
            'quote_num' => $quote_num,
            'bidding_company' => $bidding_company,
            'buyer_unit' => $buyer_unit,
            'customer_classification' => $customer_classification,
            'big_client_code' => $big_client_code,
            'bid_opening_date'=> $bid_opening_date,
            'branch_office' => $branch_office,
            'sales_person' => $sales_person,
            'elevator_model' => $elevator_model,
            'building_height' => $building_height,
            'quote_inputer' => $staff_name,
            'quote_input_date' => $today_date,
            'status' => '跟进中',
        ];
        $result=Db::name('quote')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }

    }

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function GetQuoteInfoByCondition(Request $request){
        $requestData=$request->param();
        $quote_id = $requestData['search_quote_id'];
        $contract_id = $requestData['search_contract_id'];
        $buyer_unit = $requestData['search_buyer_unit'];
        $search_sales_person = $requestData['search_sales_person'];
        $project_name = $requestData['search_project_name'];
        $status = $requestData['search_status'];
        $companys=Session::get('company');
        $jump_project_name=Session::get('jump_project_name');
        if(!$jump_project_name){
            $project_names=$project_name;
        }else{
            $project_names=$jump_project_name;
        }
        if($companys==='山东分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        if(empty($contract_ids) && empty($buyer_unit) && empty($status)&& empty($project_name)){
            $data=Db::name('quote')
                ->where('quote_id', 'like', '%' . $quote_id . '%')
                ->where('branch_office', 'like', '%' . $company . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('project_name', 'like', '%' . $project_names . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('sales_person', 'like', '%' . $search_sales_person . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->order("field(status,'已报价','已中标','跟进中','评审中','已签订','已丢标')")
                ->order('id DESC')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('quote')
                ->where('quote_id', 'like', '%' . $quote_id . '%')
                ->where('branch_office', 'like', '%' . $company . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('project_name', 'like', '%' . $project_names . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('sales_person', 'like', '%' . $search_sales_person . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->order("field(status,'已报价','已中标','跟进中','评审中','已签订','已丢标')")
                ->order('id DESC')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //删除项目
    function Delete($delete_id){
        $list = Db::name('quote')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('quote')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //编辑报价
    function QuoteEdit($quote_edit_id,$e_project_name,$e_project_type,$e_bidding_type,$e_bid_type,$e_province,$e_city,$e_county,$e_quote_num,$e_bidding_company,$e_buyer_unit,$e_customer_classification,$e_big_client_code,$e_bid_opening_date,$e_elevator_model,$e_branch_office,$e_sales_person,$e_quote_date,$e_standard_equipment_price,$e_final_equipment_quotation,$e_total_transport_price,$e_win_bidding_date,$e_winning_bid,$e_competitor_quote,$e_contract_id,$e_status,$e_bid_num,$e_if_not_winning,$e_not_winning_date,$e_final_installation_quote,$e_not_winning_reason){
        $data=array(
            'project_name' => $e_project_name,
            'project_type' => $e_project_type,
            'bidding_type' => $e_bidding_type,
            'bid_type' => $e_bid_type,
            'province' => $e_province,
            'city' => $e_city,
            'county' => $e_county,
            'quote_num' => $e_quote_num,
            'bidding_company' => $e_bidding_company,
            'buyer_unit' => $e_buyer_unit,
            'customer_classification' => $e_customer_classification,
            'big_client_code' => $e_big_client_code,
            'bid_opening_date' => $e_bid_opening_date,
            'elevator_model' => $e_elevator_model,
            'branch_office' => $e_branch_office,
            'sales_person' => $e_sales_person,
            'quote_date' => $e_quote_date,
            'standard_equipment_price' => $e_standard_equipment_price,
            'final_equipment_quotation' => $e_final_equipment_quotation,
            'total_transport_price' => $e_total_transport_price,
            'win_bidding_date' => $e_win_bidding_date,
            'winning_bid' => $e_winning_bid,
            'competitor_quote' => $e_competitor_quote,
            'contract_id' => $e_contract_id,
            'status' => $e_status,
            'bid_num' => $e_bid_num,
            'if_not_winning' => $e_if_not_winning,
            'not_winning_date' => $e_not_winning_date,
            'final_installation_quote' => $e_final_installation_quote,
            'not_winning_reason' => $e_not_winning_reason,
            'id' => $quote_edit_id
        );
        $check=Db::name('quote')->where(['id' => $quote_edit_id])->count();
        if($check>0){
            $result=Db::name('quote')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //检查项目名称
    function CheckProjectName($project_name){
        $project_names=trim($project_name);
        $list = Db::name('quote')->where(['project_name'=>$project_names])->count();
        if($list>0){
            return json(1);
        }else{
            return json(0);
        }
    }
    //获取报价信息
    public function GetTenderOffer(){
        $id = $this->request->param("id");
        $data=Db::name('quote')
            ->where('id','=',$id)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //保证金申请
    public function ApplyBond($apply_bond_id,$a_bond_assortment,$a_bond,$a_performance_bond,$a_bond_apply_date,$a_bond_payer,$a_bond_remit_date,$a_bond_beneficiary,$a_if_seal){
        $data=array(
            'bond_assortment' => $a_bond_assortment,
            'bond' => $a_bond,
            'performance_bond' => $a_performance_bond,
            'bond_apply_date' => $a_bond_apply_date,
            'bond_payer' => $a_bond_payer,
            'bond_remit_date' => $a_bond_remit_date,
            'bond_beneficiary' => $a_bond_beneficiary,
            'if_seal' => $a_if_seal,
            'id' => $apply_bond_id
        );
        $check=Db::name('quote')->where(['id' => $apply_bond_id])->count();
        if($check>0){
            $result=Db::name('quote')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }

    }
    //保证金审核
    public function VerifyBond($apply_bond_id,$a_bond_assortment,$a_bond,$a_performance_bond,$a_bond_apply_date,$a_bond_payer,$a_bond_remit_date,$a_bond_beneficiary,$a_if_seal,$a_band_expect_date,$a_bond_return_date,$a_verification_money,$a_if_agreement,$a_agreement_back_date,$a_reminder_letter_date,$a_lawyer_letter_date,$a_bond_remarks){
        $data=array(
            'bond_assortment' => $a_bond_assortment,
            'bond' => $a_bond,
            'performance_bond' => $a_performance_bond,
            'bond_apply_date' => $a_bond_apply_date,
            'bond_payer' => $a_bond_payer,
            'bond_remit_date' => $a_bond_remit_date,
            'bond_beneficiary' => $a_bond_beneficiary,
            'if_seal' => $a_if_seal,
            'band_expect_date' => $a_band_expect_date,
            'bond_return_date' => $a_bond_return_date,
            'verification_money' => $a_verification_money,
            'if_agreement' => $a_if_agreement,
            'agreement_back_date' => $a_agreement_back_date,
            'reminder_letter_date' => $a_reminder_letter_date,
            'lawyer_letter_date' => $a_lawyer_letter_date,
            'bond_remarks' => $a_bond_remarks,
            'id' => $apply_bond_id
        );
        $check=Db::name('quote')->where(['id' => $apply_bond_id])->count();
        if($check>0){
            $result=Db::name('quote')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //提交报价请求
    public function TenderOffer($tender_offer_id,$t_quote_date,$standard_equipment_price,$final_equipment_quotation,$total_transport_price,$final_installation_quote){
        $data=array(
            'quote_date' => $t_quote_date,
            'standard_equipment_price' => $standard_equipment_price,
            'final_equipment_quotation' => $final_equipment_quotation,
            'total_transport_price' => $total_transport_price,
            'final_installation_quote' => $final_installation_quote,
            'status' => '已报价',
            'id' => $tender_offer_id
        );
        $check=Db::name('quote')
            ->where(['id' => $tender_offer_id])
            ->count();
        if($check>0){
            $result=Db::name('quote')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //提交投标结果
    public function TenderResult($tender_result_id,$r_standard_equipment_price,$r_final_equipment_quotation,$r_total_transport_price,$r_final_installation_quote,$winning_bid,$bid_num,$not_winning_reason,$competitor_quote){
        $today_date=session::get('today_date');
        if($bid_num>0){
            $data=array(
                'standard_equipment_price' => $r_standard_equipment_price,
                'final_equipment_quotation' => $r_final_equipment_quotation,
                'total_transport_price' => $r_total_transport_price,
                'final_installation_quote' => $r_final_installation_quote,
                'competitor_quote' => $competitor_quote,
                'winning_bid' => $winning_bid,
                'bid_num' => $bid_num,
                'if_not_winning' => '否',
                'win_biding' => '1',
                'win_bidding_date' => $today_date,
                'status' => '已中标',
                'id' => $tender_result_id
            );
        }else{
            $data=array(
                'standard_equipment_price' => $r_standard_equipment_price,
                'final_equipment_quotation' => $r_final_equipment_quotation,
                'total_transport_price' => $r_total_transport_price,
                'final_installation_quote' => $r_final_installation_quote,
                'competitor_quote' => $competitor_quote,
                'winning_bid' => $winning_bid,
                'bid_num' => $bid_num,
                'not_winning_reason' => $not_winning_reason,
                'not_winning_date' => $today_date,
                'win_biding' => '0',
                'win_bidding_date' => '0000-00-00',
                'if_not_winning' => '是',
                'status' => '已丢标',
                'id' => $tender_result_id
            );
        }
        $check=Db::name('quote')->where(['id' => $tender_result_id])->count();
        if($check>0){
            $result=Db::name('quote')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }

    }
    //生成合同
    public function CreateContract($create_contract_id,$c_project_name,$c_branch_office,$c_sales_person,$c_bid_num,$c_province,$c_city,$c_county,$c_buyer_unit,$c_use_unit,$c_customer_classification,$c_big_client_code,$c_contract_id,$c_project_type){
        $today_date=session::get('today_date');
        $quote_data=array(
            'sign_contract' => '1',
            'sign_contract_date' => $today_date,
            'contract_id' => $c_contract_id,
            'status' => '评审中',
            'id' => $create_contract_id
        );
        $quote_fail_data=array(
            'sign_contract' => '0',
            'sign_contract_date' => '0000-00-00',
            'contract_id' => '',
            'id' => $create_contract_id
        );
        $contract_data=array(
            'contract_id' => $c_contract_id,
            'contract_status' => '正常',
            'contract_num' => $c_bid_num,
            'branch' => $c_branch_office,
            'province' => $c_province,
            'area' => $c_city,
            'county' => $c_county,
            'customer_classification' => $c_customer_classification,
            'buyer_unit' => $c_buyer_unit,
            'use_unit' => $c_use_unit,
            'big_client_code' => $c_big_client_code,
            'project_name' => $c_project_name,
            'sales_clerk' => $c_sales_person,
            'project_type' => $c_project_type
        );
        $check=Db::name('contract')->where(['contract_id' => $c_contract_id])->count();
        if($check>0){
            $fail_result=Db::name('quote')->update($quote_fail_data);
            return json(3);

        }else{
            $result=Db::name('quote')->update($quote_data);
            if($result){
                $InsertContract=Db::name('contract')->insert($contract_data);
                if($InsertContract){
                    return json(1);
                }else{
                    $fail_result=Db::name('quote')->update($quote_fail_data);
                    return json(2);
                }
            }else{
                $fail_result=Db::name('quote')->update($quote_fail_data);
                return json(0);
            }
        }
    }
    //按查询条件导出报价
    function export(){
        ini_set ('memory_limit', '1280M');
        $quote_id = Session::get('quote_quote_id');
        $branch_office = Session::get('quote_branch_office');
        $sales_person = Session::get('quote_sales_person');
        $buyer_unit = Session::get('quote_buyer_unit');
        $project_name = Session::get('quote_project_name');
        $contract_id = Session::get('quote_contract_id');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '报价财年'=>'integer',
            '状态'=>'string',
            '报价日期'=>'date',
            '开标日期'=>'date',
            '分公司'=>'string',
            '营业员'=>'string',
            '省份'=>'string',
            '安装地市'=>'string',
            '区县'=>'string',
            '招标台量'=>'integer',
            '中标台量'=>'integer',
            '买方单位'=>'string',
            '项目名称'=>'string',
            '项目类型'=>'string',
            '客户分类'=>'string',
            '招标类型'=>'string',
            '电梯型号'=>'string',
            '运输总价'=>'price',
            '标准设备价'=>'price',
            '标准安装价'=>'price',
            '最终设备报价'=>'price',
            '最终安装报价'=>'price',
            '最终设备浮率'=>'0.00%',
            '最终安装浮率'=>'0.00%',
            '中标或准备签合同'=>'integer',
            '中标日期'=>'date',
            '签合同'=>'integer',
            '签合同日期'=>'date',
            '合同号'=>'string',
            '是否丢标'=>'string',
            '丢标日期'=>'date',
            '丢标原因'=>'string',
            '中标厂家'=>'string',
            '中标厂家相对我司下浮'=>'0.00%',
            '保证金'=>'price',
            '保证金分类'=>'string',
            '保证金受益人'=>'string',
            '招标公司'=>'string',
            '保证金是否转履约'=>'string',
            '保证金申请日期'=>'date',
            '保证金汇出日期'=>'date',
            '保证金退回日期'=>'date',
            '核销金额'=>'price',
            '保证金备注'=>'string',
            '保证金支付方'=>'string',
            '应退回日期'=>'date',
            '承诺收回时间'=>'date',
            '招标文件是否盖章'=>'string',
            '催款函寄出时间'=>'date',
            '律师函寄出时间'=>'date',
            '录入人'=>'string',
            '录入日期'=>'date'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'fyear',
            'status',
            'IF(quote_date="0000-00-00","",quote_date)'=>'quote_date',
            'IF(bid_opening_date="0000-00-00","",bid_opening_date)'=>'bid_opening_date',
            'branch_office',
            'sales_person',
            'province',
            'city',
            'county',
            'quote_num',
            'bid_num',
            'buyer_unit',
            'project_name',
            'project_type',
            'customer_attributes',
            'bidding_type',
            'elevator_model',
            'total_transport_price',
            'standard_equipment_price',
            'standard_installation_price',
            'final_equipment_quotation',
            'final_installation_quote',
            'final_equipment_floating_rate',
            'final_installation_floating_rate',
            'win_biding',
            'IF(win_bidding_date="0000-00-00","",win_bidding_date)'=>'win_bidding_date',
            'sign_contract',
            'IF(sign_contract_date="0000-00-00","",sign_contract_date)'=>'sign_contract_date',
            'contract_id',
            'if_not_winning',
            'IF(not_winning_date="0000-00-00","",not_winning_date)'=>'not_winning_date',
            'not_winning_reason',
            'winning_bid',
            'winning_bid_relative_float_downward',
            'bond',
            'bond_assortment',
            'bond_beneficiary',
            'bidding_company',
            'if_agreement',
            'bond_apply_date',
            'bond_remit_date',
            'bond_return_date',
            'verification_money',
            'bond_remarks',
            'bond_payer',
            'band_expect_date',
            'agreement_back_date',
            'if_seal',
            'reminder_letter_date',
            'lawyer_letter_date',
            'quote_inputer',
            'IF(quote_input_date="0000-00-00","",quote_input_date)'=>'quote_input_date'
        ];
        $excel = new expExcel();
        $xlsName  = "报价明细表";
        if($super_admin==1){
            $data = Db::name('quote')
                ->field($keys)
                ->where('quote_id','like','%'.$quote_id.'%')
                ->where('branch_office','like','%'.$branch_office.'%')
                ->where('sales_person', 'like', '%' . $sales_person . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->select();
        }else{
            $data = Db::name('quote')
                ->field($keys)
                ->where('quote_id','like','%'.$quote_id.'%')
                ->where('branch_office','like','%'.$companys.'%')
                ->where('sales_person', 'like', '%' . $sales_person . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->select();
        }

        $excel->exports($xlsName, $head, $data, $keys);
    }
    //导出所有报价
    public function AllQuote(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        //设置表头：
        $head = [
            '报价财年'=>'integer',
            '状态'=>'string',
            '报价日期'=>'date',
            '开标日期'=>'date',
            '分公司'=>'string',
            '营业员'=>'string',
            '省份'=>'string',
            '安装地市'=>'string',
            '区县'=>'string',
            '招标台量'=>'integer',
            '中标台量'=>'integer',
            '买方单位'=>'string',
            '项目名称'=>'string',
            '项目类型'=>'string',
            '客户属性'=>'string',
            '招标类型'=>'string',
            '电梯型号'=>'string',
            '运输总价'=>'price',
            '标准设备价'=>'price',
            '标准安装价'=>'price',
            '最终设备报价'=>'price',
            '最终安装报价'=>'price',
            '最终设备浮率'=>'0.00%',
            '最终安装浮率'=>'0.00%',
            '中标或准备签合同'=>'string',
            '中标日期'=>'date',
            '签合同'=>'string',
            '签合同日期'=>'date',
            '合同号'=>'string',
            '是否丢标'=>'string',
            '丢标日期'=>'date',
            '丢标原因'=>'string',
            '中标厂家'=>'string',
            '中标厂家相对我司下浮'=>'0.00%',
            '保证金'=>'price',
            '保证金分类'=>'string',
            '保证金受益人'=>'string',
            '招标公司'=>'string',
            '保证金是否转履约'=>'string',
            '保证金申请日期'=>'date',
            '保证金汇出日期'=>'date',
            '保证金退回日期'=>'date',
            '核销金额'=>'price',
            '保证金备注'=>'string',
            '保证金支付方'=>'string',
            '应退回日期'=>'date',
            '承诺收回时间'=>'date',
            '招标文件是否盖章'=>'string',
            '催款函寄出时间'=>'date',
            '律师函寄出时间'=>'date',
            '客户分类'=>'string',
            '报价事业部'=>'string',
            '双方盖章日期'=>'date',
            '录入人'=>'string',
            '录入日期'=>'date',
            '区域简称'=>'string',

        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'fyear',
            'status',
            'IF(quote_date="0000-00-00","",quote_date)'=>'quote_date',
            'IF(bid_opening_date="0000-00-00","",bid_opening_date)'=>'bid_opening_date',
            'branch_office',
            'sales_person',
            'province',
            'city',
            'county',
            'quote_num',
            'bid_num',
            'buyer_unit',
            'project_name',
            'project_type',
            'customer_attributes',
            'bidding_type',
            'elevator_model',
            'total_transport_price',
            'standard_equipment_price',
            'standard_installation_price',
            'final_equipment_quotation',
            'final_installation_quote',
            'final_equipment_floating_rate',
            'final_installation_floating_rate',
            'win_biding',
            'IF(win_bidding_date="0000-00-00","",win_bidding_date)'=>'win_bidding_date',
            'sign_contract',
            'IF(sign_contract_date="0000-00-00","",sign_contract_date)'=>'sign_contract_date',
            'contract_id',
            'if_not_winning',
            'IF(not_winning_date="0000-00-00","",not_winning_date)'=>'not_winning_date',
            'not_winning_reason',
            'winning_bid',
            'winning_bid_relative_float_downward',
            'bond',
            'bond_assortment',
            'bond_beneficiary',
            'bidding_company',
            'if_agreement',
            'IF(bond_apply_date="0000-00-00","",bond_apply_date)'=>'bond_apply_date',
            'IF(bond_remit_date="0000-00-00","",bond_remit_date)'=>'bond_remit_date',
            'IF(bond_return_date="0000-00-00","",bond_return_date)'=>'bond_return_date',
            'verification_money',
            'bond_remarks',
            'bond_payer',
            'IF(band_expect_date="0000-00-00","",band_expect_date)'=>'band_expect_date',
            'IF(agreement_back_date="0000-00-00","",agreement_back_date)'=>'agreement_back_date',
            'if_seal',
            'IF(reminder_letter_date="0000-00-00","",reminder_letter_date)'=>'reminder_letter_date',
            'IF(lawyer_letter_date="0000-00-00","",lawyer_letter_date)'=>'lawyer_letter_date',
            'customer_classification',
            'quote_bu',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'quote_inputer',
            'IF(quote_input_date="0000-00-00","",quote_input_date)'=>'quote_input_date',
            'SUBSTR(branch_office,1,2)'=>'branch_office_short',
        ];
        $excel = new expExcel();
        $data=[];
        if($super_admin==1){
            try {
                $data = Db::name('quote')
                    ->field($keys)
                    ->select();
            } catch (DataNotFoundException $e) {
            } catch (ModelNotFoundException $e) {
            } catch (DbException $e) {
            }
        }else{
            try {
                $data = Db::name('quote')
                    ->field($keys)
                    ->where(['branch_office' => $company])
                    ->select();
            } catch (DataNotFoundException $e) {
            } catch (ModelNotFoundException $e) {
            } catch (DbException $e) {
            }
        }
        $excel->exports('报价明细', $head, $data, $keys);
    }
    //导出所有待签订报价
    public function PreSign(){
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '报价日期'=>'date',
            '分公司'=>'string',
            '营业员'=>'string',
            '安装省份'=>'string',
            '安装地市'=>'string',
            '区县'=>'string',
            '台量'=>'integer',
            '买方单位'=>'string',
            '项目名称'=>'string',
            '项目类型'=>'string',
            '客户分类'=>'string',
            '招标类型'=>'string',
            '电梯型号'=>'string',
            '是否丢标'=>'string',
            '中标台量'=>'integer',
            '中标日期'=>'date',
            '合同号'=>'string',
            '是否签订合同'=>'integer',
            '是否中标'=>'integer',
            '区域简称'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'helc_quote.id',
            'quote_date',
            'branch_office',
            'sales_person',
            'province',
            'city',
            'county',
            'quote_num',
            'buyer_unit',
            'project_name',
            'project_type',
            'customer_classification',
            'bidding_type',
            'elevator_model',
            'if_not_winning',
            'bid_num',
            'win_bidding_date',
            'contract_id',
            'sign_contract',
            'win_biding',
            'SUBSTR(branch_office,1,2)'=>'s_branch_office'
        ];
        if($super_admin==1){
            $data  = Db::name('quote')
                ->field($keys)
                ->where('province', '=', '山东省')
                ->where('win_biding', '=', '1')
                ->where('sign_contract','=','0')
                ->where('if_not_winning', '=', '否')
                ->union("SELECT helc_quote.id,helc_quote.quote_date,helc_quote.branch_office, helc_quote.sales_person,helc_quote.province,helc_quote.city,helc_quote.county,helc_quote.quote_num,helc_quote.buyer_unit, helc_quote.project_name,helc_quote.project_type,helc_quote.customer_classification,helc_quote.bidding_type,helc_quote.elevator_model,helc_quote.if_not_winning,helc_quote.bid_num,helc_quote.win_bidding_date,helc_quote.contract_id,helc_quote.sign_contract,helc_quote.win_biding,SUBSTR(branch_office,1,2) AS s_branch_office
FROM helc_quote,helc_contract
WHERE helc_quote.contract_id = helc_contract.contract_id AND helc_quote.province='山东省' AND helc_quote.sign_contract = '1' AND helc_quote.if_not_winning = '否' AND  helc_contract.product_info='0'")
                ->select();
        }else{
            $data  = Db::name('quote')
                ->field($keys)
                ->where('province', '=', '山东省')
                ->where('branch_office', '=', $company)
                ->where('win_biding', '=', '1')
                ->where('sign_contract','=','0')
                ->where('if_not_winning', '=', '否')
                ->union("SELECT helc_quote.id,helc_quote.quote_date,helc_quote.branch_office, helc_quote.sales_person,helc_quote.province,helc_quote.city,helc_quote.county,helc_quote.quote_num,helc_quote.buyer_unit, helc_quote.project_name,helc_quote.project_type,helc_quote.customer_classification,helc_quote.bidding_type,helc_quote.elevator_model,helc_quote.if_not_winning,helc_quote.bid_num,helc_quote.win_bidding_date,helc_quote.contract_id,helc_quote.sign_contract,helc_quote.win_biding,SUBSTR(branch_office,1,2) AS s_branch_office
FROM helc_quote,helc_contract
WHERE helc_quote.province='山东省' AND helc_quote.branch_office='$company' AND sign_contract = '1' AND if_not_winning = '否' AND helc_quote.contract_id = helc_contract.contract_id AND helc_contract.product_info='0'")
                ->select();
        }

        $excel->exports('待签订明细', $head, $data, $keys);
    }
    //导出所有保证金欠款
    public function BondArrears(){
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '分公司'=>'string',
            '营业员'=>'string',
            '台量'=>'integer',
            '投标保证金'=>'price',
            '履约保证金'=>'price',
            '保证金分类'=>'string',
            '保证金受益人'=>'string',
            '招标公司'=>'string',
            '保证金是否转履约'=>'string',
            '保证金申请日期'=>'date',
            '保证金汇出日期'=>'date',
            '开标日期'=>'date',
            '应退回日期'=>'date',
            '保证金退回日期'=>'date',
            '买方单位'=>'string',
            '项目名称'=>'string',
            '核销金额'=>'price',
            '保证金欠款'=>'price',
            '合同号'=>'string',
            '招标文件是否盖章'=>'string',
            '保证金备注'=>'string',
            '保证金支付方'=>'string',
            '承诺收回时间'=>'date',
            '催款函寄出时间'=>'date',
            '律师函寄出时间'=>'date'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'branch_office',
            'sales_person',
            'quote_num',
            'bond',
            'performance_bond',
            'bond_assortment',
            'bond_beneficiary',
            'bidding_company',
            'if_agreement',
            'IF(bond_apply_date="0000-00-00","",bond_apply_date)'=>'bond_apply_date',
            'IF(bond_remit_date="0000-00-00","",bond_remit_date)'=>'bond_remit_date',
            'IF(bid_opening_date="0000-00-00","",bid_opening_date)'=>'bid_opening_date',
            'IF(band_expect_date="0000-00-00","",band_expect_date)'=>'band_expect_date',
            'IF(bond_return_date="0000-00-00","",bond_return_date)'=>'bond_return_date',
            'buyer_unit',
            'project_name',
            'verification_money',
            'bond_arrears',
            'contract_id',
            'if_seal',
            'bond_remarks',
            'bond_payer',
            'IF(agreement_back_date="0000-00-00","",agreement_back_date)'=>'agreement_back_date',
            'IF(reminder_letter_date="0000-00-00","",reminder_letter_date)'=>'reminder_letter_date',
            'IF(lawyer_letter_date="0000-00-00","",lawyer_letter_date)'=>'lawyer_letter_date'
        ];
        $excel = new expExcel();
        if($super_admin==1){
            $data = Db::name('quote')
                ->field($keys)
                ->where('bond_arrears','>','0')
                ->select();
        }else{
            $data = Db::name('quote')
                ->field($keys)
                ->where('bond_arrears','>','0')
                ->where('branch_office','=',$company)
                ->select();
        }
        $excel->exports('保证金欠款明细', $head, $data, $keys);
    }
}
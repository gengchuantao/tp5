<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\EquipmentIncome;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class EquipmentIncomeController extends IndexController
{
    public function index(){
        // 获取查询信息
        $receipt_id = input('receipt_id');
        $contract_id = input('contract_id');
        $pageSize = 10;
        $EquipmentIncome = new EquipmentIncome();
        $equipment_incomes = $EquipmentIncome
            ->where('receipt_id', 'like', '%' .$receipt_id. '%')
            ->where('contract_id', 'like', '%' .$contract_id. '%')
            ->order('id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        $this->assign('equipment_incomes', $equipment_incomes);
        return $this->fetch();
    }
    public function GetEquipmentIncomeFyear(){
        $ClosingDates= Db::table('helc_equipment_income')
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
    //财年导出设备入金明细

    /**
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function EquipmentIncomeExport(Request $request){
        $data = $request->param();
        $equipment_income_fyear = $data['equipment_income_fyear'];
        // 获取查询信息
        $branchs = Session::get('equipmentarrears_company');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=$equipment_income_fyear;
        //获取所在区域
        $companys=Session::get('company');

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
            'branch',
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
            'collection_date',
            'notification_posting_date',
            'release_date',
            'split_date',
            'split_posting_date',
            'split_five_days',
            'income_date',
            'arrival_date',
            'approach_date',
            'issuing_date',
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
            'new_architecture',
            'money_detail_id',
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
            'fix_business_entity',
            'assess_mark',
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
            '二级司'=>'string',
            '大客户'=>'string',
            '大项目'=>'string',
            '商务信息'=>'string',
            '使用单位'=>'string',
            '销售业务科责任人'=>'string',
            '出仓日期'=>'date',
            '综合月'=>'string',
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
            '收款拆分金额'=>'0.00',
            '修正后收款拆分金额'=>'0.00',
            '状态'=>'string',
            '收款日期'=>'date',
            '入账日期（通报）'=>'date',
            '发布日期'=>'date',
            '拆分日期'=>'date',
            '入账日期（拆分）'=>'date',
            '拆分超过五天'=>'string',
            '入金日期'=>'date',
            '货到地盘日期'=>'date',
            '安装进场日期'=>'date',
            '技监发证日期'=>'date',
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
            '新架构'=>'string',
            'money_detail_id'=>'string',
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
            '修正业务实体'=>'string',
            '考核标识'=>'string',
        ];
        if($super_admin==1){
            $data = Db::name('equipment_income')
                ->field($keys)
                ->where('fyear', '=', $fyear)
                ->select();
        }else{
            $data = Db::name('equipment_income')
                ->field($keys)
                ->where('company', 'like', '%' . $companys . '%')
                ->where('fyear', '=', $fyear)
                ->select();
        }

        $excel->exports('设备入金明细', $head, $data, $keys);
    }


}
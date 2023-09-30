<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\InstallIncome;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class InstallIncomeController extends IndexController
{
    public function index(){
        // 获取查询信息
        $receipt_id = input('receipt_id');
        $pageSize = 10;
        $InstallIncome = new InstallIncome();
        $install_incomes = $InstallIncome
            ->where('receipt_id', 'like', '%' .$receipt_id. '%')
            ->order('id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        $this->assign('install_incomes', $install_incomes);
        return $this->fetch();
    }
    //获取安装入金财年
    public function GetInstallIncomeFyear(){
        $ClosingDates= Db::table('helc_install_income')
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

//财年导出安装入金明细

    /**
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function InstallIncomeExport(Request $request){
        $data = $request->param();
        $install_income_fyear = $data['install_income_fyear'];
        // 获取查询信息
        $branchs = Session::get('installarrears_company');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取财年
        $fyear=$install_income_fyear;
        //获取所在区域
        $companys=Session::get('company');
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
            'business_entity',
            'expire_date',
            'assess_mark',
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
            '业务实体'=>'string',
            '到期应收日期'=>'date',
            '考核标识'=>'string',
        ];
        if($super_admin==1){
            $data = Db::name('install_income')
                ->field($keys)
                ->where('fyear', '=', $fyear)
                ->select();
        }else{
            $data = Db::name('install_income')
                ->field($keys)
                ->where('company', 'like', '%' . $companys . '%')
                ->where('fyear', '=', $fyear)
                ->select();
        }
        $excel->exports('安装入金明细', $head, $data, $keys);
    }
}
<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Discount;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class DiscountController extends IndexController
{
    public function index(){
        $contract_id=input('contract_id');
        $company = input('discount_company');
        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('discount_contract_id',$contract_id);
        Session::set('discount_company',$company);
        $Discount = new Discount;
        $discounts = $Discount
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->order(id,desc)
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('discounts', $discounts);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function lookup(){
        $receipt_id = input('receipt_id');
        $check_status = input('check_status');
        $company = input('discount_company');
        $status = input('discount_status');
        $cross_region = input('cross_region');
        $contract_id=input('contract_id');

        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('discount_receipt_id',$receipt_id);
        Session::set('discount_check_status',$check_status);
        Session::set('discount_company',$company);
        Session::set('discount_status',$status);
        Session::set('discount_cross_region',$cross_region);
        Session::set('discount_contract_id',$contract_id);

        // 实例化Income
        $Discount = new Discount;
        if($admin===1){
            $discounts = $Discount
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $discounts = $Discount
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $companys . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                /*
                ->where('income_date', 'between time', [$income_date_from,$income_date_to])*/
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }


        // 向V层传数据
        $this->assign('discounts', $discounts);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function AddForm($type,$bill_id,$bill_amount,$issue_date,$due_date,$agent,$receipt_id,$contract_id,$income_date,$split_amount,$original_receipt_id){
        $company=session::get('company');
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        //向数据库中写入数据，不知道为啥只能用原生的
        $result = Db::execute("
            insert into helc_discount(
            type,bill_id,bill_amount,issue_date,due_date,agent,receipt_id,contract_id,income_date,split_amount,original_receipt_id
            )
            values(
            '$type','$bill_id','$bill_amount','$issue_date','$due_date','$agent','$receipt_id','$contract_id','$income_date','$split_amount','$original_receipt_id'
            )
            ");
        $CallFunction = Db::execute("CALL discount_function;");
        return json(1);
    }
    public function Delete($delete_id){
        $list = Db::name('discount')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result = Db::execute("
            DELETE FROM helc_discount
            WHERE id='$delete_id'
            ");
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    public function CheckForm($check_id,$check_status,$check_section_chief_approve,$check_regional_finance_remarks,$check_sd_accounting_remarks,$check_sd_taxation_a_remarks,$check_sd_taxation_b_remarks){
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $regional_head=session::get('regional_head');
        $regional_finance=session::get('regional_finance');
        $sd_accounting=session::get('sd_accounting');
        $sd_taxation_a=session::get('sd_taxation_a');
        $sd_taxation_b=session::get('sd_taxation_b');
        if($regional_head === 1 && $check_status =='区域主管审核'){
            $result = Db::execute("
            update helc_discount 
            set section_chief_approve = '$check_section_chief_approve',
                section_chief_approve_date='$today_date',
                section_chief='$staff_name',
                status='区域财务审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($regional_finance === 1 && $check_status =='区域财务审核'){
            $result = Db::execute("
            update helc_discount 
            set regional_finance_remarks = '$check_regional_finance_remarks',
                regional_finance_date='$today_date',
                regional_finance='$staff_name',
                status='山东司核算审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_accounting === 1 && $check_status =='山东司核算审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_accounting_remarks = '$check_sd_accounting_remarks',
                sd_accounting_date='$today_date',
                sd_accounting='$staff_name',
                status='山东司税务岗A审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_taxation_a === 1 && $check_status =='山东司税务岗A审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_taxation_a_remarks = '$check_sd_taxation_a_remarks',
                sd_taxation_a_date='$today_date',
                sd_taxation_a='$staff_name',
                status='山东司税务岗B审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_taxation_b === 1 && $check_status =='山东司税务岗B审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_taxation_b_remarks = '$check_sd_taxation_b_remarks',
                sd_taxation_b_date='$today_date',
                sd_taxation_b='$staff_name',
                status='已结束'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else{
            return json(date(0));
        }
    }
    public function RejectForm($check_id,$check_status,$check_section_chief_approve,$check_regional_finance_remarks,$check_sd_accounting_remarks,$check_sd_taxation_a_remarks,$check_sd_taxation_b_remarks){
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $regional_head=session::get('regional_head');
        $regional_finance=session::get('regional_finance');
        $sd_accounting=session::get('sd_accounting');
        $sd_taxation_a=session::get('sd_taxation_a');
        $sd_taxation_b=session::get('sd_taxation_b');
        if($regional_head === 1 && $check_status =='区域主管审核'){
            $result = Db::execute("
            update helc_discount 
            set section_chief_approve = '$check_section_chief_approve',
                section_chief_approve_date='$today_date',
                section_chief='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            return json(date(1));
        }else if($regional_finance === 1 && $check_status =='区域财务审核'){
            $result = Db::execute("
            update helc_discount 
            set regional_finance_remarks = '$check_regional_finance_remarks',
                regional_finance_date='$today_date',
                regional_finance='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_accounting === 1 && $check_status =='山东司核算审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_accounting_remarks = '$check_sd_accounting_remarks',
                sd_accounting_date='$today_date',
                sd_accounting='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_taxation_a === 1 && $check_status =='山东司税务岗A审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_taxation_a_remarks = '$check_sd_taxation_a_remarks',
                sd_taxation_a_date='$today_date',
                sd_taxation_a='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else if($sd_taxation_b === 1 && $check_status =='山东司税务岗B审核'){
            $result = Db::execute("
            update helc_discount 
            set sd_taxation_b_remarks = '$check_sd_taxation_b_remarks',
                sd_taxation_b_date='$today_date',
                sd_taxation_b='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL discount_function;");
            return json(date(1));
        }else{
            return json(date(0));
        }
    }
    public function SendForm(){
        $id = $this->request->param("send_id");
        $Discount = new Discount;
        $SQLData = $Discount
            ->where('id',$id)
            ->SELECT();
        $sqldata_json=json_encode($SQLData);
        echo  $sqldata_json;
    }
    //审核传值
    public function CheckPost(){
        $id = $this->request->param("check_id");
        $sqldata= Db::query("
 SELECT id,check_remarks
 FROM helc_discount
WHERE id='$id'
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['id']=$sqldata[$i]['id'];
            $sqldata1[$i]['check_remarks']=$sqldata[$i]['check_remarks'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //修改
    public function EditForm($edit_id,$edit_discount_protocol){
        $adminer=Session::get('admin');
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $result = Db::execute("
                    UPDATE helc_discount 
                    SET discount_protocol = '$edit_discount_protocol'
                    WHERE id = '$edit_id'
                ");
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '1280M');
        $contract_id = Session::get('discount_contract_id');
        $admin=Session::get('admin');
        if($admin==1){
            $company = Session::get('discount_company');
        }else{
            $company = Session::get('company');
        }
        $excel = new expExcel();
        $xlsName  = "恒大原票明细表";
        $data = Db::name('discount')
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('company', 'like', '%' . $company . '%')
            ->select();
        //设置表头：
        $head = ['ID', '类别', '商票编号', '票面金额', '出票日期', '到期日期', '赶工奖比率', '经办人', '收款编号','合同编号', '收款编号&合同号','区域','拆分金额','买方单位','入金时间','赶工奖金额','赶工奖已收款','赶工奖欠款','已开票金额','未开票金额','赶工奖协议号','合同赶工奖总金额','合同赶工奖已开票金额','合同赶工奖已收款','合同赶工奖欠款'];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['id','type','bill_id','bill_amount','issue_date','due_date','bill_ratio', 'agent','receipt_id','contract_id','unique_field','company','split_amount','buyer_unit','income_date','discount_amount','discount_collection','discount_arrears','invoice_amount','unbilled_amount','discount_protocol','contract_discount_amount','contract_invoice_amount','contract_discount_collection','contract_discount_arrears'];
        $excel->outdata($xlsName,$head,$data,$keys);
    }
}
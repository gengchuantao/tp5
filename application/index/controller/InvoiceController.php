<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Invoice;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class InvoiceController extends IndexController
{
    public function index(){
        $contract_id=input('contract_id');
        $company = input('invoice_company');
        $check_status = input('check_status');
        $business_type = input('business_type');
        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('invoice_contract_id',$contract_id);
        Session::set('invoice_company',$company);
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $role=session::get('role');
        $regional_head = session::get('regional_head');//区域主管
        $regional_finance=session::get('regional_finance');//区域财务
        $sd_accounting=session::get('sd_accounting');//山东司核算
        $sd_taxation_a = session::get('sd_taxation_a');//山东司税务A
        $sd_taxation_b=session::get('sd_taxation_b');//山东司税务B

        $Invoice = new Invoice;
        if($admin === 1){
            $invoices = $Invoice
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('status', 'like', '%' . $check_status . '%')
                ->where('business_type', 'like', '%' . $business_type . '%')
                ->order(id,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else if($regional_head === 1){
                $invoices = $Invoice
                    ->where('contract_id', 'like', '%' . $contract_id . '%')
                    ->where('status', 'like', '%' . $check_status . '%')
                    ->where('business_type', 'like', '%' . $business_type . '%')
                    ->where('company', 'like', '%' . $companys . '%')
                    ->order(id,desc)
                    ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else if($regional_finance === 1){
                $invoices = $Invoice
                    ->where('contract_id', 'like', '%' . $contract_id . '%')
                    ->where('status', 'like', '%' . $check_status . '%')
                    ->where('business_type', 'like', '%' . $business_type . '%')
                    ->where('company', 'like', '%' . $companys . '%')
                    ->order(id,desc)
                    ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else if($sd_accounting === 1){
            $invoices = $Invoice
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('status', 'like', '%' . $check_status . '%')
                ->where('business_type', 'like', '%' . $business_type . '%')
                ->order(id,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else if($sd_taxation_a === 1){
            $invoices = $Invoice
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('status', 'like', '%' . $check_status . '%')
                ->where('business_type', 'like', '%' . $business_type . '%')
                ->order(id,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else if($sd_taxation_b === 1){
            $invoices = $Invoice
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('status', 'like', '%' . $check_status . '%')
                ->where('business_type', 'like', '%' . $business_type . '%')
                ->order(id,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else{
                $invoices = $Invoice
                    ->where('contract_id', 'like', '%' . $contract_id . '%')
                    ->where('company', 'like', '%' . $companys . '%')
                    ->order(id,desc)
                    ->paginate($pageSize, false, ['query'=>request()->param()]);
            }
        // 向V层传数据
        $this->assign('invoices', $invoices);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function getInfoById(){
        $id = $this->request->param("id");
        $data = array();
        try {
            $data = Db::name('invoice')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function getImgInfoById(){
        $id = $this->request->param("id");
        $data = array();
        try {
            $data = Db::name('invoice_images')->where('sid', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function lookup(){
        $receipt_id = input('receipt_id');
        $check_status = input('check_status');
        $company = input('invoice_company');
        $status = input('invoice_status');
        $cross_region = input('cross_region');
        $contract_id=input('contract_id');

        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('invoice_receipt_id',$receipt_id);
        Session::set('invoice_check_status',$check_status);
        Session::set('invoice_company',$company);
        Session::set('invoice_status',$status);
        Session::set('invoice_cross_region',$cross_region);
        Session::set('invoice_contract_id',$contract_id);

        // 实例化Income
        $Invoice = new Invoice;
        if($admin===1){
            $invoices = $Invoice
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $invoices = $Invoice
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
        $this->assign('invoices', $invoices);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function AddForm($invoice_type,$business_type,$contract_id,$product_id,$unit_name,$invoice_amount,$project_location,$taxpayer_id,$address,$phone_number,$deposit_bank,$bank_account,$invoice_remarks,$special_request,$applicant,$vanke_model,$tax_rate){
        $company=session::get('company');
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        //向数据库中写入数据，不知道为啥只能用原生的
        $result = Db::execute("
            insert into helc_invoice(
            invoice_type,business_type,company,contract_id,product_id,unit_name,invoice_amount,project_location,taxpayer_id,address,phone_number,deposit_bank,bank_account,invoice_remarks,special_request,vanke_model,applicant,application_date,status,agent,tax_rate
            )
            values(
            '$invoice_type','$business_type','$company','$contract_id','$product_id','$unit_name','$invoice_amount','$project_location','$taxpayer_id','$address','$phone_number','$deposit_bank','$bank_account','$invoice_remarks','$special_request','$vanke_model','$applicant','$today_date','区域主管审核','$staff_name','$tax_rate'
            )
            ");
        $CallFunction = Db::execute("CALL invoice_function;");
        return json(date(1));
    }
    public function Delete($delete_id){
        $list = Db::name('invoice')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result = Db::execute("
            DELETE FROM helc_invoice
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
            update helc_invoice 
            set section_chief_approve = '$check_section_chief_approve',
                section_chief_approve_date='$today_date',
                section_chief='$staff_name',
                status='区域财务审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($regional_finance === 1 && $check_status =='区域财务审核'){
            $result = Db::execute("
            update helc_invoice 
            set regional_finance_remarks = '$check_regional_finance_remarks',
                regional_finance_date='$today_date',
                regional_finance='$staff_name',
                status='山东司核算审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_accounting === 1 && $check_status =='山东司核算审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_accounting_remarks = '$check_sd_accounting_remarks',
                sd_accounting_date='$today_date',
                sd_accounting='$staff_name',
                status='山东司税务岗A审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_taxation_a === 1 && $check_status =='山东司税务岗A审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_taxation_a_remarks = '$check_sd_taxation_a_remarks',
                sd_taxation_a_date='$today_date',
                sd_taxation_a='$staff_name',
                status='山东司税务岗B审核'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_taxation_b === 1 && $check_status =='山东司税务岗B审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_taxation_b_remarks = '$check_sd_taxation_b_remarks',
                sd_taxation_b_date='$today_date',
                sd_taxation_b='$staff_name',
                status='待上传'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
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
            update helc_invoice 
            set section_chief_approve = '$check_section_chief_approve',
                section_chief_approve_date='$today_date',
                section_chief='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            return json(date(1));
        }else if($regional_finance === 1 && $check_status =='区域财务审核'){
            $result = Db::execute("
            update helc_invoice 
            set regional_finance_remarks = '$check_regional_finance_remarks',
                regional_finance_date='$today_date',
                regional_finance='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_accounting === 1 && $check_status =='山东司核算审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_accounting_remarks = '$check_sd_accounting_remarks',
                sd_accounting_date='$today_date',
                sd_accounting='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_taxation_a === 1 && $check_status =='山东司税务岗A审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_taxation_a_remarks = '$check_sd_taxation_a_remarks',
                sd_taxation_a_date='$today_date',
                sd_taxation_a='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else if($sd_taxation_b === 1 && $check_status =='山东司税务岗B审核'){
            $result = Db::execute("
            update helc_invoice 
            set sd_taxation_b_remarks = '$check_sd_taxation_b_remarks',
                sd_taxation_b_date='$today_date',
                sd_taxation_b='$staff_name',
                status='已拒绝'
            where id = '$check_id'
            ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else{
            return json(date(0));
        }
    }
    public function SendForm(){
        $id = $this->request->param("send_id");
        $SQLData= Db::query("
 SELECT id,invoice_type,business_type,contract_id,product_id,unit_name,invoice_amount,project_location,taxpayer_id,address,phone_number,deposit_bank,bank_account,invoice_remarks,special_request,applicant,vanke_model,agent,application_date,status,section_chief,section_chief_approve_date,section_chief_approve,regional_finance,regional_finance_date,regional_finance_remarks,sd_accounting,sd_accounting_date,sd_accounting_remarks,sd_taxation_a,sd_taxation_a_date,sd_taxation_a_remarks,sd_taxation_b,sd_taxation_b_date,sd_taxation_b_remarks,tax_rate
 FROM helc_invoice
WHERE id='$id'
            ");
        for ($i=0; $i < count($SQLData) ; $i++) {
            $NewSQLData[$i]['id']=$SQLData[$i]['id'];
            $NewSQLData[$i]['invoice_type']=$SQLData[$i]['invoice_type'];
            $NewSQLData[$i]['business_type']=$SQLData[$i]['business_type'];
            $NewSQLData[$i]['contract_id']=$SQLData[$i]['contract_id'];
            $NewSQLData[$i]['product_id']=$SQLData[$i]['product_id'];
            $NewSQLData[$i]['unit_name']=$SQLData[$i]['unit_name'];
            $NewSQLData[$i]['invoice_amount']=$SQLData[$i]['invoice_amount'];
            $NewSQLData[$i]['project_location']=$SQLData[$i]['project_location'];
            $NewSQLData[$i]['taxpayer_id']=$SQLData[$i]['taxpayer_id'];
            $NewSQLData[$i]['address']=$SQLData[$i]['address'];
            $NewSQLData[$i]['phone_number']=$SQLData[$i]['phone_number'];
            $NewSQLData[$i]['deposit_bank']=$SQLData[$i]['deposit_bank'];
            $NewSQLData[$i]['bank_account']=$SQLData[$i]['bank_account'];
            $NewSQLData[$i]['invoice_remarks']=$SQLData[$i]['invoice_remarks'];
            $NewSQLData[$i]['special_request']=$SQLData[$i]['special_request'];
            $NewSQLData[$i]['applicant']=$SQLData[$i]['applicant'];
            $NewSQLData[$i]['vanke_model']=$SQLData[$i]['vanke_model'];
            $NewSQLData[$i]['agent']=$SQLData[$i]['agent'];
            $NewSQLData[$i]['application_date']=$SQLData[$i]['application_date'];
            $NewSQLData[$i]['status']=$SQLData[$i]['status'];
            $NewSQLData[$i]['section_chief']=$SQLData[$i]['section_chief'];
            $NewSQLData[$i]['section_chief_approve_date']=$SQLData[$i]['section_chief_approve_date'];
            $NewSQLData[$i]['section_chief_approve']=$SQLData[$i]['section_chief_approve'];
            $NewSQLData[$i]['regional_finance']=$SQLData[$i]['regional_finance'];
            $NewSQLData[$i]['regional_finance_date']=$SQLData[$i]['regional_finance_date'];
            $NewSQLData[$i]['regional_finance_remarks']=$SQLData[$i]['regional_finance_remarks'];
            $NewSQLData[$i]['sd_accounting']=$SQLData[$i]['sd_accounting'];
            $NewSQLData[$i]['sd_accounting_date']=$SQLData[$i]['sd_accounting_date'];
            $NewSQLData[$i]['sd_accounting_remarks']=$SQLData[$i]['sd_accounting_remarks'];
            $NewSQLData[$i]['sd_taxation_a']=$SQLData[$i]['sd_taxation_a'];
            $NewSQLData[$i]['sd_taxation_a_date']=$SQLData[$i]['sd_taxation_a_date'];
            $NewSQLData[$i]['sd_taxation_a_remarks']=$SQLData[$i]['sd_taxation_a_remarks'];
            $NewSQLData[$i]['sd_taxation_b']=$SQLData[$i]['sd_taxation_b'];
            $NewSQLData[$i]['sd_taxation_b_date']=$SQLData[$i]['sd_taxation_b_date'];
            $NewSQLData[$i]['sd_taxation_b_remarks']=$SQLData[$i]['sd_taxation_b_remarks'];
            $NewSQLData[$i]['tax_rate']=$SQLData[$i]['tax_rate'];
        }
        $sqldata_json=json_encode($NewSQLData);
        echo  $sqldata_json;
    }
    //审核传值
    public function CheckPost(){
        $id = $this->request->param("check_id");
        $sqldata= Db::query("
 SELECT id,check_remarks
 FROM helc_invoice
WHERE id='$id'
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['id']=$sqldata[$i]['id'];
            $sqldata1[$i]['check_remarks']=$sqldata[$i]['check_remarks'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //重新提交
    public function EditForm($edit_id,$edit_invoice_type,$edit_business_type,$edit_contract_id,$edit_product_id,$edit_unit_name,$edit_invoice_amount,$edit_project_location,$edit_taxpayer_id,$edit_address,$edit_phone_number,$edit_deposit_bank,$edit_bank_account,$edit_invoice_remarks,$edit_special_request,$edit_applicant,$edit_vanke_model,$edit_tax_rate){
        $adminer=Session::get('admin');
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $regional_head=session::get('regional_head');
        $approval_authority = Session::get('approval_authority');
        if($approval_authority===0){
            $result = Db::execute("
                    UPDATE helc_invoice 
                    SET invoice_type = '$edit_invoice_type',
                        business_type = '$edit_business_type',
                        contract_id = '$edit_contract_id',
                        product_id = '$edit_product_id',
                        unit_name = '$edit_unit_name',
                        invoice_amount = '$edit_invoice_amount',
                        project_location = '$edit_project_location',
                        taxpayer_id = '$edit_taxpayer_id',
                        address = '$edit_address',
                        phone_number = '$edit_phone_number',
                        deposit_bank = '$edit_deposit_bank',
                        bank_account = '$edit_bank_account',
                        invoice_remarks = '$edit_invoice_remarks',
                        tax_rate='$edit_tax_rate',
                        special_request = '$edit_special_request',
                        applicant = '$edit_applicant',
                        vanke_model = '$edit_vanke_model',
                        status = '区域主管审核',
                        agent = '$staff_name',
                        application_date = '$today_date',
                        section_chief='',
                        section_chief_approve_date='',
                        section_chief_approve='',
                        regional_finance = '',
                        regional_finance_date = '',
                        regional_finance_remarks='',
                        sd_accounting = '',
                        sd_accounting_date = '',
                        sd_accounting_remarks = '',
                        sd_taxation_a = '',
                        sd_taxation_a_date = '',
                        sd_taxation_a_remarks = '',
                        sd_taxation_b = '',
                        sd_taxation_b_date = '',
                        sd_taxation_b_remarks = ''
                    WHERE id = '$edit_id'
                ");
            $CallFunction = Db::execute("CALL invoice_function;");
            return json(date(1));
        }else{
            return json(date(0));
        }

    }
    //税务B批量审核
    public function BatchInvoiceVerifyB(Request $request){
        $data = $request->param();
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $id=array();
        $id=explode(",", $data['batch_invoice_id']);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'sd_taxation_b_remarks'=>$data['b_sd_taxation_b_remarks'],
                'sd_taxation_b'=>$staff_name,
                'sd_taxation_b_date'=>$today_date,
                'status'=>'待上传',
                'id' => $id[$i],
            );
            try {
                $result = Db::name('invoice')->update($batch_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //税务A批量审核
    public function BatchInvoiceVerifyA(Request $request){
        $data = $request->param();
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $id=array();
        $id=explode(",", $data['batch_invoice_id']);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'sd_taxation_a_remarks'=>$data['b_sd_taxation_a_remarks'],
                'sd_taxation_a'=>$staff_name,
                'sd_taxation_a_date'=>$today_date,
                'status'=>'山东司税务岗B审核',
                'id' => $id[$i],
            );
            try {
                $result = Db::name('invoice')->update($batch_data);
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '1280M');
        $contract_id = Session::get('invoice_contract_id');
        $admin=Session::get('admin');
        $sd_accounting=session::get('sd_accounting');//山东司核算
        $sd_taxation_a = session::get('sd_taxation_a');//山东司税务A
        $sd_taxation_b=session::get('sd_taxation_b');//山东司税务B
        if($admin==1){
            $company = Session::get('invoice_company');
        }elseif($sd_accounting==1){
            $company = Session::get('invoice_company');
        }elseif($sd_taxation_a==1){
            $company = Session::get('invoice_company');
        }elseif($sd_taxation_b==1){
            $company = Session::get('invoice_company');
        }else{
            $company = Session::get('company');
        }

        $excel = new expExcel();
        $xlsName  = "发票申请明细";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '发票种类'=>'string',
            '业务类型'=>'string',
            '区域'=>'string',
            '合同号'=>'string',
            '工号'=>'string',
            '单位名称'=>'string',
            '合同总额'=>'price',
            '已收款金额'=>'price',
            '累计开票金额'=>'price',
            '本次开票金额'=>'price',
            '税率'=>'string',
            '本次开票比例'=>'0.00',
            '安装或维修项目所在地'=>'string',
            '税号'=>'string',
            '单位地址'=>'string',
            '电话号码'=>'string',
            '开户银行'=>'string',
            '银行账户'=>'string',
            '发票备注(项目名称/地址)'=>'string',
            '特殊要求[运输费或明细]'=>'string',
            '万科开票模式[线上/线下]'=>'string',
            '申请人'=>'string',
            '经办人'=>'string',
            '申请时间'=>'datetime',
            '区域主管'=>'string',
            '区域主管审批时间'=>'datetime',
            '区域主管审批意见'=>'string',
            '区域财务'=>'string',
            '区域财务审批时间'=>'datetime',
            '区域财务审批意见'=>'string',
            '山东司核算岗'=>'string',
            '山东司核算审核时间'=>'datetime',
            '山东司核算审核意见'=>'string',
            '山东司税务岗A'=>'string',
            '山东司税务岗A审核时间'=>'datetime',
            '山东司税务岗A审核意见'=>'string',
            '山东司税务岗B'=>'string',
            '山东司税务岗B审核时间'=>'datetime',
            '山东司税务岗B审核意见'=>'string',
            '流程状态'=>'string',
            '发票回执上传人'=>'string',
            '发票回执上传时间'=>'datetime'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'invoice_type',
            'business_type',
            'company',
            'contract_id',
            'product_id',
            'unit_name',
            'contract_amount',
            'collection_amount',
            'invoice_total',
            'invoice_amount',
            'tax_rate',
            'invoice_per',
            'project_location',
            'taxpayer_id',
            'address',
            'phone_number',
            'deposit_bank',
            'bank_account',
            'invoice_remarks',
            'special_request',
            'vanke_model',
            'applicant',
            'agent',
            'IF(application_date="0000-00-00 00:00:00","",application_date)'=>'application_date',
            'section_chief',
            'IF(section_chief_approve_date="0000-00-00 00:00:00","",section_chief_approve_date)'=>'section_chief_approve_date',
            'section_chief_approve',
            'regional_finance',
            'IF(regional_finance_date="0000-00-00 00:00:00","",regional_finance_date)'=>'regional_finance_date',
            'regional_finance_remarks',
            'sd_accounting',
            'IF(sd_accounting_date="0000-00-00 00:00:00","",sd_accounting_date)'=>'sd_accounting_date',
            'sd_accounting_remarks',
            'sd_taxation_a',
            'IF(sd_taxation_a_date="0000-00-00 00:00:00","",sd_taxation_a_date)'=>'sd_taxation_a_date',
            'sd_taxation_a_remarks',
            'sd_taxation_b',
            'IF(sd_taxation_b_date="0000-00-00 00:00:00","",sd_taxation_b_date)'=>'sd_taxation_b_date',
            'sd_taxation_b_remarks',
            'status',
            'upload_person',
            'IF(upload_date="0000-00-00 00:00:00","",upload_date)'=>'upload_date',
        ];
        $data = Db::name('invoice')
            ->field($keys)
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('company', 'like', '%' . $company . '%')
            ->select();
        $excel->exports($xlsName,$head,$data,$keys);
    }
    /**
     * Api接口
     */
    // 上传文件接口
    public function uploadApi(Request $request){
        $data = $request->param();
        $id = $data['upload_id'];
        $staff_name=session::get('staff_name');
        $uid = Session::get('staff_ids'); //获取工号
        $today_date=date('Y-m-d H:i:s',time()); //获取今天日期
        $invoiceUpdateData = array(
            'upload_person'=>$staff_name,
            'upload_date'=>$today_date,
            'status'=>'已结束',
            'id' => $id
        );
        $files = $request->file('image');   // 获取表单上传文件
        if (is_null($files)) {
            return json(2);
        } else {
                foreach ($files as $newFile) {
                    // 移动到框架应用根目录/public/uploads/invoice 目录下
                    $info = $newFile->validate(['ext' => 'jpg,png,gif,jpeg'])->move(ROOT_PATH . 'public/uploads/invoice/'.$id);
                    if ($info) {
                        // 成功上传后 获取上传成功信息
                        $data = [
                            'sid' => $id,
                            'uid' => $uid,
                            'images_address' => '/../tp5/public/uploads/invoice/'.$id.'/'.$info -> getSaveName(),
                            'del_address' => '/uploads/invoice/'.$id.'/'.$info -> getSaveName()
                        ];
                        $affected = Db::name('invoice_images')->insert($data);
                        $result = Db::name('invoice')->update($invoiceUpdateData);
                        return json(1);
                    } else {
                        //  上传失败信息
                        return json(0);
                    }
                }
        }
    }
}
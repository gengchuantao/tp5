<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Evergrande;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class EvergrandeController extends IndexController
{
    public function index(){
        $contract_id=input('contract_id');
        $company = input('evergrande_company');
        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('evergrande_contract_id',$contract_id);
        Session::set('evergrande_company',$company);
        $Evergrande = new Evergrande;
        $evergrandes = $Evergrande
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->order(id,desc)
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('evergrandes', $evergrandes);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function lookup(){
        $receipt_id = input('receipt_id');
        $check_status = input('check_status');
        $company = input('evergrande_company');
        $status = input('evergrande_status');
        $cross_region = input('cross_region');
        $contract_id=input('contract_id');

        $admin=Session::get('admin');
        $companys=Session::get('company');
        $pageSize = 10; // 每页显示20条数据
        Session::set('evergrande_receipt_id',$receipt_id);
        Session::set('evergrande_check_status',$check_status);
        Session::set('evergrande_company',$company);
        Session::set('evergrande_status',$status);
        Session::set('evergrande_cross_region',$cross_region);
        Session::set('evergrande_contract_id',$contract_id);

        // 实例化Income
        $Evergrande = new Evergrande;
        if($admin===1){
            $evergrandes = $Evergrande
                ->where('receipt_id', 'like', '%' . $receipt_id . '%')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('check_status', 'like', '%' . $check_status . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('status', 'like', '%' . $status . '%')
                ->where('cross_region', 'like', '%' . $cross_region . '%')
                ->order(record_date,desc)
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $evergrandes = $Evergrande
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
        $this->assign('evergrandes', $evergrandes);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function AddForm($type,$bill_id,$bill_amount,$issue_date,$due_date,$agent,$receipt_id,$contract_id,$split_amount,$income_date){
        $company=session::get('company');
        $unique_field = $contract_id.$receipt_id;
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        // 判断数据库中是否有数据
        $list = Db::execute("SELECT id FROM helc_evergrande WHERE unique_field='$unique_field'");
        if($list>0){
            return json(date(0));
        }else{
            //向数据库中写入数据，不知道为啥只能用原生的
            $result = Db::execute("
            insert into helc_evergrande(
            type,bill_id,bill_amount,issue_date,due_date,agent,receipt_id,contract_id,split_amount,income_date
            )
            values(
            '$type','$bill_id','$bill_amount','$issue_date','$due_date','$agent','$receipt_id','$contract_id','$split_amount','$income_date'
            )
            ");
            $CallFunction = Db::execute("CALL evergrande_function;");
            return json(date(1));
        }
    }
    public function Delete($delete_id){
        $list = Db::name('evergrande')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result = Db::execute("
            DELETE FROM helc_evergrande
            WHERE id='$delete_id'
            ");
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    public function SendForm(){
        $id = $this->request->param("send_id");
        $Evergrande = new Evergrande;
        $SQLData = $Evergrande
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
 FROM helc_evergrande
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
                    UPDATE helc_evergrande 
                    SET discount_protocol = '$edit_discount_protocol'
                    WHERE id = '$edit_id'
                ");
        if($result){
            return json(date(1));
        }else{
            return json(date(0));
        }
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '1280M');
        $contract_id = Session::get('evergrande_contract_id');
        $admin=Session::get('admin');
        if($admin==1){
            $company = Session::get('evergrande_company');
        }else{
            $company = Session::get('company');
        }
        $excel = new expExcel();
        $xlsName  = "恒大原票明细表";
        //设置表头：
        $head = ['ID', '类别', '商票编号', '票面金额', '出票日期', '到期日期', '赶工奖比率', '经办人', '收款编号','合同编号', '收款编号&合同号','区域','拆分金额','买方单位','入金时间','赶工奖金额','赶工奖已收款','赶工奖欠款','已开票金额','未开票金额','赶工奖协议号','合同赶工奖总金额','合同赶工奖已开票金额','合同赶工奖已收款','合同赶工奖欠款'];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['id',
            'type',
            'concat("\t",bill_id)' => 'bill_id',
            'bill_id',
            'bill_amount',
            'issue_date','due_date','bill_ratio', 'agent','receipt_id','contract_id','unique_field','company','split_amount','buyer_unit','income_date','discount_amount','discount_collection','discount_arrears','invoice_amount','unbilled_amount','discount_protocol','contract_discount_amount','contract_invoice_amount','contract_discount_collection','contract_discount_arrears'];
        $data = Db::name('evergrande')
            ->field($keys)
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('company', 'like', '%' . $company . '%')
            ->select();

        $excel->export($xlsName,$head,$data,$keys);
    }
}
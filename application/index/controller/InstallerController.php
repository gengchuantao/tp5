<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Installer;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class InstallerController extends IndexController{
    //显示表单
    public function index(){
        // 获取查询信息
        $staff_name = input('staff_name');
        Session::set('installer_staff_name',$staff_name);
        $supplier = input('supplier');
        Session::set('installer_supplier',$supplier);
        $company = input('company');
        Session::set('installer_company',$company);
        $pageSize = 10;
        $Installer = new Installer();
        $installers = $Installer
            ->where('staff_name', 'like', '%' . $staff_name . '%')
            ->where('supplier', 'like', '%' . $supplier . '%')
            ->where('company', 'like', '%' . $company . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        $this->assign('installers', $installers);
        $htmls = $this->fetch();
        return $htmls;
    }
    //添加
    public function Add($add_supplier,$add_company,$add_city,$add_staff_name,$add_id_card,$add_foreman,$add_certificate_no,$add_issue_date,$add_closing_date,$add_issuing_authority,$add_head_records,$add_record_date,$add_insurance_period_from,$add_insurance_period_to,$add_captain,$add_electrician_certificate,$add_electrician_certificate_due_date,$add_welder_certificate,$add_welder_certificate_due_date){
        // 判断数据库中是否有数据
        $list = Db::execute("SELECT id FROM helc_installer WHERE id_card='$add_id_card'");
        if($list>0){
            return json(date(0));
        }else{
            //向数据库中写入数据，不知道为啥只能用原生的
            $result = Db::execute("
            insert into helc_installer(
            supplier,company,city,staff_name,id_card,foreman,certificate_no,issue_date,closing_date,issuing_authority,head_records,record_date,insurance_period_from,insurance_period_to,captain,electrician_certificate,electrician_certificate_due_date,welder_certificate,welder_certificate_due_date
            )
            values(
            '$add_supplier','$add_company','$add_city','$add_staff_name','$add_id_card,','$add_foreman','$add_certificate_no,','$add_issue_date','$add_closing_date','$add_issuing_authority','$add_head_records','$add_record_date','$add_insurance_period_from','$add_insurance_period_to','$add_captain','$add_electrician_certificate','$add_electrician_certificate_due_date','$add_welder_certificate','$add_welder_certificate_due_date'
            )
            ");
            return json(date(1));
        }
    }
    public function Delete($delete_id){
        $list = Db::name('installer')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result = Db::execute("
            DELETE FROM helc_installer
            WHERE id='$delete_id'
            ");
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    //获取更新字段
    public function SendForm(){
        $id = $this->request->param("send_id");
        $sqldata= Db::query("
 SELECT id,supplier,company,city,staff_name,id_card,foreman,certificate_no,issue_date,closing_date,issuing_authority,head_records,record_date,insurance_period_from,insurance_period_to,captain,electrician_certificate,electrician_certificate_due_date,welder_certificate,welder_certificate_due_date
 FROM helc_installer
WHERE id='$id'
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['id']=$sqldata[$i]['id'];
            $sqldata1[$i]['supplier']=$sqldata[$i]['supplier'];
            $sqldata1[$i]['company']=$sqldata[$i]['company'];
            $sqldata1[$i]['city']=$sqldata[$i]['city'];
            $sqldata1[$i]['staff_name']=$sqldata[$i]['staff_name'];
            $sqldata1[$i]['id_card']=$sqldata[$i]['id_card'];
            $sqldata1[$i]['foreman']=$sqldata[$i]['foreman'];
            $sqldata1[$i]['certificate_no']=$sqldata[$i]['certificate_no'];
            $sqldata1[$i]['issue_date']=$sqldata[$i]['issue_date'];
            $sqldata1[$i]['closing_date']=$sqldata[$i]['closing_date'];
            $sqldata1[$i]['issuing_authority']=$sqldata[$i]['issuing_authority'];
            $sqldata1[$i]['head_records']=$sqldata[$i]['head_records'];
            $sqldata1[$i]['record_date']=$sqldata[$i]['record_date'];
            $sqldata1[$i]['insurance_period_from']=$sqldata[$i]['insurance_period_from'];
            $sqldata1[$i]['insurance_period_to']=$sqldata[$i]['insurance_period_to'];
            $sqldata1[$i]['captain']=$sqldata[$i]['captain'];
            $sqldata1[$i]['electrician_certificate']=$sqldata[$i]['electrician_certificate'];
            $sqldata1[$i]['electrician_certificate_due_date']=$sqldata[$i]['electrician_certificate_due_date'];
            $sqldata1[$i]['welder_certificate']=$sqldata[$i]['welder_certificate'];
            $sqldata1[$i]['welder_certificate_due_date']=$sqldata[$i]['welder_certificate_due_date'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //更新
    public function UpdateForm($id,$add_supplier,$add_company,$add_city,$add_staff_name,$add_id_card,$add_foreman,$add_certificate_no,$add_issue_date,$add_closing_date,$add_issuing_authority,$add_head_records,$add_record_date,$add_insurance_period_from,$add_insurance_period_to,$add_captain,$add_electrician_certificate,$add_electrician_certificate_due_date,$add_welder_certificate,$add_welder_certificate_due_date){
        $list = Db::execute("SELECT id FROM helc_installer WHERE id='$id'");
        if($list>0){
            $result = Db::execute("
            UPDATE helc_installer
            SET supplier = '$add_supplier',
                company = '$add_company',
                city = '$add_city',
                staff_name = '$add_staff_name',
                id_card = '$add_id_card',
                foreman = '$add_foreman',
                certificate_no = '$add_certificate_no',
                issue_date = '$add_issue_date',
                closing_date = '$add_closing_date',
                issuing_authority = '$add_issuing_authority',
                head_records = '$add_head_records',
                record_date = '$add_record_date',
                insurance_period_from = '$add_insurance_period_from',
                insurance_period_to = '$add_insurance_period_to',
                captain = '$add_captain',
                electrician_certificate = '$add_electrician_certificate',
                electrician_certificate_due_date = '$add_electrician_certificate_due_date',
                welder_certificate = '$add_welder_certificate',
                welder_certificate_due_date = '$add_welder_certificate_due_date'
            WHERE id = '$id'
            ");
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    //导出
    public function export(){
        ini_set ('memory_limit', '1280M');
        $staff_name = Session::get('installer_staff_name');
        $supplier = Session::get('installer_supplier');
        $company = Session::get('installer_company');
        $admin=Session::get('admin');
        $excel = new expExcel();
        $xlsName  = "安装网点人员清单";
        if($admin==1){
            $data = Db::name('installer')
                ->where('staff_name','like','%'.$staff_name.'%')
                ->where('supplier', 'like', '%' . $supplier . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->select();
        }else{
            $data = Db::name('installer')
                ->where('staff_name','like','%'.$staff_name.'%')
                ->where('supplier', 'like', '%' . $supplier . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->select();
        }


        //设置表头：
        $head = ['ID', '安装网点名称', '分公司', '安装市区', '人员姓名', '身份证号', '班组长', '操作证编号', '发证日期','截止日期', '发证机构','总公司是否备案','备案日期','保险有效期从','保险有效期至','大队长','有无电工证','电工证到期日期','有无焊工证','焊工证到期日期'];

        //数据中对应的字段，用于读取相应数据：
        $keys = ['id','supplier','company','city','staff_name','id_card','foreman', 'certificate_no','issue_date','closing_date','issuing_authority','head_records','record_date','insurance_period_from','insurance_period_to','captain','electrician_certificate','electrician_certificate_due_date','welder_certificate','welder_certificate_due_date'];

        $excel->outdata($xlsName,$head,$data,$keys);
    }
    //查询
    public function Search(){
        // 获取查询信息
        $staff_name = input('staff_name');
        Session::set('installer_staff_name',$staff_name);
        $supplier = input('supplier');
        Session::set('installer_supplier',$supplier);
        $company = input('company');
        Session::set('installer_company',$company);
        $pageSize = 10;
        $Installer = new Installer();
        $installers = $Installer
            ->where('staff_name', 'like', '%' . $staff_name . '%')
            ->where('supplier', 'like', '%' . $supplier . '%')
            ->where('company', 'like', '%' . $company . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        $this->assign('installers', $installers);
        $htmls = $this->fetch();
        return $htmls;
    }
}
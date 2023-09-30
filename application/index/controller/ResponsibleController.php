<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Responsible;
use app\Common;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class ResponsibleController extends IndexController{

    public function index(){
        return $this->fetch();
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getResponsibleIntoByCondition(Request $request){
        $requestData=$request->param();
        $name = $requestData['search_name'];
        $company = $requestData['search_company'];
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('responsible')
            ->where('name', 'like', '%' . $name . '%')
            ->where('company', 'like', '%' . $company . '%')
            ->order("field(status,'在职','转岗','离职')")
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    //  新建
    public function newName(Request $request){
        $today_date=session::get('today_date');
        $requestData=$request->param();
        $data[] = [
            'emid' => $requestData['emid'],
            'name' => $requestData['name'],
            'company' => $requestData['company'],
            'office' => $requestData['office'],
            'position' => $requestData['position'],
        ];
        $result=Db::name('responsible')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    /*删除数据*/
    /**
     * @throws PDOException
     * @throws Exception
     */
    function Delete($delete_id){
        $list = Db::name('responsible')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('responsible')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //  修改商票基本信息

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function EditForm(Request $request){
        $requestData=$request->param();
        $data=array(
            'emid' => $requestData['update_emid'],
            'name' => $requestData['update_name'],
            'company' => $requestData['update_company'],
            'office' => $requestData['update_office'],
            'position' => $requestData['update_position'],
            'status' => $requestData['update_status'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('responsible')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('responsible')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function update(){
        // 接收数据
        $responsible = Request::instance()->post();

        // 将数据存入Responsible表
        $Responsible = new Responsible();
        $state = $Responsible->isUpdate(true)->save($responsible);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '1280M');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '工号'=>'string',
            '姓名'=>'string',
            '分公司'=>'string',
            '职位'=>'string',
            '状态'=>'string',
            '创建时间'=>'datetime',
            '更新时间'=>'datetime'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'emid',
            'name',
            'company',
            'position',
            'status',
            'create_time',
            'update_time'
        ];
        $data=Db::name('responsible')
            ->field($keys)
            ->select();
        $excel->exports('销售团队成员', $head, $data, $keys);
    }
    //获取区域
    public function GetCompany(){
        $Companys= Db::table('helc_responsible')->distinct(true)->field('company')->select();
        $MySql=[];
        for ($i=0; $i < count($Companys) ; $i++) {
            $MySql[$i]=$Companys[$i]['company'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    //获取营业员
    public function GetSalesPerson($company){
        if($company=='山东分公司'){
            $Companys= Db::table('helc_responsible')
                ->where('position','like','%业%')
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }else{
            $Companys= Db::table('helc_responsible')
                ->where('company','=',$company)
                ->where('position','like','%业%')
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }

        $MySql=[];
        for ($i=0; $i < count($Companys) ; $i++) {
            $MySql[$i]=$Companys[$i]['name'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    //获取项目经理
    public function GetSupervisor($company){
        if($company=='山东分公司'){
            $Companys= Db::table('helc_responsible')
                ->where('position','=','项目经理')
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }else{
            $Companys= Db::table('helc_responsible')
                ->where('company','=',$company)
                ->where('position','=','项目经理')
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }

        $MySql=[];
        for ($i=0; $i < count($Companys) ; $i++) {
            $MySql[$i]=$Companys[$i]['name'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    /**
     * Api接口
     */
    //获取所有在职人员
    public function GetAll($company){
        if($company=='山东分公司'){
            $Companys= Db::table('helc_responsible')
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }else{
            $Companys= Db::table('helc_responsible')
                ->where('company','=',$company)
                ->where('status','=','在职')
                ->field('name')
                ->select();
        }

        $MySql=[];
        for ($i=0; $i < count($Companys) ; $i++) {
            $MySql[$i]=$Companys[$i]['name'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }

    //通过分公司获取事业部计提人员信息
    public function getDrawingStaffByCompany(){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $company = Session::get('company');
        switch ($admin){
            case 1:
                $wheres['company'] = ['like','%'];
                break;
            default:
                $wheres['company'] = ['=',$company];
        }
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('responsible')
                ->field('name')
                ->where($wheres)
                ->where('status','=','在职')
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        for ($i=0; $i < count($data) ; $i++) {
            $MySql[$i]=$data[$i]['name'];
        }
        $SqlJson=json_encode($MySql);
        echo  $SqlJson;
    }
    //获取员工编号
    public function getDrawingStaffIdByName($staff_name){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $company = Session::get('company');
        $wheres['name'] = ['=',$staff_name];
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('responsible')
                ->field(['emid','position'])
                ->where($wheres)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }

        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //获取员工职责
    public function getStaffPostByName($staff_name){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $company = Session::get('company');
        $wheres['name'] = ['=',$staff_name];
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('responsible')
                ->field('position')
                ->where($wheres)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }

        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
}
<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Staff;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class StaffController extends IndexController{
    public function index(){
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function GetStaffInfoByCondition(Request $request){
        $requestData=$request->param();
        $staff_id = $requestData['search_staff_id'];
        $staff_name = $requestData['search_staff_name'];
        if(empty($staff_id) && empty($staff_name)){
            $data=Db::name('staff')
                ->order('id','desc')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('staff')
                ->where('staff_id', 'like', '%' . $staff_id . '%')
                ->where('staff_name', 'like', '%' . $staff_name . '%')
                ->order('id','desc')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function NewStaff($staff_name,$staff_id,$sex,$password,$role,$company){
        // 实例化
        $data[] = [
            'staff_name' => $staff_name,
            'staff_id' => $staff_id,
            'sex' => $sex,
            'password' => $password,
            'role' => $role,
            'company' => $company,
        ];
        $result=Db::name('staff')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //  通过ID获取用户信息
    public function GetStaffInfo(){
        $id = $this->request->param("id");
        $data=Db::name('staff')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //  删除用户

    /**
     * @throws PDOException
     * @throws Exception
     */
    function Delete ($delete_id){
        $result=Db::name('staff')
            ->where('id','=',$delete_id)
            ->delete();
        if($result){
            return json(1);
        }else {
            return json(0);
        }
    }
    //  修改员工基本信息
    public function Edit($update_id,$update_staff_id,$update_staff_name,$update_sex,$update_password,$update_role,$update_company){
        $data=array(
            'staff_id' => $update_staff_id,
            'staff_name' => $update_staff_name,
            'sex' => $update_sex,
            'password' => $update_password,
            'role' => $update_role,
            'company' => $update_company,
            'id' => $update_id
        );
        $check=Db::name('staff')->where(['id' => $update_id])->count();
        if($check>0){
            $result=Db::name('staff')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function changepw()
    {
        // 修改密码
        $staff_id = session('staff_id');
        // 向V层传数据
        $this->assign('staff_id', $staff_id);
        return $this->fetch();
    }
    public function pwupdate()
    {
        // 接收数据
        $a = Request::instance()->post();
        $b=md5($a['password']);
        $c = Session::get('staff_id');
        $sql="UPDATE helc_staff SET password = '$b' WHERE staff_id = '$c'";
        //执行插入操作
        $affected = Db::execute($sql);
        //判断是否执行成功
        if ($affected){
            $this->success('更新成功!',url('Login/logout'),'',3);

        }else{
            $this->error('更新失败');
        }
        $result= Db::execute("CALL proce_check_weak_password();");
    }
    public function ResetPassWord($reset_id){
        $result = Db::execute("
            update helc_staff
            set password = '5690dddfa28ae085d23518a035707282'
            where id = '$reset_id'
            ");
        return json(date(1));
    }

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetCompany(){
        $Companys= Db::table('helc_staff')
            ->distinct(true)
            ->field('company')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($Companys) ; $i++) {
            $MySql[$i]=$Companys[$i]['company'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    //导出Excel
    function export(){
        //ini_set ('memory_limit', '2048M');
        $excel = new expExcel();
        $staff_name = Session::get('staff_staff_name');
        $xlsName  = "用户信息表";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '员工编号'=>'string',
            '员工姓名'=>'string',
            '性别'=>'string',
            '密码'=>'string',
            '角色'=>'string',
            '分公司'=>'string',
            '创建时间'=>'datetime',
            '更新时间'=>'datetime'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'staff_id',
            'staff_name',
            'sex',
            'password',
            'role',
            'company',
            'create_time',
            'update_time'
        ];
        $data = Db::name('staff')
            ->field($keys)
            ->where('staff_name','like','%'.$staff_name.'%')
            ->select();
        $excel->exports($xlsName, $head, $data, $keys);
    }

    /**
     * Api接口
     */
    //事业部计提获取人员信息
    public function getStaff(){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $company = Session::get('company');
        switch ($admin){
            case 1:
                $wheres['company'] = ['like',''];
                break;
            default:
                $wheres['company'] = ['=',$company];
        }
        $data = new \ArrayObject();
        try {
            $data = Db::name('staff')
                ->where($wheres)
                ->where('role','in','营业员,项目经理,营业助理')
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

}
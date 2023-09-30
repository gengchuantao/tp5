<?php
namespace app\index\controller;
use app\common\model\Role;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Session;
use think\Db;
class RoleController extends IndexController
{
    public function index(){
        // 获取查询信息
        $role_name = input('role_name');

        $pageSize = 10; // 每页显示10条数据

        // 实例化Role
        $Role = new Role;

        // 按条件查询数据并调用分页
        $roles = $Role->where('role_name', 'like', '%' . $role_name . '%')->paginate($pageSize, false, [
            'query'=>[
                'role_name' => $role_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('roles', $roles);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetRole(){
        $Roles= Db::table('helc_role')
            ->distinct(true)
            ->field('role_name')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($Roles) ; $i++) {
            $MySql[$i]=$Roles[$i]['role_name'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetRoleInfo(){
        $role_name=\session('role');
        $roleName= Db::table('helc_role')
            ->where('role_name','=',$role_name)
            ->select();
        $SqlData=json_encode($roleName);
        echo  $SqlData;
    }
}
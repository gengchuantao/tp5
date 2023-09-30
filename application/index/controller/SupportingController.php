<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Supporting;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class SupportingController extends IndexController{
    public function index(){
        // 获取查询信息
        $pageSize = 1000; // 每页显示10条数据
        $CallFunction = Db::execute("CALL PrintFunction;");
        // 实例化Supporting
        $Supporting = new Supporting;
        // 按条件查询数据并调用分页
        $supportings = $Supporting
            ->where('department', '=', '工程管理')
            ->where('print_status', '=', '0')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('supportings', $supportings);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function install(){
        // 获取查询信息
        $pageSize = 1000; // 每页显示10条数据
        $CallFunction = Db::execute("CALL PrintFunction;");
        // 实例化Supporting
        $Supporting = new Supporting;

        // 按条件查询数据并调用分页
        $supportings = $Supporting
            ->where('department', '=', '安装部')
            ->where('print_status', '=', '0')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('supportings', $supportings);
        // 将数据返回给用户
        return $this->fetch();
    }

}
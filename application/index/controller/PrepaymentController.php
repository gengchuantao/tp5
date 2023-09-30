<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Prepayment;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class PrepaymentController extends IndexController
{
    /*---------------------工号明细页面----------------------*/
    //加载页面时显示
    public function index()
    {
        // 获取查询信息
        $pageSize = 1000; // 每页显示500条数据
        $CallFunction = Db::execute("CALL PrintFunction;");
        // 实例化Teacher
        $Prepayment = new Prepayment;
        // 按条件查询数据并调用分页
        $prepayments = $Prepayment
            ->where('print_status', '=', '0')
            ->paginate($pageSize, false, ['query' => request()->param()]);
        // 向V层传数据
        $this->assign('prepayments', $prepayments);
        // 将数据返回给用户
        return $this->fetch();
    }
}
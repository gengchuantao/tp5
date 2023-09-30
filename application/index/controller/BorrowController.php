<?php
namespace app\index\controller;
use app\common\model\Borrow;
use think\Controller;
use think\Request;
use think\Db;
class BorrowController extends IndexController{
public function index(){
    // 获取查询信息
    $contract_id = input('contract_id');
    $pageSize = 20; // 每页显示20条数据
    // 实例化
    $Borrow = new Borrow;
    // 按条件查询数据并调用分页
    $borrows = $Borrow
        ->where('contract_id', 'like', '%' . $contract_id . '%')
        ->order('borrow_date')
        ->paginate($pageSize, false, ['query'=>request()->param()]);
    // 向V层传数据
    $this->assign('borrows', $borrows);
    return $this->fetch();
}

}
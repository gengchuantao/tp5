<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\WorkInstruction;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class WorkInstructionController extends IndexController
{
    public function index(){
        // 获取查询信息
        return $this->fetch();
    }
    public function modify(){
        // 修改单指引
        return $this->fetch();
    }
    public function tax_reform(){
        // 税改
        return $this->fetch();
    }
    public function factor(){
        // 保理手续费指引
        return $this->fetch();
    }
    public function hengda(){
        // 恒大流程指引
        return $this->fetch();
    }
    public function evergrande(){
        // 赶工奖流程指引
        return $this->fetch();
    }
    public function bad_cost(){
        // 坏账申请流程指引
        return $this->fetch();
    }
    public function uncollectible(){
        // 不可收流程指引
        return $this->fetch();
    }
    public function document_handover_sheet(){
        // 不可收流程指引
        return $this->fetch();
    }
}
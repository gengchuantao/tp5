<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Bucost;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class BucostController extends IndexController
{
    public function index(){

        // 获取查询信息
        $staff_name = Request::instance()->get('staff_name');
        Session::set('cost_name',$staff_name);
        $pageSize = 10; // 每页显示10条数据

        // 实例化Teacher
        $Bucost = new Bucost;

        // 按条件查询数据并调用分页
        $bucosts = $Bucost->where('staff_name', 'like', '%' . $staff_name . '%')->paginate($pageSize, false, [
            'query'=>[
                'staff_name' => $staff_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('bucosts', $bucosts);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function report(){

        // 获取查询信息
        $staff_name = Request::instance()->get('staff_name');
        Session::set('cost_name',$staff_name);
        $pageSize = 10; // 每页显示10条数据

        // 实例化Teacher
        $Bucost = new Bucost;

        // 按条件查询数据并调用分页
        $bucosts = $Bucost->where('staff_name', 'like', '%' . $staff_name . '%')->paginate($pageSize, false, [
            'query'=>[
                'staff_name' => $staff_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('bucosts', $bucosts);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    /*
     * 往数据库插入数据
     */
    public function insert(){
        // 接收传入数据
        $postData = Request::instance()->post();

        // 实例化Bustaff空对象
        $Bucost = new Bucost();

        // 为对象赋值
        $Bucost->staff_id = $postData['staff_id'];
        $Bucost->staff_name = $postData['staff_name'];
        $Bucost->staff_bu = $postData['staff_bu'];
        $Bucost->cost_content = $postData['cost_content'];
        $Bucost->cost_sum = $postData['cost_sum'];
        $Bucost->fyear = $postData['fyear'];
        $Bucost->reim_date = $postData['reim_date'];
        $Bucost->remarks = $postData['remarks'];
        // 新增对象至数据表
        $result = $Bucost->save();

        // 反馈结果
        if (false === $result)
        {
            // 验证未通过，发生错误
            $message = '新增失败:' . $Bucost->getError();
        } else {
            // 提示操作成功，并跳转至教师管理列表
            return $this->success('新增成功', url('index'));
        }
    }
    /*
     * 删除数据
     */
    public function delete()
    {
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $Bucost = Bucost::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Bucost)) {
            // 删除对象
            if ($Bucost->delete()) {
                return $this->success('删除成功', url('index'));
            }
        }

        return '删除失败';

    }

    /*
     * 提交表单
     */
    public function add()
    {
        try {
            $htmls = $this->fetch();
            return $htmls;
        } catch (\Exception $e) {
            return '系统错误' . $e->getMessage();
        }
    }
        /*
         * 获取要修改的数据
         */
    public function edit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Bucost = Bucost::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }
        // 将数据传给V层
        $this->assign('Bucost', $Bucost);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
        /*
         * 更新数据
         */
    public function update(){
        // 接收数据
        $bucost = Request::instance()->post();
        //var_dump($bucost);
        // 将数据存入Bucost表
        $Bucost = new Bucost();
        $state = $Bucost->isUpdate(true)->save($bucost);

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
        $xlsName  = "事业部报销明细";
        $data = Db::name('bucost')
            ->select();

        //设置表头：
        $head = ['ID', '员工编号', '员工编号', '所属事业部', '报销单内容', '报销金额', '财年', '报销日期', '备注'];

        //数据中对应的字段，用于读取相应数据：
        $keys = ['id', 'staff_id', 'staff_name', 'staff_bu', 'cost_content', 'cost_sum', 'fyear', 'reim_date', 'remarks'];

        $excel->outdata($xlsName, $head, $data, $keys);
    }
}
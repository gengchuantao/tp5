<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\controller\ExcelController as expExcel; //调用导出EXCEL类
use app\common\model\Bigcustomer;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class BigcustomerController extends IndexController{
    public function index(){
        // 获取查询信息
        $customer_id = input('customer_id');
        $full_name = input('full_name');
        $pageSize = 20; // 每页显示20条数据
        $Bigcustomer = new Bigcustomer;// 实例化

        // 按条件查询数据并调用分页
        $bigcustomers = $Bigcustomer
            ->where('customer_id', 'like', '%' . $customer_id . '%')
            ->where('full_name', 'like', '%' . $full_name . '%')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bigcustomers', $bigcustomers);
        $htmls = $this->fetch();
        return $htmls;
    }
    public function add()
    {
        try {
            $htmls = $this->fetch();
            return $htmls;
        } catch (\Exception $e) {
            return '系统错误' . $e->getMessage();
        }
    }
    public function insert(){
        // 接收传入数据
        $postData = Request::instance()->post();
        $Bigcustomer = new Bigcustomer();// 实例化

        // 为对象赋值
        $Bigcustomer->customer_id = $postData['customer_id'];
        $Bigcustomer->full_name = $postData['full_name'];
        $Bigcustomer->short_name = $postData['short_name'];
        $Bigcustomer->head_salesperson = $postData['head_salesperson'];
        $Bigcustomer->phone = $postData['phone'];
        // 新增对象至数据表
        $result = $Bigcustomer->save();

        // 反馈结果
        if (false === $result)
        {
            // 验证未通过，发生错误
            $message = '新增失败:' . $Bigcustomer->getError();
        } else {
            // 提示操作成功，并跳转至教师管理列表
            return $this->success('新增成功', url('index'));
        }
    }
    /*删除数据*/
    public function delete()
    {
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $Bigcustomer = Bigcustomer::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Bigcustomer)) {
            // 删除对象
            if ($Bigcustomer->delete()) {
                return $this->success('删除成功', url('index'));
            }
        }

        return '删除失败';

    }
    public function edit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Responsible表模型中获取当前记录
        if (is_null($Bigcustomer =Bigcustomer::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }

        // 将数据传给V层
        $this->assign('Bigcustomer', $Bigcustomer);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function update(){
        // 接收数据
        $bigcustomer = Request::instance()->post();

        // 将数据存入Responsible表
        $Bigcustomer = new Bigcustomer();
        $state = $Bigcustomer->isUpdate(true)->save($bigcustomer);

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
        $xlsName  = "大客户明细";
        $data = Db::name('bigcustomer')
            ->select();

        //设置表头：
        $head = [
            'ID'=>'integer',
            '大客户编码'=>'string',
            '大客户全称'=>'string',
            '大客户简称'=>'string',
            '总部营业员'=>'string',
            '联系方式'=>'string',
            '状态'=>'string',
            '创建时间'=>'date',
            '更新时间'=>'date'];

        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'customer_id',
            'full_name',
            'short_name',
            'head_salesperson',
            'phone','status',
            'create_time',
            'update_time'];

        $excel->exports($xlsName, $head, $data, $keys);
    }
}
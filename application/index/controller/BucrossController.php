<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Bucross;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class BucrossController extends IndexController
{
    public function index(){

        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        Session::set('bucross_contract_id',$contract_id);
        $pageSize = 10; // 每页显示10条数据

        // 实例化Teacher
        $Bucross = new Bucross;

        // 按条件查询数据并调用分页
        $bucrosss = $Bucross->where('contract_id', 'like', '%' . $contract_id . '%')->paginate($pageSize, false, [
            'query'=>[
                'contract_id' => $contract_id,
            ],
        ]);

        // 向V层传数据
        $this->assign('bucrosss', $bucrosss);

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

        // 实例化Bucross空对象
        $Bucross = new Bucross();

        // 为对象赋值
        $Bucross->contract_id = $postData['contract_id'];
        $Bucross->sale_company = $postData['sale_company'];
        $Bucross->install_company = $postData['install_company'];
        $Bucross->if_close = $postData['if_close'];
        $Bucross->sale_bu = $postData['sale_bu'];
        $Bucross->install_bu = $postData['install_bu'];

        // 新增对象至数据表
        $result = $Bucross->save();

        // 反馈结果
        if (false === $result)
        {
            // 验证未通过，发生错误
            $message = '新增失败:' . $Bucross->getError();
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
        $Bucross = Bucross::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Bucross)) {
            // 删除对象
            if ($Bucross->delete()) {
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
        if (is_null($Bucross = Bucross::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }
        // 将数据传给V层
        $this->assign('Bucross', $Bucross);
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
        $bucross = Request::instance()->post();
        //var_dump($bucross);
        // 将数据存入Bucross表
        $Bucross = new Bucross();
        $state = $Bucross->isUpdate(true)->save($bucross);

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
        $xlsName  = "跨区域合同明细";
        $data = Db::name('bucross')
                ->select();

        //设置表头：
        $head = ['ID', '合同号', '销售区域', '安装区域', '是否关闭','销售事业部','安装事业部'];

        //数据中对应的字段，用于读取相应数据：
        $keys = ['id', 'contract_id', 'sale_company', 'install_company', 'if_close', 'sale_bu', 'install_bu'];

        $excel->outdata($xlsName, $head, $data, $keys);
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\model\Bufinance;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class BufinanceController extends IndexController
{
    public function index(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        // 获取查询信息
        $bu_name = Request::instance()->get('bu_name');
        $pageSize = 40; // 每页显示5条数据
        // 实例化Teacher
        $Bufinance = new Bufinance;

        // 按条件查询数据并调用分页
        $bufinances = $Bufinance
            ->where('bu_name', 'like', '%' . $bu_name . '%')
            ->where('year', '=', $fyear)
            ->order('quarter_pay_balance desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufinances', $bufinances);
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function report(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        // 获取查询信息
        $staff_bu = Session::get('staff_bu');

        $pageSize = 100; // 每页显示100条数据

        // 实例化
        $Bufinance = new Bufinance;

        // 按条件查询数据并调用分页
        $bufinances = $Bufinance
            ->where('bu_name', 'like', '%' . $staff_bu . '%')
            ->where('year', '=', $fyear)
            ->order('quarter_pay_balance desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufinances', $bufinances);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function companyReport(){
        $fyear = Session::get('fyear');
        // 获取事业部名称
        $bu_name = Request::instance()->get('bu_name');
        $company = Session::get('company');
        $pageSize = 10; // 每页显示100条数据
        // 实例化
        $Bufinance = new Bufinance;
        // 按条件查询数据并调用分页
        $bufinances = $Bufinance
            ->where('company', 'like', '%' . $company . '%')
            ->where('bu_name', 'like', '%' . $bu_name . '%')
            ->where('year', '=', $fyear)
            ->where('status', '=', '1')
            ->order('quarter_pay_balance desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufinances', $bufinances);
        // 将数据返回给用户
        return $this->fetch();
    }

    public function year(){
        $staff_bu = Session::get('staff_bu');
        $pageSize = 100; // 每页显示100条数据
        //获取财年
        $fyear=Session::get('fyear');
        // 实例化
        $Bufinance = new Bufinance;

        // 按条件查询数据并调用分页
        $bufinances = $Bufinance
            ->where('bu_name', 'like', '%' . $staff_bu . '%')
            ->where('year', '=', $fyear)
            ->where('status', '=', '1')
        //    ->where('condition', '>=', '90')
            ->order('year_balance desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufinances', $bufinances);
        // 将数据返回给用户
        return $this->fetch();;
    }
    /*
     * 往数据库插入数据
     */
    public function insert(){
        // 接收传入数据
        $postData = Request::instance()->post();

        // 实例化Bustaff空对象
        $Bufinance = new Bufinance();

        // 为对象赋值
        $Bufinance->staff_id = $postData['staff_id'];
        $Bufinance->staff_name = $postData['staff_name'];
        $Bufinance->staff_bu = $postData['staff_bu'];
        $Bufinance->finance_content = $postData['finance_content'];
        $Bufinance->finance_sum = $postData['finance_sum'];
        $Bufinance->reim_date = $postData['reim_date'];

        // 新增对象至数据表
        $result = $Bufinance->save();

        // 反馈结果
        if (false === $result)
        {
            // 验证未通过，发生错误
            $message = '新增失败:' . $Bufinance->getError();
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
        $Bufinance = Bufinance::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Bufinance)) {
            // 删除对象
            if ($Bufinance->delete()) {
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
        if (is_null($Bufinance = Bufinance::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }
        // 将数据传给V层
        $this->assign('Bufinance', $Bufinance);
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
        $bufinance = Request::instance()->post();
        //var_dump($bufinance);
        // 将数据存入Bufinance表
        $Bufinance = new Bufinance();
        $state = $Bufinance->isUpdate(true)->save($bufinance);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    //事业部生效明细
    public function buintoforce(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $staff_bu = Session::get('staff_bu');
        $result= Db::query("
SELECT year,contract_id,po,co,br,helc_bustaff.staff_bu 
FROM
(SELECT helc_contract.project_name AS po,helc_contract.contract_id,count(product_id) AS co,sales_person as br,date_format(into_force_date,'%y-%m') AS year,belong_to
FROM helc_contract,helc_product
WHERE helc_contract.contract_id = helc_product.contract_id AND status='正常' AND if_into_force = '是'  AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY po,br,belong_to)AS A,helc_bustaff
WHERE helc_bustaff.staff_name=A.br AND staff_bu = '$staff_bu'
AND helc_bustaff.fyear='$fyear'
ORDER BY year
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //事业部生效明细
    public function finance(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $result= Db::name('bufinance')->where('year','=',$fyear)->select();

        // 向V层传数据
        $this->assign('result', $result);
        // 将数据返回给用户
        return $this->fetch();
    }
    //事业部完工明细
    public function bucomplete(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $staff_bu = Session::get('staff_bu');
        $result= Db::query("
SELECT year,complete_bu,contract_id,COUNT(product_id) AS complete_sum,project_name,supervisor FROM
(SELECT helc_product.product_id,helc_product.contract_id,date_format(helc_product.complete_date,'%y-%m') AS year,helc_product.complete_bu,helc_contract.project_name,helc_product.install_company,helc_product.supervisor
FROM helc_product,helc_contract
WHERE helc_product.contract_id = helc_contract.contract_id AND complete_bu='$staff_bu' AND complete_date BETWEEN '$fyear_start' AND '$fyear_end'
UNION
SELECT helc_product.product_id,helc_product.contract_id,date_format(helc_product.temp_elevator_date,'%y-%m') AS year,helc_product.complete_bu,helc_contract.project_name,helc_product.install_company,helc_product.supervisor
FROM helc_product,helc_contract
WHERE helc_product.contract_id = helc_contract.contract_id AND complete_bu='$staff_bu' AND temp_elevator_date BETWEEN '$fyear_start' AND '$fyear_end') AS A
GROUP BY project_name,complete_bu
ORDER BY year,complete_sum
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //事业部收款明细
    public function buincome(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $staff_bu = Session::get('staff_bu');
        $result= Db::query("
SELECT income_date AS year,classification,contract_id,buyer,payee,SUM(split_amount) AS sum,income_way,income_bu
FROM helc_income
WHERE income_bu='$staff_bu' AND income_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY year,contract_id,payee
ORDER BY year
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function bucost()
    {
        $staff_bu = Session::get('staff_bu');

        $result= Db::query("
SELECT staff_name,staff_bu,cost_content,cost_sum,fyear,reim_date 
FROM helc_bucost
WHERE staff_bu = '$staff_bu'
ORDER BY reim_date DESC
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function arrears(){

        // 获取事业部名称
        $staff_bu = Session::get('staff_bu');
        // 获取分公司名称
        $company = Session::get('company');
        $pageSize = 35; // 每页显示5条数据

        // 实例化
        $Arrears = new Arrears;

        // 按条件查询数据并调用分页
        $arrearss = $Arrears
            ->where('bu_name', 'like', '%' . $staff_bu . '%')
            ->order('expire_date')
            ->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $staff_bu,
            ],
        ]);
/*        //事业部总体得分
            $result1= Db::query("SELECT product_id,contract_id,buyer,expire_date,arrears_amount,arrears_staff,arrears_type,history_back,history_balance FROM `helc_arrears`
WHERE bu_name='$staff_bu'
ORDER BY expire_date;
");*/
        // 向V层传数据
        $this->assign('result1', $arrearss);
        $this->display();
        $htmls = $this->fetch();
        return $htmls;
    }
    //导出Excel
    function export(){
        $bu_name = input('bu_name');
        $xlsName  = "事业部薪酬费用池";//设置导出文件名称
        //表头
        $xlsCell  = array(
            array('id','ID'),
            array('bu_name','事业部名称'),
            array('company','分公司'),
            array('quarter_pay','季度薪酬池'),
            array('sum_drawing','季度计提'),
            array('quarter_pay_balance','季度薪酬池结余'),
            array('quarter_cost','季度费用池'),
            array('sum_cost','季度支出'),
            array('quarter_cost_balance','季度费用池余额'),
            array('year_pay','财年薪酬池'),
            array('year_sum_drawing','财年薪酬池计提'),
            array('year_pay_balance','财年薪酬池结余'),
            array('year_cost','财年费用池'),
            array('year_sum_cost','财年支出'),
            array('year_cost_balance','财年费用池结余'),
            array('year','财年'),
        );
        $xlsData  = Db::name('bufinance')->select();
        $this->exportExcel($xlsName,$xlsCell,$xlsData);
    }
    //导出Excel
    function toexcel(){
        ini_set ('memory_limit', '1280M');
        $staff_bu = Session::get('staff_bu');
        $xlsName  = "export";//设置导出文件名称
        //表头
        $xlsCell  = array(
            array('product_id','工号'),
            array('contract_id','合同号'),
            array('buyer','买方单位'),
            array('big_customer','大客户'),
            array('big_project','大项目'),
            array('expire_date','到期应收日期'),
            array('arrears_amount','欠款金额'),
            array('company','分公司'),
            array('arrears_staff','欠款人'),
            array('bu_name','事业部名称'),
            array('arrears_type','欠款类型'),
            array('history_back','历史欠款回收'),
            array('history_balance','历史欠款结余'),
        );
        $xlsData  = Db::name('arrears')
            ->where('bu_name', 'like', '%' . $staff_bu . '%')
            ->order('expire_date')
            ->select();
        $this->exportExcel($xlsName,$xlsCell,$xlsData);
    }

    //通过事业部名称获取事业部可计提金额
    public function getQuarterPayBalanceByBuName(){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $fyear = Session::get('fyear');
        switch ($admin){
            case 1:
                $wheres['bu_name'] = ['like',''];
                break;
            default:
                $wheres['bu_name'] = ['=',$bu_name];
        }
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('bufinance')
                ->field('quarter_pay_balance')
                ->where($wheres)
                ->where('year','=',$fyear)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //通过事业部名称获取事业部年终奖可计提金额
    public function getYearBalanceByBuName(){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $fyear = Session::get('fyear');
        switch ($admin){
            case 1:
                $wheres['bu_name'] = ['like',''];
                break;
            default:
                $wheres['bu_name'] = ['=',$bu_name];
        }
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('bufinance')
                ->field('year_balance')
                ->where($wheres)
                ->where('year','=',$fyear)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //通过事业部名称获取事业部财年得分
    public function getConditionByBuName(){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $fyear = Session::get('fyear');
        switch ($admin){
            case 1:
                $wheres['bu_name'] = ['like',''];
                break;
            default:
                $wheres['bu_name'] = ['=',$bu_name];
        }
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('bufinance')
                ->field('condition')
                ->where($wheres)
                ->where('year','=',$fyear)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function getVerifyQuarterPayBalanceByBuName($staff_bu){
        $bu_name = Session::get('staff_bu');
        $admin = Session::get('admin');
        $fyear = Session::get('fyear');
        switch ($admin){
            case 1:
                $wheres['bu_name'] = ['like',''];
                break;
            default:
                $wheres['bu_name'] = ['=',$staff_bu];
        }
        $MySql=[];
        $data = new \ArrayObject();
        try {
            $data = Db::name('bufinance')
                ->field('quarter_pay_balance')
                ->where($wheres)
                ->where('year','=',$fyear)
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
}
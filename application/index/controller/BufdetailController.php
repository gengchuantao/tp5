<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Bufdetail;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class BufdetailController extends IndexController
{
    public function index(){

        // 获取查询信息
        $bu_name = Request::instance()->get('bu_name');
        $company = Request::instance()->get('company');
        $expenditure_type = Request::instance()->get('expenditure_type');
        $pageSize = 10; // 每页显示5条数据
        // 实例化
        $Bufdetail = new Bufdetail;
        // 按条件查询数据并调用分页
        $bufdetails = $Bufdetail
            ->where('company', 'like', '%' . $company . '%')
            ->where('bu_name', 'like', '%' . $bu_name . '%')
            ->where('expenditure_type', 'like', '%' . $expenditure_type . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufdetails', $bufdetails);
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function addNew(Request $request){
        $requestData=$request->param();
        $data[] = [
            'company' => $requestData['add_company'],
            'liable_person' => $requestData['add_liable_person'],
            'bu_name' => $requestData['add_bu_name'],
            'expenditure_type' => $requestData['add_expenditure_type'],
            'quarter_pay' => $requestData['add_quarter_pay'],
            'year_pay' => $requestData['add_year_pay'],
            'month' => $requestData['add_month'],
            'year' => $requestData['add_year'],
            'remarks' => $requestData['add_remarks']
        ];
        $result=Db::name('bufdetail')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    public function report(){
        // 获取事业部名称
        $staff_bu = Session::get('staff_bu');
        $pageSize = 100; // 每页显示100条数据
        // 实例化
        $Bufdetail = new Bufdetail;
        // 按条件查询数据并调用分页
        $bufdetails = $Bufdetail
            ->where('bu_name', 'like', '%' . $staff_bu . '%')
            ->order('id desc')
            ->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $staff_bu,
            ],
        ]);
        // 向V层传数据
        $this->assign('bufdetails', $bufdetails);
        // 取回打包后的数据
        $htmls = $this->fetch();
        // 将数据返回给用户
        return $htmls;
    }
    public function companyReport(){
        // 获取事业部名称
        $bu_name = Request::instance()->get('bu_name');
        $company = Session::get('company');
        $pageSize = 10;
        // 实例化
        $Bufdetail = new Bufdetail;
        // 按条件查询数据并调用分页
        $bufdetails = $Bufdetail
            ->where('company', 'like', '%' . $company . '%')
            ->where('bu_name', 'like', '%' . $bu_name . '%')
            ->order('id desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('bufdetails', $bufdetails);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function year(){

        // 获取查询信息
        $bu_name = Request::instance()->get('bu_name');

        $pageSize = 35; // 每页显示5条数据

        // 实例化
        $Bufdetail = new Bufdetail;

        // 按条件查询数据并调用分页
        $bufdetails = $Bufdetail->where('bu_name', 'like', '%' . $bu_name . '%')->order('quarter_pay_balance desc')->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $bu_name,
            ],
        ]);
        // 向V层传数据
        $this->assign('bufdetails', $bufdetails);
        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }

   // 删除数据
    public function delete()
    {
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $Bufdetail = Bufdetail::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Bufdetail)) {
            // 删除对象
            if ($Bufdetail->delete()) {
                return $this->success('删除成功', url('index'));
            }
        }

        return '删除失败';

    }

    /**
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
    /**
     * 获取要修改的数据
     */
    public function edit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Teacher表模型中获取当前记录
        if (is_null($Bufdetail = Bufdetail::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }
        // 将数据传给V层
        $this->assign('Bufdetail', $Bufdetail);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    /**
     * 更新数据
     */
    public function update(){
        // 接收数据
        $bufdetail = Request::instance()->post();
        //var_dump($bufdetail);
        // 将数据存入Bufdetail表
        $Bufdetail = new Bufdetail();
        $state = $Bufdetail->isUpdate(true)->save($bufdetail);

        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    //事业部生效明细
    public function buintoforce()
    {
        $staff_bu = Session::get('staff_bu');

        $result= Db::query("
SELECT year,po,co,br,helc_bustaff.staff_bu 
FROM
(SELECT helc_contract.project_name AS po,count(product_id) AS co,sales_person as br,date_format(into_force_date,'%y-%m') AS year,belong_to
FROM helc_contract,helc_product
WHERE helc_contract.contract_id = helc_product.contract_id AND status='正常' AND if_into_force = '是'  AND into_force_date BETWEEN '2018-04-01' AND '2019-03-31' 
GROUP BY po,br,belong_to)AS A,helc_bustaff
WHERE helc_bustaff.staff_name=A.br AND staff_bu = '$staff_bu'
ORDER BY year
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //事业部完工明细
    public function bucomplete()
    {
        $staff_bu = Session::get('staff_bu');

        $result= Db::query("
SELECT year,supervisor,project_name,sum,install_company,helc_bustaff.staff_bu
FROM helc_bustaff,
(SELECT date_format(complete_date,'%y-%m') AS year,supervisor,helc_contract.project_name,COUNT(helc_product.product_id) AS sum,install_company 
FROM helc_product,helc_contract
WHERE helc_product.contract_id = helc_contract.contract_id AND complete_date BETWEEN '2018-04-01' AND '2019-03-31'
GROUP BY project_name,supervisor
ORDER BY year,sum) AS A
WHERE helc_bustaff.staff_name = A.supervisor AND staff_bu = '$staff_bu'
ORDER BY year,sum
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //事业部收款明细
    public function buincome()
    {
        $staff_bu = Session::get('staff_bu');

        $result= Db::query("
SELECT date_format(income_date,'%y-%m') AS year,contract_id,buyer,payee,SUM(split_amount) AS sum,income_way,bu_name
FROM helc_income
WHERE bu_name='$staff_bu'
GROUP BY contract_id,year,payee,income_way
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '1280M');
        $excel = new expExcel();
        $xlsName  = "事业部入金按月汇总";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '事业部名称'=>'string',
            '分公司'=>'string',
            '季度薪酬池'=>'price',
            '季度费用池'=>'price',
            '财年薪酬池'=>'price',
            '财年费用池'=>'price',
            '月份'=>'integer',
            '财年'=>'integer',
            '收支类型'=>'string',
            '责任人'=>'string',
            '备注'=>'string',
            '创建时间'=>'datetime',
            '更新时间'=>'datetime'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'bu_name',
            'company',
            'quarter_pay',
            'quarter_cost',
            'year_pay',
            'year_cost',
            'month',
            'year',
            'expenditure_type',
            'liable_person',
            'remarks',
            'create_time',
            'update_time'
        ];
        $data = Db::name('bufdetail')
            ->field($keys)
            ->select();
        $excel->exports($xlsName, $head, $data, $keys);
    }
}
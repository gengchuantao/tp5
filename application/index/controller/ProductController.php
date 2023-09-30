<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Product;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class ProductController extends IndexController
{
    /*---------------------工号明细页面----------------------*/
    //加载页面时显示
    /**
     * @throws DbException
     */
    public function index(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        Session::set('product_contract_id',$contract_id);
        $pageSize = 500; // 每页显示500条数据
        // 实例化Teacher
        // 按条件查询数据并调用分页
        $Product = new Product;
        $products = $Product
            ->where('contract_id', '=', $contract_id)
            ->order('product_id','esc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //工号信息查询

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getProductInfoByContractId(){
        $contract_id=Session::get('product_contract_id');
        $data=Db::name('product')
            ->where('contract_id', '=',  $contract_id )
            ->order('id')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /**
     * @throws DbException
     */
    public function search(){
        // 获取查询信息
        $product_id = Request::instance()->get('product_id');
        Session::set('product_product_id',$product_id);
        $contract_id = Request::instance()->get('contract_id');
        Session::set('product_contract_id',$contract_id);
        $install_contract_id = Request::instance()->get('install_contract_id');
        Session::set('product_install_contract_id',$install_contract_id);
        $elevator_model = Request::instance()->get('elevator_model');
        Session::set('product_elevator_model',$elevator_model);
        $floor = Request::instance()->get('floor');
        Session::set('product_floor',$floor);
        $pageSize = 10; // 每页显示10条数据
        // 实例化Teacher
        // 按条件查询数据并调用分页
        $Product = new Product;
        $products = $Product
            ->where('product_id', 'like', '%' . $product_id . '%')
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('install_contract_id', 'like', '%' . $install_contract_id . '%')
            ->where('elevator_model', 'like', '%' . $elevator_model . '%')
            ->where('floor', 'like', '%' . $floor . '%')
            ->order('product_id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //获取工号信息

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function GetProductInfo(){
        $id = $this->request->param("id");
        $data=Db::name('product')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //批量发货预计

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function BatchExpectedDelivery(Request $request){
        $data = $request->param();
        $id=array();
        $id=explode(",", $data['batch_delivery_id']);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'expected_delivery_date'=>$data['b_expected_delivery_date'],
                'id' => $id[$i],
            );
                $result = Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量转生效

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function BatchIntoForce($batch_into_force_id, $b_receipt_id, $b_if_split, $b_enough_5_percent, $b_into_force_date, $b_belong_to, $b_sales_person){
        $id=array();
        $id=explode(",", $batch_into_force_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'receipt_id' =>  $b_receipt_id,
                'if_split' =>  $b_if_split,
                'enough_5_percent' =>  $b_enough_5_percent,
                'status' =>  '正常',
                'sd_status' =>  '正常',
                'if_into_force' =>  '是',
                'into_force_date' =>  $b_into_force_date,
                'belong_to' =>  $b_belong_to,
                'sales_person' =>  $b_sales_person,
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }

    }
    //批量转待生效

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function BatchUnIntoForce($batch_un_into_force_id , $u_belong_to, $u_sales_person){
        $id=array();
        $id=explode(",", $batch_un_into_force_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'if_split' =>  '否',
                'enough_5_percent' =>  '是',
                'status' => '正常',
                'sd_status' => '正常',
                'if_into_force' =>  '否',
                'into_force_date' =>  '0000-00-00',
                'belong_to' =>  $u_belong_to,
                'sales_person' =>  $u_sales_person,
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }

    }
    //山东司批量撤销

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function SdBatchRevoke($batch_revoke_id){
        $id=array();
        $id=explode(",", $batch_revoke_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'expected_delivery_date' => '0000-00-00',
                'sd_status' => '取消',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //总公司批量撤销

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function HBatchRevoke($batch_revoke_id){
        $id=array();
        $id=explode(",", $batch_revoke_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'status' => '取消',
                'sd_status' => '取消',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量转拆分

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function BatchSplit($batch_split_id){
        $id=array();
        $id=explode(",", $batch_split_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'if_split' => '是',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //导出设备工号明细
    public function Export(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $contract_id = Session::get('product_contract_id');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '生产工号'=>'string',
            '合同号'=>'string',
            '梯号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '设备SPL价'=>'price',
            '运输SPL价'=>'price',
            '安装SPL价'=>'price',
            '设备期望价'=>'price',
            '运输期望价'=>'price',
            '安装期望价'=>'price',
            '营业员'=>'string',
            '业绩归属'=>'string',
            '工号录入人'=>'string',
            '工号信息录入时间'=>'date',
            '总公司状态'=>'string',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '发货日期'=>'date',
            '设备预收'=>'price',
            '设备已开票'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装已开票'=>'price',
            '安装实收'=>'price',
            '设备下浮'=>'0.00%',
            '参考值'=>'0.00%',
            '委托标准价'=>'price',
            '吊装费'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '平均澄清费用'=>'price',
            '安装分包成本率预算'=>'0.0000',
            'M参数'=>'price',
            '安装A'=>'price',
            '分包签订日期'=>'date',
            '安装分包金额'=>'price',
            '附加合同金额'=>'price',
            '配套合同金额'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'product_id',
            'contract_id',
            'elevator_id',
            'elevator_model',
            'floor',
            'stop',
            'door',
            'hoist_height',
            'hoistway_height',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'sales_person',
            'belong_to',
            'product_inputer',
            'product_input_date',
            'status',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'IF(report_delivery_date="0000-00-00","",report_delivery_date)'=>'report_delivery_date',
            'equipment_expected_collected',
            'equipment_invoiced_amount',
            'equipment_amount_collected',
            'install_expected_collected',
            'install_invoiced_amount',
            'install_amount_collected',
            'equipment_prices_fall',
            'head_floating_rate',
            'entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity',
            'clarify_cost',
            'install_subcontract_cost_rate_budget',
            'm_parameter',
            'install_a_apply_fee',
            'subcontract_sign_date',
            'wa_amount',
            'wf_amount',
            'wp_amount'
        ];
        // 按条件查询数据并调用分页
        $data = Db::name('product')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->select();

        $excel->exports('工号明细表', $head, $data, $keys);
    }
    //导出安装工号明细
    public function installExport(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $contract_id = Session::get('product_contract_id');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'string',
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '安装分公司'=>'string',
            '完工事业部'=>'string',
            '发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            '完工日期(临梯)'=>'date',
            '技监发证日期'=>'date',
            '技监发证日期(临梯)'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '安装标准价'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装收款比例'=>'0.00%',
            '关闭日期'=>'date',
            '合同签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '实际分包价'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '梯种'=>'string',
            '调试'=>'string',
            '审核状态'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'product_id',
            'contract_id',
            'elevator_model',
            'floor',
            'stop',
            'door',
            'hoist_height',
            'hoistway_height',
            'supervisor',
            'install_company',
            'complete_bu',
            'IF(report_delivery_date="0000-00-00","",report_delivery_date)'=>'report_delivery_date',
            'IF(entry_date="0000-00-00","",entry_date)'=>'entry_date',
            'IF(complete_date="0000-00-00","",complete_date)'=>'complete_date',
            'IF(temp_elevator_date="0000-00-00","",temp_elevator_date)'=>'temp_elevator_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(temp_issuing_date="0000-00-00","",temp_issuing_date)'=>'temp_issuing_date',
            'pda_intime',
            'installation_expenditure',
            'standard_installation_price',
            'install_expected_collected',
            'install_amount_collected',
            'install_receip_ratio',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'contract_installation_price',
            'entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity',
            'wa_amount',
            'scaffold',
            'an2',
            'supplier',
            'elevator_type',
            'debug',
            'complete_status'
        ];
        // 按条件查询数据并调用分页
        $data = Db::name('product')
            ->field($keys)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->select();

        $excel->exports('工号明细表', $head, $data, $keys);
    }
    //报表导出模块
    public function report(){
        return $this->fetch();
    }
    public function batch(){
        return $this->fetch();
    }
    //已生效未发货明细
    public function undelivery(){
        // 获取查询信息
        $undelivery_product_id = Request::instance()->get('undelivery_product_id');
        $undelivery_contract_id = Request::instance()->get('undelivery_contract_id');
        Session::set('product_product_id',$undelivery_product_id);
        Session::set('product_contract_id',$undelivery_contract_id);
        $pageSize = 100; // 每页显示1000条数据
        // 实例化Product
        $Product = new Product;
        // 按条件查询数据并调用分页
        $products = $Product
            ->where('product_id', 'like', '%' . $undelivery_product_id . '%')
            ->where('contract_id', 'like', '%' . $undelivery_contract_id . '%')
            ->where('status', '=', '正常')
            ->where('if_into_force', '=', '是')
            ->where('debug', '=', '否')
            ->where('delivery_date', '=', '0000-00-00')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('products', $products);

        // 将数据返回给用户
        return $this->fetch();
    }
    //未生效明细
    public function unintoforce(){
        // 获取查询信息
        $undintoforce_product_id = Request::instance()->get('undintoforce_product_id');
        $undintoforce_contract_id = Request::instance()->get('undintoforce_contract_id');
        Session::set('product_product_id',$undintoforce_product_id);
        Session::set('product_contract_id',$undintoforce_contract_id);
        $pageSize = 100; // 每页显示1000条数据

        // 实例化Product
        $Product = new Product;
        // 按条件查询数据并调用分页
        $products = $Product
            ->where('product_id', 'like', '%' . $undintoforce_product_id . '%')
            ->where('contract_id', 'like', '%' . $undintoforce_contract_id . '%')
            ->where('sd_status', '=', '正常')
            ->where('if_into_force', '=', '否')
            ->where('debug', '=', '否')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('products', $products);

        // 将数据返回给用户
        return $this->fetch();
    }
    //区域生效明细
    public function companyintoforce()
    {
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT helc_contract.project_name as po,count(product_id) AS co,sales_person as br,date_format(into_force_date,'%y-%m') AS year,belong_to FROM helc_contract,helc_product WHERE helc_contract.contract_id = helc_product.contract_id AND status='正常' AND if_into_force = '是' AND belong_to = '$company' AND into_force_date between '$fyear_start' AND '$fyear_end' group by po,br,belong_to order by year,br,co asc
");

        // 向V层传数据
        $this->assign('result', $result);

        // 将数据返回给用户
        return $this->fetch();
    }
    /*---------------------按月汇总页面----------------------*/
    //按月汇总数据
    public function monthly()
    {
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $company_name = Session::get('company');
        $result= Db::query("
        SELECT IFNULL(SUBSTRING(区域,1,2),'合计') AS company,month4,month5,month6,month7,month8,month9,month10,month11,month12,month1,month2,month3,total FROM(SELECT 
helc_product.belong_to AS  区域,
sum(case month(helc_product.into_force_date) when '4' then 1 else 0 end) as month4,
sum(case month(helc_product.into_force_date) when '5' then 1 else 0 end) as month5,
sum(case month(helc_product.into_force_date) when '6' then 1 else 0 end) as month6,
sum(case month(helc_product.into_force_date) when '7' then 1 else 0 end) as month7,
sum(case month(helc_product.into_force_date) when '8' then 1 else 0 end) as month8,
sum(case month(helc_product.into_force_date) when '9' then 1 else 0 end) as month9,
sum(case month(helc_product.into_force_date) when '10' then 1 else 0 end) as month10,
sum(case month(helc_product.into_force_date) when '11' then 1 else 0 end) as month11,
sum(case month(helc_product.into_force_date) when '12' then 1 else 0 end) as month12,
sum(case month(helc_product.into_force_date) when '1' then 1 else 0 end) as month1,
sum(case month(helc_product.into_force_date) when '2' then 1 else 0 end) as month2,
sum(case month(helc_product.into_force_date) when '3' then 1 else 0 end) as month3,
sum(1) as total
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id 
   AND helc_contract.province='山东省'
   AND helc_product.status='正常' AND helc_product.sd_status='正常' AND helc_product.if_into_force='是' AND helc_product.into_force_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY helc_product.belong_to WITH ROLLUP) AS A
        ");
        $result1= Db::query("
        SELECT 
IFNULL(SUBSTRING(company,1,2),'合计') AS company,
sum(case month(income_date) when '4' then fix_split_amount else 0 end) as month4,
sum(case month(income_date) when '5' then fix_split_amount else 0 end) as month5,
sum(case month(income_date) when '6' then fix_split_amount else 0 end) as month6,
sum(case month(income_date) when '7' then fix_split_amount else 0 end) as month7,
sum(case month(income_date) when '8' then fix_split_amount else 0 end) as month8,
sum(case month(income_date) when '9' then fix_split_amount else 0 end) as month9,
sum(case month(income_date) when '10' then fix_split_amount else 0 end) as month10,
sum(case month(income_date) when '11' then fix_split_amount else 0 end) as month11,
sum(case month(income_date) when '12' then fix_split_amount else 0 end) as month12,
sum(case month(income_date) when '1' then fix_split_amount else 0 end) as month1,
sum(case month(income_date) when '2' then fix_split_amount else 0 end) as month2,
sum(case month(income_date) when '3' then fix_split_amount else 0 end) as month3,
sum(fix_split_amount) as total
FROM helc_equipment_income
WHERE fix_split_amount>0 AND income_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY company WITH ROLLUP
        ");
        $result2= Db::query("
SELECT 
IFNULL(SUBSTRING(company,1,2),'合计') AS company,
sum(case month(split_date) when '4' then split_amount else 0 end) as month4,
sum(case month(split_date) when '5' then split_amount else 0 end) as month5,
sum(case month(split_date) when '6' then split_amount else 0 end) as month6,
sum(case month(split_date) when '7' then split_amount else 0 end) as month7,
sum(case month(split_date) when '8' then split_amount else 0 end) as month8,
sum(case month(split_date) when '9' then split_amount else 0 end) as month9,
sum(case month(split_date) when '10' then split_amount else 0 end) as month10,
sum(case month(split_date) when '11' then split_amount else 0 end) as month11,
sum(case month(split_date) when '12' then split_amount else 0 end) as month12,
sum(case month(split_date) when '1' then split_amount else 0 end) as month1,
sum(case month(split_date) when '2' then split_amount else 0 end) as month2,
sum(case month(split_date) when '3' then split_amount else 0 end) as month3,
sum(split_amount) as total
FROM helc_install_income
WHERE split_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY company WITH ROLLUP
        ");
        $result3= Db::query("
SELECT 
IFNULL(SUBSTRING(company,1,2),'合计') AS company,
sum(case month(split_date) when '4' then split_amount else 0 end) as month4,
sum(case month(split_date) when '5' then split_amount else 0 end) as month5,
sum(case month(split_date) when '6' then split_amount else 0 end) as month6,
sum(case month(split_date) when '7' then split_amount else 0 end) as month7,
sum(case month(split_date) when '8' then split_amount else 0 end) as month8,
sum(case month(split_date) when '9' then split_amount else 0 end) as month9,
sum(case month(split_date) when '10' then split_amount else 0 end) as month10,
sum(case month(split_date) when '11' then split_amount else 0 end) as month11,
sum(case month(split_date) when '12' then split_amount else 0 end) as month12,
sum(case month(split_date) when '1' then split_amount else 0 end) as month1,
sum(case month(split_date) when '2' then split_amount else 0 end) as month2,
sum(case month(split_date) when '3' then split_amount else 0 end) as month3,
sum(split_amount) as total
FROM helc_install_income
WHERE income_classification='普通' AND split_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY company WITH ROLLUP
        ");
        // 向V层传数据
        $this->assign('result', $result);
        $this->assign('result1', $result1);
        $this->assign('result2', $result2);
        $this->assign('result3', $result3);
        $this->display();
        $htmls = $this->fetch();
        return $htmls;
    }
    //待生效数据
    public function preintoforce()
    {
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT project_name AS po,count(product_id) AS co,sales_clerk AS br,datediff(now(),both_seal_date) AS ds 
FROM helc_contract,helc_product 
WHERE  helc_contract.contract_id = helc_product.contract_id AND sd_status='正常' AND belong_to = '$company' AND helc_product.if_into_force = '否'  
GROUP BY po,br
ORDER BY br,co,ds ASC
");
        // 向V层传数据
        $this->assign('result', $result);

        // 将数据返回给用户
        return $this->fetch();
    }
    //待签订数据
    public function presign()
    {
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT project_name,SUM(bid_num) AS total,sales_person 
FROM(
SELECT id,branch_office,sales_person,quote_num,helc_quote.project_name,bid_num,win_bidding_date
FROM helc_quote
WHERE win_biding = '1'AND sign_contract = '0' AND if_not_winning = '否' AND helc_quote.province = '山东省'
UNION 
SELECT helc_quote.id,branch_office,sales_person,quote_num,helc_quote.project_name,bid_num,win_bidding_date 
FROM helc_quote,helc_contract 
WHERE helc_quote.contract_id = helc_contract.contract_id AND helc_quote.province = '山东省' AND sign_contract = '1' AND if_not_winning = '否' AND  helc_contract.product_info='0') AS A 
WHERE branch_office ='$company'  
GROUP BY project_name,sales_person 
ORDER BY sales_person,total ASC
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    //运行生效函数
    public function intoforce_funtion()
    {
         $result= Db::query("CALL intoforce_function;");
         $result1= Db::query("CALL sdcompany_function;");
         return $this->success('执行完毕！', url('Index/welcome'),'','1');
    }
    //删除工号
    public function Delete($delete_id,$delete_product_id){
        //检查是否有工号明细
        $list = Db::name('product')
            ->where([
                'product_id'=>$delete_product_id,
                'if_into_force'=>'是'
            ])
            ->count();
        if($list>0){
            return json(0);
        }else {
            $result=Db::name('product')->where('id','=',$delete_id)->delete();
            return json(1);
        }
    }
    //工号分包信息
    public function subcontract(){
        // 工号分包价格查询
        $contract_id = Request::instance()->get('contract_id');
        $product_id = Request::instance()->get('product_id');
        $elevator_model = Request::instance()->get('elevator_model');
        $complete_date_from = Request::instance()->get('complete_date_from');
        $complete_date_to = Request::instance()->get('complete_date_to');
        Session::set('contract_id',$contract_id);
        Session::set('product_id',$product_id);
        Session::set('elevator_model',$elevator_model);
        Session::set('complete_date_from',$complete_date_from);
        Session::set('complete_date_to',$complete_date_to);
        $pageSize = 10; // 每页显示10条数据
        // 实例化Product
        $Product = new Product;
        // 按条件查询数据并调用分页
        $products = $Product
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('product_id', 'like', '%' . $product_id . '%')
            ->where('elevator_model', 'like', '%' . $elevator_model . '%')
            ->where('complete_date', 'between time', [$complete_date_from,$complete_date_to])
            ->order('product_id')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //工号完工信息
    public function complete(){
        // 工号分包价格查询
        $contract_id = Request::instance()->get('contract_id');
        $product_id = Request::instance()->get('product_id');
        $complete_date_from = Request::instance()->get('complete_date_from');
        $complete_date_to = Request::instance()->get('complete_date_to');
        Session::set('contract_id',$contract_id);
        Session::set('product_id',$product_id);
        Session::set('complete_date_from',$complete_date_from);
        Session::set('complete_date_to',$complete_date_to);
        $pageSize = 10; // 每页显示10条数据
        // 实例化Product
        $Product = new Product;
        // 按条件查询数据并调用分页
        $where['complete_date|temp_elevator_date'] = ['between',[$complete_date_from,$complete_date_to]];
        $products = $Product
            ->where($where)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('product_id', 'like', '%' . $product_id . '%')
            ->order('product_id','esc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //获取完工ID
    public function CompletePost(){
        $id = $this->request->param("complete_id");
        $Product = new Product;
        $SQLData = $Product->WHERE('id',$id)->SELECT();
        $SQLJson=json_encode($SQLData);
        echo $SQLJson;
    }
    //更新完工数据
    public function CompleteUpdate($complete_id,$product_id,$supervisor,$entry_date,$complete_date,$temp_elevator_date,$complete_bu){
        $list = Db::name('responsible')->where(['name'=>$supervisor])->count();
        if($list>0){
            $result = Db::execute("
                    UPDATE helc_product 
                    SET supervisor = '$supervisor',
                        complete_bu = '$complete_bu',
                        entry_date = '$entry_date',
                        complete_date = '$complete_date',
                        temp_elevator_date = '$temp_elevator_date'
                    WHERE id = '$complete_id'
                ");
            return json(1);
        }else{
            return json(0);
        }

    }

    //---------------------------------安装信息更新--------------------------------//
    //首页
    public function install(){
        $contract_id = Request::instance()->get('contract_id');
        Session::set('product_contract_id',$contract_id);
        $pageSize = 500; // 每页显示500条数据
        $Product = new Product;
        // 按条件查询数据并调用分页
        try {
            $products = $Product
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->order('product_id', 'esc')
                ->paginate($pageSize, false, ['query' => request()->param()]);
        } catch (DbException $e) {
        }
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //完工批量审核页面
    public function installaudit(){
        $contract_id = Request::instance()->get('contract_id');
        Session::set('product_contract_id',$contract_id);
        $pageSize = 500; // 每页显示500条数据
        // 实例化Teacher
        $Product = new Product;
        // 按条件查询数据并调用分页
        $products = $Product
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('complete_status', '=', '待审核')
            ->order('product_id','esc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //批量转完工
    public function BatchComplete($batch_complete_id,$install_company,$supervisor,$complete_bu,$complete_date,$temp_elevator_date,$issuing_date,$temp_issuing_date){
        $id=array();
        $id=explode(",", $batch_complete_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'install_company' =>  $install_company,
                'supervisor' =>  $supervisor,
                'complete_bu' =>  $complete_bu,
                'complete_date' =>  $complete_date,
                'temp_elevator_date' =>  $temp_elevator_date,
                'issuing_date' =>  $issuing_date,
                'temp_issuing_date' =>  $temp_issuing_date,
                'complete_status' => '待审核',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    public function bathchDeliveryPredict(Request $request){
        $requestData=$request->param();
        $id=array();
        $id=explode(",", $requestData['batch_predict_id']);
        for($i=0;$i<count($id);$i++) {
            $data = array(
                'predict_delivery_date' => $requestData['predict_delivery_date'],
                'id' => $id[$i]
            );
            $result = Db::name('product')->update($data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量完工审核
    public function BatchCompleteAudit($batch_complete_id){
        $id=array();
        $id=explode(",", $batch_complete_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'complete_status' => '已审核',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量完工拒绝
    public function BatchCompleteRefuse($batch_complete_id){
        $id=array();
        $id=explode(",", $batch_complete_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'complete_status' => '已拒绝',
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量转完工修改信息
    public function BatchCompleteEdit($batch_complete_edit_id,$e_install_company,$e_supervisor,$e_complete_bu,$e_complete_date,$e_temp_elevator_date,$e_issuing_date,$e_temp_issuing_date){
        $id=array();
        $id=explode(",", $batch_complete_edit_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'install_company' =>  $e_install_company,
                'supervisor' =>  $e_supervisor,
                'complete_bu' =>  $e_complete_bu,
                'complete_date' =>  $e_complete_date,
                'temp_elevator_date' =>  $e_temp_elevator_date,
                'issuing_date' =>  $e_issuing_date,
                'temp_issuing_date' =>  $e_temp_issuing_date,
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //批量转完工修改信息
    public function BatchCompleteBuEdit($batch_complete_edit_id,$e_install_company,$e_supervisor,$e_complete_bu){
        $id=array();
        $id=explode(",", $batch_complete_edit_id);
        for($i=0;$i<count($id);$i++){
            $batch_data =array(
                'install_company' =>  $e_install_company,
                'supervisor' =>  $e_supervisor,
                'complete_bu' =>  $e_complete_bu,
                'id' =>  $id[$i]
            );
            $result=Db::name('product')->update($batch_data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    //---------------------------------安装分包--------------------------------//
    //分包申请
    public function subcontractapply(){
        $contract_id = Request::instance()->get('contract_id');
        Session::set('product_contract_id',$contract_id);
        $pageSize = 500; // 每页显示500条数据
        // 实例化
        $Product = new Product;
        // 按条件查询数据并调用分页
        $products = $Product
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->order('product_id','esc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('products', $products);
        // 将数据返回给用户
        return $this->fetch();
    }
    //---------------------------------报表导出-----------------------------------//
    //《完工信息表》导出
    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function CompleteDetailExport(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $excel = new expExcel();
        $contract_id = Session::get('contract_id');
        $product_id = Session::get('product_id');
        $complete_date_from = Session::get('complete_date_from');
        $complete_date_to = Session::get('complete_date_to');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '安装分公司'=>'string',
            '完工事业部'=>'string',
            '发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            '完工日期(临梯)'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '关闭日期'=>'date',
            '合同标准价'=>'price',
            '合同签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '实际分包价'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '安装预计收款金额'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['id', 'product_id', 'contract_id','elevator_model','floor','stop','door','hoist_height','hoistway_height', 'supervisor','install_company','complete_bu','report_delivery_date', 'entry_date', 'complete_date','temp_elevator_date', 'pda_intime', 'installation_expenditure', 'close_date','standard_installation_price', 'contract_installation_price', 'entrust_spl', 'hoisting_cost','shed','water_electricity','wa_amount','scaffold','an2','supplier','install_expected_collected'];
        // 按条件查询数据并调用分页
        $where['complete_date|temp_elevator_date'] = ['between',[$complete_date_from,$complete_date_to]];
        $data = Db::name('product')
            ->where($where)
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('product_id', 'like', '%' . $product_id . '%')
            ->select();

        $excel->exports('完工信息表', $head, $data, $keys);
    }
    //《完工明细表》导出

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function CompleteExport($export_condition, $CompleteExportFrom, $CompleteExportTo){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '安装分公司'=>'string',
            '完工事业部'=>'string',
            '生效日期'=>'date',
            '上报发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            '完工日期(临梯)'=>'date',
            '技监发证日期'=>'date',
            '技监发证日期(临梯)'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '安装标准价'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装收款比例'=>'0.00%',
            '安装关闭日期'=>'date',
            '设备关闭日期'=>'date',
            '合同签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '安装分包价'=>'price',
            '附加'=>'price',
            '配套'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '梯种'=>'string',
            '调试'=>'string',
            '审核状态'=>'string',
            '营业员'=>'string',
            '正式梯完工财年'=>'integer',
            '是否存在一二期欠款'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '客户分类'=>'string',
            '客户简称'=>'string',
            '项目属性'=>'string',
            '设备四期预收'=>'price',
            '安装四期预收'=>'price',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'a.elevator_model',
            'a.floor',
            'a.stop',
            'a.door',
            'a.hoist_height',
            'a.hoistway_height',
            'a.supervisor',
            'a.install_company',
            'a.complete_bu',
            'IF(a.into_force_date="0000-00-00","",a.into_force_date)'=>'into_force_date',
            'IF(a.report_delivery_date="0000-00-00","",a.report_delivery_date)'=>'report_delivery_date',
            'IF(entry_date="0000-00-00","",entry_date)'=>'entry_date',
            'IF(complete_date="0000-00-00","",complete_date)'=>'complete_date',
            'IF(temp_elevator_date="0000-00-00","",temp_elevator_date)'=>'temp_elevator_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(temp_issuing_date="0000-00-00","",temp_issuing_date)'=>'temp_issuing_date',
            'a.pda_intime',
            'a.installation_expenditure',
            'a.standard_installation_price',
            'a.install_expected_collected',
            'a.install_amount_collected',
            'a.install_receip_ratio',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'IF(equipment_close_date="0000-00-00","",equipment_close_date)'=>'equipment_close_date',
            'a.contract_installation_price',
            'a.entrust_spl',
            'a.hoisting_cost',
            'a.shed',
            'a.water_electricity',
            'a.wa_amount',
            'a.wf_amount',
            'a.wp_amount',
            'a.scaffold',
            'a.an2',
            'a.supplier',
            'a.elevator_type',
            'a.debug',
            'a.complete_status',
            'a.sales_person',
            'a.complete_date_fyear',
            'a.exist_12_phase',
            'a.equipment_expected_collected',
            'a.equipment_amount_collected',
            'b.customer_classification',
            'b.customer_abbreviation',
            'b.project_type',
            'a.equipment_phase_4_expected_collected',
            'a.install_phase_4_expected_collected',
        ];
        // 按条件选择不同的查询结果
        if($export_condition=='完工日期'){
            $where['a.complete_date|temp_elevator_date'] = ['between',[$CompleteExportFrom,$CompleteExportTo]];
        }else if($export_condition=='技监发证日期'){
            $where['a.issuing_date|temp_issuing_date'] = ['between',[$CompleteExportFrom,$CompleteExportTo]];
        }else if($export_condition=='发货日期'){
            $where['a.delivery_date'] = ['between',[$CompleteExportFrom,$CompleteExportTo]];
        }
        $excel = new expExcel();
        // 按条件查询数据并调用分页
        if($super_admin==1){
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where($where)
                ->where('a.complete_status','=','已审核')
                ->select();
        }else{
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where($where)
                ->where('a.complete_status','=','已审核')
                ->where('a.install_company','=',$companys)
                ->select();
        }
        $excel->exports('完工明细表', $head, $data, $keys);
    }
    //《完工-分包信息表》导出
    function exportComplete(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $excel = new expExcel();
        $contract_id = Session::get('contract_id');
        $elevator_model = Session::get('elevator_model');
        $complete_date_from = Session::get('complete_date_from');
        $complete_date_to = Session::get('complete_date_to');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '关闭日期'=>'date',
            '安装标准价'=>'price',
            '安装签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '实际分包价'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '附加分包金额'=>'price',
            '配套分包金额'=>'price',
            '平均澄清'=>'price',
            '平均配套'=>'price',
            '分包日期'=>'date'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'product_id',
            'contract_id',
            'elevator_model',
            'floor',
            'stop',
            'door',
            'hoist_height',
            'hoistway_height',
            'supervisor',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'IF(entry_date="0000-00-00","",entry_date)'=>'entry_date',
            'IF(complete_date="0000-00-00","",complete_date)'=>'complete_date',
            'pda_intime',
            'installation_expenditure',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'standard_installation_price',
            'contract_installation_price',
            'entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity',
            'wa_amount',
            'scaffold',
            'an2',
            'supplier',
            'wf_amount',
            'wp_amount',
            'clarify_cost',
            'supporting_cost',
            'IF(subcontract_sign_date="0000-00-00","",subcontract_sign_date)'=>'subcontract_sign_date'
        ];
        $data  = Db::name('product')
            ->field($keys)
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('elevator_model', 'like', '%' . $elevator_model . '%')
            ->where('complete_date', 'between time', [$complete_date_from,$complete_date_to])
            ->select();
        $excel->exports('分包信息表', $head, $data, $keys);
    }
    //《完工-已生效未发货明细》导出
    function undelivery_export(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $excel = new expExcel();
        $contract_id = Session::get('undelivery_contract_id');
        $product_id = Session::get('undelivery_product_id');
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '买方单位'=>'string',
            '状态'=>'string',
            '生效日期'=>'date',
            '业绩归属'=>'string',
            '安装区域'=>'string',
            '营业员'=>'string',
            '电梯型号'=>'string',
            '电梯简称'=>'string',
            '载重'=>'integer',
            '速度'=>'integer',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '有无机房'=>'string',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '出仓日期'=>'date',
            '合同安装价'=>'price',
            '安装支出'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'a.contract_id',
            'b.buyer_unit',
            'a.status',
            'into_force_date',
            'belong_to',
            'b.install_company',
            'sales_person',
            'a.elevator_model',
            'elevator_short',
            'weight',
            'speed',
            'floor',
            'stop',
            'door',
            'elevator_room',
            'hoist_height',
            'hoistway_height',
            'IF(a.delivery_date="0000-00-00","",a.delivery_date)'=>'delivery_date',
            'contract_installation_price',
            'average_installation_expenditure',
            'entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity'
        ];
        $data = Db::name('product')
            ->alias('a')
            ->join('contract b','a.contract_id=b.contract_id')
            ->field($keys)
            ->where('b.province','=','山东省')
            ->where('a.contract_id','like','%'.$contract_id.'%')
            ->where('a.product_id', 'like', '%' . $product_id . '%')
            ->where('a.status', '=', '正常')
            ->where('a.if_into_force', '=', '是')
            ->where('a.debug', '=', '否')
            ->where('a.delivery_date', '=', '0000-00-00')
            ->select();
        $excel->exports('已生效未发货明细', $head, $data, $keys);
    }
    //《完工-待生效明细》导出
    function unintoforce_export(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $excel = new expExcel();
        $contract_id = Session::get('undintoforce_contract_id');
        $product_id = Session::get('undintoforce_product_id');
        $data  = Db::name('product')
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('product_id', 'like', '%' . $product_id . '%')
            ->where('sd_status', '=', '正常')
            ->where('debug', '=', '否')
            ->where('if_into_force', '=', '否')
            ->select();
        //设置表头：
        $head = ['生产工号', '合同号', '状态',  '生效日期', '业绩归属', '营业员', '电梯型号', '电梯简称', '载重', '速度', '层', '站', '门','有无机房','提升高度','井道总高','出仓日期', '合同安装价', '安装支出',  '标准委托价', '吊装价', '搭棚价','水电费'];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['product_id', 'contract_id', 'status',  'into_force_date', 'belong_to', 'sales_person', 'elevator_model', 'elevator_short', 'weight', 'speed', 'floor', 'stop', 'door', 'elevator_room','hoist_height','hoistway_height', 'delivery_date', 'contract_installation_price', 'average_installation_expenditure', 'entrust_spl', 'hoisting_cost', 'shed','water_electricity'];

        $excel->exports('待生效明细', $head, $data, $keys);
    }
    //《合同-生效明细》导出
    function IntoForce_Excel($export_condition,$IntoForceFrom,$IntoForceTo){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '营业员'=>'string',
            '梯号'=>'string',
            '总公司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '客户简称'=>'string',
            '大客户编码'=>'string',
            '标准设备价'=>'price',
            '标准运输价'=>'price',
            '标准安装价'=>'price',
            '合同签订设备价'=>'price',
            '合同签订运输价'=>'price',
            '合同签订安装价'=>'price',
            '设备下浮'=>'0.00%',
            '运输下浮'=>'0.00%',
            '安装下浮'=>'0.00%',
            '邮寄总部日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '绩效归属'=>'string',
            '工号信息录入员'=>'string',
            '工号信息录入时间'=>'date',
            '平均安装支出'=>'price',
            '老客户'=>'string',
            '梯种简称'=>'string',
            '大客户简称'=>'string',
            '是否调验'=>'string',
            '买方单位'=>'string',
            '区域简称'=>'string',
            '项目属性'=>'string',
            '生效事业部'=>'string',
            '生效财年'=>'integer',
            '本地大客户简称'=>'string',
            '平均澄清'=>'price',
            '平均配套'=>'price',
            '客户分类'=>'string',
            '山东司状态'=>'string',
            '是否拆分'=>'string',
            '收款编号'=>'string',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '总公司营业员'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '发货日期'=>'date',
            '平均技援费用'=>'price',
            '设备提货前应付'=>'price',
            '发货财年'=>'integer',
            '统计财年'=>'integer',
            '三方合同'=>'string',
            '安装分公司'=>'string',
            '其它安装支出'=>'price',
            '总部定价'=>'string',
            '速度'=>'string',
            '完工日期'=>'date',
            '修正后设备签约款(报表,部分含修改费)-不含税'=>'0.00',
            '城市类别'=>'string',
            '设备提货前应收金额'=>'price',
            '设备质保金应收金额'=>'price',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'project_name',
            'branch',
            'province',
            'area',
            'county',
            'a.sales_person',
            'elevator_id',
            'a.status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'customer_abbreviation',
            'big_client_code',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'equipment_prices_fall',
            'transport_prices_fall',
            'install_prices_fall',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'belong_to',
            'product_inputer',
            'IF(product_input_date="0000-00-00","",product_input_date)'=>'product_input_date',
            'average_installation_expenditure',
            'old_customer',
            'elevator_short',
            'big_client_short',
            'if_check',
            'buyer_unit',
            'SUBSTR(a.belong_to,1,2)'=>'belong_to_short',
            'project_type',
            'into_force_bu',
            'into_force_fyear',
            'local_customer_short',
            'a.clarify_cost',
            'a.supporting_cost',
            'customer_classification',
            'sd_status',
            'if_split',
            'receipt_id',
            'IF(report_date="0000-00-00","",report_date)'=>'report_date',
            'IF(statistical_date="0000-00-00","",statistical_date)'=>'statistical_date',
            'head_salesperson',
            'equipment_expected_collected',
            'equipment_amount_collected',
            'install_expected_collected',
            'install_amount_collected',
            'IF(a.delivery_date="0000-00-00","",a.delivery_date)'=>'delivery_date',
            'average_technical_assistance_amount',
            'equipment_income_before_delivery',
            'report_delivery_fyear',
            'statistical_fyear',
            'b.if_three_party',
            'b.install_company',
            'average_service_charge',
            'a.head_price',
            'a.speed',
            'a.complete_date',
            'a.fix_equipment_tax_free',
            'b.city_type',
            'a.equipment_receivables_before_delivery',
            'a.equipment_guarantee',
        ];
        // 按条件选择不同的查询结果
        if($export_condition=='生效日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('into_force_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('into_force_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }else if($export_condition=='上报日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }else if($export_condition=='统计日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.statistical_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.statistical_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }
        $excel->exports('生效明细', $head, $data, $keys);
    }
    //《合同-m0生效明细》导出
    function M0_IntoForce_Excel($export_condition,$IntoForceFrom,$IntoForceTo){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $company = Session::get('company');
        $super_admin = Session::get('shfwb');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '营业员'=>'string',
            '梯号'=>'string',
            '总公司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '客户简称'=>'string',
            '大客户编码'=>'string',
            '标准设备价'=>'price',
            '标准运输价'=>'price',
            '标准安装价'=>'price',
            '合同签订设备价'=>'price',
            '合同签订运输价'=>'price',
            '合同签订安装价'=>'price',
            '设备下浮'=>'0.00%',
            '运输下浮'=>'0.00%',
            '安装下浮'=>'0.00%',
            '邮寄总部日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '绩效归属'=>'string',
            '工号信息录入员'=>'string',
            '工号信息录入时间'=>'date',
            '平均安装支出'=>'price',
            '老客户'=>'string',
            '梯种简称'=>'string',
            '大客户简称'=>'string',
            '是否调验'=>'string',
            '买方单位'=>'string',
            '区域简称'=>'string',
            '项目属性'=>'string',
            '生效事业部'=>'string',
            '生效财年'=>'integer',
            '本地大客户简称'=>'string',
            '平均澄清'=>'price',
            '平均配套'=>'price',
            '客户分类'=>'string',
            '山东司状态'=>'string',
            '是否拆分'=>'string',
            '收款编号'=>'string',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '总公司营业员'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '发货日期'=>'date',
            '平均技援费用'=>'price',
            '设备提货前应付'=>'price',
            '发货财年'=>'integer',
            '统计财年'=>'integer',
            '三方合同'=>'string',
            '安装分公司'=>'string',
            '其它安装支出'=>'price',
            '总部定价'=>'string',
            '速度'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'project_name',
            'branch',
            'province',
            'area',
            'county',
            'a.sales_person',
            'elevator_id',
            'a.status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'customer_abbreviation',
            'big_client_code',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'equipment_prices_fall',
            'transport_prices_fall',
            'install_prices_fall',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'belong_to',
            'product_inputer',
            'IF(product_input_date="0000-00-00","",product_input_date)'=>'product_input_date',
            'average_installation_expenditure',
            'old_customer',
            'elevator_short',
            'big_client_short',
            'if_check',
            'buyer_unit',
            'SUBSTR(a.belong_to,1,2)'=>'belong_to_short',
            'project_type',
            'into_force_bu',
            'into_force_fyear',
            'local_customer_short',
            'a.clarify_cost',
            'a.supporting_cost',
            'customer_classification',
            'sd_status',
            'if_split',
            'receipt_id',
            'IF(report_date="0000-00-00","",report_date)'=>'report_date',
            'IF(statistical_date="0000-00-00","",statistical_date)'=>'statistical_date',
            'head_salesperson',
            'equipment_expected_collected',
            'equipment_amount_collected',
            'install_expected_collected',
            'install_amount_collected',
            'IF(a.delivery_date="0000-00-00","",a.delivery_date)'=>'delivery_date',
            'average_technical_assistance_amount',
            'equipment_income_before_delivery',
            'report_delivery_fyear',
            'statistical_fyear',
            'b.if_three_party',
            'b.install_company',
            'average_service_charge',
            'a.head_price',
            'a.speed'
        ];
        // 按条件选择不同的查询结果
        if($export_condition=='生效日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('b.contract_id','like','AR%')
                    ->where('into_force_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('b.contract_id','like','AR%')
                    ->where('into_force_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }else if($export_condition=='上报日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }else if($export_condition=='统计日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.statistical_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.statistical_date', 'between time', [$IntoForceFrom,$IntoForceTo])
                    ->where('a.status', '=', '正常')
                    ->where('a.if_into_force', '=', '是')
                    ->where('a.belong_to', '=', $company)
                    ->select();
            }
        }
        $excel->exports('生效明细', $head, $data, $keys);
    }
    //《合同-发货明细》导出
    function Delivery_Excel(Request $request){
        $data = $request->param();
        $ExportDeliveryCondition = $data['export_delivery_condition'];
        $DeliveryFrom = $data['DeliveryFrom'];
        $DeliveryTo = $data['DeliveryTo'];
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '安装分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '营业员'=>'string',
            '梯号'=>'string',
            '总公司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '项目分类'=>'string',
            '大客户编码'=>'string',
            '邮寄总部日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '绩效归属'=>'string',
            '工号信息录入员'=>'string',
            '工号信息录入时间'=>'date',
            '平均安装支出'=>'price',
            '老客户'=>'string',
            '梯种简称'=>'string',
            '大客户简称'=>'string',
            '是否调验'=>'string',
            '买方单位'=>'string',
            '区域简称'=>'string',
            '项目属性'=>'string',
            '生效事业部'=>'string',
            '生效财年'=>'integer',
            '本地大客户简称'=>'string',
            '客户分类'=>'string',
            '山东司状态'=>'string',
            '是否拆分'=>'string',
            '收款编号'=>'string',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '总公司营业员'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装合同进场前金额'=>'price',
            '安装合同进场后金额'=>'price',
            '上报出仓日期'=>'date',
            '发货事业部'=>'string',
            '营业预计发货日期'=>'date',
            '发货财年'=>'integer',
            '完工日期'=>'date',
            '完工财年'=>'integer',
            '项目经理'=>'string',
            '完工事业部'=>'string',
            '标准设备价'=>'price',
            '标准运输价'=>'price',
            '标准安装价'=>'price',
            '合同签订设备价'=>'price',
            '合同签订运输价'=>'price',
            '合同签订安装价'=>'price',
            '监理预计发货日期'=>'date',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'project_name',
            'a.install_company',
            'province',
            'area',
            'county',
            'a.sales_person',
            'elevator_id',
            'a.status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'project_classification',
            'big_client_code',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'belong_to',
            'product_inputer',
            'IF(product_input_date="0000-00-00","",product_input_date)'=>'product_input_date',
            'average_installation_expenditure',
            'old_customer',
            'elevator_short',
            'big_client_short',
            'if_check',
            'buyer_unit',
            'SUBSTR(a.belong_to,1,2)'=>'belong_to_short',
            'project_type',
            'into_force_bu',
            'into_force_fyear',
            'local_customer_short',
            'customer_classification',
            'sd_status',
            'if_split',
            'receipt_id',
            'IF(report_date="0000-00-00","",report_date)'=>'report_date',
            'IF(statistical_date="0000-00-00","",statistical_date)'=>'statistical_date',
            'head_salesperson',
            'equipment_expected_collected',
            'equipment_amount_collected',
            'install_expected_collected',
            'install_amount_collected',
            'install_contract_amount_before_entry',
            'install_contract_amount_after_entry',
            'IF(a.report_delivery_date="0000-00-00","",a.report_delivery_date)'=>'report_delivery_date',
            'report_delivery_bu',
            'IF(a.expected_delivery_date="0000-00-00","",a.expected_delivery_date)'=>'expected_delivery_date',
            'report_delivery_fyear',
            'IF(a.complete_date="0000-00-00","",a.complete_date)'=>'complete_date',
            'complete_date_fyear',
            'supervisor',
            'complete_bu',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'IF(a.predict_delivery_date="0000-00-00","",a.predict_delivery_date)'=>'predict_delivery_date',
        ];
        // 按条件选择不同的查询结果
        if($ExportDeliveryCondition=='上报出仓日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.report_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->where('b.install_company', '=', $company)
                    ->select();
            }
        }else if($ExportDeliveryCondition=='预计发货日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.expected_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.expected_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->where('b.install_company', '=', $company)
                    ->select();
            }
        }else if($ExportDeliveryCondition=='监理预计发货日期'){
            if($super_admin==1){
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.predict_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->select();
            }else{
                $data = Db::name('product')
                    ->alias('a')
                    ->join('contract b','a.contract_id=b.contract_id')
                    ->field($keys)
                    ->where('b.province','=','山东省')
                    ->where('a.predict_delivery_date', 'between time', [$DeliveryFrom,$DeliveryTo])
                    ->where('a.status', '=', '正常')
                    ->where('b.install_company', '=', $company)
                    ->select();
            }
        }
        $excel->exports('发货明细', $head, $data, $keys);
    }
    //《合同-已生效未发货明细》导出
    function intoForceUnDelivery(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '安装分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '营业员'=>'string',
            '梯号'=>'string',
            '总公司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '客户属性'=>'string',
            '大客户编码'=>'string',
            '邮寄总部日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '绩效归属'=>'string',
            '工号信息录入员'=>'string',
            '工号信息录入时间'=>'date',
            '平均安装支出'=>'price',
            '老客户'=>'string',
            '梯种简称'=>'string',
            '客户简称'=>'string',
            '是否调验'=>'string',
            '买方单位'=>'string',
            '区域简称'=>'string',
            '项目属性'=>'string',
            '生效事业部'=>'string',
            '生效财年'=>'integer',
            '本地大客户简称'=>'string',
            '客户分类'=>'string',
            '山东司状态'=>'string',
            '是否拆分'=>'string',
            '收款编号'=>'string',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '总公司营业员'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装合同进场前金额'=>'price',
            '安装合同进场后金额'=>'price',
            '上报出仓日期'=>'date',
            '预计发货日期'=>'date',
            '发货财年'=>'integer',
            '进场日期'=>'date',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'project_name',
            'a.install_company',
            'province',
            'area',
            'county',
            'a.sales_person',
            'elevator_id',
            'a.status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'project_classification',
            'big_client_code',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'belong_to',
            'product_inputer',
            'IF(product_input_date="0000-00-00","",product_input_date)'=>'product_input_date',
            'average_installation_expenditure',
            'old_customer',
            'elevator_short',
            'customer_abbreviation',
            'if_check',
            'buyer_unit',
            'SUBSTR(a.belong_to,1,2)'=>'belong_to_short',
            'project_type',
            'into_force_bu',
            'into_force_fyear',
            'local_customer_short',
            'customer_classification',
            'sd_status',
            'if_split',
            'receipt_id',
            'IF(report_date="0000-00-00","",report_date)'=>'report_date',
            'IF(statistical_date="0000-00-00","",statistical_date)'=>'statistical_date',
            'head_salesperson',
            'equipment_expected_collected',
            'equipment_amount_collected',
            'install_expected_collected',
            'install_amount_collected',
            'install_contract_amount_before_entry',
            'install_contract_amount_after_entry',
            'IF(a.report_delivery_date="0000-00-00","",a.report_delivery_date)'=>'report_delivery_date',
            'IF(a.expected_delivery_date="0000-00-00","",a.expected_delivery_date)'=>'expected_delivery_date',
            'report_delivery_fyear',
            'IF(a.entry_date="0000-00-00","",a.entry_date)'=>'entry_date'
        ];
        if($super_admin==1){
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('a.report_delivery_date', '=', '0000-00-00')
                ->where('a.entry_date', '=', '0000-00-00')
                ->where('a.if_into_force', '=', '是')
                ->where('a.status', '=', '正常')
                ->select();
        }else{
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('a.report_delivery_date', '=', '0000-00-00')
                ->where('a.entry_date', '=', '0000-00-00')
                ->where('a.if_into_force', '=', '是')
                ->where('a.status', '=', '正常')
                ->where('b.install_company', '=', $company)
                ->select();
        }
        $excel->exports('已生效未发货明细', $head, $data, $keys);
    }
    //《合同-签梯明细》导出
    public function Sign_Excel($BothSealFrom,$BothSealTo){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '梯号'=>'string',
            '分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '客户分类'=>'string',
            '客户简称'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '项目名称'=>'string',
            '总公司状态'=>'string',
            '山东司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '标准设备价'=>'price',
            '标准运输价'=>'price',
            '标准安装价'=>'price',
            '合同签订设备价'=>'price',
            '合同签订运输价'=>'price',
            '合同签订安装价'=>'price',
            '平均安装支出'=>'price',
            '设备下浮'=>'0.00%',
            '营业员'=>'string',
            '接收日期'=>'date',
            '邮寄总部日期'=>'date',
            '收到总部寄回日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否三方合同'=>'string',
            '是否调验'=>'string',
            '提货前支付比例'=>'string',
            '合同备注'=>'string',
            '绩效归属'=>'string',
            '区域简称'=>'string',
            '梯种简称'=>'string',
            '签梯财年'=>'integer',
            '平均澄清费用'=>'price',
            '平均配套费用'=>'price',
            '本地大客户简称'=>'string',
            '大客户编码'=>'string',
            '生效日期'=>'date',
            '生效财年'=>'integer',
            '总公司营业员'=>'string',
            'KA客户简称'=>'string',
            '城市类型'=>'string',
            '区县类型'=>'string',
            '生效事业部'=>'string',
            '有无机房'=>'string',
            '上报出仓日期'=>'date',
            '发货财年'=>'integer',
            '项目属性'=>'string',
            '安装分公司'=>'string',
            '安装合同进场前金额'=>'price',
            '安装合同进场后金额'=>'price',
            '速度'=>'0.00',
            '项目分类'=>'string',
            '发货类型'=>'string',
            '完工日期'=>'date',
            '销售事业部'=>'string',
            '设备提货前应收金额'=>'price',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '设备四期预收'=>'price',
            '载重'=>'integer',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'elevator_id',
            'branch',
            'province',
            'area',
            'county',
            'customer_classification',
            'customer_abbreviation',
            'buyer_unit',
            'use_unit',
            'project_name',
            'status',
            'sd_status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'a.clarify_cost+a.supporting_cost'=>'average_installation_expenditure',
            'equipment_prices_fall',
            'sales_clerk',
            'contract_rec_date',
            'courier_date',
            'send_back_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'if_three_party',
            'if_check',
            'before_delivery_per',
            'contract_remarks',
            'belong_to',
            'SUBSTR(a.belong_to,1,2)'=>'belong_short',
            'elevator_short',
            'fyear',
            'a.clarify_cost',
            'a.supporting_cost',
            'local_customer_short',
            'big_client_code',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'into_force_fyear',
            'head_salesperson',
            'big_client_short',
            'city_type',
            'county_type',
            'into_force_bu',
            'elevator_room',
            'IF(report_delivery_date="0000-00-00","",report_delivery_date)'=>'report_delivery_date',
            'report_delivery_fyear',
            'b.project_type',
            'b.install_company',
            'a.install_contract_amount_before_entry',
            'a.install_contract_amount_after_entry',
            'a.speed',
            'b.project_classification',
            'a.report_delivery_type',
            'a.complete_date',
            'b.sale_bu',
            'a.equipment_receivables_before_delivery',
            'a.equipment_expected_collected',
            'a.equipment_amount_collected',
            'a.install_expected_collected',
            'a.install_amount_collected',
            'a.equipment_phase_4_expected_collected',
            'a.weight',
        ];
        //$data=Db::query($MySQL);
        if($super_admin==1){
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('both_seal_date', 'between time', [$BothSealFrom,$BothSealTo])
                ->select();
        }else{
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('both_seal_date', 'between time', [$BothSealFrom,$BothSealTo])
                ->where('b.branch','=',$company)
                ->select();
        }
        $excel->exports('签梯明细', $head, $data, $keys);
    }
    //《合同-待生效明细》导出
    public function PreIntoForceExport(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');

        $excel = new expExcel();

        //$data=Db::query($MySQL);
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '分公司'=>'string',
            '省份'=>'string',
            '地市'=>'string',
            '区县'=>'string',
            '营业员'=>'string',
            '梯号'=>'string',
            '总公司状态'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '客户分类'=>'string',
            '客户简称'=>'string',
            '大客户编码'=>'string',
            '标准设备价'=>'price',
            '标准运输价'=>'price',
            '标准安装价'=>'price',
            '合同签订设备价'=>'price',
            '合同签订运输价'=>'price',
            '合同签订安装价'=>'price',
            '设备下浮'=>'0.00%',
            '运输下浮'=>'0.00%',
            '安装下浮'=>'0.00%',
            '邮寄总部日期'=>'date',
            '双方盖章完毕日'=>'date',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '绩效归属'=>'string',
            '工号信息录入员'=>'string',
            '工号信息录入时间'=>'date',
            '平均安装支出'=>'price',
            '老客户'=>'string',
            '梯种简称'=>'string',
            '是否调验'=>'string',
            '买方单位'=>'string',
            '区域简称'=>'string',
            '项目属性'=>'string',
            '生效事业部'=>'string',
            '生效财年'=>'integer',
            '销售事业部'=>'string',
            '设备收款比例'=>'0.00%',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'a.contract_id',
            'project_name',
            'branch',
            'province',
            'area',
            'county',
            'sales_person',
            'elevator_id',
            'status',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'b.customer_classification',
            'customer_abbreviation',
            'b.big_client_code',
            'standard_equipment_price',
            'standard_transport_price',
            'standard_installation_price',
            'contract_equipment_price',
            'contract_transport_price',
            'contract_installation_price',
            'equipment_prices_fall',
            'transport_prices_fall',
            'install_prices_fall',
            'IF(b.courier_date="0000-00-00","",b.courier_date)'=>'courier_date',
            'IF(b.both_seal_date="0000-00-00","",b.both_seal_date)'=>'both_seal_date',
            'if_into_force',
            'IF(a.into_force_date="0000-00-00","",a.into_force_date)'=>'into_force_date',
            'belong_to',
            'product_inputer',
            'IF(a.product_input_date="0000-00-00","",a.product_input_date)'=>'product_input_date',
            'average_installation_expenditure',
            'old_customer',
            'elevator_short',
            'if_check',
            'buyer_unit',
            'SUBSTR(a.belong_to,1,2)'=>'scompany',
            'project_type',
            'into_force_bu',
            'into_force_fyear',
            'sale_bu',
            'equipment_receipt_ratio',
        ];
        if($super_admin==1){
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('a.if_into_force','=','否')
                ->where('a.sd_status','=','正常')
                ->select();
        }else{
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('b.province','=','山东省')
                ->where('a.if_into_force','=','否')
                ->where('a.sd_status','=','正常')
                ->where('a.belong_to','=',$company)
                ->select();
        }
        $excel->exports('待生效明细', $head, $data, $keys);
    }
    //《已生效未拆分明细》导出
    public function UnSplitIntoForce(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $today_date=session::get('today_date');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '区域'=>'string',
            '是否拆分'=>'string',
            '定金是否超5%'=>'string',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '收款编号'=>'string',
            '设备下浮'=>'0.00',
            '层'=>'integer',
            '标准设备价'=>'price',
            '设备签约价'=>'price',
            '电梯类别'=>'string',
            '安装签约价'=>'price',
            '发货日期'=>'date',
            '设备收款比例'=>'0.00'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'contract_id',
            'belong_to',
            'if_split',
            'enough_5_percent',
            'if_into_force',
            'into_force_date',
            'IF(report_date=0000-00-00,"",report_date)'=>'report_date',
            'IF(statistical_date=0000-00-00,"",statistical_date)'=>'statistical_date',
            'receipt_id',
            'equipment_prices_fall',
            'floor',
            'standard_equipment_price',
            'contract_equipment_price',
            'elevator_type',
            'contract_installation_price',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'equipment_receipt_ratio'
        ];
        $data  = Db::name('product')
            ->field($keys)
            ->where('sd_status', '=', '正常')
            ->where('into_force_date', 'between time', ['2016-01-01',$today_date])
            ->where('if_split', '=', '否')
            ->where('if_into_force', '=', '是')
            ->select();
        $excel->exports('已生效未拆分明细', $head, $data, $keys);
    }
    //《山东司生效总公司未生效明细》导出
    public function HelcUnIntoForce(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $today_date=session::get('today_date');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '业绩归属'=>'string',
            '是否拆分'=>'string',
            '定金是否超5%'=>'string',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '收款编号'=>'string',
            '设备下浮'=>'0.00',
            '层'=>'integer',
            '标准设备价'=>'price',
            '设备签约价'=>'price',
            '电梯类别'=>'string',
            '安装签约价'=>'price',
            '发货日期'=>'date',
            '设备收款比例'=>'0.00',
            '调验'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'contract_id',
            'belong_to',
            'if_split',
            'enough_5_percent',
            'if_into_force',
            'into_force_date',
            'IF(report_date=0000-00-00,"",report_date)'=>'report_date',
            'IF(statistical_date=0000-00-00,"",statistical_date)'=>'statistical_date',
            'receipt_id',
            'equipment_prices_fall',
            'floor',
            'standard_equipment_price',
            'contract_equipment_price',
            'elevator_type',
            'contract_installation_price',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'equipment_receipt_ratio',
            'debug'
        ];
        $data  = Db::name('product')
            ->field($keys)
            ->where('sd_status', '=', '正常')
            ->where('into_force_date', 'between time', ['2018-01-01',$today_date])
            ->where('statistical_date','=','0000-00-00')
            ->where('if_into_force', '=', '是')
            ->select();
        $excel->exports('山东司生效总公司未生效明细', $head, $data, $keys);
    }
    //《已达生效条件未报出明细》导出
    public function SdUnIntoForce(){
        set_time_limit(0);
        ini_set ('memory_limit', '1024M');
        $today_date=session::get('today_date');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '区域'=>'string',
            '是否生效'=>'string',
            '生效日期'=>'date',
            '上报日期'=>'date',
            '统计日期'=>'date',
            '发货日期'=>'date',
            '收款编号'=>'string',
            '标准设备价'=>'price',
            '设备签约价'=>'price',
            '电梯类别'=>'string',
            '安装签约价'=>'price',
            '设备收款比例'=>'0.00'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'contract_id',
            'belong_to',
            'if_into_force',
            'IF(into_force_date="0000-00-00","",into_force_date)'=>'into_force_date',
            'IF(report_date="0000-00-00","",report_date)'=>'report_date',
            'IF(statistical_date="0000-00-00","",statistical_date)'=>'statistical_date',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'receipt_id',
            'standard_equipment_price',
            'contract_equipment_price',
            'elevator_type',
            'contract_installation_price',
            'equipment_receipt_ratio'
        ];
        $data  = Db::name('product')
            ->field($keys)
            ->where('sd_status', '=', '正常')
            ->where('into_force_date','=','0000-00-00')
            ->where('equipment_receipt_ratio', '>=', '0.05')
            ->select();
        $excel->exports('已达生效条件未报出明细', $head, $data, $keys);
    }
    //《在制明细》导出
    public function MakingExport(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        $today_date=session::get('today_date');
        //获取所在区域
        $companys=Session::get('company');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '安装分公司'=>'string',
            '完工事业部'=>'string',
            '发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            '完工日期(临梯)'=>'date',
            '技监发证日期'=>'date',
            '技监发证日期(临梯)'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '关闭日期'=>'date',
            '合同签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '安装分包价'=>'price',
            '附加'=>'price',
            '配套'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '安装预计收款金额'=>'price',
            '安装实收'=>'price',
            '客户简称'=>'string',
            '设备一二期'=>'price',
            '安装一二期'=>'price',
            '是否存在一二期欠款'=>'string',
            '是否调验'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'product_id',
            'a.contract_id',
            'a.elevator_model',
            'floor',
            'stop',
            'door',
            'hoist_height',
            'hoistway_height',
            'supervisor',
            'b.install_company',
            'complete_bu',
            'IF(a.delivery_date="0000-00-00","",a.delivery_date)'=>'delivery_date',
            'IF(entry_date="0000-00-00","",entry_date)'=>'entry_date',
            'IF(complete_date="0000-00-00","",complete_date)'=>'complete_date',
            'IF(temp_elevator_date="0000-00-00","",temp_elevator_date)'=>'temp_elevator_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(temp_issuing_date="0000-00-00","",temp_issuing_date)'=>'temp_issuing_date',
            'pda_intime',
            'a.installation_expenditure',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'a.contract_installation_price',
            'a.entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity',
            'wa_amount',
            'wf_amount',
            'wp_amount',
            'scaffold',
            'an2',
            'a.supplier',
            'install_expected_collected',
            'install_amount_collected',
            'b.customer_abbreviation',
            'a.equipment_phase_12',
            'a.install_phase_12',
            'a.exist_12_phase',
            'a.debug',
        ];
        // 按条件查询数据并调用分页
        if($super_admin==1){
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('a.entry_date', 'between time', ['2000-01-01',$today_date])
                ->where('a.complete_date','=','0000-00-00')
                ->select();
        }else{
            $data = Db::name('product')
                ->alias('a')
                ->join('contract b','a.contract_id=b.contract_id')
                ->field($keys)
                ->where('a.entry_date', 'between time', ['2000-01-01',$today_date])
                ->where('a.complete_date','=','0000-00-00')
                ->where('a.install_company','=',$companys)
                ->select();
        }

        $excel->exports('在制明细表', $head, $data, $keys);
    }
    //《完工待审核明细》导出
    public function InstallAuditExport(){
        set_time_limit(0);
        ini_set ('memory_limit', '2048M');
        //  获取超级管理员权限
        $super_admin=Session::get('super_admin');
        $today_date=session::get('today_date');
        //  获取所在区域
        $companys=Session::get('company');
        $excel = new expExcel();
        //  按条件查询数据并调用分页
        $Product = new Product;
        //  设置表头：
        $head = [
            'ID'=>'integer',
            '生产工号'=>'string',
            '合同号'=>'string',
            '电梯型号'=>'string',
            '层'=>'integer',
            '站'=>'integer',
            '门'=>'integer',
            '提升高度'=>'0.00',
            '井道总高'=>'0.00',
            '项目经理'=>'string',
            '安装分公司'=>'string',
            '完工事业部'=>'string',
            '发货日期'=>'date',
            '进场日期'=>'date',
            '完工日期'=>'date',
            '完工日期(临梯)'=>'date',
            '技监发证日期'=>'date',
            '技监发证日期(临梯)'=>'date',
            'PDA录入是否及时'=>'string',
            '实际安装支出'=>'price',
            '关闭日期'=>'date',
            '合同签约价'=>'price',
            '标准委托价'=>'price',
            '吊装价'=>'price',
            '搭棚价'=>'price',
            '水电费'=>'price',
            '实际分包价'=>'price',
            '脚手架施工时费用'=>'price',
            'AN2工法施工时费用'=>'price',
            '安装网点'=>'string',
            '安装预计收款金额'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'product_id',
            'contract_id',
            'elevator_model',
            'floor',
            'stop',
            'door',
            'hoist_height',
            'hoistway_height',
            'supervisor',
            'install_company',
            'complete_bu',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'delivery_date',
            'IF(entry_date="0000-00-00","",entry_date)'=>'entry_date',
            'IF(complete_date="0000-00-00","",complete_date)'=>'complete_date',
            'IF(temp_elevator_date="0000-00-00","",temp_elevator_date)'=>'temp_elevator_date',
            'IF(issuing_date="0000-00-00","",issuing_date)'=>'issuing_date',
            'IF(temp_issuing_date="0000-00-00","",temp_issuing_date)'=>'temp_issuing_date',
            'pda_intime',
            'installation_expenditure',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'contract_installation_price',
            'entrust_spl',
            'hoisting_cost',
            'shed',
            'water_electricity',
            'wa_amount',
            'scaffold',
            'an2',
            'supplier',
            'install_expected_collected'
        ];
        // 按条件查询数据并调用分页
        $data = Db::name('product')
            ->field($keys)
            ->where('complete_status', '=', '待审核')
            ->select();
        $excel->exports('完工批量审核明细表', $head, $data, $keys);
    }
    //M0收款明细导出
    function m0ProductInfo(){
        ini_set ('memory_limit', '2048M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '工号'=>'string',
            '合同号'=>'string',
            '买方单位'=>'string',
            '签订分公司'=>'string',
            '营业员'=>'string',
            '设备合同额'=>'price',
            '设备收款'=>'price',
            '安装合同额'=>'price',
            '安装收款'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'a.product_id',
            'a.contract_id',
            'b.buyer_unit',
            'b.branch',
            'a.sales_person',
            'a.equipment_expected_collected',
            'a.equipment_amount_collected',
            'a.install_expected_collected',
            'a.install_amount_collected'
        ];
        $data = Db::name('product')
            ->alias('a')
            ->join('contract b','a.contract_id=b.contract_id')
            ->field($keys)
            ->where('b.province','=','山东省')
            ->where('a.status', '=', '正常')
            ->where('a.product_id', 'like', '%R%')
            ->select();
        $excel->exports('生效明细', $head, $data, $keys);
    }

}
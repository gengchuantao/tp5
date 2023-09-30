<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Performance;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class PerformanceController extends IndexController
{
    /*---------------------工号明细页面----------------------*/
    //加载页面时显示
    public function index()
    {

        return $this->fetch();
    }
    //单个区域PPM
    public function company()
    {
        // 获取查询信息
        $pageSize = 10; // 每页显示9条数据
        $Performance = new Performance;
        // 按条件查询数据并调用分页
        $performances = $Performance
            ->order('fyear','desc')
            ->order('season','desc')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->paginate($pageSize, false, ['query' => request()->param()]);
        // 向V层传数据
        $this->assign('performances', $performances);
        // 将数据返回给用户
        return $this->fetch();
    }
    //导出全部数据
    public function PerformanceToExcel(){
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '激活状态'=>'integer',
            '分公司'=>'string',
            '财年'=>'integer',
            '季度'=>'integer',
            '绩效等级'=>'string',
            '总分'=>'0.00',
            '生效累计指标'=>'0.00',
            '生效完成'=>'0.00',
            '生效完成率'=>'0.00%',
            '生效得分'=>'0.00',
            '设备当年欠款指标'=>'0.00%',
            '设备当年欠款率'=>'0.00%',
            '设备当年欠款得分'=>'0.00',
            '安装当年欠款指标'=>'0.00%',
            '安装当年欠款率'=>'0.00%',
            '安装当年欠款得分'=>'0.00',
            '设备历史欠款指标'=>'0.00%',
            '设备历史欠款回收率'=>'0.00%',
            '设备历史欠款得分'=>'0.00',
            '安装历史欠款指标'=>'0.00%',
            '安装历史欠款回收率'=>'0.00%',
            '安装历史欠款得分'=>'0.00',
            '设备入金累计指标'=>'0.00',
            '设备累计入金'=>'0.00',
            '设备入金累计完成率'=>'0.00%',
            '设备入金得分'=>'0.00',
            '安装入金累计指标'=>'0.00',
            '安装累计入金'=>'0.00',
            '安装入金累计完成率'=>'0.00%',
            '安装入金得分'=>'0.00',
            '完工累计指标'=>'0.00',
            '安装累计完工'=>'0.00',
            '安装完成率'=>'0.00%',
            '安装完工得分'=>'0.00',
            '有偿台量累计指标'=>'0.00',
            '有偿台量累计完成'=>'0.00',
            '有偿保养台量完成率'=>'0.00%',
            '有偿保养台量得分'=>'0.00',
            '售后服务入金指标'=>'0.00',
            '售后服务入金实际'=>'0.00',
            '售后服务入金完成率'=>'0.00%',
            '售后服务入金得分'=>'0.00',
            '保养历史欠款指标'=>'0.00%',
            '保养历史欠款完成'=>'0.00%',
            '保养历史欠款完成率'=>'0.00%',
            '保养历史欠款回收得分'=>'0.00',
            '维护修理+配件收入、大修改造收入指标'=>'0.00',
            '维护修理+配件收入、大修改造收入完成'=>'0.00',
            '维护修理+配件收入、大修改造收入完成率'=>'0.00%',
            '维护修理+配件收入、大修改造收入得分'=>'0.00',
            '大修改造历史欠款指标'=>'0.00%',
            '大修改造历史欠款完成'=>'0.00%',
            '大修改造历史欠款完成率'=>'0.00%',
            '大修改造历史欠款得分'=>'0.00',
            '直接成本率指标'=>'0.00%',
            '直接成本率完成率'=>'0.00%',
            '直接成本率得分'=>'0.00',
            'M0累计指标'=>'0.00',
            'M0累计完成'=>'0.00',
            'M0累计完成率'=>'0.00%',
            'M0得分'=>'0.00',
            '安全分数'=>'0.00',
            '安全得分'=>'0.00',
            '质量分数'=>'0.00',
            '质量得分'=>'0.00',
            '安装关闭台量'=>'0.00',
            '安装关闭率'=>'0.00%',
            '安装关闭率得分'=>'0.00',
            '设备关闭台量'=>'0.00',
            '设备关闭率'=>'0.00%',
            '设备关闭率得分'=>'0.00',
            '发货累计指标'=>'0.00',
            '发货完成'=>'0.00',
            '发货累计完成率'=>'0.00%',
            '发货得分'=>'0.00',
            '安全减分'=>'0.00',
            '质量加分'=>'0.00',
            '质量减分'=>'0.00',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'active_status',
            'company',
            'fyear',
            'season',
            'performance_level',
            'total_score',
            'intoforce_index',
            'intoforce_complete',
            'intoforce_rate',
            'intoforce_score',
            'eq_thisyear_index',
            'eq_thisyear_rate',
            'eq_thisyear_score',
            'in_thisyear_index',
            'in_thisyear_rate',
            'in_thisyear_score',
            'eq_history_index',
            'eq_history_rate',
            'eq_history_score',
            'in_history_index',
            'in_history_rate',
            'in_history_score',
            'eq_income_cumulative_index',
            'eq_income',
            'eq_income_rate',
            'eq_income_score',
            'in_income_cumulative_index',
            'in_income',
            'in_income_rate',
            'in_income_score',
            'install_complete_index',
            'install_complete',
            'install_complete_rate',
            'install_complete_score',
            'paid_index',
            'paid_complete',
            'paid_rate',
            'paid_score',
            'after_service_income_index',
            'after_service_income_complete',
            'after_service_income_rate',
            'after_service_income_score',
            'maintenance_history_recovery_index',
            'maintenance_history_recovery_complete',
            'maintenance_history_recovery_rate',
            'maintenance_history_recovery_score',
            'maintenance_reform_income_index',
            'maintenance_reform_income_complete',
            'maintenance_reform_income_rate',
            'maintenance_reform_income_score',
            'repair_history_arrears_season_index',
            'repair_history_arrears_complete',
            'repair_history_arrears_rate',
            'repair_history_arrears_score',
            'direct_cost_rate_index',
            'direct_cost_rate',
            'direct_cost_rate_score',
            'm0_index',
            'm0_complete',
            'm0_rate',
            'm0_score',
            'safe_complete',
            'safe_score',
            'quality_complete',
            'quality_score',
            'install_close',
            'install_close_rate',
            'install_close_score',
            'equipment_close',
            'equipment_close_rate',
            'equipment_close_score',
            'delivery_index',
            'delivery_complete',
            'delivery_rate',
            'delivery_score',
            'safe_reduction',
            'quality_extra',
            'quality_reduction',
        ];
        // 按条件查询数据并调用分页
        $data = Db::name('performance')
            ->field($keys)
            ->select();
        $excel->exports('区域PPM汇总表', $head, $data, $keys);
    }
    /**
     * API
     */
    //区域PPM
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    function jsonDataCompanyPPM(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('performance')
            ->order('fyear','desc')
            ->order('season','desc')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);

        echo  $SqlJson;
    }
    //单个区域PPM
    function companyJsonDataCompanyPPM(){
        //获取财年
        $companys=Session::get('company');
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('performance')
            ->where('company','=',$companys)
            ->order('fyear','desc')
            ->order('season','desc')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
}
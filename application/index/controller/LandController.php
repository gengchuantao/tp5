<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel; //调用导出EXCEL类
use app\common\model\Land;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class LandController extends IndexController{
    public function index(){
        // 获取查询信息
        $city = input('city');
        Session::set('land_city',$city);
        $land_type = input('land_type');
        Session::set('land_type',$land_type);
        $deal_date_from = input('deal_date_from');
        Session::set('deal_date_from',$deal_date_from);
        $deal_date_to = input('deal_date_to');
        Session::set('deal_date_to',$deal_date_to);
        $pageSize = 10; // 每页显示20条数据
        $Land = new Land();// 实例化
        $data = array();
        $data['land_type'] = array('in',$land_type);
        $where['deal_date'] = ['between',[$deal_date_from,$deal_date_to]];
        // 按条件查询数据并调用分页
        $lands = $Land
            ->where('city', 'like', '%' . $city . '%')
            ->where($where)
            ->where($data)
            ->order('deal_date','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('lands', $lands);
        return $this->fetch();
    }

    //导出Excel

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function landExport(){
        ini_set ('memory_limit', '1280M');
        $city = Session::get('land_city');
        $land_type = Session::get('land_type');
        $deal_date_from = Session::get('deal_date_from');
        $deal_date_to = Session::get('deal_date_to');
        $data = array();
        $data['land_type'] = array('in',$land_type);
        $where['deal_date'] = ['between',[$deal_date_from,$deal_date_to]];
        $excel = new expExcel();
        $xlsName  = "土地明细";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '地市'=>'string',
            '区县'=>'string',
            '土地编号'=>'string',
            '土地名称'=>'string',
            '用地面积(m²)'=>'0.00',
            '土地位置'=>'string',
            '规划用途'=>'string',
            '出让方式'=>'string',
            '出让价（万元）'=>'price',
            '规划建筑面积（平方米）'=>'0.00',
            '开始日期'=>'date',
            '截止日期'=>'date',
            '成交日期'=>'date',
            '成交价（万元）'=>'price',
            '成交人'=>'string',
            '溢价率（%）'=>'0.00',
            '容积率'=>'0.00',
            '备注'=>'string',
            '土地分类'=>'string',
            '区域'=>'string',
        ];

        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'city',
            'district',
            'land_number',
            'land_name',
            'land_area',
            'land_location',
            'plan_purpose',
            'sale_way',
            'price',
            'plan_area',
            'start_date',
            'close_date',
            'deal_date',
            'deal_price',
            'deal_person',
            'premium',
            'plot_ratio',
            'remarks',
            'land_type',
            'company',
        ];
        $data = Db::name('land')
            ->field($keys)
            ->where('city', 'like', '%' . $city . '%')
            ->where($where)
            ->where($data)
            ->select();
        $excel->exports($xlsName, $head, $data, $keys);
    }
}
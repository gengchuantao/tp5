<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Budrawing;
use Exception;
use PDOException;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;

class BudrawingController extends IndexController
{
    //季度绩效
    public function index(){
        // 获取查询信息
        $bu_name=Session::get('staff_bu');
        $staff_name = Request::instance()->get('staff_name');
        $admin = Request::instance()->get('admin');
        switch ($admin){
            case 1:
                $wheres['staff_bu'] = ['like',$bu_name];
                break;
            default:
                $wheres['staff_bu'] = ['=',$bu_name];
        }
        $pageSize = 10; // 每页显示10条数据
        // 实例化Teacher
        $Budrawing = new Budrawing;
        // 按条件查询数据并调用分页
        $budrawings = $Budrawing
            ->where($wheres)
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('budrawings', $budrawings);
        // 将数据返回给用户
        return $this->fetch();
    }
    //年终奖
    public function bonus(){
    // 获取查询信息
        $bu_name=Session::get('staff_bu');
        $staff_name = Request::instance()->get('staff_name');
        $admin = Request::instance()->get('admin');
        switch ($admin){
            case 1:
                $wheres['staff_bu'] = ['like',$bu_name];
                break;
            default:
                $wheres['staff_bu'] = ['=',$bu_name];
        }
        $pageSize = 10; // 每页显示10条数据
        // 实例化Teacher
        $Budrawing = new Budrawing;
        // 按条件查询数据并调用分页
        $budrawings = $Budrawing
            ->where($wheres)
            ->where('type','=','年度')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('budrawings', $budrawings);
        // 将数据返回给用户
        return $this->fetch();
    }
    //盈利分享
    public function profitSharing(){

    }
    public function report(){
        // 获取查询信息
        $staff_bu = Request::instance()->get('staff_bu');
        $company = Request::instance()->get('company');
        $pageSize = 10; // 每页显示10条数据
        // 实例化
        $Budrawing = new Budrawing;
        // 按条件查询数据并调用分页
        $budrawings = $Budrawing
            ->where('staff_bu','like','%'.$staff_bu.'%')
            ->where('company','like','%'.$company.'%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('budrawings', $budrawings);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function getInfoById(){
        $id = $this->request->param("id");
        $data = new \ArrayObject();
        try {
            $data = Db::name('budrawing')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function verify(){
        // 获取查询信息
        $staff_bu = Request::instance()->get('staff_bu');
        $admin = Request::instance()->get('admin');
        $company=Session::get('company');
        $wheres['company'] = ['=',$company];
        $pageSize = 10; // 每页显示10条数据
        // 实例化Teacher
        $Budrawing = new Budrawing;
        // 按条件查询数据并调用分页
        $budrawings = $Budrawing
            ->where('company','=',$company)
            ->where('staff_bu','like','%'.$staff_bu.'%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('budrawings', $budrawings);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function verifyDrawing(Request $request){
        $requestData=$request->param();
        $data=array(
            'drawing_amount' => $requestData['verify_drawing_amount'],
            'process_status' => '已审核',
            'id' => $requestData['verify_id']
        );
        $check=Db::name('budrawing')->where(['id' => $requestData['verify_id']])->count();
        if($check>0){
            $result=Db::name('budrawing')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function addNew(Request $request){
        $requestData=$request->param();
        $fyear=Session::get('fyear');
        $bu_name=Session::get('staff_bu');
        $today_date=session::get('today_date');
        $addData[] = [
            'staff_id' => $requestData['staff_id'],
            'staff_name' => $requestData['staff_name'],
            'company' => $requestData['company'],
            'staff_bu' => $bu_name,
            'drawing_amount' => $requestData['drawing_amount'],
            'drawing_date' => $today_date,
            'type' => $requestData['type'],
            'year' => $fyear,
            'process_status' => '待审核'
        ];
        $result=Db::name('budrawing')->insertAll($addData);
        if($result){
            $CallFunction = Db::execute("CALL funding_function;");
            return json(1);
        }else{
            return json(0);
        }
    }
    //  删除绩效
    function Delete ($delete_id){
        $result = array();
        try {
            $result = Db::name('budrawing')->where('id', '=', $delete_id)->delete();
        } catch (PDOException $e) {
        } catch (Exception $e) {
        }
        if($result){
            $CallFunction = Db::execute("CALL funding_function;");
            return json(1);
        }else {
            return json(0);
        }
    }
    /**
     * 导出数据
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function export(){
        $bu_name=Session::get('staff_bu');
        $admin = Request::instance()->get('admin');
        switch ($admin){
            case 1:
                $wheres['staff_bu'] = ['like',$bu_name];
                break;
            default:
                $wheres['staff_bu'] = ['=',$bu_name];
        }
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '员工编号'=>'string',
            '员工姓名'=>'string',
            '所属事业部'=>'string',
            '计提金额'=>'price',
            '计提日期'=>'date',
            '类型'=>'string',
            '财年'=>'integer',
            '创建时间'=>'datetime',
            '更新时间'=>'datetime'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'staff_id',
            'staff_name',
            'staff_bu',
            'drawing_amount',
            'drawing_date',
            'type',
            'year',
            'create_time',
            'update_time'
        ];
        $data=Db::name('budrawing')
            ->field($keys)
            ->where($wheres)
            ->select();
        $excel->exports('事业部计提明细', $head, $data, $keys);
    }
    public function verifyExport(){
        $company = Session::get('company');
        $admin = Request::instance()->get('admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '员工编号'=>'string',
            '员工姓名'=>'string',
            '所属事业部'=>'string',
            '计提金额'=>'price',
            '计提日期'=>'date',
            '类型'=>'string',
            '财年'=>'integer'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'staff_id',
            'staff_name',
            'staff_bu',
            'drawing_amount',
            'drawing_date',
            'type',
            'year'
        ];
        $data=Db::name('budrawing')
            ->field($keys)
            ->where('company','=',$company)
            ->select();
        $excel->exports('事业部计提明细', $head, $data, $keys);
    }
    public function reportExport(){
        $bu_name=Session::get('staff_bu');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '区域'=>'string',
            '员工编号'=>'string',
            '员工姓名'=>'string',
            '所属事业部'=>'string',
            '计提金额'=>'price',
            '计提日期'=>'date',
            '类型'=>'string',
            '状态'=>'string',
            '财年'=>'integer'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'company',
            'staff_id',
            'staff_name',
            'staff_bu',
            'drawing_amount',
            'drawing_date',
            'type',
            'process_status',
            'year'
        ];
        $data=Db::name('budrawing')
            ->field($keys)
            ->select();
        $excel->exports('事业部计提明细', $head, $data, $keys);
    }
}
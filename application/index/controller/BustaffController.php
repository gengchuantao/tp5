<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Bustaff;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class BustaffController extends IndexController
{
    public function index (){
        // 将数据返回给用户
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getBuStaffInfoByCondition(Request $request){
        $requestData=$request->param();
        $staff_name = $requestData['search_staff_name'];
        $staff_bu = $requestData['search_staff_bu'];
        $bustaff_company= $requestData['search_bustaff_company'];
        if(empty($staff_name) && empty($staff_bu)&& empty($bustaff_company)){
            $data=Db::name('bustaff')
                ->order('fyear desc,company,staff_bu')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('bustaff')
                ->where('staff_name', 'like', '%' . $staff_name . '%')
                ->where('staff_bu', 'like', '%' . $staff_bu . '%')
                ->where('company', 'like', '%' . $bustaff_company . '%')
                ->order('fyear desc,company,staff_bu')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function addNew(Request $request){
        $fyear=Session::get('fyear');
        $today_date=session::get('today_date');
        $requestData=$request->param();
        $data[] = [
            'fyear' => $fyear,
            'staff_id' => $requestData['staff_id'],
            'staff_name' => $requestData['staff_name'],
            'staff_post' => $requestData['staff_post'],
            'staff_bu' => $requestData['staff_bu'],
            'company' => $requestData['company'],
            'if_bu_minister' => $requestData['if_bu_minister'],
            'if_quit' => '否',
            'create_time' => $today_date,
            'update_time' => $today_date
        ];
        $result=Db::name('bustaff')->insertAll($data);
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    function Delete($delete_id){
        $list = Db::name('bustaff')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('bustaff')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //通过ID获取成员信息
    public function GetBustaffInfo(){
        $id = $this->request->param("id");
        $data = new \ArrayObject();
        try {
            $data = Db::name('bustaff')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //更新
    public function Update(Request $request){
        $requestData=$request->param();
        $data=array(
            'staff_bu' => $requestData['bustaff_staff_bu'],
            'company' => $requestData['bustaff_company'],
            'if_bu_minister' => $requestData['bustaff_if_bu_minister'],
            'if_quit' => $requestData['bustaff_if_quit'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('bustaff')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('bustaff')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //导出Excel
    function export(){
        $staff_name = Session::get('bustaff_bustaff_name');
        $staff_bu = Session::get('bustaff_staff_bu');
        $bustaff_company = Session::get('bustaff_company');
        //设置表头：
        $head = [
            'ID'=>'integer',
            '财年'=>'integer',
            '员工编号'=>'string',
            '姓名'=>'string',
            '岗位'=>'string',
            '所属事业部'=>'string',
            '分公司'=>'string',
            '事业部长'=>'string',
            '是否离职'=>'string',
            '创建时间'=>'date',
            '更新时间'=>'date'
        ];

        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'fyear',
            'staff_id',
            'staff_name',
            'staff_bu',
            'company',
            'if_bu_minister',
            'if_quit',
            'create_time',
            'update_time'
        ];
        $excel = new expExcel();
        $xlsName  = "事业部成员明细";
        $data = Db::name('bustaff')
            ->where('staff_name','like','%'.$staff_name.'%')
            ->where('staff_bu', 'like', '%' . $staff_bu . '%')
            ->where('company', 'like', '%' . $bustaff_company . '%')
            ->order('staff_bu')
            ->select();
        $excel->exports($xlsName,$head,$data,$keys);
    }
    //获取事业部
    public function GetBuName($company){
        $fyear=Session::get('fyear');
        $BuName= Db::table('helc_bustaff')
            ->where('company','=',$company)
            ->where('fyear','=',$fyear)
            ->distinct(true)->field('staff_bu')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($BuName) ; $i++) {
            $MySql[$i]=$BuName[$i]['staff_bu'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }

}
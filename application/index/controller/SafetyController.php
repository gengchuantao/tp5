<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Safety;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class SafetyController extends IndexController {
    public function index(){
        parent::__construct();//执行父类的构造函数，否则会被覆盖的。
        // 获取查询信息
        $contract_id = input('contract_id');
        Session::set('contract_id',$contract_id);
        $project_type = input('project_type');
        $project_name = input('project_name');
        $pageSize = 10; // 每页显示10条数据
        $admin=session::get('admin');
        $owndata=session::get('owndata');
        $staff_name=session::get('staff_name');
        $company=session::get('company');
        $companys=input('company');
        // 实例化Safety
        $Safety = new Safety;

        // 按条件查询数据并调用分页
        if($admin==1){
            $safetys = $Safety
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('project_type', 'like', '%' . $project_type . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('company', 'like', '%' . $companys . '%')
                ->order('id','desc')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            if($owndata==1){
                $safetys = $Safety
                    ->where('contract_id', 'like', '%' . $contract_id . '%')
                    ->where('project_type', 'like', '%' . $project_type . '%')
                    ->where('project_name', 'like', '%' . $project_name . '%')
                    ->where('company', '=', $company )
                    ->where('debuggers', '=', $staff_name )
                    ->order('id','desc')
                    ->paginate($pageSize, false, ['query'=>request()->param()]);
            }else{
                $safetys = $Safety
                    ->where('contract_id', 'like', '%' . $contract_id . '%')
                    ->where('project_type', 'like', '%' . $project_type . '%')
                    ->where('project_name', 'like', '%' . $project_name . '%')
                    ->where('company', '=', $company )
                    ->order('id','desc')
                    ->paginate($pageSize, false, ['query'=>request()->param()]);
            }
        }


        // 向V层传数据
        $this->assign('safetys', $safetys);
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function GetSafetyInfoByCondition(Request $request){
        $requestData=$request->param();
        $contract_id = $requestData['search_contract_id'];
        $company= $requestData['search_company'];
        $project_name = $requestData['search_project_name'];
         $project_type = $requestData['search_project_type'];
        $companys=Session::get('company');
        if($companys==='山东分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        if(empty($contract_id) && empty($company) && empty($project_name)&& empty($project_type)){
            $data=Db::name('safety')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('project_type', 'like', '%' . $project_type . '%')
                ->order('id DESC')
                ->limit('100')
                ->select();
        }else{
            $data=Db::name('safety')
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('company', 'like', '%' . $company . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('project_type', 'like', '%' . $project_type . '%')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
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
    //插入数据
    public function insert($contract_id,$project_name,$project_type,$contract_num,$product_id,$install_unit,$debuggers,$team,$operators_num,$electrician,$welder,$team_members,$buy_insurance,$hold_certificate,$approach_date,$project_address){
        $company=session::get('company');
        // 实例化
        $Safety = new Safety();
        $Safety->company = $company;
        $Safety->contract_id = $contract_id;
        $Safety->project_name = $project_name;
        $Safety->project_type = $project_type;
        $Safety->contract_num = $contract_num;
        $Safety->product_id = $product_id;
        $Safety->install_unit = $install_unit;
        $Safety->debuggers = $debuggers;
        $Safety->team = $team;
        $Safety->operators_num = $operators_num;
        $Safety->electrician = $electrician;
        $Safety->welder = $welder;
        $Safety->team_members = $team_members;
        $Safety->buy_insurance = $buy_insurance;
        $Safety->hold_certificate = $hold_certificate;
        $Safety->approach_date = $approach_date;
        $Safety->project_address = $project_address;
        // 判断数据库中是否有该项目名称，这里不需要再判断了，所以用了id字段来规避判断
        $list = Db::name('safety')->where(['id'=>$project_name])->count();
        if($list>0){
            return json(date(0));
        }else {
            $Safety->save();
            return json(date(1));
        }
    }
    public function edit()
    {
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        if (is_null($Safety = Safety::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }else{
            //创建的多级目录
            $path="uploads/safety/$id";
            //判断目录存在否，存在给出提示，不存在则创建目录
            if (is_dir($path)){
                echo "对不起！目录 " . $path . " 已经存在！";
            }else{
                //第三个参数是“true”表示能创建多级目录，iconv防止中文目录乱码
                $res=mkdir(iconv("UTF-8", "GBK", $path),0777,true);
                if ($res){
                    echo "目录 $path 创建成功";
                }else{
                    echo "目录 $path 创建失败";
                }
            }
        }
        // 将数据传给V层
        $this->assign('Safety', $Safety);
        // 获取封装好的V层内容
        return $this->fetch();
    }
    public function preview(){
        parent::__construct();//执行父类的构造函数，否则会被覆盖的。
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        $Safety = Safety::get($id);
        $result01 = Db::name('safety_images')
            ->where('sid','=',$id)
            ->where('image_type','=','开工告知')
            ->order('id',desc)
            ->select();
        $result02 = Db::name('safety_images')
            ->where('sid','=',$id)
            ->where('image_type','=','现场施工')
            ->order('id',desc)
            ->select();
        $result03 = Db::name('safety_images')
            ->where('sid','=',$id)
            ->where('image_type','=','安全检查')
            ->order('id',desc)
            ->select();
        $this->assign('Safety', $Safety);
        $this->assign('result01', $result01);
        $this->assign('result02', $result02);
        $this->assign('result03', $result03);
        $this->display();
        $htmls = $this->fetch();
        return $htmls;
    }
    public function check(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        $Safety = Safety::get($id);
        // 将数据传给V层
        $this->assign('Safety', $Safety);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }

    public function checking(){
        // 接收数据
        $checkdata = Request::instance()->post();
        // 将数据存入Bustaff表
        $Safety = new Safety();
        $state = $Safety->isUpdate(true)->save($checkdata);

        //var_dump($state);
        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    public function audit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        $Safety = Safety::get($id);
        // 将数据传给V层
        $this->assign('Safety', $Safety);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function auditing(){
        // 接收数据
        $auditdata = Request::instance()->post();
        $Safety = new Safety();
        $state = $Safety->isUpdate(true)->save($auditdata);

        //var_dump($state);
        // 依据状态定制提示信息
        if ($state) {
            return $this->success('更新成功', url('index'));
        } else {
            return '更新失败';
        }
    }
    /*图片上传*/
    public function upload(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        $Safety = Safety::get($id);
        // 将数据传给V层
        $this->assign('Safety', $Safety);
        // 获取封装好的V层内容
        $htmls = $this->fetch();
        // 将封装好的V层内容返回给用户
        return $htmls;
    }
    public function uploadimg(){
        $id = Request::instance()->param('id/d');
        $image_type = Request::instance()->param('image_type');
        $uid = Session::get('staff_ids');
        // 获取表单上传文件
        $imagfiles = request()->file('image');
        if (empty($imagfiles)) {
            return ('获取文件失败');
        }
        foreach($imagfiles as $key => $file){
            // 移动到框架应用根目录/public/uploads/safety/$id 目录下
            $info = $file->validate(['ext'=>'jpg,png,gif,jpeg'])->move(ROOT_PATH . 'public/uploads/safety/'.$id);

            //$data[] = '../tp5/public/uploads/safety/'.$id.'/'.$info -> getSaveName();
            if($info==false){
                return ('上传格式错误');
            }
            else{
                $column1 = 1;
                $data = [
                    'sid' => $id,
                    'uid' => $uid,
                    'image_type' => $image_type,
                    'images_address' => '/../tp5/public/uploads/safety/'.$id.'/'.$info -> getSaveName(),
                    'del_address' => '/uploads/safety/'.$id.'/'.$info -> getSaveName()
                ];
                $affected = Db::name('safety_images')->insert($data);
            }
        }
        return $this->success('上传成功', url('index'));
        //$affected = Db::name('safety_images')->insert($data);

    }
    public function delete()
    {
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $Safety = Safety::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Safety)) {
            // 删除对象
            if ($Safety->delete()) {
                return $this->success('删除成功', url('index'));
            }
        }

        return '删除失败';

    }
    //删除照片
    public function deleteimg(){
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        //var_dump($id);
        $data = Db::name('safety_images')
            ->where('id','=',$id)
            ->select();
        //var_dump($data);
        $sid=$data[0]['sid'];
        $images_address=$data[0]['del_address'];
        $path = __FILE__;
        $paths = substr($path,0,strpos($path,'application'));
        $pic1 = $paths."public" .DS . $images_address;
        if (file_exists($pic1)) {
            unlink($pic1);//删除文件
        }
        //删除数据库
        $result = Db::name('safety_images')->where(array('id' => $id))->delete();
        if ($result) {
            $this->success("成功删除" . $result . "张图片", 'Safety/index', '', 1);
        } else {
            $this->error("删除失败！");
        }
    }
    function close_project(){
        // 获取get数据
        // 获取传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $project_status='已完工';
        //更新项目状态
        $result = Db::table('helc_safety')->where('id', $id)->update(['project_status' => $project_status]);
        if ($result) {
            $this->success("已成功关闭" . $result . "个项目", 'Safety/index', '', 1);
        } else {
            $this->error("关闭失败！");
        }
    }
    public function bi(){
        //安装历史欠款TOP10
        $result1= Db::query("
SELECT company,sum,sum1,sum2,sum+sum1+sum2 AS sum3 FROM (SELECT company,sum,sum1 FROM (SELECT SUBSTR(company,1,2) AS company,IFNULL(sum,0) AS sum
FROM(SELECT  helc_sdcompanyindex.company
FROM helc_sdcompanyindex
WHERE helc_sdcompanyindex.year=2020) AS A
LEFT JOIN
(SELECT IFNULL(company,'合计') AS company1,sum FROM (SELECT company,COUNT(id) AS sum FROM helc_safety
WHERE approach_date BETWEEN '2021-04-01' AND '2022-03-31' AND project_type='安装'
GROUP BY company WITH ROLLUP) AS B) AS C
ON A.company=C.company1) AS D
LEFT JOIN
(SELECT SUBSTR(company,1,2) AS company1,IFNULL(sum,0) AS sum1
FROM(SELECT  helc_sdcompanyindex.company
FROM helc_sdcompanyindex
WHERE helc_sdcompanyindex.year=2020) AS A
LEFT JOIN
(SELECT IFNULL(company,'合计') AS company1,sum FROM (SELECT company,COUNT(id) AS sum FROM helc_safety
WHERE approach_date BETWEEN '2021-04-01' AND '2022-03-31' AND project_type='维改'
GROUP BY company WITH ROLLUP) AS B) AS C
ON A.company=C.company1) AS E
ON D.company=E.company1) AS F
LEFT JOIN
(SELECT SUBSTR(company,1,2) AS company2,IFNULL(sum,0) AS sum2
FROM(SELECT  helc_sdcompanyindex.company
FROM helc_sdcompanyindex
WHERE helc_sdcompanyindex.year=2020) AS A
LEFT JOIN
(SELECT IFNULL(company,'合计') AS company1,sum FROM (SELECT company,COUNT(id) AS sum FROM helc_safety
WHERE approach_date BETWEEN '2021-04-01' AND '2022-03-31' AND project_type='保养'
GROUP BY company WITH ROLLUP) AS B) AS C
ON A.company=C.company1) AS G
ON F.company=G.company2
");
        // 将数据传给V层
        $this->assign('result1', $result1);
        $this->display();
        return $this->fetch();
    }
    public function detail(){
// 将数据传给V层
        $id = Request::instance()->param('id/d');
        $Safety = Safety::get($id);
        $this->assign('Safety', $Safety);
        $this->display();
        return $this->fetch();
    }
    //导出Excel
    function export(){
        ini_set ('memory_limit', '2048M');
        $excel = new expExcel();
        $contract_id = Session::get('contract_id');
        $admin = Session::get('admin');
        $company = Session::get('company');
        $xlsName  = "开工告知汇总表";
        //设置表头：
        $head = [
            'ID'=>'integer',
            '区域'=>'string',
            '合同号'=>'string',
            '项目名称'=>'string',
            '项目地址'=>'string',
            '项目类型'=>'string',
            '台量'=>'integer',
            '工号'=>'string',
            '安装单位'=>'string',
            '作业经理'=>'string',
            '班组'=>'string',
            '作业人数'=>'integer',
            '电工'=>'string',
            '焊工'=>'string',
            '组员'=>'string',
            '是否购买保险'=>'string',
            '是否持有操作证'=>'string',
            '进场时间'=>'date',
            '项目状态'=>'string',
            '创建时间'=>'date',
            '更新时间'=>'date'
        ];

        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'company',
            'contract_id',
            'project_name',
            'project_address',
            'project_type',
            'contract_num',
            'product_id',
            'install_unit',
            'debuggers',
            'team',
            'operators_num',
            'electrician',
            'welder',
            'team_members',
            'buy_insurance',
            'hold_certificate',
            'approach_date',
            'project_status',
            'create_time',
            'update_time'
        ];
        if($admin==1){
            $data = Db::name('safety')
                ->field($keys)
                ->where('contract_id','like','%'.$contract_id.'%')
                ->select();
        }else{
            $data = Db::name('safety')
                ->field($keys)
                ->where('contract_id','like','%'.$contract_id.'%')
                ->where('company', '=', $company )
                ->select();
        }
        $excel->exports($xlsName, $head, $data, $keys);
    }
    //文章预览页
    public function learn(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在Safety表模型中获取当前记录
        $Safety = Safety::get($id);
        // 将数据传给V层
        $this->assign('Safety', $Safety);
        // 将封装好的V层内容返回给用户
        return $this->fetch();
    }
}
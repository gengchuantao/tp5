<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Learn;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class LearnController extends IndexController {
    public function index(){
        parent::__construct();//执行父类的构造函数，否则会被覆盖的。
        // 获取查询信息
        $pageSize = 15; // 每页显示10条数据
        $admin=session::get('admin');
        $owndata=session::get('owndata');
        $staff_name=session::get('staff_name');
        $company=session::get('company');
        // 实例化
        $Learn = new Learn;
            $learn01 = $Learn
                ->where('type','=','方案通知')
                ->order('id','desc')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            $learn02 = $Learn
                ->where('type','=','案例通报')
                ->order('id','desc')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
            $learn03 = $Learn
                ->where('type','=','培训资料')
                ->order('id','desc')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('learn01', $learn01);
        $this->assign('learn02', $learn02);
        $this->assign('learn03', $learn03);
        $this->display();
        return $this->fetch();
    }
    //插入数据
    public function AddForm($title,$type){

        $company=session::get('company');
        $staff_name=session::get('staff_name');
        $today_date=date('Y-m-d H:i:s',time());
        $Learn = New Learn();
        $list=Db::name('learn')
            ->where([
                'title'=>$title
            ])
            ->count();
        if($list>0){
            return json(date(0));
        }else{
            $result = Db::execute("
            insert into helc_learn(
            title,type
            )
            values(
            '$title','$type'
            )
            ");
            return json(date(1));
        }
    }
    public function preview(){
        parent::__construct();//执行父类的构造函数，否则会被覆盖的。
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        $Learn = Learn::get($id);
        $result01 = Db::name('learn_images')
            ->where('lid','=',$id)
            ->order('id','ESC')
            ->select();
        $this->assign('Learn', $Learn);
        $this->assign('result01', $result01);
        return $this->fetch();
    }
    public function upload(){
        parent::__construct();//执行父类的构造函数，否则会被覆盖的。
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        $Learn = Learn::get($id);
        $result01 = Db::name('learn_images')
            ->where('lid','=',$id)
            ->order('id','desc')
            ->select();
        $this->assign('Learn', $Learn);
        $this->assign('result01', $result01);
        return $this->fetch();
    }
    public function UploadImg(){
        $id = Request::instance()->param('id/d');
        $uid = Session::get('staff_ids');
        // 获取表单上传文件
        $imagfiles = request()->file('image');
        if (empty($imagfiles)) {
            return ('获取文件失败');
        }
        foreach($imagfiles as $key => $file){
            // 移动到框架应用根目录/public/uploads/learn/$id 目录下
            $info = $file->validate(['ext'=>'jpg,png,gif,jpeg'])->move(ROOT_PATH . 'public/uploads/learn/'.$id);

            //$data[] = '../tp5/public/uploads/learn/'.$id.'/'.$info -> getSaveName();
            if($info==false){
                return ('上传格式错误');
            }
            else{
                $column1 = 1;
                $data = [
                    'lid' => $id,
                    'uid' => $uid,
                    'images_address' => '/../tp5/public/uploads/learn/'.$id.'/'.$info -> getSaveName(),
                    'del_address' => '/uploads/learn/'.$id.'/'.$info -> getSaveName()
                ];
                $affected = Db::name('learn_images')->insert($data);
            }
        }
        return $this->success('上传成功', url('index'));
        //$affected = Db::name('safety_images')->insert($data);

    }
    public function edit()
    {
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        // 在表模型中获取当前记录
        if (is_null($Learn = Learn::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }else{
            //创建的多级目录
            $path="uploads/learn/$id";
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
        $this->assign('Learn', $Learn);
        // 获取封装好的V层内容
        return $this->fetch();
    }
    public function delete()
    {
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $Learn = Learn::get($id);// 获取要删除的对象
        // 要删除的对象存在
        if (!is_null($Learn)) {
            // 删除对象
            if ($Learn->delete()) {
                return $this->success('删除成功', url('index'));
            }
        }

        return '删除失败';

    }
    //删除照片
    public function DeleteImg(){
        // 获取get数据
        // 获取pathinfo传入的ID值.
        $id = Request::instance()->param('id/d'); // “/d”表示将数值转化为“整形”
        if (is_null($id) || 0 === $id) {
            return $this->error('未获取到ID信息');
        }
        $data = Db::name('learn_images')
            ->where('id','=',$id)
            ->select();
        $lid=$data[0]['lid'];
        $images_address=$data[0]['del_address'];
        $path = __FILE__;
        $paths = substr($path,0,strpos($path,'application'));
        $pic1 = $paths."public" .DS . $images_address;
        if (file_exists($pic1)) {
            unlink($pic1);//删除文件
        }
        //删除数据库
        $result = Db::name('learn_images')->where(array('id' => $id))->delete();
        if ($result) {
            $this->success("成功删除" . $result . "张图片", 'Learn/index', '', 1);
        } else {
            $this->error("删除失败！");
        }
    }
}

<?php
namespace app\index\controller;
use think\Controller;   // 用于与V层进行数据传递
use think\Request;
use app\common\model\Staff;
use think\Db;
use think\Session;
class LoginController extends Controller{

    public function index()
    {
        /*显示登录表单*/
        return $this->fetch();
    }
    public function getBingPic(){
        $str=file_get_contents('https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
        if (preg_match("/<urlBase>(.+?)<\/urlBase>/ies", $str, $matches)) {
            $imgurl='https://cn.bing.com'.$matches[1].'_1920x1080.jpg';
        }
        if ($imgurl) {
            header('Content-Type: image/JPEG');
            @ob_end_clean();
            @readfile($imgurl);
            @flush();
            @ob_flush();
            exit();
        } else {
            exit('error');
        }
    }
    function returnImage(){
        $str=@file_get_contents('https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
        $xml = simplexml_load_string($str);
        $imageUrlBase = $xml->image->url;
        $imageUrl = 'https://cn.bing.com'.$imageUrlBase[0];
        $date = ($xml->image->enddate)[0];
        $stringFunction = ($xml->image->copyright)[0];
        $headline = ($xml->image->headline)[0];
        $returnData = ['imageUrl'=>$imageUrl,'date'=>$date,'copyright'=>$stringFunction,'headline'=>$headline];
        $SqlJson=json_encode($returnData);
        echo  $SqlJson;
    }
    function getIP(){
        $str=@file_get_contents('https://api.ipify.org?format=jsonp&callback=getIP');
        $SqlJson=json_encode($str);
        echo  $SqlJson;
    }
    public function welcome()
    {
        // 显示首页
        return $this->fetch();
    }
    public function changepw()
    {
        // 显示首页
        return $this->fetch();
    }
    public function test(){
        //  显示测试页
        return $this->fetch();
    }
    // 注销
    public function logOut(){
        if (Staff::logOut()) {
            return $this->success('注销成功', url('/../index.php/index/login/index'));
            session('name',null);
            session('staff_id',null);
            session('[destroy]');
        } else {
            return $this->error('注销错误', url('/../index.php/index/login/index'));
        }
    }
    public  function  AjaxLogin(Request $request){
        $requestData = $request->param();
        $create_time = date("Y-m-d H:i:s");
        $passwords = md5($requestData['password']);
        //构建记录数组
        $data[] = [
            'staff_id' => $requestData['staff_id'],
            'device' => $requestData['device'],
            'create_time' => $create_time,
        ];
        //检查用户名跟密码
        $PasswordCheck=Db::name('staff')
            ->where(['staff_id' => $requestData['staff_id']])
            ->where(['password' => $passwords])
            ->count();

       if ($PasswordCheck>0) {
            Session::set('staff_id',$requestData['staff_id']);
            $result=Db::name('log')->insertAll($data);
            return json(1);
        } else {
            return json(0);
        }
    }
}
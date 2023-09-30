<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Log;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;

class LogController extends IndexController
{
    public function index(){
        // 将数据返回给用户
        return $this->fetch();
    }

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getLoginInfo(){
        $data = Db::name('log')
            ->order('id','desc')
            ->limit('2000')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

}
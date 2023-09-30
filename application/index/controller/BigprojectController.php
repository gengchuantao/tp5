<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\model\Bigproject;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class BigprojectController extends IndexController{
    public function index(){
        echo memory_get_usage();
        echo "<br>";
        echo memory_get_peak_usage();
        return $this->fetch();
    }
    public function objStatic(){
        $data = Bigproject::get(1);
        var_dump($data);
    }
    public function  getAll(){
        $bigproject=model('Bigproject');
        $data=$bigproject->getAll();
        print_r($data);
    }
}
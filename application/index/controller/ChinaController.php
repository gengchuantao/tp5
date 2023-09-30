<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\China;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class ChinaController extends IndexController
{
    public function index(){

    }
    public function GetProvince(){
        $Provinces= Db::table('helc_china')
            ->distinct(true)
            ->field('province')
            ->order('id')
            ->select();
        $MySql=[];
        for ($i=0; $i < count($Provinces) ; $i++) {
            $MySql[$i]=$Provinces[$i]['province'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    public function GetCity($province){
        $Provinces= Db::table('helc_china')->where('province','=',$province)->distinct(true)->field('city')->select();
        $MySql=[];
        for ($i=0; $i < count($Provinces) ; $i++) {
            $MySql[$i]=$Provinces[$i]['city'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
    public function GetCounty($province,$city){
        $Provinces= Db::table('helc_china')->where('province','=',$province)->where('city','=',$city)->distinct(true)->field('county')->select();
        $MySql=[];
        for ($i=0; $i < count($Provinces) ; $i++) {
            $MySql[$i]=$Provinces[$i]['county'];
        }
        $SqlData=json_encode($MySql);
        echo  $SqlData;
    }
}
<?php

namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\ElevatorRegistration;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class ElevatorRegistrationController extends IndexController
{
    public function index(){
        // 获取查询信息
        $receipt_id = input('receipt_id');
        $pageSize = 10;
        $ElevatorRegistration = new ElevatorRegistration();
        $elevator_registrations = $ElevatorRegistration
            ->where('receipt_id', 'like', '%' .$receipt_id. '%')
            ->order('id','desc')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        $this->assign('equipment_incomes', $elevator_registrations);
        return $this->fetch();
    }

    /**
     * API接口
     */
    //获取2000年至今各品牌累计注册情况
    function getEachBrandCumulativeRegistration(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sql="
        SELECT
	brand AS name,
	COUNT(brand) AS value
FROM
	`helc_elevator_registration`
WHERE brand IN ('日立','三菱','三菱机电','通力','巨人通力','奥的斯机电','奥的斯','杭州西奥','西子','蒂森','康力','迅达','东芝','富士达','永大','西继迅达')
GROUP BY
	brand
ORDER BY value DESC
        ";
        $data=Db::query($sql);
        echo json_encode($data);
    }
    //获取TOP5品牌近10年注册情况
    function getTop5Brand10YearsRegistration(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sql="
SELECT
	YEAR ( registration_date ) AS fyear,
	COUNT( CASE brand WHEN '日立' THEN brand  END) AS rili,
	COUNT( CASE brand WHEN '三菱' THEN brand  END) AS sanling,
    COUNT( CASE brand WHEN '三菱机电' THEN brand  END) AS sanlingjidian,
	COUNT( CASE brand WHEN '通力' THEN brand  END) AS tongli,
    COUNT( CASE brand WHEN '巨人通力' THEN brand  END) AS jurentongli,
	COUNT( CASE brand WHEN '奥的斯机电' THEN brand  END) AS aodisijidian,
    COUNT( CASE brand WHEN '奥的斯' THEN brand  END) AS aodisi,
	COUNT( CASE brand WHEN '蒂森' THEN brand  END) AS disen,
    COUNT( CASE brand WHEN '杭州西奥' THEN brand  END) AS hangzhouxiao
FROM
	helc_elevator_registration 
WHERE
	YEAR(NOW())-YEAR(registration_date)<10
GROUP BY
	fyear
        ";
        $data=Db::query($sql);
        echo json_encode($data);
    }

}
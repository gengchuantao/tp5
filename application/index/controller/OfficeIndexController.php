<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\OfficeIndex;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class OfficeIndexController extends IndexController
{
    public function index(){
        return $this->fetch();
    }

    /**
     * 安装完工台量
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getInstallCompleteOfficeIndexInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装完工台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 安装完工台量按区域
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getInstallCompleteOfficeIndexInfoByCompany(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        if($companys==='广州分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装完工台量')
            ->where('branch', 'like', '%' . $company . '%')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }

    /**
     * 安装完工产值(不含税)
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getInstallWorthOfficeIndexInfo(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装完工产值(不含税)')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 安装完工产值(不含税)按区域
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getInstallWorthOfficeIndexInfoByCompany(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        if($companys==='广州分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装完工产值(不含税)')
            ->where('branch', 'like', '%' . $company . '%')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }

    /**
     * 安装入金
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function installIncomeComplete(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装入金')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 安装入金按区域
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function installIncomeCompleteByCompany(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        if($companys==='广州分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('office_index')
            ->where('index_name','=','安装入金')
            ->where('branch', 'like', '%' . $company . '%')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }

    /**
     * 报价台量
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function quoteIndexComplete(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','报价台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 设备入金(发货后入金)按区域
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function equipmentIncomeCompleteByCompany(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        if($companys==='广州分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('office_index')
            ->where('index_name','=','设备入金(发货后入金)')
            ->where('branch', 'like', '%' . $company . '%')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 签梯台量
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getIntoForceOfficeIndexInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','生效台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 重点项目台量
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function keyProjectIndexComplete(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','重点项目台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }
    /**
     * 发货台量
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getDeliveryOfficeIndexInfo(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('office_index')
            ->where('index_name','=','发货台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }






}
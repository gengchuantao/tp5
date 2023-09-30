<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\MonthIndex;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class MonthIndexController extends IndexController
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
    public function getInstallCompleteMonthIndexInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('month_index')
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
    public function getInstallCompleteMonthIndexInfoByCompany(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        $sqlData = Db::name('month_index')
            ->where('index_name','=','完工台量')
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
    public function getInstallWorthMonthIndexInfo(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('month_index')
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
    public function getInstallWorthMonthIndexInfoByCompany(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $companys=Session::get('company');
        if($companys==='广州分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('month_index')
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
        $sqlData = Db::name('month_index')
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
        $sqlData = Db::name('month_index')
            ->where('index_name','=','安装入金')
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
        $sqlData = Db::name('month_index')
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
        $sqlData = Db::name('month_index')
            ->where('index_name','=','设备入金')
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
    public function getIntoForceMonthIndexInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('month_index')
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
        $sqlData = Db::name('month_index')
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
    public function getDeliveryMonthIndexInfo(){
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $sqlData = Db::name('month_index')
            ->where('index_name','=','发货台量')
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }


    public function company(Request $request){
        $requestData=$request->param();
        $company = $requestData['company'];
        Session::set('month_index_company',$company);
        return $this->fetch();
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function getCompanyMonthIndexInfo(){
        $companys=Session::get('company');
        $month_index_company=Session::get('month_index_company');
        $fyear=Session::get('fyear');
        if($companys=='山东分公司'){
            $company=$month_index_company;
        }else{
            $company=$companys;
        }
        $sqlData = Db::name('month_index')
            ->where('company','=',$company)
            ->where('fyear','=', $fyear)
            ->select();
        $SqlJson=json_encode($sqlData);
        echo  $SqlJson;
    }






}
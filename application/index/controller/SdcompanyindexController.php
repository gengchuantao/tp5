<?php
namespace app\index\controller;
use app\common\model\Sdcompanyindex;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class SdcompanyindexController extends IndexController
{
    public function index(){

        // 获取查询信息
        $bu_name = Request::instance()->get('id');

        $pageSize = 35; // 每页显示5条数据
        $fyear=Session::get('fyear');

        // 实例化Teacher
        $Sdcompanyindex = new Sdcompanyindex;

        // 按条件查询数据并调用分页
        $sdcompanyindexs = $Sdcompanyindex->where('year', 'like', '%' . $fyear . '%')->order('sign_complete')->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $bu_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('sdcompanyindexs', $sdcompanyindexs);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function install(){

        // 获取查询信息
        $bu_name = Request::instance()->get('id');

        $pageSize = 35; // 每页显示5条数据

        // 实例化Teacher
        $Sdcompanyindex = new Sdcompanyindex;
        $fyear=Session::get('fyear');
        // 按条件查询数据并调用分页
        $sdcompanyindexs = $Sdcompanyindex->where('year', 'like', '%' . $fyear . '%')->order('install_complete')->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $bu_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('sdcompanyindexs', $sdcompanyindexs);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function arrears(){

        // 获取查询信息
        $bu_name = Request::instance()->get('id');

        $pageSize = 35; // 每页显示5条数据

        // 实例化Teacher
        $Sdcompanyindex = new Sdcompanyindex;
        $fyear=Session::get('fyear');
        // 按条件查询数据并调用分页
        $sdcompanyindexs = $Sdcompanyindex->where('year', 'like', '%' . $fyear . '%')->order('recovery')->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $bu_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('sdcompanyindexs', $sdcompanyindexs);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function companycomplete()
    {
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT
	date_format( helc_product.complete_date, '%y-%m' ) AS YEAR,
	helc_product.supervisor,
	helc_contract.project_name,
	COUNT( helc_product.product_id ) AS sum,
	helc_product.install_company 
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_product.install_company = '$company' 
	AND helc_product.complete_date BETWEEN '2021-04-01' AND '2022-03-31' 
GROUP BY
	project_name,
	supervisor 
ORDER BY
	YEAR,
	sum
");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    /*分公司重点跟进项目明细*/
    public function coimportant()
    {
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT sales_person,project_name,quote_num 
FROM helc_quote
WHERE branch_office = '$company' AND win_biding = '0'AND sign_contract = '0' AND if_not_winning <> '是' 
ORDER BY sales_person,quote_num ASC
");
        // 向V层传数据
        $this->assign('result', $result);
        // 取回打包后的数据
        $htmls = $this->fetch();
        // 将数据返回给用户
        return $htmls;
    }
    public function companyarrears()
    {
        $company_name = Session::get('company');
        // 获取查询信息
        $companys = Request::instance()->get('company');

        if (empty($companys))
        {
            $company=$company_name;
        } else {
            $company=$companys;
        }
        $result= Db::query("
SELECT date_format(complete_date,'%y-%m') AS year,supervisor,helc_contract.project_name,COUNT(helc_product.product_id) AS sum,install_company 
FROM helc_product,helc_contract
WHERE helc_product.contract_id = helc_contract.contract_id AND install_company = '$company'AND complete_date BETWEEN '2019-04-01' AND '2020-03-31'
GROUP BY supervisor
ORDER BY year,sum

");

        // 向V层传数据
        $this->assign('result', $result);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    public function report(){
        $admin=Session::get('admin');
        $companys=Session::get('company');
        $fyear=Session::get('fyear');
        $BICompany=input('BICompany');
        Session::set('BICompany',$BICompany);
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        if($admin==0){
            $company=$companys;
        }
        $SQL01= Db::query("
SELECT name,company,intoforce,pre_intoforce,pre_sign,total FROM 
(SELECT IFNULL(name,'合计') AS name,company,SUM(intoforce) AS intoforce,SUM(pre_intoforce) AS pre_intoforce,SUM(pre_sign) AS pre_sign,SUM(total) AS total FROM
(SELECT name,company,status,intoforce,pre_intoforce,IFNULL(pre_sign,0) AS pre_sign,intoforce+pre_intoforce+IFNULL(pre_sign,0) AS total FROM 
(SELECT name,company,status,intoforce,IFNULL(pre_intoforce,0) AS pre_intoforce FROM 
(SELECT name,company,status,IFNULL(intoforce,0) AS intoforce FROM
(SELECT name,company,status
FROM helc_responsible
WHERE position='营业员') AS A
LEFT JOIN
(SELECT sales_person,COUNT(product_id) AS intoforce
FROM helc_product
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY sales_person) AS B
ON A.name=B.sales_person) AS C 
LEFT JOIN
(SELECT sales_person,COUNT(product_id) AS pre_intoforce
FROM helc_product
WHERE if_into_force='否' AND sd_status = '正常'
GROUP BY sales_person) AS D
ON C.name=D.sales_person) AS G
LEFT JOIN
(SELECT sales_person,SUM(bid_num) AS pre_sign
FROM
(SELECT project_type,quote_id,customer_attributes,bid_num,helc_quote.project_name,quote_date,sales_person,city,win_bidding_date,branch_office
FROM helc_quote
WHERE win_biding = 1 AND sign_contract = 0 AND win_bidding_date BETWEEN '1990-01-01' AND NOW()
UNION
SELECT helc_quote.project_type,quote_id,customer_attributes,bid_num,helc_quote.project_name,quote_date,sales_person,city,win_bidding_date,branch_office
FROM helc_quote,helc_contract
WHERE helc_quote.contract_id=helc_contract.contract_id AND  sign_contract = 1 AND win_bidding_date BETWEEN '1990-01-01' AND NOW() AND helc_contract.courier_date='0000-00-00') AS F
GROUP BY sales_person) AS E
ON G.name=E.sales_person) AS H
WHERE company='$BICompany' AND total>0
GROUP BY name WITH ROLLUP) AS I
ORDER BY total
");
        $this->assign('SQL01', $SQL01);
        $this->display();
        return $this->fetch();
    }
    public function subcontract(){
// 获取查询信息
        $bu_name = Request::instance()->get('id');
        $pageSize = 35; // 每页显示5条数据
        $fyear=Session::get('fyear');
        // 实例化Teacher
        $Sdcompanyindex = new Sdcompanyindex;
        // 按条件查询数据并调用分页
        $sdcompanyindexs = $Sdcompanyindex
            ->where('year', 'like', '%' . $fyear . '%')
            ->order("field(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')")
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('sdcompanyindexs', $sdcompanyindexs);
        // 将数据返回给用户
        return $this->fetch();
    }

    /*API接口*/
    /**
     * 获取所有信息
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    function getSdCompanyInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('sdcompanyindex')
            ->where('fyear','=',$fyear)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    function getMainInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('sdcompanyindex')
            ->where('fyear','=',$fyear)
            ->where('company','=','合计')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    function getWarningInfo(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $data=Db::name('warning')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function getSdCompanyInfoByCompany(){
        $companys=Session::get('company');
        $month_index_company=Session::get('month_index_company');
        $fyear=Session::get('fyear');
        if($companys=='山东分公司'){
            $company=$month_index_company;
        }else{
            $company=$companys;
        }
        $fyear=Session::get('fyear');
        $data=Db::name('sdcompanyindex')
            ->where('fyear','=',$fyear)
            ->where('company','=',$company)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*生效台量按客户分类*/
    function intoforceByCustomerClassification(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $SqlJson=['
        company,
        sign_complete,
        big_customer,
        big_customer/sign_complete as big_customer_per,
        local_customer,
        local_customer/sign_complete as local_customer_per,
        distributor,
        distributor/sign_complete as distributor_per,
        general_contractor,
        general_contractor/sign_complete as general_contractor_per,
        sign_complete-big_customer-local_customer-distributor-general_contractor as ordinary_customer,
        (sign_complete-big_customer-local_customer-distributor-general_contractor)/sign_complete as ordinary_customer_per
        '];
        $data=Db::name('sdcompanyindex')
            ->field($SqlJson)
            ->where('fyear','=',$fyear)
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*新签台量按客户分类*/
    function newSignByCustomerClassification(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $SqlJson=['
        company,
        new_sign,
        big_customer_sign,
        big_customer_sign/new_sign as big_customer_sign_per,
        local_customer_sign,
        local_customer_sign/new_sign as local_customer_per,
        distributor_sign,
        distributor_sign/new_sign as distributor_per,
        general_contractor_sign,
        general_contractor_sign/new_sign as general_contractor_per,
        new_sign-big_customer_sign-local_customer_sign-distributor_sign-general_contractor_sign as ordinary_customer_sign,
        (new_sign-big_customer_sign-local_customer_sign-distributor_sign-general_contractor_sign)/new_sign as ordinary_customer_sign_per
        '];
        $data=Db::name('sdcompanyindex')
            ->field($SqlJson)
            ->where('fyear','=',$fyear)
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*新签台量平均层站*/
    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function newSignByAvgFloor(){
        //获取财年
        $fyear=Session::get('fyear');
        $fyear_start=Session::get('fyear_start');
        $fyear_end=Session::get('fyear_end');
        $SqlJson=['
        company,
        new_sign_avg_floor,
        new_sign_avg_equipment_price,
        new_sign_avg_install_price
        '];
        $data=Db::name('sdcompanyindex')
            ->field($SqlJson)
            ->where('fyear','=',$fyear)
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
}
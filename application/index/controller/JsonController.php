<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Arrears;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
class JsonController extends IndexController{
    /**
     * 生效类
     */
    //1、主要指标完成进度
    function mainindex(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $sqldata= Db::query("/** @lang text */
 SELECT '财年进度' AS 'name',year_pass AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '生效' AS 'name',sign_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '发货' AS 'name',delivery_rate*100 AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '完工' AS 'name',install_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '当年欠款-设备' AS 'name',eq_thisyear_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '当年欠款-安装' AS 'name',in_thisyear_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '历史欠款-设备' AS 'name',eq_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '历史欠款-安装' AS 'name',in_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '设备入金' AS 'name',eq_income_rate*100 AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
UNION ALL
SELECT '安装入金' AS 'name',in_income_rate*100 AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='合计'
ORDER BY FIELD(name,'安装入金','设备入金','历史欠款-安装','历史欠款-设备','当年欠款-安装','当年欠款-设备','完工','发货','生效','财年进度')
            ");
        $JsonData=array();
        for ($i=0; $i < count($sqldata) ; $i++) {
            $JsonData[$i]['name']=$sqldata[$i]['name'];
            $JsonData[$i]['value']=$sqldata[$i]['value'];
        }
        $sqldata_json=json_encode($JsonData);
        echo  $sqldata_json;
    }
    //2、各区域设备及安装均价对比
    function averageprice(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $MySql= Db::query("/** @lang text */
        SELECT SUBSTR(helc_product.belong_to,1,2) AS name, ROUND(SUM(helc_product.contract_equipment_price)/COUNT(helc_product.product_id)/1000,2) AS value1,ROUND(SUM(helc_product.contract_installation_price)/COUNT(helc_product.product_id)/1000,2) AS value2
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id AND helc_product.into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND helc_contract.if_check='否'
GROUP BY belong_to 
ORDER BY field(name,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽')
");
        for ($i=0; $i < count($MySql) ; $i++) {
            $SqlData[$i]['name']=$MySql[$i]['name'];
            $SqlData[$i]['value1']=$MySql[$i]['value1'];
            $SqlData[$i]['value2']=$MySql[$i]['value2'];
        }
        $SqlJson=json_encode($SqlData);
        echo  $SqlJson;
    }
    //3、销售趋势
    function sales_trend(){
        $sqldata= Db::query("/** @lang text */
SELECT fyear,complete FROM(SELECT fyear,ROUND(complete/1000,3) AS complete FROM helc_achievement 
ORDER BY fyear DESC
LIMIT 10) AS A
ORDER BY fyear
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['fyear']=$sqldata[$i]['fyear'];
            $sqldata1[$i]['complete']=$sqldata[$i]['complete'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //4、区域生效/待生效/待签数据
    function intoforce_data(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	SUBSTR( company, 1, 2 ) AS company,
	sign_complete,
	pre_intoforce,
	pre_sign,
	sign_index
FROM
	`helc_sdcompanyindex` 
WHERE
	company <> '合计' 
	AND fyear = '$fyear' 
ORDER BY
	field(
		SUBSTR( company, 1, 2 ),
		'青岛',
		'济南',
		'潍坊',
		'烟台',
		'临沂',
		'济宁',
		'东营',
		'德州',
	  '菏泽' 
	) DESC
");
        $Json_Data = array();
        for ($i=0; $i < count($sqldata) ; $i++) {
            $Json_Data[$i]['company']=$sqldata[$i]['company'];
            $Json_Data[$i]['sign_complete']=$sqldata[$i]['sign_complete'];
            $Json_Data[$i]['pre_intoforce']=$sqldata[$i]['pre_intoforce'];
            $Json_Data[$i]['pre_sign']=$sqldata[$i]['pre_sign'];
            $Json_Data[$i]['sign_index']=$sqldata[$i]['sign_index'];
        }
        $sqldata_json=json_encode($Json_Data);
        echo  $sqldata_json;
    }
    //4、16地市生效/待生效/待签数据
    function cityIntoForceData(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	SUBSTR( city, 1, 2 ) AS city,
	into_force_complete,
	pre_into_force,
	pre_sign,
    same_term_into_force
FROM
	`helc_city_index` 
WHERE
	 fyear = '$fyear'
ORDER BY
	field(
		SUBSTR( city, 1, 2 ),
		'青岛',
		'日照',
		'济南',
		'潍坊',
		'淄博',
		'烟台',
		'威海',
		'临沂',
		'泰安',
		'济宁',
		'枣庄',
		'东营',
		'滨州',
		'德州',
		'聊城',
	  '菏泽' 
	) DESC
");
        $Json_Data = array();
        for ($i=0; $i < count($sqldata) ; $i++) {
            $Json_Data[$i]['city']=$sqldata[$i]['city'];
            $Json_Data[$i]['into_force_complete']=$sqldata[$i]['into_force_complete'];
            $Json_Data[$i]['pre_into_force']=$sqldata[$i]['pre_into_force'];
            $Json_Data[$i]['pre_sign']=$sqldata[$i]['pre_sign'];
            $Json_Data[$i]['same_term_into_force']=$sqldata[$i]['same_term_into_force'];
        }
        $sqldata_json=json_encode($Json_Data);
        echo  $sqldata_json;
    }
    //5、本财年与上财年生效台量按月对比(K台)
    function intoforce_compare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT monthly,IFNULL(monthly1,'') AS monthly1,lastyear,IFNULL(thisyear,'0') AS thisyear FROM
(SELECT date_format(into_force_date, '%Y-%m') AS monthly,MONTH(into_force_date) AS month1,ROUND(COUNT(product_id)/1000,3) AS lastyear 
FROM  helc_product
WHERE into_force_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(into_force_date, '%Y-%m') AS monthly1,MONTH(into_force_date) AS month2,ROUND(COUNT(product_id)/1000,3) AS thisyear 
FROM  helc_product
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['monthly']=$sqldata[$i]['monthly'];
            $sqldata1[$i]['monthly1']=$sqldata[$i]['monthly1'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //5、本财年与上财年生效台量按月累计对比(K台)
    function intoforce_sum_compare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqlData= Db::query("/** @lang text */
SELECT 
last_year_month,
IFNULL(last_year_monthly,'') AS last_year_monthly,
last_year_consumed,
last_year_sum_consumed,
IFNULL(this_year_monthly,'') AS this_year_monthly,
this_year_consumed,
this_year_sum_consumed AS this_year_sum_consumed
FROM 
(SELECT last_year_month,last_year_monthly,last_year_consumed,(@csum:=@csum+last_year_consumed) AS last_year_sum_consumed
FROM
(SELECT
	MONTH(into_force_date) AS last_year_month,
	date_format(into_force_date, '%Y-%m') AS last_year_monthly,
	ROUND(COUNT(product_id)/1000,3) AS last_year_consumed
FROM
	helc_product
WHERE 
	into_force_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
	AND `status`='正常'
	AND `sd_status`='正常'
GROUP BY
	last_year_monthly) AS A,(SELECT @csum:=0) AS it) AS B
LEFT JOIN
(SELECT this_year_month,this_year_monthly,this_year_consumed,(@this_year_csum:=@this_year_csum+this_year_consumed) AS this_year_sum_consumed
FROM
(SELECT
	MONTH(into_force_date) AS this_year_month,
	date_format(into_force_date, '%Y-%m') AS this_year_monthly,
	ROUND(COUNT(product_id)/1000,3) AS this_year_consumed
FROM
	helc_product
WHERE 
	into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND `status`='正常'
	AND `sd_status`='正常'
GROUP BY
	this_year_monthly) AS A,(SELECT @this_year_csum:=0) AS it) AS C
	ON B.last_year_month=C.this_year_month
ORDER BY FIELD(last_year_month,4,5,6,7,8,9,10,11,12,1,2,3)
");
        $sqldata_json=json_encode($sqlData);
        echo  $sqldata_json;
    }
    //6、总公司大客户本财年生效情况(台)
    function key_account(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
            SELECT
                helc_contract.customer_abbreviation AS name,
                COUNT( helc_product.product_id ) AS value
            FROM
                helc_product,
                helc_contract 
            WHERE
                helc_product.contract_id = helc_contract.contract_id 
                AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
                AND helc_contract.customer_classification = 'KA客户' 
                AND helc_contract.contract_id LIKE 'A%' 
            GROUP BY name 
            ORDER BY value DESC 
                LIMIT 10
        ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、本地大客户本财年生效情况(台)
    function local_account(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT helc_contract.customer_abbreviation AS name,COUNT(helc_product.product_id) AS value
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND helc_contract.customer_classification='本地大客户' AND helc_contract.contract_id LIKE 'A%'
GROUP BY name ORDER by value DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、经销商客户本财年生效情况(台)
    function distributor(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	helc_contract.customer_abbreviation AS name,
	COUNT( helc_product.product_id ) AS value
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_product.into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND helc_contract.customer_classification = '经销商' 
	AND helc_contract.contract_id LIKE 'A%' 
GROUP BY NAME 
ORDER BY VALUE DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、总包客户本财年生效情况(台)
    function general_contractor(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	helc_contract.customer_abbreviation AS name,
	COUNT( helc_product.product_id ) AS value
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_product.into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND helc_contract.customer_classification = '总包' 
	AND helc_contract.contract_id LIKE 'A%' 
GROUP BY NAME 
ORDER BY VALUE DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    /**
     * 报价及新签类
     */
    //8、本财年与上财年报价按月对比(K台)
    function quote_compare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(quote_date, '%Y-%m') AS monthly,MONTH(quote_date) AS month1,ROUND(SUM(quote_num)/1000,2) AS lastyear 
FROM  helc_quote
WHERE quote_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(quote_date, '%Y-%m') AS monthly1,MONTH(quote_date) AS month2,ROUND(SUM(quote_num)/1000,2) AS thisyear 
FROM  helc_quote
WHERE quote_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['monthly']=$sqldata[$i]['monthly'];
            $sqldata1[$i]['monthly1']=$sqldata[$i]['monthly1'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //8、本财年与上财年中标台量按月对比(K台)
    function winBidCompare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(win_bidding_date, '%Y-%m') AS monthly,MONTH(win_bidding_date) AS month1,ROUND(SUM(bid_num)/1000,2) AS lastyear 
FROM  helc_quote
WHERE win_bidding_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(win_bidding_date, '%Y-%m') AS monthly1,MONTH(win_bidding_date) AS month2,ROUND(SUM(bid_num)/1000,2) AS thisyear 
FROM  helc_quote
WHERE win_bidding_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        echo  json_encode($jsonData);
    }
    //9、本财年与上财年新签电梯按月对比(K台)
    function new_contract(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM(SELECT date_format(both_seal_date, '%Y-%m') AS monthly,MONTH(both_seal_date) AS month1,ROUND(SUM(contract_num)/1000,3) AS lastyear FROM  helc_contract
WHERE both_seal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(both_seal_date, '%Y-%m') AS monthly1,MONTH(both_seal_date) AS month2,ROUND(SUM(contract_num)/1000,3) AS thisyear FROM  helc_contract
WHERE both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['monthly']=$sqldata[$i]['monthly'];
            $sqldata1[$i]['monthly1']=$sqldata[$i]['monthly1'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //6、总公司大客户本财年新签情况(台)
    function key_account_new_sign(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT helc_contract.customer_abbreviation AS name,COUNT(helc_product.product_id) AS value
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' AND helc_contract.customer_classification='KA客户' AND helc_contract.contract_id LIKE 'A%'
GROUP BY name ORDER by value DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、本地大客户本财年新签情况(台)
    function local_account_new_sign(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	helc_contract.customer_abbreviation AS name,
	COUNT( helc_product.product_id ) AS value
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND helc_contract.customer_classification = '本地大客户' 
	AND helc_contract.contract_id LIKE 'A%' 
GROUP BY name
ORDER BY value DESC 
	LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、经销商客户本财年新签情况(台)
    function distributor_new_sign(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	helc_contract.customer_abbreviation AS name,
	COUNT( helc_product.product_id ) AS value
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND helc_contract.customer_classification = '经销商' 
	AND helc_contract.contract_id LIKE 'A%' 
GROUP BY NAME 
ORDER BY VALUE DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、总包客户本财年新签情况(台)
    function general_contractor_new_sign(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT
	helc_contract.customer_abbreviation AS name,
	COUNT( helc_product.product_id ) AS value
FROM
	helc_product,
	helc_contract 
WHERE
	helc_product.contract_id = helc_contract.contract_id 
	AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' 
	AND helc_contract.customer_classification = '总包' 
	AND helc_contract.contract_id LIKE 'A%' 
GROUP BY NAME 
ORDER BY VALUE DESC LIMIT 10
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //10、16地市本财年与上财年新签电梯对比(台)
    function city_new_contract(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
 SELECT area,company_short,lastyear,IFNULL(thisyear,0) AS thisyear FROM (SELECT helc_contract.area,helc_city.company_short,SUM(contract_num)*-1 AS lastyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
GROUP BY helc_contract.area) AS A
LEFT JOIN 
(SELECT helc_contract.area AS area1,helc_city.company_short AS company_short1,SUM(contract_num) AS thisyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND NOW()
GROUP BY helc_contract.area) AS B
ON A.area = B.area1
ORDER BY company_short,thisyear
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['area']=$sqldata[$i]['area'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    function city_new_contract_total(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
 SELECT '山东司' AS area,SUM(lastyear) AS lastyear,IFNULL(SUM(thisyear),0) AS thisyear FROM (SELECT helc_contract.area,helc_city.company_short,SUM(contract_num)*-1 AS lastyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
GROUP BY helc_contract.area) AS A
LEFT JOIN 
(SELECT helc_contract.area AS area1,helc_city.company_short AS company_short1,SUM(contract_num) AS thisyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND NOW()
GROUP BY helc_contract.area) AS B
ON A.area = B.area1
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['area']=$sqldata[$i]['area'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    /**
     * 收款类
     */
    //  设备入金按月汇总
    function equipmentIncomeByMonth(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
         SELECT
            SUBSTRING( company, 1, 2 ) AS company,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '4' THEN fix_split_amount ELSE 0 END )/1000,2) AS month4,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '5' THEN fix_split_amount ELSE 0 END )/1000,2) AS month5,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '6' THEN fix_split_amount ELSE 0 END )/1000,2) AS month6,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '7' THEN fix_split_amount ELSE 0 END )/1000,2) AS month7,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '8' THEN fix_split_amount ELSE 0 END )/1000,2) AS month8,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '9' THEN fix_split_amount ELSE 0 END )/1000,2) AS month9,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '10' THEN fix_split_amount ELSE 0 END )/1000,2) AS month10,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '11' THEN fix_split_amount ELSE 0 END )/1000,2) AS month11,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '12' THEN fix_split_amount ELSE 0 END )/1000,2) AS month12,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '1' THEN fix_split_amount ELSE 0 END )/1000,2) AS month1,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '2' THEN fix_split_amount ELSE 0 END )/1000,2) AS month2,
            ROUND(sum( CASE MONTH ( income_date ) WHEN '3' THEN fix_split_amount ELSE 0 END )/1000,2) AS month3,
            ROUND(sum( fix_split_amount ),2) AS total 
         FROM
            helc_equipment_income 
         WHERE
            fix_split_amount > 0
            AND company IN('青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')
            AND income_date BETWEEN '$fyear_start' AND '$fyear_end' 
         GROUP BY
            company 
         ORDER BY field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')         DESC
         ");
        echo  json_encode($jsonData);
    }
    //  安装入金按月汇总
    function installIncomeByMonth(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
         SELECT
            SUBSTRING( company, 1, 2 ) AS company,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '4' THEN split_amount ELSE 0 END )/1000,2) AS month4,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '5' THEN split_amount ELSE 0 END )/1000,2) AS month5,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '6' THEN split_amount ELSE 0 END )/1000,2) AS month6,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '7' THEN split_amount ELSE 0 END )/1000,2) AS month7,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '8' THEN split_amount ELSE 0 END )/1000,2) AS month8,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '9' THEN split_amount ELSE 0 END )/1000,2) AS month9,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '10' THEN split_amount ELSE 0 END )/1000,2) AS month10,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '11' THEN split_amount ELSE 0 END )/1000,2) AS month11,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '12' THEN split_amount ELSE 0 END )/1000,2) AS month12,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '1' THEN split_amount ELSE 0 END )/1000,2) AS month1,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '2' THEN split_amount ELSE 0 END )/1000,2) AS month2,
            ROUND(sum( CASE MONTH ( split_date ) WHEN '3' THEN split_amount ELSE 0 END )/1000,2) AS month3,
            sum( split_date ) AS total 
         FROM
            helc_install_income 
         WHERE
            split_amount > 0
            AND company IN('青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')
            AND split_date BETWEEN '$fyear_start' AND '$fyear_end' 
         GROUP BY
            company 
         ORDER BY field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')         DESC
         ");
        echo  json_encode($jsonData);
    }
    //国房景气指数
    function realEstateBoomIndex(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $keys = [
            'closing_date'=>'name',
            'prosperity_index'=>'value',
            'reference_value'
        ];
        $data=Db::name('reci')
            ->field($keys)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //待生效台量趋势
    function preIntoForceTrend(){
        $jsonData= Db::query("/** @lang text */
SELECT
	record_date,
	SUM(sale_total) AS sale_total
FROM
	helc_monthly_company
WHERE record_date BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 YEAR) AND CURDATE()
GROUP BY record_date
            ");
        $SqlJson=json_encode($jsonData);
        echo  $SqlJson;
    }
    //11、本财年与上财年总欠款按月对比(亿元)
    function arrearscompare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	C.last_date,
	ROUND(C.lastyear/1000,2) AS lastyear,
	F.this_date,
	ROUND(F.thisyear/1000,2) AS thisyear
FROM
(SELECT
	last_date,
	last_month_install,
	lastyear_install,
	lastyear_equipment,
	lastyear_install + lastyear_equipment AS lastyear 
FROM
	(
	SELECT
		date_format( comprehensive_month, '%Y-%m' ) AS last_date,
		MONTH ( comprehensive_month ) AS last_month_install,
		SUM( expire_arrears ) AS lastyear_install 
	FROM
		helc_installarrears 
	WHERE
		fyear = '$last_fyear' 
	GROUP BY
		comprehensive_month 
	) AS A
	LEFT JOIN ( 
		SELECT 
			MONTH( comprehensive_month ) AS last_month_equipment,
			SUM( expire_arrears ) AS lastyear_equipment 
		FROM
			helc_equipmentarrears 
		WHERE
			fyear = '$last_fyear' 
		GROUP BY
			comprehensive_month
) AS B ON A.last_month_install = B.last_month_equipment) AS C
LEFT JOIN
(SELECT
	this_date,
	this_month_install,
	thisyear_install,
	thisyear_equipment,
	thisyear_install + thisyear_equipment AS thisyear 
FROM
	(
	SELECT
		date_format( comprehensive_month, '%Y-%m' ) AS this_date,
		MONTH ( comprehensive_month ) AS this_month_install,
		SUM( expire_arrears ) AS thisyear_install 
	FROM
		helc_installarrears 
	WHERE
		fyear = '$fyear' 
	GROUP BY
		comprehensive_month 
	) AS D
	LEFT JOIN ( 
		SELECT 
			MONTH( comprehensive_month ) AS this_month_equipment,
			SUM( expire_arrears ) AS thisyear_equipment 
		FROM
			helc_equipmentarrears 
		WHERE
			fyear = '$fyear' 
		GROUP BY
			comprehensive_month
) AS E ON D.this_month_install = E.this_month_equipment) AS F
ON C.last_month_install=F.this_month_install
            ");
        echo  json_encode($jsonData);
    }
    //12、安装欠款账龄结构

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function install_account_age(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
            SELECT
                account_age_year AS `name`,
                ROUND(SUM(expire_arrears)/1000,0) AS `value`
            FROM
                `helc_install_arrears`
            WHERE 
            active_status=1
            AND assessment=1
            GROUP BY name
            ORDER BY field(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上');
         ");
        echo  json_encode($jsonData);
/*        $keys = [
            'account_age_year'=>'name',
            'ROUND(SUM(expire_arrears)/1000,0)'=>'value'
        ];
        $data=Db::name('install_arrears')
            ->field($keys)
            ->where('active_status','=','1')
            ->group('name')
            ->order("field(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;*/
    }
    //13、设备欠款账龄结构

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function eq_account_age(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
            SELECT
                account_age_year AS `name`,
                ROUND(SUM(expire_arrears)/1000,0) AS `value`
            FROM
                `helc_equipment_arrears`
            WHERE 
            active_status=1
            AND assessment=1
            GROUP BY name
            ORDER BY field(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上');
         ");
        echo  json_encode($jsonData);
      /* $keys = [
           'account_age_year'=>'name',
           'ROUND(SUM(expire_arrears)/1000,0)'=>'value'
       ];
        $data=Db::name('equipment_arrears')
            ->field($keys)
            ->where('active_status','=','1')
            ->group('name')
            ->order("field(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;*/
    }
    //12、安装欠款客户类型

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    function installArrearsCustomer(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $keys = [
            'customer_classification'=>'name',
            'ROUND(SUM(expire_arrears)/1000,0)'=>'value'
        ];
        $data=Db::name('install_arrears')
            ->field($keys)
            ->where('active_status','=','1')
            ->group('name')
            ->order("field(name,'普通客户','KA客户','本地大客户','经销商')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //13、设备欠款客户类型

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    function equipmentArrearsCustomer(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $keys = [
            'customer_classification'=>'name',
            'ROUND(SUM(expire_arrears)/1000,0)'=>'value'
        ];
        $data=Db::name('equipment_arrears')
            ->field($keys)
            ->where('active_status','=','1')
            ->group('name')
            ->order("field(name,'普通客户','KA客户','本地大客户','经销商')")
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //14、各区域房地产投资累计金额对比(亿元)
    function real_estate(){
        $data= Db::query("/** @lang text */
        SELECT company AS name,SUM(add_up) AS value 
        FROM(SELECT city,update_date,add_up,SUBSTR(company,1,2) as company 
        FROM (SELECT MAX(update_date) AS max FROM helc_real_estate) as A,helc_real_estate
        WHERE helc_real_estate.update_date=A.max) AS B
        GROUP BY company ORDER by value DESC
");

        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //15、山东省土地成交面积同期对比(包括住宅、商业、公建用地-单位万㎡)
    function land_area(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $data= Db::query("/** @lang text */
SELECT monthly,lastyear,IFNULL(thisyear,0) AS thisyear FROM(SELECT date_format(deal_date, '%Y-%m') AS monthly,MONTH(deal_date) AS month,ROUND(SUM(land_area)/10000,2) AS lastyear FROM  helc_land
WHERE deal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND land_type<>'其它'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(deal_date, '%Y-%m') AS monthly1,MONTH(deal_date) AS month1,ROUND(SUM(land_area)/10000,2) AS thisyear FROM  helc_land
WHERE deal_date BETWEEN '$fyear_start' AND '$fyear_end' AND land_type<>'其它'
GROUP BY monthly1) AS B
ON A.month=B.month1
");
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //16、16地市本财年与上财年土地成交宗数对比(宗)
    function city_land_case(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT E.city,helc_city.company_short,E.lastyear,IFNULL(E.thisyear,0) AS thisyear
FROM helc_city,
(SELECT city,lastyear,thisyear FROM (SELECT city,COUNT(city)*-1 AS lastyear 
FROM(SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)) AS A
GROUP BY city) AS B
LEFT JOIN
(SELECT city AS city1,COUNT(city) AS thisyear 
FROM(SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$fyear_start' AND NOW()
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$fyear_start' AND NOW()
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$fyear_start' AND NOW()) AS C
GROUP BY city) AS D
ON B.city=D.city1) AS E
WHERE helc_city.city_short=E.city ORDER BY company_short,thisyear
            ");
        $JsonData=array();
        for ($i=0; $i < count($sqldata) ; $i++) {
            $JsonData[$i]['city']=$sqldata[$i]['city'];
            $JsonData[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $JsonData[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($JsonData);
        echo  $sqldata_json;
    }
    //16、16地市本财年与上财年土地成交宗数对比(宗)
    function city_land_plan_area(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT E.city,helc_city.company_short,E.lastyear,IFNULL(E.thisyear,0) AS thisyear
FROM helc_city,
(SELECT city,lastyear,thisyear FROM (SELECT city,ROUND(SUM(plan_area)*-1/10000,2) AS lastyear 
FROM(SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
UNION ALL
SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)
UNION ALL
SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$last_fyear_start' AND date_sub(now(),interval 365 day)) AS A
GROUP BY city) AS B
LEFT JOIN
(SELECT city AS city1,ROUND(SUM(plan_area)/10000,2) AS thisyear 
FROM(SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$fyear_start' AND NOW()
UNION ALL
SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$fyear_start' AND NOW()
UNION ALL
SELECT id,city,plan_area,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$fyear_start' AND NOW()) AS C
GROUP BY city) AS D
ON B.city=D.city1) AS E
WHERE helc_city.city_short=E.city ORDER BY company_short,thisyear
            ");
        $JsonData=array();
        for ($i=0; $i < count($sqldata) ; $i++) {
            $JsonData[$i]['city']=$sqldata[$i]['city'];
            $JsonData[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $JsonData[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($JsonData);
        echo  $sqldata_json;
    }
    //17、山东省房地产新开工施工面积累计值同期对比(万㎡)
    function newarea(){
        //新开工施工面积
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("/** @lang text */
SELECT CONCAT(month1,\"月\") AS month,lastyear,thisyear FROM(SELECT month AS month1,estate_new_area AS lastyear FROM `helc_estate`
WHERE year='$last_fyear') AS A
LEFT JOIN
(SELECT month AS month2,estate_new_area AS thisyear FROM `helc_estate`
WHERE year='$fyear') AS B
ON A.month1=B.month2
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['month']=$sqldata[$i]['month'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //18、山东省房地产竣工面积累计值同期对比(万㎡)
    function complete_area(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT CONCAT(month1,\"月\") AS month,lastyear,thisyear FROM(SELECT month AS month1,estate_complete_area AS lastyear FROM `helc_estate`
WHERE year='$last_fyear') AS A
LEFT JOIN
(SELECT month AS month2,estate_complete_area AS thisyear FROM `helc_estate`
WHERE year='$fyear') AS B
ON A.month1=B.month2
            ");
        echo  json_encode($jsonData);
    }
    //19、本财年与上财年发货台量按月对比(K台)
    function delivery(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(report_delivery_date, '%Y-%m') AS monthly,MONTH(report_delivery_date) AS month1,ROUND(COUNT(product_id)/1000,3) AS lastyear 
FROM  helc_delivery
WHERE report_delivery_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(report_delivery_date, '%Y-%m') AS monthly1,MONTH(report_delivery_date) AS month2,ROUND(COUNT(product_id)/1000,3) AS thisyear 
FROM  helc_delivery
WHERE report_delivery_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        echo json_encode($jsonData);
    }
    //20、每月完工情况
    public function install_complete(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT CONCAT(fmonth,\"月\") AS fmonth,SUM(install_index) AS install_index,IFNULL(SUM(install_complete),0) AS install_complete 
FROM helc_month_sd
WHERE fyear=$fyear
GROUP BY fmonth
ORDER BY FIELD(fmonth,4,5,6,7,8,9,10,11,12,1,2,3)
");
        echo json_encode($jsonData);
    }
    //21.事业部生效TOP15
    public function buIntoForceTop15(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	SUBSTR(into_force_bu,1,CHAR_LENGTH(into_force_bu)-3) AS into_force_bu,
	COUNT(product_id) AS into_force_sum
FROM
	helc_product 
WHERE
	into_force_date BETWEEN '$fyear_start' AND '$fyear_end'
    AND into_force_bu<>'邹承帅事业部'
GROUP BY
	into_force_bu
ORDER BY into_force_sum DESC
LIMIT 10
");
        echo json_encode($jsonData);
    }
    //KA客户安装1年以上欠款TOP10按月汇总
    function key_account_install_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_install_arrears 
WHERE
	comprehensive_month BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='FGS_SHANDONG'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('KA客户')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //KA客户设备1年以上欠款TOP10按月汇总
    function key_account_equipment_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_equipment_arrears 
WHERE
	closing_date BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='HELC_OU'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('KA客户')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //本地大客户安装1年以上欠款TOP10按月汇总
    function local_account_install_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_install_arrears 
WHERE
	comprehensive_month BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='FGS_SHANDONG'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('本地大客户')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //本地大客户设备1年以上欠款TOP10按月汇总
    function local_account_equipment_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_equipment_arrears 
WHERE
	closing_date BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='HELC_OU'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('本地大客户')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //总包安装1年以上欠款TOP10按月汇总
    function contractor_account_install_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $monthOrder='month_6';
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_install_arrears 
WHERE
	comprehensive_month BETWEEN  '$fyear_start' AND '$fyear_end'
	AND business_entity='FGS_SHANDONG'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('总包')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //总包设备1年以上欠款TOP10按月汇总
    function contractor_account_equipment_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	customer_abbreviation,
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_equipment_arrears 
WHERE
	closing_date BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='HELC_OU'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('总包')
GROUP BY
	customer_abbreviation 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //普通客户安装1年以上欠款TOP10按月汇总
    function pt_account_install_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	clause_customer,
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( comprehensive_month ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_install_arrears 
WHERE
	comprehensive_month BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='FGS_SHANDONG'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('普通客户')
GROUP BY
	clause_customer 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
    //普通客户设备1年以上欠款TOP10按月汇总
    function pt_account_equipment_top10(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $month_now = Session::get('month_now');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $jsonData= Db::query("/** @lang text */
SELECT
	clause_customer,
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '4' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_4',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '5' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_5',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '6' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_6',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '7' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_7',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '8' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_8',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '9' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_9',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '10' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_10',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '11' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_11',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '12' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_12',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '1' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_1',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '2' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_2',
	ROUND( sum( CASE MONTH ( closing_date ) WHEN '3' THEN expire_arrears ELSE 0 END ) / 1000, 0 ) AS 'month_3' 
FROM
	helc_equipment_arrears 
WHERE
	closing_date BETWEEN '$fyear_start' AND '$fyear_end'
	AND business_entity='HELC_OU'
	AND acceptable NOT IN('不可收')
	AND account_age_year IN('1年-2年', '2年-3年', '3年以上')
	AND customer_classification IN('普通客户')
GROUP BY
	clause_customer 
ORDER BY
	month_6 DESC
LIMIT 10
         ");
        echo  json_encode($jsonData);
    }
}
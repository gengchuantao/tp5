<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class CompanyController extends IndexController{
    //1、主要指标完成进度
    function mainindex(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $BICompany=Session::get('BICompany');
        $SQLData= Db::query("
 SELECT '财年进度' AS 'name',year_pass AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '生效' AS 'name',sign_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '完工' AS 'name',install_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '当年欠款-设备' AS 'name',eq_thisyear_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '当年欠款-安装' AS 'name',in_thisyear_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '历史欠款-设备' AS 'name',eq_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
UNION ALL
SELECT '历史欠款-安装' AS 'name',in_rate AS 'value' FROM `helc_sdcompanyindex`
WHERE year=$fyear AND company='$BICompany'
            ");
        for ($i=0; $i < count($SQLData) ; $i++){
            $JsonData[$i]['name']=$SQLData[$i]['name'];
            $JsonData[$i]['value']=$SQLData[$i]['value'];
        }
        $SQLDataJson=json_encode($JsonData);
        echo  $SQLDataJson;
    }
    //5、本财年与上财年生效台量按月对比(K台)
    function CompanyIntoforceCompare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(into_force_date, '%Y-%m') AS monthly,MONTH(into_force_date) AS month1,ROUND(COUNT(product_id)/1000,3) AS lastyear 
FROM  helc_product
WHERE into_force_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND belong_to='$BICompany'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(into_force_date, '%Y-%m') AS monthly1,MONTH(into_force_date) AS month2,ROUND(COUNT(product_id)/1000,3) AS thisyear 
FROM  helc_product
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND belong_to='$BICompany'
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
    //6、总公司大客户本财年生效情况(台)
    function CompanyKeyAccount(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT helc_contract.big_client_short AS name,COUNT(helc_product.product_id) AS value
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id AND belong_to ='$BICompany' AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND helc_contract.client_attributes='大客户' AND helc_contract.contract_id LIKE 'A%'
GROUP BY name ORDER by value DESC
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //7、本地大客户本财年生效情况(台)
    function CompanyLocalAccount(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT helc_contract.local_customer_short AS name,COUNT(helc_product.product_id) AS value
FROM helc_product,helc_contract
WHERE helc_product.contract_id=helc_contract.contract_id AND belong_to = '$BICompany' AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND helc_contract.local_customer_short<>'' AND helc_contract.contract_id LIKE 'A%'
GROUP BY name ORDER by value DESC
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //8、本财年与上财年报价按月对比(K台)
    function CompanyQuoteCompare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(quote_date, '%Y-%m') AS monthly,MONTH(quote_date) AS month1,ROUND(SUM(quote_num)/1000,2) AS lastyear 
FROM  helc_quote
WHERE quote_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND branch_office = '$BICompany'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(quote_date, '%Y-%m') AS monthly1,MONTH(quote_date) AS month2,ROUND(SUM(quote_num)/1000,2) AS thisyear 
FROM  helc_quote
WHERE branch_office = '$BICompany' AND quote_date BETWEEN '$fyear_start' AND '$fyear_end' 
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
    //9、本财年与上财年新签电梯按月对比(K台)
    function CompanyNewContract(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM(SELECT date_format(both_seal_date, '%Y-%m') AS monthly,MONTH(both_seal_date) AS month1,ROUND(SUM(contract_num)/1000,3) AS lastyear 
FROM  helc_contract
WHERE both_seal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND branch='$BICompany'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(both_seal_date, '%Y-%m') AS monthly1,MONTH(both_seal_date) AS month2,ROUND(SUM(contract_num)/1000,3) AS thisyear 
FROM  helc_contract
WHERE both_seal_date BETWEEN '$fyear_start' AND '$fyear_end' AND branch='$BICompany'
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
    //10、16地市本财年与上财年新签电梯对比(台)
    function city_new_contract(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("
 SELECT area,company_short,lastyear,IFNULL(thisyear,0) AS thisyear FROM (SELECT helc_contract.area,helc_city.company_short,SUM(contract_num)*-1 AS lastyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
GROUP BY helc_contract.area) AS A
LEFT JOIN 
(SELECT helc_contract.area AS area1,helc_city.company_short AS company_short1,SUM(contract_num) AS thisyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end'
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
        $sqldata= Db::query("
 SELECT '山东司' AS area,SUM(lastyear) AS lastyear,IFNULL(SUM(thisyear),0) AS thisyear FROM (SELECT helc_contract.area,helc_city.company_short,SUM(contract_num)*-1 AS lastyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
GROUP BY helc_contract.area) AS A
LEFT JOIN 
(SELECT helc_contract.area AS area1,helc_city.company_short AS company_short1,SUM(contract_num) AS thisyear
FROM helc_contract,helc_city
WHERE helc_contract.area=helc_city.city AND helc_contract.both_seal_date BETWEEN '$fyear_start' AND '$fyear_end'
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
    //11、本财年与上财年总欠款按月对比(亿元)
    function arrearscompare(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("
 SELECT date_format(last_date,'%Y-%m') AS last_date,lastyear,date_format(this_date,'%Y-%m') AS this_date,thisyear
FROM(SELECT arrears_date AS last_date,total_arrears AS lastyear FROM `helc_month_arrears`
WHERE fyear='$last_fyear') AS A 
LEFT JOIN
(SELECT arrears_date AS this_date,total_arrears AS thisyear FROM `helc_month_arrears`
WHERE fyear='$fyear') AS B
ON MONTH(A.last_date)=MONTH(B.this_date)
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['last_date']=$sqldata[$i]['last_date'];
            $sqldata1[$i]['this_date']=$sqldata[$i]['this_date'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //12、安装欠款账龄结构
    function CompanyInstallAccountAge(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $SQLData= Db::query("
SELECT account_age AS name,ROUND(SUM(arrears_amount)/1000,0) AS value
FROM (SELECT account_age,ROUND(SUM(arrears_amount),0) AS arrears_amount FROM `helc_arrears`
WHERE company='$BICompany' AND arrears_amount-IFNULL(history_back,0)>0 AND arrears_type='安装欠款' AND expire_date>='$fyear_start'
GROUP BY account_age 
UNION 
SELECT account_age,ROUND(SUM(history_balance),0) AS arrears_amount FROM `helc_arrears`
WHERE company='$BICompany' AND arrears_amount-IFNULL(history_back,0)>0 AND arrears_type='安装欠款' AND expire_date<'$fyear_start'
GROUP BY account_age) AS A
GROUP BY account_age
ORDER BY FIELD(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上')
");
        for ($i=0; $i < count($SQLData) ; $i++) {
            $JsonData[$i]['value']=$SQLData[$i]['value'];
            $JsonData[$i]['name']=$SQLData[$i]['name'];
        }
        $SQLDataJson=json_encode($JsonData);
        echo  $SQLDataJson;
    }
    //13、设备欠款账龄结构
    function CompanyEqAccountAge(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $sqldata= Db::query("
SELECT account_age AS name,ROUND(SUM(arrears_amount)/1000,0) AS value
FROM (SELECT account_age,ROUND(SUM(arrears_amount),0) AS arrears_amount FROM `helc_arrears`
WHERE company='$BICompany' AND arrears_amount-IFNULL(history_back,0)>0 AND arrears_type='设备欠款' AND expire_date>='$fyear_start'
GROUP BY account_age 
UNION 
SELECT account_age,ROUND(SUM(history_balance),0) AS arrears_amount FROM `helc_arrears`
WHERE company='$BICompany' AND arrears_amount-IFNULL(history_back,0)>0 AND arrears_type='设备欠款' AND expire_date<'$fyear_start'
GROUP BY account_age) AS A
GROUP BY account_age
ORDER BY FIELD(name,'6个月以内','6个月-1年','1年-2年','2年-3年','3年以上')
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //14、各区域房地产投资累计金额对比(亿元)
    function real_estate(){
        $sqldata= Db::query("
        SELECT company AS name,SUM(add_up) AS value 
        FROM(SELECT city,update_date,add_up,SUBSTR(company,1,2) as company 
        FROM (SELECT MAX(update_date) AS max FROM helc_real_estate) as A,helc_real_estate
        WHERE helc_real_estate.update_date=A.max) AS B
        GROUP BY company ORDER by value DESC
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['value']=$sqldata[$i]['value'];
            $sqldata1[$i]['name']=$sqldata[$i]['name'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //15、山东省土地成交面积同期对比(包括住宅、商业、公建用地-单位万㎡)
    function land_area(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("
SELECT monthly,lastyear,IFNULL(thisyear,0) AS thisyear FROM(SELECT date_format(deal_date, '%Y-%m') AS monthly,MONTH(deal_date) AS month,ROUND(SUM(land_area)/10000,2) AS lastyear FROM  helc_land
WHERE deal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND land_type<>'其它'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(deal_date, '%Y-%m') AS monthly1,MONTH(deal_date) AS month1,ROUND(SUM(land_area)/10000,2) AS thisyear FROM  helc_land
WHERE deal_date BETWEEN '$fyear_start' AND '$fyear_end' AND land_type<>'其它'
GROUP BY monthly1) AS B
ON A.month=B.month1
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['monthly']=$sqldata[$i]['monthly'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //16、16地市本财年与上财年土地成交宗数对比(宗)
    function city_land_case(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("
SELECT E.city,helc_city.company_short,E.lastyear,IFNULL(E.thisyear,0) AS thisyear
FROM helc_city,
(SELECT city,lastyear,thisyear FROM (SELECT city,COUNT(city)*-1 AS lastyear 
FROM(SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$last_fyear_start' AND '$last_fyear_end') AS A
GROUP BY city) AS B
LEFT JOIN
(SELECT city AS city1,COUNT(city) AS thisyear 
FROM(SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商品住宅' AND deal_date BETWEEN '$fyear_start' AND '$fyear_end'
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='商业用地' AND deal_date BETWEEN '$fyear_start' AND '$fyear_end'
UNION ALL
SELECT id,city,land_type,deal_date FROM helc_land
WHERE land_type='公建用地' AND deal_date BETWEEN '$fyear_start' AND '$fyear_end') AS C
GROUP BY city) AS D
ON B.city=D.city1) AS E
WHERE helc_city.city_short=E.city ORDER BY company_short,thisyear
            ");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['city']=$sqldata[$i]['city'];
            $sqldata1[$i]['lastyear']=$sqldata[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$sqldata[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
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
        $sqldata= Db::query("
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
        $sqldata= Db::query("
SELECT CONCAT(month1,\"月\") AS month,lastyear,thisyear FROM(SELECT month AS month1,estate_complete_area AS lastyear FROM `helc_estate`
WHERE year='$last_fyear') AS A
LEFT JOIN
(SELECT month AS month2,estate_complete_area AS thisyear FROM `helc_estate`
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
    //19、本财年与上财年发货台量按月对比(K台)
    function CompanyDelivery(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $BICompany=Session::get('BICompany');
        $SqlData= Db::query("
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM
(SELECT date_format(delivery_date, '%Y-%m') AS monthly,MONTH(delivery_date) AS month1,ROUND(COUNT(product_id)/1000,3) AS lastyear 
FROM  helc_delivery
WHERE delivery_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND install_company='$BICompany'
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(delivery_date, '%Y-%m') AS monthly1,MONTH(delivery_date) AS month2,ROUND(COUNT(product_id)/1000,3) AS thisyear 
FROM  helc_delivery
WHERE delivery_date BETWEEN '$fyear_start' AND '$fyear_end' AND install_company='$BICompany'
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        for ($i=0; $i < count($SqlData) ; $i++) {
            $sqldata1[$i]['monthly']=$SqlData[$i]['monthly'];
            $sqldata1[$i]['monthly1']=$SqlData[$i]['monthly1'];
            $sqldata1[$i]['lastyear']=$SqlData[$i]['lastyear'];
            $sqldata1[$i]['thisyear']=$SqlData[$i]['thisyear'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
    //20、每月完工情况
    public function install_complete(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqldata= Db::query("
SELECT CONCAT(fmonth,\"月\") AS fmonth,SUM(install_index) AS install_index,IFNULL(SUM(install_complete),0) AS install_complete 
FROM helc_month_sd
WHERE fyear=2020
GROUP BY fmonth
ORDER BY FIELD(fmonth,4,5,6,7,8,9,10,11,12,1,2,3)
");
        for ($i=0; $i < count($sqldata) ; $i++) {
            $sqldata1[$i]['fmonth']=$sqldata[$i]['fmonth'];
            $sqldata1[$i]['install_index']=$sqldata[$i]['install_index'];
            $sqldata1[$i]['install_complete']=$sqldata[$i]['install_complete'];
        }
        $sqldata_json=json_encode($sqldata1);
        echo  $sqldata_json;
    }
}
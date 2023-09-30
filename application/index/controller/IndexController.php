<?php
namespace app\index\controller;
use think\Db;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Session;
class IndexController extends Controller{
    //定义控制器初始化方法_initialize，在该控制器的方法调用之前首先执行。
    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function _initialize(){
        //  会话超时
        if(!session('staff_id')){
             $this->error('请先登录系统',url('/../index.php/index/login/index'));
        }
        $result= Db::execute("CALL proce_check_weak_password();");
        //获取session
        $staff_id = session('staff_id');
        //  获取用户基本信息
        $staffInfo = array();
        $staffInfo = Db::name('staff')
            ->where('staff_id', $staff_id)
            ->select();
        $role=$staffInfo[0]['role'];
        Session::set('role',$role);
        $staff_ids=$staffInfo[0]['staff_id'];
        Session::set('staff_ids',$staff_ids);
        $staff_name=$staffInfo[0]['staff_name'];
        Session::set('staff_name',$staff_name);
        $company=$staffInfo[0]['company'];
        Session::set('company',$company);
        $check_weak_password=$staffInfo[0]['check_weak_password'];
        Session::set('check_weak_password',$check_weak_password);
        //  获取操作权限
        $auth = array();
        $auth = Db::name('role')
            ->where('role_name', $role)
            ->select();
        $sdreport = $auth[0]['report'];
        Session::set('sdreport',$sdreport);
        $coreport = $auth[0]['coreport'];
        Session::set('coreport',$coreport);
        $bureport = $auth[0]['bureport'];
        Session::set('bureport',$bureport);
        $yyglb = $auth[0]['yyglb'];
        Session::set('yyglb',$yyglb);
        $cwglb = $auth[0]['cwglb'];
        Session::set('cwglb',$cwglb);
        $htglb = $auth[0]['htglb'];
        Session::set('htglb',$htglb);
        $azglb = $auth[0]['azglb'];
        Session::set('azglb',$azglb);
        $rlzyb = $auth[0]['rlzyb'];
        Session::set('rlzyb',$rlzyb);
        $shfwb = $auth[0]['shfwb'];
        Session::set('shfwb',$shfwb);
        $admin = $auth[0]['admin'];
        Session::set('admin',$admin);
        $main = $auth[0]['main'];
        Session::set('main',$main);
        $sale = $auth[0]['sale'];
        Session::set('sale',$sale);
        $install = $auth[0]['install'];
        Session::set('install',$install);
        $maintain = $auth[0]['maintain'];
        Session::set('maintain',$maintain);
        $arrears = $auth[0]['arrears'];
        Session::set('arrears',$arrears);
        $litigation = $auth[0]['litigation'];
        Session::set('litigation',$litigation);
        $rivals = $auth[0]['rivals'];
        Session::set('rivals',$rivals);
        $bi = $auth[0]['bi'];
        Session::set('bi',$bi);
        $rate = $auth[0]['rate'];
        Session::set('rate',$rate);
        $safety = $auth[0]['safety'];
        Session::set('safety',$safety);
        $buceo = $auth[0]['buceo'];
        Session::set('buceo',$buceo);
        $checker = $auth[0]['checker'];
        Session::set('checker',$checker);
        $stationmaster = $auth[0]['stationmaster'];
        Session::set('stationmaster',$stationmaster);
        $owndata = $auth[0]['owndata'];
        Session::set('owndata',$owndata);
        $split = $auth[0]['split'];
        Session::set('split',$split);
        $contract_prescription = $auth[0]['contract_prescription'];
        Session::set('contract_prescription',$contract_prescription);
        $contract_file = $auth[0]['contract_file'];
        Session::set('contract_file',$contract_file);
        $invoice = $auth[0]['invoice'];
        Session::set('invoice',$invoice);
        $approval_authority = $auth[0]['approval_authority'];
        Session::set('approval_authority',$approval_authority);
        $regional_head = $auth[0]['regional_head'];
        Session::set('regional_head',$regional_head);
        $regional_finance = $auth[0]['regional_finance'];
        Session::set('regional_finance',$regional_finance);
        $sd_accounting = $auth[0]['sd_accounting'];
        Session::set('sd_accounting',$sd_accounting);
        $sd_taxation_a = $auth[0]['sd_taxation_a'];
        Session::set('sd_taxation_a',$sd_taxation_a);
        $sd_taxation_b = $auth[0]['sd_taxation_b'];
        Session::set('sd_taxation_b',$sd_taxation_b);
        $super_admin = $auth[0]['super_admin'];
        Session::set('super_admin',$super_admin);
        $tender_offer = $auth[0]['tender_offer'];
        Session::set('tender_offer',$tender_offer);
        $drawing = $auth[0]['drawing'];
        Session::set('drawing',$drawing);
        $install_complete = $auth[0]['install_complete'];
        Session::set('install_complete',$install_complete);
        $private_data = $auth[0]['private_data'];
        Session::set('private_data',$private_data);
        $history_data = $auth[0]['history_data'];
        Session::set('history_data',$history_data);
        $arrears_reply = $auth[0]['arrears_reply'];
        Session::set('arrears_reply',$arrears_reply);
        $performance = $auth[0]['performance'];
        Session::set('performance',$performance);
        $safemass = $auth[0]['safemass'];
        Session::set('safemass',$safemass);
        $accessory = $auth[0]['accessory'];
        Session::set('accessory',$accessory);
        $fyears = Db::name('time')->where('status', '=','1')->select();
        $fyear=$fyears[0]['fyear'];//财年
        Session::set('fyear',$fyear);
        $fyear_start=$fyears[0]['qt1start'];//财年开始
        Session::set('fyear_start',$fyear_start);
        $fyear_end=$fyears[0]['qt4end'];//财年结束
        Session::set('fyear_end',$fyear_end);
        //定义上财年
        $lastfyears=Db::query("/** @lang text */
        SELECT fyear,qt1start,qt4end FROM helc_time ORDER BY fyear DESC LIMIT 1,1");
        $lastfyear=$lastfyears[0]['fyear'];//财年
        Session::set('last_fyear',$lastfyear);
        $last_fyear_start=$lastfyears[0]['qt1start'];//财年开始
        Session::set('last_fyear_start',$last_fyear_start);
        $last_fyear_end=$lastfyears[0]['qt4end'];//财年结束
        Session::set('last_fyear_end',$last_fyear_end);
        //网站访问量
        $visits=Db::query("/** @lang text */
        SELECT  MAX(id) AS visits FROM helc_log");
        $visit=$visits[0]['visits'];
        Session::set('visit',$visit);
        //获取事业部名称
        $bustaff= Db::query("/** @lang text */
        SELECT staff_bu FROM helc_bustaff WHERE staff_id = '$staff_ids' AND fyear = '$fyear'");
        if (empty($bustaff)) {
            Session::set('staff_bu','');
        }else{
            // 是否为空
            $staff_bus = $bustaff[0]['staff_bu'];
            Session::set('staff_bu',$staff_bus);
        }
        /*最新生效日期*/
        $newdate=Db::query('/** @lang text */
        SELECT into_force_date FROM `helc_product` ORDER BY into_force_date DESC LIMIT 0,1');
        $intoforce = $newdate[0]['into_force_date'];
        Session::set('intoforce_date',$intoforce);
        /*最新完工日期*/
        $installdate=Db::query('/** @lang text */
        SELECT complete_date FROM `helc_product` WHERE complete_status = "已审核" ORDER BY complete_date DESC LIMIT 0,1');
        $complete = $installdate[0]['complete_date'];
        Session::set('complete_date',$complete);
        /*最新发货日期*/
        $deliveryDate=Db::query('/** @lang text */
        SELECT report_delivery_date FROM `helc_product` ORDER BY report_delivery_date DESC LIMIT 0,1');
        $reportDeliveryDate = $deliveryDate[0]['report_delivery_date'];
        Session::set('report_delivery_date',$reportDeliveryDate);
        /*最新报价日期*/
        $quote_date_search=Db::query('/** @lang text */
        SELECT quote_date FROM `helc_quote` WHERE quote_date BETWEEN "1990-01-01" AND NOW() ORDER BY quote_date DESC LIMIT 0,1');
        $quote_date = $quote_date_search[0]['quote_date'];
        Session::set('quote_date',$quote_date);
        /*最新设备入金日期*/
        $equipment_income_date_search=Db::query('/** @lang text */
        SELECT income_date FROM `helc_income_erp` WHERE income_date BETWEEN "1990-01-01" AND NOW() ORDER BY income_date DESC LIMIT 0,1');
        $equipment_income_date = $equipment_income_date_search[0]['income_date'];
        Session::set('equipment_income_date',$equipment_income_date);
        /*最新安装入金日期*/
        $install_income_date_search=Db::query('/** @lang text */
        SELECT income_date FROM `helc_install_income_erp` WHERE income_date BETWEEN "1990-01-01" AND NOW() ORDER BY income_date DESC LIMIT 0,1');
        $install_income_date = $install_income_date_search[0]['income_date'];
        Session::set('install_income_date',$install_income_date);
        //财年使用进度
        $yearday=Db::query('/** @lang text */
SELECT pass,today,week,nyear,month_now FROM `helc_day`');
        $yearpass = $yearday[0]['pass'];
        Session::set('yearpass',$yearpass);
        $today_date = $yearday[0]['today'];
        Session::set('today_date',$today_date);
        $today_week = $yearday[0]['week'];
        Session::set('today_week',$today_week);
        $nyear = $yearday[0]['nyear'];
        Session::set('nyear',$nyear);
        $month_now = $yearday[0]['month_now'];
        Session::set('month_now',$month_now);
        //编号
        $serial_number=Db::query("/** @lang text */
SELECT nyear,letter_id FROM helc_serial_number where nyear = '$nyear'");
        $letter_id = $serial_number[0]['letter_id'];
        Session::set('letter_id',$letter_id);
        //--------------------------总部生效情况----------------------//
        $head_into_force=Db::query("/** @lang text */
        SELECT head_index,headquarters,ROUND(average_price,2) AS average_price,ROUND(average_fall*100,2) AS average_fall,difference,difference_all,ROUND(surplus_average_price,2) AS surplus_average_price,ROUND(surplus_average_fall*100,2) AS surplus_average_fall,ROUND(average_install_price,2) AS average_install_price,ROUND(m0_index,2) AS m0_index,ROUND(m0_complete,2) AS m0_complete,into_force_hide,new_intoforce,this_month_plan_report FROM `helc_ppm`
WHERE year='$fyear'
        ");
        $head_index = $head_into_force[0]['head_index'];
        Session::set('head_index',$head_index);
        $headquarters = $head_into_force[0]['headquarters'];
        Session::set('headquarters',$headquarters);
        $average_price = $head_into_force[0]['average_price'];
        Session::set('average_price',$average_price);
        $average_fall = $head_into_force[0]['average_fall'];
        Session::set('average_fall',$average_fall);
        $difference = $head_into_force[0]['difference'];
        Session::set('difference',$difference);
        $difference_all = $head_into_force[0]['difference_all'];
        Session::set('difference_all',$difference_all);
        $surplus_average_price = $head_into_force[0]['surplus_average_price'];
        Session::set('surplus_average_price',$surplus_average_price);
        $surplus_average_fall = $head_into_force[0]['surplus_average_fall'];
        Session::set('surplus_average_fall',$surplus_average_fall);
        $average_install_price = $head_into_force[0]['average_install_price'];
        Session::set('average_install_price',$average_install_price);
        $m0_index = $head_into_force[0]['m0_index'];
        Session::set('m0_index',$m0_index);
        $m0_complete = $head_into_force[0]['m0_complete'];
        Session::set('m0_complete',$m0_complete);
        $into_force_hide = $head_into_force[0]['into_force_hide'];
        Session::set('into_force_hide',$into_force_hide);
        $new_intoforce = $head_into_force[0]['new_intoforce'];
        Session::set('new_intoforce',$new_intoforce);
        $this_month_plan_report = $head_into_force[0]['this_month_plan_report'];
        Session::set('this_month_plan_report',$this_month_plan_report);
        //房地产投资情况获取最近月份
        $update_date=Db::query('/** @lang text */
SELECT SUBSTRING(MAX(update_Date),5,2) AS update_date FROM `helc_real_estate`
        ');
        $estate_update_date = $update_date[0]['update_date'];
        Session::set('estate_update_date',$estate_update_date);
        //房地产市场情况
        $estate = Db::name('estate')
            ->order('id','desc')
            ->limit(1)
            ->select();
        $estate_month = $estate[0]['month'];
        Session::set('estate_month',$estate_month);
        $estate_invest = $estate[0]['estate_invest'];
        Session::set('estate_invest',$estate_invest);
        $estate_invest_increase = $estate[0]['estate_invest_increase'];
        Session::set('estate_invest_increase',$estate_invest_increase);
        $estate_homes_invest = $estate[0]['estate_homes_invest'];
        Session::set('estate_homes_invest',$estate_homes_invest);
        $estate_homes_invest_increase = $estate[0]['estate_homes_invest_increase'];
        Session::set('estate_homes_invest_increase',$estate_homes_invest_increase);
        $estate_construction_area = $estate[0]['estate_construction_area'];
        Session::set('estate_construction_area',$estate_construction_area);
        $estate_construction_area_increase = $estate[0]['estate_construction_area_increase'];
        Session::set('estate_construction_area_increase',$estate_construction_area_increase);
        $estate_new_area = $estate[0]['estate_new_area'];
        Session::set('estate_new_area',$estate_new_area);
        $estate_new_area_increase = $estate[0]['estate_new_area_increase'];
        Session::set('estate_new_area_increase',$estate_new_area_increase);
        $estate_complete_area = $estate[0]['estate_complete_area'];
        Session::set('estate_complete_area',$estate_complete_area);
        $estate_complete_area_increase = $estate[0]['estate_complete_area_increase'];
        Session::set('estate_complete_area_increase',$estate_complete_area_increase);
        $install_fixed_assets = $estate[0]['install_fixed_assets'];
        Session::set('install_fixed_assets',$install_fixed_assets);
        $completed_area_of_commercial_residence_increase = $estate[0]['completed_area_of_commercial_residence_increase'];
        Session::set('completed_area_of_commercial_residence_increase',$completed_area_of_commercial_residence_increase);
        //--------------------------函数运行情况----------------------//
        $event=Db::query('/** @lang text */
                SELECT id,start_time,end_time
                FROM `helc_event`
                ORDER BY id DESC LIMIT 1;
        ');
        $event_start_time = $event[0]['start_time'];
        Session::set('event_start_time',$event_start_time);
        $event_end_time = $event[0]['end_time'];
        Session::set('event_end_time',$event_end_time);
    }
    public function main(){
        $check_weak_password=Session::get('check_weak_password');
        if($check_weak_password==1){
             $this->error(
                '系统检测到您使用较弱的登陆密码，请更改后重新登陆！',
                url('Staff/changepw')
            );
        }
        $Model = Db::execute("/** @lang text */
        UPDATE helc_log,helc_staff
        SET helc_log.staff_name=helc_staff.staff_name
        WHERE helc_log.staff_id=helc_staff.staff_id
        ");
        //预警值
        $result1= Db::query("/** @lang text */
SELECT index_name,this_year,CONCAT(compare,'%') AS compare
FROM helc_warning
");
        //收款跟进
        $result2= Db::query("/** @lang text */
SELECT
	contract_id_and_periods,
       scompany,
  fix_project_name,
	expire_arrears,
	solutions,
	solution_progress,
	max_account_age_month
FROM
	`helc_equipmentarrears` 
WHERE
	active_status =1
	AND follow_up_level=5
");
        $result3= Db::query("/** @lang text */
SELECT
	contract_id_and_periods,
       scompany,
  fix_project_name,
	expire_arrears,
	solutions,
	solution_progress,
	max_account_age_month
FROM
	`helc_installarrears` 
WHERE
	active_status =1
	AND follow_up_level=5
");
        $this->assign('result1', $result1);
        $this->assign('result2', $result2);
        $this->assign('result3', $result3);
        $this->display();
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function welcome()
    {
        header('Cache-Control: no-store, no-cache, must-revalidate, no-transform');
        //提交登陆信息
        $staff_ids = Session::get('staff_ids');
        $staff_name = Session::get('staff_name');
        $create_time = date("Y-m-d H:i:s");
        $company = Session::get('company');
        //定义本财年
        $fyears=Db::query("/** @lang text */
SELECT fyear,qt1start,qt4end FROM helc_time WHERE status=1 ");
        $fyear=$fyears[0]['fyear'];//财年
        $fyear_start=$fyears[0]['qt1start'];//财年开始
        $fyear_end=$fyears[0]['qt4end'];//财年结束
        //定义上财年
        $lastfyears=Db::query("/** @lang text */
SELECT fyear,qt1start,qt4end FROM helc_time ORDER BY fyear DESC LIMIT 1,1");
        $lastfyear=$lastfyears[0]['fyear'];//财年
        $last_fyear_start=$lastfyears[0]['qt1start'];//财年开始
        $last_fyear_end=$lastfyears[0]['qt4end'];//财年结束
        // 从分公司指标表里查询数据
        $result=Db::name('sdcompanyindex')
        ->where('fyear', '=', $fyear )
        ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
        ->select();
        //欠款合计
        $result6= Db::query("/** @lang text */
SELECT scompany,equipment_arrears,install_arrears,equipment_arrears+install_arrears AS all_arrears,install_predict_arrears,equipment_predict_arrears,install_predict_arrears+equipment_predict_arrears AS all_predict
FROM helc_sdcompanyindex
WHERE year=$fyear
ORDER BY field(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //区域在制
        $result8= Db::query("/** @lang text */
SELECT * FROM (SELECT company,making,CONCAT(ROUND(making*100/makingsum, 2),'','%') AS per1,making1,CONCAT(ROUND(making1*100/making, 2),'','%') AS per2,making2,CONCAT(ROUND(making2*100/making, 2),'','%') AS per3,making3,CONCAT(ROUND(making3*100/making, 2),'','%') AS per4,making4,CONCAT(ROUND(making4*100/making, 2),'','%') AS per5,entry FROM(SELECT IFNULL(SUBSTR(company,1,2),'合计') AS company,SUM(making) AS making,SUM(making1) AS making1,SUM(making2) AS making2,SUM(making3) AS making3,SUM(making4) AS making4,SUM(entry) AS entry FROM(SELECT company,making,IFNULL(making1,0) AS making1,IFNULL(making2,0) AS making2,IFNULL(making3,0) AS making3,IFNULL(making4,0) AS making4 FROM (SELECT company,making,making1,making2,making3 FROM(SELECT company,making,making1,making2 FROM (SELECT company,making,making1 FROM (SELECT helc_product.install_company AS company,COUNT(product_id) AS making
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW()
GROUP BY company )AS A
LEFT JOIN
(SELECT helc_product.install_company AS company1,COUNT(product_id) AS making1
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW() AND TO_DAYS(NOW()) - TO_DAYS(entry_date)<=180
GROUP BY company1 ) AS B
ON A.company = B.company1) AS C
LEFT JOIN
(SELECT helc_product.install_company AS company1,COUNT(product_id) AS making2
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW() AND TO_DAYS(NOW()) - TO_DAYS(entry_date)>180 AND TO_DAYS(NOW()) - TO_DAYS(entry_date)<=270
GROUP BY company1 ) AS D
ON C.company=D.company1) AS E
LEFT JOIN
(SELECT helc_product.install_company AS company1,COUNT(product_id) AS making3
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW() AND TO_DAYS(NOW()) - TO_DAYS(entry_date)>270 AND TO_DAYS(NOW()) - TO_DAYS(entry_date)<=365
GROUP BY company1 ) AS F
ON E.company=F.company1) AS L
LEFT JOIN
(SELECT helc_product.install_company AS company1,COUNT(product_id) AS making4
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW() AND TO_DAYS(NOW()) - TO_DAYS(entry_date)>365
GROUP BY company1) AS M
ON L.company=M.company1) AS G
LEFT JOIN
(SELECT helc_product.install_company AS company3,COUNT(product_id) AS entry
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY company3 ) AS H
ON G.company=H.company3
GROUP BY company WITH ROLLUP) AS I
INNER JOIN
(SELECT helc_product.install_company AS company4,COUNT(helc_product.product_id) AS makingsum
FROM helc_product
WHERE complete_date ='0000-00-00' AND entry_date BETWEEN '2000-01-01' AND NOW()) AS J) AS K
ORDER BY field(SUBSTR(company,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')

");
        //维保台量
       /* try {
            $result9 = Db::name('maintain')
                ->where('fyear', 'like', '%' . $fyear . '%')
                ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }*/
        //设备历史欠款与回
        $result11= Db::query("/** @lang text */
SELECT SUBSTR(company,1,2) as company,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_rate FROM helc_sdcompanyindex
WHERE fyear='$fyear'
ORDER BY field(SUBSTR(company,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //安装历史欠款与回收
        $result12= Db::query("/** @lang text */
SELECT SUBSTR(company,1,2) as company,in_recovery,in_arrears_balance,in_arrears_unsplit,in_rate FROM helc_sdcompanyindex
WHERE year='$fyear'
ORDER BY field(SUBSTR(company,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");

        //事业部总体得分
        if ($company=='山东分公司') {
            $result17= Db::query("/** @lang text */
            SELECT * FROM(SELECT rank,bu_sname,FORMAT(intoforce_score,2) AS intoforce_score,FORMAT(install_score,2) AS install_score,FORMAT(thisyear_score,2) AS thisyear_score,convert(history_score, decimal(12,2)) AS history_score,convert(score, decimal(12,2)) AS score,quote_score,delivery_score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY score DESC) AS A
UNION
SELECT '' AS rank,'平均' AS bu_sname,FORMAT(AVG(intoforce_score),2) AS intoforce_score,FORMAT(AVG(install_score),2) AS install_score,FORMAT(AVG(thisyear_score),2) AS thisyear_score,FORMAT(AVG(history_score),2) AS history_score,FORMAT(AVG(score),2) AS score,FORMAT(AVG(quote_score),2) AS quote_score,FORMAT(AVG(delivery_score),2) AS delivery_score,'' AS company
FROM helc_buscore
WHERE year='$fyear' AND status=1
            ");
            //生效
            $result18= Db::query("/** @lang text */
SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //完工
            $result19= Db::query("/** @lang text */
SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result20= Db::query("/** @lang text */
SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result21= Db::query("/** @lang text */
SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE  year='$fyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result39= Db::query("/** @lang text */
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY quote_score DESC
");
            //发货加分项
            $result58= Db::query("/** @lang text */
SELECT delivery_rank,bu_sname,delivery_score,delivery_index,delivery_rate,delivery_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY delivery_rank
");

        }else{
            //事业部总得分
            $result17= Db::query("/** @lang text */
SELECT rank,bu_sname,intoforce_score,install_score,thisyear_score,history_score,quote_score,delivery_score,convert(score, decimal(12,2)) AS score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY score DESC
");
            //生效得分
            $result18= Db::query("/** @lang text */
SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //安装得分
            $result19= Db::query("/** @lang text */
SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore
WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result20= Db::query("/** @lang text */
SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result21= Db::query("/** @lang text */
SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result39= Db::query("/** @lang text */
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY quote_score DESC
");
            //发货加分项
            $result58= Db::query("/** @lang text */
SELECT delivery_rank,bu_sname,delivery_score,delivery_index,delivery_rate,delivery_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY delivery_rank
");
        }
        //竞争对手下浮
        $result22= Db::query('/** @lang text */
SELECT winning_bid,not_winning_date,winning_bid_relative_float_downward*100 AS winning_bid_relative_float_downward,elevator_model,quote_num,city,project_name,not_winning_reason FROM helc_quote
WHERE status=\'已丢标\' AND competitor_quote>1000 AND not_winning_date>=DATE_SUB(CURRENT_DATE() , INTERVAL 3 MONTH)
ORDER BY not_winning_date DESC;
');


        //签梯均价
        $result24= Db::query("/** @lang text */
SELECT  belong_to,lastyear_eq_avg,thisyear_eq_avg,eq_average_target,lastyear_in_avg,thisyear_in_avg,check_per,check_per1 FROM(SELECT SUBSTR(belong_to,1,2) AS belong_to,lastyear_eq_avg,thisyear_eq_avg,eq_average_target,lastyear_in_avg,thisyear_in_avg,check_per FROM(SELECT belong_to,FORMAT(lastyear_eq*0.001/lastyear_co,2) AS lastyear_eq_avg,FORMAT(lastyear_in*0.001/lastyear_co,2) AS lastyear_in_avg,FORMAT(thisyear_eq*0.001/thisyear_co,2) AS thisyear_eq_avg,FORMAT(thisyear_in*0.001/thisyear_co,2) AS thisyear_in_avg FROM(SELECT IFNULL(belong_to,'合计') AS belong_to,SUM(contract_equipment_price) AS lastyear_eq,SUM(contract_installation_price) AS lastyear_in,COUNT(product_id) AS lastyear_co FROM helc_product
WHERE into_force_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
GROUP BY belong_to WITH ROLLUP) AS A
LEFT JOIN
(SELECT IFNULL(belong_to,'合计') AS belong_to1,SUM(contract_equipment_price) AS thisyear_eq,SUM(contract_installation_price) AS thisyear_in,COUNT(product_id) AS thisyear_co FROM helc_product
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY belong_to WITH ROLLUP) AS B
ON A.belong_to=B.belong_to1) AS C
LEFT JOIN
(SELECT company,FORMAT(eq_average_target*0.001,2) AS eq_average_target,CONCAT(ROUND(check_sum*100/sign_complete,2),'','%') AS check_per FROM helc_sdcompanyindex
WHERE year='$fyear') AS D
ON C.belong_to=D.company) AS E
LEFT JOIN
(SELECT SUBSTR(company,1,2) AS company,CONCAT(ROUND(check_sum1*100/sign_complete,2),'','%') AS check_per1 FROM helc_sdcompanyindex
WHERE year='$fyear') AS F
ON E.belong_to=F.company
ORDER BY field(SUBSTR(belong_to,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //层站对比
        $result26= Db::query("/** @lang text */
SELECT belong_to,ROUND(sum1/cou1,2) AS last_year,ROUND(sum2/cou2,2) AS this_year FROM (SELECT IFNULL( SUBSTR(belong_to,1,2),'合计') AS belong_to,SUM(cou1) AS cou1,SUM(sum1) AS sum1,SUM(cou2) AS cou2,SUM(sum2) AS sum2 FROM(SELECT belong_to,COUNT(product_id) AS cou1,SUM(floor) AS sum1 FROM `helc_product`
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end' AND elevator_type='直梯'
GROUP BY belong_to) AS A
LEFT JOIN
(SELECT belong_to AS belong_to1,COUNT(product_id) AS cou2,SUM(floor) AS sum2 FROM `helc_product`
WHERE into_force_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' AND elevator_type='直梯'
GROUP BY belong_to) AS B
ON A.belong_to=B.belong_to1
GROUP BY belong_to WITH ROLLUP) AS C
ORDER BY field(SUBSTR(belong_to,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //预测完工准确率得分
        $result27= Db::query("/** @lang text */
SELECT SUBSTR(company,1,2) AS company,this_month_score  FROM helc_month_install WHERE year='$fyear';
");
        //100m以上高楼统计
        $result28= Db::query("/** @lang text */
SELECT SUBSTR(project_name,1,15) AS project_name,SUBSTR(branch_office,1,2) AS branch_office,quote_num,building_height, elevator_model,bid_opening_date,sales_person,if_not_winning,not_winning_reason,winning_bid
FROM `helc_quote`
WHERE building_height>=100 AND quote_date>='$fyear_start' ORDER BY bid_opening_date DESC;
");
        //安装当年欠款TOP10
        $result29= Db::query("/** @lang text */
SELECT 
contract_id,company,clause_customer,expire_arrears
FROM 
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_install_arrears
WHERE active_status='1' AND arrears_type='当年欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS A
UNION
SELECT
'' AS contract_id,
'' AS company,
'合计' AS clause_customer,
SUM(expire_arrears) AS expire_arrears
FROM
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_install_arrears
WHERE active_status='1' AND arrears_type='当年欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS B

");
        //设备当年欠款TOP10
        $result30= Db::query("/** @lang text */
SELECT 
contract_id,company,clause_customer,expire_arrears
FROM 
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_equipment_arrears
WHERE active_status='1' AND arrears_type='当年欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS A
UNION
SELECT
'' AS contract_id,
'' AS company,
'合计' AS clause_customer,
SUM(expire_arrears) AS expire_arrears
FROM
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_equipment_arrears
WHERE active_status='1' AND arrears_type='当年欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS B


");
        //安装历史欠款TOP10
        $result31= Db::query("/** @lang text */
SELECT 
contract_id,company,clause_customer,expire_arrears
FROM 
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_install_arrears
WHERE active_status='1' AND arrears_type='历史欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS A
UNION
SELECT
'' AS contract_id,
'' AS company,
'合计' AS clause_customer,
SUM(expire_arrears) AS expire_arrears
FROM
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_install_arrears
WHERE active_status='1' AND arrears_type='历史欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS B
");
        //设备历史欠款TOP10
        $result32= Db::query("/** @lang text */
SELECT 
contract_id,company,clause_customer,expire_arrears
FROM 
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_equipment_arrears
WHERE active_status='1' AND arrears_type='历史欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS A
UNION
SELECT
'' AS contract_id,
'' AS company,
'合计' AS clause_customer,
SUM(expire_arrears) AS expire_arrears
FROM
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS expire_arrears FROM helc_equipment_arrears
WHERE active_status='1' AND arrears_type='历史欠款'
GROUP BY contract_id
ORDER BY expire_arrears DESC LIMIT 10) AS B
");
        //超1个月未归档合同
        $result35= Db::query("/** @lang text */
SELECT contract_id,contract_num,branch,project_name,sd_approved_date
FROM helc_contract
WHERE TO_DAYS(NOW()) - TO_DAYS(sd_approved_date)>=30 AND both_seal_date='0000-00-00' AND contract_status='正常'
ORDER BY sd_approved_date
");
        //中标后超过两个月合同未邮寄总部
        $result36= Db::query("/** @lang text */
SELECT helc_contract.contract_id,helc_contract.contract_num,helc_contract.branch,helc_contract.project_name,helc_quote.win_bidding_date,helc_contract.audit_date
FROM helc_quote,helc_contract
WHERE helc_quote.contract_id=helc_contract.contract_id AND TO_DAYS(NOW()) - TO_DAYS(win_bidding_date)>=60 AND helc_quote.if_not_winning='否' AND helc_contract.contract_status='正常' AND helc_contract.courier_date='0000-00-00'
ORDER BY win_bidding_date
");
        //配套费7折支出与正常支出安装下浮对比
        $result37= Db::query("/** @lang text */
SELECT belong_to,CONCAT(ROUND((((contract_installation_price-average_installation_expenditure-average_service_charge)/standard_installation_price)-1)*100,2),'','%') AS supporting_cost,CONCAT(ROUND((((contract_installation_price-clarify_cost-supporting_cost)/standard_installation_price)-1)*100,2),'','%') AS actual_float
FROM (SELECT IFNULL(SUBSTR(belong_to,1,2),'合计') AS belong_to,SUM(standard_installation_price) AS standard_installation_price,SUM(contract_installation_price) AS contract_installation_price,SUM(clarify_cost) AS clarify_cost,SUM(supporting_cost) AS supporting_cost,SUM(average_installation_expenditure) AS average_installation_expenditure,SUM(average_service_charge) AS average_service_charge
FROM helc_product
WHERE into_force_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY belong_to WITH ROLLUP) AS A
ORDER BY field(SUBSTR(belong_to,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //欠款TOP20
        $result38= Db::query("
/** @lang text */
SELECT 
	contract_id,
	company,
	clause_customer,
	equipment,
	install,
	total
FROM
(SELECT A.contract_id,A.company,A.clause_customer,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1
GROUP BY contract_id) AS A
LEFT JOIN
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1
GROUP BY contract_id) AS B
ON A.contract_id=B.contract_id
ORDER BY total DESC LIMIT 20) AS C
UNION
SELECT 
'' AS contract_id,
'' AS company,
'合计' AS clause_customer,
SUM(equipment) AS equipment,
SUM(install) AS install,
SUM(total) AS total
FROM
(SELECT A.contract_id,A.company,A.clause_customer,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1
GROUP BY contract_id) AS A
LEFT JOIN
(SELECT contract_id,company,clause_customer,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1
GROUP BY contract_id) AS B
ON A.contract_id=B.contract_id
ORDER BY total DESC LIMIT 20) AS C
");
        //设备出货前收款比例对比
        $result40= Db::query("
/** @lang text */
SELECT company,per AS last_year,per1 AS this_year FROM (SELECT SUBSTR(company,1,2) AS company,CONCAT(ROUND(equipment_income_before_delivery*100/total,2),'','%') AS per
FROM(SELECT IFNULL(belong_to,'合计') AS company,SUM(equipment_income_before_delivery) AS equipment_income_before_delivery,SUM(equipment_expected_collected) AS total
FROM `helc_product`
WHERE report_delivery_date BETWEEN '$last_fyear_start' AND '$last_fyear_end'
GROUP BY belong_to WITH ROLLUP) AS A) AS B
LEFT JOIN
(SELECT SUBSTR(company,1,2) AS company1,CONCAT(ROUND(equipment_income_before_delivery*100/total,2),'','%') AS per1
FROM(SELECT IFNULL(belong_to,'合计') AS company,SUM(equipment_income_before_delivery) AS equipment_income_before_delivery,SUM(equipment_expected_collected) AS total
FROM `helc_product`
WHERE report_delivery_date BETWEEN '$fyear_start' AND '$fyear_end'
GROUP BY belong_to WITH ROLLUP) AS A) AS C
ON B.company=C.company1
ORDER BY FIELD(SUBSTR(company,1,2),'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //在制电梯已收款比例
        $result41= Db::query("
/** @lang text */
	SELECT company,making,fix_contract_installation_price,install_amount_collected,IFNULL(install_contract_amount_before_entry,0)+IFNULL(install_contract_amount_after_entry,0) AS install_contract_amount_entry,install_contract_amount_before_entry FROM
	(SELECT
		IFNULL(helc_product.install_company,'合计') AS company,
		COUNT( helc_product.product_id ) AS making,
		SUM( helc_product.fix_contract_installation_price ) AS fix_contract_installation_price,
		SUM( helc_product.install_amount_collected ) AS install_amount_collected,
		SUM( helc_product.install_contract_amount_before_entry ) AS install_contract_amount_before_entry,
		SUM( helc_product.install_contract_amount_after_entry ) AS install_contract_amount_after_entry 
	FROM
		helc_product,
		helc_contract 
	WHERE
		helc_product.contract_id = helc_contract.contract_id 
		AND helc_contract.if_check = '否' 
		AND complete_date = '0000-00-00' 
		AND helc_product.entry_date BETWEEN '2000-01-01' 
		AND NOW( ) 
	GROUP BY
		helc_product.install_company WITH ROLLUP) AS A
	ORDER BY FIELD(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')
");
        //报价信息
        $result42= Db::query("
/** @lang text */
SELECT scompany,quote_num,quote_sum,market_capacity,CONCAT(ROUND(market_coverage*100,2),'','%') AS market_coverage,bid,CONCAT(bid_rate,'','%') AS bid_rate,lost_sum,CONCAT(ROUND(lost_sum*100/quote_sum,2),'','%') AS lost_rate,(quote_sum-bid-lost_sum) AS unknown
FROM helc_sdcompanyindex
WHERE year='$fyear'
ORDER BY FIELD(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //本地大客户签梯情况
        $result43= Db::query("
/** @lang text */
SELECT short_name,company,lastyear,thisyear,lastyear+thisyear AS total FROM(SELECT short_name,company,SUM(contract_num) AS lastyear,IFNULL(SUM(contract_nums),0) AS thisyear FROM (SELECT short_name,company,IFNULL(contract_num,0) AS contract_num  FROM (SELECT DISTINCT(short_name) AS short_name,SUBSTR(company,1,2) AS company FROM helc_customer WHERE customer_classification='本地大客户') AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(contract_num) AS contract_num FROM helc_contract
WHERE fyear='$lastfyear' AND  customer_classification='本地大客户' AND province='山东省'
GROUP BY customer_abbreviation) AS B
ON A.short_name=B.customer_abbreviation) AS C
LEFT JOIN
(SELECT customer_abbreviation,SUM(contract_num) AS contract_nums FROM helc_contract
WHERE fyear='$fyear' AND customer_classification='本地大客户' AND province='山东省'
GROUP BY customer_abbreviation) AS D
ON C.short_name=D.customer_abbreviation
GROUP BY short_name
ORDER BY company) AS E
WHERE lastyear+thisyear>0
UNION
SELECT '' AS short_name,'合计' AS company,lastyear,thisyear,'' AS total FROM(SELECT short_name,company,SUM(contract_num) AS lastyear,IFNULL(SUM(contract_nums),0) AS thisyear FROM (SELECT short_name,company,IFNULL(contract_num,0) AS contract_num  FROM (SELECT DISTINCT(short_name) AS short_name,SUBSTR(company,1,2) AS company FROM helc_customer WHERE customer_classification='本地大客户') AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(contract_num) AS contract_num FROM helc_contract
WHERE fyear='$lastfyear' AND customer_classification='本地大客户' AND province='山东省'
GROUP BY customer_abbreviation) AS B
ON A.short_name=B.customer_abbreviation) AS C
LEFT JOIN
(SELECT customer_abbreviation,SUM(contract_num) AS contract_nums FROM helc_contract
WHERE fyear='$fyear' AND customer_classification='本地大客户' AND province='山东省'
GROUP BY customer_abbreviation) AS D
ON C.short_name=D.customer_abbreviation) AS F

");
        //安装预计收款按月汇总
        $result45= Db::query("
        /** @lang text */
        SELECT
        C.company,
        IFNULL(month4_1,0) AS month4_1,
        IFNULL(month4_2,0) AS month4_2,
        IFNULL(month5_1,0) AS month5_1,
        IFNULL(month5_2,0) AS month5_2,
        IFNULL(month6_1,0) AS month6_1,
        IFNULL(month6_2,0) AS month6_2,
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_1,0) AS month8_1,
        IFNULL(month8_2,0) AS month8_2,
        IFNULL(month9_1,0) AS month9_1,
        IFNULL(month9_2,0) AS month9_2,
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_1,0) AS total_1,
        IFNULL(total_2,0) AS total_2
    FROM
    (SELECT
        A.company,
        IFNULL(month4_1,0) AS month4_1,	
        IFNULL(month5_1,0) AS month5_1,	
        IFNULL(month6_1,0) AS month6_1,	
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month8_1,0) AS month8_1,	
        IFNULL(month9_1,0) AS month9_1,	
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(total_1,0) AS total_1
    FROM
        ( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
        LEFT JOIN (
        SELECT
            IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '4' THEN this_year_arrears_expected ELSE 0 END ) AS month4_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '5' THEN this_year_arrears_expected ELSE 0 END ) AS month5_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '6' THEN this_year_arrears_expected ELSE 0 END ) AS month6_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '7' THEN this_year_arrears_expected ELSE 0 END ) AS month7_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '8' THEN this_year_arrears_expected ELSE 0 END ) AS month8_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '9' THEN this_year_arrears_expected ELSE 0 END ) AS month9_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '10' THEN this_year_arrears_expected ELSE 0 END ) AS month10_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '11' THEN this_year_arrears_expected ELSE 0 END ) AS month11_1,		
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '12' THEN this_year_arrears_expected ELSE 0 END ) AS month12_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '1' THEN this_year_arrears_expected ELSE 0 END ) AS month1_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '2' THEN this_year_arrears_expected ELSE 0 END ) AS month2_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '3' THEN this_year_arrears_expected ELSE 0 END ) AS month3_1,
            sum( this_year_arrears_expected ) AS total_1
        FROM
            helc_installarrears 
        WHERE
              active_status = 1 
            AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            company WITH ROLLUP 
        ) AS B ON A.company = B.company) AS C
        LEFT JOIN
            (SELECT
        A.company,
        IFNULL(month4_2,0) AS month4_2,	
        IFNULL(month5_2,0) AS month5_2,	
        IFNULL(month6_2,0) AS month6_2,	
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_2,0) AS month8_2,	
        IFNULL(month9_2,0) AS month9_2,	
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_2,0) AS total_2
    FROM
        ( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
        LEFT JOIN (
        SELECT
            IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '4' THEN history_arrears_expected ELSE 0 END ) AS month4_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '5' THEN history_arrears_expected ELSE 0 END ) AS month5_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '6' THEN history_arrears_expected ELSE 0 END ) AS month6_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '7' THEN history_arrears_expected ELSE 0 END ) AS month7_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '8' THEN history_arrears_expected ELSE 0 END ) AS month8_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '9' THEN history_arrears_expected ELSE 0 END ) AS month9_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '10' THEN history_arrears_expected ELSE 0 END ) AS month10_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '11' THEN history_arrears_expected ELSE 0 END ) AS month11_2,		
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '12' THEN history_arrears_expected ELSE 0 END ) AS month12_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '1' THEN history_arrears_expected ELSE 0 END ) AS month1_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '2' THEN history_arrears_expected ELSE 0 END ) AS month2_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '3' THEN history_arrears_expected ELSE 0 END ) AS month3_2,
            sum( history_arrears_expected ) AS total_2
        FROM
            helc_installarrears 
        WHERE
              active_status = 1 
            AND history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            company WITH ROLLUP 
        ) AS B ON A.company = B.company) AS D
        ON C.company=D.company
    ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //设备预计收款按月汇总
        $result46= Db::query("
/** @lang text */
        SELECT
        C.company,
        IFNULL(month4_1,0) AS month4_1,
        IFNULL(month4_2,0) AS month4_2,
        IFNULL(month5_1,0) AS month5_1,
        IFNULL(month5_2,0) AS month5_2,
        IFNULL(month6_1,0) AS month6_1,
        IFNULL(month6_2,0) AS month6_2,
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_1,0) AS month8_1,
        IFNULL(month8_2,0) AS month8_2,
        IFNULL(month9_1,0) AS month9_1,
        IFNULL(month9_2,0) AS month9_2,
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_1,0) AS total_1,
        IFNULL(total_2,0) AS total_2
    FROM
    (SELECT
        A.company,
        IFNULL(month4_1,0) AS month4_1,	
        IFNULL(month5_1,0) AS month5_1,	
        IFNULL(month6_1,0) AS month6_1,	
        IFNULL(month7_1,0) AS month7_1,
        IFNULL(month8_1,0) AS month8_1,	
        IFNULL(month9_1,0) AS month9_1,	
        IFNULL(month10_1,0) AS month10_1,
        IFNULL(month11_1,0) AS month11_1,
        IFNULL(month12_1,0) AS month12_1,
        IFNULL(month1_1,0) AS month1_1,
        IFNULL(month2_1,0) AS month2_1,
        IFNULL(month3_1,0) AS month3_1,
        IFNULL(total_1,0) AS total_1
    FROM
        ( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
        LEFT JOIN (
        SELECT
            IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '4' THEN this_year_arrears_expected ELSE 0 END ) AS month4_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '5' THEN this_year_arrears_expected ELSE 0 END ) AS month5_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '6' THEN this_year_arrears_expected ELSE 0 END ) AS month6_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '7' THEN this_year_arrears_expected ELSE 0 END ) AS month7_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '8' THEN this_year_arrears_expected ELSE 0 END ) AS month8_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '9' THEN this_year_arrears_expected ELSE 0 END ) AS month9_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '10' THEN this_year_arrears_expected ELSE 0 END ) AS month10_1,	
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '11' THEN this_year_arrears_expected ELSE 0 END ) AS month11_1,		
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '12' THEN this_year_arrears_expected ELSE 0 END ) AS month12_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '1' THEN this_year_arrears_expected ELSE 0 END ) AS month1_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '2' THEN this_year_arrears_expected ELSE 0 END ) AS month2_1,
            sum( CASE MONTH ( this_year_arrears_expected_collection_date ) WHEN '3' THEN this_year_arrears_expected ELSE 0 END ) AS month3_1,
            sum( this_year_arrears_expected ) AS total_1
        FROM
            helc_equipmentarrears 
        WHERE
              active_status = 1 
            AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            company WITH ROLLUP 
        ) AS B ON A.company = B.company) AS C
        LEFT JOIN
            (SELECT
        A.company,
        IFNULL(month4_2,0) AS month4_2,	
        IFNULL(month5_2,0) AS month5_2,	
        IFNULL(month6_2,0) AS month6_2,	
        IFNULL(month7_2,0) AS month7_2,
        IFNULL(month8_2,0) AS month8_2,	
        IFNULL(month9_2,0) AS month9_2,	
        IFNULL(month10_2,0) AS month10_2,
        IFNULL(month11_2,0) AS month11_2,
        IFNULL(month12_2,0) AS month12_2,
        IFNULL(month1_2,0) AS month1_2,
        IFNULL(month2_2,0) AS month2_2,
        IFNULL(month3_2,0) AS month3_2,
        IFNULL(total_2,0) AS total_2
    FROM
        ( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
        LEFT JOIN (
        SELECT
            IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '4' THEN history_arrears_expected ELSE 0 END ) AS month4_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '5' THEN history_arrears_expected ELSE 0 END ) AS month5_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '6' THEN history_arrears_expected ELSE 0 END ) AS month6_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '7' THEN history_arrears_expected ELSE 0 END ) AS month7_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '8' THEN history_arrears_expected ELSE 0 END ) AS month8_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '9' THEN history_arrears_expected ELSE 0 END ) AS month9_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '10' THEN history_arrears_expected ELSE 0 END ) AS month10_2,	
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '11' THEN history_arrears_expected ELSE 0 END ) AS month11_2,		
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '12' THEN history_arrears_expected ELSE 0 END ) AS month12_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '1' THEN history_arrears_expected ELSE 0 END ) AS month1_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '2' THEN history_arrears_expected ELSE 0 END ) AS month2_2,
            sum( CASE MONTH ( history_arrears_expected_collection_date ) WHEN '3' THEN history_arrears_expected ELSE 0 END ) AS month3_2,
            sum( history_arrears_expected ) AS total_2
        FROM
            helc_equipmentarrears 
        WHERE
              active_status = 1 
            AND history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
        GROUP BY
            company WITH ROLLUP 
        ) AS B ON A.company = B.company) AS D
        ON C.company=D.company
    ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //安装总欠款预收实收按月汇总
        $result47= Db::query("
/** @lang text */
SELECT
E.company,
this_month4+history_month4 AS month4,
this_actual_month4+history_actual_month4 AS actual_month4,
this_month5+history_month5 AS month5,
this_actual_month5+history_actual_month5 AS actual_month5,
this_month6+history_month6 AS month6,
this_actual_month6+history_actual_month6 AS actual_month6,
this_month7+history_month7 AS month7,
this_actual_month7+history_actual_month7 AS actual_month7,
this_month8+history_month8 AS month8,
this_actual_month8+history_actual_month8 AS actual_month8,
this_month9+history_month9 AS month9,
this_actual_month9+history_actual_month9 AS actual_month9,
this_month10+history_month10 AS month10,
this_actual_month10+history_actual_month10 AS actual_month10,
this_month11+history_month11 AS month11,
this_actual_month11+history_actual_month11 AS actual_month11,
this_month12+history_month12 AS month12,
this_actual_month12+history_actual_month12 AS actual_month12,
this_month1+history_month1 AS month1,
this_actual_month1+history_actual_month1 AS actual_month1,
this_month2+history_month2 AS month2,
this_actual_month2+history_actual_month2 AS actual_month2,
this_month3+history_month3 AS month3,
this_actual_month3+history_actual_month3 AS actual_month3
FROM
(SELECT 
	C.company,
	this_month4,
	this_month5,
	this_month6,
	this_month7,
	this_month8,
	this_month9,
	this_month10,
	this_month11,
	this_month12,
	this_month1,
	this_month2,
	this_month3,
	this_total,
	this_actual_month4,
	this_actual_month5,
	this_actual_month6,
	this_actual_month7,
	this_actual_month8,
	this_actual_month9,
	this_actual_month10,
	this_actual_month11,
	this_actual_month12,
	this_actual_month1,
	this_actual_month2,
	this_actual_month3,
	this_actual_total
FROM
(SELECT
	A.company,
	IFNULL(this_month4,0) AS this_month4,
	IFNULL(this_month5,0) AS this_month5,
	IFNULL(this_month6,0) AS this_month6,
	IFNULL(this_month7,0) AS this_month7,
	IFNULL(this_month8,0) AS this_month8,
	IFNULL(this_month9,0) AS this_month9,
	IFNULL(this_month10,0) AS this_month10,
	IFNULL(this_month11,0) AS this_month11,
	IFNULL(this_month12,0) AS this_month12,
	IFNULL(this_month1,0) AS this_month1,
	IFNULL(this_month2,0) AS this_month2,
	IFNULL(this_month3,0) AS this_month3,
	IFNULL(this_month4,0)+IFNULL(this_month5,0)+IFNULL(this_month6,0)+IFNULL(this_month7,0)+IFNULL(this_month8,0)+IFNULL(this_month9,0)+IFNULL(this_month10,0)+IFNULL(this_month11,0)+IFNULL(this_month12,0)+IFNULL(this_month1,0)+IFNULL(this_month2,0)+IFNULL(this_month3,0) AS this_total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN this_year_arrears_expected ELSE 0 END ) AS this_month4,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN this_year_arrears_expected ELSE 0 END ) AS this_month5,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN this_year_arrears_expected ELSE 0 END ) AS this_month6,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN this_year_arrears_expected ELSE 0 END ) AS this_month7,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN this_year_arrears_expected ELSE 0 END ) AS this_month8,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN this_year_arrears_expected ELSE 0 END ) AS this_month9,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN this_year_arrears_expected ELSE 0 END ) AS this_month10,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN this_year_arrears_expected ELSE 0 END ) AS this_month11,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN this_year_arrears_expected ELSE 0 END ) AS this_month12,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN this_year_arrears_expected ELSE 0 END ) AS this_month1,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN this_year_arrears_expected ELSE 0 END ) AS this_month2,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN this_year_arrears_expected ELSE 0 END ) AS this_month3
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month3,
		sum( this_year_actual_collection_money ) AS this_actual_total 
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company) AS E
	LEFT JOIN
	(SELECT 
	C.company,
	history_month4,
	history_month5,
	history_month6,
	history_month7,
	history_month8,
	history_month9,
	history_month10,
	history_month11,
	history_month12,
	history_month1,
	history_month2,
	history_month3,
	history_total,
	history_actual_month4,
	history_actual_month5,
	history_actual_month6,
	history_actual_month7,
	history_actual_month8,
	history_actual_month9,
	history_actual_month10,
	history_actual_month11,
	history_actual_month12,
	history_actual_month1,
	history_actual_month2,
	history_actual_month3,
	history_actual_total
FROM
(SELECT
	A.company,
	IFNULL(history_month4,0) AS history_month4,
	IFNULL(history_month5,0) AS history_month5,
	IFNULL(history_month6,0) AS history_month6,
	IFNULL(history_month7,0) AS history_month7,
	IFNULL(history_month8,0) AS history_month8,
	IFNULL(history_month9,0) AS history_month9,
	IFNULL(history_month10,0) AS history_month10,
	IFNULL(history_month11,0) AS history_month11,
	IFNULL(history_month12,0) AS history_month12,
	IFNULL(history_month1,0) AS history_month1,
	IFNULL(history_month2,0) AS history_month2,
	IFNULL(history_month3,0) AS history_month3,
	IFNULL(history_month4,0)+IFNULL(history_month5,0)+IFNULL(history_month6,0)+IFNULL(history_month7,0)+IFNULL(history_month8,0)+IFNULL(history_month9,0)+IFNULL(history_month10,0)+IFNULL(history_month11,0)+IFNULL(history_month12,0)+IFNULL(history_month1,0)+IFNULL(history_month2,0)+IFNULL(history_month3,0) AS history_total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN history_arrears_expected ELSE 0 END ) AS history_month4,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN history_arrears_expected ELSE 0 END ) AS history_month5,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN history_arrears_expected ELSE 0 END ) AS history_month6,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN history_arrears_expected ELSE 0 END ) AS history_month7,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN history_arrears_expected ELSE 0 END ) AS history_month8,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN history_arrears_expected ELSE 0 END ) AS history_month9,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN history_arrears_expected ELSE 0 END ) AS history_month10,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN history_arrears_expected ELSE 0 END ) AS history_month11,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN history_arrears_expected ELSE 0 END ) AS history_month12,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN history_arrears_expected ELSE 0 END ) AS history_month1,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN history_arrears_expected ELSE 0 END ) AS history_month2,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN history_arrears_expected ELSE 0 END ) AS history_month3
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month3,
		sum( this_year_actual_collection_money ) AS history_actual_total 
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company) AS F
	ON E.company=F.company
	ORDER BY field(E.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //设备总欠款预收实收按月汇总
        $result48= Db::query("
        SELECT
E.company,
this_month4+history_month4 AS month4,
this_actual_month4+history_actual_month4 AS actual_month4,
this_month5+history_month5 AS month5,
this_actual_month5+history_actual_month5 AS actual_month5,
this_month6+history_month6 AS month6,
this_actual_month6+history_actual_month6 AS actual_month6,
this_month7+history_month7 AS month7,
this_actual_month7+history_actual_month7 AS actual_month7,
this_month8+history_month8 AS month8,
this_actual_month8+history_actual_month8 AS actual_month8,
this_month9+history_month9 AS month9,
this_actual_month9+history_actual_month9 AS actual_month9,
this_month10+history_month10 AS month10,
this_actual_month10+history_actual_month10 AS actual_month10,
this_month11+history_month11 AS month11,
this_actual_month11+history_actual_month11 AS actual_month11,
this_month12+history_month12 AS month12,
this_actual_month12+history_actual_month12 AS actual_month12,
this_month1+history_month1 AS month1,
this_actual_month1+history_actual_month1 AS actual_month1,
this_month2+history_month2 AS month2,
this_actual_month2+history_actual_month2 AS actual_month2,
this_month3+history_month3 AS month3,
this_actual_month3+history_actual_month3 AS actual_month3
FROM
(SELECT 
	C.company,
	this_month4,
	this_month5,
	this_month6,
	this_month7,
	this_month8,
	this_month9,
	this_month10,
	this_month11,
	this_month12,
	this_month1,
	this_month2,
	this_month3,
	this_total,
	this_actual_month4,
	this_actual_month5,
	this_actual_month6,
	this_actual_month7,
	this_actual_month8,
	this_actual_month9,
	this_actual_month10,
	this_actual_month11,
	this_actual_month12,
	this_actual_month1,
	this_actual_month2,
	this_actual_month3,
	this_actual_total
FROM
(SELECT
	A.company,
	IFNULL(this_month4,0) AS this_month4,
	IFNULL(this_month5,0) AS this_month5,
	IFNULL(this_month6,0) AS this_month6,
	IFNULL(this_month7,0) AS this_month7,
	IFNULL(this_month8,0) AS this_month8,
	IFNULL(this_month9,0) AS this_month9,
	IFNULL(this_month10,0) AS this_month10,
	IFNULL(this_month11,0) AS this_month11,
	IFNULL(this_month12,0) AS this_month12,
	IFNULL(this_month1,0) AS this_month1,
	IFNULL(this_month2,0) AS this_month2,
	IFNULL(this_month3,0) AS this_month3,
	IFNULL(this_month4,0)+IFNULL(this_month5,0)+IFNULL(this_month6,0)+IFNULL(this_month7,0)+IFNULL(this_month8,0)+IFNULL(this_month9,0)+IFNULL(this_month10,0)+IFNULL(this_month11,0)+IFNULL(this_month12,0)+IFNULL(this_month1,0)+IFNULL(this_month2,0)+IFNULL(this_month3,0) AS this_total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN this_year_arrears_expected ELSE 0 END ) AS this_month4,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN this_year_arrears_expected ELSE 0 END ) AS this_month5,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN this_year_arrears_expected ELSE 0 END ) AS this_month6,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN this_year_arrears_expected ELSE 0 END ) AS this_month7,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN this_year_arrears_expected ELSE 0 END ) AS this_month8,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN this_year_arrears_expected ELSE 0 END ) AS this_month9,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN this_year_arrears_expected ELSE 0 END ) AS this_month10,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN this_year_arrears_expected ELSE 0 END ) AS this_month11,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN this_year_arrears_expected ELSE 0 END ) AS this_month12,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN this_year_arrears_expected ELSE 0 END ) AS this_month1,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN this_year_arrears_expected ELSE 0 END ) AS this_month2,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN this_year_arrears_expected ELSE 0 END ) AS this_month3
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end'  
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN this_year_actual_collection_money ELSE 0 END ) AS this_actual_month3,
		sum( this_year_actual_collection_money ) AS this_actual_total 
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company) AS E
	LEFT JOIN
	(SELECT 
	C.company,
	history_month4,
	history_month5,
	history_month6,
	history_month7,
	history_month8,
	history_month9,
	history_month10,
	history_month11,
	history_month12,
	history_month1,
	history_month2,
	history_month3,
	history_total,
	history_actual_month4,
	history_actual_month5,
	history_actual_month6,
	history_actual_month7,
	history_actual_month8,
	history_actual_month9,
	history_actual_month10,
	history_actual_month11,
	history_actual_month12,
	history_actual_month1,
	history_actual_month2,
	history_actual_month3,
	history_actual_total
FROM
(SELECT
	A.company,
	IFNULL(history_month4,0) AS history_month4,
	IFNULL(history_month5,0) AS history_month5,
	IFNULL(history_month6,0) AS history_month6,
	IFNULL(history_month7,0) AS history_month7,
	IFNULL(history_month8,0) AS history_month8,
	IFNULL(history_month9,0) AS history_month9,
	IFNULL(history_month10,0) AS history_month10,
	IFNULL(history_month11,0) AS history_month11,
	IFNULL(history_month12,0) AS history_month12,
	IFNULL(history_month1,0) AS history_month1,
	IFNULL(history_month2,0) AS history_month2,
	IFNULL(history_month3,0) AS history_month3,
	IFNULL(history_month4,0)+IFNULL(history_month5,0)+IFNULL(history_month6,0)+IFNULL(history_month7,0)+IFNULL(history_month8,0)+IFNULL(history_month9,0)+IFNULL(history_month10,0)+IFNULL(history_month11,0)+IFNULL(history_month12,0)+IFNULL(history_month1,0)+IFNULL(history_month2,0)+IFNULL(history_month3,0) AS history_total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN history_arrears_expected ELSE 0 END ) AS history_month4,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN history_arrears_expected ELSE 0 END ) AS history_month5,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN history_arrears_expected ELSE 0 END ) AS history_month6,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN history_arrears_expected ELSE 0 END ) AS history_month7,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN history_arrears_expected ELSE 0 END ) AS history_month8,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN history_arrears_expected ELSE 0 END ) AS history_month9,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN history_arrears_expected ELSE 0 END ) AS history_month10,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN history_arrears_expected ELSE 0 END ) AS history_month11,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN history_arrears_expected ELSE 0 END ) AS history_month12,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN history_arrears_expected ELSE 0 END ) AS history_month1,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN history_arrears_expected ELSE 0 END ) AS history_month2,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN history_arrears_expected ELSE 0 END ) AS history_month3
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN history_actual_collection_money ELSE 0 END ) AS history_actual_month3,
		sum( this_year_actual_collection_money ) AS history_actual_total 
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company) AS F
	ON E.company=F.company
	ORDER BY field(E.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //安装当年欠款预收实收按月汇总
        $result49= Db::query("
/** @lang text */
    SELECT 
	C.company,
	month4,
	month5,
	month6,
	month7,
	month8,
	month9,
	month10,
	month11,
	month12,
	month1,
	month2,
	month3,
	total,
	actual_month4,
	actual_month5,
	actual_month6,
	actual_month7,
	actual_month8,
	actual_month9,
	actual_month10,
	actual_month11,
	actual_month12,
	actual_month1,
	actual_month2,
	actual_month3,
	actual_total
FROM
(SELECT
	A.company,
	IFNULL(month4,0) AS month4,
	IFNULL(month5,0) AS month5,
	IFNULL(month6,0) AS month6,
	IFNULL(month7,0) AS month7,
	IFNULL(month8,0) AS month8,
	IFNULL(month9,0) AS month9,
	IFNULL(month10,0) AS month10,
	IFNULL(month11,0) AS month11,
	IFNULL(month12,0) AS month12,
	IFNULL(month1,0) AS month1,
	IFNULL(month2,0) AS month2,
	IFNULL(month3,0) AS month3,
	IFNULL(month4,0)+IFNULL(month5,0)+IFNULL(month6,0)+IFNULL(month7,0)+IFNULL(month8,0)+IFNULL(month9,0)+IFNULL(month10,0)+IFNULL(month11,0)+IFNULL(month12,0)+IFNULL(month1,0)+IFNULL(month2,0)+IFNULL(month3,0) AS total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN this_year_arrears_expected ELSE 0 END ) AS month4,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN this_year_arrears_expected ELSE 0 END ) AS month5,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN this_year_arrears_expected ELSE 0 END ) AS month6,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN this_year_arrears_expected ELSE 0 END ) AS month7,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN this_year_arrears_expected ELSE 0 END ) AS month8,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN this_year_arrears_expected ELSE 0 END ) AS month9,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN this_year_arrears_expected ELSE 0 END ) AS month10,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN this_year_arrears_expected ELSE 0 END ) AS month11,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN this_year_arrears_expected ELSE 0 END ) AS month12,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN this_year_arrears_expected ELSE 0 END ) AS month1,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN this_year_arrears_expected ELSE 0 END ) AS month2,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN this_year_arrears_expected ELSE 0 END ) AS month3
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month3,
		sum( this_year_actual_collection_money ) AS actual_total 
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company
	ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //安装历史欠款预收实收按月汇总
        $result50= Db::query("
/** @lang text */
    SELECT 
	C.company,
	month4,
	month5,
	month6,
	month7,
	month8,
	month9,
	month10,
	month11,
	month12,
	month1,
	month2,
	month3,
	total,
	actual_month4,
	actual_month5,
	actual_month6,
	actual_month7,
	actual_month8,
	actual_month9,
	actual_month10,
	actual_month11,
	actual_month12,
	actual_month1,
	actual_month2,
	actual_month3,
	actual_total
FROM
(SELECT
	A.company,
	IFNULL(month4,0) AS month4,
	IFNULL(month5,0) AS month5,
	IFNULL(month6,0) AS month6,
	IFNULL(month7,0) AS month7,
	IFNULL(month8,0) AS month8,
	IFNULL(month9,0) AS month9,
	IFNULL(month10,0) AS month10,
	IFNULL(month11,0) AS month11,
	IFNULL(month12,0) AS month12,
	IFNULL(month1,0) AS month1,
	IFNULL(month2,0) AS month2,
	IFNULL(month3,0) AS month3,
	IFNULL(month4,0)+IFNULL(month5,0)+IFNULL(month6,0)+IFNULL(month7,0)+IFNULL(month8,0)+IFNULL(month9,0)+IFNULL(month10,0)+IFNULL(month11,0)+IFNULL(month12,0)+IFNULL(month1,0)+IFNULL(month2,0)+IFNULL(month3,0) AS total
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN history_arrears_expected ELSE 0 END ) AS month4,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN history_arrears_expected ELSE 0 END ) AS month5,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN history_arrears_expected ELSE 0 END ) AS month6,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN history_arrears_expected ELSE 0 END ) AS month7,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN history_arrears_expected ELSE 0 END ) AS month8,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN history_arrears_expected ELSE 0 END ) AS month9,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN history_arrears_expected ELSE 0 END ) AS month10,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN history_arrears_expected ELSE 0 END ) AS month11,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN history_arrears_expected ELSE 0 END ) AS month12,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN history_arrears_expected ELSE 0 END ) AS month1,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN history_arrears_expected ELSE 0 END ) AS month2,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN history_arrears_expected ELSE 0 END ) AS month3
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN history_actual_collection_money ELSE 0 END ) AS actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN history_actual_collection_money ELSE 0 END ) AS actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN history_actual_collection_money ELSE 0 END ) AS actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN history_actual_collection_money ELSE 0 END ) AS actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN history_actual_collection_money ELSE 0 END ) AS actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN history_actual_collection_money ELSE 0 END ) AS actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN history_actual_collection_money ELSE 0 END ) AS actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN history_actual_collection_money ELSE 0 END ) AS actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN history_actual_collection_money ELSE 0 END ) AS actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN history_actual_collection_money ELSE 0 END ) AS actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN history_actual_collection_money ELSE 0 END ) AS actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN history_actual_collection_money ELSE 0 END ) AS actual_month3,
		sum( this_year_actual_collection_money ) AS actual_total 
	FROM
		helc_installarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company
	ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //设备当年欠款预收实收按月汇总
        $result51= Db::query("
/** @lang text */
    SELECT 
	C.company,
	month4,
	month5,
	month6,
	month7,
	month8,
	month9,
	month10,
	month11,
	month12,
	month1,
	month2,
	month3,
	actual_month4,
	actual_month5,
	actual_month6,
	actual_month7,
	actual_month8,
	actual_month9,
	actual_month10,
	actual_month11,
	actual_month12,
	actual_month1,
	actual_month2,
	actual_month3
FROM
(SELECT
	A.company,
	IFNULL(month4,0) AS month4,
	IFNULL(month5,0) AS month5,
	IFNULL(month6,0) AS month6,
	IFNULL(month7,0) AS month7,
	IFNULL(month8,0) AS month8,
	IFNULL(month9,0) AS month9,
	IFNULL(month10,0) AS month10,
	IFNULL(month11,0) AS month11,
	IFNULL(month12,0) AS month12,
	IFNULL(month1,0) AS month1,
	IFNULL(month2,0) AS month2,
	IFNULL(month3,0) AS month3
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN this_year_arrears_expected ELSE 0 END ) AS month4,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN this_year_arrears_expected ELSE 0 END ) AS month5,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN this_year_arrears_expected ELSE 0 END ) AS month6,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN this_year_arrears_expected ELSE 0 END ) AS month7,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN this_year_arrears_expected ELSE 0 END ) AS month8,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN this_year_arrears_expected ELSE 0 END ) AS month9,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN this_year_arrears_expected ELSE 0 END ) AS month10,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN this_year_arrears_expected ELSE 0 END ) AS month11,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN this_year_arrears_expected ELSE 0 END ) AS month12,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN this_year_arrears_expected ELSE 0 END ) AS month1,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN this_year_arrears_expected ELSE 0 END ) AS month2,
		sum( CASE WHEN MONTH ( this_year_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN this_year_arrears_expected ELSE 0 END ) AS month3
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month4,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN this_year_actual_collection_money ELSE 0 END ) AS actual_month3
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company
	ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //设备历史欠款预收实收按月汇总
        $result52= Db::query("
/** @lang text */
    SELECT 
	C.company,
	month4,
	month5,
	month6,
	month7,
	month8,
	month9,
	month10,
	month11,
	month12,
	month1,
	month2,
	month3,
	actual_month4,
	actual_month5,
	actual_month6,
	actual_month7,
	actual_month8,
	actual_month9,
	actual_month10,
	actual_month11,
	actual_month12,
	actual_month1,
	actual_month2,
	actual_month3
FROM
(SELECT
	A.company,
	IFNULL(month4,0) AS month4,
	IFNULL(month5,0) AS month5,
	IFNULL(month6,0) AS month6,
	IFNULL(month7,0) AS month7,
	IFNULL(month8,0) AS month8,
	IFNULL(month9,0) AS month9,
	IFNULL(month10,0) AS month10,
	IFNULL(month11,0) AS month11,
	IFNULL(month12,0) AS month12,
	IFNULL(month1,0) AS month1,
	IFNULL(month2,0) AS month2,
	IFNULL(month3,0) AS month3
FROM
	( SELECT DISTINCT ( SUBSTRING( company, 1, 2 ) ) AS company FROM helc_sdcompanyindex WHERE fyear = '$fyear' ) AS A
	LEFT JOIN (
	SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='5' AND MONTH ( comprehensive_month ) = '4' THEN history_arrears_expected ELSE 0 END ) AS month5,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='6' AND MONTH ( comprehensive_month ) = '5' THEN history_arrears_expected ELSE 0 END ) AS month6,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='7' AND MONTH ( comprehensive_month ) = '6' THEN history_arrears_expected ELSE 0 END ) AS month7,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='8' AND MONTH ( comprehensive_month ) = '7' THEN history_arrears_expected ELSE 0 END ) AS month8,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='9' AND MONTH ( comprehensive_month ) = '8' THEN history_arrears_expected ELSE 0 END ) AS month9,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='10' AND MONTH ( comprehensive_month ) = '9' THEN history_arrears_expected ELSE 0 END ) AS month10,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='11' AND MONTH ( comprehensive_month ) = '10' THEN history_arrears_expected ELSE 0 END ) AS month11,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='12' AND MONTH ( comprehensive_month ) = '11' THEN history_arrears_expected ELSE 0 END ) AS month12,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='1' AND MONTH ( comprehensive_month ) = '12' THEN history_arrears_expected ELSE 0 END ) AS month1,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='2' AND MONTH ( comprehensive_month ) = '1' THEN history_arrears_expected ELSE 0 END ) AS month2,
		sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='3' AND MONTH ( comprehensive_month ) = '2' THEN history_arrears_expected ELSE 0 END ) AS month3,
	    sum( CASE WHEN MONTH ( history_arrears_expected_collection_date ) ='4' AND MONTH ( comprehensive_month ) = '3' THEN history_arrears_expected ELSE 0 END ) AS month4   
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
		AND this_year_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
		OR history_arrears_expected_collection_date BETWEEN '$fyear_start' AND '$fyear_end' 
	GROUP BY
		company WITH ROLLUP 
	) AS B ON A.company = B.company) AS C
	LEFT JOIN
	(SELECT
		IFNULL( SUBSTRING( company, 1, 2 ), '合计' ) AS company,
		
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '4' THEN history_actual_collection_money ELSE 0 END ) AS actual_month5,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '5' THEN history_actual_collection_money ELSE 0 END ) AS actual_month6,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '6' THEN history_actual_collection_money ELSE 0 END ) AS actual_month7,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '7' THEN history_actual_collection_money ELSE 0 END ) AS actual_month8,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '8' THEN history_actual_collection_money ELSE 0 END ) AS actual_month9,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '9' THEN history_actual_collection_money ELSE 0 END ) AS actual_month10,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '10' THEN history_actual_collection_money ELSE 0 END ) AS actual_month11,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '11' THEN history_actual_collection_money ELSE 0 END ) AS actual_month12,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '12' THEN history_actual_collection_money ELSE 0 END ) AS actual_month1,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '1' THEN history_actual_collection_money ELSE 0 END ) AS actual_month2,
		sum( CASE WHEN MONTH ( comprehensive_month ) = '2' THEN history_actual_collection_money ELSE 0 END ) AS actual_month3,
		sum( CASE WHEN  MONTH ( comprehensive_month ) = '3' THEN history_actual_collection_money ELSE 0 END ) AS actual_month4
	FROM
		helc_equipmentarrears 
	WHERE
		fyear='$fyear'
	GROUP BY
		company WITH ROLLUP) AS D
	ON C.company=D.company
	ORDER BY field(C.company,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
        ");
        //本地大客户TOP20欠款
        $result53= Db::query("
/** @lang text */
    SELECT 
	customer_abbreviation,
	equipment,
	install,
	total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='本地大客户'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='本地大客户'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
UNION
SELECT 
'合计' AS customer_abbreviation,
SUM(equipment) AS equipment,
SUM(install) AS install,
SUM(total) AS total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='本地大客户'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='本地大客户'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
        ");
        //KA客户TOP20欠款
        $result54= Db::query("
/** @lang text */
    SELECT 
	customer_abbreviation,
	equipment,
	install,
	total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='KA客户'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='KA客户'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
UNION
SELECT 
'合计' AS customer_abbreviation,
SUM(equipment) AS equipment,
SUM(install) AS install,
SUM(total) AS total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='KA客户'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='KA客户'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
        ");
        //总包客户TOP20欠款
        $result60= Db::query("
/** @lang text */
    SELECT 
	customer_abbreviation,
	equipment,
	install,
	total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='总包'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='总包'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
UNION
SELECT 
'合计' AS customer_abbreviation,
SUM(equipment) AS equipment,
SUM(install) AS install,
SUM(total) AS total
FROM
(SELECT A.customer_abbreviation,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer_abbreviation,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='总包'
GROUP BY customer_abbreviation) AS A
LEFT JOIN
(SELECT customer_abbreviation,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='总包'
GROUP BY customer_abbreviation) AS B
ON A.customer_abbreviation=B.customer_abbreviation
ORDER BY total DESC LIMIT 20) AS C
        ");
        //保养站KPI完成情况
        $result55= Db::name('stationmaster_kpi')
            ->where('active_status', '=', '1')
            ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处')")
            ->select();
        //生效台量按月汇总
        $result56= Db::query("
/** @lang text */
         SELECT 
            '山东指标' AS type,
            '931' AS month4,
            '802' AS month5,
            '857' AS month6,
            '1240' AS month7,
            '1280' AS month8,
            '1289' AS month9,
            '887' AS month10,
            '938' AS month11,
            '934' AS month12,
            '1196' AS month1,
            '1127' AS month2,
            '1259' AS month3,
            '12740' AS total 
        FROM
            helc_time
        WHERE status=1
	    UNION
         SELECT
		'山东生效' AS type,
		sum( CASE MONTH ( into_force_date ) WHEN '4' THEN 1 ELSE 0 END ) AS month4,
		sum( CASE MONTH ( into_force_date ) WHEN '5' THEN 1 ELSE 0 END ) AS month5,
		sum( CASE MONTH ( into_force_date ) WHEN '6' THEN 1 ELSE 0 END ) AS month6,
		sum( CASE MONTH ( into_force_date ) WHEN '7' THEN 1 ELSE 0 END ) AS month7,
		sum( CASE MONTH ( into_force_date ) WHEN '8' THEN 1 ELSE 0 END ) AS month8,
		sum( CASE MONTH ( into_force_date ) WHEN '9' THEN 1 ELSE 0 END ) AS month9,
		sum( CASE MONTH ( into_force_date ) WHEN '10' THEN 1 ELSE 0 END ) AS month10,
		sum( CASE MONTH ( into_force_date ) WHEN '11' THEN 1 ELSE 0 END ) AS month11,
		sum( CASE MONTH ( into_force_date ) WHEN '12' THEN 1 ELSE 0 END ) AS month12,
		sum( CASE MONTH ( into_force_date ) WHEN '1' THEN 1 ELSE 0 END ) AS month1,
		sum( CASE MONTH ( into_force_date ) WHEN '2' THEN 1 ELSE 0 END ) AS month2,
		sum( CASE MONTH ( into_force_date ) WHEN '3' THEN 1 ELSE 0 END ) AS month3,
		sum( 1 ) AS total 
	FROM
		helc_product 
	WHERE
		STATUS = '正常' 
		AND sd_status = '正常' 
		AND if_into_force = '是' 
		AND into_force_date BETWEEN '$fyear_start' AND '$fyear_end' 
	UNION
    	 SELECT
		'总部指标' AS type,
		'1124' AS month4,
		'1172' AS month5,
		'1173' AS month6,
		'1226' AS month7,
		'1164' AS month8,
		'1214' AS month9,
		'845' AS month10,
		'1190' AS month11,
		'1151' AS month12,
		'926' AS month1,
		'440' AS month2,
		'1115' AS month3,
		'12740' AS total 
	FROM
		helc_time
	WHERE status=1
    UNION
	 SELECT
		'总部报出' AS type,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '4' THEN 1 ELSE 0 END ) AS month4,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '5' THEN 1 ELSE 0 END ) AS month5,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '6' THEN 1 ELSE 0 END ) AS month6,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '7' THEN 1 ELSE 0 END ) AS month7,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '8' THEN 1 ELSE 0 END ) AS month8,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '9' THEN 1 ELSE 0 END ) AS month9,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '10' THEN 1 ELSE 0 END ) AS month10,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '11' THEN 1 ELSE 0 END ) AS month11,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '12' THEN 1 ELSE 0 END ) AS month12,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '1' THEN 1 ELSE 0 END ) AS month1,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '2' THEN 1 ELSE 0 END ) AS month2,
		sum( CASE MONTH ( helc_product.statistical_date ) WHEN '3' THEN 1 ELSE 0 END ) AS month3,
		sum( 1 ) AS total 
	FROM
		helc_product,helc_contract
	WHERE
      helc_product.contract_id=helc_contract.contract_id
	  AND helc_contract.province='山东省'
	  AND helc_product.statistical_date BETWEEN '$fyear_start' AND '$fyear_end'
        ");
        //预计新增欠款
        $result57= Db::query("
/** @lang text */
SELECT scompany,install_predict_arrears,equipment_predict_arrears,install_predict_arrears+equipment_predict_arrears AS all_predict
FROM helc_sdcompanyindex
WHERE year=$fyear
ORDER BY field(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //普通客户TOP20
        $result59=Db::query("
/** @lang text */
 SELECT 
	customer,
	scompany,
	equipment,
	install,
	total
FROM
(SELECT A.customer,A.scompany,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer,scompany,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='普通客户'
GROUP BY customer) AS A
LEFT JOIN
(SELECT customer,scompany,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='普通客户'
GROUP BY customer) AS B
ON A.customer=B.customer
ORDER BY total DESC LIMIT 20) AS C
UNION
SELECT 
'合计' AS customer,
scompany,
SUM(equipment) AS equipment,
SUM(install) AS install,
SUM(total) AS total
FROM
(SELECT A.customer,A.scompany,A.equipment,IFNULL(B.`install`,0) AS install,(A.equipment+IFNULL(B.`install`,0)) AS total FROM (SELECT customer,scompany,SUM(expire_arrears) AS equipment FROM helc_equipment_arrears
WHERE active_status=1 AND customer_classification='普通客户'
GROUP BY customer) AS A
LEFT JOIN
(SELECT customer,scompany,SUM(expire_arrears) AS install FROM helc_install_arrears
WHERE active_status=1 AND customer_classification='普通客户'
GROUP BY customer) AS B
ON A.customer=B.customer
ORDER BY total DESC LIMIT 20) AS C
        ");

        // 向V层传数据
        $this->assign('result', $result);
        $this->assign('result6', $result6);
        $this->assign('result8', $result8);
        $this->assign('result11', $result11);
        $this->assign('result12', $result12);
        $this->assign('result17', $result17);
        $this->assign('result18', $result18);
        $this->assign('result19', $result19);
        $this->assign('result20', $result20);
        $this->assign('result21', $result21);
        $this->assign('result22', $result22);
        $this->assign('result24', $result24);
        $this->assign('result26', $result26);
        $this->assign('result27', $result27);
        $this->assign('result28', $result28);
        $this->assign('result29', $result29);
        $this->assign('result30', $result30);
        $this->assign('result31', $result31);
        $this->assign('result32', $result32);
        $this->assign('result35', $result35);
        $this->assign('result36', $result36);
        $this->assign('result37', $result37);
        $this->assign('result38', $result38);
        $this->assign('result39', $result39);
        $this->assign('result40', $result40);
        $this->assign('result41', $result41);
        $this->assign('result42', $result42);
        $this->assign('result43', $result43);
        $this->assign('result45', $result45);
        $this->assign('result46', $result46);
        $this->assign('result47', $result47);
        $this->assign('result48', $result48);
        $this->assign('result49', $result49);
        $this->assign('result50', $result50);
        $this->assign('result51', $result51);
        $this->assign('result52', $result52);
        $this->assign('result53', $result53);
        $this->assign('result54', $result54);
        $this->assign('result55', $result55);
        $this->assign('result56', $result56);
        $this->assign('result57', $result57);
        $this->assign('result58', $result58);
        $this->assign('result59', $result59);
        $this->assign('result60', $result60);
        $this->display();
        return $this->fetch();
    }
    public function report(){
        // 从分公司指标表里查询数据
        $fyear = Session::get('fyear');
        $result= Db::query("
/** @lang text */
select * from helc_sdcompanyindex where year = '$fyear'
        ORDER BY field(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        $this->assign('result', $result);
        $this->display();
        return $this->fetch();
    }
    public function history(){
        // 从分公司指标表里查询数据
        //$fyear = Session::get('fyear');
        $fyear=input('fyear');
        Session::set('fyear',$fyear);
        $result= Db::query("
/** @lang text */
select * from helc_sdcompanyindex where year = '$fyear'
        ORDER BY field(scompany,'青岛','济南','潍坊','烟台','临沂','济宁','东营','德州','菏泽','合计')
");
        //维保台量
        try {
            $result1 = Db::name('maintain')
                ->where('fyear', '=', $fyear)
                ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        //保养销售入金
        try {
            $result2 = Db::name('maintain')
                ->where('fyear', '=', $fyear)
                ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        //维改销售入金
        try {
            $result3 = Db::name('maintain')
                ->where('fyear', 'like', '%' . $fyear . '%')
                ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        //保养成本
        try {
            $result4 = Db::name('maintain')
                ->where('fyear', 'like', '%' . $fyear . '%')
                ->order("field(company,'青岛分公司','济南大区','潍坊分公司','烟台分公司','临沂分公司','济宁分公司','东营分公司','德州分公司','菏泽办事处','合计')")
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $this->assign('result', $result);
        $this->assign('result1', $result1);
        $this->assign('result2', $result2);
        $this->assign('result3', $result3);
        $this->assign('result4', $result4);
        $this->display();
        return $this->fetch();
    }
/*
 * 清空数据表中所有数据
 * 逻辑运算
 * */
    public function admin(){
        return $this->fetch();
    }
}
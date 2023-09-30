<?php
/**
 * Created by PhpStorm.
 * User: Gengchuantao
 * Date: 2018/4/23
 * Time: 7:24
 */

namespace app\index\controller;
use app\common\model\Buscore;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;

class BuscoreController extends IndexController
{
    public function index(){

        // 获取查询信息
        $bu_name = Request::instance()->get('bu_name');

        $pageSize = 100; // 每页显示5条数据
        $status =1;

        // 实例化Teacher
        $Buscore = new Buscore;

        // 按条件查询数据并调用分页
        $buscores = $Buscore
            ->where('bu_name', 'like', '%' . $bu_name . '%')
            ->where('status', 'like', '%' . $status . '%')
            ->order('score desc')
            ->paginate($pageSize, false, [
            'query'=>[
                'bu_name' => $bu_name,
            ],
        ]);

        // 向V层传数据
        $this->assign('buscores', $buscores);

        // 取回打包后的数据
        $htmls = $this->fetch();

        // 将数据返回给用户
        return $htmls;
    }
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function GetBuScoreInfo(){
        $fyear = Session::get('fyear');
        // 获取分公司名称
        $company = Session::get('company');
        $data = new \ArrayObject();
        if ($company=='山东分公司') {
            $data = Db::name('buscore')
                ->where('year', '=', $fyear)
                ->where('status', '=', '1')
                ->select();
        }else{
            $data = Db::name('buscore')
                ->where('year', '=', $fyear)
                ->where('company', '=', $company)
                ->where('status', '=', '1')
                ->select();
        }

        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function report(){

        // 获取事业部名称
        $staff_bu = Session::get('staff_bu');
        $fyear = Session::get('fyear');
        // 获取分公司名称
        $company = Session::get('company');
        //事业部总体得分
        if ($company=='山东分公司') {
            $result1= Db::query("
            SELECT * FROM(SELECT rank,bu_sname,FORMAT(intoforce_score,2) AS intoforce_score,FORMAT(install_score,2) AS install_score,FORMAT(thisyear_score,2) AS thisyear_score,convert(history_score, decimal(12,2)) AS history_score,convert(score, decimal(12,2)) AS score,convert(quote_score, decimal(12,2)) AS quote_score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY score DESC) AS A
UNION
SELECT '' AS rank,'平均' AS bu_sname,FORMAT(AVG(intoforce_score),2) AS intoforce_score,FORMAT(AVG(install_score),2) AS install_score,FORMAT(AVG(thisyear_score),2) AS thisyear_score,FORMAT(AVG(history_score),2) AS history_score,FORMAT(AVG(score),2) AS score,convert(quote_score, decimal(12,2)) AS quote_score,'' AS company
FROM helc_buscore
WHERE year='$fyear' AND status=1
            ");
            //生效
            $result2= Db::query("
SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //完工
            $result3= Db::query("
SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result4= Db::query("
SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result5= Db::query("
SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE  year='$fyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result6= Db::query("
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$fyear' AND status = 1 ORDER BY quote_score DESC
");
        }else{
            //事业部总得分
            $result1= Db::query("
SELECT rank,bu_sname,intoforce_score,install_score,thisyear_score,history_score,quote_score,convert(score, decimal(12,2)) AS score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY score DESC
");
            //生效得分
            $result2= Db::query("SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //安装得分
            $result3= Db::query("SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore
WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result4= Db::query("SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result5= Db::query("SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result6= Db::query("
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$fyear' AND status = 1 ORDER BY quote_score DESC
");
        }

        // 向V层传数据
        $this->assign('result1', $result1);
        $this->assign('result2', $result2);
        $this->assign('result3', $result3);
        $this->assign('result4', $result4);
        $this->assign('result5', $result5);
        $this->assign('result6', $result6);
        $this->display();
        $htmls = $this->fetch();
        return $htmls;
    }
    public function olddata(){

        // 获取事业部名称
        $staff_bu = Session::get('staff_bu');
        $lastfyear = Session::get('last_fyear');
        // 获取分公司名称
        $company = Session::get('company');
        //事业部总体得分
        if ($company=='山东分公司') {
            $result1= Db::query("
            SELECT * FROM(SELECT rank,bu_sname,FORMAT(intoforce_score,2) AS intoforce_score,FORMAT(install_score,2) AS install_score,FORMAT(thisyear_score,2) AS thisyear_score,convert(history_score, decimal(12,2)) AS history_score,convert(score, decimal(12,2)) AS score,convert(quote_score, decimal(12,2)) AS quote_score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE year='$lastfyear' AND status = 1 ORDER BY score DESC) AS A
UNION
SELECT '' AS rank,'平均' AS bu_sname,FORMAT(AVG(intoforce_score),2) AS intoforce_score,FORMAT(AVG(install_score),2) AS install_score,FORMAT(AVG(thisyear_score),2) AS thisyear_score,FORMAT(AVG(history_score),2) AS history_score,FORMAT(AVG(score),2) AS score,convert(quote_score, decimal(12,2)) AS quote_score,'' AS company
FROM helc_buscore
WHERE year='$lastfyear' AND status=1
            ");
            //生效
            $result2= Db::query("
SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion FROM helc_buscore WHERE year='$lastfyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //完工
            $result3= Db::query("
SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$lastfyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result4= Db::query("
SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$lastfyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result5= Db::query("
SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE  year='$lastfyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result6= Db::query("
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE year='$lastfyear' AND status = 1 ORDER BY quote_score DESC
");
        }else{
            //事业部总得分
            $result1= Db::query("
SELECT rank,bu_sname,intoforce_score,install_score,thisyear_score,history_score,quote_score,convert(score, decimal(12,2)) AS score,SUBSTR(company,1,2) AS company FROM helc_buscore WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY score DESC
");
            //生效得分
            $result2= Db::query("SELECT intoforce_rank,bu_sname,intoforce_index,intoforce_complete,FORMAT(intoforce_rate,2) AS intoforce_rate,convert(intoforce_score, decimal(12,2)) AS intoforce_score,SUBSTR(company,1,2) AS company,ROUND(company_avg,2) AS company_avg,intoforce_price,conversion 
FROM helc_buscore WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY intoforce_score DESC
");
            //安装得分
            $result3= Db::query("SELECT install_rank,bu_sname,install_index,install_complete,FORMAT(install_rate,2) AS install_rate,convert(install_score, decimal(12,2)) AS install_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore
WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY install_score DESC
");
            //当年欠款
            $result4= Db::query("SELECT thisyear_rank,bu_sname,convert(eq_amount, decimal(12,2)) AS eq_amount,convert(eq_thisyear_arrears, decimal(12,2)) AS eq_thisyear_arrears,FORMAT(eq_thisyear_rate,2) AS eq_thisyear_rate,convert(in_amount, decimal(12,2)) AS in_amount,convert(in_thisyear_arrears, decimal(12,2)) AS in_thisyear_arrears,FORMAT(in_thisyear_rate,2) AS in_thisyear_rate,convert(thisyear_score, decimal(12,2)) AS thisyear_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY thisyear_score DESC
");
            //历史欠款
            $result5= Db::query("SELECT history_rank,bu_sname,eq_recovery,eq_arrears_balance,eq_arrears_unsplit,eq_history_rate,in_recovery,in_arrears_balance,in_arrears_unsplit,in_history_rate,history_score,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY history_score DESC
");
            //报价加分项
            $result6= Db::query("
SELECT quote_rank,bu_sname,quote_score,quote_index,quote_complete,bid_index,bid_complete,SUBSTR(company,1,2) AS company 
FROM helc_buscore WHERE company='$company' AND year='$lastfyear' AND status = 1 ORDER BY quote_score DESC
");
        }

        // 向V层传数据
        $this->assign('result1', $result1);
        $this->assign('result2', $result2);
        $this->assign('result3', $result3);
        $this->assign('result4', $result4);
        $this->assign('result5', $result5);
        $this->assign('result6', $result6);
        $this->display();
        return $this->fetch();
    }
}
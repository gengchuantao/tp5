<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Contract;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class ContractController extends IndexController
{
    //-----------------------合同基本信息-----------------------------------------------
    public function index(Request $request){
        $requestData=$request->param();
        $jump_contract_id = $requestData['contract_id'];
        Session::set('jump_contract_id',$jump_contract_id);
        return $this->fetch();
    }

    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function GetContractInfoByCondition(Request $request){
        $requestData=$request->param();
        $id = $requestData['id'];
        $contract_id = $requestData['search_contract_id'];
        $buyer_unit = $requestData['search_buyer_unit'];
        $process = $requestData['search_process'];
        $project_name = $requestData['search_project_name'];
        $customer_abbreviation = $requestData['search_customer_abbreviation'];
        $companys=Session::get('company');
        $jump_contract_id=Session::get('jump_contract_id');
        if(!$jump_contract_id){
            $contract_ids=$contract_id;
        }else{
            $contract_ids=$jump_contract_id;
        }
        if($companys==='山东分公司'){
            $company='';
        }else{
            $company=$companys;
        }
        if(empty($contract_ids) && empty($buyer_unit) && empty($process)&& empty($project_name)&& empty($customer_abbreviation)){
            $data=Db::name('contract')
                ->where('branch', 'like', '%' . $company . '%')
                ->order("field(process,'待提交','待评审','评审中','已过审','已归档','已取消')")
                ->order('id','desc')
                ->limit('100')
                ->find();
        }else{
            $data=Db::name('contract')
                ->where('branch', 'like', '%' . $company . '%')
                ->where('contract_id', 'like', '%' . $contract_ids . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('process', 'like', '%' . $process . '%')
                ->where('project_name', 'like', '%' . $project_name . '%')
                ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
                ->order("field(process,'待提交','待评审','评审中','已过审','已归档','已取消')")
                ->order('id','desc')
                ->limit('100')
                ->select();
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //通过ID获取合同信息
    public function GetContractInfo(){
        $id = $this->request->param("id");
        $data = new \ArrayObject();
        try {
            $data = Db::name('contract')->where('id', '=', $id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //通过合同号获取合同信息
    public function GetContractInfoByContractId(){
        $contract_id = $this->request->param("contract_id");
        $data = new \ArrayObject();
        try {
            $data = Db::name('contract')->where('contract_id', '=', $contract_id)->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*已归档未录入ERP安装合同明细*/
    public function notEnteredERP(){
        $data = new \ArrayObject();
        try {
            $data = Db::query(
                /** @lang text */
                "SELECT 
                        contract_id,
                        contract_num,
                        intoforce_sum,
                        branch,
                        both_seal_date
                    FROM
                        helc_contract 
                    WHERE
                        install_erp_input_status = 0
                        AND both_seal_date BETWEEN '2019-04-01' AND now()
                        AND install_contract_sign='山东司'
                        AND province='山东省'
                        AND contract_status='正常'
                        ORDER BY both_seal_date,branch
        ");
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*一体化安装合同未录入*/
    public function integrationNotEnteredERP(){
        $data = new \ArrayObject();
        try {
            $data = Db::query(
            /** @lang text */
                "SELECT
	DISTINCT(helc_product.contract_id),
	helc_contract.branch
FROM
	helc_product,helc_contract
WHERE 
helc_product.contract_id=helc_contract.contract_id
AND helc_contract.province='山东省'
AND helc_contract.install_contract_sign='总公司'
AND helc_product.`status`='正常'
AND helc_contract.process='已归档'
AND helc_product.install_contract_input_status='N'
        ");
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*系统未录入工号*/
    public function notEnteredProduct(){
        $data = new \ArrayObject();
        try {
            $data = Db::query(
                /** @lang text */
                "
                    SELECT DISTINCT
                        contract_id,
                        branch 
                    FROM
                        helc_contract 
                    WHERE
                        contract_id NOT IN ( SELECT contract_id FROM helc_product GROUP BY contract_id ) 
                        AND sd_approved_date between '2018-04-01' and   now()
                    ORDER BY branch
            ");
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    /*调验保证金未收款*/
    public function checkBailUncollected(){
        $data = new \ArrayObject();
        try {
            $data = Db::name('contract')
                ->where('check_bail', '>', 0)
                ->where(['check_bail_rec_date' => '0000-00-00'])
                ->select();
        } catch (DataNotFoundException $e) {
        } catch (ModelNotFoundException $e) {
        } catch (DbException $e) {
        }
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //修改合同号

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function ChangeContractID($change_contract_id, $old_contract_id, $new_contract_id){
        $contract_data=array(
            'contract_id' => $new_contract_id,
            'id' => $change_contract_id
        );
        $quote_data=array(
            'contract_id' => $new_contract_id
        );
        $check_contract=Db::name('contract')->where(['contract_id' => $new_contract_id])->count();
        $check_quote=Db::name('quote')->where(['contract_id' => $new_contract_id])->count();
        if($check_contract>0 || $check_quote>0){
            return json(0);
        }else{
            $result=Db::name('contract')->update($contract_data);
            $quote_result=Db::query(/** @lang text */ "
                UPDATE helc_quote
                SET contract_id='$new_contract_id'
                WHERE contract_id='$old_contract_id'
            ");
            return json(1);
        }
    }
    //区域提交审核

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function SubmitReview($submit_review_id, $s_contract_id, $s_if_three_party, $s_if_check, $s_before_delivery_per, $s_quality_assurance_per, $s_install_contract_sign, $s_branch_service_points, $s_first_distributor, $s_service_charge_points1, $s_second_distributor, $s_service_charge_points2, $s_clarify){
        $data=array(
            'if_three_party' => $s_if_three_party,
            'if_check' => $s_if_check,
            'before_delivery_per' => $s_before_delivery_per,
            'quality_assurance_per' => $s_quality_assurance_per,
            'install_contract_sign' => $s_install_contract_sign,
            'branch_service_points' => $s_branch_service_points,
            'first_distributor' => $s_first_distributor,
            'service_charge_points1' => $s_service_charge_points1,
            'second_distributor' => $s_second_distributor,
            'service_charge_points2' => $s_service_charge_points2,
            'clarify' => $s_clarify,
            'branch_submit_date' => session::get('today_date'),
            'process' => '待评审',
            'id' => $submit_review_id
        );
        $update_install_company= /** @lang text */
            "UPDATE helc_contract,helc_city SET helc_contract.install_company=helc_city.company WHERE helc_contract.area=helc_city.city AND helc_contract.id='$submit_review_id'";
        $check=Db::name('contract')->where(['id' => $submit_review_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            //更新安装区域
            $results = Db::execute($update_install_company);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //区域修改信息

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function CompanyEdit($submit_review_id, $s_contract_id, $s_if_three_party, $s_if_check, $s_before_delivery_per, $s_quality_assurance_per, $s_install_contract_sign, $s_branch_service_points, $s_first_distributor, $s_service_charge_points1, $s_second_distributor, $s_service_charge_points2, $s_clarify){
        $check=Db::name('contract')->where(['id' => $submit_review_id])->count();
        if($check>0){
            $result=Db::name('contract')->update(array(
                'if_three_party' => $s_if_three_party,
                'if_check' => $s_if_check,
                'before_delivery_per' => $s_before_delivery_per,
                'quality_assurance_per' => $s_quality_assurance_per,
                'install_contract_sign' => $s_install_contract_sign,
                'branch_service_points' => $s_branch_service_points,
                'first_distributor' => $s_first_distributor,
                'service_charge_points1' => $s_service_charge_points1,
                'second_distributor' => $s_second_distributor,
                'service_charge_points2' => $s_service_charge_points2,
                'clarify' => $s_clarify,
                'id' => $submit_review_id
            ));
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //合同部商务审核

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function CommerceReview(Request $request){
        $requestData=$request->param();
        $data=array(
            'technical_assistance_contract_amount' =>  $requestData['c_technical_assistance_contract_amount'],
            'if_three_party' => $requestData['c_if_three_party'],
            'if_check' => $requestData['c_if_check'],
            'before_delivery_per' => $requestData['c_before_delivery_per'],
            'quality_assurance_per' => $requestData['c_quality_assurance_per'],
            'install_contract_sign' => $requestData['c_install_contract_sign'],
            'branch_service_points' =>$requestData['c_branch_service_points'],
            'first_distributor' => $requestData['c_first_distributor'],
            'service_charge_points1' => $requestData['c_service_charge_points1'],
            'second_distributor' => $requestData['c_second_distributor'],
            'service_charge_points2' => $requestData['c_service_charge_points2'],
            'third_distributor' => $requestData['c_third_distributor'],
            'service_charge_points3' => $requestData['c_service_charge_points3'],
            'clarify' => $requestData['c_clarify'],
            'contract_remarks' => $requestData['c_contract_remarks'],
            'supporting_contract_amount' => $requestData['c_supporting_contract_amount'],
            'supporting_expenditure' => $requestData['c_supporting_expenditure'],
            'contract_auditor' => session::get('staff_name'),
            'contract_rec_date' => $requestData['c_contract_rec_date'],
            'audit_date' => session::get('today_date'),
            'process' => '评审中',
            'audit_version' =>  $requestData['c_audit_version']+1,
            'id' => $requestData['commerce_review_id']
        );
        $check=Db::name('contract')
            ->where(['id' => $requestData['commerce_review_id']])
            ->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //合同部修改配套及澄清信息

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function SupportingEdit(Request $request){
        $requestData = $request->param();
        $installation_expenditure = $requestData['c_clarify_cost'] + $requestData['c_supporting_cost']/0.7;
        $data=array(
            'technical_assistance_contract_amount' => $requestData['c_technical_assistance_contract_amount'],
            'service_fee_agreement_status' => $requestData['c_service_fee_agreement_status'],
            'if_three_party' => $requestData['c_if_three_party'],
            'if_check' => $requestData['c_if_check'],
            'before_delivery_per' => $requestData['c_before_delivery_per'],
            'quality_assurance_per' => $requestData['c_quality_assurance_per'],
            'install_contract_sign' => $requestData['c_install_contract_sign'],
            'branch_service_points' => $requestData['c_branch_service_points'],
            'first_distributor' => $requestData['c_first_distributor'],
            'service_charge_points1' => $requestData['c_service_charge_points1'],
            'second_distributor' => $requestData['c_second_distributor'],
            'service_charge_points2' => $requestData['c_service_charge_points2'],
            'third_distributor' => $requestData['c_third_distributor'],
            'service_charge_points3' => $requestData['c_service_charge_points3'],
            'clarify' => $requestData['c_clarify'],
            'contract_remarks' => $requestData['c_contract_remarks'],
            'supporting_contract_amount' => $requestData['c_supporting_contract_amount'],
            'supporting_expenditure' => $requestData['c_supporting_expenditure'],
            'clarify_cost' => $requestData['c_clarify_cost'],
            'supporting_cost' => $requestData['c_supporting_cost'],
            'installation_expenditure' => $installation_expenditure,
            'check_bail' => $requestData['c_check_bail'],
            'check_bail_rec_date' => $requestData['c_check_bail_rec_date'],
            'check_bail_bac_date' => $requestData['c_check_bail_bac_date'],
            'id' => $requestData['commerce_review_id']
        );
        $check=Db::name('contract')->where(['id' => $requestData['commerce_review_id']])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //过审核表
    public function contractApproved(Request $request){
        $requestData = $request->param();
        $today_date=session::get('today_date');
        $data=array(
            'sd_approved_date' => $today_date,
            'process' => '已过审',
            'id' => $requestData['commerce_review_id']
        );
        $check=Db::name('contract')->where(['id' => $requestData['commerce_review_id']])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    /*合同部归档合同*/
    public function ContractFile(Request $request){
        $requestData=$request->param();
        $data=array(
            'clarify' => $requestData['c_clarify'],
            'branch_service_points' => $requestData['c_branch_service_points'],
            'first_distributor' => $requestData['c_first_distributor'],
            'service_charge_points1' => $requestData['c_service_charge_points1'],
            'second_distributor' => $requestData['c_second_distributor'],
            'service_charge_points2' => $requestData['c_service_charge_points2'],
            'contract_remarks' => $requestData['c_contract_remarks'],
            'both_seal_date' => $requestData['c_both_seal_date'],
            'process' => '已归档',
            'id' => $requestData['commerce_review_id']
        );
        $check=Db::name('contract')
            ->where(['id' => $requestData['commerce_review_id']])
            ->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function headprocess(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        Session::set('contract_contract_id',$contract_id);
        $pageSize = 10; // 每页显示10条数据
        $Contract = new Contract;
        $contracts = $Contract
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('contract_status', '=', '正常')
            ->where('send_date', '=', '0000-00-00')
            ->where('contract_id', 'like', '%' . "A" . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('contracts', $contracts);
        // 将数据返回给用户
        return $this->fetch();
    }
    public function headprocessedit(){
        // 获取传入ID
        $id = Request::instance()->param('id/d');
        if (is_null($Contract = Contract::get($id))) {
            return '系统未找到ID为' . $id . '的记录';
        }
        echo $id;
        // 将数据传给V层
        $this->assign('Contract', $Contract);
        // 将封装好的V层内容返回给用户
        return $this->fetch();
    }
    public function HeadUpdate(Request $request){
        $staff_name = Session::get('staff_name');
        $data = $request->param();
        $UpdateData=array(
            'delivery_date' => $data['r_delivery_date'],
            'head_auditor' => $staff_name,
            'id' => $data['r_receive_id']
        );
        $id=$data['r_receive_id'];
        $list = Db::name('contract')
                ->where(['id'=>$id])
                ->count();
        if($list>0){
            $result = Db::name('contract')->update($UpdateData);
            return json(date(1));
        }else {
            return json(date(0));
        }
    }
    public function HeadSend(Request $request){
        //$s_contract_id,$if_nonstandard,$readiness,$readiness_date,$rejection_date,$pass_date,$s_send_date,$send_number,$send_remarks
        $staff_name = Session::get('staff_name');
        $data = $request->param();
        $UpdateData=array(
            'if_nonstandard' => $data['if_nonstandard'],
            'readiness' => $data['readiness'],
            'readiness_date' => $data['readiness_date'],
            'rejection_date' => $data['rejection_date'],
            'pass_date' => $data['pass_date'],
            'send_date' => $data['s_send_date'],
            'send_number' => $data['send_number'],
            'send_remarks' => $data['send_remarks'],
            'head_auditor' => $staff_name,
            'id' => $data['s_send_id']
        );
        $id=$data['s_send_id'];
        $list = Db::name('contract')
            ->where(['id'=>$id])
            ->count();
        if($list>0){
            $result = Db::name('contract')->update($UpdateData);
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    //  合同处理时效
    public function sendtime()
    {
        $result= Db::query(/** @lang text */ "
SELECT contract_id,SUBSTRING(branch,1,2) as company,sales_clerk,contract_num,branch_submit_date,contract_auditor,audit_date,audit_version,delivery_date,if_nonstandard,IF(send_date='0000-00-00','',send_date) AS send_date
FROM helc_contract
WHERE DATE_SUB(CURDATE(), INTERVAL 1 MONTH) <= date(branch_submit_date) OR DATE_SUB(CURDATE(), INTERVAL 1 MONTH) <= date(delivery_date) 
ORDER BY branch_submit_date DESC
");
        // 向V层传数据
        $this->assign('result', $result);
        // 将数据返回给用户
        return $this->fetch();
    }
    //  删除合同
    function Delete(Request $request){
        $requestData = $request->param();
        //检查是否有工号明细
        $list = Db::name('product')
            ->where(['contract_id'=>$requestData['delete_contract_id']])
            ->count();
        if($list>0){
            return json(0);
        }else {
            try {
                $result = Db::name('contract')
                    ->where('id', '=', $requestData['delete_id'])
                    ->delete();
            } catch (PDOException $e) {
            } catch (Exception $e) {
            }
            return json(1);
        }
    }
    //  修改合同基本信息

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function edit(Request $request){
        $requestData=$request->param();
        $data=array(
            'contract_num' => $requestData['update_contract_num'],
            'project_name' => $requestData['update_project_name'],
            'province' => $requestData['update_province'],
            'area' => $requestData['update_area'],
            'county' => $requestData['update_county'],
            'project_type' => $requestData['update_project_type'],
            'project_classification' => $requestData['update_project_classification'],
            'customer_classification' => $requestData['update_customer_classification'],
            'big_client_code' => $requestData['update_big_client_code'],
            'buyer_unit' => $requestData['update_buyer_unit'],
            'use_unit' => $requestData['update_use_unit'],
            'sales_clerk' => $requestData['update_sales_clerk'],
            'collection_person' => $requestData['update_collection_person'],
            'contract_status' => $requestData['update_contract_status'],
            'both_seal_date' => $requestData['update_both_seal_date'],
            'cross_region' => $requestData['update_cross_region'],
            'sale_bu' => $requestData['update_sale_bu'],
            'install_bu' => $requestData['update_install_bu'],
            'share_ratio' => $requestData['update_share_ratio'],
            'install_company' => $requestData['update_install_company'],
            'id' => $requestData['update_id']
        );
        $check=Db::name('contract')->where(['id' => $requestData['update_id']])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    public function CheckContractID($check_contract_id){
        $list = Db::name('contract')
            ->where(['contract_id'=>$check_contract_id])
            ->count();
        if($list>0){
            return json(date(1));
        }else{
            return json(date(0));
        }

    }
    //-----------------------------------------合同档案管理----------------------------------------------//

    /**
     * @throws DbException
     */
    public function management(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        Session::set('contract_contract_id',$contract_id);
        $pageSize = 10; // 每页显示20条数据

        // 实例化
        $Contract = new Contract;
        // 按条件查询数据并调用分页
        $contracts = $Contract
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);

        // 向V层传数据
        $this->assign('contracts', $contracts);
        // 将数据返回给用户
        return $this->fetch();
    }

    /**
     * @throws ModelNotFoundException
     * @throws DbException
     * @throws DataNotFoundException
     */
    public function UpdatePost(){
        $id = $this->request->param("update_id");
        $Contract = new Contract;
        $SQLData = $Contract
            ->where('id',$id)
            ->select();
        $SQLJson=json_encode($SQLData);
        echo $SQLJson;
    }
    //获取归档合同信息
    public function EditPost(){
        $id = $this->request->param("edit_id");
        $SQLData= Db::query(/** @lang text */ "
 SELECT id,contract_id,contract_position,contract_folder_num,contract_folder_order,contract_filing_remarks
 FROM helc_contract
WHERE id='$id'
            ");
        for ($i=0; $i < count($SQLData) ; $i++) {
            $SQLData1[$i]['id']=$SQLData[$i]['id'];
            $SQLData1[$i]['contract_position']=$SQLData[$i]['contract_position'];
            $SQLData1[$i]['contract_folder_num']=$SQLData[$i]['contract_folder_num'];
            $SQLData1[$i]['contract_folder_order']=$SQLData[$i]['contract_folder_order'];
            $SQLData1[$i]['contract_filing_remarks']=$SQLData[$i]['contract_filing_remarks'];
        }
        $SQLData_json=json_encode($SQLData1);
        echo  $SQLData_json;
    }
    //合同归档
    public function UpdateForm($edit_id,$contract_position,$contract_folder_num,$contract_folder_order,$contract_filing_remarks){
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $adminer=Session::get('admin');
        $list = Db::name('contract')
            ->where(['id'=>$edit_id])
            ->count();
        if($list>0){
            if($adminer===1){
                $result = Db::execute(/** @lang text */ "
            UPDATE helc_contract
            SET contract_position = '$contract_position',
                contract_folder_num = '$contract_folder_num',
                contract_folder_order = '$contract_folder_order',
                contract_filing_remarks = '$contract_filing_remarks'
            WHERE id = '$edit_id'
            ");
            }else{
                $result = Db::execute(/** @lang text */ "
            UPDATE helc_contract 
            SET contract_position = '$contract_position',
                contract_folder_num = '$contract_folder_num',
                contract_folder_order = '$contract_folder_order',
                contract_filing_remarks = '$contract_filing_remarks',
                contract_filing_person='$staff_name',
                contract_filing_date='$today_date'
            WHERE id = '$edit_id'
            ");
            }
            return json(date(1));

        }else {
            return json(date(0));
        }
    }
    //合同归档导出
    public function ContractFileExport($export_condition,$ContractFileFrom,$ContractFileTo){
        // 按条件选择不同的查询结果
        if($export_condition=='邮寄总部日期'){
            $where['courier_date'] = ['between',[$ContractFileFrom,$ContractFileTo]];
        }else if($export_condition=='双方盖章日期'){
            $where['both_seal_date'] = ['between',[$ContractFileFrom,$ContractFileTo]];
        }else if($export_condition=='归档日期'){
            $where['contract_filing_date'] = ['between',[$ContractFileFrom,$ContractFileTo]];
        }

        //设置表头：
        $head = [
            '合同号'=>'string',
            '合同台数'=>'integer',
            '销售分公司'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '大客户编码'=>'string',
            '项目名称'=>'string',
            '邮寄总部日期'=>'date',
            '双方盖章日期'=>'date',
            '设备签约价'=>'price',
            '运费签约价'=>'price',
            '安装签约价'=>'price',
            '存档位置'=>'string',
            '夹号'=>'string',
            '夹序'=>'string',
            '存档日期'=>'date',
            '存档备注'=>'string',
            '商审备注'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'contract_id',
            'contract_num',
            'branch',
            'buyer_unit',
            'use_unit',
            'big_client_code',
            'project_name',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'equipment_sign',
            'transport_sign',
            'installation_sign',
            'contract_position',
            'contract_folder_num',
            'contract_folder_order',
            'IF(contract_filing_date="0000-00-00","",contract_filing_date)'=>'contract_filing_date',
            'contract_filing_remarks',
            'contract_remarks'
        ];
        $excel = new expExcel();
        $data = Db::name('contract')
            ->field($keys)
            ->where($where)
            ->select();
        $excel->exports('合同归档明细', $head, $data, $keys);
    }
    //----------------------------------------受控图纸管理--------------------------------------------------//
    //首页
    public function drawing(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        $drawing_status = Request::instance()->get('drawing_status');
        Session::set('install_contract_id',$contract_id);
        $pageSize = 10; // 每页显示20条数据
        // 实例化Quote
        $Contract = new Contract;
        // 按条件查询数据并调用分页
        $contracts = $Contract
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('drawing_status', 'like', '%' . $drawing_status . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('contracts', $contracts);
        $this->display();
        return $this->fetch();
    }
    //图纸分派
    public function Assignment($contract_assignment_id,$drawing_rec_date,$drawing_people){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drawing_rec_date' => $drawing_rec_date,
            'drawing_people' => $drawing_people,
            'assignment_people' => $staff_name,
            'assignment_date' => $today_date,
            'drawing_status' => '已指派',
            'id' => $contract_assignment_id
        );
        $check=Db::name('contract')->where(['id' => $contract_assignment_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //出图

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function Drew($contract_drew_id, $drew_date, $drawing_num, $drew_version, $drew_people_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drew_version' => $drew_version+1,
            'drawing_num' => $drawing_num,
            'drew_people_remarks' => $drew_people_remarks,
            'drew_people' => $staff_name,
            'drew_date' => $drew_date,
            'drawing_status' => '已出图',
            'id' => $contract_drew_id
        );
        $check=Db::name('contract')->where(['id' => $contract_drew_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //校审

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function ReviewDrawing($contract_review_id, $drew_review_date, $proof_accuracy_rate, $drew_review_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'proof_accuracy_rate' => $proof_accuracy_rate,
            'drew_review_remarks' => $drew_review_remarks,
            'review_people' => $staff_name,
            'drew_review_date' => $drew_review_date,
            'drawing_status' => '已审核',
            'id' => $contract_review_id
        );
        $check=Db::name('contract')->where(['id' => $contract_review_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //上传

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function UploadDrawing($contract_upload_id, $drew_position, $drew_upload_time, $upload_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drew_position' => $drew_position,
            'drew_upload_time' => $drew_upload_time,
            'upload_remarks' => $upload_remarks,
            'drew_uploader' => $staff_name,
            'drawing_status' => '已上传',
            'id' => $contract_upload_id
        );
        $check=Db::name('contract')->where(['id' => $contract_upload_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //编辑
    public function EditDrawing($contract_edit_id,$e_drew_people_remarks,$e_upload_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drew_people_remarks' => $e_drew_people_remarks,
            'upload_remarks' => $e_upload_remarks,
            'id' => $contract_edit_id
        );
        $check=Db::name('contract')->where(['id' => $contract_edit_id])->count();
        if($check>0){
            $result=Db::name('contract')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //----------------------------------------安装信息管理--------------------------------------------------//
    public function install(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        $buyer_unit = Request::instance()->get('buyer_unit');
        Session::set('install_contract_id',$contract_id);
        Session::set('contract_buyer_unit',$buyer_unit);
        $pageSize = 10; // 每页显示20条数据
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在安装区域
        $companys=Session::get('company');

        // 实例化Quote
        $Contract = new Contract;
        // 按条件查询数据并调用分页
        if($super_admin==1){
            $contracts = $Contract
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->order('id DESC')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $contracts = $Contract
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('install_company', 'like', '%' . $companys . '%')
                ->order('id DESC')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }

        // 向V层传数据
        $this->assign('contracts', $contracts);
        $this->display();
        return $this->fetch();
    }
    //----------------------------------------分包信息管理--------------------------------------------------//
    public function subcontract(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        Session::set('install_contract_id',$contract_id);
        $pageSize = 10; // 每页显示20条数据
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在安装区域
        $companys=Session::get('company');

        // 实例化Quote
        $Contract = new Contract;
        // 按条件查询数据并调用分页
        if($super_admin==1){
            $contracts = $Contract
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->order('id DESC')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }else{
            $contracts = $Contract
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('install_company', 'like', '%' . $companys . '%')
                ->order('id DESC')
                ->paginate($pageSize, false, ['query'=>request()->param()]);
        }

        // 向V层传数据
        $this->assign('contracts', $contracts);
        $this->display();
        return $this->fetch();
    }
    //----------------------------------------数据导出--------------------------------------------------//
    //导出所有合同信息
    /**
     * @throws DataNotFoundException
     * @throws ModelNotFoundException
     * @throws DbException
     */
    public function AllContract(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //  设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '修正合同号'=>'string',
            '合同状态'=>'string',
            '合同台数'=>'integer',
            '销售分公司'=>'string',
            '省份'=>'string',
            '地级市'=>'string',
            '区县'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '客户分类'=>'string',
            '大客户编码'=>'string',
            '客户简称'=>'string',
            '项目名称'=>'string',
            '项目属性'=>'string',
            '安装地点'=>'string',
            '营业员'=>'string',
            '三方合同'=>'string',
            '调验合同'=>'string',
            '双方盖章日期'=>'date',
            '签梯财年'=>'integer',
            '邮寄总部日期'=>'date',
            '总部接收日期'=>'date',
            '总部寄出日期'=>'date',
            '生效总台量'=>'integer',
            '最大生效日期'=>'date',
            '欠款负责人'=>'string',
            '总公司营业'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装分公司'=>'string',
            '安装一期款'=>'price',
            '安装二期款'=>'price',
            '安装三期款'=>'price',
            '安装四期款'=>'price',
            '安装进场前款的收款节点'=>'string',
            '澄清内容'=>'string',
            '安装合同签订方'=>'string',
            '设备提货前支付比例'=>'string',
            '设备质保金比例'=>'string',
            '山东司商审'=>'string',
            '是否非标'=>'string',
            '审核版本'=>'integer',
            '第一经销商'=>'string',
            '服务费点数1'=>'0.00',
            '第二经销商'=>'string',
            '服务费点数2'=>'0.00',
            '第三经销商'=>'string',
            '服务费点数3'=>'0.00',
            '设备下浮'=>'0.000',
            '分公司服务费点数'=>'0.00',
            '电梯型号'=>'string',
            '设备含服务费下浮'=>'0.000',
            '设备到期应收'=>'price',
            '安装到期应收'=>'price',
            '工号信息录入信息'=>'integer',
            '城市类别'=>'string',
            '寄出财年'=>'integer',
            '发货总台量'=>'integer',
            '安装标准价'=>'price',
            '安装签约价'=>'price',
            '澄清'=>'price',
            '配套'=>'price',
            '商审完成日期'=>'date',
            '项目分类'=>'string',
            '跨区域'=>'string',
            '销售事业部'=>'string',
            '安装事业部'=>'string',
            '流程状态'=>'string',
            '设备最长账龄'=>'0.00',
            '安装最长账龄'=>'0.00',
            '过审日期'=>'date',
            '设备合同非标条款'=>'string',
            '安装合同非标条款'=>'string',
            '合同总价'=>'0.00',
            '完工状态'=>'string',
            '最大取证日期'=>'date',
            '企业背景'=>'string',
            '安装合同主体'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'fix_contract_id',
            'contract_status',
            'contract_num',
            'branch','province',
            'area',
            'county',
            'buyer_unit',
            'use_unit',
            'customer_classification',
            'big_client_code',
            'customer_abbreviation',
            'project_name',
            'project_type',
            'installation_location',
            'sales_clerk',
            'if_three_party',
            'if_check',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'fyear',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'IF(send_date="0000-00-00","",send_date)'=>'send_date',
            'intoforce_sum',
            'IF(max_intoforce_date="0000-00-00","",max_intoforce_date)'=>'max_intoforce_date',
            'collection_person',
            'head_salesperson',
            'equipment_contract_advance',
            'equipment_contract_received',
            'install_contract_advance',
            'install_contract_received',
            'install_company',
            'install_phase_1',
            'install_phase_2',
            'install_phase_3',
            'install_phase_4',
            'entry_payment_node',
            'clarify',
            'install_contract_sign',
            'before_delivery_per',
            'quality_assurance_per',
            'contract_auditor',
            'if_nonstandard',
            'audit_version',
            'first_distributor',
            'service_charge_points1',
            'second_distributor',
            'service_charge_points2',
            'third_distributor',
            'service_charge_points3',
            'equipment_floating_rate',
            'branch_service_points',
            'elevator_model',
            'equipment_floating_rate_with_service',
            'equipment_expire_arrears',
            'install_expire_arrears',
            'product_info',
            'city_type',
            'send_fyear',
            'delivery_num',
            'installation_spl',
            'installation_sign',
            'clarify_cost',
            'supporting_cost',
            'IF(audit_date="0000-00-00","",audit_date)'=>'audit_date',
            'project_classification',
            'cross_region',
            'sale_bu',
            'install_bu',
            'process',
            'equipment_max_account_age_month',
            'install_max_account_age_month',
            'IF(sd_approved_date="0000-00-00","",sd_approved_date)'=>'sd_approved_date',
            'equipment_unstandard_clauses',
            'install_unstandard_clauses',
            'total_contract_price',
            'complete_status',
            'IF(max_issuing_date="0000-00-00","",max_issuing_date)'=>'max_issuing_date',
            'enterprise_background',
            'install_contract_subject',
        ];
        if($super_admin==1){
            $data  = Db::name('contract')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('contract')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('合同明细', $head, $data, $keys);
    }
    //服务费协议未签订
    public function serviceFeeAgreementUnSign(){
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //  设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '修正合同号'=>'string',
            '合同台数'=>'integer',
            '销售分公司'=>'string',
            '买方单位'=>'string',
            '客户分类'=>'string',
            '客户简称'=>'string',
            '使用单位'=>'string',
            '服务费协议状态'=>'string',
            '第一经销商'=>'string',
            '服务费点数1'=>'0.00',
            '第二经销商'=>'string',
            '服务费点数2'=>'0.00',
            '分公司服务费点数'=>'0.00',
            '双方盖章日期'=>'date'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'fix_contract_id',
            'contract_num',
            'branch',
            'buyer_unit',
            'customer_classification',
            'customer_abbreviation',
            'use_unit',
            'service_fee_agreement_status',
            'first_distributor',
            'service_charge_points1',
            'second_distributor',
            'service_charge_points2',
            'branch_service_points',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date'
        ];
        if($super_admin==1){
            $data  = Db::name('contract')
                ->field($keys)
                ->where([
                    'service_fee_agreement_status' => '未签订',
                    'contract_status' => '正常'
                ])
                ->select();
        }else{
            $data  = Db::name('contract')
                ->field($keys)
                ->where(['branch' => $company])
                ->where([
                    'service_fee_agreement_status' => '未签订',
                    'contract_status' => '正常'
                ])
                ->select();
        }
        $excel->exports('服务费协议未签订明细', $head, $data, $keys);
    }
    //按条件导出合同信息
    public function ConditionContract(){
        ini_set ('memory_limit', '1280M');
        // 获取查询信息
        $contract_id = Session::get('contract_contract_id');
        $buyer_unit = Session::get('contract_buyer_unit');
        $project_name = Session::get('contract_project_name');
        $branchs = Session::get('$contract_branch');
        $contract_customer_abbreviation = Session::get('contract_customer_abbreviation');
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        //获取所在区域
        $companys=Session::get('company');
        if($super_admin==1){
            $branch=$branchs;
        }else{
            $branch=$companys;
        }
        //设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '修正合同号'=>'string',
            '合同状态'=>'string',
            '合同台数'=>'integer',
            '销售分公司'=>'string',
            '省份'=>'string',
            '地级市'=>'string',
            '区县'=>'string',
            '项目分类'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '大客户编码'=>'string',
            '大客户简称'=>'string',
            '本地大客户简称'=>'string',
            '项目名称'=>'string',
            '项目属性'=>'string',
            '安装地点'=>'string',
            '营业员'=>'string',
            '三方合同'=>'string',
            '调验合同'=>'string',
            '双方盖章日期'=>'date',
            '签梯财年'=>'integer',
            '邮寄总部日期'=>'date',
            '总部接收日期'=>'date',
            '总部寄出日期'=>'date',
            '生效总台量'=>'integer',
            '最大生效日期'=>'date',
            '欠款负责人'=>'string',
            '客户分类'=>'string',
            '经销商A'=>'string',
            '服务费点数A'=>'0.00',
            '经销商B'=>'string',
            '服务费点数B'=>'0.00',
            '分公司提交审核日期'=>'date',
            '合同接收日期'=>'date',
            '审核日期'=>'date',
            '审核人'=>'string',
            '审核版本'=>'integer',
            '总公司商审'=>'string',
            '澄清费用'=>'price',
            '配套费用'=>'price',
            '分公司服务费点数'=>'0.00',
            '电梯型号'=>'string',
            '设备含服务费下浮'=>'0.000'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'fix_contract_id',
            'contract_status',
            'contract_num',
            'branch',
            'province',
            'area',
            'county',
            'project_classification',
            'buyer_unit',
            'use_unit',
            'big_client_code',
            'big_client_short',
            'local_customer_short',
            'project_name',
            'project_type',
            'installation_location',
            'sales_clerk',
            'if_three_party',
            'if_check',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'fyear',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'IF(send_date="0000-00-00","",send_date)'=>'send_date',
            'intoforce_sum',
            'IF(max_intoforce_date="0000-00-00","",max_intoforce_date)'=>'max_intoforce_date',
            'collection_person',
            'customer_classification',
            'first_distributor',
            'service_charge_points1',
            'second_distributor',
            'service_charge_points2',
            'IF(branch_submit_date="0000-00-00","",branch_submit_date)'=>'branch_submit_date',
            'IF(contract_rec_date="0000-00-00","",contract_rec_date)'=>'contract_rec_date',
            'IF(audit_date="0000-00-00","",audit_date)'=>'audit_date',
            'contract_auditor',
            'audit_version',
            'head_auditor',
            'clarify_cost',
            'supporting_cost',
            'branch_service_points',
            'elevator_model',
            'equipment_floating_rate_with_service'
        ];
        $excel = new expExcel();
        $data = Db::name('contract')
            ->field($keys)
            ->where('contract_id','like','%'.$contract_id.'%')
            ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
            ->where('customer_abbreviation', 'like', '%' . $contract_customer_abbreviation . '%')
            ->where('project_name', 'like', '%' . $project_name . '%')
            ->where('branch', 'like', '%' . $branch . '%')
            ->select();
        $excel->exports('合同明细', $head, $data, $keys);
    }
    //导出所有合同受控图纸
    public function AllDrawing(){
        ini_set ('memory_limit', '1280M');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            '合同号'=>'string',
            '合同台数'=>'integer',
            '图纸资料接收时间'=>'date',
            '出图时间'=>'date',
            '出图人'=>'string',
            '校审人'=>'string',
            '校审时间'=>'date',
            '图纸张数'=>'integer',
            '出图人备注'=>'string',
            '校审人备注'=>'string',
            '分公司'=>'string',
            '买方单位'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'contract_id',
            'contract_num',
            'drawing_rec_date',
            'drew_date',
            'drew_people',
            'review_people',
            'drew_review_date',
            'drawing_num',
            'drew_people_remarks',
            'drew_review_remarks',
            'branch',
            'buyer_unit'
        ];
        $data  = Db::name('contract')
            ->field($keys)
            ->select();

        $excel->exports('合同受控图纸明细', $head, $data, $keys);
    }
    //导出所有合同安装分包比例
    public function AllSubContractRate(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '修正合同号'=>'string',
            '合同状态'=>'string',
            '合同台数'=>'integer',
            '销售分公司'=>'string',
            '省份'=>'string',
            '地级市'=>'string',
            '区县'=>'string',
            '项目分类'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '大客户编码'=>'string',
            '大客户简称'=>'string',
            '本地大客户简称'=>'string',
            '项目名称'=>'string',
            '项目属性'=>'string',
            '安装地点'=>'string',
            '营业员'=>'string',
            '三方合同'=>'string',
            '调验合同'=>'string',
            '双方盖章日期'=>'date',
            '签梯财年'=>'integer',
            '邮寄总部日期'=>'date',
            '总部接收日期'=>'date',
            '总部寄出日期'=>'date',
            '生效总台量'=>'integer',
            '最大生效日期'=>'date',
            '欠款负责人'=>'string',
            '客户分类'=>'string',
            '总公司营业'=>'string',
            '设备预收'=>'price',
            '设备实收'=>'price',
            '安装预收'=>'price',
            '安装实收'=>'price',
            '安装分公司'=>'string',
            '安装一期款'=>'price',
            '安装二期款'=>'price',
            '安装三期款'=>'price',
            '安装四期款'=>'price',
            '安装进场前款的收款节点'=>'string',
            '澄清内容'=>'string',
            '安装合同签订方'=>'string',
            '分包状态'=>'string',
            '最早分包日期'=>'date',
            '分包成本率'=>'0.00%',
            '分包网点'=>'string',
            '完工状态'=>'string',
            '可申请金额'=>'price',
            '配套分包网点'=>'string',
            '配套分包总金额'=>'price'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'fix_contract_id',
            'contract_status',
            'contract_num',
            'branch','province',
            'area',
            'county',
            'project_classification',
            'buyer_unit',
            'use_unit',
            'big_client_code',
            'big_client_short',
            'local_customer_short',
            'project_name',
            'project_type',
            'installation_location',
            'sales_clerk',
            'if_three_party',
            'if_check',
            'IF(both_seal_date="0000-00-00","",both_seal_date)'=>'both_seal_date',
            'fyear',
            'IF(courier_date="0000-00-00","",courier_date)'=>'courier_date',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'IF(send_date="0000-00-00","",send_date)'=>'send_date',
            'intoforce_sum',
            'IF(max_intoforce_date="0000-00-00","",max_intoforce_date)'=>'max_intoforce_date',
            'collection_person',
            'customer_classification',
            'head_salesperson',
            'equipment_contract_advance',
            'equipment_contract_received',
            'install_contract_advance',
            'install_contract_received',
            'install_company',
            'install_phase_1',
            'install_phase_2',
            'install_phase_3',
            'install_phase_4',
            'entry_payment_node',
            'clarify',
            'install_contract_sign',
            'subcontract_status',
            'min_subcontract_sign_date',
            'sub_contract_cost_rate',
            'supplier',
            'complete_status',
            'install_contract_advance*(0.69-sub_contract_cost_rate)'=>'applicable_amount',
            'supporting_supplier',
            'supporting_actual_expenditure'
        ];
        if($super_admin==1){
            $data  = Db::name('contract')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('contract')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('所有安装分包成本', $head, $data, $keys);
    }
    /**
     * 合同相关API数据调用
     */
    //  合同评审数据按月汇总
    public function contractAuditByMonth(){
        $fyear = Session::get('fyear');
        $fyear_start = Session::get('fyear_start');
        $fyear_end = Session::get('fyear_end');
        $last_fyear = Session::get('last_fyear');
        $last_fyear_start = Session::get('last_fyear_start');
        $last_fyear_end = Session::get('last_fyear_end');
        $sqlData= Db::query("
SELECT monthly,IFNULL(monthly1,0) AS monthly1,lastyear,IFNULL(thisyear,0) AS thisyear FROM(SELECT date_format(send_date, '%Y-%m') AS monthly,MONTH(send_date) AS month1,ROUND(SUM(contract_num)/1000,3) AS lastyear FROM  helc_contract
WHERE send_date BETWEEN '$last_fyear_start' AND '$last_fyear_end' 
GROUP BY monthly) AS A
LEFT JOIN
(SELECT date_format(send_date, '%Y-%m') AS monthly1,MONTH(send_date) AS month2,ROUND(SUM(contract_num)/1000,3) AS thisyear FROM  helc_contract
WHERE send_date BETWEEN '$fyear_start' AND '$fyear_end' 
GROUP BY monthly1) AS B
ON A.month1=B.month2
");
        echo  json_encode($sqlData);
    }
    //导出商审绩效

    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function auditorPerformance(){
        ini_set ('memory_limit', '1280M');
        $company = Session::get('company');
        $super_admin = Session::get('super_admin');
        $excel = new expExcel();
        //  设置表头：
        $head = [
            'ID'=>'integer',
            '合同号'=>'string',
            '状态'=>'string',
            '台量'=>'integer',
            '山东司商审'=>'string',
            '区域提交日期'=>'date',
            '商审完成日期'=>'date',
            '山东司效率系数'=>'0.00%',
            '过审日期'=>'date',
            '销售分公司'=>'string',
            '山东司商审季度绩效'=>'0.00',
            '山东司商审季度绩效发放日期'=>'date',
            '山东司商审年终奖'=>'0.00',
            '山东司商审年终奖发放日期'=>'date',
            '总公司商审'=>'string',
            '接收日期'=>'date',
            '寄出日期'=>'date',
            '总公司效率系数'=>'0.00%',
            '总公司商审季度绩效'=>'0.00',
            '总公司商审季度绩效发放日期'=>'date',
            '总公司商审年终奖'=>'0.00',
            '总公司商审年终奖发放日期'=>'date',

        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'contract_id',
            'contract_status',
            'contract_num',
            'contract_auditor',
            'IF(branch_submit_date="0000-00-00","",branch_submit_date)'=>'branch_submit_date',
            'IF(audit_date="0000-00-00","",audit_date)'=>'audit_date',
            'sd_auditor_factor',
            'IF(sd_approved_date="0000-00-00","",sd_approved_date)'=>'sd_approved_date',
            'branch',
            'sd_auditor_quarterly_performance',
            'IF(sd_auditor_quarterly_performance_date="0000-00-00","",sd_auditor_quarterly_performance_date)'=>'sd_auditor_quarterly_performance_date',
            'sd_auditor_annual_bonus',
            'IF(sd_auditor_annual_bonus_date="0000-00-00","",sd_auditor_annual_bonus_date)'=>'sd_auditor_annual_bonus_date',
            'head_auditor',
            'IF(delivery_date="0000-00-00","",delivery_date)'=>'delivery_date',
            'IF(send_date="0000-00-00","",send_date)'=>'send_date',
            'head_auditor_factor',
            'head_auditor_quarterly_performance',
            'IF(head_auditor_quarterly_performance_date="0000-00-00","",head_auditor_quarterly_performance_date)'=>'head_auditor_quarterly_performance_date',
            'head_auditor_annual_bonus',
            'IF(head_auditor_annual_bonus_date="0000-00-00","",head_auditor_annual_bonus_date)'=>'head_auditor_annual_bonus_date',

        ];
        if($super_admin==1){
            $data  = Db::name('contract')
                ->field($keys)
                ->select();
        }else{
            $data  = Db::name('contract')
                ->field($keys)
                ->where(['branch' => $company])
                ->select();
        }
        $excel->exports('商审绩效', $head, $data, $keys);
    }
}
<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Litigation;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;
use think\Request;
use think\Db;
use think\Session;
use PHPExcel_IOFactory;
use PHPExcel;
class LitigationController extends IndexController
{
    public function index(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        $company = Request::instance()->get('company');
        $buyer_unit = Request::instance()->get('buyer_unit');
        $litigation_type = Request::instance()->get('litigation_type');
        $customer_abbreviation=Request::instance()->get('customer_abbreviation');
        Session::set('litigation_contract_id',$contract_id);
        Session::set('litigation_company',$buyer_unit);
        Session::set('litigation_buyer_unit',$litigation_type);
        //获取超级管理员权限
        $super_admin=Session::get('super_admin');
        $admin=Session::get('admin');
        $companys=Session::get('company');
        if($admin==1){
            $branch=$company;
        }else{
            $branch=$companys;
        }
        $pageSize = 10; // 每页显示10条数据
        // 实例化Litigation
        $Litigation = new Litigation;
        // 按条件查询数据并调用分页
        try {
            $litigations = $Litigation
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('company', 'like', '%' . $branch . '%')
                ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('litigation_type', 'like', '%' . $litigation_type . '%')
                ->order("field(litigation_status,'新建','流程中','已立案','已开庭','已和解','已结案','已撤诉','已发函')")
                ->order('id', 'desc')
                ->paginate($pageSize, false, ['query' => request()->param()]);
        } catch (DbException $e) {
        }
        // 向V层传数据
        $this->assign('litigations', $litigations);
        return $this->fetch();
    }
    /**
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function GetLitigationInfoByCondition(Request $request){
        $requestData=$request->param();
        $search_contract_id = $requestData['search_contract_id'];
        $search_company = $requestData['search_company'];
        $search_customer_abbreviation = $requestData['search_customer_abbreviation'];
        $search_buyer_unit = $requestData['search_buyer_unit'];
        $search_litigation_type = $requestData['search_litigation_type'];

        $data=Db::name('litigation')
            ->where('contract_id', 'like', '%' . $search_contract_id . '%')
            ->where('company', 'like', '%' . $search_company . '%')
            ->where('customer_abbreviation', 'like', '%' . $search_customer_abbreviation . '%')
            ->where('buyer_unit', 'like', '%' . $search_buyer_unit . '%')
            ->where('litigation_type', 'like', '%' . $search_litigation_type . '%')
            ->order("field(litigation_status,'新建','流程中','已立案','已开庭','已和解','已结案','已撤诉','已发函')")
            ->order('id', 'desc')
            ->limit(100)
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    public function printer(){
        // 获取查询信息
        $id = Request::instance()->get('id');
        $pageSize = 10; // 每页显示10条数据
        $CallFunction = Db::execute("CALL PrintFunction;");
        // 实例化Litigation
        $Litigation = new Litigation;
        // 按条件查询数据并调用分页
        try {
            $litigations = $Litigation
                ->where('id', '=', $id)
                ->paginate($pageSize, false, ['query' => request()->param()]);
        } catch (DbException $e) {
        }
        // 向V层传数据
        $this->assign('litigations', $litigations);
        return $this->fetch();
    }
    //严厉催款函
    public function severe(){
        // 获取查询信息
        $id = Request::instance()->get('id');
        $pageSize = 10; // 每页显示10条数据
        $CallFunction = Db::execute("CALL PrintFunction;");
        // 实例化Litigation
        $Litigation = new Litigation;
        // 按条件查询数据并调用分页
        try {
            $litigations = $Litigation
                ->where('id', '=', $id)
                ->paginate($pageSize, false, ['query' => request()->param()]);
        } catch (DbException $e) {
        }
        // 向V层传数据
        $this->assign('litigations', $litigations);
        return $this->fetch();
    }
    //  新建诉讼
    public function NewLitigation(Request $request){
        $today_date=session::get('today_date');
        $nyear=session::get('nyear');
        $new_letter_id=str_pad(session::get('letter_id')+1,4,"0",STR_PAD_LEFT);
        $new_letter_no="函字[" .$nyear ."第" .$new_letter_id ."号]";
        $requestData=$request->param();
        $litigation_type=$requestData['litigation_type'];
        if($litigation_type==="催款函"){
            $data[] = [
                'litigation_type' => $requestData['litigation_type'],
                'company' => $requestData['company'],
                'contract_id' => $requestData['contract_id'],
                'buyer_unit' => $requestData['buyer_unit'],
                'big_client_code' => $requestData['big_client_code'],
                'customer_abbreviation' => $requestData['customer_abbreviation'],
                'eq_litigation' => $requestData['eq_litigation'],
                'in_litigation' => $requestData['in_litigation'],
                'ma_litigation' => $requestData['ma_litigation'],
                'bid_bond' => $requestData['bid_bond'],
                'max_issuing_date' => $requestData['max_issuing_date'],
                'applicant' => $requestData['applicant'],
                'applicant_contact' => $requestData['applicant_contact'],
                'apply_date' => $today_date,
                'letter_no' =>$new_letter_no,
            ];
            $result=Db::name('litigation')->insertAll($data);
            $CallFunction = Db::execute("UPDATE helc_serial_number SET letter_id=letter_id+1 WHERE nyear='$nyear';");
        }else{
            $data[] = [
                'litigation_type' => $requestData['litigation_type'],
                'company' => $requestData['company'],
                'contract_id' => $requestData['contract_id'],
                'buyer_unit' => $requestData['buyer_unit'],
                'big_client_code' => $requestData['big_client_code'],
                'customer_abbreviation' => $requestData['customer_abbreviation'],
                'eq_litigation' => $requestData['eq_litigation'],
                'in_litigation' => $requestData['in_litigation'],
                'ma_litigation' => $requestData['ma_litigation'],
                'bid_bond' => $requestData['bid_bond'],
                'max_issuing_date' => $requestData['max_issuing_date'],
                'applicant' => $requestData['applicant'],
                'applicant_contact' => $requestData['applicant_contact'],
                'apply_date' => $today_date,
            ];
            $result=Db::name('litigation')->insertAll($data);
        }
        if($result){
            return json(1);
        }else{
            return json(0);
        }
    }
    // 删除项目
    function Delete($delete_id){
        $list = Db::name('litigation')
            ->where(['id'=>$delete_id])
            ->count();
        if($list>0){
            $result=Db::name('litigation')
                ->where('id','=',$delete_id)
                ->delete();
            return json(1);
        }else {
            return json(0);
        }
    }
    //  通过ID获取信息
    public function GetLitigationInfo(){
        $id = $this->request->param("id");
        $data=Db::name('litigation')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }

    //更新

    /**
     * @throws \think\exception\PDOException
     * @throws \think\Exception
     */
    public function updateLitigation(Request $request){
        $requestData=$request->param();
        $data=array(
            'contract_id' => $requestData['e_contract_id'],
            'company' => $requestData['e_company'],
            'buyer_unit' => $requestData['e_buyer_unit'],
            'eq_litigation' => $requestData['e_eq_litigation'],
            'in_litigation' => $requestData['e_in_litigation'],
            'ma_litigation' => $requestData['e_ma_litigation'],
            'bid_bond' => $requestData['e_bid_bond'],
            'applicant' => $requestData['e_applicant'],
            'filling_date' => $requestData['e_filling_date'],
            'applicant_contact' => $requestData['e_applicant_contact'],
            'apply_execution_date' => $requestData['e_apply_execution_date'],
            'court_costs' => $requestData['e_court_costs'],
            'arbitration_costs' => $requestData['e_arbitration_costs'],
            'maintenamce_costs' => $requestData['e_maintenamce_costs'],
            'lawyer_costs' => $requestData['e_lawyer_costs'],

            'lawyer' => $requestData['e_lawyer'],
            'progress' => $requestData['e_progress'],
            'remarks' => $requestData['e_remarks'],
            'id' => $requestData['litigation_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['litigation_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //更新发催款函

    /**
     * @throws \think\exception\PDOException
     * @throws \think\Exception
     */
    public function letterUpdate(Request $request){
        $requestData=$request->param();
        $data=array(
            'litigation_status' => '已发函',
            'letter_date' => $requestData['l_letter_date'],
            'submission_process_date' => $requestData['l_submission_process_date'],
            'process_end_date' => $requestData['l_process_end_date'],
            'delivery_methods' => $requestData['l_delivery_methods'],
            'courier_number' => $requestData['l_courier_number'],
            'progress' => $requestData['l_progress'],
            'remarks' => $requestData['l_remarks'],
            'id' => $requestData['letter_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['letter_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //更新发律师函
    public function lawyerLetterUpdate(Request $request){
        $requestData=$request->param();
        $data=array(
            'litigation_status' => '已发函',
            'lawyer' => $requestData['l_lawyer'],
            'letter_date' => $requestData['l_letter_date'],
            'submission_process_date' => $requestData['l_submission_process_date'],
            'process_end_date' => $requestData['l_process_end_date'],
            'delivery_methods' => $requestData['l_delivery_methods'],
            'courier_number' => $requestData['l_courier_number'],
            'progress' => $requestData['l_progress'],
            'remarks' => $requestData['l_remarks'],
            'id' => $requestData['letter_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['letter_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //提交流程操作
    public function submitFillingEdit(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'litigation_status' => '流程中',
            'submission_process_date' => $requestData['f_submission_process_date'],
            'process_end_date' => $requestData['f_process_end_date'],
            'submit_information_to_lawyer_date' => $requestData['f_submit_information_to_lawyer_date'],
            'lawyer' => $requestData['f_lawyer'],
            'progress' => $requestData['f_progress'],
            'remarks' => $requestData['f_remarks'],
            'agent' => $staff_name,
            'id' => $requestData['filling_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['filling_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //立案操作
    public function submitRegisterEdit(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'litigation_status' => '已立案',
            'filling_date' => $requestData['f_filling_date'],
            'payment_date' => $requestData['f_payment_date'],
            'case_no' => $requestData['f_case_no'],
            'progress' => $requestData['f_progress'],
            'remarks' => $requestData['f_remarks'],
            'id' => $requestData['filling_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['filling_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //开庭操作
    public function holdCourtEdit(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'litigation_status' => '已开庭',
            'hearing_date' => $requestData['f_hearing_date'],
            'progress' => $requestData['f_progress'],
            'remarks' => $requestData['f_remarks'],
            'id' => $requestData['filling_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['filling_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //结案操作
    public function closeCaseEdit(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'litigation_status' => '已结案',
            'close_date' => $requestData['f_close_date'],
            'close_type' => $requestData['f_close_type'],
            'judgment' => $requestData['f_judgment'],
            'eq_litigation_collection' => $requestData['f_eq_litigation_collection'],
            'in_litigation_collection' => $requestData['f_in_litigation_collection'],
            'ma_litigation_collection' => $requestData['f_ma_litigation_collection'],
            'bid_bond_collection' => $requestData['f_bid_bond_collection'],
            'progress' => $requestData['f_progress'],
            'remarks' => $requestData['f_remarks'],
            'id' => $requestData['filling_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['filling_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //仅修改
    public function onlyEdit(Request $request){
        $requestData=$request->param();
        $staff_name=session::get('staff_name');
        $today_date=session::get('today_date');
        $data=array(
            'eq_litigation_collection' => $requestData['f_eq_litigation_collection'],
            'in_litigation_collection' => $requestData['f_in_litigation_collection'],
            'ma_litigation_collection' => $requestData['f_ma_litigation_collection'],
            'bid_bond_collection' => $requestData['f_bid_bond_collection'],
            'progress' => $requestData['f_progress'],
            'remarks' => $requestData['f_remarks'],
            'id' => $requestData['filling_edit_id']
        );
        $check=Db::name('litigation')->where(['id' => $requestData['filling_edit_id']])->count();
        if($check>0){
            $result=Db::name('litigation')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //----------------------------------------数据导出--------------------------------------------------//
    //导出所有合同信息
    public function exportToExcel(){
        ini_set ('memory_limit', '1280M');
        $contract_id = Session::get('litigation_contract_id');
        $company = Session::get('litigation_company');
        $buyer_unit = Session::get('litigation_buyer_unit');
        $litigation_type = Session::get('litigation_litigation_type');
        $super_admin = Session::get('super_admin');
        $admin = Session::get('admin');
        $companys=Session::get('company');
        if($admin==1){
            $branch=$company;
        }else{
            $branch=$companys;
        }
        $excel = new expExcel();
        //设置表头：
        $head = [
            'ID'=>'integer',
            '状态'=>'string',
            '收款'=>'string',
            '类型'=>'string',
            '合同号'=>'string',
            '申请人'=>'string',
            '申请时间'=>'date',
            '分公司'=>'string',
            '买方单位'=>'string',
            '使用单位'=>'string',
            '大客户编码'=>'string',
            '客户简称'=>'string',
            '律师'=>'string',
            '经办人'=>'string',
            '买卖合同起诉金额'=>'0.00',
            '安装合同起诉金额'=>'0.00',
            '维保合同起诉金额'=>'0.00',
            '投标保证金'=>'0.00',
            '发函日期'=>'date',
            '函字'=>'string',
            '提交流程时间'=>'date',
            '流程结束时间'=>'date',
            '提交资料至律师时间'=>'date',
            '立案时间'=>'date',
            '台量'=>'integer',
            '标的额'=>'0.00',
            '案号'=>'string',
            '开庭日期'=>'date',
            '结案日期'=>'date',
            '结案方式'=>'string',
            '判决/裁定书'=>'string',
            '设备收款'=>'0.00',
            '安装收款'=>'0.00',
            '保养收款'=>'0.00',
            '保证金收款'=>'0.00',
            '进展情况'=>'string',
            '备注'=>'string',
            '投递方式'=>'string',
            '快递单号'=>'string',
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = [
            'id',
            'litigation_status',
            'collection_status',
            'litigation_type',
            'contract_id',
            'applicant',
            'IF(apply_date="0000-00-00","",apply_date)'=>'apply_date',
            'company',
            'buyer_unit',
            'use_unit',
            'big_client_code',
            'customer_abbreviation',
            'lawyer',
            'agent',
            'eq_litigation',
            'in_litigation',
            'ma_litigation',
            'bid_bond',
            'IF(letter_date="0000-00-00","",letter_date)'=>'letter_date',
            'IF(letter_no="0000-00-00","",letter_no)'=>'letter_no',
            'IF(submission_process_date="0000-00-00","",submission_process_date)'=>'submission_process_date',
            'IF(process_end_date="0000-00-00","",process_end_date)'=>'process_end_date',
            'IF(submit_information_to_lawyer_date="0000-00-00","",submit_information_to_lawyer_date)'=>'submit_information_to_lawyer_date',
            'IF(filling_date="0000-00-00","",filling_date)'=>'filling_date',
            'litigation_num',
            'target_amount',
            'case_no',
            'IF(hearing_date="0000-00-00","",hearing_date)'=>'hearing_date',
            'IF(close_date="0000-00-00","",close_date)'=>'close_date',
            'close_type',
            'judgment',
            'eq_litigation_collection',
            'in_litigation_collection',
            'ma_litigation_collection',
            'bid_bond_collection',
            'progress',
            'remarks',
            'delivery_methods',
            'courier_number',
        ];
        if($super_admin==1){
            $data  = Db::name('litigation')
                ->field($keys)
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('company', 'like', '%' . $branch . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('litigation_type', 'like', '%' . $litigation_type . '%')
                ->select();
        }else{
            $data  = Db::name('litigation')
                ->field($keys)
                ->where(['company' => $branch])
                ->where('contract_id', 'like', '%' . $contract_id . '%')
                ->where('buyer_unit', 'like', '%' . $buyer_unit . '%')
                ->where('litigation_type', 'like', '%' . $litigation_type . '%')
                ->select();
        }
        $excel->exports('诉讼明细', $head, $data, $keys);
    }
}
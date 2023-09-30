<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\Modify;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;
class ModifyController extends IndexController {
    //修改单首页
    public function index(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        $pageSize = 10;
        // 实例化
        $Modify = new Modify;
        // 按条件查询数据并调用分页
        $modifys = $Modify
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('modifys', $modifys);
        $this->display();
        return $this->fetch();
    }
    //受控图纸
    public function drawing(){
        // 获取查询信息
        $contract_id = Request::instance()->get('contract_id');
        $drawing_status = Request::instance()->get('drawing_status');
        Session::set('drawing_contract_id',$contract_id);
        $pageSize = 10; // 每页显示20条数据
        // 实例化
        $Modify = new Modify;
        // 按条件查询数据并调用分页
        $modifys = $Modify
            ->where('contract_id', 'like', '%' . $contract_id . '%')
            ->where('drawing_status', 'like', '%' . $drawing_status . '%')
            ->order('id DESC')
            ->paginate($pageSize, false, ['query'=>request()->param()]);
        // 向V层传数据
        $this->assign('modifys', $modifys);
        $this->display();
        return $this->fetch();
    }
    //新增修改单
    public function AddModify($m_contract_id,$m_branch,$m_modify_id,$m_modify_type,$m_modify_num,$m_plus_num,$m_model_change_num,$m_remarks){
        $modify_data=array(
            'contract_id' => $m_contract_id,
            'branch' => $m_branch,
            'modify_id' => $m_modify_id,
            'modify_type' => $m_modify_type,
            'modify_num' => $m_modify_num,
            'plus_num' => $m_plus_num,
            'model_change_num' => $m_model_change_num,
            'remarks' => $m_remarks
        );
        $check=Db::name('modify')->where(['modify_id' => $m_modify_id])->count();
        if($check>0){
            return json(0);
        }else{
            $InsertModify=Db::name('modify')->insert($modify_data);
            return json(1);
        }
    }
    //通过ID获取修改单信息
    public function GetModifyInfo(){
        $id = $this->request->param("id");
        $data=Db::name('modify')->where('id','=',$id)->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //编辑
    public function EditDrawing($modify_edit_id,$edit_modify_id,$e_drew_people_remarks,$e_upload_remarks){
        $data=array(
            'modify_id' => $edit_modify_id,
            'drew_people_remarks' => $e_drew_people_remarks,
            'upload_remarks' => $e_upload_remarks,
            'id' => $modify_edit_id
        );
        $check=Db::name('modify')->where(['id' => $modify_edit_id])->count();
        if($check>0){
            $result=Db::name('modify')->update($data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
    //图纸分派
    public function Assignment($modify_assignment_id,$drawing_rec_date,$drawing_people){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drawing_rec_date' => $drawing_rec_date,
            'drawing_people' => $drawing_people,
            'assignment_people' => $staff_name,
            'assignment_date' => $today_date,
            'drawing_status' => '已指派',
            'id' => $modify_assignment_id
        );
        $check=Db::name('modify')->where(['id' => $modify_assignment_id])->count();
        if($check>0){
            $result=Db::name('modify')->update($data);
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
    public function Drew($modify_drew_id,$drew_date,$drawing_num,$drew_version,$drew_people_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drew_version' => $drew_version+1,
            'drawing_num' => $drawing_num,
            'drew_people_remarks' => $drew_people_remarks,
            'drew_people' => $staff_name,
            'drew_date' => $drew_date,
            'drawing_status' => '已出图',
            'id' => $modify_drew_id
        );
        $check=Db::name('modify')->where(['id' => $modify_drew_id])->count();
        if($check>0){
            $result=Db::name('modify')->update($data);
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
    public function ReviewDrawing($modify_review_id,$drew_review_date,$proof_accuracy_rate,$drew_review_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'proof_accuracy_rate' => $proof_accuracy_rate,
            'drew_review_remarks' => $drew_review_remarks,
            'review_people' => $staff_name,
            'drew_review_date' => $drew_review_date,
            'drawing_status' => '已审核',
            'id' => $modify_review_id
        );
        $check=Db::name('modify')->where(['id' => $modify_review_id])->count();
        if($check>0){
            $result=Db::name('modify')->update($data);
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
    public function UploadDrawing($modify_upload_id,$drew_position,$drew_upload_time,$upload_remarks){
        $today_date=session::get('today_date');
        $staff_name=session::get('staff_name');
        $data=array(
            'drew_position' => $drew_position,
            'drew_upload_time' => $drew_upload_time,
            'upload_remarks' => $upload_remarks,
            'drew_uploader' => $staff_name,
            'drawing_status' => '已上传',
            'id' => $modify_upload_id
        );
        $check=Db::name('modify')->where(['id' => $modify_upload_id])->count();
        if($check>0){
            $result=Db::name('modify')->update($data);
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
    //导出所有修改单受控图纸
    public function AllModify(){
        $excel = new expExcel();

        //设置表头：
        $head = [
            '修改单号'=>'string',
            '合同号'=>'string',
            '修改台量'=>'integer',
            '修改分类'=>'string',
            '其中(新增台量)'=>'integer',
            '其中(梯型修改台量):'=>'integer',
            '图纸资料接收时间'=>'date',
            '出图时间'=>'date',
            '出图人'=>'string',
            '校审人'=>'string',
            '校审时间'=>'date',
            '图纸张数'=>'integer',
            '出图人备注'=>'string',
            '校审人备注'=>'string',
            '分公司'=>'string'
        ];
        //数据中对应的字段，用于读取相应数据：
        $keys = ['modify_id','contract_id','modify_num','modify_type','plus_num','model_change_num','drawing_rec_date','drew_date', 'drew_people','review_people','drew_review_date','drawing_num', 'drew_people_remarks', 'drew_review_remarks', 'branch'];
        $data  = Db::name('modify')
            ->field($keys)
            ->select();
        $excel->exports('修改单受控图纸明细', $head, $data, $keys);
    }
}

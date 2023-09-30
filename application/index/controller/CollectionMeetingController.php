<?php
namespace app\index\controller;
use app\common\controller\ExcelController as expExcel;
use app\common\model\CollectionMeeting;
use think\Controller;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\Exception;
use think\exception\DbException;
use think\exception\PDOException;
use think\Request;
use think\Db;
use think\Session;
class CollectionMeetingController extends IndexController
{
    //-----------------------合同基本信息-----------------------------------------------
    public function index(){
        return $this->fetch();
    }
    public function meeting_calendar(){
        return $this->fetch();
    }

    /**
     * @throws DbException
     * @throws ModelNotFoundException
     * @throws DataNotFoundException
     */
    public function getCollectionMeetingInfo(Request $request){
        $requestData=$request->param();
        $company = $requestData['search_company'];
        $attention_level = $requestData['search_attention_level'];
        $customer_abbreviation = $requestData['search_customer_abbreviation'];

        $data=Db::name('collection_meeting')
            ->where('company', 'like', '%' . $company . '%')
            ->where('attention_level', 'like', '%' . $attention_level . '%')
            ->where('customer_abbreviation', 'like', '%' . $customer_abbreviation . '%')
            ->order('id','desc')
            ->select();
        $SqlJson=json_encode($data);
        echo  $SqlJson;
    }
    //更新会议纪要

    /**
     * @throws PDOException
     * @throws Exception
     */
    public function meetingRecordsEdit(Request $request){
        $data = $request->param();
        $update_data =array(
            'attention_level'=>$data['records_attention_level'],
            'meeting_records' => $data['records_meeting_records'],
            'id' => $data['records_id'],
        );
        $check=Db::name('collection_meeting')
            ->where(['id' => $data['records_id']])
            ->count();
        if($check>0){
            $result = Db::name('collection_meeting')
                ->update($update_data);
            if($result){
                return json(1);
            }else{
                return json(0);
            }
        }else{
            return json(0);
        }
    }
}
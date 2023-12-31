<?php
// 简单的原理重复记： namespace说明了该文件位于application\common\model 文件夹中
namespace app\common\model;
use think\Model;    //  导入think\Model类
/**
 * Quote 报价表
 */

// 我的类名叫做Quote，对应的文件名为Quote.php，该类继承了Model类，Model我们在文件头中，提前使用use进行了导入。
class Quote extends Model
{
    protected $table = 'helc_quote';
    /**
     *增加数据
     */
    static public function add()
    {

    }
    /**
     * 验证密码是否正确
     * @param  string $password 密码
     * @return bool
     */
    public function checkPassword($password)
    {
        if ($this->getData('password') === $this::encryptPassword($password))
        {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 注销
     * @return bool  成功true，失败false。
     * @author panjie
     */
    static public function logOut()
    {
        // 销毁session中数据
        session('staff_id', null);
        return true;
    }
    /**
     * 判断用户是否已登录
     * @return boolean 已登录true
     * @author  panjie <panjie@yunzhiclub.com>
     */
    static public function isLogin()
    {
        return true;
    }
    /**
     * 密码加密算法
     * @param    string                   $password 加密前密码
     * @return   string                             加密后密码
     * @author panjie@yunzhiclub.com http://www.mengyunzhi.com
     * @DateTime 2016-10-21T09:26:18+0800
     */
    static public function encryptPassword($password)
    {
        // 实际的过程中，我还还可以借助其它字符串算法，来实现不同的加密。
        //return sha1(md5($password) . 'mengyunzhi');
        return md5($password);
    }
}
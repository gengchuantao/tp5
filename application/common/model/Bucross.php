<?php
// 简单的原理重复记： namespace说明了该文件位于application\common\model 文件夹中
namespace app\common\model;
use think\Model;    //  导入think\Model类
/**
 * helc_cross 权限表
 */

class Bucross extends Model
{
    protected $table = 'helc_bucross';
}
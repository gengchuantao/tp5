<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// [ 应用入口文件 ]
//开启调试模式
define('APP_DEBUG',True);
// 定义应用目录
define('APP_PATH', __DIR__ . '/../application/');
define('EXTEND_PATH','/../vendor/');
define('APP_STATIC',__DIR__.'/../public/static/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';

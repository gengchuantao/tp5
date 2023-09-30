/*权限管理*/
let rate_authority = [];
let headOfficeIntoForceInfo = document.getElementById("headOfficeIntoForceInfo");
let headOfficeIntoForceCompareInfo = document.getElementById("headOfficeIntoForceCompareInfo");
let buIntoForceTop = document.getElementById("buIntoForceTop");
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/role/GetRoleInfo",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            rate_authority=data[i].rate;
        }
        if(rate_authority===1){
            headOfficeIntoForceInfo.style.display = "block"; // 隐藏该DIV元素
            headOfficeIntoForceCompareInfo.style.display = "block"; // 隐藏该DIV元素
            buIntoForceTop.style.display = "block"; // 隐藏该DIV元素
        }else{
            headOfficeIntoForceInfo.style.display = "none"; // 隐藏该DIV元素
            headOfficeIntoForceCompareInfo.style.display = "none"; // 隐藏该DIV元素
            buIntoForceTop.style.display = "none"; // 隐藏该DIV元素
        }
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("获取权限失败！");
    }
});







//➤本财年与上财年生效台量按月累计对比(K台)
let IntoforceSumCompare = echarts.init(document.getElementById('intoforce_sum_compare'));
IntoforceCompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthlyIntoforceSumCompare=[];
let Monthly1IntoforceSumCompare=[];
let LastYearIntoforceSumCompare=[];
let ThisYearIntoforceSumCompare=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/intoforce_sum_compare",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            MonthlyIntoforceSumCompare.push(data[i].last_year_monthly);
            Monthly1IntoforceSumCompare.push(data[i].this_year_monthly);
            LastYearIntoforceSumCompare.push(data[i].last_year_sum_consumed);
            ThisYearIntoforceSumCompare.push(data[i].this_year_sum_consumed);
        }
        IntoforceSumCompare.hideLoading();    //隐藏加载动画
        IntoforceSumCompare.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年 生效台量', '本财年 生效台量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '生效台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: Monthly1IntoforceSumCompare
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '生效台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: MonthlyIntoforceSumCompare
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年 生效台量',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    /*markPoint: {
                        effect : {
                            show: false,
                            shadowBlur : 0
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: '平均值',
                                label: {
                                    show:false,
                                    position: 'middle'
                                }
                            }
                        ]
                    },*/
                    data: LastYearIntoforceSumCompare
                },
                {
                    name:'本财年 生效台量',
                    type:'line',
                    smooth: true,
                    /*markPoint: {
                        effect : {
                            show: false,
                            shadowBlur : 0
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: '平均值',
                                label: {
                                    show: false,
                                    color: 'red',
                                    position: 'end'
                                }
                            }
                        ]
                    },*/
                    //itemStyle : { normal: {label : {show: true,}}},显示标签
                    data: ThisYearIntoforceSumCompare
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年与上财年生效台量按月累计对比加载错误！");}
});

//➤总公司大客户本财年生效情况
let KeyAccount = echarts.init(document.getElementById('key_account'));
KeyAccount.showLoading();    //数据加载完之前先显示一段简单的loading动画
let KeyAccountNames=[];
let KeyAccountValues=[];
let KeyAccounts=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/key_account",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(result){
        for(let i=0;i<result.length;i++){
            KeyAccountNames.push(result[i].name);
            KeyAccountValues.push(result[i].value);
            KeyAccounts.push(result[i]);
        }
        KeyAccount.hideLoading();    //隐藏加载动画
        KeyAccount.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: KeyAccountNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: KeyAccountValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#c23531',
                                    '#2f4554',
                                    '#61a0a8',
                                    '#d48265',
                                    '#91c7ae',
                                    '#749f83',
                                    '#ca8622',
                                    '#bda29a',
                                    '#6e7074',
                                    '#546570',
                                    '#c4ccd3'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("总公司大客户本财年生效情况加载错误！");}
});
//➤本地大客户本财年生效情况(台)
let LocalAccount = echarts.init(document.getElementById('local_account'));
LocalAccount.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LocalAccountNames=[];
let LocalAccountValues=[];
let LocalAccounts=[];
$.ajax({
    type:"get",
    url:"/../tp5/public/index.php/index/json/local_account",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            LocalAccountNames.push(result[i].name);
            LocalAccountValues.push(result[i].value);
            LocalAccounts.push(result[i]);
        }
        //  隐藏加载动画
        LocalAccount.hideLoading();
        LocalAccount.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: LocalAccountNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: LocalAccountValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本地大客户本财年生效情况加载错误！");}
});
//➤经销商客户本财年生效情况(台)
let Distributor = echarts.init(document.getElementById('distributor'));
Distributor.showLoading();    //数据加载完之前先显示一段简单的loading动画
let DistributorNames=[];
let DistributorValues=[];
let Distributors=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/distributor",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            DistributorNames.push(result[i].name);
            DistributorValues.push(result[i].value);
            Distributors.push(result[i]);
        }
        Distributor.hideLoading();
        Distributor.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: DistributorNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: DistributorValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("经销商客户本财年生效情况加载错误！");}
});

//➤总包客户本财年生效情况(台)
let generalContractor = echarts.init(document.getElementById('general_contractor'));
generalContractor.showLoading();    //数据加载完之前先显示一段简单的loading动画
let generalContractorNames=[];
let generalContractorValues=[];
let generalContractors=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/general_contractor",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            generalContractorNames.push(result[i].name);
            generalContractorValues.push(result[i].value);
            generalContractors.push(result[i]);
        }
        generalContractor.hideLoading();
        generalContractor.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: generalContractorNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: generalContractorValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("总包客户本财年生效情况加载错误！");}
});
// ➤各区域设备及安装均价对比(不含调验合同 K元)
let AveragePrice = echarts.init(document.getElementById('averageprice'));
AveragePrice.showLoading();    //数据加载完之前先显示一段简单的loading动画
let AveragePriceName=[];
let AveragePriceValue1=[];
let AveragePriceValue2=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/averageprice",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            AveragePriceName.push(data[i].name);
            AveragePriceValue1.push(data[i].value1);
            AveragePriceValue2.push(data[i].value2);
        }
        AveragePrice.hideLoading();    //隐藏加载动画
        AveragePrice.setOption({
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['设备均价','安装均价']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : AveragePriceName,
                    axisLabel :{
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'设备均价',
                    type:'bar',
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[15, 15, 0, 0]
                        }
                    },
                    data:AveragePriceValue1,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                },
                {
                    name:'安装均价',
                    type:'bar',
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[15, 15, 0, 0]
                        }
                    },
                    data:AveragePriceValue2,
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("各区域设备及安装均价对比加载错误！");
    }
});
//➤事业部本财年生效情况(台)
let buIntoForceTop15 = echarts.init(document.getElementById('buIntoForceTop15'));
buIntoForceTop15.showLoading();    //数据加载完之前先显示一段简单的loading动画
let buIntoForceTop15Names=[];
let buIntoForceTop15Values=[];
let buIntoForceTop15s=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/buIntoForceTop15",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            buIntoForceTop15Names.push(result[i].into_force_bu);
            buIntoForceTop15Values.push(result[i].into_force_sum);
            buIntoForceTop15s.push(result[i]);
        }
        buIntoForceTop15.hideLoading();
        buIntoForceTop15.setOption({
            xAxis: {
                show: true,
                type: 'category',
                axisLabel:{interval: 0},
                data: buIntoForceTop15Names
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: buIntoForceTop15Values,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("事业部本财年生效情况加载错误！");}
});
//➤本财年与上财年报价按月对比(K台)
let Quotecompare = echarts.init(document.getElementById('quotecompare'));
Quotecompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthlyQuoteCompare=[];
let Monthly1QuoteCompare=[];
let LastYearQuoteCompare=[];
let ThisYearQuoteCompare=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/quote_compare",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    cache: true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            MonthlyQuoteCompare.push(data[i].monthly);
            Monthly1QuoteCompare.push(data[i].monthly1);
            LastYearQuoteCompare.push(data[i].lastyear);
            ThisYearQuoteCompare.push(data[i].thisyear);
        }
        Quotecompare.hideLoading();    //隐藏加载动画
        Quotecompare.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年 报价台量', '本财年 报价台量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '报价台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: Monthly1QuoteCompare
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '报价台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: MonthlyQuoteCompare
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年 报价台量',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: LastYearQuoteCompare
                },
                {
                    name:'本财年 报价台量',
                    type:'line',
                    smooth: true,
                    data: ThisYearQuoteCompare
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年与上财年报价按月对比加载错误！");}
});

//➤本财年与上财年中标台量按月对比(K台)
let winBidCompare = echarts.init(document.getElementById('winBidCompare'));
winBidCompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
let winBidCompareMonthly=[];
let winBidCompareMonthly1=[];
let winBidCompareLastYear=[];
let winBidCompareThisYear=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/winBidCompare",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            winBidCompareMonthly.push(data[i].monthly);
            winBidCompareMonthly1.push(data[i].monthly1);
            winBidCompareLastYear.push(data[i].lastyear);
            winBidCompareThisYear.push(data[i].thisyear);
        }
        winBidCompare.hideLoading();    //隐藏加载动画
        winBidCompare.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年 中标台量', '本财年 中标台量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '报价台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: winBidCompareMonthly1
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '报价台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: winBidCompareMonthly
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年 中标台量',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: winBidCompareLastYear
                },
                {
                    name:'本财年 中标台量',
                    type:'line',
                    smooth: true,
                    data: winBidCompareThisYear
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年与上财年中标台量按月对比加载错误！");}
});
//➤本财年与上财年新签电梯按月对比(K台)
let NewContract = echarts.init(document.getElementById('newcontract'));
NewContract.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthlyNewContract=[];
let Monthly1NewContract=[];
let LastYearNewContract=[];
let ThisYearNewContract=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/new_contract",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            MonthlyNewContract.push(data[i].monthly);
            Monthly1NewContract.push(data[i].monthly1);
            LastYearNewContract.push(data[i].lastyear);
            ThisYearNewContract.push(data[i].thisyear);
        }
        NewContract.hideLoading();    //隐藏加载动画
        NewContract.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年 新签电梯', '本财年 新签电梯']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '新签电梯  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: Monthly1NewContract
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '新签电梯  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: MonthlyNewContract
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年 新签电梯',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: LastYearNewContract
                },
                {
                    name:'本财年 新签电梯',
                    type:'line',
                    smooth: true,
                    data: ThisYearNewContract
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年与上财年评审台量按月对比加载错误！");}
});

//➤总公司大客户本财年新签情况
let KeyAccountNewSign = echarts.init(document.getElementById('key_account_new_sign'));
KeyAccountNewSign.showLoading();    //数据加载完之前先显示一段简单的loading动画
let KeyAccountNewSignNames=[];
let KeyAccountNewSignValues=[];
let KeyAccountNewSigns=[];
$.ajax({
    type:"get",
    url:"/../tp5/public/index.php/index/json/key_account_new_sign",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            KeyAccountNewSignNames.push(result[i].name);
            KeyAccountNewSignValues.push(result[i].value);
            KeyAccountNewSigns.push(result[i]);
        }
        KeyAccountNewSign.hideLoading();    //隐藏加载动画
        KeyAccountNewSign.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: KeyAccountNewSignNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: KeyAccountNewSignValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("总公司大客户本财年新签情况加载错误！");}
});
//➤本地大客户本财年新签情况(台)
let LocalAccountNewSign = echarts.init(document.getElementById('local_account_new_sign'));
LocalAccountNewSign.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LocalAccountNewSignNames=[];
let LocalAccountNewSignValues=[];
let LocalAccountNewSigns=[];
$.ajax({
    type:"get",
    url:"/../tp5/public/index.php/index/json/local_account_new_sign",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            LocalAccountNewSignNames.push(result[i].name);
            LocalAccountNewSignValues.push(result[i].value);
            LocalAccountNewSigns.push(result[i]);
        }
        //  隐藏加载动画
        LocalAccountNewSign.hideLoading();
        LocalAccountNewSign.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: LocalAccountNewSignNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: LocalAccountNewSignValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本地大客户本财年新签情况加载错误！");}
});
//➤经销商客户本财年新签情况(台)
let DistributorNewSign = echarts.init(document.getElementById('distributor_new_sign'));
DistributorNewSign.showLoading();    //数据加载完之前先显示一段简单的loading动画
let DistributorNewSignNames=[];
let DistributorNewSignValues=[];
let DistributorNewSigns=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/distributor_new_sign",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            DistributorNewSignNames.push(result[i].name);
            DistributorNewSignValues.push(result[i].value);
            DistributorNewSigns.push(result[i]);
        }
        DistributorNewSign.hideLoading();
        DistributorNewSign.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: DistributorNewSignNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: DistributorNewSignValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("经销商客户本财年新签情况加载错误！");}
});

//➤总包客户本财年新签情况(台)
let generalContractorNewSign = echarts.init(document.getElementById('general_contractor_sign'));
generalContractorNewSign.showLoading();    //数据加载完之前先显示一段简单的loading动画
let generalContractorNewSignNames=[];
let generalContractorNewSignValues=[];
let generalContractorNewSigns=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/general_contractor_new_sign",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            generalContractorNewSignNames.push(result[i].name);
            generalContractorNewSignValues.push(result[i].value);
            generalContractorNewSigns.push(result[i]);
        }
        generalContractorNewSign.hideLoading();
        generalContractorNewSign.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: generalContractorNewSignNames
            },
            yAxis: {
                type: 'value',
                show:false,
            },
            series: [
                {
                    data: generalContractorNewSignValues,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    itemStyle: {
                        normal: {
                            //定义一个list，然后根据所以取得不同的值，这样就实现了，
                            color: function(params) {
                                // build a color map as your need.
                                let colorList = [
                                    '#dd6b66',
                                    '#759aa0',
                                    '#e69d87',
                                    '#8dc1a9',
                                    '#ea7e53',
                                    '#eedd78',
                                    '#73a373',
                                    '#73b9bc',
                                    '#7289ab',
                                    '#91ca8c',
                                    '#f49f42'
                                ];
                                return colorList[params.dataIndex]
                            },
                            //以下为是否显示，显示位置和显示格式的设置了
                            label: {
                                show: true,
                                position: 'top',
                                //formatter: '{b}\n{c}'
                            }
                        }
                    },
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("经销商客户本财年新签情况加载错误！");}
});

//➤16地市本财年与上财年新签电梯对比(台)
let CityNewContract = echarts.init(document.getElementById('city_new_contract'));
CityNewContract.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LastYearCityNewContract=[];
let ThisYearCityNewContract=[];
let CityName=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/city_new_contract",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            CityName.push(data[i].area);
            LastYearCityNewContract.push(data[i].lastyear);
            ThisYearCityNewContract.push(data[i].thisyear);
        }
        CityNewContract.hideLoading();    //隐藏加载动画
        CityNewContract.setOption({
            title: {
                text: "",
                subtext: "*按双方盖章日期统计",
                left: "center"
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                //     formatter: function(params){return Math.max(params.value,-params.value)}

                formatter: function (params) {
                    return params[0].name +
                        "<br>本财年：" + params[0].value +
                        "<br>上财年：" +  -params[1].value;
                }
            },
            legend: {
                data:['上财年', '本财年'],
                left: "left"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis : [
                {
                    type : 'value',
                    //max:2500,
                    //min:-2500
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : CityName
                }
            ],
            series : [
                {
                    name:'本财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#91cc75'],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    data:ThisYearCityNewContract
                },
                {
                    name:'上财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#5470c6'],
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params){return -params.value},
                        }
                    },
                    data:LastYearCityNewContract
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("16地市本财年与上财年新签电梯对比加载错误");}
});


//合计
let CityNewContractTotal = echarts.init(document.getElementById('city_new_contract_total'));
CityNewContractTotal.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LastYearCityNewContractTotal=[];
let ThisYearCityNewContractTotal=[];
let CityNameTotal=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/city_new_contract_total",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            //$(data).append("<option>"+data[i]+"</option>");
            //这里的element是页面dom事件中onfocus="getValue(this) 中的this
            CityNameTotal.push(data[i].area);
            LastYearCityNewContractTotal.push(data[i].lastyear);
            ThisYearCityNewContractTotal.push(data[i].thisyear);
        }
        CityNewContractTotal.hideLoading();    //隐藏加载动画
        CityNewContractTotal.setOption({
            title: {
                text: "",
                subtext: "",
                left: "right"
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    return params[0].name +
                        "<br>本财年：" + params[0].value +
                        "<br>上财年：" +  -params[1].value;
                }
            },
            legend: {
                data:['上财年', '本财年'],
                padding:0,
                bottom: "auto",
                show: false
            },
            grid: {
                y: '1%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: 5,
                containLabel: true,
                backgroundColor:'transparent'
            },
            xAxis : [
                {
                    type : 'value',
                    //max:15000,
                    //min:-15000
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : CityNameTotal
                }
            ],
            series : [

                {
                    name:'本财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#91cc75'],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    data:ThisYearCityNewContractTotal
                },
                {
                    name:'上财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#5470c6'],
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params){return -params.value}
                        }
                    },
                    data:LastYearCityNewContractTotal
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});
//window.addEventListener("resize",function(){CityNewContractTotal.resize();});

// ➤本财年与上财年总欠款按月对比(亿元)
let ArrearsCompare = echarts.init(document.getElementById('arrearscompare'));
ArrearsCompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LastDateArrearsCompare=[];
let ThisDateArrearsCompare=[];
let LastYearArrearsCompare=[];
let ThisYearArrearsCompare=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/arrearscompare",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            LastDateArrearsCompare.push(data[i].last_date);
            ThisDateArrearsCompare.push(data[i].this_date);
            LastYearArrearsCompare.push(data[i].lastyear);
            ThisYearArrearsCompare.push(data[i].thisyear);
        }
        ArrearsCompare.hideLoading();    //隐藏加载动画
        ArrearsCompare.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年欠款', '本财年欠款']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '总欠款  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ThisDateArrearsCompare
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '总欠款  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: LastDateArrearsCompare
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年欠款',
                    type:'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: LastYearArrearsCompare
                },
                {
                    name:'本财年欠款',
                    type:'line',
                    smooth: true,
                    data: ThisYearArrearsCompare
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年与上财年总欠款按月对比加载错误！");}
});
// ➤设备各期欠款欠款趋势按月对比(K元)
let equipmentArrearsOrderByMonthAndPeriod = echarts.init(document.getElementById('equipmentArrearsOrderByMonthAndPeriod'));
equipmentArrearsOrderByMonthAndPeriod.showLoading();    //数据加载完之前先显示一段简单的loading动画
let equipmentArrearsOrderByMonthAndPeriodPeriod=[];
let equipmentArrearsOrderByMonthAndPeriodMonth4=[];
let equipmentArrearsOrderByMonthAndPeriodMonth5=[];
let equipmentArrearsOrderByMonthAndPeriodMonth6=[];
let equipmentArrearsOrderByMonthAndPeriodMonth7=[];
let equipmentArrearsOrderByMonthAndPeriodMonth8=[];
let equipmentArrearsOrderByMonthAndPeriodMonth9=[];
let equipmentArrearsOrderByMonthAndPeriodMonth10=[];
let equipmentArrearsOrderByMonthAndPeriodMonth11=[];
let equipmentArrearsOrderByMonthAndPeriodMonth12=[];
let equipmentArrearsOrderByMonthAndPeriodMonth1=[];
let equipmentArrearsOrderByMonthAndPeriodMonth2=[];
let equipmentArrearsOrderByMonthAndPeriodMonth3=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/equipmentarrears/equipmentArrearsOrderByMonthAndPeriod",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            equipmentArrearsOrderByMonthAndPeriodPeriod.push(data[i].periods);
            equipmentArrearsOrderByMonthAndPeriodMonth4.push(data[i].month4);
            equipmentArrearsOrderByMonthAndPeriodMonth5.push(data[i].month5);
            equipmentArrearsOrderByMonthAndPeriodMonth6.push(data[i].month6);
            equipmentArrearsOrderByMonthAndPeriodMonth7.push(data[i].month7);
            equipmentArrearsOrderByMonthAndPeriodMonth8.push(data[i].month8);
            equipmentArrearsOrderByMonthAndPeriodMonth9.push(data[i].month9);
            equipmentArrearsOrderByMonthAndPeriodMonth10.push(data[i].month10);
            equipmentArrearsOrderByMonthAndPeriodMonth11.push(data[i].month11);
            equipmentArrearsOrderByMonthAndPeriodMonth12.push(data[i].month12);
            equipmentArrearsOrderByMonthAndPeriodMonth1.push(data[i].month1);
            equipmentArrearsOrderByMonthAndPeriodMonth2.push(data[i].month2);
            equipmentArrearsOrderByMonthAndPeriodMonth3.push(data[i].month3);
        }
        equipmentArrearsOrderByMonthAndPeriod.hideLoading();    //隐藏加载动画
        equipmentArrearsOrderByMonthAndPeriod.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: equipmentArrearsOrderByMonthAndPeriodPeriod
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: equipmentArrearsOrderByMonthAndPeriodPeriod[0],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    //itemStyle : { normal: {label : {show: true}}},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [equipmentArrearsOrderByMonthAndPeriodMonth4[0], equipmentArrearsOrderByMonthAndPeriodMonth5[0], equipmentArrearsOrderByMonthAndPeriodMonth6[0],equipmentArrearsOrderByMonthAndPeriodMonth7[0], equipmentArrearsOrderByMonthAndPeriodMonth8[0], equipmentArrearsOrderByMonthAndPeriodMonth9[0],equipmentArrearsOrderByMonthAndPeriodMonth10[0], equipmentArrearsOrderByMonthAndPeriodMonth11[0], equipmentArrearsOrderByMonthAndPeriodMonth12[0],equipmentArrearsOrderByMonthAndPeriodMonth1[0], equipmentArrearsOrderByMonthAndPeriodMonth2[0], equipmentArrearsOrderByMonthAndPeriodMonth3[0]]
                },
                {
                    name: equipmentArrearsOrderByMonthAndPeriodPeriod[1],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    itemStyle : { normal: {
                        label : {
                            show: true,
                            position: 'insideRight',
                        }
                    }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [equipmentArrearsOrderByMonthAndPeriodMonth4[1], equipmentArrearsOrderByMonthAndPeriodMonth5[1], equipmentArrearsOrderByMonthAndPeriodMonth6[1],equipmentArrearsOrderByMonthAndPeriodMonth7[1], equipmentArrearsOrderByMonthAndPeriodMonth8[1], equipmentArrearsOrderByMonthAndPeriodMonth9[1],equipmentArrearsOrderByMonthAndPeriodMonth10[1], equipmentArrearsOrderByMonthAndPeriodMonth11[1], equipmentArrearsOrderByMonthAndPeriodMonth12[1],equipmentArrearsOrderByMonthAndPeriodMonth1[1], equipmentArrearsOrderByMonthAndPeriodMonth2[1], equipmentArrearsOrderByMonthAndPeriodMonth3[1]]
                },
                {
                    name: equipmentArrearsOrderByMonthAndPeriodPeriod[2],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    itemStyle : { normal: {
                            label : {
                                show: true,
                                position: 'insideBottom',
                            }
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [equipmentArrearsOrderByMonthAndPeriodMonth4[2], equipmentArrearsOrderByMonthAndPeriodMonth5[2], equipmentArrearsOrderByMonthAndPeriodMonth6[2],equipmentArrearsOrderByMonthAndPeriodMonth7[2], equipmentArrearsOrderByMonthAndPeriodMonth8[2], equipmentArrearsOrderByMonthAndPeriodMonth9[2],equipmentArrearsOrderByMonthAndPeriodMonth10[2], equipmentArrearsOrderByMonthAndPeriodMonth11[2], equipmentArrearsOrderByMonthAndPeriodMonth12[2],equipmentArrearsOrderByMonthAndPeriodMonth1[2], equipmentArrearsOrderByMonthAndPeriodMonth2[2], equipmentArrearsOrderByMonthAndPeriodMonth3[2]]
                },
                {
                    name: equipmentArrearsOrderByMonthAndPeriodPeriod[3],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    //itemStyle : { normal: {label : {show: true}}},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [equipmentArrearsOrderByMonthAndPeriodMonth4[3], equipmentArrearsOrderByMonthAndPeriodMonth5[3], equipmentArrearsOrderByMonthAndPeriodMonth6[3],equipmentArrearsOrderByMonthAndPeriodMonth7[3], equipmentArrearsOrderByMonthAndPeriodMonth8[3], equipmentArrearsOrderByMonthAndPeriodMonth9[3],equipmentArrearsOrderByMonthAndPeriodMonth10[3], equipmentArrearsOrderByMonthAndPeriodMonth11[3], equipmentArrearsOrderByMonthAndPeriodMonth12[3],equipmentArrearsOrderByMonthAndPeriodMonth1[3], equipmentArrearsOrderByMonthAndPeriodMonth2[3], equipmentArrearsOrderByMonthAndPeriodMonth3[3]]
                },
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("设备各期欠款欠款趋势按月对比加载错误！");}
});
// ➤安装各期欠款欠款趋势按月对比(K元)
let installArrearsOrderByMonthAndPeriod = echarts.init(document.getElementById('installArrearsOrderByMonthAndPeriod'));
installArrearsOrderByMonthAndPeriod.showLoading();    //数据加载完之前先显示一段简单的loading动画
let installArrearsOrderByMonthAndPeriodPeriod=[];
let installArrearsOrderByMonthAndPeriodMonth4=[];
let installArrearsOrderByMonthAndPeriodMonth5=[];
let installArrearsOrderByMonthAndPeriodMonth6=[];
let installArrearsOrderByMonthAndPeriodMonth7=[];
let installArrearsOrderByMonthAndPeriodMonth8=[];
let installArrearsOrderByMonthAndPeriodMonth9=[];
let installArrearsOrderByMonthAndPeriodMonth10=[];
let installArrearsOrderByMonthAndPeriodMonth11=[];
let installArrearsOrderByMonthAndPeriodMonth12=[];
let installArrearsOrderByMonthAndPeriodMonth1=[];
let installArrearsOrderByMonthAndPeriodMonth2=[];
let installArrearsOrderByMonthAndPeriodMonth3=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/installarrears/installArrearsOrderByMonthAndPeriod",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            installArrearsOrderByMonthAndPeriodPeriod.push(data[i].periods);
            installArrearsOrderByMonthAndPeriodMonth4.push(data[i].month4);
            installArrearsOrderByMonthAndPeriodMonth5.push(data[i].month5);
            installArrearsOrderByMonthAndPeriodMonth6.push(data[i].month6);
            installArrearsOrderByMonthAndPeriodMonth7.push(data[i].month7);
            installArrearsOrderByMonthAndPeriodMonth8.push(data[i].month8);
            installArrearsOrderByMonthAndPeriodMonth9.push(data[i].month9);
            installArrearsOrderByMonthAndPeriodMonth10.push(data[i].month10);
            installArrearsOrderByMonthAndPeriodMonth11.push(data[i].month11);
            installArrearsOrderByMonthAndPeriodMonth12.push(data[i].month12);
            installArrearsOrderByMonthAndPeriodMonth1.push(data[i].month1);
            installArrearsOrderByMonthAndPeriodMonth2.push(data[i].month2);
            installArrearsOrderByMonthAndPeriodMonth3.push(data[i].month3);
        }
        installArrearsOrderByMonthAndPeriod.hideLoading();    //隐藏加载动画
        installArrearsOrderByMonthAndPeriod.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: installArrearsOrderByMonthAndPeriodPeriod
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: installArrearsOrderByMonthAndPeriodPeriod[0],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installArrearsOrderByMonthAndPeriodMonth4[0], installArrearsOrderByMonthAndPeriodMonth5[0], installArrearsOrderByMonthAndPeriodMonth6[0],installArrearsOrderByMonthAndPeriodMonth7[0], installArrearsOrderByMonthAndPeriodMonth8[0], installArrearsOrderByMonthAndPeriodMonth9[0],installArrearsOrderByMonthAndPeriodMonth10[0], installArrearsOrderByMonthAndPeriodMonth11[0], installArrearsOrderByMonthAndPeriodMonth12[0],installArrearsOrderByMonthAndPeriodMonth1[0], installArrearsOrderByMonthAndPeriodMonth2[0], installArrearsOrderByMonthAndPeriodMonth3[0]]
                },
                {
                    name: installArrearsOrderByMonthAndPeriodPeriod[1],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    itemStyle : { normal: {
                            label : {
                                show: true,
                                position: 'insideBottom',
                            }
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installArrearsOrderByMonthAndPeriodMonth4[1], installArrearsOrderByMonthAndPeriodMonth5[1], installArrearsOrderByMonthAndPeriodMonth6[1],installArrearsOrderByMonthAndPeriodMonth7[1], installArrearsOrderByMonthAndPeriodMonth8[1], installArrearsOrderByMonthAndPeriodMonth9[1],installArrearsOrderByMonthAndPeriodMonth10[1], installArrearsOrderByMonthAndPeriodMonth11[1], installArrearsOrderByMonthAndPeriodMonth12[1],installArrearsOrderByMonthAndPeriodMonth1[1], installArrearsOrderByMonthAndPeriodMonth2[1], installArrearsOrderByMonthAndPeriodMonth3[1]]
                },
                {
                    name: installArrearsOrderByMonthAndPeriodPeriod[2],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    itemStyle : { normal: {
                            label : {
                                show: true,
                                position: 'insideBottom',
                            }
                        }
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installArrearsOrderByMonthAndPeriodMonth4[2], installArrearsOrderByMonthAndPeriodMonth5[2], installArrearsOrderByMonthAndPeriodMonth6[2],installArrearsOrderByMonthAndPeriodMonth7[2], installArrearsOrderByMonthAndPeriodMonth8[2], installArrearsOrderByMonthAndPeriodMonth9[2],installArrearsOrderByMonthAndPeriodMonth10[2], installArrearsOrderByMonthAndPeriodMonth11[2], installArrearsOrderByMonthAndPeriodMonth12[2],installArrearsOrderByMonthAndPeriodMonth1[2], installArrearsOrderByMonthAndPeriodMonth2[2], installArrearsOrderByMonthAndPeriodMonth3[2]]
                },
                {
                    name: installArrearsOrderByMonthAndPeriodPeriod[3],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installArrearsOrderByMonthAndPeriodMonth4[3], installArrearsOrderByMonthAndPeriodMonth5[3], installArrearsOrderByMonthAndPeriodMonth6[3],installArrearsOrderByMonthAndPeriodMonth7[3], installArrearsOrderByMonthAndPeriodMonth8[3], installArrearsOrderByMonthAndPeriodMonth9[3],installArrearsOrderByMonthAndPeriodMonth10[3], installArrearsOrderByMonthAndPeriodMonth11[3], installArrearsOrderByMonthAndPeriodMonth12[3],installArrearsOrderByMonthAndPeriodMonth1[3], installArrearsOrderByMonthAndPeriodMonth2[3], installArrearsOrderByMonthAndPeriodMonth3[3]]
                },
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("安装各期欠款欠款趋势按月对比加载错误！");}
});
//  ➤欠款账龄结构(K元)
let AccountAge = echarts.init(document.getElementById('account_age'));
AccountAge.showLoading();
$.ajax({
        url:"/../tp5/public/index.php/index/json/install_account_age",
        type:'get',
        dataType:'json',
        cache: true,
        async:true,
        success: function(data1){
            $.ajax({
                    url:"/../tp5/public/index.php/index/json/eq_account_age",
                    type:'get',
                    dataType:'json',
                    success: function(data2) {
                        AccountAge.hideLoading();    //隐藏加载动画
                        option = {
                            baseOption: {
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a}<br/>{b}<br/>{c}({d}%)"
                                },
                                legend: {
                                    show: false,
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        mark : {show: true},
                                        dataView : {show: true, readOnly: false},
                                        magicType : {
                                            show: true,
                                            type: ['pie', 'funnel']
                                        },
                                        restore : {show: true},
                                        saveAsImage : {show: true}
                                    }
                                },
                                calculable : true,
                                series : [
                                    {
                                        name:'安装',
                                        type:'pie',
                                        minAngle: 5,
                                        avoidLabelOverlap: true,
                                        itemStyle: {
                                            borderRadius: 10,
                                            borderColor: '#fff',
                                            borderWidth: 2
                                        },
                                        label: {
                                            show: true,
                                            formatter: "{a}\n{b}\n{d}%",
                                        },
                                        data:data1
                                    },
                                    {
                                        name:'设备',
                                        type:'pie',
                                        minAngle: 5,
                                        avoidLabelOverlap: true,
                                        itemStyle: {
                                            borderRadius: 10,
                                            borderColor: '#fff',
                                            borderWidth: 2
                                        },
                                        label: {
                                            show: true,
                                            formatter: "{a}\n{b}\n{d}%",
                                        },
                                        data:data2
                                    }
                                ]
                            },
                            media: [
                                {
                                    option: {
                                        series: [
                                            {
                                                radius: [20, 50],
                                                center: ['25%', '50%']
                                            },
                                            {
                                                radius: [20, 50],
                                                center: ['70%', '50%']
                                            }
                                        ]
                                    }
                                },
                                {
                                    query: {
                                        minAspectRatio: 1
                                    },
                                    option: {
                                        series: [
                                            {
                                                radius: [20, 60],
                                                center: ['25%', '50%']
                                            },
                                            {
                                                radius: [20, 60],
                                                center: ['75%', '50%']
                                            }
                                        ]
                                    }
                                },
                                {
                                    query: {
                                        maxAspectRatio: 1
                                    },
                                    option: {
                                        series: [
                                            {
                                                radius: [20, 60],
                                                center: ['50%', '30%']
                                            },
                                            {
                                                radius: [20, 60],
                                                center: ['50%', '80%']
                                            }
                                        ]
                                    }
                                },
                                {
                                    query: {
                                        maxWidth: 500
                                    },
                                    option: {
                                        series: [
                                            {
                                                radius: [20, 60],
                                                center: ['50%', '30%']
                                            },
                                            {
                                                radius: [20, 60],
                                                center: ['50%', '80%']
                                            }
                                        ]
                                    }
                                }
                            ]
                        };
                        AccountAge.setOption(option);
                        option && AccountAge.setOption(option);
                    }
                });
        },
        error:function(){alert("欠款账龄结构加载错误！");}
});
//  ➤欠款客户构成(K元)
let arrearsCustomer = echarts.init(document.getElementById('arrearsCustomer'));
arrearsCustomer.showLoading();
$.ajax({
    url:"/../tp5/public/index.php/index/json/installArrearsCustomer",
    type:'GET',
    dataType:'json',
    cache: true,
    async:true,
    success: function(data1){
        $.ajax({
            url:"/../tp5/public/index.php/index/json/equipmentArrearsCustomer",
            type:'GET',
            dataType:'json',
            success: function(data2) {
                arrearsCustomer.hideLoading();    //隐藏加载动画
                option = {
                    baseOption: {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a}<br/>{b}<br/>{c}({d}%)"
                        },
                        legend: {
                            show: false,
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {
                                    show: true,
                                    type: ['pie', 'funnel']
                                },
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        series : [
                            {
                                name:'安装',
                                type:'pie',
                                minAngle: 5,
                                avoidLabelOverlap: true,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: true,
                                    formatter: "{a}\n{b}\n{d}%",
                                },
                                data:data1
                            },
                            {
                                name:'设备',
                                type:'pie',
                                minAngle: 5,
                                avoidLabelOverlap: true,
                                itemStyle: {
                                    borderRadius: 10,
                                    borderColor: '#fff',
                                    borderWidth: 2
                                },
                                label: {
                                    show: true,
                                    formatter: "{a}\n{b}\n{d}%",
                                },
                                data:data2
                            }
                        ]
                    },
                    media: [
                        {
                            option: {
                                series: [
                                    {
                                        radius: [20, 50],
                                        center: ['25%', '50%']
                                    },
                                    {
                                        radius: [20, 50],
                                        center: ['70%', '50%']
                                    }
                                ]
                            }
                        },
                        {
                            query: {
                                minAspectRatio: 1
                            },
                            option: {
                                series: [
                                    {
                                        radius: [20, 60],
                                        center: ['25%', '50%']
                                    },
                                    {
                                        radius: [20, 60],
                                        center: ['75%', '50%']
                                    }
                                ]
                            }
                        },
                        {
                            query: {
                                maxAspectRatio: 1
                            },
                            option: {
                                series: [
                                    {
                                        radius: [20, 60],
                                        center: ['50%', '30%']
                                    },
                                    {
                                        radius: [20, 60],
                                        center: ['50%', '80%']
                                    }
                                ]
                            }
                        },
                        {
                            query: {
                                maxWidth: 500
                            },
                            option: {
                                series: [
                                    {
                                        radius: [20, 60],
                                        center: ['50%', '30%']
                                    },
                                    {
                                        radius: [20, 60],
                                        center: ['50%', '80%']
                                    }
                                ]
                            }
                        }
                    ]
                };
                arrearsCustomer.setOption(option);
                option && arrearsCustomer.setOption(option);
            }
        });
    },
    error:function(){alert("欠款客户构成加载错误！");}
});
// ➤KA客户安装1年以上欠款TOP10按月汇总(K元)
let keyAccountInstallTop10 = echarts.init(document.getElementById('keyAccountInstallTop10'));
keyAccountInstallTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let keyAccountInstallTop10Customer=[];
let keyAccountInstallTop10Month4=[];
let keyAccountInstallTop10Month5=[];
let keyAccountInstallTop10Month6=[];
let keyAccountInstallTop10Month7=[];
let keyAccountInstallTop10Month8=[];
let keyAccountInstallTop10Month9=[];
let keyAccountInstallTop10Month10=[];
let keyAccountInstallTop10Month11=[];
let keyAccountInstallTop10Month12=[];
let keyAccountInstallTop10Month1=[];
let keyAccountInstallTop10Month2=[];
let keyAccountInstallTop10Month3=[];
let series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/key_account_install_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            keyAccountInstallTop10Customer.push(data[i].customer_abbreviation);
            keyAccountInstallTop10Month4.push(data[i].month_4);
            keyAccountInstallTop10Month5.push(data[i].month_5);
            keyAccountInstallTop10Month6.push(data[i].month_6);
            keyAccountInstallTop10Month7.push(data[i].month_7);
            keyAccountInstallTop10Month8.push(data[i].month_8);
            keyAccountInstallTop10Month9.push(data[i].month_9);
            keyAccountInstallTop10Month10.push(data[i].month_10);
            keyAccountInstallTop10Month11.push(data[i].month_11);
            keyAccountInstallTop10Month12.push(data[i].month_12);
            keyAccountInstallTop10Month1.push(data[i].month_1);
            keyAccountInstallTop10Month2.push(data[i].month_2);
            keyAccountInstallTop10Month3.push(data[i].month_3);
            series.push({
                    name: keyAccountInstallTop10Customer[i],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [keyAccountInstallTop10Month4[i], keyAccountInstallTop10Month5[i], keyAccountInstallTop10Month6[i],keyAccountInstallTop10Month7[i], keyAccountInstallTop10Month8[i], keyAccountInstallTop10Month9[i],keyAccountInstallTop10Month10[i], keyAccountInstallTop10Month11[i], keyAccountInstallTop10Month12[i],keyAccountInstallTop10Month1[i], keyAccountInstallTop10Month2[i], keyAccountInstallTop10Month3[i]]
                });

        }
        keyAccountInstallTop10.hideLoading();    //隐藏加载动画
        keyAccountInstallTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: keyAccountInstallTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("KA客户安装1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤KA客户设备1年以上欠款TOP10按月汇总(K元)
let keyAccountEquipmentTop10 = echarts.init(document.getElementById('keyAccountEquipmentTop10'));
keyAccountEquipmentTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let keyAccountEquipmentTop10Customer=[];
let keyAccountEquipmentTop10Month4=[];
let keyAccountEquipmentTop10Month5=[];
let keyAccountEquipmentTop10Month6=[];
let keyAccountEquipmentTop10Month7=[];
let keyAccountEquipmentTop10Month8=[];
let keyAccountEquipmentTop10Month9=[];
let keyAccountEquipmentTop10Month10=[];
let keyAccountEquipmentTop10Month11=[];
let keyAccountEquipmentTop10Month12=[];
let keyAccountEquipmentTop10Month1=[];
let keyAccountEquipmentTop10Month2=[];
let keyAccountEquipmentTop10Month3=[];
let keyAccountEquipmentTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/key_account_equipment_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            keyAccountEquipmentTop10Customer.push(data[i].customer_abbreviation);
            keyAccountEquipmentTop10Month4.push(data[i].month_4);
            keyAccountEquipmentTop10Month5.push(data[i].month_5);
            keyAccountEquipmentTop10Month6.push(data[i].month_6);
            keyAccountEquipmentTop10Month7.push(data[i].month_7);
            keyAccountEquipmentTop10Month8.push(data[i].month_8);
            keyAccountEquipmentTop10Month9.push(data[i].month_9);
            keyAccountEquipmentTop10Month10.push(data[i].month_10);
            keyAccountEquipmentTop10Month11.push(data[i].month_11);
            keyAccountEquipmentTop10Month12.push(data[i].month_12);
            keyAccountEquipmentTop10Month1.push(data[i].month_1);
            keyAccountEquipmentTop10Month2.push(data[i].month_2);
            keyAccountEquipmentTop10Month3.push(data[i].month_3);
            keyAccountEquipmentTop10Series.push({
                name: keyAccountEquipmentTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [keyAccountEquipmentTop10Month4[i], keyAccountEquipmentTop10Month5[i], keyAccountEquipmentTop10Month6[i],keyAccountEquipmentTop10Month7[i], keyAccountEquipmentTop10Month8[i], keyAccountEquipmentTop10Month9[i],keyAccountEquipmentTop10Month10[i], keyAccountEquipmentTop10Month11[i], keyAccountEquipmentTop10Month12[i],keyAccountEquipmentTop10Month1[i], keyAccountEquipmentTop10Month2[i], keyAccountEquipmentTop10Month3[i]]
            });

        }
        keyAccountEquipmentTop10.hideLoading();    //隐藏加载动画
        keyAccountEquipmentTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: keyAccountEquipmentTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: keyAccountEquipmentTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("KA客户设备1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤本地大客户安装1年以上欠款TOP10按月汇总(K元)
let localAccountInstallTop10 = echarts.init(document.getElementById('localAccountInstallTop10'));
localAccountInstallTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let localAccountInstallTop10Customer=[];
let localAccountInstallTop10Month4=[];
let localAccountInstallTop10Month5=[];
let localAccountInstallTop10Month6=[];
let localAccountInstallTop10Month7=[];
let localAccountInstallTop10Month8=[];
let localAccountInstallTop10Month9=[];
let localAccountInstallTop10Month10=[];
let localAccountInstallTop10Month11=[];
let localAccountInstallTop10Month12=[];
let localAccountInstallTop10Month1=[];
let localAccountInstallTop10Month2=[];
let localAccountInstallTop10Month3=[];
let localAccountInstallTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/local_account_install_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            localAccountInstallTop10Customer.push(data[i].customer_abbreviation);
            localAccountInstallTop10Month4.push(data[i].month_4);
            localAccountInstallTop10Month5.push(data[i].month_5);
            localAccountInstallTop10Month6.push(data[i].month_6);
            localAccountInstallTop10Month7.push(data[i].month_7);
            localAccountInstallTop10Month8.push(data[i].month_8);
            localAccountInstallTop10Month9.push(data[i].month_9);
            localAccountInstallTop10Month10.push(data[i].month_10);
            localAccountInstallTop10Month11.push(data[i].month_11);
            localAccountInstallTop10Month12.push(data[i].month_12);
            localAccountInstallTop10Month1.push(data[i].month_1);
            localAccountInstallTop10Month2.push(data[i].month_2);
            localAccountInstallTop10Month3.push(data[i].month_3);
            localAccountInstallTop10Series.push({
                name: localAccountInstallTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [localAccountInstallTop10Month4[i], localAccountInstallTop10Month5[i], localAccountInstallTop10Month6[i],localAccountInstallTop10Month7[i], localAccountInstallTop10Month8[i], localAccountInstallTop10Month9[i],localAccountInstallTop10Month10[i], localAccountInstallTop10Month11[i], localAccountInstallTop10Month12[i],localAccountInstallTop10Month1[i], localAccountInstallTop10Month2[i], localAccountInstallTop10Month3[i]]
            });

        }
        localAccountInstallTop10.hideLoading();    //隐藏加载动画
        localAccountInstallTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: localAccountInstallTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: localAccountInstallTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本地大客户安装1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤本地大客户设备1年以上欠款TOP10按月汇总(K元)
let localAccountEquipmentTop10 = echarts.init(document.getElementById('localAccountEquipmentTop10'));
localAccountEquipmentTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let localAccountEquipmentTop10Customer=[];
let localAccountEquipmentTop10Month4=[];
let localAccountEquipmentTop10Month5=[];
let localAccountEquipmentTop10Month6=[];
let localAccountEquipmentTop10Month7=[];
let localAccountEquipmentTop10Month8=[];
let localAccountEquipmentTop10Month9=[];
let localAccountEquipmentTop10Month10=[];
let localAccountEquipmentTop10Month11=[];
let localAccountEquipmentTop10Month12=[];
let localAccountEquipmentTop10Month1=[];
let localAccountEquipmentTop10Month2=[];
let localAccountEquipmentTop10Month3=[];
let localAccountEquipmentTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/local_account_equipment_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            localAccountEquipmentTop10Customer.push(data[i].customer_abbreviation);
            localAccountEquipmentTop10Month4.push(data[i].month_4);
            localAccountEquipmentTop10Month5.push(data[i].month_5);
            localAccountEquipmentTop10Month6.push(data[i].month_6);
            localAccountEquipmentTop10Month7.push(data[i].month_7);
            localAccountEquipmentTop10Month8.push(data[i].month_8);
            localAccountEquipmentTop10Month9.push(data[i].month_9);
            localAccountEquipmentTop10Month10.push(data[i].month_10);
            localAccountEquipmentTop10Month11.push(data[i].month_11);
            localAccountEquipmentTop10Month12.push(data[i].month_12);
            localAccountEquipmentTop10Month1.push(data[i].month_1);
            localAccountEquipmentTop10Month2.push(data[i].month_2);
            localAccountEquipmentTop10Month3.push(data[i].month_3);
            localAccountEquipmentTop10Series.push({
                name: localAccountEquipmentTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [localAccountEquipmentTop10Month4[i], localAccountEquipmentTop10Month5[i], localAccountEquipmentTop10Month6[i],localAccountEquipmentTop10Month7[i], localAccountEquipmentTop10Month8[i], localAccountEquipmentTop10Month9[i],localAccountEquipmentTop10Month10[i], localAccountEquipmentTop10Month11[i], localAccountEquipmentTop10Month12[i],localAccountEquipmentTop10Month1[i], localAccountEquipmentTop10Month2[i], localAccountEquipmentTop10Month3[i]]
            });

        }
        localAccountEquipmentTop10.hideLoading();    //隐藏加载动画
        localAccountEquipmentTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: localAccountEquipmentTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: localAccountEquipmentTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本地大客户设备1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤总包安装1年以上欠款TOP10按月汇总(K元)
let contractorAccountInstallTop10 = echarts.init(document.getElementById('contractorAccountInstallTop10'));
contractorAccountInstallTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let contractorAccountInstallTop10Customer=[];
let contractorAccountInstallTop10Month4=[];
let contractorAccountInstallTop10Month5=[];
let contractorAccountInstallTop10Month6=[];
let contractorAccountInstallTop10Month7=[];
let contractorAccountInstallTop10Month8=[];
let contractorAccountInstallTop10Month9=[];
let contractorAccountInstallTop10Month10=[];
let contractorAccountInstallTop10Month11=[];
let contractorAccountInstallTop10Month12=[];
let contractorAccountInstallTop10Month1=[];
let contractorAccountInstallTop10Month2=[];
let contractorAccountInstallTop10Month3=[];
let contractorAccountInstallTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/contractor_account_install_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            contractorAccountInstallTop10Customer.push(data[i].customer_abbreviation);
            contractorAccountInstallTop10Month4.push(data[i].month_4);
            contractorAccountInstallTop10Month5.push(data[i].month_5);
            contractorAccountInstallTop10Month6.push(data[i].month_6);
            contractorAccountInstallTop10Month7.push(data[i].month_7);
            contractorAccountInstallTop10Month8.push(data[i].month_8);
            contractorAccountInstallTop10Month9.push(data[i].month_9);
            contractorAccountInstallTop10Month10.push(data[i].month_10);
            contractorAccountInstallTop10Month11.push(data[i].month_11);
            contractorAccountInstallTop10Month12.push(data[i].month_12);
            contractorAccountInstallTop10Month1.push(data[i].month_1);
            contractorAccountInstallTop10Month2.push(data[i].month_2);
            contractorAccountInstallTop10Month3.push(data[i].month_3);
            contractorAccountInstallTop10Series.push({
                name: contractorAccountInstallTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [contractorAccountInstallTop10Month4[i], contractorAccountInstallTop10Month5[i], contractorAccountInstallTop10Month6[i],contractorAccountInstallTop10Month7[i], contractorAccountInstallTop10Month8[i], contractorAccountInstallTop10Month9[i],contractorAccountInstallTop10Month10[i], contractorAccountInstallTop10Month11[i], contractorAccountInstallTop10Month12[i],contractorAccountInstallTop10Month1[i], contractorAccountInstallTop10Month2[i], contractorAccountInstallTop10Month3[i]]
            });

        }
        contractorAccountInstallTop10.hideLoading();    //隐藏加载动画
        contractorAccountInstallTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: contractorAccountInstallTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: contractorAccountInstallTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("总包安装1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤总包设备1年以上欠款TOP10按月汇总(K元)
let contractorAccountEquipmentTop10 = echarts.init(document.getElementById('contractorAccountEquipmentTop10'));
contractorAccountEquipmentTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let contractorAccountEquipmentTop10Customer=[];
let contractorAccountEquipmentTop10Month4=[];
let contractorAccountEquipmentTop10Month5=[];
let contractorAccountEquipmentTop10Month6=[];
let contractorAccountEquipmentTop10Month7=[];
let contractorAccountEquipmentTop10Month8=[];
let contractorAccountEquipmentTop10Month9=[];
let contractorAccountEquipmentTop10Month10=[];
let contractorAccountEquipmentTop10Month11=[];
let contractorAccountEquipmentTop10Month12=[];
let contractorAccountEquipmentTop10Month1=[];
let contractorAccountEquipmentTop10Month2=[];
let contractorAccountEquipmentTop10Month3=[];
let contractorAccountEquipmentTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/contractor_account_equipment_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            contractorAccountEquipmentTop10Customer.push(data[i].customer_abbreviation);
            contractorAccountEquipmentTop10Month4.push(data[i].month_4);
            contractorAccountEquipmentTop10Month5.push(data[i].month_5);
            contractorAccountEquipmentTop10Month6.push(data[i].month_6);
            contractorAccountEquipmentTop10Month7.push(data[i].month_7);
            contractorAccountEquipmentTop10Month8.push(data[i].month_8);
            contractorAccountEquipmentTop10Month9.push(data[i].month_9);
            contractorAccountEquipmentTop10Month10.push(data[i].month_10);
            contractorAccountEquipmentTop10Month11.push(data[i].month_11);
            contractorAccountEquipmentTop10Month12.push(data[i].month_12);
            contractorAccountEquipmentTop10Month1.push(data[i].month_1);
            contractorAccountEquipmentTop10Month2.push(data[i].month_2);
            contractorAccountEquipmentTop10Month3.push(data[i].month_3);
            contractorAccountEquipmentTop10Series.push({
                name: contractorAccountEquipmentTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [contractorAccountEquipmentTop10Month4[i], contractorAccountEquipmentTop10Month5[i], contractorAccountEquipmentTop10Month6[i],contractorAccountEquipmentTop10Month7[i], contractorAccountEquipmentTop10Month8[i], contractorAccountEquipmentTop10Month9[i],contractorAccountEquipmentTop10Month10[i], contractorAccountEquipmentTop10Month11[i], contractorAccountEquipmentTop10Month12[i],contractorAccountEquipmentTop10Month1[i], contractorAccountEquipmentTop10Month2[i], contractorAccountEquipmentTop10Month3[i]]
            });

        }
        contractorAccountEquipmentTop10.hideLoading();    //隐藏加载动画
        contractorAccountEquipmentTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: contractorAccountEquipmentTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: contractorAccountEquipmentTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("总包设备1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤普通客户安装1年以上欠款TOP10按月汇总(K元)
let ptAccountInstallTop10 = echarts.init(document.getElementById('ptAccountInstallTop10'));
ptAccountInstallTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let ptAccountInstallTop10Customer=[];
let ptAccountInstallTop10Month4=[];
let ptAccountInstallTop10Month5=[];
let ptAccountInstallTop10Month6=[];
let ptAccountInstallTop10Month7=[];
let ptAccountInstallTop10Month8=[];
let ptAccountInstallTop10Month9=[];
let ptAccountInstallTop10Month10=[];
let ptAccountInstallTop10Month11=[];
let ptAccountInstallTop10Month12=[];
let ptAccountInstallTop10Month1=[];
let ptAccountInstallTop10Month2=[];
let ptAccountInstallTop10Month3=[];
let ptAccountInstallTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/pt_account_install_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            ptAccountInstallTop10Customer.push(data[i].clause_customer);
            ptAccountInstallTop10Month4.push(data[i].month_4);
            ptAccountInstallTop10Month5.push(data[i].month_5);
            ptAccountInstallTop10Month6.push(data[i].month_6);
            ptAccountInstallTop10Month7.push(data[i].month_7);
            ptAccountInstallTop10Month8.push(data[i].month_8);
            ptAccountInstallTop10Month9.push(data[i].month_9);
            ptAccountInstallTop10Month10.push(data[i].month_10);
            ptAccountInstallTop10Month11.push(data[i].month_11);
            ptAccountInstallTop10Month12.push(data[i].month_12);
            ptAccountInstallTop10Month1.push(data[i].month_1);
            ptAccountInstallTop10Month2.push(data[i].month_2);
            ptAccountInstallTop10Month3.push(data[i].month_3);
            ptAccountInstallTop10Series.push({
                name: ptAccountInstallTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [ptAccountInstallTop10Month4[i], ptAccountInstallTop10Month5[i], ptAccountInstallTop10Month6[i],ptAccountInstallTop10Month7[i], ptAccountInstallTop10Month8[i], ptAccountInstallTop10Month9[i],ptAccountInstallTop10Month10[i], ptAccountInstallTop10Month11[i], ptAccountInstallTop10Month12[i],ptAccountInstallTop10Month1[i], ptAccountInstallTop10Month2[i], ptAccountInstallTop10Month3[i]]
            });

        }
        ptAccountInstallTop10.hideLoading();    //隐藏加载动画
        ptAccountInstallTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: ptAccountInstallTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: ptAccountInstallTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("普通客户安装1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤普通客户设备1年以上欠款TOP10按月汇总(K元)
let ptAccountEquipmentTop10 = echarts.init(document.getElementById('ptAccountEquipmentTop10'));
ptAccountEquipmentTop10.showLoading();    //数据加载完之前先显示一段简单的loading动画
let ptAccountEquipmentTop10Customer=[];
let ptAccountEquipmentTop10Month4=[];
let ptAccountEquipmentTop10Month5=[];
let ptAccountEquipmentTop10Month6=[];
let ptAccountEquipmentTop10Month7=[];
let ptAccountEquipmentTop10Month8=[];
let ptAccountEquipmentTop10Month9=[];
let ptAccountEquipmentTop10Month10=[];
let ptAccountEquipmentTop10Month11=[];
let ptAccountEquipmentTop10Month12=[];
let ptAccountEquipmentTop10Month1=[];
let ptAccountEquipmentTop10Month2=[];
let ptAccountEquipmentTop10Month3=[];
let ptAccountEquipmentTop10Series = [];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/pt_account_equipment_top10",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            ptAccountEquipmentTop10Customer.push(data[i].clause_customer);
            ptAccountEquipmentTop10Month4.push(data[i].month_4);
            ptAccountEquipmentTop10Month5.push(data[i].month_5);
            ptAccountEquipmentTop10Month6.push(data[i].month_6);
            ptAccountEquipmentTop10Month7.push(data[i].month_7);
            ptAccountEquipmentTop10Month8.push(data[i].month_8);
            ptAccountEquipmentTop10Month9.push(data[i].month_9);
            ptAccountEquipmentTop10Month10.push(data[i].month_10);
            ptAccountEquipmentTop10Month11.push(data[i].month_11);
            ptAccountEquipmentTop10Month12.push(data[i].month_12);
            ptAccountEquipmentTop10Month1.push(data[i].month_1);
            ptAccountEquipmentTop10Month2.push(data[i].month_2);
            ptAccountEquipmentTop10Month3.push(data[i].month_3);
            ptAccountEquipmentTop10Series.push({
                name: ptAccountEquipmentTop10Customer[i],
                type: 'line',
                stack: 'Total',
                smooth: true,
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [ptAccountEquipmentTop10Month4[i], ptAccountEquipmentTop10Month5[i], ptAccountEquipmentTop10Month6[i],ptAccountEquipmentTop10Month7[i], ptAccountEquipmentTop10Month8[i], ptAccountEquipmentTop10Month9[i],ptAccountEquipmentTop10Month10[i], ptAccountEquipmentTop10Month11[i], ptAccountEquipmentTop10Month12[i],ptAccountEquipmentTop10Month1[i], ptAccountEquipmentTop10Month2[i], ptAccountEquipmentTop10Month3[i]]
            });

        }
        ptAccountEquipmentTop10.hideLoading();    //隐藏加载动画
        ptAccountEquipmentTop10.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend:{
                data: ptAccountEquipmentTop10Customer
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: ptAccountEquipmentTop10Series,
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("普通客户设备1年以上欠款TOP10按月汇总加载错误！");}
});
// ➤区域设备入金按月汇总(K元)
let equipmentIncomeByMonth = echarts.init(document.getElementById('equipmentIncomeByMonth'));
equipmentIncomeByMonth.showLoading();    //数据加载完之前先显示一段简单的loading动画
let dataCompany=[];
let dataMonth4=[];
let dataMonth5=[];
let dataMonth6=[];
let dataMonth7=[];
let dataMonth8=[];
let dataMonth9=[];
let dataMonth10=[];
let dataMonth11=[];
let dataMonth12=[];
let dataMonth1=[];
let dataMonth2=[];
let dataMonth3=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/equipmentIncomeByMonth",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            dataCompany.push(data[i].company);
            dataMonth4.push(data[i].month4);
            dataMonth5.push(data[i].month5);
            dataMonth6.push(data[i].month6);
            dataMonth7.push(data[i].month7);
            dataMonth8.push(data[i].month8);
            dataMonth9.push(data[i].month9);
            dataMonth10.push(data[i].month10);
            dataMonth11.push(data[i].month11);
            dataMonth12.push(data[i].month12);
            dataMonth1.push(data[i].month1);
            dataMonth2.push(data[i].month2);
            dataMonth3.push(data[i].month3);
        }
        equipmentIncomeByMonth.hideLoading();    //隐藏加载动画
        equipmentIncomeByMonth.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: dataCompany
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: dataCompany[0],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[0], dataMonth5[0], dataMonth6[0],dataMonth7[0], dataMonth8[0], dataMonth9[0],dataMonth10[0], dataMonth11[0], dataMonth12[0],dataMonth1[0], dataMonth2[0], dataMonth3[0]]
                },
                {
                    name: dataCompany[1],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[1], dataMonth5[1], dataMonth6[1],dataMonth7[1], dataMonth8[1], dataMonth9[1],dataMonth10[1], dataMonth11[1], dataMonth12[1],dataMonth1[1], dataMonth2[1], dataMonth3[1]]
                },
                {
                    name: dataCompany[2],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[2], dataMonth5[2], dataMonth6[2],dataMonth7[2], dataMonth8[2], dataMonth9[2],dataMonth10[2], dataMonth11[2], dataMonth12[2],dataMonth1[2], dataMonth2[2], dataMonth3[2]]
                },
                {
                    name: dataCompany[3],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[3], dataMonth5[3], dataMonth6[3],dataMonth7[3], dataMonth8[3], dataMonth9[3],dataMonth10[3], dataMonth11[3], dataMonth12[3],dataMonth1[3], dataMonth2[3], dataMonth3[3]]
                },
                {
                    name: dataCompany[4],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[4], dataMonth5[4], dataMonth6[4],dataMonth7[4], dataMonth8[4], dataMonth9[4],dataMonth10[4], dataMonth11[4], dataMonth12[4],dataMonth1[4], dataMonth2[4], dataMonth3[4]]
                },
                {
                    name: dataCompany[5],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[5], dataMonth5[5], dataMonth6[5],dataMonth7[5], dataMonth8[5], dataMonth9[5],dataMonth10[5], dataMonth11[5], dataMonth12[5],dataMonth1[5], dataMonth2[5], dataMonth3[5]]
                },
                {
                    name: dataCompany[6],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[6], dataMonth5[6], dataMonth6[6],dataMonth7[6], dataMonth8[6], dataMonth9[6],dataMonth10[6], dataMonth11[6], dataMonth12[6],dataMonth1[6], dataMonth2[6], dataMonth3[6]]
                },
                {
                    name: dataCompany[7],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[7], dataMonth5[7], dataMonth6[7],dataMonth7[7], dataMonth8[7], dataMonth9[7],dataMonth10[7], dataMonth11[7], dataMonth12[7],dataMonth1[7], dataMonth2[7], dataMonth3[7]]
                },
                {
                    name: dataCompany[8],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [dataMonth4[8], dataMonth5[8], dataMonth6[8],dataMonth7[8], dataMonth8[8], dataMonth9[8],dataMonth10[8], dataMonth11[8], dataMonth12[8],dataMonth1[8], dataMonth2[8], dataMonth3[8]]
                },
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("区域设备入金按月汇总加载错误！");}
});
// ➤区域安装入金按月汇总(K元)
let installIncomeByMonth = echarts.init(document.getElementById('installIncomeByMonth'));
installIncomeByMonth.showLoading();    //数据加载完之前先显示一段简单的loading动画
let installDataCompany=[];
let installDataMonth4=[];
let installDataMonth5=[];
let installDataMonth6=[];
let installDataMonth7=[];
let installDataMonth8=[];
let installDataMonth9=[];
let installDataMonth10=[];
let installDataMonth11=[];
let installDataMonth12=[];
let installDataMonth1=[];
let installDataMonth2=[];
let installDataMonth3=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/installIncomeByMonth",
    //发送到服务器的数据
    data:"action=getvalue",
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            installDataCompany.push(data[i].company);
            installDataMonth4.push(data[i].month4);
            installDataMonth5.push(data[i].month5);
            installDataMonth6.push(data[i].month6);
            installDataMonth7.push(data[i].month7);
            installDataMonth8.push(data[i].month8);
            installDataMonth9.push(data[i].month9);
            installDataMonth10.push(data[i].month10);
            installDataMonth11.push(data[i].month11);
            installDataMonth12.push(data[i].month12);
            installDataMonth1.push(data[i].month1);
            installDataMonth2.push(data[i].month2);
            installDataMonth3.push(data[i].month3);
        }
        installIncomeByMonth.hideLoading();    //隐藏加载动画
        installIncomeByMonth.setOption({
            title: {
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: installDataCompany
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月','1月', '2月', '3月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: installDataCompany[0],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[0], installDataMonth5[0], installDataMonth6[0],installDataMonth7[0], installDataMonth8[0], installDataMonth9[0],installDataMonth10[0], installDataMonth11[0], installDataMonth12[0],installDataMonth1[0], installDataMonth2[0], installDataMonth3[0]]
                },
                {
                    name: installDataCompany[1],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[1], installDataMonth5[1], installDataMonth6[1],installDataMonth7[1], installDataMonth8[1], installDataMonth9[1],installDataMonth10[1], installDataMonth11[1], installDataMonth12[1],installDataMonth1[1], installDataMonth2[1], installDataMonth3[1]]
                },
                {
                    name: installDataCompany[2],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[2], installDataMonth5[2], installDataMonth6[2],installDataMonth7[2], installDataMonth8[2], installDataMonth9[2],installDataMonth10[2], installDataMonth11[2], installDataMonth12[2],installDataMonth1[2], installDataMonth2[2], installDataMonth3[2]]
                },
                {
                    name: installDataCompany[3],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[3], installDataMonth5[3], installDataMonth6[3],installDataMonth7[3], installDataMonth8[3], installDataMonth9[3],installDataMonth10[3], installDataMonth11[3], installDataMonth12[3],installDataMonth1[3], installDataMonth2[3], installDataMonth3[3]]
                },
                {
                    name: installDataCompany[4],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[4], installDataMonth5[4], installDataMonth6[4],installDataMonth7[4], installDataMonth8[4], installDataMonth9[4],installDataMonth10[4], installDataMonth11[4], installDataMonth12[4],installDataMonth1[4], installDataMonth2[4], installDataMonth3[4]]
                },
                {
                    name: installDataCompany[5],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[5], installDataMonth5[5], installDataMonth6[5],installDataMonth7[5], installDataMonth8[5], installDataMonth9[5],installDataMonth10[5], installDataMonth11[5], installDataMonth12[5],installDataMonth1[5], installDataMonth2[5], installDataMonth3[5]]
                },
                {
                    name: installDataCompany[6],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[6], installDataMonth5[6], installDataMonth6[6],installDataMonth7[6], installDataMonth8[6], installDataMonth9[6],installDataMonth10[6], installDataMonth11[6], installDataMonth12[6],installDataMonth1[6], installDataMonth2[6], installDataMonth3[6]]
                },
                {
                    name: installDataCompany[7],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[7], installDataMonth5[7], installDataMonth6[7],installDataMonth7[7], installDataMonth8[7], installDataMonth9[7],installDataMonth10[7], installDataMonth11[7], installDataMonth12[7],installDataMonth1[7], installDataMonth2[7], installDataMonth3[7]]
                },
                {
                    name: installDataCompany[8],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [installDataMonth4[8], installDataMonth5[8], installDataMonth6[8],installDataMonth7[8], installDataMonth8[8], installDataMonth9[8],installDataMonth10[8], installDataMonth11[8], installDataMonth12[8],installDataMonth1[8], installDataMonth2[8], installDataMonth3[8]]
                },
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("区域安装入金按月汇总加载错误！");}
});
// ➤全国房地产开发景气指数(亿元)
let realEstateBoomIndex = echarts.init(document.getElementById('realEstateBoomIndex'));
realEstateBoomIndex.showLoading();    //数据加载完之前先显示一段简单的loading动画
let realEstateBoomIndexData=[];
let realEstateBoomDate=[];
let realEstateBoomReferenceValue=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/realEstateBoomIndex",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            realEstateBoomDate.push(data[i].name);
            realEstateBoomIndexData.push(data[i].value);
            realEstateBoomReferenceValue.push(data[i].reference_value);
        }
        realEstateBoomIndex.hideLoading();    //隐藏加载动画
        realEstateBoomIndex.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: realEstateBoomDate
            },
            yAxis: {
                show:false,
                type: 'value',
                min: 'dataMin',
                max: 'dataMax',
                axisTick:{
                    show:false // 不显示坐标轴刻度线
                },
            },
            series: [
                {
                    data: realEstateBoomIndexData,
                    type: 'line',
                    smooth: true,
                    areaStyle: {},
                    markPoint: {
                        effect : {
                            show: true,
                            shadowBlur : 0
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false, //开启显示数值
                                position: 'top', //数值在上方显示
                            }
                        }
                    }
                },
                {
                    data: realEstateBoomReferenceValue,
                    type: 'line',
                    smooth: true,
                    markPoint: {
                        effect : {
                            show: true,
                            shadowBlur : 0
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                }

            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("全国房地产开发景气指数加载错误！");}
});
//➤全省主要品牌累计注册台量(台)
let eachBrandCumulativeRegistration = echarts.init(document.getElementById('eachBrandCumulativeRegistration'));
eachBrandCumulativeRegistration.showLoading();    //数据加载完之前先显示一段简单的loading动画
let eachBrandCumulativeRegistrationDate=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/elevator_registration/getEachBrandCumulativeRegistration",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            eachBrandCumulativeRegistrationDate.push(result[i]);
        }
        eachBrandCumulativeRegistration.hideLoading();
        eachBrandCumulativeRegistration.setOption({
            title: {
                text: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                showContent: true,
                formatter: '{b}<br/>{c}',
                //  悬浮框背景色设置
                backgroundColor:'#fff'

            },
            series: [{
                type: 'treemap',
                width: '80%',
                height: '90%',
                top: '5%',
                roam: false, //是否开启拖拽漫游（移动和缩放）
                nodeClick: false, //点击节点后的行为,false无反应
                upperLabel: true,
                breadcrumb: {  //面包屑 关闭
                    show: false
                },
                label: {
                    //  描述了每个矩形中，文本标签的样式。
                    normal: {
                        show: true,
                        position: ['20%','20%'],
                        formatter: '{b}\n{c}'
                    }
                },
                //--------------------树图中每个节点的样式
                itemStyle: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        },
                        borderWidth: 3,
                        gapWidth:6,
                        strokeColor:'#311b92',
                        borderColor: '#f2f2f2',//grey
                    },
                    emphasis: {
                        label: {
                            show: true,//树图中个图形和标签高亮的样式

                        }
                    }
                },
                data: eachBrandCumulativeRegistrationDate
            }]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("全省主要品牌累计注册台量加载错误！");}
});
//➤➤TOP6品牌近10年注册情况(台)
let top5Brand10YearsRegistration = echarts.init(document.getElementById('top5Brand10YearsRegistration'));
top5Brand10YearsRegistration.showLoading();    //数据加载完之前先显示一段简单的loading动画
let top5Brand10YearsRegistrationFyear=[];
let top5Brand10YearsRegistrationRili=[];
let top5Brand10YearsRegistrationSanling=[];
let top5Brand10YearsRegistrationSanlingjidian=[];
let top5Brand10YearsRegistrationTongli=[];
let top5Brand10YearsRegistrationJurentongli=[];
let top5Brand10YearsRegistrationAodisijidian=[];
let top5Brand10YearsRegistrationAodisi=[];
let top5Brand10YearsRegistrationDisen=[];
let top5Brand10YearsRegistrationHangzhouxiao=[];
$.ajax({
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/elevator_registration/getTop5Brand10YearsRegistration",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            top5Brand10YearsRegistrationFyear.push(result[i].fyear);
            top5Brand10YearsRegistrationRili.push(result[i].rili);
            top5Brand10YearsRegistrationSanling.push(result[i].sanling);
            top5Brand10YearsRegistrationSanlingjidian.push(result[i].sanlingjidian);
            top5Brand10YearsRegistrationTongli.push(result[i].tongli);
            top5Brand10YearsRegistrationJurentongli.push(result[i].jurentongli);
            top5Brand10YearsRegistrationAodisijidian.push(result[i].aodisijidian);
            top5Brand10YearsRegistrationAodisi.push(result[i].aodisi);
            top5Brand10YearsRegistrationDisen.push(result[i].disen);
            top5Brand10YearsRegistrationHangzhouxiao.push(result[i].hangzhouxiao);
        }
        top5Brand10YearsRegistration.hideLoading();
        top5Brand10YearsRegistration.setOption({
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['日立','三菱','三菱机电','通力','巨人通力' ,'奥的斯机电','奥的斯' ,'蒂森','杭州西奥']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: top5Brand10YearsRegistrationFyear
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '日立',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationRili
                },
                {
                    name: '三菱',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationSanling
                },
                {
                    name: '三菱机电',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationSanlingjidian
                },
                {
                    name: '通力',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationTongli
                },
                {
                    name: '巨人通力',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationJurentongli
                },
                {
                    name: '奥的斯机电',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationAodisijidian
                },
                {
                    name: '奥的斯',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationAodisi
                },
                {
                    name: '蒂森',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationDisen
                },
                {
                    name: '杭州西奥',
                    type: 'line',
                    smooth: true,
                    data: top5Brand10YearsRegistrationHangzhouxiao
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("TOP6品牌近10年注册情况加载错误！");}
});
/*//➤各区域房地产投资累计金额对比(亿元)
let RealEstate = echarts.init(document.getElementById('realestate'));
RealEstate.showLoading();    //数据加载完之前先显示一段简单的loading动画
let RealEstateNames=[];
let RealEstateValues=[];
let RealEstateNums=[];
$.ajax({
    type:"get",
    url:"/../tp5/public/index.php/index/json/real_estate",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(result){
        for(let i=0;i<result.length;i++){
            RealEstateNames.push(result[i].name);
            RealEstateValues.push(result[i].value);
            RealEstateNums.push(result[i]);
        }
        RealEstate.hideLoading();    //隐藏加载动画
        RealEstate.setOption({
            title : {
                text: '',
                subtext: '(亿元)',
                x:'left'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius: [20, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: RealEstateNums,
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2,
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            }
                        }
                    }
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});*/
// ➤山东省土地成交面积同期对比(包括住宅、商业、公建用地-单位万㎡)
let LandArea = echarts.init(document.getElementById('landarea'));
LandArea.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LandAreaLastYears=[];
let LandAreaThisYears=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/land_area",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            //$(data).append("<option>"+data[i]+"</option>");
            //这里的element是页面dom事件中onfocus="getValue(this) 中的this
            LandAreaLastYears.push(data[i].lastyear);
            LandAreaThisYears.push(data[i].thisyear);
        }
        LandArea.hideLoading();    //隐藏加载动画
        LandArea.setOption({
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['上财年','本财年']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月'],
                    axisLabel :{
                        interval:0
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年',
                    type:'bar',
                    data: LandAreaLastYears
                },
                {
                    name:'本财年',
                    type:'bar',
                    data: LandAreaThisYears
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("山东省土地成交面积同期对比加载错误！");}
});
//window.addEventListener("resize",function(){LandArea.resize();});

//➤16地市本财年与上财年土地成交宗数对比(宗)
let CityLandCase = echarts.init(document.getElementById('city_land_case'));
CityLandCase.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LastYearCityLandCase=[];
let ThisYearCityLandCase=[];
let CityLandCaseName=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/city_land_case",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data) {
        for(let i=0;i<data.length;i++) {
            CityLandCaseName.push(data[i].city);
            LastYearCityLandCase.push(data[i].lastyear);
            ThisYearCityLandCase.push(data[i].thisyear);
        }
        CityLandCase.hideLoading ();    //隐藏加载动画
        CityLandCase.setOption ( {
            title: {
                text: "",
                textStyle:{
                    fontSize: 15,
                },
                subtext: "*按土地成交日期统计",
                left: "center",
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                //     formatter: function(params){return Math.max(params.value,-params.value)}

                formatter: function (params) {
                    return params[0].name +
                        "<br>本财年：" + params[0].value +
                        "<br>上财年：" +  -params[1].value;
                }
            },
            legend: {
                data:['上财年', '本财年'],
                left: "left",
                //top: 40
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis : [
                {
                    type : 'value',
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : CityLandCaseName
                }
            ],
            series : [

                {
                    name:'本财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#91cc75'],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    data:ThisYearCityLandCase
                },
                {
                    name:'上财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#5470c6'],
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params){return -params.value}
                        }
                    },
                    data:LastYearCityLandCase
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("16地市本财年与上财年土地成交宗数对比加载错误！");}
});
//➤16地市本财年与上财年土地成交规划建筑面积同期对比(宗)
let CityLandPlanArea = echarts.init(document.getElementById('city_land_plan_area'));
CityLandPlanArea.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LastYearCityLandPlanArea=[];
let ThisYearCityLandPlanArea=[];
let CityLandPlanAreaName=[];
$.ajax({
    type:"get",
    url:"/../tp5/public/index.php/index/json/city_land_plan_area",
    data:"action=getvalue",
    dataType:'json',
    cache: true,
    async:true,
    success:function(data) {
        for(let i=0;i<data.length;i++) {
            CityLandPlanAreaName.push(data[i].city);
            LastYearCityLandPlanArea.push(data[i].lastyear);
            ThisYearCityLandPlanArea.push(data[i].thisyear);
        }
        CityLandPlanArea.hideLoading ();    //隐藏加载动画
        CityLandPlanArea.setOption ( {
            title: {
                text: "",
                textStyle:{
                    fontSize: 15,
                },
                subtext: "*按土地成交日期统计(单位：万m²)",
                left: "center",
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                //     formatter: function(params){return Math.max(params.value,-params.value)}

                formatter: function (params) {
                    return params[0].name +
                        "<br>本财年：" + params[0].value +
                        "<br>上财年：" +  -params[1].value;
                }
            },
            legend: {
                data:['上财年', '本财年'],
                left: "left",
                //top: 40
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            xAxis : [
                {
                    type : 'value',
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : CityLandPlanAreaName
                }
            ],
            series : [

                {
                    name:'本财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#91cc75'],
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    data:ThisYearCityLandPlanArea
                },
                {
                    name:'上财年',
                    type:'bar',
                    stack: '总量',
                    color: ['#5470c6'],
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params){return -params.value}
                        }
                    },
                    data:LastYearCityLandPlanArea
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("16地市本财年与上财年土地成交规划建筑面积同期对比加载错误！");}
});
//➤山东省房地产新开工施工面积累计值同期对比(万㎡)
let NewArea = echarts.init(document.getElementById('newarea'));
NewArea.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthNewArea=[];
let LastYearNewArea=[];
let ThisYearNewArea=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/newarea",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            MonthNewArea.push(data[i].month);
            LastYearNewArea.push(data[i].lastyear);
            ThisYearNewArea.push(data[i].thisyear);
        }
        NewArea.hideLoading();    //隐藏加载动画
        NewArea.setOption({
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['去年','今年']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : MonthNewArea,
                    axisLabel :{
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'去年',
                    type:'bar',
                    data:LastYearNewArea,
                },
                {
                    name:'今年',
                    type:'bar',
                    data:ThisYearNewArea,
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("山东省房地产新开工施工面积累计值同期对比加载错误！");
    }
});
//window.addEventListener("resize",function(){NewArea.resize();});

//➤山东省房地产竣工面积累计值同期对比(万㎡)
let CompleteArea = echarts.init(document.getElementById('completearea'));
CompleteArea.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthCompleteArea=[];
let LastYearCompleteArea=[];
let ThisYearCompleteArea=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/complete_area",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    cache: true,
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(data){
        for(let i=0;i<data.length;i++){
            MonthCompleteArea.push(data[i].month);
            LastYearCompleteArea.push(data[i].lastyear);
            ThisYearCompleteArea.push(data[i].thisyear);
        }
        CompleteArea.hideLoading();    //隐藏加载动画
        CompleteArea.setOption({
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['去年','今年']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : MonthCompleteArea,
                    axisLabel :{
                        interval:0
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'去年',
                    type:'bar',
                    data:LastYearCompleteArea,
                },
                {
                    name:'今年',
                    type:'bar',
                    data:ThisYearCompleteArea,
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("山东省房地产竣工面积累计值同期对比加载错误！");}
});
//window.addEventListener("resize",function(){CompleteArea.resize();});

//浏览器调整大小后重载画布
window.addEventListener("resize",function(){
    AveragePrice.resize();

    IntoforceCompare.resize();
    IntoforceSumCompare.resize();
    KeyAccount.resize();
    LocalAccount.resize();
    Distributor.resize();
    Quotecompare.resize();
 /*   auditContract.resize();*/
    NewContract.resize();
    KeyAccountNewSign.resize();
    LocalAccountNewSign.resize();
    DistributorNewSign.resize();
    CityNewContract.resize();
    CityNewContractTotal.resize();
    ArrearsCompare.resize();
    AccountAge.resize();
    arrearsCustomer.resize();
    /*RealEstate.resize();*/
    LandArea.resize();
    CityLandCase.resize();
    NewArea.resize();
    CompleteArea.resize();
    equipmentIncomeByMonth.resize();
    installIncomeByMonth.resize();
    equipmentArrearsOrderByMonthAndPeriod.resize();
    installArrearsOrderByMonthAndPeriod.resize();
    cityIntoForceData.resize();
    winBidCompare.resize();
    CityLandPlanArea.resize();
    eachBrandCumulativeRegistration.resize();
    top5Brand10YearsRegistration.resize();
    realEstateBoomIndex.resize();
    buIntoForceTop15.resize();
    keyAccountInstallTop10.resize();
    localAccountEquipmentTop10.resize();
    localAccountInstallTop10.resize();
    contractorAccountInstallTop10.resize();
    ptAccountInstallTop10.resize();
    keyAccountEquipmentTop10.resize();
    contractorAccountEquipmentTop10.resize();//总包设备1年以上欠款TOP10按月汇总
    ptAccountEquipmentTop10.resize();//普通客户设备1年以上欠款TOP10按月汇总
    generalContractor.resize();//总包本财年生效TOP10
    generalContractorNewSign.resize();//总包本财年新签TOP10
});
$(window).scroll(function () {
    AveragePrice.resize();
    SalesTrend.resize();
    IntoforceData.resize();
    IntoforceCompare.resize();
    IntoforceSumCompare.resize();
    KeyAccount.resize();
    LocalAccount.resize();
    Distributor.resize();
    Quotecompare.resize();
    /*   auditContract.resize();*/
    NewContract.resize();
    KeyAccountNewSign.resize();
    LocalAccountNewSign.resize();
    DistributorNewSign.resize();
    CityNewContract.resize();
    CityNewContractTotal.resize();
    ArrearsCompare.resize();
    AccountAge.resize();
    arrearsCustomer.resize();
    /*RealEstate.resize();*/
    LandArea.resize();
    CityLandCase.resize();
    NewArea.resize();
    CompleteArea.resize();
    equipmentIncomeByMonth.resize();
    installIncomeByMonth.resize();
    equipmentArrearsOrderByMonthAndPeriod.resize();
    installArrearsOrderByMonthAndPeriod.resize();
    cityIntoForceData.resize();
    winBidCompare.resize();
    CityLandPlanArea.resize();
    eachBrandCumulativeRegistration.resize();
    top5Brand10YearsRegistration.resize();
    realEstateBoomIndex.resize();
    buIntoForceTop15.resize();
    keyAccountInstallTop10.resize();
    localAccountEquipmentTop10.resize();
    localAccountInstallTop10.resize();
    contractorAccountInstallTop10.resize();
    ptAccountInstallTop10.resize();
    keyAccountEquipmentTop10.resize();
    contractorAccountEquipmentTop10.resize();//总包设备1年以上欠款TOP10按月汇总
    ptAccountEquipmentTop10.resize();//普通客户设备1年以上欠款TOP10按月汇总
    generalContractor.resize();//总包本财年生效TOP10
    generalContractorNewSign.resize();//总包本财年新签TOP10
    });

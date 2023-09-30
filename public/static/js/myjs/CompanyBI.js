function SubmitForm(){
//获取form表单对象
    let form = document.getElementById("MyForm");
    form.submit();//form表单提交
}
// ➤主要指标完成进度
console.log('测试节点1');
let MainIndex = echarts.init(document.getElementById('MainIndex'));
MainIndex.showLoading();    //数据加载完之前先显示一段简单的loading动画
let chartData = [];
let chartName = [];
let myColor = ['#1DB7E5','#F45922','#F45922','#9ea476','#9ea476','#F97F53','#F97F53'];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/mainindex",
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
            chartName.push(data[i].name);
            chartData.push(data[i].value);
        }
        MainIndex.hideLoading();    //隐藏加载动画
        MainIndex.setOption({
            backgroundColor: '#fff',
            grid: {
                left: '2%',
                right: '20%',
                bottom: '0%',
                top: '0%',
                containLabel: true
            },
            xAxis: [{
                show: false,
            },
                {
                    show: false,
                }
            ],
            yAxis: {
                type: 'category',
                inverse: true,
                show: false
            },

            series: [

                //亮色条 百分比
                {
                    show: true,
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: '35%',
                    z: 1,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var num = myColor.length;
                                return myColor[params.dataIndex % num]
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#000',
                                fontSize: 15,
                                fontWeight: 'bold'
                            },
                            position: 'right',
                            formatter: function(data) {
                                return (chartData[data.dataIndex]).toFixed(2) + '%';
                            }
                        }
                    },
                    data: chartData,
                },
                //年份
                {
                    show: true,
                    type: 'bar',
                    xAxisIndex: 1, //代表使用第二个X轴刻度
                    barGap: '-100%',
                    barWidth: '10%',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 8,
                            color: 'transparent'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: [0, '-20'],
                            textStyle: {
                                fontSize:14,
                                color: '#333',
                            },
                            formatter: function(data) {
                                return chartName[data.dataIndex];
                            }
                        }
                    },
                    data: chartData
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("error.......");
    }
});

//➤本财年与上财年生效台量按月对比(K台)
let IntoforceCompare = echarts.init(document.getElementById('CompanyIntoforceCompare'));
let colors = ['#5793f3', '#d14a61', '#675bba'];
IntoforceCompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthlyIntoforceCompare=[];
let Monthly1IntoforceCompare=[];
let LastYearIntoforceCompare=[];
let ThisYearIntoforceCompare=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyIntoforceCompare",
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
            MonthlyIntoforceCompare.push(data[i].monthly);
            Monthly1IntoforceCompare.push(data[i].monthly1);
            LastYearIntoforceCompare.push(data[i].lastyear);
            ThisYearIntoforceCompare.push(data[i].thisyear);
        }
        IntoforceCompare.hideLoading();    //隐藏加载动画
        IntoforceCompare.setOption({
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
                    data: Monthly1IntoforceCompare
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
                    data: MonthlyIntoforceCompare
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
                    data: LastYearIntoforceCompare
                },
                {
                    name:'本财年 生效台量',
                    type:'line',
                    smooth: true,
                    data: ThisYearIntoforceCompare
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});

//➤总公司大客户本财年生效情况
let KeyAccount = echarts.init(document.getElementById('CompanyKeyAccount'));
KeyAccount.showLoading();    //数据加载完之前先显示一段简单的loading动画
let KeyAccountNames=[];
let KeyAccountValues=[];
let KeyAccounts=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyKeyAccount",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
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
            title: {
                text: '',
                left: 'center'
            },

            tooltip: {
                trigger: 'item',
                showContent: true,
                formatter: '{b}: {c}',
                backgroundColor:'#333'//悬浮框背景色设置

            },
            series: [{
                type: 'treemap',
                width: '100%',
                height: '65%',
                top: '15%',
                roam: false, //是否开启拖拽漫游（移动和缩放）
                nodeClick: false, //点击节点后的行为,false无反应
                upperLabel: true,
                breadcrumb: {  //面包屑 关闭
                    show: false
                },

                label: { //描述了每个矩形中，文本标签的样式。
                    normal: {
                        show: true,
                        position: ['10%', '10%'],
                        formatter: '{b}: {c}'
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
                data: KeyAccounts
            }]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});

//➤本地大客户本财年生效情况(台)
let LocalAccount = echarts.init(document.getElementById('CompanyLocalAccount'));
LocalAccount.showLoading();    //数据加载完之前先显示一段简单的loading动画
let LocalAccountNames=[];
let LocalAccountValues=[];
let LocalAccounts=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyLocalAccount",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(result){
        for(let i=0;i<result.length;i++){
            LocalAccountNames.push(result[i].name);
            LocalAccountValues.push(result[i].value);
            LocalAccounts.push(result[i]);
        }
        LocalAccount.hideLoading();    //隐藏加载动画
        LocalAccount.setOption({
            title: {
                text: '',
                left: 'center'
            },

            tooltip: {
                trigger: 'item',
                showContent: true,
                formatter: '{b}: {c}',
                backgroundColor:'#333'//悬浮框背景色设置

            },
            series: [{
                type: 'treemap',
                width: '100%',
                height: '65%',
                top: '15%',
                roam: false, //是否开启拖拽漫游（移动和缩放）
                nodeClick: false, //点击节点后的行为,false无反应
                upperLabel: true,
                breadcrumb: {  //面包屑 关闭
                    show: false
                },

                label: { //描述了每个矩形中，文本标签的样式。
                    normal: {
                        show: true,
                        position: ['10%', '10%'],
                        formatter: '{b}: {c}'
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
                data: LocalAccounts
            }]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});

//➤本财年与上财年报价按月对比(K台)
let Quotecompare = echarts.init(document.getElementById('CompanyQuoteCompare'));
Quotecompare.showLoading();
let MonthlyQuoteCompare=[];
let Monthly1QuoteCompare=[];
let LastYearQuoteCompare=[];
let ThisYearQuoteCompare=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyQuoteCompare",
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
    error:function(){alert("加载错误！");}
});

//➤本财年与上财年新签电梯按月对比(K台)
let NewContract = echarts.init(document.getElementById('CompanyNewContract'));
NewContract.showLoading();
let MonthlyNewContract=[];
let Monthly1NewContract=[];
let LastYearNewContract=[];
let ThisYearNewContract=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyNewContract",
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
    error:function(){alert("error.......");}
});

//➤安装欠款账龄结构(K元)
let InstallAccountAge = echarts.init(document.getElementById('CompanyInstallAccountAge'));
InstallAccountAge.showLoading();    //数据加载完之前先显示一段简单的loading动画
let InstallAccountAgeNames=[];
let InstallAccountAgeValues=[];
let InstallAccountAgeNums=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyInstallAccountAge",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(result){
        for(let i=0;i<result.length;i++){
            InstallAccountAgeNames.push(result[i].name);
            InstallAccountAgeValues.push(result[i].value);
            InstallAccountAgeNums.push(result[i]);
        }
        InstallAccountAge.hideLoading();    //隐藏加载动画
        InstallAccountAge.setOption({
            title : {
                text: '安装欠款账龄结构',
                subtext: '(K元)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: InstallAccountAgeNames+ "\n"
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: InstallAccountAgeNums,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("error.......");}
});

//➤设备欠款账龄结构(K元)
let EqAccountAge = echarts.init(document.getElementById('CompanyEqAccountAge'));
EqAccountAge.showLoading();    //数据加载完之前先显示一段简单的loading动画
let EqAccountAgeNames=[];
let EqAccountAgeValues=[];
let EqAccountAgeNums=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyEqAccountAge",
    //发送到服务器的数据
    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
    //预期服务器返回的数据类型
    dataType:'json',
    //异步请求,如果值为true,则为异步请求
    async:true,
    //如果是成功，后面跟一个函数
    //data里包含了从后台返回到前台的数据data参数接收
    success:function(result){
        for(let i=0;i<result.length;i++){
            EqAccountAgeNames.push(result[i].name);
            EqAccountAgeValues.push(result[i].value);
            EqAccountAgeNums.push(result[i]);
        }
        EqAccountAge.hideLoading();    //隐藏加载动画
        EqAccountAge.setOption({
            title : {
                text: '设备欠款账龄结构',
                subtext: '(K元)',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'center',
                bottom:'bottom',
                data: EqAccountAgeNames + "\n"
            },
            series : [
                {
                    name: '',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: EqAccountAgeNums,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("error.......");}
});
//➤本财年与上财年发货台量按月对比(K台)
let Delivery = echarts.init(document.getElementById('CompanyDelivery'));
Delivery.showLoading();
let MonthlyDelivery=[];
let Monthly1Delivery=[];
let LastYearDelivery=[];
let ThisYearDelivery=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/company/CompanyDelivery",
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
            MonthlyDelivery.push(data[i].monthly);
            Monthly1Delivery.push(data[i].monthly1);
            LastYearDelivery.push(data[i].lastyear);
            ThisYearDelivery.push(data[i].thisyear);
        }
        Delivery.hideLoading();    //隐藏加载动画
        Delivery.setOption({
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data:['上财年 发货台量', '本财年 发货台量']
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
                                return '发货台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: Monthly1Delivery
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
                                return '发货台量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: MonthlyDelivery
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name:'上财年 发货台量',
                    type:'line',
                    xAxisIndex: 1,
                    smooth:true,
                    data: LastYearDelivery
                },
                {
                    name:'本财年 发货台量',
                    type:'line',
                    smooth:true,
                    data: ThisYearDelivery
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("加载错误！");}
});
window.addEventListener("resize",function(){
    MainIndex.resize();
    IntoforceCompare.resize();
    KeyAccount.resize();
    LocalAccount.resize();
    Quotecompare.resize();
    NewContract.resize();
    InstallAccountAge.resize();
    EqAccountAge.resize();
    Delivery.resize();
});
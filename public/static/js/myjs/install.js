//➤本财年与上财年发货台量按月对比(K台)
let Delivery = echarts.init(document.getElementById('delivery'));
Delivery.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthlyDelivery=[];
let Monthly1Delivery=[];
let LastYearDelivery=[];
let ThisYearDelivery=[];
let delivery_color = ['#5793f3', '#d14a61', '#675bba'];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/delivery",
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
            color: delivery_color,
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
                            color: delivery_color[1]
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
                            color: delivery_color[0]
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
    error:function(){alert("本财年与上财年发货台量按月对比加载错误！");}
});
//window.addEventListener("resize",function(){Delivery.resize();});

//➤本财年月度完工指标与完成情况(台)
let InstallComplete = echarts.init(document.getElementById('install_complete'), 'vintage');
InstallComplete.showLoading();    //数据加载完之前先显示一段简单的loading动画
let MonthInstallComplete=[];
let IndexInstallComplete=[];
let CompleteInstallComplete=[];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/install_complete",
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
            MonthInstallComplete.push(data[i].fmonth);
            IndexInstallComplete.push(data[i].install_index);
            CompleteInstallComplete.push(data[i].install_complete);
        }
        InstallComplete.hideLoading();    //隐藏加载动画
        InstallComplete.setOption({
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['指标','完成']
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : MonthInstallComplete,
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
                    name:'指标',
                    type:'bar',
                    data:IndexInstallComplete,
                },
                {
                    name:'完成',
                    type:'bar',
                    data:CompleteInstallComplete,
                }
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){alert("本财年月度完工指标与完成情况加载错误！");}
});
//浏览器调整大小后重载画布
window.addEventListener("resize",function(){
    Delivery.resize();
    InstallComplete.resize();
});
$(window).scroll(function () {
    Delivery.resize();
    InstallComplete.resize();
});
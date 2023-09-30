//➤主要指标完成进度
/*
let MainIndex = echarts.init(document.getElementById('MainIndex'));
MainIndex.showLoading();    //数据加载完之前先显示一段简单的loading动画
let chartData = [];
let chartName = [];
let myColor = ['#1DB7E5','#F45922','#F45922','#9ea476','#9ea476','#F97F53','#F97F53'];
$.ajax({
    //请求方式("post"或"get")
    type:"get",
    //向服务器请求的url地址
    url:"/../tp5/public/index.php/index/json/mainindex",
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '1%',
                top: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max:100,
                show: false
            },
            yAxis: {
                type: 'category',
                data: chartName
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    stack: 'total',
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
                                position: 'right',
                                formatter: "{c}%",
                            }
                        }
                    },
                    showBackground: true,
                    emphasis: {
                        focus: 'series'
                    },
                    data: chartData,

                },
            ]
        });
    },
    //如果失败,则调用这个函数
    error:function(){
        alert("error.......");
    }
});
//浏览器调整大小后重载画布
window.addEventListener("resize",function(){
    MainIndex.resize();
});
$(window).scroll(function () {
    MainIndex.resize();
});
*/



function after_sales_net(){
    window.open("https://dm.dingmap.com/share?id=cb2331e233514b6d91ca9480adca3b2c");
}
function after_sales_net_jinan(){
    window.open("https://dm.dingmap.com/share?id=397fb7c757274e2ea77f6a06553dd1c3");
}
function after_sales_net_qingdao(){
    window.open("https://dm.dingmap.com/share?id=9ee6e333701344b4bfa0c6051ada85cf");
}
function after_sales_net_weifang(){
    window.open("https://dm.dingmap.com/share?id=60342ea7127c442d9abd00a1eb051117");
}
function after_sales_net_yantai(){
    window.open("https://dm.dingmap.com/share?id=b0b02eb6497e4c33a83c737fbeff9fdb");
}
function after_sales_net_linyi(){
    window.open("https://dm.dingmap.com/share?id=5012bc3a33b14da5acedab77e58c52d8");
}
function after_sales_net_jining(){
    window.open("https://dm.dingmap.com/share?id=07c3340584e647d9a913e65cc05b574f");
}
function after_sales_net_dongying(){
    window.open("https://dm.dingmap.com/share?id=391fe38f531e46769bbbfc23f6e0ae55");
}
function after_sales_net_dezhou(){
    window.open("https://dm.dingmap.com/share?id=b51ef0ebbcca41e181545845f7d36d97");
}
function after_sales_net_heze(){
    window.open("https://dm.dingmap.com/share?id=2f40167867b349629fb45109e5ad8f99");
}
$(function () {
    /**
    *权限管理
     */
    let report_authority = [];
    let report = document.getElementById("report");
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
                report_authority=data[i].report;

            }
            if(report_authority===1){
                report.style.display = "block"; // 显示该DIV元素
                $.ajax({
                    //请求方式("post"或"get")
                    type:"get",
                    //向服务器请求的url地址
                    url:"../sdcompanyindex/getWarningInfo",
                    //发送到服务器的数据,这里切记不可加空格 例如这种 action = getvalue
                    data:"action=getvalue",
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    //异步请求,如果值为true,则为异步请求
                    async:true,
                    //如果是成功，后面跟一个函数
                    //data里包含了从后台返回到前台的数据data参数接收
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            let reg = /\B(?=(\d{3})+$)/g;
                            document.getElementById('intoForceNum').innerHTML=data[6].this_year;
                            if(data[6].compare>0){
                                let into_force_compare_up=data[6].compare+'%';
                                document.getElementById('intoForcePhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('intoForceImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('intoForceImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[6].compare+'%';
                                document.getElementById('intoForcePhrase').className="mb-0 font-13 text-success";
                                document.getElementById('intoForceImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('intoForceImg').innerHTML=into_force_compare_down;
                            }
                            document.getElementById('deliveryNum').innerHTML=data[8].this_year;
                            if(data[8].compare>0){
                                let delivery_compare_up=data[8].compare+'%';
                                document.getElementById('deliveryPhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('deliveryImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('deliveryImg').innerHTML=delivery_compare_up;
                            }else{
                                let delivery_compare_down=data[8].compare+'%';
                                document.getElementById('deliveryPhrase').className="mb-0 font-13 text-success";
                                document.getElementById('deliveryImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('deliveryImg').innerHTML=delivery_compare_down;
                            }
                            document.getElementById('installNum').innerHTML=data[9].this_year;
                            if(data[9].compare>0){
                                let into_force_compare_up=data[9].compare+'%';
                                document.getElementById('installPhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('installImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('installImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[9].compare+'%';
                                document.getElementById('installPhrase').className="mb-0 font-13 text-success";
                                document.getElementById('installImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('installImg').innerHTML=into_force_compare_down;
                            }
                            document.getElementById('quoteNum').innerHTML=data[1].this_year;
                            if(data[1].compare>0){
                                let into_force_compare_up=data[1].compare+'%';
                                document.getElementById('quotePhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('quoteImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('quoteImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[1].compare+'%';
                                document.getElementById('quotePhrase').className="mb-0 font-13 text-success";
                                document.getElementById('quoteImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('quoteImg').innerHTML=into_force_compare_down;
                            }
                            document.getElementById('newSignNum').innerHTML=data[3].this_year;
                            if(data[3].compare>0){
                                let into_force_compare_up=data[3].compare+'%';
                                document.getElementById('newSignPhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('newSignImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('newSignImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[3].compare+'%';
                                document.getElementById('newSignPhrase').className="mb-0 font-13 text-success";
                                document.getElementById('newSignImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('newSignImg').innerHTML=into_force_compare_down;
                            }
                            let equipmentIncome = data[10].this_year.toFixed(0);
                            document.getElementById('equipmentIncome').innerHTML=String(equipmentIncome).replace(reg, ','); //"1,234,567,890";
                            if(data[10].compare>0){
                                let into_force_compare_up=data[10].compare+'%';
                                document.getElementById('equipmentIncomePhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('equipmentIncomeImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('equipmentIncomeImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[10].compare+'%';
                                document.getElementById('equipmentIncomePhrase').className="mb-0 font-13 text-success";
                                document.getElementById('equipmentIncomeImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('equipmentIncomeImg').innerHTML=into_force_compare_down;
                            }
                            let installIncome = data[11].this_year.toFixed(0);
                            document.getElementById('installIncome').innerHTML=String(installIncome).replace(reg, ','); //"1,234,567,890";
                            if(data[11].compare>0){
                                let into_force_compare_up=data[11].compare+'%';
                                document.getElementById('installIncomePhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('installIncomeImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('installIncomeImg').innerHTML=into_force_compare_up;
                            }else{
                                let into_force_compare_down=data[11].compare+'%';
                                document.getElementById('installIncomePhrase').className="mb-0 font-13 text-success";
                                document.getElementById('installIncomeImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('installIncomeImg').innerHTML=into_force_compare_down;
                            }
                            document.getElementById('paidNum').innerHTML=data[12].this_year;
                            if(data[12].compare>0){
                                let paid_compare_up=data[12].compare+'%';
                                document.getElementById('paidPhrase').className="mb-0 font-13 text-danger";
                                document.getElementById('paidImg').className="bx bxs-up-arrow align-middle";
                                document.getElementById('paidImg').innerHTML=paid_compare_up;
                            }else{
                                let paid_compare_down=data[12].compare+'%';
                                document.getElementById('paidPhrase').className="mb-0 font-13 text-success";
                                document.getElementById('paidImg').className="bx bxs-down-arrow align-middle";
                                document.getElementById('paidImg').innerHTML=paid_compare_down;
                            }
                        }
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });
                /*$.ajax({
                    //请求方式("post"或"get")
                    type:"get",
                    //向服务器请求的url地址
                    url:"../maintain/getMaintainSumInfo",
                    //发送到服务器的数据
                    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    //异步请求,如果值为true,则为异步请求
                    async:true,
                    //如果是成功，后面跟一个函数
                    //data里包含了从后台返回到前台的数据data参数接收
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            document.getElementById('paidNum').innerHTML=data[0].paid;
                        }
                    },
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });*/
                //➤主要指标完成进度
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
                    tryCount : 0,
                    retryLimit : 3,
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
                                extraCssText:'width:120px;height:60px;',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '5%',
                                bottom: '1%',
                                top: '1%',
                                containLabel: true,
                                borderWidth: '0'
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
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });
                //➤近10年销售趋势(K台)
                let SalesTrend = echarts.init(document.getElementById('salesTrend'));
                SalesTrend.showLoading();    //数据加载完之前先显示一段简单的loading动画
                let YearSalesTrend=[];
                let CompleteSalesTrend=[];
                $.ajax({
                    //请求方式("post"或"get")
                    type:"get",
                    //向服务器请求的url地址
                    url:"/../tp5/public/index.php/index/json/sales_trend",
                    //发送到服务器的数据
                    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    cache: true,
                    //异步请求,如果值为true,则为异步请求
                    async:true,
                    //如果是成功，后面跟一个函数
                    //data里包含了从后台返回到前台的数据data参数接收
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            YearSalesTrend.push(data[i].fyear);
                            CompleteSalesTrend.push(data[i].complete);
                        }
                        SalesTrend.hideLoading();    //隐藏加载动画
                        SalesTrend.setOption({
                            title: {
                                text: ''
                            },
                            tooltip: { extraCssText:'width:100px;height:60px;',},
                            legend: {
                                data:['销量']
                            },

                            xAxis: {
                                type: 'category',
                                data: YearSalesTrend
                            },
                            yAxis: {
                                show:false,
                                axisTick:{
                                    show:false // 不显示坐标轴刻度线
                                },
                                type: 'value',

                            },
                            series: [{
                                name: '',
                                type: 'pictorialBar',
                                barCategoryGap: '-130%',
                                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                                itemStyle: {
                                    normal: {
                                        //每根柱子颜色设置
                                        color: function (params) {
                                            let colorList = [
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#5470c6',
                                                '#ee6666'
                                            ];
                                            return colorList[params.dataIndex];
                                        }
                                    },
                                    opacity: 0.5
                                },
                                data: CompleteSalesTrend
                            }],
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{c}'
                            }
                        });
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                // ➤区域生效/待生效/待签数据(台)
                let IntoforceData = echarts.init(document.getElementById('intoForceData'));
                IntoforceData.showLoading();    //数据加载完之前先显示一段简单的loading动画
                let CompanyIntoforceData=[];
                let SignCompleteIntoforceData=[];
                let PreIntoforceIntoforceData=[];
                let PreSignIntoforceData=[];
                let SignIndexIntoforceData=[];
                $.ajax({
                    //请求方式("post"或"get")
                    type:"get",
                    //向服务器请求的url地址
                    url:"/../tp5/public/index.php/index/json/intoforce_data",
                    //发送到服务器的数据
                    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    cache: true,
                    //异步请求,如果值为true,则为异步请求
                    async:true,
                    //如果是成功，后面跟一个函数
                    //data里包含了从后台返回到前台的数据data参数接收
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            CompanyIntoforceData.push(data[i].company);
                            SignCompleteIntoforceData.push(data[i].sign_complete);
                            PreIntoforceIntoforceData.push(data[i].pre_intoforce);
                            PreSignIntoforceData.push(data[i].pre_sign);
                            SignIndexIntoforceData.push(data[i].sign_index);
                        }
                        IntoforceData.hideLoading();    //隐藏加载动画
                        IntoforceData.setOption({
                            tooltip : {
                                trigger: 'axis',
                                extraCssText:'width:150px;height:120px;',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['生效', '待生效','待签订','指标']
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
                            xAxis:  {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: CompanyIntoforceData
                            },
                            series: [
                                {
                                    name: '生效',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: SignCompleteIntoforceData
                                },
                                {
                                    name: '待生效',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: PreIntoforceIntoforceData
                                },
                                {
                                    name: '待签订',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: PreSignIntoforceData
                                },
                                {
                                    name: '指标',
                                    type: 'bar',
                                    stack: '指标',
                                    label: {
                                        normal: {
                                            show: true,
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: SignIndexIntoforceData
                                },
                            ]
                        });
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                // ➤16地市生效/待生效/待签数据(台)
                let cityIntoForceData = echarts.init(document.getElementById('cityIntoForceData'));
                cityIntoForceData.showLoading();    //数据加载完之前先显示一段简单的loading动画
                let cityIntoForceDataCity=[];
                let cityIntoForceDataIntoForceComplete=[];
                let cityIntoForceDataPreIntoForce=[];
                let cityIntoForceDataPreSign=[];
                let cityIntoForceDataPreSignSameTermIntoForce=[];
                $.ajax({
                    type:"get",
                    url:"/../tp5/public/index.php/index/json/cityIntoforceData",
                    data:"action=getvalue",
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    cache: true,
                    async:true,
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            cityIntoForceDataCity.push(data[i].city);
                            cityIntoForceDataIntoForceComplete.push(data[i].into_force_complete);
                            cityIntoForceDataPreIntoForce.push(data[i].pre_into_force);
                            cityIntoForceDataPreSign.push(data[i].pre_sign);
                            cityIntoForceDataPreSignSameTermIntoForce.push(data[i].same_term_into_force);
                        }
                        cityIntoForceData.hideLoading();    //隐藏加载动画
                        cityIntoForceData.setOption({
                            tooltip : {
                                trigger: 'axis',
                                tooltip: { extraCssText:'width:50px;height:60px;',},
                            },
                            legend: {
                                data: ['生效','待生效','待签订','同期生效']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis:  {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: cityIntoForceDataCity
                            },
                            series: [
                                {
                                    name: '生效',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: cityIntoForceDataIntoForceComplete
                                },
                                {
                                    name: '待生效',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: cityIntoForceDataPreIntoForce
                                },
                                {
                                    name: '待签订',
                                    type: 'bar',
                                    stack: '总量',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: cityIntoForceDataPreSign
                                },
                                {
                                    name: '同期生效',
                                    type: 'bar',
                                    stack: '同期生效',
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideRight'
                                        }
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: cityIntoForceDataPreSignSameTermIntoForce
                                },
                            ]
                        });
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                //➤本财年与上财年生效台量按月对比(K台)
                let IntoforceCompare = echarts.init(document.getElementById('intoforce_compare'));
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
                    url:"/../tp5/public/index.php/index/json/intoforce_compare",
                    //发送到服务器的数据
                    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    cache: true,
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
                                    markLine: {
                                        data: [
                                            {
                                                type: 'average',
                                                name: '平均值',
                                                label: {
                                                    show:true,
                                                    position: 'middle'
                                                }
                                            }
                                        ]
                                    },
                                    data: LastYearIntoforceCompare
                                },
                                {
                                    name:'本财年 生效台量',
                                    type:'line',
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
                                    markLine: {
                                        data: [
                                            {
                                                type: 'average',
                                                name: '平均值',
                                                label: {
                                                    show: true,
                                                    color: 'red',
                                                    position: 'end'
                                                }
                                            }
                                        ]
                                    },
                                    //itemStyle : { normal: {label : {show: true,}}},显示标签
                                    data: ThisYearIntoforceCompare
                                }
                            ]
                        });
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                //➤本财年与上财年生效台量按月累计对比(K台)
                let IntoforceSumCompare = echarts.init(document.getElementById('intoforce_sum_compare'));
                IntoforceSumCompare.showLoading();    //数据加载完之前先显示一段简单的loading动画
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
                    tryCount : 0,
                    retryLimit : 3,
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
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                // ➤待生效趋势
                let preIntoForceTrend = echarts.init(document.getElementById('preIntoForceTrend'));
                preIntoForceTrend.showLoading();    //数据加载完之前先显示一段简单的loading动画
                let preIntoForceTrendIndexData=[];
                let preIntoForceTrendBoomDate=[];
                $.ajax({
                    //请求方式("post"或"get")
                    type:"get",
                    //向服务器请求的url地址
                    url:"../json/preIntoForceTrend",
                    //发送到服务器的数据
                    data:"action=getvalue",  //这里切记不可加空格 例如这种 action = getvalue
                    //预期服务器返回的数据类型
                    dataType:'json',
                    tryCount : 0,
                    retryLimit : 3,
                    //异步请求,如果值为true,则为异步请求
                    async:true,
                    //如果是成功，后面跟一个函数
                    //data里包含了从后台返回到前台的数据data参数接收
                    success:function(data){
                        for(let i=0;i<data.length;i++){
                            preIntoForceTrendIndexData.push(data[i].sale_total);
                            preIntoForceTrendBoomDate.push(data[i].record_date);
                        }
                        preIntoForceTrend.hideLoading();    //隐藏加载动画
                        preIntoForceTrend.setOption({
                            tooltip: {
                                trigger: 'axis',
                                extraCssText:'width:100px;height:60px;',
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
                                data: preIntoForceTrendBoomDate
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
                                    data: preIntoForceTrendIndexData,
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

                            ]
                        });
                    },
                    //如果失败,则调用这个函数
                    error : function(xhr, textStatus, errorThrown ) {
                        if (textStatus === 'timeout') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                //再次尝试获取数据
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status === 500) {
                            //handle error
                        } else {
                            //handle error
                        }
                    }
                });

                //浏览器调整大小后重载画布
                window.addEventListener("resize",function(){
                    MainIndex.resize();
                    SalesTrend.resize();
                    IntoforceData.resize();
                    IntoforceSumCompare.resize();
                    IntoforceCompare.resize();
                    cityIntoForceData.resize();
                    preIntoForceTrend.resize();

                });
                $(window).scroll(function () {
                    MainIndex.resize();
                    SalesTrend.resize();
                    IntoforceData.resize();
                    IntoforceSumCompare.resize();
                    IntoforceCompare.resize();
                    cityIntoForceData.resize();
                    preIntoForceTrend.resize();
                });
            }else{
                report.style.display = "none"; // 隐藏该DIV元素
            }
        },
        //如果失败,则调用这个函数
        error:function(){
            alert("获取权限失败！");
        }
    });



});






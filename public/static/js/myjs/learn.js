function SavePost() {
    let title=document.getElementById('title').value;
    if (!title){
        alert('文章标题不能为空！');
        document.getElementById('title').focus();
        document.getElementById('title').select();
        return ;
    }
    let formData = $("#AddForm").serialize();
    console.log(formData);
    $.ajax({
        type:"get",
        async:true,
        url:"/../tp5/public/index.php/index/learn/AddForm",
        data:formData,//这里data传递过去的是序列化以后的字符串
        success:function(date){
            if(date==0){
                alert("已存在该主题，请检查是否重复登记！");
                window.location.reload();
            }
            if(date==1){
                alert("添加成功！");
                window.location.reload();
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("状态码："+xhr.status);
            alert("状态:"+xhr.readyState);//当前状态,0-未初始化，1-正在载入，2-已经载入，3-数据进行交互，4-完成。
            alert("错误信息:"+xhr.statusText );
        }
    });
}
initFileInput();
let id=$("input[name='LearnImage']").val();
function initFileInput() {
    $("#uploadImg").fileinput({
        language: 'zh', //设置语言
        dropZoneTitle: '可以将图片拖放到这里 …支持多文件上传',
        uploadUrl: "uploads/safety/"+id, //上传的地址
        allowedFileExtensions: ['jpg','png','jpeg'],//接收的文件后缀
        uploadAsync: true, //默认异步上传
        showUpload: true, //是否显示上传按钮
        showRemove: true, //显示移除按钮
        showPreview: true, //是否显示预览
        showCancel:true,   //是否显示文件上传取消按钮。默认为true。只有在AJAX上传过程中，才会启用和显示
        showCaption: true,//是否显示文件标题，默认为true
        browseClass: "btn btn-primary", //文件选择器/浏览按钮的CSS类。默认为btn btn-primary
        browseLabel: '选择',
        dropZoneEnabled: true,//是否显示拖拽区域
        minImageWidth: 50, //图片的最小宽度
        minImageHeight: 50,//图片的最小高度
        maxImageWidth: 1000,//图片的最大宽度
        maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 1024,//单位为kb，如果为0表示不限制文件大小
        minFileCount: 1, //每次上传允许的最少文件数。如果设置为0，则表示文件数是可选的。默认为0
        maxFileCount: 5, //每次上传允许的最大文件数。如果设置为0，则表示允许的文件数是无限制的。默认为0
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",//当检测到用于预览的不可读文件类型时，将在每个预览文件缩略图中显示的图标。默认为<i class="glyphicon glyphicon-file"></i>
        layoutTemplates:{
            actionUpload:'', //去除上传预览缩略图中的上传图片
            actionZoom:'',   //去除上传预览缩略图中的查看详情预览的缩略图标
            actionDownload:'', //去除上传预览缩略图中的下载图标
            actionDelete:'', //去除上传预览的缩略图中的删除图标
        },//对象用于渲染布局的每个部分的模板配置。您可以设置以下模板来控制窗口小部件布局.eg:去除上传图标
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",//字符串，当文件数超过设置的最大计数时显示的消息 maxFileCount。默认为：选择上传的文件数（{n}）超出了允许的最大限制{m}。请重试您的上传！
    }).on('filebatchpreupload', function(event, data) { //该方法将在上传之前触发
        var id = $('#id option:selected').val();
        if(id == 0){
            return {
                message: "请选择", // 验证错误信息在上传前要显示。如果设置了这个设置，插件会在调用时自动中止上传，并将其显示为错误消息。您可以使用此属性来读取文件并执行自己的自定义验证
                data:{} // any other data to send that can be referred in `filecustomerror`
            };
        }
    });
}
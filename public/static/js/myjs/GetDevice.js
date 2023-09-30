let width = $(document.body).outerWidth();//手机的屏幕宽
let height = $(window).innerHeight();　　//手机的屏幕高　
let user_agent = navigator.userAgent + '/' + width + '*' +height;
$("#device").val(user_agent);
/*$('#LoginModal').on('show.bs.modal', function(){
    let $this = $(this);
    let $modal_dialog = $this.find('.modal-dialog');
    $this.css('display', 'block');
    $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    //$this.modal('hide');

});
$("#LoginModal").modal('hide');*/

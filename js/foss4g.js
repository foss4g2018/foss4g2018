/**
 * Created by timlinux on 2018/02/05.
 */
$(document).ready(function(){
    $(".js-include").each(function(){
        $(this).load($(this).attr("title"));
    });
});

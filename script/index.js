/**
 * Created by awen on 2017/2/27.
 */
$(function () {
    // $('#xianshi').click(function () {
    //     $('.boxxs').load('x.html');
    // });

    $("#xianshi").click(function(){
        htmlobj=$.ajax({url:"x.html",async:false});
        $(".boxxs").html(htmlobj.responseText);
    });

    $('#search_btn').button();
    $('#member,#logout_a').hide();
    if ($.cookie('user')){
        $('#member,#logout_a').show();
        $('#reg_a,#login_a').hide();
        $('#member').html($.cookie('user'));
    } else{
        $('#member,#dialog').hide();
        $('#reg_a,#login_a').show();
    }
        $('#reg_form').dialog({
            buttons:{
                '提交':function () {
                    $.ajax( {
                        type : "POST",
                        url : "ajax.json",

                        data : {


                            'name' :$("#user").val(),
                            'id'   : $("#r_password").val()
                            // 'user' :$("#user").val(),
                            // 'passwrod'   : $("#r_passwrod").val(),
                            // 'email':$("#r_email").val()
                        },
                        dataType: "json",
                    //traditional: true, //提交数组
                    success : function(data) {
                            alert("ok");
                        $("#str").empty();
                        for(var i=0;i<data.length;i++)
                        {
                            var b= new Option(data[i].name,data[i].id);
                            $("#str").append(b);

                        }
                    },
                    error :function(XMLHttpRequest, textStatus, errorThrown){
                        alert(XMLHttpRequest+"   "+textStatus+"   "+errorThrown);
                    },
                    async: false //这个 testAsync()方法中的Ajax请求将整个浏览器锁死 ，只有执行完一个ajax才能执行下一个
                });


                    // $('#reg_form').ajax(
                    // //     function () {
                    // //     $(this).ajaxSubmit( {
                    // //         sussess:function () {
                    // //             alert('ok');
                    // //             $.cookie('user',$('#user').val());
                    // //             setTimeout(function () {
                    // //                 $('#reg_form').dialog('close').resetForm();
                    // //                 $('#photo_show').show();
                    // //     $('#member,#logout_a').show();
                    // // $('#reg_a,#login_a').hide();
                    // // $('#member').html($.cookie('user'));
                    // //             },1000);
                    // //         }
                    // //     });
                    // // }
                    // );
                },
                '关闭':function () {
                    $('#reg_form').resetForm().dialog('close');
                    $('#photo_show').show()
                }
            },
            posetion : 'center',
            width:320,
            height:280,
            show:true,
            hide:true,
            autoOpen:false,
            draggable:true,
            resizable:false,
            modal:true,   //对话框外 是否锁定
        }).validate({
            // submitHandler:function (form) {
            //     $(form).ajaxSubmit({
            //          url:'123.html',
            //          type:'post',
            //          success:function ( responseText){
            //          alert(responseText);
            //      }
            // //服务器返回注册信息
            // // }
            //     })
            // },
            errorLabelContainer:'ol.reg_error',
            wrapper:'li',
            rules:{
               user:{
                   required:true,
                   minlength:2
               },
                password:{
                    required:true,
                    minlength:6
                },
                email:{
                    required:true,
                    email:true
                }
            },
            messages:{
              user:{
                  required:'账号不得少于2位！'
              },
                password:{
                    required:'密码不得少于6位！'
                },
                email:{
                    required:'请填写正确的邮箱！'
                }
            }
        });
        $('#reg_form').dialog('widget').find('button').eq(0).click(function () {
            $('#photo_show').show()
        });
        $('logout').click(function () {
            $.removeCookie('user');
            window.location.href='../index.html';
        });


    $('#reg_form').dialog('widget').find('button').eq(0).css('opacity','0');
    $("#login").dialog({
        closeOnEscape:false,
        open:function(event,ui){$(".ui-dialog-titlebar-close").hide();},
        autoOpen:false,
    });

    $('#login').dialog({
        buttons:{
            '提交':function () {
                $('#login').submit(
                    //     function () {
                    //     $(this).ajaxSubmit( {
                    //         sussess:function () {
                    //             alert('ok');
                    //             $.cookie('user',$('#l_user').val());
                    //             setTimeout(function () {
                    //                 $('#login').dialog('close').resetForm();
                    //                 $('#photo_show').show();
                    //     $('#member,#logout_a').show();
                    // $('#reg_a,#login_a').hide();
                    // $('#member').html($.cookie('user'));
                    //             },1000);
                    //         }
                    //     });
                    // }
                );
            }
            ,
            '关闭':function () {
                $('#login').resetForm().dialog('close');
                $('#photo_show').show()
            }
        },
        posetion : 'center',
        width:320,
        height:240,
        show:true,
        hide:true,
        autoOpen:false,
        draggable:true,
        resizable:false,
        modal:true,   //对话框外 是否锁定
        closeText:'关闭'
    }).validate({
        // submitHandler:function (form) {
        //     $(form).ajaxSubmit({
        //          url:'123.html',
        //          type:'post',
        //          success:function ( responseText){
        //          alert(responseText);
        //      }
        // //服务器返回注册信息
        // // }
        //     })
        // },
        errorLabelContainer:'ol.login_error',
        wrapper:'li',
        rules:{
            l_user:{
                required:true,
                minlength:2
            },
            l_password:{
                required:true,
                minlength:6,
                // remote:{
                //     url:'login',
                //     type:'POST',
                //     data:{
                //         user:function () {
                //             return $('#l_user').val();
                //         }
                //     }
                // }          验证密码
            }
        },
        messages:{
            l_user:{
                required:'账号不得少于2位！'
            },
            l_password:{
                required:'密码不得少于6位！'
                // ,
                // remote:'账号或者密码不正确！'
            }
        }
    });
    $('#login').dialog('widget').find('button').eq(0).click(function () {
        $('#photo_show').show()
    });
    $('logout').click(function () {
        $.removeCookie('user');
        window.location.href='../index.html';
    });



        // $('#r_date').datepicker();
        $('#r_email').autocomplete({
            source:function (request,response) {
                var hosts = ['qq.com','163.com','126.com','sina.com','yahoo.com','gmail.com','139.com','263.com'],
                term=request.term,
                name=term,
                host='',
                ix=term.indexOf('@');
                result=[];
                //当有@的时候 重新分配name和host
                if (ix>-1){
                    name=term.slice(0,ix);
                    host=term.slice(ix+1);
                }
                if(name){
                    //如果用户已经输入@和后面的域名，那么就找到相关的域名提示
                    //如果用户还没输入@和后面的域名，那么就把所有的域名都提示出来
                    var findedHosts = (host ? $.grep(hosts,function (value) {
                        return value.indexOf(host)>-1
                    }):hosts),
                        findedResult = $.map(findedHosts,function (value) {
                            return name +'@'+value;
                        });
                    result = result.concat(findedResult);
                }
                response(result);
            }
        });


        $('#reg_a').click(function () {
            // document.getElementById("reg_form").reset();
            $('#reg_form').resetForm().dialog('open');
            $('#photo_show').hide()
        });
        $('#login_a').click(function () {
        // document.getElementById("reg_form").reset();
        $('#login').resetForm().dialog('open');
        $('#photo_show').hide()
    });
    var i=0;
    var x=0;
    $( "#tabs" ).tabs(
        {
            event: "mouseover"
        },
        {
            show: { effect: "slide", duration: 1000 }
        },
        {
            hide: { effect: "slide", duration: 1000 }
        });
    function li_timer() {
        i++;
        if (i==$('#tabs li').length){
            i=0;
        }
        $( "#tabs" ).tabs({
            active: i
        });

    }
    setInterval(li_timer,3000);
    $('#tabs li').mouseover(function () {
        x=i;
        i=8;
    })
    $('li').mouseout(function () {
        i=x
    })
});
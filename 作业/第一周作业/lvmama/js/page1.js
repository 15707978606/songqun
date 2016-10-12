$(function(){
    $.ajax({
        url:"../json/dujiaqu.json",
        typle:"get",
        async:true,
        success:function(data){
            //console.log(data);
            var city_html =""
            $.each(data,function(i,o){
                var str = "";
                if(i==0){
                    str = "class=\"active\"";
                };
                city_html +="<li><a href=\"javascript:void(0);\" "+str+">"+o.city+"</a></li>";
                if(i==0){
                    creatdom(o);
                }
            });
            $(".dujiaqu_head>ul").html(city_html);
            $(".dujiaqu_head>ul>li").click(function(){
                $(".dujiaqu_head>ul>li").children().removeClass("active");
                $(this).children().addClass("active");

                var thisvalue = $(this).children().html();
                $.each(data,function(i,o){
                   if(thisvalue==o.city){
                       creatdom(o);
                   }
                });

            });
            function creatdom(o){
                var jingqu_html = "";
                $.each(o.jingqu,function(i,o){
                    var str = "";
                    if(i%3==0&&i!=0){
                        str = "class=\"marginr0\"";
                    }
                    jingqu_html +=" <li "+str+">"
                        +"<div>"
                        +"<a href=\"javascript:void(0);\" class=\"du_link\">"
                        +"<img data-original=\""+o.img+"\"/>"
                        +"<p>"
                        +o.title
                        +"</p>"
                        +"</a>"
                        +"<a class=\"du_link2\">"
                        +o.desc1
                        +"<br>"
                        +o.desc2
                        +"</a>"
                        +"</div>"
                        +"</li>";
                });
                $(".dujia_link").html(jingqu_html);
                $(function() {
                    /*--------懒加载-------*/
                    $("img").lazyload({
                        effect: "fadeIn",
                        threshold: 400,
                        placeholder: "http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif"
                    });
                });
            }



        },
        error:function(mes){
            alert(mes);
        }
    });
});

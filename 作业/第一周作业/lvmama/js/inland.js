$(function(){

	$(".link1>li").hover(function(e){
		$(this).addClass("active")
		
	},function(e){
		$(this).removeClass("active")
	});
	var ishas = true;
	$(".c_left").on({
		click:function(){
			if(ishas){
				ishas=false;
				$(this).addClass("active");
			}
			else{
				ishas=true;
				$(this).removeClass("active");
			}
		}
	});
	$(document).mousedown(function(){
		$(".c_left").removeClass("active");
	});
	$(".city").on({
		focus:function(){
			$(this).val("");
			$(".remen").show();
		},
		blur:function(){
			if($(".remen").click){
				$(this).val("请输入国内或海外目的地");
				
			}else{
				$(this).val("请输入国内或海外目的地");
			    $(".remen").hide();
			}
			
		}
	});
    $.ajax({
    	url:"../json/city.json",
    	type:"get",
    	async:true,
    	success:function(data){
 
    		var html = "";
    		var remen = "";
    		$.each(data,function(i,o){ 
    			var str="";
    			if(i==0){
    				str="class=\"active\"";
    			};
    			html+="<a href=\"javascript:void(0);\" "+str+">"+o.name+"</a>";   
    			if(o.name=="热门"){
    				$.each(o.city,function(i,o){
    					remen+="<a href=\"javascript:void(0);\">"+this+"</a>";
    				});
    			}
    		});  		
    		$(".abc").html(html); 
    		$(".remen_city").html(remen);
    		$(".abc").click(function(e){
    			$(e.target).parent().children().removeClass("active");
    			$(e.target).addClass("active");
    			var str = $(e.target).html();   			
    			var html = "";
				$.each(data,function(i,o){
					if(str==o.name){
						$.each(o.city, function(i,o) {
							html+="<a href=\"javascript:void(0);\">"+this+"</a>";
						});
						
					};
				});
				$(".remen_city").html(html);
					
				
    		});
    		
    	},
    	error:function(mes){
    		
    	}
    });
    $(".nav>li").hover(function(e){

		if($(this).attr("class")=="none"){
			$(".nav>li").removeClass("active");
			$(".guding").addClass("active");
		}else{
			$(".nav>li").removeClass("active");
			$(this).addClass("active");
		}
	},function(){
		$(".nav>li").removeClass("active");
		$(".guding").addClass("active");
	});
	$.ajax({
		url:"../json/img.json",
		type:"get",
		async:true,
		success:function(data){
			var html = "";
			var a = "";
			$.each(data,function(i,o){
				html += "<li><a href=\"javascript:void(0);\"><img src=\""+data[i]+"\"/></a></li>";
				var str = "";
				if(i==0){
					str = "class=\"orange\"";
				}
				a += "<a href=\"javascript:void(0);\" "+str+"></a>";
			});
			$(".ban_content>ul").html(html);
			$(".btn").html(a);
			$(".ban_content>ul>li").eq(0).css("display","block");
			var currentIndex = 0 ;
			var termId ;
			function autoPlay(){
				termId = setInterval(function(){
					currentIndex++;
					if(currentIndex==data.length){
						currentIndex=0;
					}
					$(".ban_content>ul>li").hide().eq(currentIndex).fadeIn(1000);
					$(".btn>a").removeClass("orange").eq(currentIndex).addClass("orange");
				},5000);
			}
			autoPlay();
			$(".btn>a").hover(function(){
				clearInterval(termId);
				var $index = $(this).index();
				$(".ban_content>ul>li").hide().eq($index).fadeIn(1000);
				$(".btn>a").removeClass("orange").eq($index).addClass("orange");
			},function(){
				autoPlay();
			});
		},
		error:function(mes){
			alert(mes);
		}
	});
	$(".lishi").hover(function(){
		$(".hisLi").css("display","block");
	},function(){
		$(".hisLi").css("display","none");
	});
	$.ajax({
		url:"../json/dujia.json",
		type:"get",
		async:true,
		success:function(data){
			var html = "";

			$.each(data,function(i,o){
				var str="";
				if(i==0){
					str = "class=\"active\"";
				}
				html+="<li "+str+"><a href=\"javascript:void(0);\">"+o.name+"</a><i></i></li>";
				if(i==0){
					chuangjia(o);
				}
			});
			$(".dujia_left>ul").html(html);
			$(".dujia_left>ul>li").hover(function(){
				$(".dujia_left>ul>li").removeClass("active");
				$(this).addClass("active");
				var str = $(this).children().first().html();
				$.each(data,function(i,o){
					if(str==o.name){
						chuangjia(o);
					}
				});
			},function(){
			});
			function chuangjia(o){
				$(".dujia_left>img").attr("src",o.bigimg);
				$(".dujia_right_h2").html(o.name);
				$(".more>p").html(o.desc);
				var content = "";
				$.each(o.smalimg,function(i,o){
					content +="<dl class=\"dujia_jieshao\">"
						+"<dt>"
						+"<img src=\""+o.img+"\"/>"
						+"</dt>"
						+"<dd>"
						+"<h3>"+o.title+"</h3>"
						+"<p><i>￥</i><b>"+o.pic+"</b><span>起</span></p>"
						+"</dd>"
						+"</dl>";
				});
				$(".dujia_img").html(content);
			}
		},
		error:function(mes){
			alert(mes);
		}
	});
	$.ajax({
		url:"../json/tejia.json",
		type:"get",
		async:true,
		success:function(data){
			var html = "";
			$.each(data,function(i,o){
				var str = "";
				if(i==0){
					str = "class=\"active\"";
				};
				html +="<li "+str+"><a href=\"javascript:void(0);\">"+o.name+"</a></li>";
				if(o.name==$(".tejia_ul>li").eq(0).children().html()){
					creatdom2(o);
				}
			});
			$(".tejia_ul").html(html);
			$(".tejia_ul>li").click(function(){
				var str = $(this).children().first().html();
				$(".tejia_ul>li").removeClass("active");
				$(this).addClass("active");
				$.each(data,function(i,o){
					if(str==o.name){
						creatdom2(o);
					}
				});
			});
			function creatdom2(o){
				var  content = "";
				var len = o.imgSrc.length;
				$.each(o.imgSrc,function(i,o){
					var s = "";
					if(i==len-1){
						s = "marginr0";
					}
					content +="<dl class=\"dujia_jieshao tejia_jieshao "+s+"\">"
						+"<dt>"
						+"<img data-original=\""+o.img+"\"/>"
						+"</dt>"
						+"<dd>"
						+"<h3>上海华美达和平大酒店</h3>"
						+"<p><i>￥</i><b>545</b><span>起</span></p>"
						+"</dd>"
						+"</dl>";
				});
				$(".tejia_content").html(content);
			};

		},
		error:function(mes){
			alert(mes);
		}
	})
	$.ajax({
		url:"../json/zhuti.json",
		type:"get",
		async:true,
		success:function(data){
			var html = "";
			var html2 ="";
			$.each(data,function(i,o){
				var logoimg = "";
				var len = o.logoimg.length-1;
				$.each(o.logoimg,function(i,o){
					var str = "";
					if(i==len){
						str = "class=\"active\" pid=\"1\"";
					}
					else{
						str = "pid=\"0\"";
					}
					logoimg +="<img src=\""+this+"\" "+str+"/>";
				});
				html +="<li>"
					+logoimg
					+"<p>"+o.name+"</p>"
					+"</li>";
				var imgSrc = "";
				$.each(o.imgSrc,function(i,o){
					var str = "";
					if(i%3==0){
						str = "class=\"marginr0\"";
					};
					imgSrc +="<dl class=\"dujia_jieshao\" "+str+">"
							+"<dt>"
							+"<img data-original=\""+o.img+"\"/>"
							+"</dt>"
							+"<dd>"
							+"<h3>"+o.title+"</h3>"
							+"<p><i>￥</i><b>"+o.pic+"</b><span>起</span></p>"
							+"</dd>"
							+"</dl>";
				});
				var s = "";
				if(i==0){
					s="show";
				}
				html2 +="<div class=\"zhuti_content "+s+"\" >"
						+imgSrc
						+"</div>";
			});
			$(".zhuti_link").html(html);
			$(".z_content").html(html2);
			$(".zhuti_link>li").eq(0).children().eq(0).addClass("active");
			$(".zhuti_link>li").eq(0).children().eq(1).removeClass("active");
			$(".zhuti_link>li").click(function(){
				//$(".zhuti_link>li").children().eq(0).css("display","none");
				$(".zhuti_link>li>img[pid=0]").removeClass("active");
				$(".zhuti_link>li>img[pid=1]").addClass("active");
				$(".zhuti_link>li>p").css("color","#666");
				$(this).children().eq(0).addClass("active");
				$(this).children().eq(1).removeClass("active");
				$(this).children().last().css("color","#f60");
				$(".zhuti_content").removeClass("show");
				$(".zhuti_content").eq($(this).index()).addClass("show");
			});
			$(function(){
				/*--------懒加载-------*/
				$("img").lazyload({
					effect:"fadeIn",
					threshold:400,
					placeholder:"http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif"
				});
			});

		},
		error:function(mes){

		}
	});
	$.ajax({
		url: "../json/pinpai.json",
		type: "get",
		async: true,
		success: function (data) {
			var currentIndex = 0;
			var html = "";
			$.each(data,function(){
					html +="<li>"
						+"<a href=\"javascript:void(0);\">"
						+"<img src=\""+this+"\"/>"
						+"</a>"
						+"</li>";
			});
			$(".pinpai_logo>ul").css("width",data.length*145+"px").html(html);
			$(".btnleft").click(function(){
				currentIndex--;
				if(currentIndex<0){
					currentIndex=0;
				}
				$(".pinpai_logo>ul").css("margin-left",-currentIndex*145+"px");
			});
			$(".btnright").click(function(){
				currentIndex++;
				console.log(currentIndex);
				if(currentIndex>data.length-8){
					currentIndex=data.length-8;
				}
				$(".pinpai_logo>ul").css("margin-left",-currentIndex*145+"px");
			});
		},
		error:function(mes){
			alert(mes);
		}
	});

});

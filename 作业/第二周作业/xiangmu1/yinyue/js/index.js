
$(function(){
	var audios = document.querySelector("audio");
	var curindex=0;
	var myscnum=0;
	$(".contain .mysc").click(function(){
		myscnum++;
		if(myscnum%2==0){
			$(".contain").stop().animate({width:640},400);
		}else{
			$(".contain").stop().animate({width:280},400);
		}
		
	});
	var playnum=0;
	$(".contain .playban .play").click(function(){
		playnum++;
		if(playnum%2==0){
			$(this).removeClass().addClass("play");
			audios.pause();
		}else{
			$(this).removeClass().addClass("pause");			
			audios.play();
		}
		
	});

	function getstyle(){
		$(".contain .playban p").css({
			"width":0,
			"background":"pink"
		});
		$(".contain .list .listitem").removeClass("listitemon");
		$(".contain .list .listitem").eq(curindex).addClass("listitemon");
		var src=$(".contain .list .listitem").eq(curindex).data("src");
		audios.setAttribute("src",src);
		setTimeout(function(){
			$(".contain .playban #play").removeClass().addClass("pause");
			audios.play();
		},1000);
	}

	$(".contain .list .listitem").click(function(){
		curindex = $(this).index();
		$(".contain .list .listitem").removeClass("listitemon");
		$(this).addClass("listitemon");
		var src=$(this).data("src");
		console.log(src);
		audios.setAttribute("src",src);
		audios.play();
		$(".contain .playban #play").removeClass().addClass("pause");
	});

	$(" .contain .playban .next").click(function(){
		$(".contain .playban #play").removeClass().addClass("play");
		curindex++;
		if(curindex==6){
			curindex=0;
		}
		getstyle();
	})

	$(" .contain .playban .prev").click(function(){
		$(".contain .playban #play").removeClass().addClass("play");
		console.log(1);
		curindex--;
		if(curindex<=0){
			curindex=6;
		}
		getstyle();
	})

	var totaltime;
	audios.ontimeupdate=function(){
		console.log(audios.currentTime);

		totaltime = audios.duration;
		var curtime = audios.currentTime;
		var wid=curtime/totaltime*100;
		$(".contain .playban p").css({
			"width":wid+"%",
			"background":"red"
		});
		$(".contain .playban p i").css({
			"left":"100%",
			"background":"green"
		})
		if(totaltime==curtime){
			$(".contain .playban #play").removeClass().addClass("play");
			curindex++;
			if(curindex==6){
				curindex=0;
			}
			getstyle();
		}

	};


	var iii=document.querySelector(".contain .playban p i");
	iii.onmousedown=function(){
		document.onmousemove=function(e){
			var e = e||window.event;
			var left= e.clientX-$(".contain .playban p").offset().left;
			totaltime = audios.duration;
			$(".contain .playban p i").css("left",left-3);
			$(".contain .playban p").css({"top":"-2px","width":left});
			audios.currentTime = left/640*audios.duration;

		}
	};
	document.onmouseup=function(){
		//audios.currentTime=currtime;
		document.onmousemove=null;
	}
});


/***问卷调查展示列表***/
var currentCount = 0;
$(function(){
	
	
	
	function getStudentCount() {
		var title = $("#keyword").val();
		var start = $("#start").val();
		var end = $("#end").val(); 
		var startGood = $("#startGood").val();
		var endGood = $("#endGood").val();
		var dom = $("#element_id>select:visible:last");
		var orgId = (dom.val() == 0)?dom.prev("select").val():dom.val();
		var url = basePath+"questionnaire/questionnaire/questionnaireTemplateCount.htmls";
		$.post( url,
				{"offset":0,
					 "pageSize":10,
					 "keyword":title,
					 "startTime":start,
					 "endTime":end,
					 "startGood":startGood,
					 "endGood":endGood,
					 "organizationId":orgId},
			function(count){
			tm_init_page(count);			
		});		
	}
	
   
    
	var title = $("#keyword").val();
	var start = $("#start").val();
	var end = $("#end").val(); 
	var startGood = $("#startGood").val();
	var endGood = $("#endGood").val();
	tmLoading("加载中...",1);
	$.ajax({
		url: basePath+"questionnaire/questionnaire/getCount.htmls",
		type:"post",
		data:{
			"offset":0,
			"pageSize":10,
		},
		dataType:'json',
		success:function(data){
			currentCount = data.count;
			tm_init_page(data.count);
			$('#page').hide();
		} 
	});
	
	/***搜索触发事件***/
	$(".search_icon").click(function(){
		var title = $("#keyword").val();
		var start = $("#start").val();
		var end = $("#end").val(); 
		var startGood = $("#startGood").val();
		var endGood = $("#endGood").val();
		var dom = $("#element_id>select:visible:last");
		var orgId = (dom.val() == 0)?dom.prev("select").val():dom.val();
		if(title.length>25){
			tmLoading("输入的文字过多", 1);
			$("#keyword").select();
			return false;
		}
		if(Number(startGood)>100 ){
			tmLoading("评优的比例不能大于100", 1);
			$("#startGood").select();
			return false;
		}
		if(Number(endGood)>100){
			tmLoading("评优的比例不能大于100", 1);
			$("#endGood").select();
			return false;
		}
		if(Number(startGood) > Number(endGood)){
			tmLoading("评优的比例输入不合法", 1);
			$("#startGood").select();
			return false;
		}
		$.ajax({
			url: basePath+"questionnaire/questionnaire/getCount.htmls",
			data:{
		            "offset":0,
					"pageSize":10,
					"keyword":title,
					"startTime":start,
					"endTime":end,
					"startGood":startGood,
					"endGood":endGood,
					"organizationId":orgId
			},
			dataType:'json',
			success:function(data){
				currentCount = data.count;
				tm_init_page2(data.count);
				$('#page').hide();
			} 
		});
	});
	
	
	/**删除问卷调查记录**/
	$("body").on("click",".delet_specialty",function(){
		var id=$(this).data("did");
		tm_dialoag.confirm({title:"删除",content:"您确定删除吗?",height:170,callback:function(ok){
			if(ok){
			if(isEmpty(id)){
				tmLoading("删除失败",1);
			}
			 $.tpAjax.request({
				url:basePath + "questionnaire/questionnaire/deleteQuestionnaire/" + id + ".htmls",
				callback:function(data){
					var data =eval("("+data+")");
					if(data == "success"){
						tmLoading("删除成功",1);
						$(this).parents(".removetr").slideUp("1000",function(){
						  $(this).remove();
						});
						setTimeout(function(){
							getStudentCount();
						},1000);
					}else{
						tmLoading("删除失败",1);
					}
				}
			},{"id":id});}
		}});
	});
	
});


/*** 分页的初始化方法 ***/
function tm_init_page(itemCount) {
	$("#page").pagination(itemCount, {
		num_edge_entries : 3, /***边缘页数***/
		num_display_entries : 3, /***主体页数***/
		current_page : 0,
		showGo:true,
		showSelect:true,
		is_search:false,
		items_per_page : 10, /***每页显示X项***/
		prev_text : "前一页",
		next_text : "后一页",
		callback : function(pageNo,psize) {
			tm_load_template(pageNo,psize);
		}
	});
};
function tm_init_page2(itemCount) {
	$("#page").pagination(itemCount, {
		num_edge_entries : 3, /***边缘页数***/
		num_display_entries : 3, /***主体页数***/
		current_page : 0,
		showGo:true,
		showSelect:true,
		is_search:true,
		items_per_page : 10, /***每页显示X项***/
		prev_text : "前一页",
		next_text : "后一页",
		callback : function(pageNo,psize) {
			tm_load_template2(pageNo,psize);
		}
	});
};
/*** 分页模板 ***/
function tm_load_template(pageNo,psize,callback){
//	var title = $("#keyword").val();
//	var start = $("#start").val();
//	var end = $("#end").val(); 
//	var startGood = $("#startGood").val();
//	var endGood = $("#endGood").val();
//	var dom = $("#element_id>select:visible:last");
//	var orgId = (dom.val() == 0)?dom.prev("select").val():dom.val();
	$.ajax({
		url: basePath+"questionnaire/questionnaire/questionnaireTemplate.htmls",
		type:"GET",
		data : {
			"offset" : pageNo*psize,
			"pageSize": psize
//			"keyword":title,
//			"startTime":start,
//			"endTime":end,
//			"startGood":startGood,
//			"endGood":endGood,
//			"organizationId":orgId
		},
		success : function(data) {
			    tmLoading("加载中...",2);
				$('#questionnaireList').html(data).show();
                if(currentCount > 10){
                	$('#page').show();
                }
		}
	});            
}

/*** 分页模板 ***/
function tm_load_template2(pageNo,psize,callback){
	var title = $("#keyword").val();
	var start = $("#start").val();
	var end = $("#end").val(); 
	var startGood = $("#startGood").val();
	var endGood = $("#endGood").val();
	var dom = $("#element_id>select:visible:last");
	var orgId = (dom.val() == 0)?dom.prev("select").val():dom.val();
	$.ajax({
		url: basePath+"questionnaire/questionnaire/questionnaireTemplate.htmls",
		type:"GET",
		data : {
			"offset" : pageNo*psize,
			"pageSize": psize,
			"keyword":title,
			"startTime":start,
			"endTime":end,
			"startGood":startGood,
			"endGood":endGood,
			"organizationId":orgId
		},
		success : function(data) {
			    tmLoading("加载中...",2);
				$('#questionnaireList').html(data).show();
                if(currentCount > 10){
                	$('#page').show();
                }
		}
	});            
}


/***浏览器兼容(回车事件)***/
document.onkeydown=function(e){
	var keycode=document.all?event.keyCode:e.which;
	if(keycode==13){
		$(".search_icon").click();
	}
}

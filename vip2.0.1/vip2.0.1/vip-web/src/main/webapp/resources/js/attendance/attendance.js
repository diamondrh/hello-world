var currentCount = 0;
/** *模糊搜索** */
$(function() {
	
	/***浏览器兼容(回车事件)***/
    $('.search_box').on('keydown',function(e){
    	var keycode=document.all?event.keyCode:e.which;
    	
    	if(keycode==13){
    	 $(".search_icon").click();
    	}
    	e.stopPropagation();
    });  
	
	tmLoading("加载中...",1)
	getData(false);
	
	$("#search").click(function() {
		var dom = $("#element_id>select:visible:last");
		var orgProCalId = (dom.val() == 0)?dom.prev("select").val():dom.val();
		orgId = !isNaN(orgProCalId)?orgProCalId :1;
		keyword = $("#keyword").val();
		tmLoading("加载中...",1);
		$.ajax({
			url: basePath + "admin/attend/getclassCount.htmls",
			type:"POST",
			data: {"orgProCalId":orgId,"searchKey":keyword},
			success : function(data) {
				var icount = data;
				currentCount = data;
				tm_init_page(icount, true);
				$("#page").hide();
			}
		});
	});
	$("#unattend").on("click",function(){
		window.location.href =  jumpTounAttend() ;
	});
	
});

/** *分页的初始化方法** */
function tm_init_page(itemCount, isSearch) {
	$("#page").pagination(itemCount, {
		num_edge_entries : 3,
		/** *边缘页数** */
		num_display_entries : 3,
		/** *主体页数** */
		num_edge_entries : 3,
		current_page : 0,
		showGo : true,
		showSelect : true,
		is_search : isSearch,
		items_per_page : 10,
		/** *每页显示X项** */
		prev_text : "前一页",
		next_text : "后一页",
		callback : function(pageNo, psize) {
			tm_load_template(pageNo, psize);
		}
	});
};

/** *分页模板** */
function tm_load_template(pageNo, psize, callback) {
	var orgProCalId = $("#classId").val();
	var title = $("#keyword").val();
	tmLoading("加载中...",1);
	$.ajax({
		url : basePath + "admin/attend/getclass.htmls",
		type:"POST",
		data : {
			"startNumber" : pageNo * psize,
			"pageSize" : psize,
			"orgProCalId":orgId,
			"searchKey":keyword
		},
		success : function(data) {
			//tmLoading("数据加载成功。。", 1);
			if(currentCount > 10){
				$("#page").show();
			}
			$("#result").html(data);
			if (callback)
				callback();
		}
	});
};

function getData(isSearch) {
	if(orgId == null || orgId =='' || orgId == 0){
		orgId = 1;
	}
	$.ajax({
		url : basePath + "admin/attend/getclassCount.htmls",
		type:"POST",
		data: {"orgProCalId":orgId,"searchKey":keyword},
		success : function(data) {
			var icount = data;
			currentCount = data;
			tm_init_page(icount, isSearch);
			$("#page").hide();
		}
	});
}

function jumpTounAttend(){
	var url = basePath+"admin/attend/getUnAttenPage.htmls?orgProCalId="+orgId+"&searchKey="+keyword;
	return  encodeURI(url);
}


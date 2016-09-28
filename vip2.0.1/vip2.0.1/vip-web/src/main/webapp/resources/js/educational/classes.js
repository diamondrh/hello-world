
pageOpts = {"startNumber" : pageNo,
		"pageSize" : pageSize,
		"orgProCalId" : orgProCalId,
		"countUrl" : basePath + "/educational/homework/getCountClasses.htmls",
		"dataUrl" : basePath + "/educational/homework/listClasses.htmls",
		"searchKey":searchKey
	};

$(function(){
	
	/***浏览器兼容(回车事件)***/
    $('.search_box').on('keydown',function(e){
    	var keycode=document.all?event.keyCode:e.which;
    	
    	if(keycode==13){
    	 $(".search_icon").click();
    	}
    	e.stopPropagation();
    }); 
	
	if(isEmpty(pageNo)){
		pageQuery();
	}else{
		$("#searchKey").val(searchKey);
		pageQuery(pageOpts);
	}
	
	$("#search").click(function(){
		var searchKey = $("#searchKey").val();
		var pattern = /^[\u4E00-\u9FA5,A-Za-z0-9]*$/;
		if(!pattern.test(searchKey)){
			tmLoading("不允许输入非法字符进行搜索 ",1);
			deal_error("#searchKey");
			return;
		}
		
		var cluster = $(".cluster").val();
		var dept = $(".part").val();
		var profess = $(".professional").val();
		var cla = $(".class").val();
		if(!isEmpty(cluster)){
			orgProCalId = Number(cluster);
		}
		if(!isEmpty(dept) && dept != 0){
			orgProCalId = Number(dept);
		}
		if(!isEmpty(profess) && profess != 0){
			orgProCalId = Number(profess);
		}
		if(!isEmpty(cla) && cla != 0){
			orgProCalId = Number(cla);
		}		
		
		pageOpts.startNumber = 0;
		pageOpts.pageSize = 10;
		pageOpts.orgProCalId = orgProCalId;
		pageOpts.searchKey = searchKey;
		pageQuery(pageOpts,true);
	});
	
});


// 缺交作业页面跳转
function jumpTolackwork(){
	var url = basePath+"educational/homework/showlackwork.htmls";
	var params = {
			"startNumber" : pageOpts.startNumber,
			"pageSize" : pageOpts.pageSize,
			"orgProCalId" : pageOpts.orgProCalId,
			"searchKey" : pageOpts.searchKey
	};
	post(url,params);
}

// 学生作业提交查看跳转
function viewHomework(opClaId,opProId,opClaName){
	var url = basePath+"educational/homework/showHomework.htmls";
	var params = {
			"operate" : "view",
			"startNumber" : pageOpts.startNumber,
			"pageSize" : pageOpts.pageSize,
			"opClaId" : opClaId,
			"opProId" : opProId,
			"opClaName" : opClaName,
			"orgProCalId" : pageOpts.orgProCalId,
			"searchKey" : pageOpts.searchKey
	}
	
	post(url,params);
}

// 学生作业提交编辑跳转
function editHomework(opClaId,opProId,opClaName){
	var url = basePath+"educational/homework/showHomework.htmls";
	var params = {
			"operate" : "edit",
			"startNumber" : pageOpts.startNumber,
			"pageSize" : pageOpts.pageSize,
			"opClaId" : opClaId,
			"opClaName" : opClaName,
			"opProId" : opProId,
			"orgProCalId" : pageOpts.orgProCalId,
			"searchKey" : pageOpts.searchKey
	}
	post(url,params);
}
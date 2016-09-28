/***职业数据展示列表***/
var currentCount;
$(function(){
	tmLoading("加载中...",2);
	
	getProfessinalCount();	
	
	/***添加数据***/
	$(".Sure").click(function(){
		var codeValue = $("#codeValue").val();
		if(isEmpty(codeValue)){
			$("#codeValue").focus();
        	tmLoading("请输入职业名称",1);
        	return false;
        }
        if(codeValue.length>15){
        	$("#codeValue").select();
        	tmLoading("职业名称长度为1~20个字符",1);
        	return false;
        }
     	tm_dialoag.confirm({
    		sureText : "确定",
    		canceText : "取消",
    		content : "您确定保存职业信息吗?",
    		callback : function(ok) {
        $.tpAjax.request({
			url:basePath+"professional/professional/insertProfessional.htmls",
			callback:function(data){
				var data =eval("("+data+")");
				if(data=="success"){
					tmLoading("添加成功",1);
					setTimeout(function(){
						tm_refreash();
					},1000);
				}else if(data=="fail"){
					tmLoading("添加失败,请核对是否有该职业存在",1);
				}
			}
		},{  "codeValue":codeValue});
      }});
	});
	
});

/***获取总数***/
function getProfessinalCount(){	
	$.ajax({
		type:"get",
		url:basePath+"professional/professional/professinalCount.htmls",
		success:function(data){
			currentCount = data;
			tm_init_page(data);
			$("#page").hide();
		}
	});
}

/*** 分页的初始化方法 ***/
function tm_init_page(itemCount) {
	$("#page").pagination(itemCount, {
		num_edge_entries : 3, /***边缘页数***/
		num_display_entries : 3, /***主体页数***/
		current_page : 0,
		showGo:true,
		showSelect:true,
		items_per_page : 10, /***每页显示X项***/
		prev_text : "前一页",
		next_text : "后一页",
		callback : function(pageNo,psize) {
			tm_load_template(pageNo,psize);
		}
	});
};
/*** 分页模板 ***/
function tm_load_template(pageNo,psize,callback){
	$.ajax({
		url: basePath+"professional/professional/professionalTemplate.htmls",
		data : {
			"offset" : pageNo*psize,
			"pageSize": psize,
		},
		success : function(data) {
			    tmLoading("加载中...",2);
				$("#professional").html(data);
				if(currentCount > 10){
					$("#page").show();
				}
				clickEvent();
		}
	});            
}
function clickEvent(){
	/***点击修改时，弹出框绑定值****/
	$(".edit_icon").click(function(){
			var id =$(this).data("id");
			 $.tpAjax.request({
					url:basePath+"professional/professional/selectDetail/"+id+".htmls",
					callback:function(data){
						var data =eval("("+data+")");
						$("#value").val(data[1]);
						$("#value").attr("data-cid", data[2]);
					}
				},{  "id":id}); 
			$(".updateProfession").fadeIn(200);
			
	});
	/***取消影藏框***/
	$(".NO").click(function(){
		$(".updateProfession").hide();
	});
	
	/***修改数据**/
	$(".save").click(function(){
		var id =$("#value").data("cid");
		var value =$("#value").val();
		tm_dialoag.confirm({
    		sureText : "确定",
    		canceText : "取消",
    		content : "您确定保存职业信息吗?",
    		callback : function(ok) {
		 $.tpAjax.request({
				url:basePath+"professional/professional/updateProfessional.htmls",
				callback:function(data){
					var data =eval("("+data+")");
					if(data=="success"){
						tmLoading("修改成功",1);
						setTimeout(function(){
							getProfessinalCount();
						},1000);
					}else if(data=="fail"){
						tmLoading("修改失败,请核对是否存在该职业记录",1);
					}
				}
			},{  "id":id,"codeValue":value});
	}});
	});
}
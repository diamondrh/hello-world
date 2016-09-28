//加载页面执行
$(function(){
	$.ajax({
		url: basePath+"admin/payment/paymentList.htmls",
		data:{
			"offset":0,
			"pageSize":10,
		},
		success:function(data){
			tmLoading("加载中...",1);
			$("#result").html(data).show();
			var count = $("#itemCount").val();
			tm_init_page(count);
		} 
	});
	
	
	
});

/** 分页插件初始化**/
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

/*** 分页控制 ***/
function tm_load_template(pageNo,psize,callback){
	$.ajax({
		url: basePath+"admin/payment/paymentList.htmls",
		data : {
			"offset" : pageNo*psize,
			"pageSize": psize,
		},
		success : function(data) {
			    tmLoading("加载中...",1);
				$('#result').html(data).show();
		}
	});            
}

/***全选/反选***/
function SelectAll(){
	var check = $("#selectAll").prop("checked");
	if(check) {
		$("input[type=checkbox]").prop("checked", true);
	} else {
		$("input[type=checkbox]").prop("checked", false);
		}
};


/** 删除支付方式 **/
$("body").on("click",".deletInfo",function(){
	var check = getData("id");
	var ids = check[0];
	var totalnum = 0;
	$(".items").each(function() {
		if ($(this).prop("checked")) {
			totalnum ++;
		} 
	});
	if(totalnum<=0){
		tmLoading("请勾选要删除的记录",1);
		return false;
	}
	
	 tm_dialoag.confirm({
		 title:"删除",
		 content:"您确定删除吗?",
		 height:170,
		 callback:function(ok){
		 if(ok){
		    if(isEmpty(check)){
			tmLoading("删除失败",2);
		}
		 $.ajax({
			type:"post",
			url:basePath + "admin/payment/deletePayment.htmls",
			data:{"id":ids},
			success:function(data){
				var data =eval("("+data+")");
				if(data){
					tmLoading("删除成功",1);
					$(this).parents(".removetr").slideUp("1000",function(){
					  $(this).remove();
					});
					setTimeout(function(){
						tm_refreash();
					},1000);
				}else{
					tmLoading("删除失败",1);
				}
			}
		});}
	}}); 
});


/**
 * 公用函数
 */
function getEachData(e, str, array) {
	var id = $(e).data(str);
	if(isEmpty(id)) 
		return array;//continue
	if(isEmpty(array)) array=id;
	else array=array+","+id;
	return array;
}

/**
 * 获取选中checkbox的data值
 */
function getData(){
	var index = arguments.length;
  	var param = arguments;
	var checkedData = new Object();
	$("input:checked").each(function(){
	    for(var i=0; i<index;i++) {
	      checkedData[i]=getEachData(this, param[i], checkedData[i]);
	    }			
	});
	return checkedData;
 }

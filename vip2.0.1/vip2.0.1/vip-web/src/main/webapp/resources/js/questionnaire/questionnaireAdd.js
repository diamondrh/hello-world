/******问卷调查添加*******/
$(function(){
	
	var isSaveComplete = true;
	//展示下拉搜索框
	var selects = ['cluster','part','professional'];
	$.ajax({
		type: "get",
		url : basePath + "orgProfessional/showComboBox.htmls",
		dataType : "json",
		success : function(data) {
			$('#element_id').cxSelect({ 
				url:data, 
				selects: selects , 
				nodata: 'none' 
			}); 
			changeZN();
		}
	}); 
	
	
	$("#questionnaireForm").on('submit', function() {
        var cluster = $(".cluster").val();
        var department = $(".part").val();
        var courseName = $(".professional").val();
		var id = $("#qId").val();
		var nickName = $("#nickName").val();/**讲师昵称**/
		var investigationsNumber = $("#investigationsNumber").val();/**调查人数**/
		var investigationsDate = $("#investigationsDate").val();/**调查日期**/
		var excellent = $("#excellent").val();/**评优比例**/
		var good = $("#good").val();/**评良比例**/
		var medium = $("#medium").val();/**评中比例**/
		var bad = $("#bad").val();/**评查比例**/
		var question = $("#question").val();/**学员问题**/
		var solution = $("#solution").val();/**解决办法**/
		
		
		if(cluster == 0){
			$(".cluster").focus();
			tmLoading("请选择职能",1);
			return false;
		}
		if(department == 0){
			$(".department").focus();
			tmLoading("请选择部门",1);
			return false;
		}
		if(courseName == 0){
			$(".courseName").focus();
			tmLoading("请选择专业",1);
			return false;
		}
		if(isEmpty(nickName)){
			$("#nickName").focus();
			tmLoading("请输入讲师昵称",1);
			return false;
		}else if(nickName.length>10){
			$("#nickName").select();
			tmLoading("请输入1-10字符",1);
			return false;
		}
		if(isEmpty(investigationsNumber)){
			$("#investigationsNumber").focus();
			tmLoading("请输入调查人数",1);
			return false;
		}else if(investigationsNumber>100000 || investigationsNumber <0){
			$("#investigationsNumber").select();
			tmLoading("请输入0-100000之间数",1);
			return false;
		}
		if(isEmpty(investigationsDate)){
	    	$("#investigationsDate").select();
	    	tmLoading("请输入调查日期",1);
	    	return false;
	    }
		investigationsDate = investigationsDate.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ''); 
		var a = /^\d+(\.\d{1,2})?$/;
	    var p= /^\-?\d+\.?\d*$/;
	    var reg = new RegExp("[0-9]+");
		if(isEmpty(excellent)){
			$("#excellent").focus();
			tmLoading("请输入评优比例",1);
			return false;
		}else if(excellent>100 || excellent<0){
			$("#excellent").select();
			tmLoading("请输入0-100之间的比例",1);
			return false;
		}else if(!reg.test(excellent)){
	   		 tmLoading("输入有误，请核对",2);
			 $("#excellent").select();
			 return false;
		}else if(!p.test(excellent)){
			 tmLoading("只能输入一个小数点",2);
			 $("#excellent").select();
			 return false;
		}else if(!a.test(excellent)){
			 tmLoading("只能有二位小数",2);
			 $("#excellent").select();
			 return false;
	    }else if(isEmpty(good)){
			$("#good").focus();
			tmLoading("请输入评良比例",1);
			return false;
		}else if(good>100 || good<0 ){
			$("#good").select();
			tmLoading("请输入0-100之间的比例",1);
			return false;
		}else if(!reg.test(good)){
	   		 tmLoading("输入有误，请核对",2);
			 $("#good").select();
			 return false;
		}else if(!p.test(good)){
			 tmLoading("只能输入一个小数点",2);
			 $("#good").select();
			 return false;
		}else if(!a.test(good)){
			 tmLoading("只能有二位小数",2);
			 $("#good").select();
			 return false;
	    }
		if(isEmpty(medium)){
			$("#medium").focus();
			tmLoading("请输入评中比例",1);
			return false;
		}else if(medium>100 || medium<0){
			$("#medium").select();
			tmLoading("请输入0-100之间的比例",1);
			return false;
		}else if(!reg.test(medium)){
	   		 tmLoading("输入有误，请核对",2);
			 $("#medium").select();
			 return false;
		}else if(!p.test(medium)){
			 tmLoading("只能输入一个小数点",2);
			 $("#medium").select();
			 return false;
		}else if(!a.test(medium)){
			 tmLoading("只能有二位小数",2);
			 $("#medium").select();
			 return false;
	    }
		if(isEmpty(bad)){
			$("#bad").focus();
			tmLoading("请输入评差比例",1);
			return false;
		}else if(bad>100 || bad<0){
			$("#bad").select();
			tmLoading("请输入0-100之间的比例",1);
			return false;
		}else if(!reg.test(bad)){
	   		 tmLoading("输入有误，请核对",2);
			 $("#bad").select();
			 return false;
		}else if(!p.test(bad)){
			 tmLoading("只能输入一个小数点",2);
			 $("#bad").select();
			 return false;
		}else if(!a.test(bad)){
			 tmLoading("只能有二位小数",2);
			 $("#bad").select();
			 return false;
	    }
		if(Number(excellent)+Number(good)+Number(medium)+Number(bad) > 100){
			tmLoading("输入的比例之和不为100%",1);
			return false;
		}
		if(question.length>200){
			$("#question").select();
			tmLoading("请输入1-100之间的汉字",1);
			return false;
		}
		if(solution.length>200){
			$("#solution").select();
			tmLoading("请输入1-100之间的汉字",1);
			return false;
		}
		//question = question.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ''); 
		//solution = solution.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
		
		var fileSourse = document.getElementById("fileSourse");
		var values = fileSourse.innerText; 
		if(values == "暂无附件"){
			var obj = document.getElementById('annexAddress');
		    if (obj.value == '') {
		    	tmLoading("请选择附件上传",1);
		        return false;
		    }
		    var stuff = obj.value.substr(obj.value.length-3, 3);
		    if (stuff != 'txt'&&stuff != 'rar'&& stuff != 'doc' && stuff != 'xls' && stuff !='pdf' && stuff != 'docx') {
		    	tmLoading('文件类型不正确，请选择.txt,.rar,.doc,.docx,.xls,.pdf结尾的文件格式',1);
		    	return false;
		    }
		    /**限制文件大小**/
	    	var file = obj.files;
	    	var fileName=file[file.length-1].size;
		    if(fileName/1024/1024 >10){
		    	tmLoading("文件大小不能超过10M",2);
		    	return false;
		    } 
		}
		
		var obj1 = document.getElementById('annexAddress');
	    var stuff1 = obj1.value.substr(obj1.value.length-3, 3);
	    if(isNotEmpty(stuff1)){
	    	if (stuff1 != 'txt'&&stuff1 != 'rar'&& stuff1 != 'doc' && stuff1 != 'xls' && stuff1 !='pdf' && stuff1 != 'docx') {
		    	tmLoading('文件类型不正确，请选择.txt,.rar,.doc,.docx,.xls,.pdf结尾的文件格式',1);
		    	return false;
		    }
	    	/**限制文件大小**/
	    	var file = obj1.files;
	    	var fileName=file[file.length-1].size;
		    if(fileName/1024/1024 >10){
		    	tmLoading("文件大小不能超过10M",2);
		    	return false;
		    }  
	    }
	    
		
	    

		
		tm_dialoag.confirm({
    		sureText : "确定",
    		canceText : "取消",
    		content : "您确定保存问卷调查信息吗?",
    		callback : function(ok) {
    			
		 $("#questionnaireForm").ajaxSubmit({
	            type: 'post', 
	            url:basePath+"questionnaire/questionnaire/insertByRoleDate.htmls",
				data: {
					"id":id,
					"cid":cluster,
					"deid":department,
					"proId":courseName,
					"nickName":nickName,/**讲师昵称**/
					"investigationsNumber": investigationsNumber,/**调查人数**/
					"investigationsDate": investigationsDate,/**调查日期**/
					"excellent": excellent,/**评优比例**/
					"good": good,/**评良比例**/
					"medium": medium,/**评中比例**/
					"bad": bad,/**评查比例**/
					"question": question,/**学员问题**/
					"solution": solution/**解决办法**/
	            },
	            beforeSend:function(){
	            	tmLoading("正在提交...");
	            },
	            success: function(data) {	 // data 保存提交后返回的数据，一般为 json 数据
	            	isSaveComplete = true;
	            	var data =eval("("+data+")");
					if(data =="success"){
						tmLoading("添加成功",2);
						setTimeout(function(){
							window.location.href=basePath+"questionnaire/questionnaire/questionnaireList.htmls";
						},2000);
					}else if(data =="fail"){
						tmLoading("该讲师不存在",2);
					}else if(data =="falls"){
						tmLoading("添加失败",2);
					}else if(data == "updateSuccess"){
						tmLoading("保存成功",2);
						setTimeout(function(){
							window.location.href=basePath+"questionnaire/questionnaire/questionnaireList.htmls";
						},1000);
					}else if(data == "updateFail"){
						tmLoading("保存失败",2);
					}else{
						tmLoading("文件上传格式有误",2);
					}
	                //返回页面
	            },
	            complete:function (data) { isSaveComplete = true; }
	        });
    		
    		}
    	});
		
	        return false; 	// 阻止表单自动提交事件
	});	
	
});
function changeZN(){
		if(!isEmpty(opProIds) && opProIds.split("-").length == 3 ){
			var orgArray = opProIds.split("-");
			$(".cluster").val(orgArray[0]);
			$(".cluster").trigger("change");
			
			$(".part").val(orgArray[1]);
			$(".part").trigger("change");
			
			$(".professional").val(orgArray[2]);
			$(".professional").trigger("change");
		}
	}



/***保存学员信息***/
$(function(){
	new uploadPreview({ UpBtn: "idcardA", ImgShow: "imgIdcardA"});
	new uploadPreview({ UpBtn: "idcardB", ImgShow: "imgIdcardB"});
	new uploadPreview({ UpBtn: "IconImg", ImgShow: "IconImages"});
	/***初始化是否退费***/
	$(".isRefund").on("change", isRefundFun);
	$(".isRefund").change();
	var stuId = $(".saveStudentDetail").data("id");
//	if(isEmpty(stuId)){
//		addRecord();/**添加一行**/
//	}
	if($("#add tr").length == 1){
    	addRecord();
}
	changeMoney();/**计算价格**/
	bindEvent();/**学员专业状态**/
	
	var isSaveComplete = true;
	$('#studentForm').on('submit', function() {
		if(isSaveComplete == false){
    		return false;
    	}
		var id = $(".saveStudentDetail").data("id");
		var stuName = $("#stuName").val();/**学员姓名**/
		var nameSpell = $("#nameSpell").val();/**学员姓名拼音**/
		var degree = $("#degree").val();/**学历**/
		var birthday = $("#birthday").val();/**出生日期**/ 
		var professional = $("#professional").val();/**职业**/
		var sex = $("#sex").val();/**性别**/
		var nativePlace = $("#nativePlace").val();/**籍贯**/
		var QQ = $("#QQ").val();/**QQ**/
		var YY = $("#YY").val();/**YY**/
		var idCard = $("#idCard").val();/**身份证**/
        var telephone = $("#telephone").val();/**手机号码**/
        var email = $("#email").val();/**邮箱**/
        var postalCode = $("#postalCode").val();/**邮编**/
        var emergencyPerson = $("#emergencyPerson").val();/**紧急联系人**/
        var contratRelationshipsCode = $("#contratRelationshipsCode").val();/**与其关系**/
        var emergencyTelephone = $("#emergencyTelephone").val();/**紧急联系人电话**/
        var school = $("#school").val();/**毕业学校**/
        var costResources = $('input:radio[name="costR"]:checked').val(); /**费用来源**/
        var address = $("#address").val();/**家庭住址**/
        var componentCode = $('input:radio[name="component"]:checked').val();/**学习工作状态**/
        var studentResources = $('input:radio[name="Resources"]:checked').val();/**信息来源**/
        var sourceBox = $("#sourceBox").val();/***当选择其他信息来源的备注信息***/
        var hobbies = $("#hobbies").val();/**兴趣爱好**/
        var note = $("#note").val();/**备注**/
		var tel = /^1\d{10}$/;	//  验证手机号码 
		var em = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;	//验证邮箱地址
		var num = /^\d+(\.\d+)?$/;		//验证非负浮点数
		var inte = /^-?\d+$/ ;	//验证整数型
		var idCardReg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;  //身份证
		var letters =/^[0-9a-zA-Z]*$/g; //字母或数字
		var letter =/^[a-zA-Z]*$/g;//字母
		var let =/^[0-9]*$/g;//数字
		var postCodeReg=/^\d{6}$/; //邮箱
		
		
        if(isEmpty(stuName)){
        	$("#stuName").focus();
        	tmLoading("请输入学员姓名",1);
        	return false;
        }
        if(stuName.length>10){
        	$("#stuName").select();
        	tmLoading("姓名长度为1~10个字符",1);
        	return false;
        }
        if(!letter.test(nameSpell)){
        	$("#nameSpell").select();
        	tmLoading("只能输入字母，不能有空格",1);
        	return false;
        }else if(nameSpell.length>30){
        	$("#nameSpell").select();
        	tmLoading("姓名拼音长度为1~30个字符",1);
        	return false;
        }
//        if(professional == ""){
//        	$("#professional").focus();
//        	tmLoading("请选择职业",1);
//        	return false;
//        }
        if(nativePlace.length>30){
        	$("#nativePlace").select();
        	tmLoading("籍贯长度为1~30个字符",1);
        	return false;
        }
        if(isEmpty(QQ)){
        	$("#QQ").focus();
        	tmLoading("请输入QQ",1);
        	return false;
        }else if(QQ.length < 5){
        	$("#QQ").select();
        	tmLoading("QQ长度太短，至少5位",1);
        	return false;
        }else if(!inte.test(QQ)){
        	$("#QQ").select();
        	tmLoading("只能是数字,不能有空格",1);
        	return false;
        }else if(QQ.length>14){
        	$("#QQ").select();
        	tmLoading("QQ长度太长",1);
        	return false;
        }
        if(YY.length>20){
        	$("#YY").focus();
        	tmLoading("YY长度为1~15个字符",1);
        	return false;
        }else if(!letters.test(YY)){
        	$("#YY").select();
        	tmLoading("只能是数字或字母,不能有空格",1);
        	return false;
        }
        if(idCard.length>19){
        	$("#idCard").select();
        	tmLoading("身份证的长度为1~19个字符",1);
        	return false;
        }/* else if(!(idCardReg.test(idCard)) && !isEmpty(idCard)){
			tmLoading("身份证输入不合法,不可输入非法字符",1);
			return false;
		}*/
//        else if(!letters.test(idCard)){
//        	$("#idCard").select();
//        	tmLoading("只能是数字或字母,不能有空格",1);
//        	return false;
//        }
        if(isEmpty(telephone)){
        	$("#telephone").focus();
        	tmLoading("请输入电话号码",1);
        	return false;
        }else if(telephone.length > 12){
        	$("#telephone").select();
        	tmLoading("请输入正确的电话号码",1);
        	return false;
        }else if(!(tel.test(telephone))){
			tmLoading("请输入正确的手机格式",1);
			return false;
		}
        if(!isEmpty(email) && !em.test(email) || email.length > 30){
        	$("#email").select();
        	tmLoading("请输入正确的邮箱",1);
        	return false;
        }
        if(postalCode.length > 6 ){
        	$("#postalCode").select();
        	tmLoading("邮编长度为6位数字",1);
        	return false;
        }else if(!(postCodeReg.test(postalCode)) && !isEmpty(postalCode)){
        	$("#postalCode").select();
        	tmLoading("邮编输入不合法",2);
			return false;
        }
//        else if(!let.test(postalCode)){
//        	$("#postalCode").select();
//        	tmLoading("只能是数字，不能有空格",1);
//        	return false;
//        }
        if(emergencyPerson.length > 10){
        	$("#emergencyPerson").select();
        	tmLoading("请输入长度为1-10个字符",1);
        	return false;
        }
        if(contratRelationshipsCode.length>10){
        	$("#contratRelationshipsCode").select();
        	tmLoading("请输入长度为1-20个字符",1);
        	return false;
        }
        if(emergencyTelephone.length > 12){
        	$("#emergencyTelephone").select();
        	tmLoading("请输入正确的电话号码",1);
        	return false;
        }
//        else if(!let.test(emergencyTelephone)){
//        	$("#emergencyTelephone").select();
//        	tmLoading("只能是数字，不能有空格",1);
//        	return false;
//        }
        if(school.length > 40){
        	$("#school").select();
        	tmLoading("输入学校地址过长",1);
        	return false;
        }
        if(address.length>40){
        	$("#address").select();
        	tmLoading("输入地址过长",1);
        	return false;
        }
        if(hobbies.length>150){
        	$("#hobbies").select();
        	tmLoading("输入的文字过长",1);
        	return false;
        }
        if(note.length>150){
        	$("#note").select();
        	tmLoading("输入的文字过长",1);
        	return false;
        }
        if(sourceBox.length>20){
        	$("#sourceBox").select();
        	tmLoading("字数过长",1);
        	return false;
        }
        
        
        /***************************专业信息**************************************/
        var profList = new Array();
		var flag =false;
		$("#add tbody tr").each(function(n, em){
			if(n==0) {
				return true;
			} else {
				var profInfo= new Object();
				//profInfo.studentId=$("#courseetail").data("id");/**学员id**/
				profInfo.pId = $(em).find(".courseID").data("pid");/***专业记录id**/
				profInfo.professionCode = $(em).find(".professionCode").val();/**学员专业编号***/
				
				//profInfo.opProId = $(em).find(".courseName :selected").data("id");/***专业id**/
				//profInfo.courseName =  $(em).find(".courseName :selected").val();/**专业名称**/
				//profInfo.courseHead =$(em).find(".courseName :selected").data("qid");/***专业前缀**/
				
				/**自动补全专业***/
				profInfo.courseName = $(em).find(".courseName").val();
				/*****/
				
				profInfo.enterDate = $(em).find(".enterDate").val();/***报名时间***/
				profInfo.amountPayable = $(em).find(".amountPayable").val();/***专业价格**/
				profInfo.payMethod = $(em).find(".payMethod :selected").data("id");/***支付方式KEY***/
				profInfo.pay = $(em).find(".payMethod :selected").val();/**支付方式值**/
				profInfo.payment = $(em).find(".payment").val();/**实付金额**/
				profInfo.statues = $(em).find(".statues").data("value");/**学员状态***/
				profInfo.isRefund = $(em).find(".isRefund").val();/***是否退费***/
				profInfo.arrears = $(em).find(".arrears").val();/***尾款**/
				profInfo.refundMonetary = $(em).find(".refundMonetary").val();/***退费金额***/
				profInfo.refundReason = $(em).find(".refundReason :selected").data("id");/***退费原因**/
				profInfo.changeTime = $(em).find(".statues").data("statustime");/***学员状态更改时间***/
				profInfo.changeReason = $(em).find(".statues").data("statusreason");/**学员状态更改原因**/
				profInfo.remark = $(em).find(".remark").val();/**备注**/
				
				
				if(isEmpty(profInfo.professionCode)){
					$(em).find(".professionCode").focus();
					tmLoading("请输入学员编号",1);
			    	flag =true;
			    	return false;
				}
				var strExp=/^[A-Za-z0-9]+$/;
			    if(!strExp.test(profInfo.professionCode)){
			    	$(em).find(".professionCode").select();
					tmLoading("不能输入汉字",1);
			    	flag =true;
			    	return false;
			    }else if(profInfo.professionCode.length>22){
			    	$(em).find(".professionCode").select();
					tmLoading("输入的长度过长",1);
			    	flag =true;
			    	return false;
			    }
				if(isEmpty(profInfo.courseName)){
					$(em).find(".courseName").focus();
			    	tmLoading("请输入专业",1);
			    	flag =true;
			    	return false;
				}else if(profInfo.courseName.length>15){
					$(em).find(".courseName").select();
			    	tmLoading("输入的专业不合法",1);
			    	flag =true;
			    	return false;
				}
			    if(isEmpty(profInfo.enterDate)){
			    	$(em).find(".enterDate").focus();
			    	tmLoading("请输入报名日期",1);
			    	flag =true;
			    	return false;
			    }
			    if(isEmpty(profInfo.amountPayable)){
			    	$(em).find(".amountPayable").focus();
			    	tmLoading("请输入专业价格",1);
			    	flag =true;
			    	return false;
			    }
			    if(profInfo.amountPayable>100000){
			    	$(em).find(".amountPayable").select();
			    	tmLoading("专业价格太大",1);
			    	flag =true;
			    	return false;
			    }
			    if(profInfo.pay == "请选择"){
			    	$(em).find(".payMethod :selected").select();
			    	tmLoading("请选择支付方式",1);
			    	flag =true;
			    	return false;
			    }
			    if(isEmpty(profInfo.payment)){
			    	$(em).find(".payment").focus();
			    	tmLoading("请输入实付金额",1);
			    	flag =true;
			    	return false;
			    }
			    if(profInfo.payment>100000){
			    	$(em).find(".payment").select();
			    	tmLoading("实付金额过大",1);
			    	flag =true;
			    	return false;
			    }
			    if(Number(profInfo.payment) > Number(profInfo.amountPayable)){
			    	$(em).find(".payment").select();
			    	tmLoading("实付金额不能够大于专业价格",1);
			    	flag =true;
			    	return false;
			    }
			    
			    if(profInfo.payMethod =="all"){
			    	if(Number(profInfo.amountPayable) != Number(profInfo.payment)){
			    		tmLoading("支付全款的数据，实付金额与专业价格不相等",1);
				    	flag =true;
				    	return false;
			    	}
			    }
			    if(profInfo.statues !="reading" && profInfo.statues != "drop" && profInfo.statues != "pause"
			    	&& profInfo.statues != "continues" && profInfo.statues != "stay" && profInfo.statues != "end"){
			    	profInfo.statues ="reading";
			    }
			    
			    
			    var a = /^\d+(\.\d{1,2})?$/;
			    var p= /^\-?\d+\.?\d*$/;
			    var reg = new RegExp("[0-9]+");
		    	if(!reg.test(profInfo.amountPayable)){
		    		 tmLoading("输入有误，请核对",2);
		    		 $(em).find(".amountPayable").select();
		    		 flag =true;
		    		 return false;
		    	}else if(!p.test(profInfo.amountPayable)){
		    		 tmLoading("只能输入一个小数点",2);
		    		 $(em).find(".amountPayable").select();
		    		 flag =true;
		    		 return false;
		    	}
		    	if(!reg.test(profInfo.payment)){
		    		 tmLoading("输入有误，请核对",2);  
		    		 $(em).find(".payment").select();
		    		 flag =true;
		    		 return false;
		    	}else if(!p.test(profInfo.payment)){
		    		 tmLoading("只能输入一个小数点",2);  
		    		 $(em).find(".payment").select();
		    		 flag =true;
		    		 return false;
		    	}
		    	if(!a.test(profInfo.amountPayable)){
		    		 tmLoading("只能有二位小数",2);
		    		 $(em).find(".amountPayable").select();
		    		 flag =true;
		    		 return false;
		    	}
			    if(profInfo.remark.length>20){
			    	$(em).find(".remark").select();
			    	tmLoading("字数过多",1);
			    	flag =true;
			    	return false;
			    }
				profList.push(profInfo);
			}
		});
		
		if(flag) {
			return false;
		}
        
        /****************************************************************/
    	tm_dialoag.confirm({
    		sureText : "确定",
    		canceText : "取消",
    		content : "您确定保存学员信息吗?",
    		callback : function(ok) {
    			var jsonObject = JSON.stringify(profList);
    			var str = jsonObject.toString();
    			      $("#studentForm").ajaxSubmit({
    			            type: 'post', 
    			            async: false,/**同步**/
    						url:basePath+"student/studentDetail/saveStudentDetail.htmls",
    						data: {
    							 "id":id,
    							 "educationBackgroundKey":degree,/**学历**/
//    							 "birthday":birthday,/**出生日期**/ 
    							 "occupationCodeKey":professional,/**职业**/
    					         "costResources":costResources,/**费用来源**/
    					         "componentCode":componentCode,/**学习工作状态**/
    					         "studentResources":studentResources,/**信息来源**/
    					         "otherResources":sourceBox,/***其他信息来源原因***/
    					         "courseList" : str
    			            },
    			            beforeSend:function(){
    			            	tmLoading("正在提交...",1);
    			            },
    			            success: function(data) {	 // data 保存提交后返回的数据，一般为 json 数据
    			            	isSaveComplete = true;
    			            	var result=eval("("+data+")");
    			            	if(result =="success"){
    			            		tmLoading("保存成功！",2);
    			            		setTimeout(function(){
    									window.location=basePath+"student/studentDetail/studentList.htmls";
    								}, 2000)
    			            	}else if(result =="fail"){
    			            		tmLoading("操作失败！请核对数据是否正确！",2);
    			            	}else if(result == "error"){
    			            		tmLoading("该学员的专业编号有与系统的重复记录，请核对信息", 2);
    			            	}else if(result == "qq_error"){
    			            		tmLoading("该学员的QQ号有与系统的重复记录，请核对信息", 2);
    			            	}else if(result == "exist"){
    			            		tmLoading("存在该学员记录，请核对信息",2);
    			            	}else if(result == "COURSE_NOT_EXIST"){
    			            		tmLoading("输入的专业有误",2);
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


/**上传正面身份证**/
function idcardAClick(){
	$("#idcardA").click();
	$("#cIDImgA").hide();
	$("#cIDImgAA").show();
}

/**上传反面身份证**/
function idcardBClick(){
	$("#idcardB").click();
	$("#cIDImgB").hide();
	$("#cIDImgBB").show();
}

/***上传头像***/
function IconImgClick(){
	$("#IconImg").click();
		//var url=document.getElementById("IconImages").src;
		//if(url.length>23){
			$("#IconImgA").hide();
			$("#IconImgB").show();
		//}
	
}




/***时间控件***/
function tzchangeyear(dp){
	$("#keybirthday").val(dp.cal.getNewDateStr());
}


var ProfessList = new Array();/**专业名称**/
var PayList = new Array();/***支付方式**/
var ReasonList = new Array();/***退费原因**/
var ProfessListId = new Array();/***专业id**/
var PayListId = new Array();/***支付方式id**/
var ReasonListId = new Array();/***退费原因id**/
var CourseHead = new Array();/***专业前缀***/





/***学员状态弹出框***/
function bindEvent(){
$(".stuStatus").on("click",function(){
	var dom =$(this);
	$(".studentPop").fadeIn();
	var givenStatus = dom.val();
	var times = dom.data("times");/***获取后端传的时间用于编辑显示**/ 
	var reasons = dom.data("reasons");/***获取后端传的时间用于编辑显示**/ 
	var times1 = dom.data("statustime");/***获取重新填写的时间**/ 
	var reasons1 = dom.data("statusreason");/***获取重新填写的原因**/ 
	
	$("input[name=status]").each(function(n, em){/***用于编辑时显示***/
		if($(em).val() == givenStatus) {
			$(em).prop("checked", true);
			if(times!=null || reasons!=null){
			$("#profStatus input").val(times);
			$("#profStatus textarea").val(reasons);
			}
			if(times1 != null || reasons1 != null){
				$("#profStatus input").val(dom.data("statustime"));
				$("#profStatus textarea").val(dom.data("statusreason"));	
			}
			$(em).click();
		}
	});


	$(".Sure").off("click");
	$(".Sure").click(function(){
		var ss = dom.data("keys");
		var stuStatus = $("input[name=status]:checked").val();
		var stuStatusKey = $("input[name=status]:checked").data("key");
		dom.attr("data-value",stuStatusKey);
		
		var statusTime = $("#profStatus input").val();
		var statusReason = $("#profStatus textarea").val();
	    
		
		if(stuStatusKey == "drop" || stuStatusKey == "pause" || stuStatusKey == "stay"){
			if(isEmpty(statusTime) || isEmpty(statusReason)){
				tmLoading("时间和原因必填",2);
				dom.attr("data-value",ss);
				return false;
			}
		}
		
		dom.attr("data-statustime", statusTime);
		dom.attr("data-statusreason", statusReason);
		
		dom.val(stuStatus);
		if(stuStatusKey == "reading" || stuStatusKey == "continues" 
								|| stuStatusKey == "end") {
			$("#profStatus input").val("");
			$("#profStatus textarea").val("");
			
		}
		
		
		$("#profStatus input:eq(0)").val("");
		$("#profStatus textarea").val("");
		
		$("#profStatus").hide();
		$("input[name=status]:eq(0)").prop("checked", true);
		$(".studentPop").hide();
	});
});

/***取消按钮事件***/
$(".Quit").click(function(){
	$("#profStatus input:eq(0)").val("");
	$("#profStatus textarea").val("");
	$("#profStatus").hide();
	$("input[name=status]:eq(0)").prop("checked", true);
	$(".studentPop").hide();
});

/***radio单选按钮事件***/
$(".status label").on("click",function(){
    var ind = $(this).index();
    if(ind > 0 && ind <4) {
    	$("#profStatus").fadeIn();
    	var text = $(this).text();
    	$("#profStatus span:eq(0)").text(text + "日期:");
    	$("#profStatus span:eq(1)").text(text + "原因:");
    } else {
    	$("#profStatus").fadeOut();
    }
});
}
	
/***拼接下拉专业***/	
//function getProfess(ProfessList, ProfessListId,CourseHead){
//	var selectHtml="";
//	selectHtml+="<select class='select_box1 boxbor courseName'>";
//	selectHtml+="<option>请选择</option>";
//		for(var i =0;i<ProfessList.length;i++){
//			selectHtml+="<option data-id='"+ProfessListId[i]+"' data-qid='"+CourseHead[i]+"'>";
//			selectHtml+=ProfessList[i];
//			selectHtml+="</option>";
//		}
//		selectHtml+="</select>";
//		return selectHtml;
//}	


/***获取专业数据（用于自动补全）**/
function courseName(ProfessList){
	var selectHtml=ProfessList;
	return selectHtml;
}


/***拼接下拉支付方式***/
function getPayList(PayList,PayListId){
	var selectHtml="";
	selectHtml+="<select class='select_box1 boxbor payMethod'>";
	selectHtml+="<option>请选择</option>";
		for(var i =0;i<PayList.length;i++){
			selectHtml+="<option data-id='"+PayListId[i]+"'>";
			selectHtml+=PayList[i];
			selectHtml+="</option>";
		}
		selectHtml+="</select>";
		return selectHtml;
}	

/***拼接下拉退费原因***/
function getReasonList(ReasonList,ReasonListId){
	var selectHtml="";
	selectHtml+="<select class='select_box1 boxbor refundReason'>";
	selectHtml+="<option>请选择</option>";
		for(var i =0;i<ReasonList.length;i++){
			selectHtml+="<option data-id='"+ReasonListId[i]+"' >";
			selectHtml+=ReasonList[i];
			selectHtml+="</option>";
		}
		selectHtml+="</select>";
		return selectHtml;
}

/***拼接下拉是否欠款***/
function getIsArrar(){
	var selectHtml="";
	selectHtml+="<select class='select_box1 boxbor isRefund'>";
	selectHtml+="<option value=''>请选择</option>";
	selectHtml+="<option value='Y'>是</option>";
	selectHtml+="<option value='N'>否</option>";
	selectHtml+="</select>";
	return selectHtml;
}
/**序号**/
function numSort() {
	var x = 0;
	$("#add tr").each(function(i) {
		$(this).children("td:first").text(x);
		x++;
	});
}


/***添加行数****/
function addRecord() {
	var row = $("#add tr").length;
	if(ReasonList.length == 0){
		/***获取下拉支付方式和退费原因***/
		 $.ajax({
				url:basePath+"student/studentDetail/selectALLDownboxValue.htmls",
				async: false,/**同步**/
				success:function(data){
					var data = eval("("+data+")");
					for(var i = 0;i<data.length;i++){
						if(data[i].type == "refund_reason"){
							ReasonList.push(data[i].codeValue);
							ReasonListId.push(data[i].codeKey);
						}
						else if(data[i].type == "payment"){
							PayList.push(data[i].codeValue);
							PayListId.push(data[i].codeKey);
						}
						
					}
				}
			});
		 /***获取下拉课程专业***/
		 $.ajax({
				url:basePath+"student/studentDetail/selectMoreCourse.htmls",
				async: false,/**同步**/
				success:function(data){
					var data = eval("("+data+")");
					for(var i = 0;i<data.length;i++){
						ProfessList.push(data[i].courseName);
						ProfessListId.push(data[i].id);
						CourseHead.push(data[i].codeValue);
					}
				}
			});
		
	}
	 
     /***拼接一行字符串***/
	 var html = "";
	 html+="<tr>";
	 html+="<td>"+row+"</td>";
	 html+="<td><input type='text' class='boxbor professionCode' /></td>";
	// html+="<td>"+ getProfess(ProfessList, ProfessListId,CourseHead)+"</td>";
	 
	 /***下拉改为自动补全****/
	 html+="<td style='position:relative;'><input type='text' class='edit_box1 boxbor courseName majorName'   placeholder='请填写专业名称' />"
			    +"<div class='auto_hidden'  id = 'auto'></div></td>";
	 /*******/
	 
	 html+="<td><input type='text' class='edit_box1 boxbor enterDate' readonly='readonly' placeholder='报名时间'/></td>";
	 html+="<td><input type='text' class='edit_box1 boxbor amountPayable'/></td>";
	 html+="<td>"+getPayList(PayList,PayListId)+"</td>";
	 html+="<td><input type='text' class='edit_box1 boxbor payment' /></td>";
	 html+="<td><input type='text' class='boxbor arrears'  disabled='disabled'/></td>";
	 html+="<td><input type='text' class='edit_box1 boxbor stuStatus statues' data-keys='reading'/></td>";
	 html+="<td>"+getIsArrar()+"</td>";
	 html+="<td><input type='text' class='edit_box1 boxbor refundMonetary' /></td>";
	 html+="<td>"+getReasonList(ReasonList,ReasonListId)+"</td>";
	 html+="<td><input type='text' class='edit_box1 boxbor remark' /></td>";
	 html+="<td><a href='javascript:void(0);' class='delet_specialty main_icon' name='delet_specialty'></a></td>";
	 html+="</tr>";
	 $("#add").append(html);
	 numSort();
	 bindEvent();/***绑定学员状态div***/
	 $(".enterDate").attr("onClick", "WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'new Data'})" );/***绑定时间控件***/
	 $(".stuStatus").attr("onClick","bindEvent();");
	 $(".amountPayable").attr("onClick","changeMoney()");
	 $(".payment").attr("onClick","changeMoney()");
	 $(".isRefund").on("change", isRefundFun);	
	 /***删除一行***/
	 $("a[name=delet_specialty]").click(function(){
		 if($("#add tr").length>2){
			 $(this).parent().parent().remove();
			 numSort();
		 }else{
			 tmLoading("至少保留一条记录", 2);
			 return false;
		 }
	 });
	 
	 /***自动补全**/
	 $(".majorName").keyup(function(){
		  var  autoComplete  = new AutoComplete($(this),$(this).next()[0],courseName(ProfessList));
		  autoComplete.start(this); 
    }) 
}

/***计算金额***/
function changeMoney(){
	 $(".amountPayable, .payment").on("change", function(){
		 var $tr = $(this).parent().parent();
		 var $amountPayable = $tr.children().eq(4).find("input");
		 var $payment = $tr.children().eq(6).find("input");
		 var $arrears = $tr.children().eq(7).find("input");
		   
		 var amountPayable = $amountPayable.val();
		 var payment = $payment.val();
		 var arrears = Number(amountPayable) - Number(payment);
		  if(Number($payment) > Number($amountPayable)){
			  $payment.focus();
			  tmLoading("实付金额不能大于专业价格", 1);
			  return false;
		  }else{
			  $arrears.attr("value",arrears);
		  }

	});
}


/***用于是否退费的效果***/
function isRefundFun(){
	    var isRefunds = $(this).val();
	  	if(isRefunds == "N"){
		    $(this).parent().next().find("input").attr("disabled", true);
		    $(this).parent().next().next().find("select").attr("disabled", true);
		}
		if(isRefunds == "Y"){
		    $(this).parent().next().find("input").attr("disabled", false);
		    $(this).parent().next().next().find("select").attr("disabled", false);
		} 
}


/**删除身份证图片信息**/
function deleteImg(parms){
	var stuId = $("#stuId").data("stu");
	if(parms =="imgIdcardA"){
		 document.getElementById('imgIdcardA').src= '';
		 $("#cIDImgAA").hide();
		 $("#cIDImgA").show();
		 $.ajax({
				url: basePath+"student/studentDetail/deleteImg/"+stuId+"/"+parms+".htmls",
				data:{},
			});
	}
	if(parms =="imgIdcardB"){
		 document.getElementById('imgIdcardB').src= '';
		 $("#cIDImgBB").hide();
		 $("#cIDImgB").show();
		 $.ajax({
				url: basePath+"student/studentDetail/deleteImg/"+stuId+"/"+parms+".htmls",
				data:{},
			});
	}
}

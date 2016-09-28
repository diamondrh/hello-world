$(function(){
//	$.ajaxSetup({
//	  async: false
//	});
	if(getCookie("onReadPageCookie") == "dived") {
		getDivedStudentCount();
	} else {//初始化加载未分班学员
		getUndivStudentCount();
	}
	
	//已分班页面
	$("#divided").on("click", function(){
		var cur = $(this).attr("class");
		if(typeof(cur) == "undefined") {
			$(".cluster").val(0);
			$(".cluster").change();
			
			getDivedStudentCount(true);	
		}	
	})
	//未分班页面
	$("#unDivided").on("click", function(){
		var cur = $(this).attr("class");
		if(typeof(cur) == "undefined") {
			$(".cluster").val(0);
			$(".cluster").change();
			
			getUndivStudentCount(true);	
		}
			
	})
	$(".search_icon").on("click", function(){
		if(getCookie("onReadPageCookie") == "dived") {
			getDivedStudentCount(true);
		} else {//初始化加载未分班学员
			getUndivStudentCount(true);
		}
	})
		//分班功能
	$("#dividGrade").on("click", function() {
		var checkedData = getData("profname");
		if(isEmptyObject(checkedData)) {
			tmLoading("您未选择学员", 2);
			return;
		}
		if(findDiffProf()) {//未发现不同专业
			tmLoading("你选择的有不同专业，不能分配到同一班级", 2);
			return;
		} else {
			getGradeNameByProfName(checkedData[0].split(",")[0]);
		}
	})
})

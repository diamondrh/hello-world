<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN">
<html lang="en">
<head>
<meta name="Generator" content="EditPlus">
<meta name="Author" content="">
<meta name="Keywords" content="">	
<meta name="Description" content="">
<meta http-equiv="X-UA-Compatible" content="chrome=1;IE=Edge;">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/common/commonResource.jsp" %>
<link href="${basePath}resources/css/pagination/page.css" rel="stylesheet">
<title>系统管理_问题数据</title>
</head>
<body>
	<%@include file="/WEB-INF/views/page/sys/left.jsp" %>	
	<div class="main_right">	
		<%@include file="/WEB-INF/views/page/sys/top.jsp" %> 
     <div class="main_con">
          <div class="search_condition marb_14 clearfix">
              <div class="search fl"><input type="text" id = "keyword" class="search_box boxbor"  autocomplete="off" placeholder="姓名、手机、QQ" /><a href="javascript:void(0);" class="search_icon main_icon"></a></div>
         </div>
         <div class="marb_14">
             <div id="studentList"></div>
             <div id="page" class="mart_14"></div>
         </div>
     </div>
</div>
<script type="text/javascript" src="${basePath}/resources/js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="${basePath}resources/js/student/studentRepeat.js"></script>
  <script type="text/javascript" src="${basePath}resources/js/pagin/jquery.pagination.js"></script>
<script type="text/javascript">
function tzchangeyear(dp){
    $("#keybirthday").val(dp.cal.getNewDateStr());
}
</script>

</body>
</html>
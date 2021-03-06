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
<%@include file="/WEB-INF/common/common.jsp" %>
<link href="${basePath}resources/css/global.css" rel="stylesheet">
<link href="${basePath}resources/css/main.css" rel="stylesheet">
<link href="${basePath}resources/css/pagination/page.css" rel="stylesheet">
<script src="${basePath}resources/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="${basePath}resources/js/jquery.cxselect.js"></script>
<title>教务管理_学员作业</title>
</head>
<body>
    <!-- 引用头部和左边菜单栏 -->
    <%@include file="/WEB-INF/views/page/sys/left.jsp" %>
    <!--内容部分-->
    <div class="main_right">
    <%@include file="/WEB-INF/views/page/sys/top.jsp" %>
	     
	     <div class="main_con">
	         <div class="search_condition marb_14 clearfix">
		          <!--引入职能  -->
		          <jsp:include page="/WEB-INF/views/page/sys/comboBox.jsp" >
					<jsp:param name="size" value="4" />
				  </jsp:include>
	              <div class="search fl">
	                   <input id="searchKey" type="text" class="search_box boxbor" placeholder="讲师、班主任" />
	                   <a id="search" href="javascript:void(0);" class="search_icon main_icon"></a>
	              </div>
	         </div>
	         <div class="marb_14 clearfix">
	              <a href="javascript:jumpTolackwork();" class="add_btn bg_blue">缺交作业学员列表</a>
	         </div>
	         <input id="itemCount" type="hidden" value=""/>
	         <div id="result" class="marb_14"> </div>
	         <div id="page" class="mart_14"></div>
	     </div>
	</div>
	
	<script type="text/javascript">
	   var orgProCalId = "${searchParam.orgProCalId}";
	   var searchKey = "${searchParam.searchKey}";
	   var pageNo = "${searchParam.startNumber}";
	   var pageSize = "${searchParam.pageSize}";
	</script>
</body>
<script type="text/javascript" src="${basePath}resources/js/tmDialog.js"></script>
<script type="text/javascript" src="${basePath}resources/js/sg.js"></script>
<script type="text/javascript" src="${basePath}resources/js/sgutil.js"></script> 
<script type="text/javascript" src="${basePath}resources/js/pagin/jquery.pagination.js"></script>
<script type="text/javascript" src="${basePath}resources/js/pageQuery.js"></script>
<script type="text/javascript" src="${basePath}resources/js/educational/classes.js"></script>
</html>
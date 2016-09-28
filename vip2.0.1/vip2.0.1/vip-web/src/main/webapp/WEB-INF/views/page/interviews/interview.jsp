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
<link href="${basePath}/resources/css/pagination/page.css" rel="stylesheet">
<title>访谈记录</title>
</head>
<body>
<%@include file="/WEB-INF/views/page/sys/left.jsp" %> 
<div class="main_right">
     <%@include file="/WEB-INF/views/page/sys/top.jsp" %> 
     <div class="main_con">
         <div class="search_condition marb_14 clearfix">
         
             <jsp:include page="/WEB-INF/views/page/sys/comboBox.jsp" >
				<jsp:param name="size" value="3" />
			</jsp:include>
		
              <div class="marl_20 fl">根据访谈日期：</div>
              <div class="data_box"><input type="text" placeholder="开始时间"  class="text_box boxbor" id="startDate" onClick="WdatePicker({maxDate:'#F{$dp.$D(\'endDate\')}',dateFmt:'yyyy-MM-dd'})"/><i class="main_icon data_img"></i></div>
              <div class="data_box"><input type="text" placeholder="结束时间" class="text_box boxbor" id="endDate" onClick="WdatePicker({minDate:'#F{$dp.$D(\'startDate\')}',dateFmt:'yyyy-MM-dd'})"/><i class="main_icon data_img"></i></div>
              <div class="search fl"><input type="text" class="search_box boxbor" placeholder="姓名、QQ" id="keyWord"/><a href="javascript:void(0);" class="search_icon main_icon" id="search"></a></div>
         </div>
         <div class="marb_14 clearfix">
         	<vip:insertSecurity>
              <a href="${basePath}interview/interviewInfoAdd/addPage.htmls" class="add_btn bg_blue"><i class="main_icon add_icon addview"></i>添加访谈记录</a>
          	</vip:insertSecurity>
           	<vip:deleteSecurity>
              <a href="javascript:void(0);" class="deletInfo delet_btn marl_20">删除</a>
            </vip:deleteSecurity>
         </div>
         <div class="marb_14">
         	<div id="Result"></div>
		    <div id="Pagination" style="width:100%; height:40px; padding-top:10px;border-top:1px solid #ccc;display: none;"></div>
         </div>
     </div>
</div>
</body>
<script type="text/javascript" src="${basePath}resources/js/pagin/jquery.pagination.js"></script>
<script type="text/javascript" src="${basePath}resources/js/interviews/interview.js"></script>
<script type="text/javascript" src="${basePath}resources/js/My97DatePicker/WdatePicker.js"></script>
<script src="${basePath}resources/js/interviews/interviewDelete.js"></script>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
<meta name="Generator" content="EditPlus">
<meta name="Author" content="">
<meta name="Keywords" content="">	
<meta name="Description" content="">
<meta http-equiv="X-UA-Compatible" content="chrome=1;IE=Edge;">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/common/commonResource.jsp" %>
<link href="${basePath}resources/css/pagination/page.css" rel="stylesheet" type="text/css"/>
<title>系统管理_支付方式</title>
</head>

<body>
<%@include file="/WEB-INF/views/page/sys/left.jsp" %>
	<div class="main_right">
<%@include file="/WEB-INF/views/page/sys/top.jsp" %>
     <div class="clearfix">
        
     </div>
     <div class="main_con clearfix">
         <div class="marb_14 clearfix">
              <a  href="javascript:void(0);" class="add_btn bg_blue addP"><i class="main_icon add_icon addpayment"></i>添加支付方式</a>
              <a  href="javascript:void(0);" class="deletInfo delet_btn marl_20">删除</a>
         </div>
         
          <div class="marb_14 clearfix">
             <!-- 通过页面渲染 -->
        	<div class="marb_14 clearfix" id="result" >
        	</div>
	    	<div id="page" style="width:100%; height:40px; padding-top:10px;border-top:1px solid #ccc;display: none;"></div>
     		</div>
         </div>
        
</div>

<!--新增支付方式弹出层-->
<div class="pop_div addPayment">
     <div class="pop_content">
          <div class="pop_title"><span>添加支付方式</span></div>
          <div class="pop_student">
               <div class="status_con statusCon">
                    <p><span>支付方式：</span><input id="codeValue" type="text" class="search_box boxbor" /></p>
               </div>
          </div>
          <div class="pop_btn"><a  href="javascript:void(0);" class="add_btn bg_blue Sure">确定</a><a  href="javascript:void(0);" class="add_btn bg_gray marl_20 Quit">取消</a></div>
     </div>
</div>
</body>

<script type="text/javascript" src="${basePath}resources/js/pagin/jquery.pagination.js"></script>
<script type="text/javascript" src="${basePath}resources/js/tmDialog.js"></script>
<script type="text/javascript" src="${basePath}resources/js/student/payment.js"></script>
<script type="text/javascript">
	//点击新增弹出
	$(".addP").click(function(){
		
		$(".addPayment").fadeIn(200);
	});
	$(".Quit").click(function(){
		$("#codeValue").val(""); 
		$(".addPayment").hide();
	});
	
	/***添加支付方式***/
	$(".Sure").click(function(){
		var codeValue = $("#codeValue").val();
		if(isEmpty(codeValue)){
			$("#codeValue").focus();
        	tmLoading("请输入支付方式",1);
        	return false;
        }
        if(codeValue.length>15){
        	$("#codeValue").select();
        	tmLoading("长度为1~20个字符",1);
        	return false;
        }
        $.ajax({
			url:basePath+"admin/payment/insertPayment.htmls",
			data:{"codeValue":codeValue},
			success:function(data){
				var data =eval("("+data+")");
				if(data.msg=="true"){
					$(".addPayment").hide();
					tmLoading("添加成功",1);
					$("#codeValue").val(""); 
					setTimeout(function(){
						/** 刷新页面**/
						tm_refreash();
					},1000);
				}else if(data.msg=="equals"){
					tmLoading("已存在该支付方式",1); 
				}else{
					tmLoading("添加失败",1);
				}
			}
		});
	});
</script>

<script type="text/javascript" src="${basePath}resources/js/pageQuery.js"></script>
</html>
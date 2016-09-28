<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include  file="/WEB-INF/common/taglib.jsp"%>
<%@page isELIgnored="false"%> 
<table width="100%" class="table_style" id="box">
             <tr>
             <th width="80">序号</th>
             <th><span class="color_red">*</span>学员编号</th>
             <th>学员姓名</th>
             <th><span class="color_red">*</span>专业名称</th>
             <th><span class="color_red">*</span>专业价格</th>
             <th>实付金额</th>
             <th>尾款</th>
             <th>手机</th>
             <th>QQ</th>
             <th>报名日期</th>
             <th>是否欠款</th>
             <th>是否退费</th>
             <th>学员状态</th>
             <th>备注</th>
             <th width="140">操作</th>
             </tr>
             <c:if test="${fn:length(list) == 0}">
	             <tr><td colspan="15">暂无数据</td></tr>
	         </c:if>
	         <c:forEach  items="${list}" var="s" varStatus="status">
             <tr>
             <td>${status.index+1}</td>
             <td  class="ondbl"><input type="text" class="codeNumber" value="${s.professionCode}" style="display:none;" /><span>${s.professionCode}</span></td>
             <td>${s.stuName}</td>
             <td>${s.course}</td>
             <td>${s.amountPayable}</td>
             <td>${s.payment}</td>
             <td>${s.arrears}</td>
             <td>${s.telephone}</td>
             <td>${s.QQ}</td>
             <td><fmt:formatDate value="${s.enterDate}" type="date" /></td>
             <td>${s.isArrears}</td>
             <td>${s.isRefund}</td>
             <c:choose>
                 <c:when test="${s.statues == 'reading'}">
                    <td>在读</td>
                 </c:when>
                 <c:when test="${s.statues == 'drop' }">
                    <td>退学</td>
                 </c:when>
                 <c:when test="${s.statues == 'pause'}">
                    <td>休学</td>
                 </c:when>
                 <c:when test="${s.statues == 'continues'}">
                    <td>复学</td>
                 </c:when>
                 <c:when test="${s.statues == 'stay'}">
                    <td>留级</td>
                 </c:when>
                 <c:when test="${s.statues == 'end'}">
                    <td>结束</td>
                 </c:when>
             </c:choose>
             <td>${s.remark}</td>
             <td><a href="javascript:void(0);" data-id="${s.id}"  data-cc ="${s.professionCode}" class="again_btn bg_blue">学号修改确认</a></td>
             </tr>
             </c:forEach>
</table>

      
      
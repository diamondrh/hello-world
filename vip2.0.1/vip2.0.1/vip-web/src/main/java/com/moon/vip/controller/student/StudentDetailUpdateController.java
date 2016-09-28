package com.moon.vip.controller.student;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.moon.platform.commons.util.BlankUtil;
import com.moon.vip.controller.BaseController;
import com.moon.vip.controller.uploadStudentData.UploadUtil;
import com.moon.vip.infra.constants.IsValidType;
import com.moon.vip.infra.vo.EmployeeLoginVO;
import com.moon.vip.infra.vo.student.ClassVO;
import com.moon.vip.infra.vo.student.CourseVO;
import com.moon.vip.infra.vo.student.ProfessionalVO;
import com.moon.vip.infra.vo.student.StuProfessionalVO;
import com.moon.vip.infra.vo.student.StudentVO;
import com.moon.vip.service.student.IProfessionalService;
import com.moon.vip.service.student.IRepeatStudentService;
import com.moon.vip.service.student.IStudentArchivesService;
import com.moon.vip.service.student.IStudentRepeatService;
import com.moon.vip.service.sys.IProfessionSquenceService;

/**
 * 学员信息模块
 * StudentDetailController<BR>
 * 创建人:娴贵 <BR>
 * 时间：2015年12月30日-下午9:07:57 <BR>
 * @version 1.0.0
 * 
 */
@Controller
@RequestMapping("/student/studentDetail")
public class StudentDetailUpdateController extends BaseController{
	private static Logger logger = Logger.getLogger(StudentDetailUpdateController.class);
	
	@Autowired
	private IStudentArchivesService iStudentArchivesService;
	@Autowired
	private IProfessionalService iProfessionalService;
	@Autowired
	private IRepeatStudentService iRepeatStudentService;
	@Autowired
	private IProfessionSquenceService iprofessionSquenceService;
	@Autowired	
	private UploadUtil upload;
	@Autowired
	private IStudentRepeatService iStudentRepeatService;
	
	
	private String ICON_IMG="IconImg";
	private String IDCARD_A="idcardA";
	private String IDCARD_B="idcardB";
	/**
	 * 学员信息列表页面<BR>
	 * 方法名：studentList<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2015年12月31日-下午3:32:12 <BR>
	 * @return ModelAndView<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping("/studentList")
	private ModelAndView studentList(HttpServletResponse response){
		ModelAndView modelAndView = new ModelAndView();
		Cookie cookie = new Cookie("menu", "studentInfoPages");
		cookie.setPath("/");
		response.addCookie(cookie);		
		modelAndView.setViewName("/page/student/studentList");
		return modelAndView;
	}
	
	/**
	 * 学员信息列表模板页面<BR>
	 * 方法名：studentTemplate<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2015年12月31日-下午3:37:30 <BR>
	 * @return ModelAndView<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping("/studentTemplate")
	private ModelAndView studentTemplate(StudentVO studentVO){
		ModelAndView modelAndView = new ModelAndView();
		studentVO.setOpClaIds(achieveAuth());
		List<StudentVO> students = iStudentArchivesService.selectAllStudent(studentVO);
		int count = iStudentArchivesService.selectAllStudentCount(studentVO);
		modelAndView.addObject("count", count);
		modelAndView.addObject("student", students);
		modelAndView.setViewName("/page/student/studentTemplate");
		return modelAndView;
	}
	
	/**
	 * 获取学员信息总数<BR>
	 * 方法名：getCount<BR>
	 * 创建人：张烜久 <BR>
	 * 时间：2016-7-1 10:11:07 <BR>
	 * @return HashMap<String, Object><BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping("/getCount")
	@ResponseBody
	private HashMap<String, Object> getCount(StudentVO studentVO){
		studentVO.setOpClaIds(achieveAuth());
		int count = iStudentArchivesService.selectAllStudentCount(studentVO);
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("count", count);
		return result;
	}
	
	/**
	 * 查看个人详情<BR>
	 * 方法名：personalDetail<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月4日-上午10:57:13 <BR>
	 * @return ModelAndView<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping("/personalDetail/{id}")
	public ModelAndView personalDetail(@PathVariable("id")Integer id){
		ModelAndView modelAndView = new ModelAndView();
		CourseVO co  = new CourseVO(); 
		co.setOpClaIds(achieveAuth());
		co.setStudentId(id);
	    StudentVO studentVO = iStudentArchivesService.selectStuDetail(id);/***获取个人信息***/
		List<CourseVO> course =iStudentArchivesService.selectCourseDetail(co);/**获取专业信息**/
		modelAndView.addObject("student", studentVO);
		modelAndView.addObject("course", course);
		modelAndView.setViewName("/page/student/personalDetail");
		return modelAndView;
	}
	
	/**
	 * 跳转到添加学员信息页面<BR>
	 * 方法名：addStudentMessage<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月4日-下午8:36:14 <BR>
	 * @param studentVO
	 * @return ModelAndView<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping(value ="/addStudentMessage/{id}/{statues}",method ={RequestMethod.POST,RequestMethod.GET})
    public ModelAndView addStudentMessage(@PathVariable("id")Integer id,@PathVariable("statues")String statues,String courseName){
		ModelAndView modelAndView = new ModelAndView();
		/***获取所有下拉列表的值***/
        List<ProfessionalVO> professionalVOs = iProfessionalService.selectALLDownbox();
        List<ClassVO> classVOs = iStudentArchivesService.selectCourse(courseName);
       // String c = JSON.toJSONString(classVOs);
        CourseVO co = new CourseVO();
        co.setStudentId(id);
        co.setOpClaIds(achieveAuth());
        /***获取个人信息(跳到编辑页面)***/
        if(id != -1){
        	StudentVO studentVO = iStudentArchivesService.studentDetail(id);/***学员信息拼接组合****/
        	List<CourseVO> course =iStudentArchivesService.selectCourseDetail(co);/**学员专业信息组合***/
        	modelAndView.addObject("student", studentVO);
        	modelAndView.addObject("courseVO", course);
        }
        modelAndView.addObject("professional", professionalVOs);
        modelAndView.addObject("course", JSON.toJSONString(classVOs));
		modelAndView.setViewName("/page/student/addStudentMessage");
		return modelAndView;
	}


	
	/****获取所有添加专业信息所需要的下拉值（支付方式和退费原因）***/
	@RequestMapping(value = "/selectALLDownboxValue",method = {RequestMethod.POST,RequestMethod.GET})
	@ResponseBody
	public List<ProfessionalVO> selectALLDownboxValue(){
		/***获取所有下拉列表的值***/
        List<ProfessionalVO> professionalVOs = iProfessionalService.selectALLDownbox();
		return professionalVOs;
	}
	
	/***获取所有添加专业信息所需要的下拉值(专业)***/
	@RequestMapping(value = "/selectMoreCourse",method = {RequestMethod.POST,RequestMethod.GET})
	@ResponseBody
	public List<ClassVO> selectMoreCourse(Integer id,String courseName){
		/***获取所有下拉列表的值***/
		List<ClassVO> classVOs = iStudentArchivesService.selectCourse(courseName);
		return classVOs;
	}
	
	/**
	 * 删除课程专业信息<BR>
	 * 方法名：deleteCourse<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月15日-上午11:27:10 <BR>
	 * @param pId
	 * @return String<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping(value = "/deleteCourse/{pId}",method ={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public String deleteCourse(@PathVariable("pId")Integer pId,HttpSession session){
		EmployeeLoginVO employee = (EmployeeLoginVO) session.getAttribute("employee");
		int i = iStudentArchivesService.deleteCourse(pId);
		if(i > 0){
			logger.info("删除学员专业信息操作人id："+employee.getId());
			return "success";
		}
		return "fail";
	}
	
	/**
	 * 保存学员信息<BR>
	 * 方法名：saveStudentDetail<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月4日-下午9:04:12 <BR>
	 * @param studentVO
	 * @return ModelAndView<BR>
	 * @throws Exception 
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping(value ="/saveStudentDetail",method = { RequestMethod.POST, RequestMethod.GET })
	@ResponseBody
	public String saveStudentDetail(StudentVO studentVO,HttpSession session,HttpServletRequest request,String courseList) throws Exception{
		
		/**验证学员信息(QQ)**/
		int validate =iStudentArchivesService.validateStuQQ(studentVO);
		if(validate != 0){
			return "qq_error";
		}
		
	    EmployeeLoginVO employee = (EmployeeLoginVO) session.getAttribute("employee");
	    Map<String, String> nameUrl = upload.upload(request, null);
	    /***保存图片地址***/
	    addUrlToVO(nameUrl, studentVO);
		studentVO.setIsValid(IsValidType.Y_VALUE);
	    /***是否有学员id***/
	    if(studentVO.getId() == null){/**添加学员**/
	    	int svo = iStudentArchivesService.selectPersonalDetailCount(studentVO);/***查询是否存在学员记录***/
	    	if(svo != 0){
	    		return "exist";
	    	}
	    	studentVO.setCodeNo(iStudentArchivesService.selectStudentCode());/***生成学员编号***/
	    	studentVO.setCreateTime(new Date());
			studentVO.setCreator(employee.getEmployeeCode());
    		int i = iStudentArchivesService.insertStuArchives(studentVO);
    		if(i>0){
    			StudentVO vo = iStudentArchivesService.selectPersonalDetail(studentVO);/**查询刚保存的学员id**/
    			String statues = saveStudentCourse( session, courseList, vo);
    			if(statues.equals("success")){
    				return "success";	
    			}
    		}
	    }else{/**修改学员信息**/
	    	logger.info("修改学员专业信息工号是："+employee.getEmployeeCode()+"，修改时间："+new Date());
	    	studentVO.setModifyTime(new Date());
			studentVO.setModifyUser(employee.getEmployeeCode());
				
			int i =iStudentArchivesService.updateStuArchives(studentVO);
	    	String statues = saveStudentCourse( session, courseList, studentVO);
	    	if(i > 0 && statues.equals("success") ){
	    		return "success";	
	    	}else if(statues.equals("error")){
	    		return "error";
	    	}
			
	    }
	    return "fail";
	}
	
	
	/***保存图片地址***/
	private void addUrlToVO(Map<String, String> urlMap,StudentVO studentVO){
		/**头像**/
		if(!BlankUtil.isBlank(urlMap.get(ICON_IMG))){
			studentVO.setStuPictureUrl(urlMap.get(ICON_IMG));
		}
		/**身份证正面**/
		if(!BlankUtil.isBlank(urlMap.get(IDCARD_A))){
			studentVO.setCardFrontAddress(urlMap.get(IDCARD_A));
		}
		/**身份证反面**/
		if(!BlankUtil.isBlank(urlMap.get(IDCARD_B))){
			studentVO.setCardReverseAddress(urlMap.get(IDCARD_B));
		}
	} 
	
	/**
	 * 查看是否保存了学员基础信息<BR>
	 * 方法名：selectPersonalDetail<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月8日-下午8:15:23 <BR>
	 * @param studentVO
	 * @return int<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	@RequestMapping(value = "/selectPersonalDetail" ,method = { RequestMethod.POST, RequestMethod.GET })
	@ResponseBody
	public int selectPersonalDetail(StudentVO studentVO){
		StudentVO vo = iStudentArchivesService.selectPersonalDetail(studentVO);
		if(vo !=null){
			int id=vo.getId();
			return id;
		}
		return 0;
	}
	
	
	/**
	 * 保存学员专业信息<BR>
	 * 方法名：saveStudentCourse<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年1月5日-下午1:43:26 <BR>
	 * @param courseVOs
	 * @return ModelAndView<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
	private String saveStudentCourse(HttpSession session,String courseList,StudentVO vo){
		EmployeeLoginVO employee = (EmployeeLoginVO) session.getAttribute("employee");
		List<StuProfessionalVO> list = new ArrayList<StuProfessionalVO>();
		List<StuProfessionalVO> course = JSON.parseArray(courseList, StuProfessionalVO.class);
		for (StuProfessionalVO courseVO : course) {
			studentListCourse(vo, employee, courseVO);/***组合专业信息****/
			List<ClassVO> clasId = iStudentArchivesService.selectCourse(courseVO.getCourseName());
			if(clasId.size() == 0){
				iStudentRepeatService.deleteStudentArchives(vo.getId());
				logger.info("不存在该专业信息");
				return "COURSE_NOT_EXIST";
			}
			for(ClassVO opId: clasId)
			    courseVO.setOpProId(opId.getId());
			    if(courseVO.getpId() == null){
			    	 int j = iRepeatStudentService.selectStuProCode(courseVO.getpId(),courseVO.getProfessionCode());
					 if(j > 0){
						   iStudentRepeatService.deleteStudentArchives(vo.getId());
						   logger.info("学员专业编号重复");
						   return "error";
					 }
					courseVO.setCreateTime(new Date());
					courseVO.setCreator(employee.getEmployeeCode());
				    list.add(courseVO);
			    }else{/**查询修改的学员编号是否存在**/
				     int j = iRepeatStudentService.selectStuProCode(courseVO.getpId(),courseVO.getProfessionCode());
				     if(j > 0){
				    	 logger.info("学员专业编号重复");
				    	 return "error";
				     }
				     logger.info("修改学员资料信息工号是："+employee.getEmployeeCode()+"，修改时间："+new Date());
				     if(courseVO.getStatues().equals("end")){
					    courseVO.setEndDate(new Date());
				      }
					 courseVO.setModifyTime(new Date());
					 courseVO.setModifyUser(employee.getEmployeeCode());
					 iStudentArchivesService.updateStuProfessional(courseVO);
			     }
		    }  
		    if(list.size() !=0){
		    	int i = iStudentArchivesService.insertStuProfessional(list);
		    	if(i>0){
		    		return "success";
		    	}
		    	return "fail";
		    }
		    return "success";
	}

	/***组合专业信息****/
	private void studentListCourse(StudentVO vo, EmployeeLoginVO employee, StuProfessionalVO courseVO) {
		courseVO.setStudentId(vo.getId());
		if("".equals(courseVO.getIsRefund()) || courseVO.getIsRefund() == null){/**是否退费**/
			courseVO.setIsRefund(IsValidType.N_VALUE);
		}
		if("".equals(courseVO.getRefundReason()) || courseVO.getRefundReason() == null){
			courseVO.setRefundReason("noReason");
		}
		if(courseVO.getStatues() ==null || "".equals(courseVO.getStatues())){
			courseVO.setStatues(IsValidType.STATUS_READING_KEY);
		}
		BigDecimal amt= courseVO.getArrears(); 
		if(amt.equals(BigDecimal.ZERO)){/**是否欠费**/
			courseVO.setIsArrears(IsValidType.N_VALUE);
		}else{
			courseVO.setIsArrears(IsValidType.Y_VALUE);
		}
		if(courseVO.getRefundMonetary() == null || courseVO.getRefundMonetary().intValue() == 0){/***转化退款0.00***/
			courseVO.setRefundMonetary(new BigDecimal(0));
		}
		    courseVO.setIsValid(IsValidType.Y_VALUE);
	}


   /**
	 * 删除身份证图片信息<BR>
	 * 方法名：deleteImg<BR>
	 * 创建人：娴贵 <BR>
	 * 时间：2016年6月16日-下午3:56:47 <BR>
	 * @param stuId
	 * @param parms
	 * @return int<BR>
	 * @exception <BR>
	 * @since  1.0.0
	*/
   @RequestMapping("/deleteImg/{stuId}/{parms}")
   @ResponseBody
   public int deleteImg(@PathVariable("stuId")Integer stuId,@PathVariable("parms")String parms,HttpSession session){
	   EmployeeLoginVO employee = (EmployeeLoginVO) session.getAttribute("employee");
	   logger.info("操作删除学员身份证图片信息的人员工号："+employee.getEmployeeCode());
	   return iStudentArchivesService.deleteImg(stuId,parms);
   }

}


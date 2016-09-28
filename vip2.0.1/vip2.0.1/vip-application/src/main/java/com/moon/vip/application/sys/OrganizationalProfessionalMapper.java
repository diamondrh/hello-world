package com.moon.vip.application.sys;

import org.apache.ibatis.annotations.Param;

import com.moon.vip.model.sys.OrganizationalProfessional;

public interface OrganizationalProfessionalMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insert(OrganizationalProfessional record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insertSelective(OrganizationalProfessional record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    OrganizationalProfessional selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKeySelective(OrganizationalProfessional record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_organizational_professional
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKey(OrganizationalProfessional record);

	int insertRecId(OrganizationalProfessional cla);
	
	int updateStudentClassStatus(@Param("opClaId")Integer opClaId);
}
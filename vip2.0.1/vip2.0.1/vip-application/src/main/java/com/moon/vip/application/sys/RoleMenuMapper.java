package com.moon.vip.application.sys;

import com.moon.vip.model.sys.RoleMenu;

public interface RoleMenuMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insert(RoleMenu record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insertSelective(RoleMenu record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    RoleMenu selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKeySelective(RoleMenu record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_menu
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKey(RoleMenu record);
}
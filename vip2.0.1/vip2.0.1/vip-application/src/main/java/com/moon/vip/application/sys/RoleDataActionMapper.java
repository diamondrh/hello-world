package com.moon.vip.application.sys;

import com.moon.vip.model.sys.RoleDataAction;

public interface RoleDataActionMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insert(RoleDataAction record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insertSelective(RoleDataAction record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    RoleDataAction selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKeySelective(RoleDataAction record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_role_data_action
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKey(RoleDataAction record);
}
package com.moon.vip.application.sys;

import com.moon.vip.model.sys.MenuResource;

public interface MenuResourceMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insert(MenuResource record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insertSelective(MenuResource record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    MenuResource selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKeySelective(MenuResource record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_menu_resource
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKey(MenuResource record);
}
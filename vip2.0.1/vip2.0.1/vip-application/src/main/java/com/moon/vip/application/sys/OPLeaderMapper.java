package com.moon.vip.application.sys;

import com.moon.vip.model.sys.OPLeader;

public interface OPLeaderMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insert(OPLeader record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int insertSelective(OPLeader record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    OPLeader selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKeySelective(OPLeader record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table vip_OP_leader
     *
     * @mbggenerated Wed Dec 23 15:44:50 CST 2015
     */
    int updateByPrimaryKey(OPLeader record);
}
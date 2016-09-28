/**
 * Created by Administrator on 2016/6/30.
 */
/***学员信息展示列表***/
$(function(){
	
	var currentCount = 0;

    tmLoading("加载中...",0.5);
    
    getCount();

    /***搜索触发事件***/
    $(".search_icon").click(function(){
    	
    	var keyword=$("#keyword").val();
        if(keyword.length>25){
            tmLoading("输入的文字过多",1);
            $("#keyword").select();
            keyword = null;
            return false;
        }
    	var dom = $("#element_id>select:visible:last");
        var orgId = (dom.val() == 0)?dom.prev("select").val():dom.val();
        getCount_search(keyword,orgId);
        
    });
    
    /***浏览器兼容(回车事件)***/
    $('.search_box').on('keydown',function(e){
    	var keycode=document.all?event.keyCode:e.which;
    	
    	if(keycode==13){
    		$(".search_icon").click();
    	}
    	e.stopPropagation();
    });    
    
});


/*** 获取总数 ***/
function getCount(){
    $.ajax({
        url: basePath+"student/studentDetail/getCount.htmls",
        data:{},
        dataType:'json',
        success:function(data){
        	currentCount = data.count;
        	init_page(data.count);
        	$('#page').hide();
        }
    });
}

/*** 获取总数 ***/
function getCount_search(keyword,orgId){
    $.ajax({
        url: basePath+"student/studentDetail/getCount.htmls",
        data : {
            "offset" : 0,
            "pageSize": 10,
            "keyWord":keyword,
            "organizationId":orgId
        },
        dataType:'json',
        success:function(data){
        	currentCount = data.count;
        	init_page_search(data.count,keyword,orgId);
        	$('#page').hide();
        }
    });

}

function init_page(count){
	
	$("#page").pagination(count, {
        num_edge_entries : 3, /***边缘页数***/
        num_display_entries : 3, /***主体页数***/
        current_page : 0,
        showGo:true,
        showSelect:true,
        is_search:false,
        items_per_page : 10, /***每页显示X项***/
        prev_text : "前一页",
        next_text : "后一页",
        callback : function(pageNo,psize) {
            tm_load_template(pageNo,psize,null,null);
        }
    });
	
}

function init_page_search(count,keyword,orgId){
	
	$("#page").pagination(count, {
        num_edge_entries : 3, /***边缘页数***/
        num_display_entries : 3, /***主体页数***/
        current_page : 0,
        showGo:true,
        showSelect:true,
        is_search:true,
        items_per_page : 10, /***每页显示X项***/
        prev_text : "前一页",
        next_text : "后一页",
        callback : function(pageNo,psize) {
            tm_load_template(pageNo,psize,keyword,orgId);
        }
    });
	
}

/*** 分页模板 ***/
function tm_load_template(pageNo,psize,keyword,orgId){
	
	/*** 有搜索条件时 ***/
    if(keyword){
        $.ajax({
            url: basePath+"student/studentDetail/studentTemplate.htmls",
            data : {
                "offset" : pageNo*psize,
                "pageSize": psize,
                "keyWord":keyword,
                "organizationId":orgId
            },
            success : function(data) {
                tmLoading("加载中...",0.5);
                $('#studentList').html(data);
                bindAction();
                if(currentCount > 10){
                	$('#page').show();
                }
            	$('#studentList').show();
            }
        });

    }else{
        $.ajax({
            url: basePath+"student/studentDetail/studentTemplate.htmls",
            data:{
                "offset" : pageNo*psize,
                "pageSize": psize
            },
            success:function(data){
                tmLoading("加载中...",0.5);
                $('#studentList').html(data);
                bindAction();
                if(currentCount > 10){
                	$('#page').show();
                }
            	$('#studentList').show();
            }
        });

    }

}

function bindAction(){
	/***跳转查看学员信息详情***/
	$(".check_icon").click(function(){
		var id=$(this).data("id");
		window.location=basePath+"student/studentDetail/personalDetail/"+id+".htmls";
	});
	
	/***跳转添加学员信息***/
	$(".edit_icon").click(function(){
		var id=$(this).data("id");
		var statues = "ok";
		window.location=basePath+"student/studentDetail/addStudentMessage/"+id+"/"+statues+".htmls";
	});
}




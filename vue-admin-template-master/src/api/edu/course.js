import request from '@/utils/request';

export default {
  addCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/addCourseInfo',
      method: 'post',
      data: courseInfo
    })
  },
  getTeacherList() {
    return request({
      url: '/eduservice/eduteacher/findAll',
      method: 'get'
    })
  },
  getCourseInfo(id) {
    return request({
      url: '/eduservice/course/getCourseInfo/'+id,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo){
    return request({
      url: '/eduservice/course/updateCourseInfo/',
      method: 'post',
      data:courseInfo
    })
  },
  //添加课程信息确认
  getPublishCourseInfo(id){
    return request({
      url: '/eduservice/course/getPublishCourseInfo/'+id,
      method: 'get'
    })
  },
  publishCourse(courseId){
    return request({
      url: '/eduservice/course/publishCourse/'+courseId,
      method: 'post'
    })
  },
  getCoursePageList(current, limit, courseQuery){
    return request({
      url: `/eduservice/course/getCoursePageList/${current}/${limit}`,
      method: 'post',
      //  data表示把对象转换成json进行传递到接口里面
      data: courseQuery
    })
  },
  deleteCourseById(courseId){
    return request({
      url: `/eduservice/course/delete/${courseId}`,
      method: 'delete'
    })
  }
}

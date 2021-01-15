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
  }
}

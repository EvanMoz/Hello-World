import request from '@/utils/request';

export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/eduteacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //  data表示把对象转换成json进行传递到接口里面
      data: teacherQuery
    })
  },
  deleteTeacherById(id){
    return request({
      url: `/eduservice/eduteacher/delete/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher){
    return request({
      url: `/eduservice/eduteacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  getTeacherInfo(id){
    return request({
      url: `/eduservice/eduteacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  updateTeacher(teacher){
    return request({
      url: `/eduservice/eduteacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  }
}


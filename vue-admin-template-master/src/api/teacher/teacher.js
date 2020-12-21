import request from '@/utils/request';

export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/eduteacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //  data表示把对象转换成json进行传递到接口里面
      data: teacherQuery
    })
  }
}


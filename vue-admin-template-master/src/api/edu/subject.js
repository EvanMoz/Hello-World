import request from '@/utils/request';

export default {
  getAllSubjectList() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  }
}

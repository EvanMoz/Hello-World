import request from '@/utils/request';

export default {
  getAllChpaterVideo(courseId) {
    return request({
      url: '/eduservice/chapter/getChapterVideo/'+courseId,
      method: 'get'
    })
  }
}

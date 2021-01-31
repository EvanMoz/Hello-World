import request from '@/utils/request';

export default {
  addVideo(video) {
    return request({
      url: '/eduservice/video/addVideo',
      method: 'post',
      data: video
    })
  },
  deleteVideo(videoId) {
  return request({
    url: '/eduservice/video/delete/'+videoId,
    method: 'delete'
  })
},
  getVideoInfo(videoId){
  return request({
    url: '/eduservice/video/getVideoInfo/'+videoId,
    method: 'get'
  })
},
  updateVideo(video){
    return request({
      url: '/eduservice/video/updateVideo',
      method: 'post',
      data: video
    })
  },
  deleteVodVideo(videoId){
    return request({
      url: '/edu/vod/deleteVideo'+videoId,
      method: 'delete'
    })
  }
}

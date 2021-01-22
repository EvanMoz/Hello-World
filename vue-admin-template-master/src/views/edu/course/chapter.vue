<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">

          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

     <ul class="chapterList">
        <li v-for="chapter in chapterVideoList" :key="chapter.id">
          <p>{{chapter.title}}
            <span class="acts">
              <el-button type="text" @click="openVideo(chapter.id)">添加小节</el-button>
              <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
              <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
            </span>
          </p>
          <ul class="videoList">
            <li v-for="video in chapter.children" :key="video.id">
              <p>
                {{video.title}}
                <span class="acts">
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                    </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>



  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
import video from '@/api/edu/video'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId:'',
      chapterVideoList: [],
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      saveVideoBtnDisabled: false,
      video:{
        title: '',
        sort: '',
        free: 0
      },
      chapter:{
        courseId:'',
        title: '',
        sort: ''
      }
    }
  },

  created() {
    console.log('chapter created')
    if(this.$route.params && this.$route.params.id){
      this.courseId =this.$route.params.id
    }

    this.getChapterVideo()
  },

  methods: {
    openVideo(chapterId){
      this.dialogVideoFormVisible = true
      //设置章节id
      this.video.chapterId = chapterId
    },

    saveOrUpdateVideo(){
      this.addVideo()
    },

    addVideo(){
      this.video.courseId = this.courseId
      video.addVideo(this.video).then(response=>{
        this.dialogVideoFormVisible = false
        //提示
        this.$message({
          type: 'success',
          message: '添加小节成功'
        })
        //刷新页面
        this.getChapterVideo()
      })
    },





    //=========================================章节操作==============================================

    updateChapter(){
      chapter.updateChapter(this.chapter).then(response=>{
        //关闭弹框
        this.dialogChapterFormVisible = false
        //提示
        this.$message({
          type: 'success',
          message: '修改章节成功'
        })
        //刷新页面
        this.getChapterVideo()
      })
    },
    deleteChapter(chapterId){
      this.$confirm('是否确认删除该章节?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapter.deleteChapter(chapterId).then(response => {
          this.$message({
            type: 'success',
            message: '添加章节成功'
          })
          this.getChapterVideo()
        })
      })
    },
    editChapter(chapterId){
      this.dialogChapterFormVisible = true
      chapter.getChapterInfo(chapterId).then(response=>{
        this.chapter = response.data.chapterInfo
      })

    },
    openChapterDialog(){
      this.dialogChapterFormVisible =true
      this.chapter.title =''
      this.chapter.sort = 0
    },
    addChapter(){
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter).then(response=>{
        //关闭弹框
        this.dialogChapterFormVisible = false
        //提示
        this.$message({
          type: 'success',
          message: '添加章节成功'
        })
        //刷新页面
        this.getChapterVideo()
      })
    },
    saveOrUpdate(){
      if (!this.chapter.id){
        this.addChapter()
      }else {
        this.updateChapter()
      }

    },
    getChapterVideo(){
      chapter.getAllChpaterVideo(this.courseId).then(response=>{
        this.chapterVideoList = response.data.allChapterVideo
      })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/info/'+this.courseId })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    }
  }
}
</script>
<style scoped>
.chapterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
  float: right;
  font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>

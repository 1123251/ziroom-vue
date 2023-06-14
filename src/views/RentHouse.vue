<template >
  <div class="body">
   <nav-bar-vue class="nav"></nav-bar-vue>

   <br>
   <el-row>
        <el-col :span="6" style="float:left; margin-left: 2vw;width: 270px; hight: 40px;" id="col">
            <el-input
              type="text"
              prefix-icon="el-icon-search"
              v-model="selectkey"
              placeholder="小区/地铁"
              style="width: 270px; cursor: pointer"
              @keyup.enter.native="getAllKb"
            ></el-input>
            <el-button icon="el-icon-search" circle @click="getAllKb"></el-button>
          </el-col>
</el-row>

    <div class="attr" v-for="attr in attrs" :key="attr.id">{{attr.attrName}}
        <div v-for="value in attr.attrValueList" :key="value.id"  class="attr">
            <div v-if="value.nameList==undefined||value.nameList==null||value.nameList.length <= 0">
               <el-link  target="_blank" class="second" @click="selectByAttr(value,attr)" >{{value.valueName}}</el-link>
            </div>
            <div v-else > 
                <el-dropdown>
  <span class="el-dropdown-link" trigger="click" >
    {{value.valueName}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown" >
    <el-dropdown-item v-for="name in value.nameList" :key="name.id" class="second" @click.native="selectByAttrTh(name,value)">{{name}}</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
            </div>
        </div>
    </div>
    <div>

    </div>
    <div>
        <el-tag
  v-for="tag in this.selectkeys"
  :key="tag"
  closable
  @close="close(tag)"
  v-if="tag!=null"
  >
  {{tag}}
</el-tag>
    </div>
    <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tabs">
    <el-tab-pane label="默认" name="first"  ></el-tab-pane>
    <el-tab-pane label="价格" name="second" ></el-tab-pane>
    <el-tab-pane label="面积" name="third" ></el-tab-pane>
   
  </el-tabs>
    </div>
<div>
    <el-row :gutter="35" >
  <el-col :span="6" v-for="(item,key,index) in this.roomlist.slice((currentPage-1)* pagesize,currentPage * pagesize)" :key="item.id" >
    <el-card :body-style="{ padding: '0px' }">
      <img :src="item.roomPic" class="image">
      <div style="padding: 14px;">
        
         <el-link  target="_blank" @click="toLanding(item,index)" >{{item.roomName}}----{{item.roomArea}}㎡----{{item.roomPrice}}元/月</el-link>
        <div class="bottom clearfix">
          <el-link  target="_blank" @click="toLanding(item,index)">{{item.roomLocation}}</el-link>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<!-- 分页按钮 -->
        <div class="block" style="text-align: right;margin-top: 20px;">
            <!-- 总数量 total ， 每页数量 page-size ，当前页数 current-page -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8, 10, 12, 14, 16]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>

</div>


  </div>
  
</template>

<script>


import NavBarVue from '../components/NavBar.vue'


export default {
    data(){
        return{
            selectkey:'',
            attrs:[],
            roomlist:[],
            roomlist2:[],
            currentDate: new Date(),
            activeName: 'first',
             // 当前页数
            currentPage: 1,
            // 总数量 
            total: null,
            // 每页数量 
            pagesize: 8,
            selectkeys:[],
            postselectkeys:[],
            keys:{
                keys:''
            }
        }
    },
  name: 'RentHouse',
  components: {
    NavBarVue
   
  },
  methods:{
    close(tag){
         for(var i = 0; i < this.selectkeys.length; i++){
            if(this.selectkeys[i]==tag){
              this.$delete(this.selectkeys,i)
            }
    }
    },
     // 分页
      handleSizeChange(val) {
        this.pagesize = val
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.currentPage = val
        // console.log(`当前页: ${val}`);
      },

        getAllKb(){
            this.$axios.get('http://localhost:80/rooms/select/'+this.selectkey).then(res=>{
                this.roomlist=res.data.info;
                this.roomlist2=res.data.info;

			})
        },
        
        selectByAttr(value,attr){
             this.$set(this.selectkeys,attr.attrId,value.valueName)
             this.$set(this.postselectkeys,attr.attrId,value.id)
             console.log(this.selectkeys)
             console.log(JSON.stringify(this.postselectkeys))
             this.keys.keys=JSON.stringify(this.postselectkeys)

        //     this.keys.selectkeys=this.selectkeys
        //     console.log(this.keys.selectkeys)
       /* this.$axios.get('http://localhost:80/rooms/select',{params:{
          keys:JSON.stringify(this.postselectkeys)
        }}).then(res=>{
                this.roomlist=res.data.info;
                this.roomlist2=res.data.info;

			})*/

        },
        selectByAttrTh(name,value){
            this.$set(this.selectkeys,value.id,name)
             console.log(this.selectkeys)
//todo
        },
        toLanding(item,index){
            console.log(item.roomId);
            this.$router.push({
                path:"./RoomLanding",
                query:{id:item.roomId}
            });
        },
         handleClick(tab, event) {
        if(tab.index==1){
               
                this.roomlist=this.roomlist.sort(function (a, b) {
                return a.roomPrice - b.roomPrice;
                });
                
        }else if(tab.index==2){
                
                 this.roomlist=this.roomlist.sort(function (a, b) {
                 return a.roomArea - b.roomArea;
                });
        }else {

                this.roomlist=this.roomlist2;
        }
      }
  },
  mounted(){
            
            
			this.$axios.get('http://localhost:80/attr/show').then(res=>{

				
                this.attrs=res.data.info;
                console.log(this.attrs);
			}),
            this.$axios.get('http://localhost:80/rooms/getAll').then(res=>{

				
                this.roomlist=res.data.info;
                this.roomlist2=res.data.info;
                this.total = this.roomlist.length
                console.log(this.roomlist);
			})
            
            
		}
}
</script>
<style>
#col{
    display: flex;
    flex-direction: row;

}
.attr{
    display: flex;
  flex-direction: row;
line-height: 50px;
}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .attr::before,
.attr::after {
  content: "";
  width: 10px;
  height: 10px;
}

/* 只在 ::after 伪类元素添加间隔 */
.attr::after {
  margin-left: 10px;
}

/*只在 ::before 伪类元素添加间隔*/
.attr::before {
  margin-right: 30px;
}

div {
    display: flow-root;
    font-size: 20px;
    align-items:center;
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
 .image {    
  width: 100%;    
  display: block;  
  }
  #tabs{
    float: right ;
  }
 


</style>

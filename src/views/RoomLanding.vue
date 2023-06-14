<template>
  <div>
   <nav-bar-vue></nav-bar-vue>
    <div id="ca">
        <el-carousel :interval="5000" height="36rem" @change="changeImg" indicator-position="outside">
            <el-carousel-item v-for="(item,index) in images" :key="index">
            <el-image
                :class="className"
                style="width:100%; height:100%"
                :src="item"
                fit="fit"></el-image>
            </el-carousel-item>
        </el-carousel>

    </div>
    <div id="baseinfo">
        <h1>{{this.room.roomName}}</h1>
        <span class="price">{{this.room.roomPrice}}元/月</span>
        <span>{{this.room.roomArea}}平方米-----{{this.room.orientationName}}-----{{this.room.houseType}}</span>
        <ul class="box">
            <li>位置：{{this.room.roomLocation}}</li>
            <li>楼层：{{this.room.floor}}</li>
            <li>电梯：{{this.room.elevator}}</li>
            <li>年代：{{this.room.completion}}</li>
            <li>供暖：{{this.room.heatingType}}</li>
            <li>绿化：{{this.room.afforest}}</li>
           
        </ul>
          <div id="orderinfo">
       
    <el-card :body-style="{ padding: '0px' }" >
        <h3>联系中介</h3>
        <span>{{this.order.uname}}</span>
        <br>
      <img :src=this.order.upicture id="orderimg">
       
    </el-card>

    </div>
    </div>
    <div id="rentinfo">
         <h1>租约信息</h1>
        <ul class="box">
            <li>可入住日期：{{this.room.roomLocation}}</li>
            <li>签约时长：{{this.room.floor}}</li>
            <li><a href="https://special.ziroom.com/2018/tpl201810/index.html?id=2215">注意事项：租房合同签订步骤</a></li>
        </ul>
    </div>
   
  </div>

  
</template>

<script>
import NavBarVue from '../components/NavBar.vue'





export default {
  name: 'RoomLanding',
  components: {
    NavBarVue
 
  },mounted(){
            console.log(this.id)
            console.log(this.id)
            this.$axios.get('http://localhost:80/rooms/getImgs/'+this.id).then(res=>{
                this.images=res.data.info;
                console.log(this.images);
			})
           this.$axios.get('http://localhost:80/rooms/'+this.id).then(res=>{

                this.room=res.data.info;
                console.log(this.room);
			})
            this.$axios.get('http://localhost:80/rooms/getOrder/'+this.id).then(res=>{
                this.order=res.data.info;
                console.log(this.order);
			})
    this.className = "lun-img-two";
        setTimeout(() => {
            this.className = "lun-img";
        }, 300);

    },
    data(){
        return{
            images: [
              
            ],
            className: "",
            room:{},
            params:{
                id:this.id
            },
            id:this.$route.query.id
            ,currentDate: new Date()
            ,order:{

            },
            
        }
    },
    methods: {
        changeImg: function (e) {
            this.className = "lun-img-two";
            setTimeout(() => {
                this.className = "lun-img";
            }, 300);
        },
       
       
    }


}
</script>
<style scoped>
    .lun-img {
        transition: all 4s;
       
    }
    .lun-img-two {
        transform: scale(1);
    }
    .el-carousel__item.is-animating {
        transition: transform 1s ease-in-out;
    }
    #ca{  
    float: left;
    width: 60%;
    height: 300px;
    margin-right: 20px; /* 可选，用于设置div与其他元素之间的间距 */
   
    left: 80; /* 可选，用于设置div相对于其父级元素的位置 */
    top: 20; /* 可选，用于设置div相对于其父级元素的位置 */
    }
    .price {
  font-family: Arial, sans-serif; /* 设置字体 */
  color: orange; /* 设置字体颜色 */
  font-size: 18px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  text-decoration: underline; /* 设置下划线 */
}
#baseinfo{
    display: flex;
  flex-direction: column;
}
 .box
 {text-align:center;text-align:left}
 ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align:left
}

li {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
  
}
#rentinfo{
    width: 40%;
    margin-top: 80px;
    text-align: left;
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
  #orderinfo{
   width: 60%;
   height: 60px;
  }
  
  .el-card{
  margin: 10px;
  border-radius: 20px
  
}

.el-card:hover{
  margin-top: -10px;
  margin: 30px;
}

#orderimg{
    width: 100%;
    height: 100%;
    object-fit:cover;
}

</style>

<template>
    <div class="movie_body" ref="movie_body">
        <Loading v-if="isLoading"/>
        <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li>
                    <div class="pic_show"><img src="/images/movie_2.jpg"></div>
                    <div class="info_list">
                        <h2>毒液：致命守护者</h2>
                        <p>观众评 <span class="grade">9.3</span></p>
                        <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
                        <p>今天56家影院放映443场</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li> -->
                <li class="pullDown">{{ pullDownMsg }}</li>
                <li v-for="item in movieList" :key="item.id">
                    <div class="pic_show" @tap="handleToDetail"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info_list">
                        <h2>{{ item.nm }} <img src="@/assets/maxs.png" v-if="item.version.indexOf('v3d') != -1 || item.version.indexOf('v3d imax') != -1"> </h2>
                        <p>观众评 <span class="grade">{{ item.sc }}</span></p>
                        <p>主演: {{ item.star }}</p>
                        <p>{{ item.comingTitle }}</p> <!-- item.showInfo -->
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroller>
    </div>
</template>

<script>

// import BScroll from 'better-scroll'; //better-scroll 可以增加列表页面滑动的顺畅性，也可以添加tap事件

export default {
    name:'nowPlaying',
    data(){
        return {
            movieList : [],
            pullDownMsg : '',
            isLoading:true,
            prevCityId:-1
        }
    },
    methods : {
        handleToDetail(){
            console.log('handleToDetail')
        },
        handleToScroll(pos){
            if(pos.y > 30) {
                this.pullDownMsg = '正在更新中'
            }
        },
        handleToTouchEnd(pos){
            if(pos.y > 30) {
                this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                    var msg = res.data.msg;
                    if(msg === 'ok'){
                        this.pullDownMsg = '更新成功'
                        setTimeout(()=>{
                            this.movieList = res.data.data.movieList;
                            this.pullDownMsg = ''
                        },1000)
                    }
                })
            }
        }
    },
    activated(){
        var cityId = this.$store.state.city.id;
        if (this.prevCityId === cityId) { return ;}

        this.isLoading = true;
        this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.movieList = res.data.data.movieList;
                this.isLoading = false
                this.prevCityId = cityId;
                // // Vue提供，接口请求回数据之后，界面渲染完毕之后再会触发 nextTick 的回调
                // // this.$refs.movie_body可以用来获取DOM元素
                // // tap : true 开启tap事件
                // // probeType : 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
                // this.$nextTick(()=>{
                //     var scroll = new BScroll( this.$refs.movie_body,{
                //         tap:true,
                //         probeType:1
                //     }); 

                //     scroll.on('scroll',(pos)=>{
                //         if(pos.y > 30) {
                //             this.pullDownMsg = '正在更新中'
                //         }
                //     })
                //     scroll.on('touchEnd',(pos)=>{
                //         if(pos.y > 30) {
                //             this.axios.get('/api/movieOnInfoList?cityId=11').then((res)=>{
                //                 var msg = res.data.msg;
                //                 if(msg === 'ok'){
                //                     this.pullDownMsg = '更新成功'
                //                     setTimeout(()=>{
                //                         this.movieList = res.data.data.movieList;
                //                         this.pullDownMsg = ''
                //                     },1000)
                //                 }
                //             })
                //         }
                //     })
                // });
            }
        });
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body .pullDown {margin: 0;padding: 0;border:none}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>
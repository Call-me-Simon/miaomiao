<template>
    <div class="city_body">
        <!-- <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li>上海</li>
                </ul>
            </div>
            <div class="city_sort">
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>
                <div>
                    <h2>A</h2>
                    <ul>
                        <li>阿拉善盟</li>
                        <li>鞍山</li>
                        <li>安庆</li>
                        <li>安阳</li>
                    </ul>
                </div>
                <div>
                    <h2>B</h2>
                    <ul>
                        <li>北京</li>
                        <li>保定</li>
                        <li>蚌埠</li>
                        <li>包头</li>
                    </ul>
                </div>	
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li>A</li>
            </ul>
        </div> -->
        <div class="city_list">
            <Loading v-if="isLoading" />
            <Scroller v-else ref="city_List"> <!-- Scroller 内部下一层级只能是一个层级，多层级会有问题  -->
                <div>
                    <div class="city_hot">
                            <h2>热门城市</h2>
                            <ul class="clearfix">
                                <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{ item.nm }}</li>
                            </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.index">
                            <h2>{{ item.index }}</h2>
                            <ul>
                                <li v-for="city in item.list" :key="city.id" @tap="handleToCity(city.nm,city.id)">{{ city.nm }}</li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </Scroller>
        </div>  
        <div class="city_index">
            <ul>
                <li v-for="(item,selectIndex) in cityList" :key="item.index" @touchstart='handleToIndex(selectIndex)'>{{ item.index }}</li>
            </ul>
        </div>    
    </div>
</template>

<script>
export default {
    name:"city",
    data (){
        return {
            cityList : [],
            hotList : [],
            isLoading:true
        }
    },
    mounted (){

        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else {
            this.axios.get('/api/cityList').then((res)=>{
                var msg = res.data.msg;
                this.isLoading = false;
                if(msg === 'ok') {
                    var cities = res.data.data.cities;
                    var {cityList,hotList} = this.formatCityList(cities); 
                    this.cityList = cityList;
                    this.hotList = hotList;

                    // 本地存储不经常变化的数据，减轻页面加载压力
                    // 本地数据存储时只能存入字符串，JSON.stringify就是将数组转成字符串
                    window.localStorage.setItem('cityList',JSON.stringify(cityList));
                    window.localStorage.setItem('hotList',JSON.stringify(hotList));
                }
            });
        }
    },
    methods:{
        formatCityList(cities){
            var cityList = [];
            var hotList = [];

            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();

                if(cities[i].isHot === 1) {
                    hotList.push(cities[i]);
                }

                if(toCom(firstLetter)) {//新添加索引
                    cityList.push({index:firstLetter,list:[cities[i]]})
                }else{//累加到已有索引
                    for(var j=0;j<cityList.length;j++) {
                        if(cityList[j].index === firstLetter){
                            cityList[j].list.push(cities[i]);
                        }
                    }
                }
            }
            cityList.sort((n1,n2)=>{
                if(n1.index < n2.index) {
                    return -1;
                }
                else if(n1.index > n2.index) {
                    return 1;
                }
                else {
                    return 0;
                }
            });

            function toCom(firstLetter) {//判断是不是第一次添加
                for(var i=0;i<cityList.length;i++) {
                    if(cityList[i].index === firstLetter) {
                        return false;
                    }
                }
                return true;
            }
            return {
                cityList,
                hotList
            }
        },
        handleToIndex(selectIndex){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[selectIndex].offsetTop;
            this.$refs.city_List.toScrollTop(-h2[selectIndex].offsetTop)
        },
        handleToCity(nm,id){
            console.log("***nm***"+nm+"---id---"+id)
            this.$store.commit('city/CITY_INFO',{nm,id}) //提交状态管理，将更换过的nm id切换为最新的
            window.localStorage.setItem('nowNM',nm)
            window.localStorage.setItem('nowID',id)
            this.$router.push('movie/nowPlaying')
        }
    }
}
</script>

<style >
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
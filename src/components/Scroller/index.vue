<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script> 
import BScroll from 'better-scroll'; //better-scroll 可以增加列表页面滑动的顺畅性，也可以添加tap事件

export default {
    name:'Scroller',
    props : {
        handleToScroll : {
            type: Function,
            default : function(){}
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var scroll = new BScroll( this.$refs.wrapper,{
            tap:true,
            probeType:1 
        }); 

        this.scroll = scroll

        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
        }); 

        scroll.on('scroll',(pos)=>{
            this.handleToTouchEnd(pos)
        });
    },
    methods:{
        toScrollTop(y){
            this.scroll.scrollTo(0,y)
        }
    }
}
</script>

<style scoped>
    .wrapper {height: 100%;}
</style>
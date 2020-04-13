<template>
    <div class="messageBox">
        <h2>定位</h2>
        <p>北京</p>
        <div>
            <div>取消</div>
            <div>切换定位</div>
        </div>
    </div>
</template>>

<script>
export default {
    name:'MessageBox'
}
</script>

<style scoped>
    .messageBox { width: 200px;height: 120px; border: 1px #ccc solid; border-radius: 4px;background-color: white;box-shadow: 3px 3px 3px #888888; position: absolute; left: 50%; top: 50%; margin: -60px 0 0 -100px;}
    .messageBox h2 { text-align: center; font-size: 18px; line-height: 40px;}
    .messageBox p { text-align: center; font-size: 18px; line-height: 40px; }
    .messageBox > div { display: flex; position: absolute; bottom: 0px; width: 100%; border-top: 1px #ccc solid; }
    .messageBox > div div { flex: 1; border-right: 1px #ccc solid; text-align: center; line-height: 30px; }
    .messageBox > div div:last-child {border-right: none;}
</style> 
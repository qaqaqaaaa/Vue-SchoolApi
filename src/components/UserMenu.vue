<template>
    <Menu :active-name="$route.path" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem to='/' name='/'>
              <Icon type="ios-navigate"></Icon>
              <span>学生信息</span>
        </MenuItem>
        <MenuItem name="/score" to='/score'>
              <Icon type="ios-navigate"></Icon>
              <span>学生成绩</span>
        </MenuItem>
        <MenuItem name="/class" to='/class'>
              <Icon type="ios-navigate"></Icon>
              <span>学生课表</span>
        </MenuItem>
            <MenuItem name="/exam" to='/exam'>
              <Icon type="ios-navigate"></Icon>
              <span>考试安排</span>
        </MenuItem>
        <Submenu name="OtherFunction">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
                其他功能
            </template>
            <Menu-item name="/other_info" to='/other_info'>查询学生信息</Menu-item>
            <Menu-item name="/other_score" to='/other_score'>查询学生成绩</Menu-item>
            <Menu-item name="/other_class" to='/other_class'>查询学生课表</Menu-item>
            <Menu-item name="/other_exam" to='/other_exam'>查询考试安排</Menu-item>
        </Submenu>
        
      </Menu>
</template>

<script>
export default {
       computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
}
</script>

<style scoped>
  .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

</style>
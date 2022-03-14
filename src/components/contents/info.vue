<template>
<Layout>
<!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
<Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>学生信息</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div style="height: 600px">
            <table>
            <tr>
                 <td>学号:</td>
                <td>{{stuinfo.id}}</td>
            </tr>
            <tr>
                 <td>姓名:</td>
                <td>{{stuinfo.name}}</td>
            </tr>
            <tr>
                 <td>年级:</td>
                <td>{{stuinfo.grade}}</td>
            </tr>
            <tr>
                 <td>学院:</td>
                <td>{{stuinfo.college}}</td>
            </tr>
            <tr>
                 <td>班级:</td>
                <td>{{stuinfo.class}}</td>
            </tr>
            <tr>
                 <td>学制:</td>
                <td>{{stuinfo.schoolSystem}}</td>
            </tr>
                <tr>
                 <td>性别:</td>
                <td>{{stuinfo.sex}}</td>
            </tr>
            <tr>
                 <td>QQ:</td>
                <td>{{stuinfo.qq}}</td>
            </tr>
                        <tr>
                 <td>专业:</td>
                <td>{{stuinfo.major}}</td>
            </tr>

           

        </table>
        </div>
    </Card>
</Content>
</Layout>
</template>

<script>
export default {
    mounted() {
    this.reload();
    },

    data() {
        return {
            stuinfo:{
                id:'',
                name:'',
                grade:-1,
                college:'',
                class:'',
                schoolSystem:'',
                sex:'',
                qq:'',
                major:''
            }
        }
    },
    methods: {
        reload(){

    // axios.get(`https://api.github.com/search/users?q=${this.KeyWord}`).then(
    //         response => {
    //         // console.log('请求成功了',response.data);
    //         this.$bus.$emit('g etUsers',response.data.items);
    //         },
    //         error => {
    //         console.log('请求失败了',error.messsage);
    //         })
            var id = sessionStorage.getItem('id');
            var info=JSON.parse(sessionStorage.getItem('info'));
            if(sessionStorage.getItem('info')){
                    this.stuinfo.id=info.xh
                    this.stuinfo.name=info.xm
                    this.stuinfo.grade=info.dqszj
                    this.stuinfo.college=info.yxmc
                    this.stuinfo.class=info.bj
                    this.stuinfo.schoolSystem=info.xz
                    this.stuinfo.sex=info.xb
                    this.stuinfo.qq=info.qq
                    this.stuinfo.major=info.zymc
            }else{
            this.$axios.get(`/app.do?method=getUserInfo&xh=${id}`).then(response => {
            if (response.data) {
                    sessionStorage.setItem('info',JSON.stringify(response.data));
                    // console.log('请求成功了',response.data);
                    // console.log(this);
                    this.stuinfo.id=response.data.xh
                    this.stuinfo.name=response.data.xm
                    this.stuinfo.grade=response.data.dqszj
                    this.stuinfo.college=response.data.yxmc
                    this.stuinfo.class=response.data.bj
                    this.stuinfo.schoolSystem=response.data.xz
                    this.stuinfo.sex=response.data.xb
                    this.stuinfo.qq=response.data.qq
                    this.stuinfo.major=response.data.zymc
         
            }
            }).catch(err => {
                alert('请求失败')
                })
            }


        }
        
    },


}
</script>

<style>

</style>
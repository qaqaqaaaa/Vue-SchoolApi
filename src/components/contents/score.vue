<template>
<Layout>
<!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
<Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>学生成绩</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div style="height: 600px">
        学年学期：<Select v-model="nj" style="width:200px">
        <Option v-for="item in njList" :value="item.value" :key="item.label">{{ item.label }}</Option>
            </Select> <Button type="primary" @click="handleClick">查询</Button>
            <br/><br/>
            <Table :columns="columns1" :data="cj"></Table>
        </div>
    </Card>
</Content>
</Layout>
</template>

<script>
export default {
    data () {
    return {
        columns1: [
            {
                title: 'xm',
                key: 'xm'
            },
            {
                title: 'xqmc',
                key: 'xqmc'
            },
            {
                title: 'kcxzmc',
                key: 'kcxzmc'
            },
            {
                title: 'ksxzmc',
                key: 'ksxzmc'
            },
            {
                title: 'kcmc',
                key: 'kcmc'
            },
            {
                title: 'xf',
                key: 'xf'
            },
            {
                title: 'zcj',
                key: 'zcj'
            },
            {
                title: 'kclbmc',
                key: 'kclbmc'
            }
        ],
        cj: [],
        njList: [
        ],
        nj: ''
        }
    },
    created() {
        this.processNjlist();
    },

    methods: {
           async reload(){
    // axios.get(`https://api.github.com/search/users?q=${this.KeyWord}`).then(
    //         response => {
    //         // console.log('请求成功了',response.data);
    //         this.$bus.$emit('g etUsers',response.data.items);
    //         },
    //         error => {
    //         console.log('请求失败了',error.messsage);
    //         })
            var cj= JSON.parse(sessionStorage.getItem('cj'+this.nj));
            // token =-1  null
            if(!cj){
               await this.GetScore();
            }else if(cj.length==1){
              await  this.GetScore();
            }else{
                this.cj=cj;
            }
        },

        async GetScore(){
             var id = sessionStorage.getItem('id');
             // 'http://jwgl.cqjtu.edu.cn:80/app.do?method=getCjcx&xh=xxxxxx&xnxqid=xxxxxxxxx
            await this.$axios.get(`/app.do?method=getCjcx&xh=${id}&xnxqid=${this.nj}`).then(response => {
            if (response.data) {
                    sessionStorage.setItem('cj'+this.nj,JSON.stringify(response.data))
                    // console.log('请求成功了',response.data);
                    // console.log(this);
                    this.cj=JSON.parse(sessionStorage.getItem('cj'+this.nj));
            }
            }).catch(err => {
                this.cj=[];
                // alert('请求失败');
                })
        },


        handleClick(){
            // console.log(this.nj);
            this.reload();

        },
          
        processNjlist(){
        //   631803090101
        //   2018-2019-1
            var id=sessionStorage.getItem('id');
            var startY=parseInt(id.slice(2,4));
            var a=1;
            for(let v=0;v<8;v++){
        //             {
        //     value: 'chongqing',
        //     label: '重庆市'
        // }
            //   console.log('20'+startY+'-'+'20'+(startY+1)+'-'+a)
            this.njList.push({
                value:'20'+startY+'-'+'20'+(startY+1)+'-'+a,
                label:'20'+startY+'-'+'20'+(startY+1)+'-'+a})
                a++;
                if(v%2!=0){
                    startY++;
                    a=1;
                }
            }


        }

        
    },
    
    
    
    



}

</script>

<style>

</style>
<template>
<Layout>
<!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
<Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>学生课表</BreadcrumbItem>
    </Breadcrumb>
    <Card>
    <div style="height: 600px">
        学年学期：<Select v-model="nj" style="width:200px">
        <Option v-for="item in njList" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select> 
        周次：<Select v-model="zc" style="width:200px">
        <Option v-for="item in zcList" :value="item.value" :key="item.label">{{ item.label }}</Option>
        </Select> <Button type="primary" @click="handleClick">查询</Button>
            <br/><br/>
        <div class="class-table">
            <div class="table-wrapper">
                <div class="tabel-container">
                    <table>
                        <thead>
                            <tr>
                                <th>时间</th>
                                <th v-for="(weekNum, weekIndex) in weeks" :key="weekIndex"> {{'周' + digital2Chinese(weekNum, 'week')}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(courseNum, courseIndex) in coursesLen" :key="courseIndex">

                                <td>
                                    <p>{{'第' + digital2Chinese(courseNum) + "节"}}</p>
                                    <p class="period">{{ classTableData.period[courseIndex] }}</p>
                                </td>

                                <td v-for="(weekNum, weekIndex) in weeks" :key="weekIndex" v-html="fieldCharacter(weekIndex, courseIndex)">
                                    <!-- {{ fieldCharacter(weekIndex, courseIndex) }} -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                            
                 
                 
    </div> 
    </Card>
</Content>
</Layout>
</template>


<script>
export default {
    data() {
        return {
            weeks: [], //周集合
            coursesLen: 0, //最大课节数
            weekclass:[],
                classTableData: { //mock模拟的数据
                period: ['08:20-10:00', '10:20-12:00', '14:00-15:40', '16:00-17:40', '19:00-20:40', '21:00-22:40'], //时间段
                weekCourse: [
                      {
                        'week': 0,
                        'courses': []
                    },
                    {
                        'week': 1,
                        'courses': []
                    },
                    {
                        'week': 2,
                        'courses': []
                    },
                    {
                        'week': 3,
                        'courses': []
                    },
                    {
                        'week': 4,
                        'courses': []
                    },
                    {
                        'week': 5,
                        'courses': []
                    },   
                        {
                        'week': 6,
                        'courses': []   
                    },   
                ]
            },
            njList: [
            ],
            nj: '',
            zcList: [
            ],
            zc: '',
        }
    },
    created() {
        // this.reload();?
        this.processZclist();
        this.processNjlist();
        this.processsWeekClass();
        this.updateData();
        this.initWeekCourses();
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
            var classes= JSON.parse(sessionStorage.getItem('classes'+this.nj+this.zc));
            // token =-1  null
            // console.log(classes)
            if(!classes){
            await  this.GetClasses();
            this.weekclass=JSON.parse(sessionStorage.getItem('classes'+this.nj+this.zc));
            }else if(classes.length==1){
            await  this.GetClasses();
                this.weekclass=JSON.parse(sessionStorage.getItem('classes'+this.nj+this.zc));
            }else{
                this.weekclass=classes;
            }

            console.log(this.weekclass);
            this.processsWeekClass();
            this.updateData();
            this.initWeekCourses();
            // console.log(1111);
        },

        async GetClasses(){
            var id = sessionStorage.getItem('id');
             //    'http://jwgl.cqjtu.edu.cn:80/app.do?method=getKbcxAzc&xh=xxxx&xnxqid=xxxxx&zc=x
            await this.$axios.get(`/app.do?method=getKbcxAzc&xh=${id}&xnxqid=${this.nj}&zc=${this.zc}`).then(response => {
            if (response.data) {
                    sessionStorage.setItem('classes'+this.nj+this.zc,JSON.stringify(response.data))
                    // console.log('请求成功了',response.data);
                    // console.log(this);
            }
            }).catch(err => {
                this.weekclass=[];
                // alert('请求失败');
                })
        },


        handleClick(){
            console.log(this.nj,this.zc);
            this.reload();
        },

         processZclist(){
              for(let v=1;v<=20;v++){
                this.zcList.push({value:''+v,label:''+v})
              }
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
        },

        processsWeekClass(){
            for(let  j of this.classTableData.weekCourse){
                j.courses=[];
                // console.log(j);
            }
            for (let i of this.weekclass){
                for(let  j of this.classTableData.weekCourse){
                    if (j.week==parseInt(i.kcsj[0]) | (j.week==0 && parseInt(i.kcsj[0])==7)){
                            // console.log({ 'index':  this.timeToIndex(i.kssj), 'title': i.kcmc });
                            j.courses.push({ 'index':  this.timeToIndex(i.kssj), 'title': i.kcmc +"<br/>"+i.jsmc+"<br/>"+i.jsxm});
                    }
                }
            }
            // console.log(this.classTableData.weekCourse.length);
        },

        timeToIndex(time){
            // jssj 10:00
            var text=0
           switch (time) {
            case "08:20":
                text = 1;
                break; 
            case "10:20":
                text = 2;
                break; 
            case "14:00": 
                text = 3;
                break; 
            case "16:00": 
                text = 4;
                break; 
            case "19:00": 
                text = 5;
                break; 
            }
            return text;
        },




        // },
        /**
         * 更新mock模拟的数据，对数据进行排序
         */
        updateData() {

            /* 将数据按从周日到周六排序 */
            this.classTableData.weekCourse.sort((a, b) => {
                return a.week - b.week;
            });

            /* 将数据按从第一节到第n节排序 */
            for (let v of this.classTableData.weekCourse) {
                for (let k in v) {
                    if (k === 'courses') {
                        v[k].sort((a, b) => {
                            return a.index - b.index;
                        });
                    }
                }
            }

            // console.log(JSON.stringify(this.classTableData.weekCourse));
        },
        /**
         * 计算周数据及课节数
         */
        initWeekCourses() {
            const that = this;
            this.weeks = []; //周集合
            this.coursesLen = 0; //最大的课节数

            this.weeks = this.classTableData.weekCourse.map((item, index) => {
                for (let k in item) {
                    if (k === 'courses') {
                        let maxCoursesLen = 0;
                        /* 取出一周中最大的课节数及当天的最大课节数 */
                        for (let j of item[k]) {
                            j.index > that.coursesLen && (that.coursesLen = j.index); //取所有一周里最大课节值
                            j.index > maxCoursesLen && (maxCoursesLen = j.index); //取当天最大课节值
                        }


                        /* 如果当天的课节总数小于当天的最大课节值 */
                        if (item[k].length < maxCoursesLen) {
                            for (let i = 0; i < maxCoursesLen; i++) { //以最大课节值为终点遍历当天课节
                                if (!item[k][i] || item[k][i].index != (i + 1)) { //如果下标课节不存在或着与循环的下标不匹配
                                    item[k].splice(i, 0, ''); //填充空课节
                                }
                            }
                        }
                    }
                }
                return item.week;
            });

            // console.log(JSON.stringify(this.classTableData.weekCourse));




        },
        /**
         * 处理格子数据，无数据转换为字符串'-'
         * @param {Number} weekIndex 周几对应的下标
         * @param {Number} courseNum 第几节课对应的下标
         * @returns {String} 返回对应的字符
         */
        fieldCharacter(weekIndex, courseIndex) {
            if (
                this.classTableData.weekCourse[weekIndex]
                &&
                this.classTableData.weekCourse[weekIndex].courses[courseIndex]
                &&
                this.classTableData.weekCourse[weekIndex].courses[courseIndex].index === courseIndex + 1
            ) {
                return this.classTableData.weekCourse[weekIndex].courses[courseIndex].title;
            }
            return '-';
        },


        /**
        * 数字转中文
        * @param {Number} num 需要转换的数字
        * @param {Boolean} identifier 标识符
        * @returns {String} 转换后的中文
        */
        digital2Chinese(num, identifier) {
            const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
        },
    }
};
</script>




<style lang="scss" scoped>
.class-table {
    .table-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .tabel-container {
        margin: 7px;

        table {
            table-layout: fixed;
            width: 100%;

            thead {
                background-color: #67a1ff;
                th {
                    color: #fff;
                    line-height: 17px;
                    font-weight: normal;
                }
            }
            tbody {
                background-color: #eaf2ff;
                td {
                    color: #677998;
                    line-height: 12px;
                }
            }
            th,
            td {
                width: 60px;
                padding: 12px 2px;
                font-size: 12px;
                text-align: center;
            }

            tr td:first-child {
                color: #333;
                .period {
                    font-size: 8px;
                }
            }
        }
    }
}
</style>
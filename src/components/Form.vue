<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline"  class="login-form">
        <Form-item prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
    </Form>
</template>
<script>
    export default {
      

        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this);
                        // axios.get(`https://api.github.com/search/users?q=${this.KeyWord}`).then(
                        //     response => {
                        //       // console.log('请求成功了',response.data);
                        //       this.$bus.$emit('g etUsers',response.data.items);
                        //     },
                        //     error => {
                        //       console.log('请求失败了',error.messsage);
                        //     })

                        http://jwgl.cqjtu.edu.cn:80/app.do?method=authUser&xh=631803090101&pwd=Cdhs123456!
                        // this.$axios.get({
                        //             url: "/app.do",
                        //             method: "get",
                        //             crossdomain: true,
                        //             params: {
                        //               method: 'authUser',
                        //               xh:this.formInline.user,
                        //               pwd:this.formInline.password
                        //             }
                        //           }).then(res => {
                        //             console.log(res.data);
                        //           });
                        // this.$axios.get('http://www.baidu.com').then(
                        //    response => {
                        //       console.log('请求成功了',response.data);
                        //       sessionStorage.setItem('token',JSON.stringify(response.data.token))
                        //     },
                        //     error => {
                        //       console.log('请求失败了',error.messsage);
                        //     })
                           var id=this.formInline.user;
                           this.$axios.get(`/app.do?method=authUser&xh=${this.formInline.user}&pwd=${this.formInline.password}`).then(response => {
                             if (response.data) {
                                    // console.log('请求成功了',response.data);
                                    if(response.data.token!="-1"){
                                        this.$Message.success(response.data.msg);
                                        sessionStorage.setItem('token',response.data.token)
                                        sessionStorage.setItem('userrealname',response.data.userrealname)
                                        sessionStorage.setItem('id',id)
                                        setTimeout(() => {
                                            window.location.href="user.html";
                                        }, 2);
                                        
                                    }else{
                                        this.$Message.error(response.data.msg);
                                    }
                                
                              }
                          }).catch(err => {
                              alert('请求失败')
                          })

                        // this.$axios.get(`http://jwgl.cqjtu.edu.cn:80/app.do?method=authUser&xh=${this.formInline.user}&pwd=${this.formInline.password}`).then(
                        //     response => {
                        //       console.log('请求成功了',response.data);
                        //       sessionStorage.setItem('token',JSON.stringify(response.data.token))
                        //     },
                        //     error => {
                        //       console.log('请求失败了',error.messsage);
                        //     })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>


<style scoped>
.login-form {
  width: 400px;
  margin: 160px auto; /* 上下间距160px，左右自动居中*/
  background-color: #f5f7f9; /* 透明背景色 */
  padding: 30px;
  border-radius: 20px; /* 圆角 */
}
</style>
<template>
    <el-row class="panel" type="flex">
        <el-col :span="24" class="panel-top">
            <el-col :span="22" style="font-size:26px;">
                <img src="../assets/logo5.png" class="logo" />
                <span>VUE<i style="color:#20a0ff">MGT</i></span>
            </el-col>
            <el-col :span="2" class="panel-top">
                <el-popover class="tip-logout" ref="userInfo" placement="left" title="用户信息" width="200" trigger="click">
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">用户名</el-col>
                        <el-col :span="15">{{ user.username }}</el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">手机号</el-col>
                        <el-col :span="15">{{ user.mobile }}</el-col>
                    </el-row>
                    <el-row style="margin-top: 10px">
                        <el-col :span="8">注册时间</el-col>
                        <el-col :span="15">{{ user.createTime }}</el-col>
                    </el-row>
                </el-popover>

                <el-tooltip class="tip-logout" effect="dark" content="用户信息" placement="bottom">
                    <span v-popover:userInfo><i class="fa fa-user" aria-hidden="true"/></span>
                </el-tooltip>

                <el-tooltip class="tip-logout" effect="dark" content="退出" placement="bottom">
                    <i class="fa fa-sign-out" aria-hidden="true" @click="logout"/>
                </el-tooltip>
            </el-col>
        </el-col>
        <el-col :span="24" class="panel-center">
            <aside style="width: 230px;">
                <h5 class="admin">
                    <i class="fa fa-user" aria-hidden="true" style="margin-right:5px;"></i>欢迎系统管理员：{{ user.username }}
                </h5>
                <el-menu style="border-top: 1px solid #475669;" default-active="/main" theme="dark" unique-opened router>
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title"><i :class="item.iconCls"></i>{{ item.name }}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path">
                                <i :class="child.iconCls"></i>{{ child.name }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path">
                            <i :class="item.iconCls"></i>{{ item.children[0].name }}
                        </el-menu-item>
                    </template>
                </el-menu>
            </aside>
            <section class="panel-c-c">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" style="margin-bottom:15px;">
                        <strong style="width:200px;float:left;color: #475669;">{{ currentPathName }}</strong>
                            <el-breadcrumb separator="/" style="float:right;">
                                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                                <el-breadcrumb-item v-if="currentPathNameParent!='' && $route.fullPath!='/main'">{{ currentPathNameParent }}</el-breadcrumb-item>
                                <el-breadcrumb-item v-if="currentPathName!='' && $route.fullPath!='/main'">{{ currentPathName }}</el-breadcrumb-item>
                            </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" style="box-sizing: border-box;">
                        <router-view></router-view>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>
<script>
    import util from '../common/util'

    export default {
        data() {
            return {
                currentPathName: this.$route.name,
                currentPathNameParent: this.$route.matched[0].name,
                user: {
                    username: '',
                    mobile: '',
                    createTime: ''
                }
            }
        },
        watch: {
            '$route' (to, from) { //监听路由改变
                this.currentPathName = to.name;
                this.currentPathNameParent = to.matched[0].name;
            }
        },
        mounted() {
            var _this = this;
			util.get("/home/user", null, result => {
                if (result.errCode == 0) {
                    _this.user = result.data;
                } else {
                    _this.$message.error(result.msg);
                }
            });
        },
        methods: {
            //退出登录
            logout() {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {}).then(() => {
                    util.post('/user/logout', null, result => {
                        window.location.href = './login.html';
                    })
                }).catch(() => {});
            }
        }
    }
</script>
<style scoped>
    .panel {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }
    
    .panel-top {
        height: 60px;
        line-height: 60px;
        background: #475680;
        color: #c0ccda;
    }
    
    .panel-center {
        background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
    }
    
    .panel-c-c {
        background: #f1f2f7;
        position: absolute;
        right: 0px;
        top: 0px;
        bottom: 0px;
        left: 230px;
        overflow-y: scroll;
        padding: 20px;
    }
    
    .logo {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
    }
    
    .tip-logout {
        margin-right: 20px;
        padding-top: 5px;
        cursor: pointer;
    }
    
    .admin {
        color: #c0ccda;
        text-align: center;
    }
</style>
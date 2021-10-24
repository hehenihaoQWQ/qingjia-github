<template>
    <div>
        <div class="layui-card-header header">
            <h2 style="text-align: center">易请销假</h2>
        </div>  
        <div>
            <!-- 表单 -->
            <form class="layui-form layui-form-pane apply">
                <!-- 步骤条 -->
                <div id="step">
                    <div>
                        <div class="step-icon"><i class="layui-icon layui-icon-ok-circle"></i></div>
                        <div class="step-icon"><i class="layui-icon layui-icon-ok-circle"></i></div>
                        <div class="step-icon"><i class="layui-icon layui-icon-circle-dot"></i></div>
                        <div class="step-icon"><i class="layui-icon layui-icon-circle-dot"></i></div>
                    </div>
                    <div class="layui-progress">
                        <div class="layui-progress-bar layui-bg-blue" lay-percent="100%" style="width: 100%;"></div>
                    </div>
                    <div class="layui-row" style="text-align: center">
                        <span class="layui-col-xs3">已申请</span>
                        <span class="layui-col-xs3">已审核</span>
                        <span class="layui-col-xs3">待销假</span>
                        <span class="layui-col-xs3">已销假</span>
                    </div>
                </div>

                <div class="layui-form-item">
                    <label class="layui-form-label">学号</label>
                    <div class="layui-input-block">
                        <input type="text" name="studentId" class="layui-input" :value="usrData.id" readonly="">
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">姓名</label>
                    <div class="layui-input-block">
                        <input type="text" name="outRoute" class="layui-input" :value="usrData.name" readonly="">
                    </div>
                </div>
                <!-- 学院 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">学院</label>
                    <div class="layui-input-block">
                        <input type="text" name="collegeName" class="layui-input" :value="usrData.clg" readonly="">
                    </div>
                </div>
                <!-- 专业班级 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">专业班级</label>
                    <div class="layui-input-block">
                        <input type="text" name="className" class="layui-input" :value="usrData.mjcls" readonly="">
                    </div>
                </div>
                <!-- 导员 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">辅导员</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.tcr" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 请假类型 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">请假类型</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.type" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 是否离校 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">是否离校</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.leaveS" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 是否离开保定市区 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">是否离开保定市区</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.leaveB" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 出行方式 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">出行方式</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.way" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 出行路线 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">出行路线</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.route" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 请假详情 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">请假详情</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.rsn" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 开始时间 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">开始时间</label>
                    <div class="layui-input-block">
                        <input type="text" :value="timeObj.begin" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 结束时间 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">结束时间</label>
                    <div class="layui-input-block">
                        <input type="text" name="endTime" :value="timeObj.end" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 本人电话 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">本人电话</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.stel" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 家长电话 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">家长电话</label>
                    <div class="layui-input-block">
                        <input type="text" :value="usrData.ptel" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 申请时间 -->
                <div class="layui-form-item">
                    <label class="layui-form-label">申请时间</label>
                    <div class="layui-input-block">
                        <input type="text" :value="timeObj.apply" class="layui-input" readonly="">
                    </div>
                </div>
                <!-- 销假位置 -->
                
                <!-- 防伪二维码 -->
                <div class="layui-form-item" style="text-align: center;" readonly="">
                    <p class="layui-text">（防伪标识二维码）</p>
                    <div id="qrcode"></div>
                </div>
                
                <!-- 戳儿 -->
                <div class="img-state">
                    <img src="../../assets/resources/pizhun.png">
                </div>
            </form>
        </div>
    </div>
</template>

<style>

#qrcode {
  display:inline-block;
  position:relative;margin-top: .2rem;
}

</style>
<script>

//layui
import '../../assets/layui/css/layui.css'
import '../../assets/layui/css/modules/laydate/default/laydate.css'
import '../../assets/resources/code.css'
import '../../assets/resources/style.css'
//qrcode
import QRCode from 'qrcodejs2'

import axios from 'axios'
import common from '../../Common.vue'

export default {
    name: 'Profile',
    created() {
        this.getUsrDataMysql(this.usrData, this.timeObj);
        this.checkStatus();
    },
    mounted() {
        //console.log(common.host);
        this.generateQrcode('http://' + common.host + ':' + common.port + '/profile?id=' + this.$route.query.id);
    },
    data() {
        return {
            usrData: {
                name: this.$route.query.name,
                id: this.$route.query.id,
                clg: this.$route.query.clg,
                mjcls: this.$route.query.mjcls,
                tcr: this.$route.query.tcr,
                type: this.$route.query.type,
                leaveS: this.$route.query.leaveS,
                leaveB: this.$route.query.leaveB,
                way: this.$route.query.way,
                route: this.$route.query.route,
                rsn: this.$route.query.rsn,
                day: this.$route.query.day,
                stel: this.$route.query.stel,
                ptel: this.$route.query.ptel
            },
            timeObj: {
                begin: "", end: "", apply: ""
            }
        }
    },
    methods: {
        generateQrcode: function(txt){
            new QRCode(document.getElementById("qrcode"), {
            text: txt,
            width: 128,
            height: 128,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
        },
        getUsrDataMysql: function(data, time) {
            var that = this
            axios.get(common.apiUrl + '/api/getUsrDataMysql', {
                params: {
                id: this.usrData.id
                }
            })
            .then(function (response) {
                console.log(response.data.message);
                var dataT = response.data.message[0];
                data.name = dataT.name;
                data.clg = dataT.clg;
                data.mjcls = dataT.mjcls;
                data.tcr = dataT.tcr;
                data.type = dataT.type;
                data.leaveS = dataT.leaveS ? "是" : "否";
                data.leaveB = dataT.leaveB ? "是" : "否";
                data.way = dataT.way;
                data.route = dataT.route;
                data.rsn = dataT.rsn;
                data.stel = dataT.stel;
                data.ptel = dataT.ptel;

                time.begin = dataT.begin;
                time.end = dataT.end;
                time.apply = dataT.apply;

                var endDate = new Date(that.timeObj.end);
                var now = new Date();
                if (endDate.getTime() - now.getTime() < 0) that.$toast.warn('假条已过期');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        checkStatus: function () {
            var that = this;
            axios.get(common.apiUrl + '/api/getStatus', {
                params: {}
            })
            .then(function (res) {
                if (res.data.status == 1)
                {
                    that.$router.push({
                        path: '/404',
                        query: {}
                    });
                } 
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    }
}
</script>
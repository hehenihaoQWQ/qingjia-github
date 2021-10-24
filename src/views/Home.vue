<template>
    <div id="app">
        <div>
            <nut-navbar style="
          background-color: #87c0d9;
          color: #fff;
          height: 60px;
          line-height: 60px;
        " :leftShow="false"
          :rightShow="false">易请销假</nut-navbar>
        </div>

        <div :style="'margin: 3%;' + displayStyle">
          <nut-searchbar
            v-model="searchStr"
            placeText="请输入学号或姓名..."
          ></nut-searchbar>
        </div>
        
        <div class="stu-list">
            <div style="width: 100%;">
                <nut-leftslip v-for="stu in stuList" :key="stu.id" style="height: 75px; width: 100%">
                    <div slot="slip-main" class="slip-main" style="display: inline-block; width: 100%" @click="showQr(stu.id)">
                        <p style="left: 1rem">{{ stu.name }}</p>
                        <p style="color: #c2c2c2; left: 1rem">{{ stu.id }}</p>
                    </div>
                    <div slot="slipbtns" class="slipbtns">
                        <a href="javascript:;" style="background-color: #f1a9a9; width: 75px;" @click="delUsrDataMysql(stu.id)">删除</a>
                        <a href="javascript:;" style="background-color: #cd98b0; width: 75px;" @click="showEdit(stu.id, editData)">编辑</a>
                        <a href="javascript:;" style="background-color: #af9bb7; width: 75px;" @click="showAddDate(stu.id)">续期</a>
                    </div>
                </nut-leftslip>
            </div>
            
        </div>

        <div class="create">
            <img src="../assets/create.png" alt="create" height="64px" width="64px" @click="createNew" :style="displayStyle"/>
        </div>
        
        <nut-popup v-model="isShow" style="height: 70%; width: 80%; padding: 2%">
            <div style="text-align: center; margin: 3%;">录入信息</div>
            <div id="create-form">
                <div style="-webkit-app-region: drag;">
                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>姓名</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" placeholder="君の名は" :clearBtn="false" v-model="usrData.name" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col :span="6">
                            <p>学号</p>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="15" placeholder="2011123456189" :clearBtn="false" v-model="usrData.id" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col :span="6">
                            <p>学院</p>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="15" placeholder="霍格沃茨魔法学院" :clearBtn="false" v-model="usrData.clg" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col :span="6">
                            <p>专业班级</p>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" placeholder="魔药学1101" :clearBtn="false" v-model="usrData.mjcls" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>辅导员</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" placeholder="辅导员" :clearBtn="false" v-model="usrData.tcr" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>请假类型</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" placeholder="事假/普通疾病/传染性疾病" :clearBtn="false" v-model="usrData.type" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>是否离校</span>
                        </nut-col>
                        <nut-col :span="18" style="text-align: left;">
                            <!-- <nut-textinput placeholder="是" :clearBtn="false" v-model="usrData.leaveS" /> -->
                            <nut-radiogroup v-model="usrData.leaveS" style="margin-top: 3%; margin-bottom: 3%;">
                              <nut-radio label="是">是</nut-radio>
                              <nut-radio label="否">否</nut-radio>
                            </nut-radiogroup>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>是否离保</span>
                        </nut-col>
                        <nut-col :span="18" style="text-align: left;">
                            <!-- <nut-textinput placeholder="否" :clearBtn="false" v-model="usrData.leaveB" /> -->
                            <nut-radiogroup v-model="usrData.leaveB" style="margin-top: 3%; margin-bottom: 3%;">
                              <nut-radio label="是">是</nut-radio>
                              <nut-radio label="否">否</nut-radio>
                            </nut-radiogroup>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>出行方式</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" placeholder="步行/自行车/公交车/私家车" :clearBtn="false" v-model="usrData.way" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>出行路线</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" placeholder="东校到西校" :clearBtn="false" v-model="usrData.route" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>请假详情</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" placeholder="上考研课" :clearBtn="false" v-model="usrData.rsn" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>请假天数</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput placeholder="1（从今天开始开开1天）" :clearBtn="false" v-model="usrData.day" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>本人电话</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="11" placeholder="1008611" :clearBtn="false" v-model="usrData.stel" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>家长电话</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="11" placeholder="10086" :clearBtn="false" v-model="usrData.ptel" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
                        </nut-col>
                    </nut-row>
                </div>
            </div>
            <div style="margin: 3%; text-align: center;">
              <nut-button @click="submitData">确定</nut-button>
            </div>
        </nut-popup>

        <!-- 修改 -->
        <nut-popup v-model="editDataShow" style="height: 70%; width: 80%; padding: 2%">
            <div style="text-align: center; margin: 3%;">修改信息</div>
            <div id="create-form">
                <div style="-webkit-app-region: drag;">
                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>姓名</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" :clearBtn="true" v-model="editData.name" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col :span="6">
                            <p>学院</p>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="15" :clearBtn="true" v-model="editData.clg" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col :span="6">
                            <p>专业班级</p>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" :clearBtn="true" v-model="editData.mjcls" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>辅导员</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" :clearBtn="true" v-model="editData.tcr" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>请假类型</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="10" :clearBtn="true" v-model="editData.type" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>是否离校</span>
                        </nut-col>
                        <nut-col :span="18" style="text-align: left;">
                            <!-- <nut-textinput placeholder="是" :clearBtn="false" v-model="usrData.leaveS" /> -->
                            <nut-radiogroup v-model="editData.leaveS" style="margin-top: 3%; margin-bottom: 3%;">
                              <nut-radio label="是">是</nut-radio>
                              <nut-radio label="否">否</nut-radio>
                            </nut-radiogroup>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>是否离保</span>
                        </nut-col>
                        <nut-col :span="18" style="text-align: left;">
                            <!-- <nut-textinput placeholder="否" :clearBtn="false" v-model="usrData.leaveB" /> -->
                            <nut-radiogroup v-model="editData.leaveB" style="margin-top: 3%; margin-bottom: 3%;">
                              <nut-radio label="是">是</nut-radio>
                              <nut-radio label="否">否</nut-radio>
                            </nut-radiogroup>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>出行方式</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" :clearBtn="true" v-model="editData.way" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>出行路线</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" :clearBtn="true" v-model="editData.route" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>请假详情</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="30" :clearBtn="true" v-model="editData.rsn" />
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>本人电话</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="11" :clearBtn="true" v-model="editData.stel" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
                        </nut-col>
                    </nut-row>

                    <nut-row :span="6" style="display: flex; align-items: center; flex-direction: row; margin-bottom: 2%;">
                        <nut-col span="6">
                            <span>家长电话</span>
                        </nut-col>
                        <nut-col :span="18">
                            <nut-textinput maxlength="11" :clearBtn="true" v-model="editData.ptel" onkeypress="return event.keyCode>=48&&event.keyCode<=57" ng-pattern="/[^a-zA-Z]/"/>
                        </nut-col>
                    </nut-row>
                </div>
            </div>
            <div style="margin: 3%; text-align: center;">
              <nut-button @click="submitEditedData(crtId)">确定</nut-button>
            </div>
        </nut-popup>


        <nut-popup v-model="qrShow" style="padding: 5%">
          <div>
            <div id="qrcode" ref="qrCodeDiv"></div>
          </div>
          <div style="text-align: center; margin-top: 8%">
            <nut-button @click="gotoProfile(crtId)">跳转</nut-button>
          </div>
        </nut-popup>

        <nut-popup v-model="addDateShow" style="padding: 5%">
          <div>
            <nut-textinput 
                v-model="addDay"
                placeholder="请输入续期天数..."
            />
          </div>
          <div style="text-align: center; margin-top: 8%">
            <nut-button @click="addDate(crtId)">确定</nut-button>
          </div>
        </nut-popup>

        <nut-popup v-model="adminShow" style="padding: 5%">
          <div>
            <nut-textinput 
                v-model="dynamicPsw"
                placeholder="请输入管理员动态密码..."
            />
          </div>
          <div style="text-align: center; margin-top: 8%">
            <nut-button @click="submitPsw">确定</nut-button>
          </div>
        </nut-popup>
    </div>
</template>

<script>
import axios from 'axios'
import common from '../Common.vue'
import QRCode from 'qrcodejs2';

export default {
    inject: ['reload'],
    name: "Home",
    components: {},
    created() {
        this.checkDynamicPswList();
        //this.getDynamicPswList();
    },
    data() {
        return {
          searchStr: "",
            usrData: {
                name: "",
                id: "",
                clg: "",
                mjcls: "",
                tcr: "",
                type: "",
                leaveS: "是",
                leaveB: "否",
                way: "",
                route: "",
                rsn: "",
                day: 1,
                stel: "",
                ptel: "",
            },
            editData: {
                name: "",
                id: "",
                clg: "",
                mjcls: "",
                tcr: "",
                type: "",
                leaveS: "是",
                leaveB: "否",
                way: "",
                route: "",
                rsn: "",
                stel: "",
                ptel: "",
            },
            stuList: [],
            isShow: false,
            qrShow: false,
            addDateShow: false,
            editDataShow: false,
            adminShow: true,
            addDay: "",
            crtId: "",
            dynamicPsw: "",
            displayStyle: "display: none;"
        };
    },
    methods: {
        createNew: function () {
            // alert(this.isShow);
            this.isShow = true;
        },
        submitPsw: function () {
            var that = this;
            that.checkDynamicPswList();
            //TODO 点击两次才会返回正确的列表
            that.getDynamicPswBool();        
        },
        submitData: function () {
            if (this.usrData.name === '') {
                this.$toast.warn('请填写姓名');
                return;
            } else if (this.usrData.id === '') {
                this.$toast.warn('请填写学号');
                return;
            } else if (this.usrData.clg === '') {
                this.$toast.warn('请填写学院');
                return;
            } else if (this.usrData.mjcls === '') {
                this.$toast.warn('请填写专业班级');
                return;
            } else if (this.usrData.tcr === '') {
                this.$toast.warn('请填写辅导员');
                return;
            } else if (this.usrData.type === '') {
                this.$toast.warn('请填写请假类型');
                return;
            } else if (this.usrData.way === '') {
                this.$toast.warn('请填写方式');
                return;
            } else if (this.usrData.route === '') {
                this.$toast.warn('请填写路线');
                return;
            } else if (this.usrData.rsn === '') {
                this.$toast.warn('请填写原因');
                return;
            } else if (this.usrData.day === '') {
                this.$toast.warn('请填写天数');
                return;
            } else if (this.usrData.stel === '') {
                this.$toast.warn('请填写本人电话');
                return;
            } else if (this.usrData.ptel === '') {
                this.$toast.warn('请填写家长电话');
                return;
            }
            this.saveUsrDataMysql();
            this.isShow = false;
            this.emptyUsrData();
        },
        generateQrcode: function(txt){
            new QRCode(this.$refs.qrCodeDiv, {
            text: txt,
            width: 128,
            height: 128,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
        },
        saveUsrDataMysql: function() {
            var that = this;
            axios.get(common.apiUrl + '/api/saveUsrDataMysql', {
                params: {
                  name: this.usrData.name,
                  id: this.usrData.id,
                  clg: this.usrData.clg,
                  mjcls: this.usrData.mjcls,
                  tcr: this.usrData.tcr,
                  type: this.usrData.type,
                  leaveS: (this.usrData.leaveS == "是") ? 1 : 0,
                  leaveB: (this.usrData.leaveB == "是") ? 1 : 0,
                  way: this.usrData.way,
                  route: this.usrData.route,
                  rsn: this.usrData.rsn,
                  day: this.usrData.day,
                  stel: this.usrData.stel,
                  ptel: this.usrData.ptel
                }
            })
            .then(function (res) {
                //console.log(res.data.code);
                if (res.data.code == '10001') {
                    that.$toast.fail('请检查学号是否存在重复');
                }
                else that.$toast.success('保存成功');
                that.getUsrList();
            })
            .catch(function (err) {
                that.$toast.fail('内部错误');
                console.log(err);
            });
        },
        getUsrList: function() {
          var that = this;
          axios.get(common.apiUrl + '/api/getUsrList', {
            params: {}
          })
          .then(function (res) {
            that.stuList = res.data.message;
            if (res.data.code == 10001) that.$toast.fail('获取失败');
          })
          .catch(function(err) {
            that.$toast.fail('获取失败');
            console.log(err);
          })
        },
        delUsrDataMysql: function(usrId) {
            var that = this;
            axios.get(common.apiUrl + '/api/delUsrDataMysql', {
                params: {
                id: usrId
                }
            })
            .then(function (res) {
                that.getUsrList();
            })
            .catch(function(err) {
                that.$toast.fail('删除失败');
                console.log(err);
            })
            //this.reload();
            //this.getUsrList();
        },
        editUsrData: function(id) {
            var that = this;
            axios.get(common.apiUrl + '/api/editUsrData', {
                params: {
                    name: this.editData.name,
                    id: id,
                    clg: this.editData.clg,
                    mjcls: this.editData.mjcls,
                    tcr: this.editData.tcr,
                    type: this.editData.type,
                    way: this.editData.way,
                    route: this.editData.route,
                    rsn: this.editData.rsn,
                    stel: this.editData.stel,
                    ptel: this.editData.ptel,
                    leaveS: (this.editData.leaveS == "是") ? 1 : 0,
                    leaveB: (this.editData.leaveB == "是") ? 1 : 0,
                }
            }).then(function(res) {
                if (res.data.code == 10001) that.$toast.fail('更新失败');
            }).catch(function(err) {
                that.$toast.fail('更新失败');
                console.log(err);
            })
            this.$toast.success('更新成功');
            //console.log(this.editData);
        },
        checkDynamicPswList: function() {
            axios.get(common.apiUrl + '/api/checkDynamicPswList', { params: {} }).then(() => {console.log('checking')})
        },
        getDynamicPswBool: function() {
            var that = this;
            axios.get(common.apiUrl + '/api/getDynamicPswBool', {
                params: { psw: this.dynamicPsw }
            }).then(function(res) {
                that.pswList = res.data;

                if (res.data.message == true)
                {
                    that.adminShow = false;
                    that.$toast.success('密码正确');
                    that.displayStyle = '';
                    that.getUsrList();

                }
                else that.$toast.fail('密码失效或错误');
            }).catch(function(err) {
                that.$toast.fail('内部错误');
                console.log(err);
            })
        },
        submitEditedData: function(id) {
            if (this.editData.name === '') {
                this.$toast.warn('请填写姓名');
                return;
            } else if (this.editData.clg === '') {
                this.$toast.warn('请填写学院');
                return;
            } else if (this.editData.mjcls === '') {
                this.$toast.warn('请填写专业班级');
                return;
            } else if (this.editData.tcr === '') {
                this.$toast.warn('请填写辅导员');
                return;
            } else if (this.editData.type === '') {
                this.$toast.warn('请填写请假类型');
                return;
            } else if (this.editData.way === '') {
                this.$toast.warn('请填写方式');
                return;
            } else if (this.editData.route === '') {
                this.$toast.warn('请填写路线');
                return;
            } else if (this.editData.rsn === '') {
                this.$toast.warn('请填写原因');
                return;
            } else if (this.editData.stel === '') {
                this.$toast.warn('请填写本人电话');
                return;
            } else if (this.editData.ptel === '') {
                this.$toast.warn('请填写家长电话');
                return;
            }
            
            this.editUsrData(id);
            this.editDataShow = false;
            this.getUsrList();
            this.editData.name = "";
            this.editData.id = "";
            this.editData.clg = "";
            this.editData.mjcls = "";
            this.editData.tcr = "";
            this.editData.type = "";
            this.editData.leaveS = "是";
            this.editData.leaveB = "否";
            this.editData.way = "";
            this.editData.route = "";
            this.editData.rsn = "";
            this.editData.stel = "";
            this.editData.ptel = "";
        },
        showQr: function(id) {
          document.getElementById("qrcode").innerHTML = "";
          this.generateQrcode('http://' + common.host + ':' + common.port + '/profile?id=' + id);
          this.crtId = id;
          this.qrShow = true;
        },
        gotoProfile: function(stuId) {
          this.$router.push({
            path: '/profile',
            query: {
              id: stuId
              }
            });
        },
        addDate: function(stuId) {
            if (this.addDay === '')
            {
                this.$toast.warn('请输入天数');
                return;
            }
            else if (parseInt(this.addDay).toString() == 'NaN')
            {
                this.$toast.warn('请输入一个正确的整数');
                return;
            }
            axios.get(common.apiUrl + '/api/addDate', {
                params: {
                    day: this.addDay,
                    id: stuId
                    }
            })
            .then(function (res) {
                if (res.data.code == 10001) this.$toast.fail('续期失败');
                //alert(stuId);
            })
            .catch(function(err) {
                this.$toast.fail('续期失败');
                console.log(err);
            })
            this.addDateShow = false;
            //alert(stuId);
            this.$toast.success('续期成功');
            this.addDay = '';
        },
        showAddDate: function(id) {
            this.crtId = id;
            this.addDateShow = true;
        },

        showEdit: function(id, data) {
            axios.get(common.apiUrl + '/api/getUsrDataMysql', {
                params: {
                id: id
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
                data.way = dataT.way;
                data.route = dataT.route;
                data.rsn = dataT.rsn;
                data.stel = dataT.stel;
                data.ptel = dataT.ptel;
                data.leaveS = dataT.leaveS ? '是' : '否';
                data.leaveB = dataT.leaveB ? '是' : '否';
            })
            .catch(function (error) {
                console.log(error);
            });
            this.crtId = id;
            this.editDataShow = true;
        },
        emptyUsrData: function() {
            this.usrData.name = '';
            this.usrData.id = '';
            this.usrData.rsn = '';
            this.usrData.day = 1;
            this.usrData.stel = '';
            this.usrData.ptel = '';
            this.usrData.clg = '';
            this.usrData.mjcls = '';
            this.usrData.tcr = '';
            this.usrData.type = '';
            this.usrData.leaveS = '是';
            this.usrData.leaveB = '否';
            this.usrData.way = '';
            this.usrData.route = '';
        },
    },
};
</script>
<style>
* {
    margin: 0;
}

html,
body,
#app {
    height: 100%;
    width: 100%;
    background: #FFF;
}

#qrcode {}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #fff;
}

#create-form {
    height: 80%;
    width: 100%;
    text-align: center;
    overflow: scroll;
}

.stu-list {
    height: 70%;
    overflow: scroll;
}

.create {
    margin: 3%;
    text-align: center;
}
</style>

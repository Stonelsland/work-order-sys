<!--查看工单详情-->
<template>
  <div class="ivu-modal">
    <div class="ivu-modal-content">
      <a class="ivu-modal-close">
        <i class="ivu-icon ivu-icon-ios-close"></i>
      </a>
      <div class="ivu-modal-header">
        <div class="ivu-modal-header-inner">工单详情</div>
      </div>
      <div class="ivu-modal-body">
        <div class="message1">
          <div class="message2">
            <span>标题:</span>
            <Input v-model="title" disabled v-if="editState" />
            <Input v-model="title" v-else />
          </div>
          <div class="message2">
            <span>审批人:</span>
            <Select v-model="approver" disabled v-if="editState">
              <Option
                v-for="item in approverList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Select v-model="approver" v-else>
              <Option
                v-for="item in approverList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="message2">
            <span>业务:</span>
            <Select v-model="business" disabled v-if="editState">
              <Option
                v-for="item in businessList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Select v-model="business" v-else>
              <Option
                v-for="item in businessList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="message1">
          <div class="message2">
            <span>主机:</span>
            <Select v-model="host" disabled v-if="editState">
              <Option
                v-for="item in hostList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <Select v-model="host" v-else multiple>
              <Option
                v-for="item in hostList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="message2">
            <span>状态:</span>
            <Select v-model="state" disabled>
              <Option
                v-for="item in stateList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="message2">
            <span>创建人:</span>
            <Input v-model="creator" disabled v-if="editState" />
            <Input v-model="creator" v-else />
          </div>
        </div>
        <div class="message1">
          <div class="message2">
            <span>创建时间:</span>
            <Input v-model="time" disabled />
          </div>
          <div class="message2">
            <span>更新时间:</span>
            <Input v-model="ctime" disabled />
          </div>
        </div>

        <div class="text1">
          <div class="text2">
            <span>内容:</span>
            <Input type="textarea" v-model="content" disabled v-if="editState" />
            <Input type="textarea" v-model="content" v-else />
          </div>
          <div class="text2">
            <span>驳回意见:</span>
            <Input type="textarea" v-model="commit" disabled v-if="editState" />
            <Input type="textarea" v-model="commit" v-else />
          </div>
        </div>
      </div>
      <div class="ivu-modal-footer">
        <div class="submit">
          <button
            type="button"
            @click="openEdit"
            v-if="state==`未提交`"
            class="ivu-btn ivu-btn-primary"
          >
            <span>编辑</span>
          </button>
          <button
            type="button"
            @click="commitOrder(
                                 title,
                                 approver,
                                 business,
                                 host,
                                 state,
                                 content,
                                 creator,
                                 time,
                                 )"
            class="ivu-btn ivu-btn-primary"
            v-if="state==`未提交`"
          >
            <span>提交</span>
          </button>
          <button type="button" v-if="editState" @click="back" class="ivu-btn ivu-btn-default">
            <span>返回</span>
          </button>
          <button
            type="button"
            v-else
            @click="saveEdit(
                              title,
                              approver,
                              business,
                              host,
                              state,
                              content,
                              creator,
                              time,
                              index,
                           )"
            class="ivu-btn ivu-btn-default"
          >
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/order";

export default {
  data() {
    return {
      modal: true,
      value: ``,
      commit: ``,
      editState: true,
      approverList: store.state.approverList,
      orderList: store.state.orderList,
      stateList: store.state.stateList,
      businessList: store.state.businessList,
      hostList: store.state.hostList,
      title: this.$route.query.title,
      approver: this.$route.query.approver,
      business: this.$route.query.business,
      host: this.$route.query.host,
      state: this.$route.query.state,
      creator: this.$route.query.creator,
      time: this.$route.query.time,
      ctime: this.$route.query.ctime,
      content: this.$route.query.content,
      index: this.$route.query.index
    };
  },
  methods: {
    //打开编辑
    openEdit() {
      this.editState = false;
    },
    //返回列表页面
    back() {
      this.$router.go(-2);
    },
    //编辑后保存
    saveEdit(
      title,
      approver,
      business,
      host,
      state,
      content,
      creator,
      time,
      index
    ) {
      var edited = {
        title,
        approver,
        business,
        host,
        state,
        creator,
        time,
        ctime: this.dateFormat(new Date()),
        content
      };
      this.$store.commit({
        type: `editOrder`,
        edited,
        index
      });
      this.back();
    },
    //提交工单审批
    commitOrder(
      title,
      approver,
      business,
      host,
      state,
      content,
      creator,
      time
    ) {
      var commit = {
        title,
        approver,
        business,
        host,
        state: `已提交`,
        creator,
        time,
        content
      };
      this.$store.commit({
        type: `commitOrder`,
        commit
      });
      this.back();
    },
    //时间格式过滤方法
    dateFormat(dateStr) {
      var dt = new Date(dateStr);
      var y = dt.getFullYear();
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt
        .getDate()
        .toString()
        .padStart(2, "0");
      var hh = dt
        .getHours()
        .toString()
        .padStart(2, "0");
      var mm = dt
        .getMinutes()
        .toString()
        .padStart(2, "0");
      var ss = dt
        .getSeconds()
        .toString()
        .padStart(2, "0");
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.ivu-modal {
  width: 80vw;
  top: 40px;

  .ivu-modal-body {
    .message1 {
      display: inline-block;
      margin: 10px 2px;

      .message2 {
        display: inline-block;
        margin-left: 5vw;
        vertical-align: center;
        width: 17.3vw;

        span {
          margin-top: 4px;
          float: left;
          position: absolute;
        }

        .ivu-input-wrapper {
          margin-left: 4.5vw;
        }

        .ivu-select {
          margin-left: 4.5vw;
        }
      }
    }

    .text1 {
      .text2 {
        margin-top: 20px;
        margin-left: 5vw;
        width: 80%;

        span {
          margin-top: 4px;
          float: left;
          position: absolute;
        }

        .ivu-input-wrapper {
          margin-left: 4.5vw;
        }
      }
    }
  }

  .submit {
    width: 45vw;
  }
}
</style>
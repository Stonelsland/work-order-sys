<!--新建工单-->
<template>
  <div>
    <Button type="success" @click="modalView = true">创建</Button>
    <Modal v-model="modalView" title="创建工单" @on-ok="addOrder" @on-cancel="cancel">
      <div class="input1">
        <span>标题:</span>
        <Input v-model="title" />
      </div>
      <div class="input1">
        <span>审批人:</span>
        <Select v-model="approver">
          <Option
            v-for="item in approverList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="input1">
        <span>业务:</span>
        <Select v-model="business">
          <Option
            v-for="item in businessList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="input1">
        <span>主机:</span>
        <Select v-model="host" multiple>
          <Option v-for="item in hostList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="input1">
        <span>状态:</span>
        <Select v-model="state" disabled>
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="input1">
        <span>内容:</span>
        <Input type="textarea" v-model="content" />
      </div>
      <div class="input1">
        <span>创建人:</span>
        <Input v-model="creator" />
      </div>
    </Modal>
  </div>
</template>

<script>
import store from "@/store/order";

export default {
  data() {
    return {
      modalView: false,
      value: ``,
      model: ``,
      title: ``,
      approver: ``,
      business: ``,
      host: ``,
      state: `未提交`,
      content: ``,
      creator: ``,
      approverList: store.state.approverList,
      businessList: store.state.businessList,
      hostList: store.state.hostList,
      stateList: store.state.stateList
    };
  },
  methods: {
    //新建工单
    addOrder() {
      var neworder = {
        title: this.title,
        approver: this.approver,
        business: this.business,
        host: this.host,
        state: this.state,
        content: this.content,
        creator: this.creator,
        time: this.dateFormat(new Date()),
        etime: ``
      };
      this.$store.commit({
        type: `addOrder`,
        neworder
      });
      this.clearAdd();
      //this.$Message.info('Clicked ok');
    },
    cancel() {
      //this.$Message.info('Clicked cancel');
    },
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
    },
    clearAdd() {
      this.title = this.approver = this.business = this.host = this.content = this.creator = this.time = ``;
    }
  }
};
</script>

<style lang="scss" scoped>
.ivu-modal-content {
  top: -8vh;

  .ivu-modal-body {
    .input1 {
      display: inline-block;
      margin: 12px 1vw;

      span {
        margin-top: 4px;
        float: left;
        position: absolute;
      }

      .ivu-input-wrapper {
        width: 400px;
        margin-left: 60px;
      }

      .ivu-select {
        width: 400px;
        margin-left: 60px;
      }
    }
  }
}
</style>
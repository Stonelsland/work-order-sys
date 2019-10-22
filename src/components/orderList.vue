<!--全部工单列表-->
<template>
  <div class="mainMenu">
    <Menu mode="horizontal" active-name="1">
      <router-link to="/orderList">
        <MenuItem name="1">
          <Icon type="ios-paper" />工单列表
        </MenuItem>
      </router-link>
      <router-link to="/committedList">
        <MenuItem name="2">
          <Icon type="md-list" />审批列表
        </MenuItem>
      </router-link>
    </Menu>
    <p class="inputSearch">
      <label>
        标题:
        <Input v-model="keywords" placeholder="请输入搜索的标题" />
      </label>
    </p>
    <p class="inputSearch">
      <label>
        状态:
        <Select v-model="orderState" clearable>
          <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
    </p>

    <div class="btn">
      <Button type="primary" @click="search(keywords,orderState)">查找</Button>
      <!--         <Button type="success">创建</Button>-->
      <new-order class="createBtn"></new-order>
    </div>
    <Table border :columns="orderColumns" :data="orderList">
      <template slot-scope="{ row }" slot="title">
        <strong>{{ row.title }}</strong>
        <!--            <i>{{row.time|dateFormat}}</i>-->
      </template>
      <template slot-scope="{ row }" slot="ctime">
        <span>{{row.time}}</span>
        <!--            <i>{{row.time|dateFormat}}</i>-->
      </template>
      <!--      <template slot-scope="{ row, index }" slot="action">-->
      <template slot-scope="{row,index}" slot="action">
        <router-link to="/orderDetail">
          <Button
            type="primary"
            size="small"
            @click="orderDetail(
                                row.title,
                                row.approver,
                                row.business,
                                row.host,
                                row.state,
                                row.content,
                                row.creator,
                                row.time,
                                row.ctime,
                                index,
                                )"
          >详情</Button>
        </router-link>
        <Button style="margin-left: 10px" type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import newOrder from "@/components/newOrder";
import store from "@/store/order";

export default {
  data() {
    return {
      value: ``,
      stateModel: ``,
      orderState: ``,
      keywords: ``,
      orderColumns: store.state.orderColumns,
      // orderList: store.state.orderList,
      orderList: store.state.orderList,
      stateList: store.state.stateList
    };
  },
  methods: {
    orderDetail(
      title,
      approver,
      business,
      host,
      state,
      content,
      creator,
      time,
      ctime,
      index
    ) {
      this.$router.push({
        path: `/orderDetail`,
        query: {
          title,
          approver,
          business,
          host,
          state,
          content,
          creator,
          time,
          index,
          ctime
        }
      });
    },
    remove(index) {
      store.state.orderList.splice(index, 1);
    },
    //查询
    search(keywords, orderState) {
      this.orderList = store.getters.search(keywords, orderState);
    }
  },
  components: {
    newOrder
  }
};
</script>

<style lang="scss" scoped>
.mainMenu {
  vertical-align: center;

  .ivu-menu-light {
    padding-left: 40vw;
  }

  .inputSearch {
    width: 90%;
    margin: 15px 4vw;

    .ivu-input-wrapper {
      width: 95%;
    }

    .ivu-select {
      width: 95%;
      margin: 12px 0px 12px 0px;
    }
  }

  .btn {
    margin: 2px 0px 10px 4vw;

    .ivu-btn {
      width: 65px;
    }

    .createBtn {
      display: inline-block;
      margin-left: 4px;
    }
  }

  .ivu-table-wrapper {
    margin: 5px 4vw;
  }
}
</style>
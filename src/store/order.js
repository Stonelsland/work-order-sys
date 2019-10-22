import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		orderColumns: [
			{
				title: "标题",
				slot: "title"
			},
			{
				title: "审批人",
				key: "approver"
			},
			{
				title: "业务",
				key: "business"
			},
			{
				title: `主机`,
				key: `host`
			},
			{
				title: `状态`,
				key: `state`
			},
			{
				title: `创建时间`,
				slot: `ctime`,
				key: `time`
			},
			{
				title: "Action",
				slot: "action",
				width: 150,
				align: "center"
			}
		],

		committedList: [
			// {
			//    title: `工单3`,
			//    approver: `审批人一`,
			//    business: `业务3`,
			//    host: `127.0.0.1`,
			//    state: `committed`,
			//    content:`333333`,
			//    creator:``,
			//    time: `2019-10-17`
			// },
			// {
			//    title: `工单4`,
			//    approver: `审批人三`,
			//    business: `业务4`,
			//    host: `127.0.0.1`,
			//    state: `committed`,
			//    content:`4444444`,
			//    creator:``,
			//    time: `2019-10-17`
			// },
		],
		orderList: [
			// {
			//    title: `工单1`,
			//    approver: `审批人一`,
			//    business: `业务一`,
			//    host: `127.0.0.1`,
			//    state: `未提交`,
			//    content: `1111111`,
			//    creator: `noah`,
			//    time: `2019-10-17`,
			//    ctime:`2019-10-18`,
			// },
			// {
			//    title: `工单2`,
			//    approver: `审批人二`,
			//    business: `业务二`,
			//    host: `127.0.0.1`,
			//    state: `未提交`,
			//    content: `已提交`,
			//    creator: `noah`,
			//    time: `2019-10-17`,
			//    ctime:`2019-10-18`,
			// },
			// {
			//    title: `工单3`,
			//    approver: `审批人一`,
			//    business: `业务三`,
			//    host: `127.0.0.1`,
			//    state: `已提交`,
			//    content: `333333`,
			//    creator: `noah`,
			//    time: `2019-10-17`,
			//    ctime:`2019-10-18`,
			// },
			// {
			//    title: `工单4`,
			//    approver: `审批人三`,
			//    business: `业务四`,
			//    host: `127.0.0.1`,
			//    state: `已提交`,
			//    content: `4444444`,
			//    creator: `noah`,
			//    time: `2019-10-17`,
			//    ctime:`2019-10-18`,
			// },
		],
		stateList: [
			{
				value: "未提交",
				label: "未提交"
			},
			{
				value: "已提交",
				label: "已提交"
			}
		],
		businessList: [
			{
				value: `业务一`,
				label: `业务一`
			},
			{
				value: `业务二`,
				label: `业务二`
			},
			{
				value: `业务三`,
				label: `业务三`
			}
		],
		approverList: [
			{
				value: `审批人一`,
				label: `审批人一`
			},
			{
				value: `审批人二`,
				label: `审批人二`
			},
			{
				value: `审批人三`,
				label: `审批人三`
			}
		],
		hostList: [
			{
				value: `127.0.0.1`,
				label: `127.0.0.1`
			},
			{
				value: `114.114.114.114`,
				label: `114.114.114.114`
			},
			{
				value: `8.8.8.8`,
				label: `8.8.8.8`
			}
		]
	},
	mutations: {
		addOrder(state, payload) {
			this.state.orderList.push(payload.neworder);
		},
		editOrder(state, payload) {
			this.state.orderList.splice(payload.index, 1, payload.edited);
		},
		commitOrder(state, payload) {
			var ep = this.state.orderList.findIndex(item => {
				if (item.title === payload.commit.title) {
					return true;
				}
			});
			this.state.orderList.splice(ep, 1, payload.commit);
			this.state.committedList.push(payload.commit);
		}
	},
	actions: {},
	getters: {
		search: state => (keywords, orderState) => {
			return state.orderList.filter(item => {
				if (item.title.includes(keywords) && item.state.includes(orderState)) {
					return item;
				}
			});
		}
	},
	modules: {}
});
//导出store对象
export default store;

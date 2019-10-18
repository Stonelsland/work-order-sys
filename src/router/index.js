import Vue from 'vue'
import VueRouter from 'vue-router';
import orderList from "@/components/orderList";
import orderDetail from "@/components/orderDetail";
import committedList from "@/components/committedList";

Vue.use(VueRouter);

export default new VueRouter({
   mode: `history`,
   routes: [
      {path: `*`, redirect: `/orderList`},
      {
         path: `/orderList`,
         component: orderList,
      },
      {
         path: `/committedList`,
         component: committedList,
      },
      {
         path: `/orderDetail`,
         component: orderDetail
      }

   ]
})
<template>
  <div>
    <h1>App 根组件</h1>

    <hr />

    <todo-input @add="onAddNewTask"></todo-input>
    <todo-list :list="tasklist" class="mt-2"></todo-list>
    <todo-button v-model:active="activeBtnIndex"></todo-button>
  </div>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/todo-input/TodoInput.vue'
// 导入 TodoButton 组件
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true },
      ],
      // 下一个可用的 Id
      nextId: 4,
      // 默认展示全部任务：索引值为0
      activeBtnIndex: 0,
    }
  },
  computed: {
    // 监听激活按钮的索引值，动态计算要展示的列表数据(索引值变化将自动更新)
    tasklist() {
      // 对源数据进行筛选匹配，返回计算之后的结果
      switch (this.activeBtnIndex) {
        case 0:
          // 展示全部任务
          return this.todolist
        case 1:
          // 只展示已完成任务
          return this.todolist.filter((x) => x.done === true)
        case 2:
          // 只展示未完成任务
          return this.todolist.filter((x) => x.done !== true)
      }
    },
  },
  methods: {
    // 添加新任务
    onAddNewTask(taskname) {
      // 在原来的任务列表末尾添加一条数据
      this.todolist.push({
        id: this.nextId,
        task: taskname,
        done: false,
      })
      // 下一条数据的 id 值自增1
      this.nextId++
    },
  },
  components: {
    TodoList,
    TodoInput,
    TodoButton,
  },
}
</script>

<style lang="less" scoped></style>

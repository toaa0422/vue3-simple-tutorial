<template>
  <div class="mt-3 btn-container">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(0)">全部</button>
      <button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(1)">已完成</button>
      <button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(2)">未完成</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoButton',
  // 双向绑定激活按钮的索引值（实现组件内外的数据同步）
  emits: ['update:active'],
  props: {
    // 激活的任务列表的索引
    active: {
      type: Number,
      required: true,
      // 默认激活索引值为 0 的按钮（全部:0,已完成:1,未完成:2）
      default: 0,
    },
  },
  methods: {
    // 更新激活按钮的索引值(双向绑定)
    onBtnClick(index) {
      // 传入的索引值就是当前激活按钮的索引值，则无需更新
      if (index === this.active) return
      // 激活按钮的索引值发生变化，触发双向绑定事件，同步更新外界的索引值
      this.$emit('update:active', index)
    },
  },
}
</script>

<style lang="less" scoped>
.btn-container {
  width: 400px;
  text-align: center;
}
</style>

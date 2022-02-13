<template>
  <el-dialog
    title="分配角色"
    :visible.sync="showRoleDialog"
    width="width"
    :before-close="dialogBeforeClose"
  >
    <el-checkbox-group>
      <!-- 选项 -->
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: true
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
</style>

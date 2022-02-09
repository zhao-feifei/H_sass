<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共166条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border>
          <el-table-column label="序号" sortable />
          <el-table-column label="姓名" sortable />
          <el-table-column label="工号" sortable />
          <el-table-column label="聘用形式" sortable />
          <el-table-column label="部门" sortable />
          <el-table-column label="入职时间" sortable />
          <el-table-column label="账户状态" sortable />
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import PageTools from "@/components/PageTools/index.vue";
export default { components: { PageTools } }
</script>

<style></style>

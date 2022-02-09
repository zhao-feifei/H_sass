<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" sortable prop="formOfEmployment" />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable prop="enableState" />
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
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getEmployeeList } from '@/api/employees'
export default {
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList()
    }
  },
}
</script>

<style></style>

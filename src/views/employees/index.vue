<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable type="index" />
          <el-table-column label="姓名" sortable prop="username" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            sortable
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable prop="departmentName" />
          <el-table-column label="入职时间" sortable align="center">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" align="center" sortable prop="enableState">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
    <AddDemployee :show-dialog.sync="showDialog"></AddDemployee>
  </div>
</template>
<script>
import EmployeeEnum from '@/api/constant/employees'
import AddDemployee from './components/add-employee.vue'
import { getEmployeeList, delEmployee } from '@/api/employees'
import { formatDate } from '@/filters/index'
export default {
  components: {
    AddDemployee
  },
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      },
      showDialog: false,

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
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 导出excel数据
    exportData() {
      //  做操作
      // 表头对应关系
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows)

        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          autoWidth: true,
          bookType: 'xlsx'

        })
        // 获取所有的数据

        // excel.export_json_to_excel({
        //   header: ['姓名', '薪资'],
        //   data: [['张三', 12000], ['李四', 5000]],
        //   filename: '员工薪资表',
        //   autoWidth: true,
        //   bookType: 'csv'
        // })
      })
    },
    // 该方法负责将数组转化成二维数组
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            var en = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
      // return data
      // return rows.map(item => {
      //   // item是对象  => 转化成只有值的数组 => 数组值的顺序依赖headers  {username: '张三'  }
      //   // Object.keys(headers)  => ["姓名", "手机号",...]
      //   return Object.keys(headers).map(key => {
      //     return item[headers[key]]
      //   }) // /  得到 ['张三'，’129‘，’dd‘,'dd']
      // })
    }
  },
}
</script>

<style></style>

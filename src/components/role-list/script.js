export default {
  created () {
    this.loadRights()
  },
  data () {
    return {
      roleList: [],
      addRoleDialog: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleDialog: false,
      editRoleForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    async loadRights () {
      const res = await this.$http.get('/roles')
      const { data, meta } = res.data
      // console.log(data, meta)
      if (meta.status === 200) {
        this.roleList = data
      }
    },
    // 添加角色
    async handleAddRole () {
      const res = await this.$http.post('/roles', this.addRoleForm)
      // console.log(res)
      const {meta} = res.data
      // console.log(data, meta)
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
        // 显示编辑权限对话框
        // 清空对话框的内容
        for (let key in this.addRoleForm) {
          this.addRoleForm[key] = ''
        }
        // 重新加载角色列表
        this.loadRights()
        this.addRoleDialog = false
      }
    },
    // 删除角色信息
    async handleRemoveRole (role) {
      this.$confirm('您确定永久删除角色信息吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/roles/${role.id}`)
        const {meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除角色成功'
          })
          this.loadRights()
        }
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '取消删除'
        })
      })
    },
    // 编辑角色
    async showEditRoleDialog (role) {
      // console.log(1)
      const res = await this.$http.get(`/roles/${role.id}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.editRoleForm = data
        this.editRoleDialog = true
      }
    },
    async handleEditRole () {
      // console.log(2)
      const res = await this.$http.put(`/roles/${this.editRoleForm.roleId}`, this.editRoleForm)
      const {meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑角色信息成功'
        })
        this.loadRights()
        this.editRoleDialog = false
      }
    }
  }
}

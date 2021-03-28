<template>
  <v-container>
    <v-row>
      <v-col>
        <data-table :data="users" :getAllData="getAllData" @itemEdit='editItem'/>
      </v-col>
      <v-col>
        <form-custom
          :tiposId="tiposId"
          :roles="roles"
          :getAllData="getAllData"
          :itemEdit='itemEdit'
          @finish='reset'
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from '../components/dataTable'
import FormCustom from '../components/form'

export default {
  beforeMount() {
    this.getAllData()
  },
  data() {
    return {
      users: [],
      tiposId: [],
      roles: [],
      itemEdit: {}
    }
  },
  components: { DataTable, FormCustom },
  methods: {
    async getAllData() {
      const users = await this.$axios.get('http://localhost:3001/api/v1/users')

      const result = await this.$axios.get('http://localhost:3001/api/v1/users/types')

      this.users = users.data.result
      this.tiposId = result.data.tiposId
      this.roles = result.data.roles
    },
    editItem(index) {
      this.itemEdit = this.users[index] || {}
    },
    reset() {
      this.itemEdit = {}
    }
    
  }
}
</script>

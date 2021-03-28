<template>
  <v-container>
    <v-row >
      <v-col md="7" xs="12">
        <v-toolbar-title>Lista de usuarios</v-toolbar-title>
        <data-table
          :data="users"
          :getAllData="getAllData"
          @itemEdit="editItem"
        />
      </v-col>
      <v-col xs="12">
        <v-toolbar-title>Formulario de datos</v-toolbar-title>
        <form-custom
          :tiposId="tiposId"
          :roles="roles"
          :getAllData="getAllData"
          :itemEdit="itemEdit"
          @finish="reset"
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
      itemEdit: {},
    }
  },
  components: { DataTable, FormCustom },
  methods: {
    async getAllData() {
      const users = await this.$axios.get('http://localhost:3001/api/v1/users')

      const result = await this.$axios.get(
        'http://localhost:3001/api/v1/users/types'
      )

      this.users = users.data.result
      this.tiposId = result.data.tiposId
      this.roles = result.data.roles
    },
    editItem(index) {
      this.itemEdit = this.users[index] || {}
    },
    reset() {
      this.itemEdit = {}
    },
  },
}
</script>

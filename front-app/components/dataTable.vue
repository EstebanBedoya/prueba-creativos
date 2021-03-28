<template>
  <v-data-table
    :headers="headers"
    :items="data"
    hide-default-footer
    loading-text="cargando datos ..."
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">identificacion: {{ id }}</v-card-title>
          <v-card-text>¿Seguro desea elminar este usuario?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="red darken-1" text @click="confirm">Eliminar</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <dialog-more-ifo
        :model="dialogView"
        :close='close'
        :data='userInfo'
      ></dialog-more-ifo>
    </template>

    <template v-slot:item.options="{ item, index }">
      <v-icon small @click="openDialogView(item)"> mdi-eye</v-icon>
      <v-icon small class="mr-2" @click="update(index)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import DialogMoreInfo from './dialogMoreIfo'

export default {
  props: ['data', 'getAllData'],
  components: { DialogMoreInfo },
  data() {
    return {
      dialog: false,
      dialogView: false,
      id: null,
      index: null,
      userInfo: {},
      headers: [
        { text: 'Identificacion', value: 'id' },
        { text: 'Nombre', value: 'nombres' },
        { text: 'Correo', value: 'correo' },
        { text: 'Opciones', value: 'options', sorteable: false },
      ],
    }
  },
  methods: {
    update(index) {
      this.index = index
      this.$emit('itemEdit', this.index)
    },
    deleteItem(item) {
      this.dialog = true
      this.id = item.id
      // console.log('quiere elmiminar pah', item)
    },
    async confirm() {
      await this.$axios.delete(`http://localhost:3001/api/v1/users/${this.id}`)
      this.getAllData()
      this.close()
    },
    close() {
      this.dialog = false
      this.dialogView = false
    },
    async openDialogView(item) {
      // this.id = item.id
      this.dialogView = true
      const res = await this.$axios.get(
        `http://localhost:3001/api/v1/users/${item.id}`
      )

      this.userInfo = res.data.result[0]
    },
    
  },
}
</script>
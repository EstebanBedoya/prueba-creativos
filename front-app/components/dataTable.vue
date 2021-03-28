<template>
  <v-data-table
    :headers="headers"
    :items="data"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >¿Esta seguro de eliminar este usuario con documento {{id}}?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="confirm"
              >Eliminar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.options="{ item, index }">
      <v-icon small class="mr-2" @click="update(index)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ['data', 'getAllData'],
  data() {
    return {
      dialog: false,
      id: null,
      index: null,
      headers: [
        { text: 'Identificacion', value: 'id' },
        { text: 'Nombre', value: 'nombres' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Opciones', value: 'options', sorteable: false },
      ],
    }
  },
  watch:{
    dialog(val) {
      val || this.close()
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
    }
  },
}
</script>
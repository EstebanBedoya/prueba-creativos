<template>
  <v-dialog v-model="model" max-width="570px">
    <v-card>
      <v-card-title>Usuario identificado con {{data.nombre_tipo}}: {{ data.id }} </v-card-title>
      <v-card-text>Nombres: {{ data.nombres }}</v-card-text>
      <v-card-text>Apellidos: {{ data.apellidos }}</v-card-text>
      <v-card-text>Correo: {{ data.correo }}</v-card-text>
      <v-card-text>celular: {{ data.celular }}</v-card-text>
      <v-card-text>Rol: {{ data.nombre_rol }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['model', 'close', 'data'],
  data() {
    return {
      data: {},
    }
  }
}
</script>

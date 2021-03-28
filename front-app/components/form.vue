<template>
  <v-flex>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-flex xs="3">
        <v-select
          v-model="tipoId"
          :items="tiposId"
          item-text="nombre_tipo"
          item-value="id_tipo"
          :rules="[(v) => !!v || 'Elija un tipo de documento']"
          label="Tipo identificación"
          :disabled="isEdit"
          required
        ></v-select>
      </v-flex>

      <v-text-field
        v-model="id"
        label="Identificación"
        type="number"
        :disabled="isEdit"
        :rules="[(v) => !!v || 'la identificación es requerido']"
        required
      ></v-text-field>

      <v-text-field
        v-model="nombres"
        label="nombres"
        :rules="[(v) => !!v || 'El nombre es requerido']"
        required
      ></v-text-field>

      <v-text-field
        v-model="apellidos"
        label="apellidos"
        :rules="[(v) => !!v || 'los apellidos son requeridos']"
        required
      ></v-text-field>

      <v-text-field
        v-model="correo"
        :rules="emailRules"
        label="Correo"
        required
      ></v-text-field>

      <v-select
        v-model="rol"
        :items="roles"
        item-text="nombre_rol"
        item-value="id_rol"
        :rules="[(v) => !!v || 'el rol es requerido']"
        label="rol"
        required
      ></v-select>

      <v-text-field
        v-model="celular"
        label="celular"
        :counter="10"
        type="number"
        :rules="celularRule"
        required
      ></v-text-field>

      <v-text-field
        v-if="!isEdit"
        v-model="contrasenia"
        label="contraseña"
        type="password"
        required
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        {{ isEdit ? 'Actualizar' : 'Crear' }}
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> cancelar </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  props: ['tiposId', 'roles', 'getAllData', 'itemEdit'],
  data() {
    return {
      valid: true,
      isEdit: false,
      id: '',
      tipoId: null,
      nombres: '',
      apellidos: '',
      correo: '',
      rol: null,
      celular: null,
      editItem: this.itemEdit,
      contrasenia: '',
      celularRule: [
        (v) => !!v || 'Se requiere un celular',
        (v) => (v && v.length === 10) || 'el celular debe tener 10 digitos',
      ],
      emailRules: [
        (v) => !!v || 'Se requiere un correo',
        (v) => /.+@.+\..+/.test(v) || 'El correo no es valido',
      ],
    }
  },
  watch: {
    itemEdit: function (val) {
      console.log(val)
      if (Object.keys(val).length != 0) {
        this.isEdit = true
        this.id = this.itemEdit.id
        this.tipoId = this.itemEdit.tipo_id
        this.nombres = this.itemEdit.nombres
        this.apellidos = this.itemEdit.apellidos
        this.correo = this.itemEdit.correo
        this.rol = this.itemEdit.rol
        this.celular = this.itemEdit.celular
      }
    },
  },

  methods: {
    async validate() {
      this.$refs.form.validate()

      const body = {
        id: this.id,
        tipoId: this.tipoId,
        nombres: this.nombres,
        apellidos: this.apellidos,
        correo: this.correo,
        rol: this.rol,
        celular: this.celular,
        contrasenia: this.contrasenia,
      }

      if (!this.isEdit) {
        await this.$axios.post('http://localhost:3001/api/v1/users', body)
      } else {
        await this.$axios.put(
          `http://localhost:3001/api/v1/users/${this.id}`,
          body
        )
      }
      this.reset()
      this.getAllData()
    },
    reset() {
      this.$refs.form.reset()
      this.id = ''
      this.tipoId = ''
      this.nombres = ''
      this.apellidos = ''
      this.correo = ''
      this.rol = ''
      this.celular = ''
      this.isEdit = false

      this.$emit('finish')
    },
  },
}
</script>
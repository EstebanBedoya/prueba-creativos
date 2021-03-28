const pool = require('../../config/postgres.config')
const bcrypt = require('bcryptjs')

const getAllUsers = async (_, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users;')

        res.json({ result: rows })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params

        const { rows } = await pool.query(`SELECT * FROM users WHERE id = '${id}';`)

        res.json({ result: rows })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }
}

const createUser = async (req, res) => {
    try {
        const { id, tipoId, nombres, apellidos, rol, celular, correo, contrasenia } = req.body

        // const encryptPass = await pool.query(`SELECT encrypt(${contrasenia}, gen_salt('bf', 4));`)
        const encryptPass = await bcrypt.hash(contrasenia, 8)

        const response = await pool.query(`INSERT INTO public.users(
            id, tipo_id, nombres, apellidos, rol, celular, contrasenia, correo)
            VALUES (${id}, ${tipoId}, '${nombres}', '${apellidos}', ${rol}, ${celular}, '${encryptPass}', '${correo}');`)

        res.json({ message: 'creado con exito', response })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { nombres, apellidos, rol, celular, correo } = req.body

        const response = await pool.query(`UPDATE users
                        SET nombres='${nombres}', apellidos='${apellidos}', rol=${rol}, celular='${celular}', correo='${correo}'
                        WHERE id='${id}';`)

        console.log(response)

        res.json({ message: 'actualizado con exito' })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const response = await pool.query(`DELETE FROM users WHERE id = '${id}'`)

        console.log(response)

        res.json({ message: 'eliminado con exito' })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }

}

const getRolesAndTypes = async (_, res) => {
    try {

        const tiposId = await pool.query('SELECT * FROM tipos_identificacion;')
        const roles = await pool.query('SELECT * FROM roles;')

        res.json({ tiposId: tiposId.rows, roles: roles.rows })

    } catch (error) {
        console.log(error)
        res.json({ message: 'hay un error', error })
    }
}


module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getRolesAndTypes
}
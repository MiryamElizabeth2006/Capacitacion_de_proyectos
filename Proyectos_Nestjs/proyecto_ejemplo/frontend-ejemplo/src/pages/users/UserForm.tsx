import { useState } from "react";
import type {User} from '../../interfaces/user.interface'
import {createUser, updateUser} from '../../services/users.service'

interface Props {
    user: User | null
    onClose: () => void
    onSaved: () => void
}

export default function UserForm({user, onClose, onSaved}: Props) {
    const [form, setForm] = useState <Partial<User>>(
        user || {isActive: true}
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleSubmit = async () => {
        if(!form.name || !form.last || !form.age) {
            alert('Completa los campos obligatorios')
            return
        }
        if(user) {
            await updateUser(user.id, form)
        }else{
            await createUser(form)
        }
        onSaved()
        onClose()
    }

    return (
       <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-4">
          {user ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <input
          name="name"
          placeholder="Nombre"
          className="border p-2 w-full mb-2"
          value={form.name || ""}
          onChange={handleChange}
        />
        <input
          name="last"
          placeholder="Apellido"
          className="border p-2 w-full mb-2"
          value={form.last || ""}
          onChange={handleChange}
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          className="border p-2 w-full mb-2"
          value={form.telefono || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          className="border p-2 w-full mb-2"
          value={form.age || ""}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive || false}
            onChange={handleChange}
          />
          Activo
        </label>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>  
    )
}
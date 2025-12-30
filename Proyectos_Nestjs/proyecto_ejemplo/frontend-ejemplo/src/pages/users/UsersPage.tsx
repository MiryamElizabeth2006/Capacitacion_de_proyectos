import {useEffect, useState} from 'react'
import type {User} from '../../interfaces/user.interface'
import {getUsers, deleteUser} from '../../services/users.service'
import UserForm from './UserForm'

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null> (null)
    const [openForm, setOpenForm] = useState(false)

    const loadUsers = async() => {
        const data = await getUsers()
        setUsers(data)
    }

    useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar el usuario?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Usuarios</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedUser(null);
            setOpenForm(true);
          }}
        >
          + Nuevo Usuario
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Edad</th>
            <th className="border p-2">Activo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.last}</td>
              <td className="border p-2">{u.age}</td>
              <td className="border p-2">
                {u.isActive ? "✅" : "❌"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setSelectedUser(u);
                    setOpenForm(true);
                  }}
                >
                  ✏
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(u.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openForm && (
        <UserForm
          user={selectedUser}
          onClose={() => setOpenForm(false)}
          onSaved={loadUsers}
        />
      )}
    </div>
  );
    
}
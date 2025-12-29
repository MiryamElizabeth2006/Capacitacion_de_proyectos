import { useState } from "react";
import type { Product } from "../../interfaces/product.interface";
import { createProduct, updateProduct } from "../../services/products.service";

interface Props {
    product: Product | null
    onClose: () => void
    onSaved: () => void
}

export default function ProductForm({product, onClose, onSaved}: Props) {
    const [form, setForm] = useState<Partial<Product>> (
        product || {isActive: true}
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target
        setForm({
            ...form, 
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async () => {
        if(!form.name || !form.price || !form.description) {
            alert('Completa los campos obligatorios')
            return
        }
        if(product) {
            await updateProduct(product.id, form)
        }else{
            await createProduct(form)
        }
        onSaved()
        onClose()
    }

    return(
         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-4">
          {product ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <input
          name="name"
          placeholder="Nombre"
          className="border p-2 w-full mb-2"
          value={form.name || ""}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Precio"
          className="border p-2 w-full mb-2"
          value={form.price || ""}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Descripción"
          className="border p-2 w-full mb-2"
          value={form.description || ""}
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
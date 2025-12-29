import {useEffect, useState} from 'react'
import type {Product} from '../../interfaces/product.interface'
import {getProducts, deleteProduct} from '../../services/products.service'
import ProductForm from './ProductForm'

export default function ProductPage() {
    const [products, setProduct] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [openForm, setOpenForm] = useState(false)

    const loadProduct = async () => {
        const data = await getProducts()
        setProduct(data)
    }

    useEffect(() => {
        loadProduct()
    },[])

    const handleDelete = async (id: number) => {
        if(confirm('¿Eliminar usuario?')){
            await deleteProduct(id)
            loadProduct()
        }
    }

    return (
        <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Productos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setSelectedProduct(null);
            setOpenForm(true);
          }}
        >
          + Nuevo Producto
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Producto</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Activo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.price}</td>
              <td className="border p-2">{u.description}</td>
              <td className="border p-2">
                {u.isActive ? "✅" : "❌"}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setSelectedProduct(u);
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
        <ProductForm
          product={selectedProduct}
          onClose={() => setOpenForm(false)}
          onSaved={loadProduct}
        />
      )}
    </div>
    )
}
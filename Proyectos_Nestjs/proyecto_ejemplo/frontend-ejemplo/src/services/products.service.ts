import {api} from '../api/api'
import type {Product} from '../interfaces/product.interface'

export const getProducts = async (): Promise<Product[]> => {
    const {data} = await api.get('/products')
    return data
}

export const createProduct = async (product: Partial<Product>) => {
    const {data} = await api.post('/products', product)
    return data
}

export const updateProduct = async (id: number, product: Partial<Product>) => {
    const {data} = await api.patch(`/products/${id}`, product)
    return data
}

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`)
}
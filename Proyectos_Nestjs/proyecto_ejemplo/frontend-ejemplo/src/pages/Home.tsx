import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Panel Principal
                </h1>

                <div className="flex flex-col gap-4">
                {/* Botón Usuarios */}
                <button
                    onClick={() => navigate("/users")}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                            hover:bg-blue-700 transition duration-300"
                >
                    Gestión de Usuarios
                </button>

                {/* Botón Productos */}
                <button
                    onClick={() => navigate("/products")}
                    className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold
                            hover:bg-green-700 transition duration-300"
                >
                    Gestión de Productos
                </button>
                </div>
            </div>
        </div>
    )
}

export default Home


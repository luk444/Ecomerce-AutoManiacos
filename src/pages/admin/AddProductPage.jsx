import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList = [
    {
        name: 'Selecciona Categoria'
    },
    {
        name: 'Bujias'
    },
    {
        name: 'Bombas'
    },
    {
        name: 'Juntas'
    },
    {
        name: 'Correas'
    },
    {
        name: 'Arbol de Leva'
    }
]

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity : 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProductFunction = async () => {
        // Validación de campos
        if (
            product.title === "" ||
            product.price === "" ||
            product.productImageUrl === "" ||
            product.category === "Selecciona Categoria" ||  // incluir la opción de no selección
            product.description === ""
        ) {
            return toast.error("Todos los campos son obligatorios");
        }
    
        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Producto Agregado con Éxito");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Error al agregar el Producto");
        }
    }
    
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-red-50 px-8 py-6 border border-red-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-red-500 '>
                            Añadir Producto
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="Titulo"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Titulo del Producto'
                            className='bg-red-50 border text-red-300 border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="Numero"
                            name="Precio"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Precio del Producto'
                            className='bg-red-50 border text-red-300 border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="Url de la imagen del producto"
                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-red-50 border text-red-300 border-red-200 px-2 py-2 w-96 rounded-md outline-none placeholder-red-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-red-300 bg-red-50 border border-red-200 rounded-md outline-none  ">
                            <option disabled>Selecciona la Categoria del Producto</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    description: e.target.value
                                })
                            }} name="Descripcion" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-red-300 bg-red-50 border border-red-200 rounded-md outline-none placeholder-red-300 ">

                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addProductFunction}
                            type='button'
                            className='bg-red-500 hover:bg-red-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
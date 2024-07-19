import { useNavigate } from "react-router-dom";

// category 
const category = [
    {
        image: 'data:image/png;base64,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',
        name: 'Bujias'
    },
    {
        image: 'https://static.vecteezy.com/system/resources/previews/014/684/057/non_2x/car-oil-pump-icon-cartoon-style-vector.jpg',
        name: 'Bombas'
    },
    {
        image: 'https://static.vecteezy.com/system/resources/previews/005/723/343/non_2x/engine-gasket-car-icon-black-color-illustration-image-flat-style-vector.jpg',
        name: 'Juntas'
    },
    {
        image: 'https://static.vecteezy.com/system/resources/previews/008/110/768/original/timing-belt-line-icon-free-vector.jpg',
        name: 'Correas'
    },
    {
        image: 'https://www.shutterstock.com/image-vector/camshaft-vector-art-style-260nw-2263490469.jpg',
        name: 'Arbol de Leva'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll lg:justify-center  hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex ">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                    {/* Image  */}
                                    <div
                                    onClick={()=> navigate(`/category/${item.name}`)}
                                     className=" w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full  bg-red-500 transition-all hover:bg-red-400 cursor-pointer mb-1 " >
                                        <div className="flex justify-center mb-12">
                                            {/* Image tag  */}
                                            <img src={item.image} alt="img" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className=' text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase '>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;
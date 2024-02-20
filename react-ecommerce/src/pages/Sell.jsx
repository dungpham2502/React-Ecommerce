import { useEffect, useState } from "react";
import { addDoc, getDocs, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

function Sell() {
    const navigate = useNavigate();

    const productsRef = collection(db, "products");
    const categoriesRef = collection(db, "categories");

    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("laptops");
    const [isNew, setIsNew] = useState(false);
    const [price, setPrice] = useState("");

    useEffect(() => {
        const getCategoryList = async () => {
            const data = await getDocs(categoriesRef);
            const categories = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCategoryList(categories);
        };
        getCategoryList();
    }, []);

    const findId = (categories, name) => {
        const category = categories.find(category => category.name === name);
        return category ? category.id : undefined;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryId = findId(categoryList, category);
        try {
            await addDoc(productsRef, {
                name,
                category: `/categories/${categoryId}`,
                isNew,
                price: Number(price),
                createdAt: serverTimestamp() 
            });
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Sell Your Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="laptops">Laptops</option>
                        <option value="tablets">Tablets</option>
                        <option value="smartphones">Smartphones</option>
                    </select>
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="isNew"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="mr-2 leading-tight"
                    />
                    <label htmlFor="isNew" className="text-gray-700 text-sm font-bold">Is New</label>
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Sell;
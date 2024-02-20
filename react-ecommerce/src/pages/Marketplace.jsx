import { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Marketplace() {
    const imgSrc = {
        laptops: "/laptop.webp",
        tablets: "/tablet.webp",
        smartphones: "/smartphone.webp",
        bill: "/bill.jpeg",
        kiet: "/kiet.jpg"
    };

    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const productsRef = collection(db, 'products');
    const categoriesRef = collection(db, 'categories');

    const getCategories = async () => {
    try {
        const data = await getDocs(categoriesRef);
        const categories = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setCategoryList(categories);
        console.log(categoryList);
        return categories; 
    } catch (err) {
        console.error("Error fetching categories:", err);
        return []; 
    }
};


    const getProducts = async (categories) => {
    try {
        const q = query(productsRef, orderBy("createdAt"));
        const data = await getDocs(q);
        setProductList(data.docs.map(doc => {
            const product = { ...doc.data(), id: doc.id };
            console.log(product)
            const category = categories.find(cat => `${cat.id}` === product.category.split('/').pop());
            console.log(category)
            return { ...product, category: category?.name || 'Unknown' };
        }));
    } catch (err) {
        console.error("Error fetching products:", err);
    }
};



    useEffect(() => {
        const fetchData = async () => {
        const categories = await getCategories(); // Ensure getCategories returns the categories
        getProducts(categories); // Pass the categories directly
    };

        fetchData();
    }, []);


    const getImageSrcByCategory = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case 'laptops':
                return imgSrc.laptops;
            case 'tablets':
                return imgSrc.tablets;
            case 'smartphones':
                return imgSrc.smartphones;
            case 'bill':
                return imgSrc.bill;
            case 'kiet':
                return imgSrc.kiet;
            default:
                return '/public/placeholder.webp'; // default image if no category match
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6 mt-6">Bán Dâm</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-8">
                {productList.map(product => (
                    <div key={product.id} className="border rounded shadow p-4 flex flex-col items-center">
                        <img
                            src={getImageSrcByCategory(product.category)}
                            alt={product.name}
                            className="w-full h-64 object-contain mb-4"
                        />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-700">${product.price}</p>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Marketplace;

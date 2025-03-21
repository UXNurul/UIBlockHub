import { useState, useEffect } from "react";
import axios, { } from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

interface Data {
    id: number;
    framework: string;
    type: string;
    variant: string;
    html: string;
}

export default function Components() {
    const navigate = useNavigate();
    const [items, setItems] = useState<Data[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(API_URL);
            setItems(res.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleEdit = (item: Data) => {
        navigate('/admin/components/edit', { state: { item } });
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}`, {
                headers: { 'Content-Type': 'application/json' },
                data: { id }
            });
            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting data", error);
        }
    };

    const handleAdd = () => {
        navigate('/admin/components/add'); 
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-center">Components</h1>
            <button
                onClick={() => handleAdd()}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
                Add
            </button>
            </div>

            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.id} className="border p-4 rounded-lg bg-white flex justify-between items-center shadow">
                        <div>
                            <p className="font-bold">Id: <span className="text-gray-700">{item.id}</span></p>
                            <p className="font-bold">Framework: <span className="text-gray-700">{item.framework}</span></p>
                            <p className="font-bold">Type: <span className="text-gray-700">{item.type}</span></p>
                            <p className="font-bold">Variant: <span className="text-gray-700">{item.variant}</span></p>
                            <p className="font-bold">HTML: <span className="text-gray-700">{item.html}</span></p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

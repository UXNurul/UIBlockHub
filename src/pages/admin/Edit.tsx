import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

interface Data {
    id: number;
    framework: string;
    type: string;
    variant: string;
    html: string;
}

const Edit = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const item = (location.state as { item?: Data })?.item;
    const [items, setItems] = useState<Data[]>([]);
    const [form, setForm] = useState(item || {id: "", framework: "", type: "", variant: "", html: ""});

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
          const updateData = { ...form };
          console.log('Sending PUT data:', updateData);
          const res = await axios.put<Data>(API_URL, updateData, {
            headers: { 'Content-Type': 'application/json' }
          });
          console.log('PUT response:', res.data);
          setItems(items.map(item => (item.id === form.id ? res.data : item)));
          setForm({ ...form });
          navigate('/admin/components'); 
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string; details?: string }>;
          console.error('PUT error:', axiosError.response?.data);
        }
      };

      const handleCancel = async () => {
        navigate('/admin/components'); 
      }

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Edit Component</h1>

            {/* Form */}
            <div className="mb-4">
                <input
                    type="text"
                    name="framework"
                    placeholder="Framework"
                    value={form.framework}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded mb-2"
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    value={form.type}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded mb-2"
                />
                <input
                    type="text"
                    name="variant"
                    placeholder="Variant"
                    value={form.variant}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded mb-2"
                />
                <textarea
                    name="html"
                    placeholder="HTML content"
                    value={form.html}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 w-full rounded mb-2"
                ></textarea>

             
                <div className="flex justify-between space-x-2">


                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Update
                    </button>

                    <button
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>

                </div>
            </div>


        </div>
    );
}

export default Edit;
interface Data {
    id: number;
    type: string;
    variant: string;
    html: string;
}

const API_URL = import.meta.env.VITE_API;
const fetchItemsFromAPI = async (): Promise<Data[]> => {
    const response = await fetch(API_URL); // Public files are accessible from root
    console.log('response', response);
    if (!response.ok) throw new Error("Failed to load JSON");
    const data = response.json();
    return data;
};


export default fetchItemsFromAPI;
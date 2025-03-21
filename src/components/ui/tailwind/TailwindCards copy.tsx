import { useEffect, useState } from "react";
import TailwindTabs from "./TailwindTabs";
import fetchItemsFromAPI from "../../../services/api/fetchItemsFromAPI";
import htmlToJsx from "../../../services/convert/htmlToJsx";

interface Data {
    id: number;
    type: string;
    variant: string;
    html: string;
}
const TailwindCards = () => {
    const [groupedItems, setGroupedItems] = useState<Record<string, Data[]>>({});

    const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "html" | "jsx">>({});

    useEffect(() => {
        const fetchData = async () => {
            const items = await fetchItemsFromAPI();

            console.log('items', items)
            const grouped = items.reduce<Record<string, Data[]>>((acc, btn) => {
                if (!acc[btn.variant]) acc[btn.variant] = [];
                acc[btn.variant].push(btn);
                return acc;
            }, {});

            setGroupedItems(grouped);

            const initialTabs = Object.keys(grouped).reduce<Record<string, "preview" | "html" | "jsx">>(
                (acc, variant) => ({ ...acc, [variant]: "preview" }),
                {}
            );
            setActiveTabs(initialTabs);
        };

        fetchData();
    }, []);


    

    return (
        <div>
            {Object.entries(groupedItems).map(([variant, items]) => (
                <div key={variant} className="mb-4">
                    <h5 className="font-semibold mb-2 text-xl">{variant.replace(/^\w/, (c) => c.toUpperCase())}</h5>

                    <TailwindTabs
                        activeTab={activeTabs[variant] || "preview"}
                        setActiveTab={(tab) => {
                            setActiveTabs((prev) => {
                                return {
                                    ...prev,
                                    [variant]: tab as "preview" | "html" | "jsx",
                                };
                            });
                        }}
                    >
                        {{
                            preview: (
                                <div className="border border-gray-500 rounded-lg p-3 flex flex-wrap gap-3 items-center">
                                    {items.map((item) => (
                                        <div key={item.id} dangerouslySetInnerHTML={{ __html: item.html }} />
                                    ))}
                                </div>
                            ),
                            html: (
                                <pre className="bg-black text-white px-7 py-12 rounded m-0 text-sm overflow-x-auto whitespace-pre-wrap">
                                    {items.map((item) => item.html).join("\n")}
                                </pre>
                            ),
                            jsx: (
                                <pre className="bg-black text-white px-7 py-12 rounded m-0 text-sm overflow-x-auto whitespace-pre-wrap">
                                   {items.map((item) => htmlToJsx(item.html)).join("\n")}
                                </pre>
                            ),

                        }}
                    </TailwindTabs>
                </div>
            ))}
        </div>
    );
};

export default TailwindCards;

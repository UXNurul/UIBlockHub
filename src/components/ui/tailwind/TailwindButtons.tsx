import { useEffect, useState } from "react";
import TailwindTabs from "./TailwindTabs";

interface ButtonData {
    id: number;
    label: string;
    class: string;
    css?: string;
    variant: string;
}

const fetchButtonsFromAPI = async (): Promise<ButtonData[]> => {
    return [
        { id: 1, label: "Primary", class: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer", variant: "default" },
        { id: 2, label: "Secondary", class: "px-5 py-2.5 text-sm font-medium text-white focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-500 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer", variant: "default" },
        { id: 3, label: "Success", class: "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer", variant: "default" },
        { id: 4, label: "Purple to Blue", class: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer", css: "", variant: "gradient" },
        { id: 5, label: "Cyan to Blue", class: "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer", css: "", variant: "gradient" },

    ];
};

const TailwindButtons = () => {
    const [groupedButtons, setGroupedButtons] = useState<Record<string, ButtonData[]>>({});

    const [activeTabs, setActiveTabs] = useState<Record<string, "preview" | "html" | "jsx">>({});

    useEffect(() => {
        const fetchData = async () => {
            const buttons = await fetchButtonsFromAPI();

            const grouped = buttons.reduce<Record<string, ButtonData[]>>((acc, btn) => {
                if (!acc[btn.variant]) acc[btn.variant] = [];
                acc[btn.variant].push(btn);
                return acc;
            }, {});

            setGroupedButtons(grouped);

            const initialTabs = Object.keys(grouped).reduce<Record<string, "preview" | "html" | "jsx">>(
                (acc, variant) => ({ ...acc, [variant]: "preview" }),
                {}
            );
            setActiveTabs(initialTabs);
        };

        fetchData();
    }, []);

    const parseCSS = (css?: string): React.CSSProperties => {
        if (!css) return {};
        return css.split(";").reduce((acc, rule) => {
            if (rule.trim()) {
                const [key, value] = rule.split(":").map((s) => s.trim());
                if (key && value) {
                    const camelCasedKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    acc[camelCasedKey as keyof React.CSSProperties] = value;
                }
            }
            return acc;
        }, {} as React.CSSProperties);
    };

    return (
        <div>
            {Object.entries(groupedButtons).map(([variant, buttons]) => (
                <div key={variant} className="mb-4">
                    <h5 className="font-semibold mb-2 text-xl">{variant.replace(/^\w/, (c) => c.toUpperCase())} Buttons</h5>

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
                                <div className="border border-gray-500 rounded-lg p-3 flex flex-wrap gap-1 items-center">
                                    {buttons.map((btn) => (
                                        <button key={btn.id} className={btn.class} style={parseCSS(btn.css)}>
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            ),
                            html: (
                                <pre className="bg-black text-white px-7 py-12 rounded m-0 text-sm overflow-x-auto whitespace-pre-wrap">
                                    {buttons.map((btn) => `<button class="${btn.class}"${btn.css ? ` style="${btn.css}"` : ""}>${btn.label}</button>`).join("\n")}
                                </pre>
                            ),
                            jsx: (
                                <pre className="bg-black text-white px-7 py-12 rounded m-0 text-sm overflow-x-auto whitespace-pre-wrap">
                                    {buttons.map((btn) => {
                                        const styleObject = parseCSS(btn.css);
                                        return `<button className="${btn.class}"${btn.css ? ` style={${JSON.stringify(styleObject)}}` : ""}>${btn.label}</button>`;
                                    }).join("\n")}
                                </pre>
                            ),

                        }}
                    </TailwindTabs>
                </div>
            ))}
        </div>
    );
};

export default TailwindButtons;

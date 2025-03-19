import { useEffect, useState } from "react";
import BootstrapTabs from "./BootstrapTabs";

interface ButtonData {
    id: number;
    label: string;
    class: string;
    css?: string;
    variant: string;
}

// ✅ Simulated API Response (Replace with actual API fetch)
const fetchButtonsFromAPI = async (): Promise<ButtonData[]> => {
    return [
        { id: 1, label: "Primary", class: "btn btn-primary", variant: "default" },
        { id: 2, label: "Secondary", class: "btn btn-secondary", variant: "default" },
        { id: 3, label: "Success", class: "btn btn-success", variant: "default" },
        { id: 4, label: "Gradient Blue", class: "btn btn-primary text-white", css: "background: linear-gradient(to right, #007bff, #0056b3); border: none;", variant: "gradient" },
        { id: 5, label: "Gradient Red", class: "btn btn-danger text-white", css: "background: linear-gradient(to right, #ff0000, #b30000); border: none;", variant: "gradient" },
        { id: 6, label: "Custom Purple", class: "btn text-white", css: "background: purple; border: none;", variant: "custom" },
    ];
};

const BootstrapButtonGroups = ({ activeTab, setActiveTab }: {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<"preview" | "html" | "jsx">>;
}) => {
    const [groupedButtons, setGroupedButtons] = useState<Record<string, ButtonData[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            const buttons = await fetchButtonsFromAPI();

            // 🔥 Group buttons dynamically by 'variant'
            const grouped = buttons.reduce<Record<string, ButtonData[]>>((acc, btn) => {
                if (!acc[btn.variant]) acc[btn.variant] = [];
                acc[btn.variant].push(btn);
                return acc;
            }, {});

            setGroupedButtons(grouped);
        };

        fetchData();
    }, []);

    const parseCSS = (css?: string): React.CSSProperties => {
        if (!css) return {};
        return css.split(";").reduce((acc, rule) => {
            if (rule.trim()) {
                const [key, value] = rule.split(":").map((s) => s.trim());
                if (key && value) {
                    // Convert CSS property to camelCase (React requires it)
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
                    <h5 className="fw-semibold mb-2">{variant.replace(/^\w/, (c) => c.toUpperCase())} Buttons</h5>

                    <BootstrapTabs activeTab={activeTab} setActiveTab={setActiveTab}>
                        {{
                            preview: (
                                <div className="border rounded-3 p-3 d-flex gap-2">
                                    {buttons.map((btn) => (
                                        <button key={btn.id} className={btn.class} style={parseCSS(btn.css)}>
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            ),
                            html: (
                                <pre className="bg-dark text-white px-4 py-5 rounded m-0">
                                    {buttons.map((btn) => `<button class="${btn.class}"${btn.css ? ` style="${btn.css}"` : ""}>${btn.label}</button>`).join("\n")}
                                </pre>
                            ),
                            jsx: (
                                <pre className="bg-dark text-white px-4 py-5 rounded m-0">
                                    {buttons.map((btn) => {
                                        const styleObject = parseCSS(btn.css); // Convert CSS string to object
                                        return `<button className="${btn.class}"${btn.css ? `style={${JSON.stringify(styleObject)}}` : ""}>${btn.label}</button>`;
                                    }).join("\n")}
                                </pre>
                            ),

                        }}
                    </BootstrapTabs>
                </div>
            ))}
        </div>
    );
};

export default BootstrapButtonGroups;

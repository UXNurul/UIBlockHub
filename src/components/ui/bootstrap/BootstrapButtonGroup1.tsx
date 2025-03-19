import { useState } from "react";

const BootstrapButtonGroup = ({ title, variant }: { title: string; variant: string }) => {
    const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'jsx'>("preview");
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    const copyToClipboard = (code: "html" | "jsx") => {
        const codeFormat = generateCode(code, variant);
        navigator.clipboard.writeText(codeFormat).then(() => {
            setCopyMessage(`Bootstrap ${code.toUpperCase()} copied!`);
            setTimeout(() => setCopyMessage(null), 3000);
        });
    };

    const parseCSS = (css: string): React.CSSProperties => {
        return css.split(';').reduce((acc, rule) => {
            if (rule.trim()) {
                const [key, value] = rule.split(':').map((s) => s.trim());
                if (key && value) {
                    acc[key as keyof React.CSSProperties] = value;
                }
            }
            return acc;
        }, {} as React.CSSProperties);
    };
    
    const generateCode = (code: "html" | "jsx", variant: string) => {
        return bootstrapButtons
            .filter(btn => btn.variant === variant)
            .map(btn => {
                if (code === "jsx") {
                    return `<button className="${btn.class}"${btn.css ? ` style={{ ${btn.css
                        .split(";")
                        .filter(rule => rule.trim())
                        .map(rule => {
                            const [key, value] = rule.split(":").map(s => s.trim());
                            return `"${key.replace(/-./g, match => match[1].toUpperCase())}": "${value}"`;
                        })
                        .join(", ")} }}` : ""}>${btn.label}</button>`;
                } else {
                    return `<button class="${btn.class}"${btn.css ? ` style="${btn.css}"` : ""}>${btn.label}</button>`;
                }
            })
            .join("\n");
    };
    


    const bootstrapButtons = [
        { id: 1, label: "Primary", class: "btn btn-primary", css: '', variant: "default" },
        { id: 2, label: "Secondary", class: "btn btn-secondary", css: '', variant: "default" },
        { id: 3, label: "Success", class: "btn btn-success", css: '', variant: "default" },
        {
            id: 4,
            label: "Gradient Blue",
            class: "btn btn-primary text-white",
            css: "background: linear-gradient(to right, #007bff, #0056b3); border: none;",
            variant: "gradient"
        },
        {
            id: 5,
            label: "Gradient Red",
            class: "btn btn-danger text-white",
            css: "background: linear-gradient(to right, #ff0000, #b30000); border: none;",
            variant: "gradient"
        }
    ];

    return (
        <div>
            <h5 className="fw-semibold mb-2">{title}</h5>
            <div className="border rounded-3 p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="bg-secondary p-1 rounded-2">
                        {["preview", "html", "jsx"].map((tab) => (
                            <button
                                key={tab}
                                className={`btn-sm btn rounded-2 border-0 ${activeTab === tab ? "bg-white" : "bg-secondary"}`}
                                onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {copyMessage && <div className="text-success">{copyMessage}</div>}

                    <div className="d-flex align-items-center gap-2">
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("html")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("jsx")}>
                            Copy JSX
                        </button>
                    </div>
                </div>

                {activeTab === "preview" && (
                    <div className="border rounded-3 p-3 d-flex gap-2">
                        {bootstrapButtons
                            .filter(btn => btn.variant === variant)
                            .map((btn) => (
                                <button
                                    key={btn.id}
                                    className={btn.class}
                                    style={btn.css ? parseCSS(btn.css) : undefined}
                                >
                                    {btn.label}
                                </button>
                            ))}
                    </div>
                )}

                {activeTab === "html" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("html", variant)}
                    </pre>
                )}

                {activeTab === "jsx" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("jsx", variant)}
                    </pre>
                )}
            </div>
        </div>
    );
};


export default BootstrapButtonGroup;
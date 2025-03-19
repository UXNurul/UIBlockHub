import { useState } from "react";

const BootstrapButtonsHtml = () => {
    const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'jsx'>("preview");
    const [activeTabAnother, setActiveTabAnother] = useState<'preview' | 'html' | 'jsx'>("preview");
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const bootstrapButtons = [
        { id: 1, label: "Primary", className: "btn btn-primary", customCSS: '', variant: "default" },
        { id: 2, label: "Secondary", className: "btn btn-secondary", customCSS: '', variant: "default" },
        { id: 3, label: "Success", className: "btn btn-success", customCSS: '', variant: "default" },
        {
            id: 4,
            label: "Gradient Blue",
            className: "btn btn-primary text-white",
            customCSS: "background: linear-gradient(to right, #007bff, #0056b3); border: none;",
            variant: "gradient"
        },
        {
            id: 5,
            label: "Gradient Red",
            className: "btn btn-danger text-white",
            customCSS: "background: linear-gradient(to right, #ff0000, #b30000); border: none;",
            variant: "gradient"
        }
    ];

    // Function to convert CSS string to object
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
        return bootstrapButtons.filter(btn => btn.variant === variant).map(btn => `<button ${code === "jsx" ? "className" : "class"}="${btn.className}">${btn.label}</button>`).join("\n");
    };

    const copyToClipboard = (code: "html" | "jsx", variant: string) => {
        const codeFormat = generateCode(code, variant);
        navigator.clipboard.writeText(codeFormat).then(() => {
            setCopyMessage(`Bootstrap ${code.toUpperCase()} copied!`);
            setTimeout(() => setCopyMessage(null), 3000); // Hide message after 2 seconds
        });
    };

    return (
        <div>

            <h5 className="fw-semibold mb-2">Default Buttons</h5>
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

                    {/* Copy Notification */}
                    {copyMessage && <div className="text-success">{copyMessage}</div>}

                    <div className="d-flex align-items-center gap-2">
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("html", "default")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("jsx", "default")}>
                            Copy JSX
                        </button>
                    </div>
                </div>


                {activeTab === "preview" && <div className="border rounded-3 p-3 d-flex gap-2">
                    {bootstrapButtons.filter(btn => btn.variant === "default").map((btn) => (
                        <button
                            key={btn.id}
                            className={btn.className}
                            style={btn.customCSS ? parseCSS(btn.customCSS) : undefined}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>}

                {activeTab === "html" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("html", "default")}
                    </pre>
                )}

                {activeTab === "jsx" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("jsx", "default")}
                    </pre>
                )}

            </div>



            <h5 className="fw-semibold my-3">Gradient Buttons</h5>
            <div className="border rounded-3 p-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="bg-secondary p-1 rounded-2">
                        {["preview", "html", "jsx"].map((tab) => (
                            <button
                                key={tab}
                                className={`btn-sm btn rounded-2 border-0 ${activeTabAnother === tab ? "bg-white" : "bg-secondary"}`}
                                onClick={() => setActiveTabAnother(tab as "preview" | "html" | "jsx")}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Copy Notification */}
                    {copyMessage && <div className="text-success">{copyMessage}</div>}

                    <div className="d-flex align-items-center gap-2">
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("html", "gradient")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-2 btn-sm btn" onClick={() => copyToClipboard("jsx", "gradient")}>
                            Copy JSX
                        </button>
                    </div>
                </div>
                {activeTabAnother === "preview" && <div className="border rounded-3 p-3 d-flex gap-2">
                    {bootstrapButtons.filter(btn => btn.variant === "gradient").map((btn) => (
                        <button
                            key={btn.id}
                            className={btn.className}
                            style={btn.customCSS ? parseCSS(btn.customCSS) : undefined}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>}
                {activeTabAnother === "html" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("html", "gradient")}
                    </pre>
                )}

                {activeTabAnother === "jsx" && (
                    <pre className="bg-dark text-white p-4 rounded m-0">
                        {generateCode("jsx", "gradient")}
                    </pre>
                )}
            </div>


        </div>
    );
};

export default BootstrapButtonsHtml;

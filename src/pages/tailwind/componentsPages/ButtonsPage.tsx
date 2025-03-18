import { useEffect, useRef, useState } from "react";

const ButtonsPage = () => {
    const [selectedFramework, setSelectedFramework] = useState<"tailwind" | "bootstrap">("tailwind");
    const iframeRef = useRef(null);
    const [activeTab, setActiveTab] = useState<"preview" | "html" | "jsx">("preview");
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const bootstrapButtons = [
        { id: 1, label: "Primary", className: "btn btn-primary", type: "default" },
        { id: 2, label: "Secondary", className: "btn btn-secondary", type: "default" },
        { id: 3, label: "Success", className: "btn btn-success", type: "default" },
        { id: 4, label: "Gradient Blue", className: "btn btn-primary text-white", type: "gradient" },
        { id: 5, label: "Gradient Red", className: "btn btn-danger text-white", type: "gradient" }
    ];

    const tailwindButtons = [
        { id: 1, label: "Primary", className: "bg-blue-500 text-white", type: "default" },
        { id: 2, label: "Secondary", className: "bg-gray-500 text-white", type: "default" },
        { id: 3, label: "Success", className: "bg-green-500 text-white", type: "default" },
        { id: 4, label: "Gradient Blue", className: "bg-gradient-to-r from-blue-500 to-blue-700 text-white", type: "gradient" },
        { id: 5, label: "Gradient Red", className: "bg-gradient-to-r from-red-500 to-red-700 text-white", type: "gradient" }
    ];

    useEffect(() => {
        if (selectedFramework === "bootstrap") {
            const bootstrapCDN = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
            const iframe = iframeRef.current;
            const doc = iframe?.contentWindow?.document;

            if (doc) {
                doc.open();
                doc.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="${bootstrapCDN}" />
                    </head>
                    <body>
                        <h5 class="fw-semibold my-3">Default Buttons</h5>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                            ${bootstrapButtons
                        .filter(btn => btn.type === "default")
                        .map(btn => `<button class="${btn.className}">${btn.label}</button>`)
                        .join("")}
                        </div>

                        <h5 class="fw-semibold my-3">Gradient Buttons</h5>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                            ${bootstrapButtons
                        .filter(btn => btn.type === "gradient")
                        .map(btn => `<button class="${btn.className}" style="background: linear-gradient(to right, #007bff, #0056b3); border: none;">${btn.label}</button>`)
                        .join("")}
                        </div>
                    </body>
                    </html>
                `);
                doc.close();
            }
        }
    }, [selectedFramework]);

    const generateCode = (type: "html" | "jsx") => {
        return tailwindButtons.map(btn => `<button ${type === "jsx" ? "className" : "class"}="${btn.className}">${btn.label}</button>`).join("\n");
    };

    const copyToClipboard = (type: "html" | "jsx") => {
        const code = generateCode(type);
        navigator.clipboard.writeText(code).then(() => {            
            setCopyMessage(`Tailwind ${type.toUpperCase()} copied to clipboard!`);
            setTimeout(() => setCopyMessage(null), 3000); // Hide message after 2 seconds
        });
    };

    return (
        <div>

            <h2 className="text-2xl font-semibold mb-4">Buttons Components</h2>

            {/* Framework Selector Tabs */}
            <div className="flex border-b mb-4">
                {["tailwind", "bootstrap"].map((framework) => (
                    <button
                        key={framework}
                        className={`px-4 py-2 border-b-2 ${selectedFramework === framework ? "border-blue-500 font-semibold" : "border-transparent"}`}
                        onClick={() => setSelectedFramework(framework as "tailwind" | "bootstrap")}
                    >
                        {framework === "tailwind" ? "Tailwind v4" : "Bootstrap v5"}
                    </button>
                ))}
            </div>

            <div className="bg-gray-300 p-1 rounded-lg">
                {["preview", "html", "jsx"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded-lg transition text-sm cursor-pointer ${activeTab === tab ? "bg-white" : ""}`}
                        onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {copyMessage && <div className="text-green-600">{copyMessage}</div>}

            <div className="flex items-center gap-3">
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("html")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("jsx")}>
                            Copy JSX
                        </button>
                    </div>

            {activeTab === "html" && (
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                    {generateCode("html")}
                </pre>
            )}

            {activeTab === "jsx" && (
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                    {generateCode("jsx")}
                </pre>
            )}

            {selectedFramework === "tailwind" && <div>
                <h5 className="text-xl font-semibold my-4">Default Buttons</h5>
                <div className="p-5 border rounded-lg">
                    <div className="border p-6 rounded-lg shadow-md bg-white flex gap-3 flex-wrap">
                        {selectedFramework === "tailwind" &&
                            tailwindButtons.filter(btn => btn.type === "default").map(btn => (
                                <button key={btn.id} className={`px-4 py-2 rounded ${btn.className}`}>{btn.label}</button>
                            ))
                        }
                    </div>
                </div>

                <h5 className="text-xl font-semibold my-4">Gradient Buttons</h5>
                <div className="p-5 border rounded-lg">
                    <div className="border p-6 rounded-lg shadow-md bg-white flex gap-3 flex-wrap">
                        {selectedFramework === "tailwind" &&
                            tailwindButtons.filter(btn => btn.type === "gradient").map(btn => (
                                <button key={btn.id} className={`px-4 py-2 rounded ${btn.className}`}>{btn.label}</button>
                            ))
                        }
                    </div>
                </div>
            </div>}

            {selectedFramework === "bootstrap" && <iframe ref={iframeRef} style={{ width: "100%", height: "200px", border: "none" }} />}

        </div>
    );
};

export default ButtonsPage;

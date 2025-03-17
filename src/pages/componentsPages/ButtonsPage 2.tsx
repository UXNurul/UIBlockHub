import { useState, useEffect, useRef } from "react";

export default function ButtonsPage() {
    const [selectedFramework, setSelectedFramework] = useState<"tailwind" | "bootstrap">("tailwind");
    const [activeTab, setActiveTab] = useState<"preview" | "html" | "jsx">("preview");
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const bootstrapCDN = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

    const tailwindButtons = [
        { id: 1, className: "bg-blue-500 text-white", label: "Primary" },
        { id: 2, className: "bg-gray-500 text-white", label: "Secondary" },
        { id: 3, className: "bg-green-500 text-white", label: "Success" },
        { id: 4, className: "bg-red-500 text-white", label: "Danger" },
        { id: 5, className: "border border-blue-500 text-blue-500", label: "Outline" }
    ];

    const bootstrapButtons = [
        { id: 1, className: "btn btn-primary", label: "Primary" },
        { id: 2, className: "btn btn-secondary", label: "Secondary" },
        { id: 3, className: "btn btn-success", label: "Success" },
        { id: 4, className: "btn btn-danger", label: "Danger" },
        { id: 5, className: "btn btn-outline-primary", label: "Outline" }
    ];

    useEffect(() => {
        if (selectedFramework === "bootstrap" && iframeRef.current) {
            const iframe = iframeRef.current;
            const doc = iframe.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="${bootstrapCDN}" />
                    </head>
                    <body>
                        ${bootstrapButtons.map(btn => `<button class="${btn.className}">${btn.label}</button>`).join("\n")}
                    </body>
                    </html>
                `);
                doc.close();
            }
        }
    }, [selectedFramework, activeTab]);

    const generateCode = (type: "html" | "jsx") => {
        return selectedFramework === "tailwind"
            ? tailwindButtons.map(btn => `<button ${type === "jsx" ? "className" : "class"}="${btn.className}">${btn.label}</button>`).join("\n")
            : bootstrapButtons.map(btn => `<button ${type === "jsx" ? "className" : "class"}="${btn.className}">${btn.label}</button>`).join("\n");
    };

    const copyToClipboard = (type: "html" | "jsx") => {
        const code = generateCode(type);
        navigator.clipboard.writeText(code).then(() => {
            const frameworkName = selectedFramework === "tailwind" ? "Tailwind" : "Bootstrap";
            setCopyMessage(`${frameworkName} ${type.toUpperCase()} copied to clipboard!`);
            setTimeout(() => setCopyMessage(null), 3000); // Hide message after 2 seconds
        });
    };

    return (
        <div className="p-8">
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

            <h5 className="text-xl font-semibold my-4">Default Buttons</h5>
            <div className="p-5 border rounded-lg">
                {/* Tab Navigation */}
                <div className="flex items-center justify-between mb-4">
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

                    {/* Copy Notification */}
                    {copyMessage && <div className="text-green-600">{copyMessage}</div>}

                    <div className="flex items-center gap-3">
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("html")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("jsx")}>
                            Copy JSX
                        </button>
                    </div>
                </div>

                {/* Preview Section */}
                {activeTab === "preview" && (
                    <div className="border p-6 rounded-lg shadow-md bg-white flex gap-3 flex-wrap">
                        {selectedFramework === "tailwind" ? (
                            tailwindButtons.map((btn) => (
                                <button key={btn.id} className={`px-4 py-2 rounded ${btn.className}`}>{btn.label}</button>
                            ))
                        ) : (
                            <iframe ref={iframeRef} id="bootstrapPreview" className="w-full h-10 rounded" />
                        )}
                    </div>
                )}

                {/* Code Sections */}
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
            </div>

            <h5 className="text-xl font-semibold my-4">Gradient Buttons</h5>
            <div className="p-5 border rounded-lg">
                {/* Tab Navigation */}
                <div className="flex items-center justify-between mb-4">
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

                    {/* Copy Notification */}
                    {copyMessage && <div className="text-green-600">{copyMessage}</div>}

                    <div className="flex items-center gap-3">
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("html")}>
                            Copy HTML
                        </button>
                        <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer" onClick={() => copyToClipboard("jsx")}>
                            Copy JSX
                        </button>
                    </div>
                </div>

                {/* Preview Section */}
                {activeTab === "preview" && (
                    <div className="border p-6 rounded-lg shadow-md bg-white flex gap-3 flex-wrap">
                        {selectedFramework === "tailwind" ? (
                            tailwindButtons.map((btn) => (
                                <button key={btn.id} className={`px-4 py-2 rounded ${btn.className}`}>{btn.label}</button>
                            ))
                        ) : (
                            <iframe ref={iframeRef} id="bootstrapPreview" className="w-full h-10 rounded" />
                        )}
                    </div>
                )}

                {/* Code Sections */}
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
            </div>

        </div>
    );
}

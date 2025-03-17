import { useState, useEffect, useRef } from "react";

export default function ButtonsPage() {
    const [selectedFramework, setSelectedFramework] = useState<"tailwind" | "bootstrap">("tailwind");
    const [activeTab, setActiveTab] = useState<"preview" | "html" | "jsx">("preview");
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const bootstrapCDN = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

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
                        <button class="btn btn-primary">Primary</button>
                        <button class="btn btn-secondary">Secondary</button>
                        <button class="btn btn-success">Success</button>
                        <button class="btn btn-danger">Danger</button>
                        <button class="btn btn-outline-primary">Outline</button>
                    </body>
                    </html>
                `);
                doc.close();
            }
        }
    }, [selectedFramework, activeTab]);

    // Button Variations
    const buttons = {
        tailwind: [
            { className: "bg-blue-500 text-white", label: "Primary" },
            { className: "bg-gray-500 text-white", label: "Secondary" },
            { className: "bg-green-500 text-white", label: "Success" },
            { className: "bg-red-500 text-white", label: "Danger" },
            { className: "border border-blue-500 text-blue-500", label: "Outline" },
        ]
    };

    return (
        <div className="p-5">
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

            <div className="p-5 border rounded-lg">
                {/* Tab Navigation */}
            <div className="flex justify-between mb-4">
                <div className="bg-gray-300 p-1 rounded-lg">
                {["preview", "html", "jsx"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-1 rounded-lg transition text-sm cursor-pointer ${activeTab === tab ? "bg-white" : "border-transparent"}`}
                        onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
                </div>

                <div className="flex items-center gap-3">
                <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer">Copy HTML</button>
                <button className="px-2 py-1 border rounded-lg text-sm cursor-pointer">Copy JSX</button>
                </div>
            </div>

            {/* Preview Section */}
            {activeTab === "preview" && (
                <div className="border p-6 rounded-lg shadow-md bg-white flex gap-3 flex-wrap">
                    {selectedFramework === "tailwind" ? (
                        buttons.tailwind.map((btn, index) => (
                            <button key={index} className={`px-4 py-2 rounded ${btn.className}`}>{btn.label}</button>
                        ))
                    ) : (
                        <iframe ref={iframeRef} id="bootstrapPreview" className="w-full h-10 rounded" />
                    )}
                </div>
            )}

            {/* Code Sections */}
            {activeTab === "html" && (
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                    {selectedFramework === "tailwind"
                        ? buttons.tailwind.map(btn => `<button class="${btn.className}">${btn.label}</button>`).join("\n")
                        : `<button class="btn btn-primary">Primary</button>\n<button class="btn btn-secondary">Secondary</button>\n<button class="btn btn-success">Success</button>\n<button class="btn btn-danger">Danger</button>\n<button class="btn btn-outline-primary">Outline</button>`
                    }
                </pre>
            )}

            {activeTab === "jsx" && (
                <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
                    {selectedFramework === "tailwind"
                        ? buttons.tailwind.map(btn => `<button className="${btn.className}">${btn.label}</button>`).join("\n")
                        : `<button className="btn btn-primary">Primary</button>\n<button className="btn btn-secondary">Secondary</button>\n<button className="btn btn-success">Success</button>\n<button className="btn btn-danger">Danger</button>\n<button className="btn btn-outline-primary">Outline</button>`
                    }
                </pre>
            )}
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";

export default function ComponentsPage() {
    const [selectedFramework, setSelectedFramework] = useState<"tailwind" | "bootstrap">("tailwind");
    const [showCode, setShowCode] = useState(false);

    // Tailwind Button Code
    const tailwindCodeHTML = `<button class="px-4 py-2 bg-blue-500 text-white rounded">Tailwind Button</button>`;
    const tailwindCodeJSX = `<button className="px-4 py-2 bg-blue-500 text-white rounded">Tailwind Button</button>`;

    // Bootstrap Button Code
    const bootstrapCodeHTML = `<button class="btn btn-primary">Bootstrap Button</button>`;
    const bootstrapCodeJSX = `<button className="btn btn-primary">Bootstrap Button</button>`;

    useEffect(() => {
        if (selectedFramework === "bootstrap") {
            const bootstrapCDN = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
            let iframe = document.getElementById("bootstrapPreview") as HTMLIFrameElement;

            if (iframe && iframe.contentWindow?.document) {
                const doc = iframe.contentWindow.document;
                doc.open();
                doc.write(`
                     <html>
        <head>
            <link rel="stylesheet" href="${bootstrapCDN}" />
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
            </style>
        </head>
        <body style="margin: 16px;">
            <button class="btn btn-primary">Bootstrap Button</button>
        </body>
    </html>
                `);
                doc.close();
            }
        }
    }, [selectedFramework]);

    // Function to Copy Code
    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Available Components</h2>

            {/* Framework Selector */}
            <div className="mb-4 flex gap-4">
                <label className="font-semibold">Select Framework:</label>
                <select
                    className="px-3 py-1 border rounded-md"
                    value={selectedFramework}
                    onChange={(e) => setSelectedFramework(e.target.value as "tailwind" | "bootstrap")}
                >
                    <option value="tailwind">Tailwind v4</option>
                    <option value="bootstrap">Bootstrap v5</option>
                </select>
            </div>

            {/* Preview Section */}
            <div className="border p-6 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                
                {selectedFramework === "tailwind" ? (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Tailwind Button</button>
                ) : (
                    <iframe
                        id="bootstrapPreview"
                        className="border rounded-md w-full h-16"
                        style={{ border: "1px solid #ccc" }}
                    ></iframe>
                )}
            </div>

            {/* Code View Section */}
            <div className="mt-6 border p-6 rounded-lg shadow-md bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Code</h3>
                    <button
                        className="px-3 py-1 text-sm bg-gray-200 rounded"
                        onClick={() => setShowCode(!showCode)}
                    >
                        {showCode ? "Hide Code" : "Show Code"}
                    </button>
                </div>

                {showCode && (
    <div className="bg-gray-800 text-white p-4 rounded">
        <div className="relative">
            <pre className="bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                {selectedFramework === "tailwind" ? tailwindCodeHTML : bootstrapCodeHTML}
            </pre>
            <button
                className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-white rounded text-sm"
                onClick={() => copyToClipboard(selectedFramework === "tailwind" ? tailwindCodeHTML : bootstrapCodeHTML)}
            >
                Copy HTML
            </button>
        </div>

        <div className="relative mt-4">
            <pre className="bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                {selectedFramework === "tailwind" ? tailwindCodeJSX : bootstrapCodeJSX}
            </pre>
            <button
                className="absolute top-2 right-2 px-3 py-1 bg-gray-700 text-white rounded text-sm"
                onClick={() => copyToClipboard(selectedFramework === "tailwind" ? tailwindCodeJSX : bootstrapCodeJSX)}
            >
                Copy JSX
            </button>
        </div>
    </div>
)}

            </div>
        </div>
    );
}

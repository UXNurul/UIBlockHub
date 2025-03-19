import { useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client"; // Import Root type
import BootstrapButtonsHtml from "../../components/ui/bootstrap/BootstrapButtonsHtml";

const BootstrapButtonsPage = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeDoc, setIframeDoc] = useState<Document | null>(null);
    const rootRef = useRef<Root | null>(null); // Store root instance
    const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'jsx'>("preview"); // Track active tab

    useEffect(() => {
        if (iframeRef.current) {
            const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(`
                    <html>
                        <head>
                            <link 
                                rel="stylesheet" 
                                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                            />
                        </head>
                        <body>
                            <div id="react-root"></div>
                        </body>
                    </html>
                `);
                doc.close();
                setIframeDoc(doc);
            }
        }
    }, []);

    // Function to update iframe height
    const adjustIframeHeight = () => {
        setTimeout(() => {
            if (iframeRef.current?.contentWindow?.document?.body) {
                iframeRef.current.style.height =
                    iframeRef.current.contentWindow.document.body.scrollHeight + "px";
            }
        }, 100);
    };

    useEffect(() => {
        if (iframeDoc) {
            const rootElement = iframeDoc.getElementById("react-root");
            if (rootElement) {
                if (!rootRef.current) {
                    rootRef.current = createRoot(rootElement);
                }
                rootRef.current.render(<BootstrapButtonsHtml activeTab={activeTab} setActiveTab={setActiveTab} />);
                adjustIframeHeight();
            }
        }
    }, [iframeDoc, activeTab]); // Run on tab change

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Bootstrap Buttons Components</h2>
            <div className="bg-gray-200 p-1 rounded mb-2">
                {["preview", "html", "jsx"].map((tab) => (
                    <button
                        key={tab}
                        className={`rounded border-0 p-2 text-sm ${activeTab === tab ? "bg-white" : ""}`}
                        onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>
            <iframe ref={iframeRef} className="w-full overflow-hidden" />
        </div>
    );
};

export default BootstrapButtonsPage;

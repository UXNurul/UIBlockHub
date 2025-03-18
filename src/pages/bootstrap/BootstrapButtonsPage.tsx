import { useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client"; // Import Root type
import BootstrapButtonsHtml from "../../components/ui/bootstrap/BootstrapButtonsHtml";

const BootstrapButtonsPage = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeDoc, setIframeDoc] = useState<Document | null>(null);
    const rootRef = useRef<Root | null>(null); // Store root instance

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

    useEffect(() => {
        if (iframeDoc) {
            const rootElement = iframeDoc.getElementById("react-root");
            if (rootElement) {
                if (!rootRef.current) {
                    // Only createRoot once
                    rootRef.current = createRoot(rootElement);
                }
                rootRef.current.render(<BootstrapButtonsHtml />);

                setTimeout(() => {
                    if (iframeRef.current?.contentWindow?.document?.body) {
                        iframeRef.current.style.height = 
                            iframeRef.current.contentWindow.document.body.scrollHeight + "px";
                    }
                }, 100);

                
            }
        }
    }, [iframeDoc]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Buttons Components</h2>
            <iframe
                ref={iframeRef}
                className="w-full overflow-hidden"
            />
        </div>
    );
};

export default BootstrapButtonsPage;

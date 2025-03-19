import { useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import BootstrapButtonsHtml from "../../components/ui/bootstrap/BootstrapButtonsHtml";

const BootstrapButtonsPage = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeDoc, setIframeDoc] = useState<Document | null>(null);
    const rootRef = useRef<Root | null>(null);

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

    const adjustIframeHeight = () => {
        setTimeout(() => {
            if (iframeRef.current?.contentWindow?.document?.body) {
                const newHeight = iframeRef.current.contentWindow.document.body.scrollHeight + "px";
                iframeRef.current.style.height = newHeight;
            }
        }, 50);
    };

    useEffect(() => {
        if (iframeDoc) {
            const rootElement = iframeDoc.getElementById("react-root");
            if (rootElement) {
                if (rootRef.current) {
                    rootRef.current.unmount();
                }

                rootRef.current = createRoot(rootElement);
                rootRef.current.render(<BootstrapButtonsHtml adjustIframeHeight={adjustIframeHeight} />);
                adjustIframeHeight();

                iframeDoc.addEventListener("DOMContentLoaded", adjustIframeHeight);
                return () => {
                    iframeDoc.removeEventListener("DOMContentLoaded", adjustIframeHeight);
                };
            }
        }
    }, [iframeDoc]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Bootstrap Buttons Components</h2>
            <iframe ref={iframeRef} className="w-full overflow-hidden" />
        </div>
    );
};

export default BootstrapButtonsPage;

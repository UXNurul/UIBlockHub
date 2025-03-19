import { Dispatch, SetStateAction, useState } from "react";

interface BootstrapTabsProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<"preview" | "html" | "jsx">>;
    children: {
        preview: React.ReactNode;
        html: React.ReactNode;
        jsx: React.ReactNode;
    };
}

const BootstrapTabs = ({ activeTab, setActiveTab, children }: BootstrapTabsProps) => {
    // const [activeTab, setActiveTab] = useState<"preview" | "html" | "jsx">("preview");
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    // Function to extract text content from a React node
    const extractTextContent = (content: React.ReactNode): string => {
        if (typeof content === "string") {
            return content; // If it's already a string, return as is
        }
        if (typeof content === "object" && "props" in (content as any)) {
            return (content as any).props.children?.toString() || ""; // Extract text from props.children
        }
        return ""; // Return empty string if content is not valid
    };

    // Function to copy text to clipboard
    const handleCopy = (content: React.ReactNode, type: "HTML" | "JSX") => {
        const textToCopy = extractTextContent(content);

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopyStatus(`${type} Copied!`);
                setTimeout(() => setCopyStatus(null), 2000);
            });
        }
    };

    return (
        <div>


            <div className="border border-secondary rounded-3 p-3 mt-2 position-relative">

                {/* Tabs Navigation */}
                <div className="d-flex justify-content-between mb-2">

                    <div className="d-flex align-items-center bg-secondary p-1 rounded-2">
                        {["preview", "html", "jsx"].map((tab) => (
                            <button
                                key={tab}
                                className={`btn-sm btn border-0 ${activeTab === tab ? "bg-light" : "bg-secondary text-white"}`}
                                onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="d-flex gap-2 align-items-center">
                        {["HTML", "JSX"].map((code) => (
                            <button
                                className="btn btn-sm border border-secondary bg-light"
                                onClick={() => handleCopy(children.html, code as "HTML" | "JSX")}
                            >
                                {copyStatus === `${code} Copied!` ? `✔ ${code} Copied` : `Copy ${code}`}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Tab Content */}
                {activeTab === "preview" && children.preview}

                {(activeTab === "html" || activeTab === "jsx") && (
                    <div className="position-relative">
                        {/* Copy Button */}
                        <button
                            className="btn btn-sm bg-light p-1 position-absolute top-0 end-0 m-1"
                            onClick={() => handleCopy(activeTab === "html" ? children.html : children.jsx, activeTab.toUpperCase() as "HTML" | "JSX")}
                        >
                            {copyStatus === `${activeTab.toUpperCase()} Copied!` ? `✔ ${activeTab.toUpperCase()} Copied` : "📋"}
                        </button>

                        {/* Code Content */}
                        {activeTab === "html" && children.html}
                        {activeTab === "jsx" && children.jsx}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BootstrapTabs;

import { Dispatch, SetStateAction, useState } from "react";

interface TabsProps {
    activeTab: string;
    setActiveTab: Dispatch<SetStateAction<"preview" | "html" | "jsx">>;
    children: {
        preview: React.ReactNode;
        html: React.ReactNode;
        jsx: React.ReactNode;
    };
}

const TailwindTabs = ({ activeTab, setActiveTab, children }: TabsProps) => {
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    const extractTextContent = (content: React.ReactNode): string => {
        if (typeof content === "string") {
            return content;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof content === "object" && "props" in (content as any)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (content as any).props.children?.toString() || "";
        }
        return "";
    };

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


            <div className="border border-gray-500 rounded-lg p-4 mt-2 position-relative">

                {/* Tabs Navigation */}
                <div className="flex justify-between mb-2">

                    <div className="flex items-center bg-gray-500 p-1 rounded-md">
                        {["preview", "html", "jsx"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-2 py-1 rounded text-sm cursor-pointer  ${activeTab === tab ? "bg-white" : "bg-gray-500 text-white"}`}
                                onClick={() => setActiveTab(tab as "preview" | "html" | "jsx")}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2 items-center">
                        {["HTML", "JSX"].map((code) => (
                            <button
                            key={code}
                                className="px-2 py-1 rounded text-sm cursor-pointer border bg-gray-100"
                                onClick={() => handleCopy(code === "HTML" ? children.html : children.jsx, code as "HTML" | "JSX")}
                            >
                                {copyStatus === `${code} Copied!` ? `✔ ${code} Copied` : `Copy ${code}`}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Tab Content */}
                {activeTab === "preview" && children.preview}

                {(activeTab === "html" || activeTab === "jsx") && (
                    <div className="relative">
                        {/* Copy Button */}
                        <button
                            className="rounded bg-gray-100 p-1 absolute top-0 end-0 m-1"
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

export default TailwindTabs;

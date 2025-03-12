import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ComponentsPage() {
    const [visibleCode, setVisibleCode] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<{ [key: string]: string }>({
        button: "html",
        alert: "html",
    });
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string, type: string) => {
        navigator.clipboard.writeText(code);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const toggleView = (type: string) => {
        setVisibleCode(visibleCode === type ? null : type);
    };

    const handleLanguageChange = (type: string, language: string) => {
        setSelectedLanguage((prev) => ({ ...prev, [type]: language }));
    };

    const codeSamples = {
        button: {
            html: `<button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Example Button</button>`,
            react: `<Button className="mt-2">Example Button</Button>`,
        },
        alert: {
            html: `<div class="bg-red-100 p-2 rounded-md">Example Alert</div>`,
            react: `<div className="bg-red-100 p-2 rounded-md">Example Alert</div>`,
        },
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold">Available Components</h2>
            <div className="mt-4 grid grid-cols-1 gap-4">

                {/* Button Component */}
                <div className="border p-4 rounded-lg relative">
                    <h3 className="font-semibold mb-2">Buttons</h3>

                    {visibleCode === "button" ? (
                        <SyntaxHighlighter language={selectedLanguage.button} style={dracula} className="mt-2 p-2 rounded-md text-sm">
                            {codeSamples.button[selectedLanguage.button]}
                        </SyntaxHighlighter>
                    ) : (
                        <Button className="mt-2">Example Button</Button>
                    )}

                    <div className="absolute top-2 right-2 flex gap-2">
                        <select
                            className="text-sm px-2 py-1 border rounded-md"
                            value={selectedLanguage.button}
                            onChange={(e) => handleLanguageChange("button", e.target.value)}
                        >
                            <option value="html">HTML</option>
                            <option value="react">React</option>
                        </select>
                        <button
                            onClick={() => toggleView("button")}
                            className="text-sm bg-blue-600 text-white px-2 py-1 rounded-md"
                        >
                            {visibleCode === "button" ? "Preview" : "View Code"}
                        </button>
                        <button
                            onClick={() => handleCopy(codeSamples.button[selectedLanguage.button], "button")}
                            className="text-sm bg-gray-800 text-white px-2 py-1 rounded-md"
                        >
                            {copied === "button" ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

                {/* Alert Component */}
                <div className="border p-4 rounded-lg relative">
                    <h3 className="font-semibold mb-2">Alerts</h3>

                    {visibleCode === "alert" ? (
                        <SyntaxHighlighter language={selectedLanguage.alert} style={dracula} className="mt-2 p-2 rounded-md text-sm">
                            {codeSamples.alert[selectedLanguage.alert]}
                        </SyntaxHighlighter>
                    ) : (
                        <div className="bg-red-100 p-2 rounded-md">Example Alert</div>
                    )}

                    <div className="absolute top-2 right-2 flex gap-2">
                        <select
                            className="text-sm px-2 py-1 border rounded-md"
                            value={selectedLanguage.alert}
                            onChange={(e) => handleLanguageChange("alert", e.target.value)}
                        >
                            <option value="html">HTML</option>
                            <option value="react">React</option>
                        </select>
                        <button
                            onClick={() => toggleView("alert")}
                            className="text-sm bg-blue-600 text-white px-2 py-1 rounded-md"
                        >
                            {visibleCode === "alert" ? "Preview" : "View Code"}
                        </button>
                        <button
                            onClick={() => handleCopy(codeSamples.alert[selectedLanguage.alert], "alert")}
                            className="text-sm bg-gray-800 text-white px-2 py-1 rounded-md"
                        >
                            {copied === "alert" ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

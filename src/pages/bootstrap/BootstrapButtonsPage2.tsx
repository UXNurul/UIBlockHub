import { useEffect, useRef } from "react";

const BootstrapButtonsPage = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const bootstrapButtons = [
        { id: 1, label: "Primary", className: "btn btn-primary", customCSS: '', type: "default" },
        { id: 2, label: "Secondary", className: "btn btn-secondary", customCSS: '', type: "default" },
        { id: 3, label: "Success", className: "btn btn-success", customCSS: '', type: "default" },
        {
            id: 4,
            label: "Gradient Blue",
            className: "btn btn-primary text-white",
            customCSS: "background: linear-gradient(to right, #007bff, #0056b3); border: none;",
            type: "gradient"
        },
        {
            id: 5,
            label: "Gradient Red",
            className: "btn btn-danger text-white",
            customCSS: "background: linear-gradient(to right, #ff0000, #b30000); border: none;",
            type: "gradient"
        }
    ];


    useEffect(() => {
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
                    <div class="border rounded-3 p-2">
                    

                    <div class="d-flex justify-content-between mb-2">
                     <div id="tabBox" class="bg-secondary p-1 rounded-3 justify-contain-between d-flex">                        
                            <button id="previewBtn"                                
                                class="btn bg-white px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                PREVIEW
                            </button>        
                             <button id="htmlBtn"                                
                                class="btn bg-secondary px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                HTML
                            </button>     
                             <button id="jsxBtn"                               
                                class="btn bg-secondary px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                JSX
                            </button>               
                    </div>
                        <div class="d-flex gap-2">
                            <button id="copyHtmlDefault" class="px-2 py-1 border rounded-2 cursor-pointer">
                                Copy HTML
                            </button>
                            <button id="copyJsxDefault" class="px-2 py-1 border rounded-2 cursor-pointer">
                                Copy JSX
                            </button>
                        </div>
                    </div>

                        <div id="defaultPreview" class="border rounded-3 p-3">
                                ${bootstrapButtons
                    .filter(btn => btn.type === "default")
                    .map(btn => `<button class="${btn.className}" ${btn.customCSS ? `style="${btn.customCSS}"` : ''}>${btn.label}</button>`)
                    .join("")}
                            </div>
                            
                             <pre id="defaultHtml" class="d-none border rounded-3 p-3 bg-dark text-white"><code>${bootstrapButtons
                    .filter(btn => btn.type === "default")
                    .map(btn => `&lt;button class="${btn.className}"&gt;${btn.label}&lt;/button&gt;`)
                    .join("\n")}</code></pre>

                      <pre id="defaultJsx" class="d-none border rounded-3 p-3 bg-dark text-white"><code>${bootstrapButtons
                    .filter(btn => btn.type === "default")
                    .map(btn => `&lt;button className="${btn.className}"&gt;${btn.label}&lt;/button&gt;`)
                    .join("\n")}</code></pre>

                      
                    </div>

                    <h5 class="fw-semibold my-3">Gradient Buttons</h5>
                    <div class="border rounded-3 p-2">

                    <div class="d-flex justify-content-between mb-2">
                     <div class="bg-secondary p-1 rounded-3 justify-contain-between d-flex">                        
                            <button                                
                                class="bg-white px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                PREVIEW
                            </button>        
                             <button                                
                                class="bg-secondary px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                HTML
                            </button>     
                             <button                                
                                class="bg-secondary px-2 py-1 border-0 rounded-2 cursor-pointer"                                
                            >
                                JSX
                            </button>               
                    </div>
                        <div class="d-flex gap-2 mb-2">
                            <button id="copyHtmlGradient" class="px-2 py-1 border rounded-2 cursor-pointer">
                                Copy HTML
                            </button>
                            <button id="copyJsxGradient" class="px-2 py-1 border rounded-2 cursor-pointer">
                                Copy JSX
                            </button>
                        </div>
                        </div>

                        <div class="d-flex gap-2 border rounded-3 p-3" id="gradientButtons">
                            ${bootstrapButtons
                    .filter(btn => btn.type === "gradient")
                    .map(btn => `<button class="${btn.className}" ${btn.customCSS ? `style="${btn.customCSS}"` : ''}>${btn.label}</button>`)
                    .join("")}
                        </div>
                    </div>

                    <script>
                     function adjustIframeHeight() {
                            window.parent.document.getElementById('${iframe?.id}').style.height = document.body.scrollHeight + 'px';
                        }
                        window.onload = adjustIframeHeight;
                        window.onresize = adjustIframeHeight;

                        function copyToClipboard(text) {
                            navigator.clipboard.writeText(text).then(() => {
                                alert("Copied!");
                            }).catch(err => {
                                console.error("Failed to copy: ", err);
                            });
                        }

                        function getHtml(id) {
                            return document.getElementById(id).innerHTML.trim();
                        }

                        function getJsx(id) {
                            return getHtml(id).replace(/class="/g, 'className="');
                        }

                        document.addEventListener("DOMContentLoaded", function () {
                            document.getElementById("copyHtmlDefault").addEventListener("click", () => copyToClipboard(getHtml("defaultButtons")));
                            document.getElementById("copyJsxDefault").addEventListener("click", () => copyToClipboard(getJsx("defaultButtons")));
                            document.getElementById("copyHtmlGradient").addEventListener("click", () => copyToClipboard(getHtml("gradientButtons")));
                            document.getElementById("copyJsxGradient").addEventListener("click", () => copyToClipboard(getJsx("gradientButtons")));
                        });                     
 
                        function toggleTab(tab) {
                            document.getElementById("defaultPreview").classList.toggle("d-none", tab !== "preview");
                            document.getElementById("defaultHtml").classList.toggle("d-none", tab !== "html");
                            document.getElementById("defaultJsx").classList.toggle("d-none", tab !== "jsx");
                        }

                        document.getElementById("previewBtn").addEventListener("click", () => toggleTab("preview"));
                        document.getElementById("htmlBtn").addEventListener("click", () => toggleTab("html"));
                        document.getElementById("jsxBtn").addEventListener("click", () => toggleTab("jsx"));

                        var tab = document.getElementById("tabBox");
var btns = tab.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("bg-white");
  current[0].className = current[0].className.replace(" bg-white", "");
  this.className += " bg-white";
  });
}
                    </script>
                </body>
                </html>
            `);
            doc.close();
        }
    }, []);

    return (
        <div>

            <h2 className="text-2xl font-semibold mb-4">Buttons Components</h2>
            <iframe ref={iframeRef} id="buttonsIframe" style={{ width: "100%", border: "none", overflow: "hidden" }} />
        </div>
    );
};

export default BootstrapButtonsPage;

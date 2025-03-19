import BootstrapTabs from "./BootstrapTabs";

const BootstrapButtonGroup = ({ title, variant }: { title: string; variant: string }) => {
    const bootstrapButtons = [
        { id: 1, label: "Primary", class: "btn btn-primary", css: "", variant: "default" },
        { id: 2, label: "Secondary", class: "btn btn-secondary", css: "", variant: "default" },
        { id: 3, label: "Success", class: "btn btn-success", css: "", variant: "default" },
        {
            id: 4,
            label: "Gradient Blue",
            class: "btn btn-primary text-white",
            css: "background: linear-gradient(to right, #007bff, #0056b3); border: none;",
            variant: "gradient",
        },
        {
            id: 5,
            label: "Gradient Red",
            class: "btn btn-danger text-white",
            css: "background: linear-gradient(to right, #ff0000, #b30000); border: none;",
            variant: "gradient",
        },
    ];

    const parseCSS = (css: string): React.CSSProperties => {
        return css.split(";").reduce((acc, rule) => {
            if (rule.trim()) {
                const [key, value] = rule.split(":").map((s) => s.trim());
                if (key && value) {
                    acc[key as keyof React.CSSProperties] = value;
                }
            }
            return acc;
        }, {} as React.CSSProperties);
    };

    const generateCode = (code: "html" | "jsx", variant: string) => {
        return bootstrapButtons
            .filter((btn) => btn.variant === variant)
            .map((btn) => {
                if (code === "jsx") {
                    return `<button className="${btn.class}"${
                        btn.css
                            ? ` style={{ ${btn.css
                                  .split(";")
                                  .filter((rule) => rule.trim())
                                  .map((rule) => {
                                      const [key, value] = rule.split(":").map((s) => s.trim());
                                      return `"${key.replace(/-./g, (match) => match[1].toUpperCase())}": "${value}"`;
                                  })
                                  .join(", ")} }}`
                            : ""
                    }>${btn.label}</button>`;
                } else {
                    return `<button class="${btn.class}"${btn.css ? ` style="${btn.css}"` : ""}>${btn.label}</button>`;
                }
            })
            .join("\n");
    };

    return (
        <div>
            <h5 className="fw-semibold mb-2">{title}</h5>

            <BootstrapTabs>
                {{
                    preview: (
                        <div className="border rounded-3 p-3 d-flex gap-2">
                            {bootstrapButtons
                                .filter((btn) => btn.variant === variant)
                                .map((btn) => (
                                    <button key={btn.id} className={btn.class} style={btn.css ? parseCSS(btn.css) : undefined}>
                                        {btn.label}
                                    </button>
                                ))}
                        </div>
                    ),
                    html: <pre className="bg-dark text-white p-4 rounded m-0">{generateCode("html", variant)}</pre>,
                    jsx: <pre className="bg-dark text-white p-4 rounded m-0">{generateCode("jsx", variant)}</pre>,
                }}
            </BootstrapTabs>
        </div>
    );
};

export default BootstrapButtonGroup;

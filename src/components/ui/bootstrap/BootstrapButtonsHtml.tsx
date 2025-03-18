const BootstrapButtonsHtml = () => {
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

    // Function to convert CSS string to object
    const parseCSS = (css: string): React.CSSProperties => {
        return css.split(';').reduce((acc, rule) => {
            if (rule.trim()) {
                const [key, value] = rule.split(':').map((s) => s.trim());
                if (key && value) {
                    acc[key as keyof React.CSSProperties] = value;
                }
            }
            return acc;
        }, {} as React.CSSProperties);
    };

    return (
        <div>

            <h5 className="fw-semibold my-3">Default Buttons</h5>
            <div className="border rounded-3 p-3 d-flex gap-2">
                {bootstrapButtons.filter(btn => btn.type === "default").map((btn) => (
                    <button
                        key={btn.id}
                        className={btn.className}
                        style={btn.customCSS ? parseCSS(btn.customCSS) : undefined}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <h5 className="fw-semibold my-3">Gradient Buttons</h5>
            <div className="border rounded-3 p-3 d-flex gap-2">
                {bootstrapButtons.filter(btn => btn.type === "gradient").map((btn) => (
                    <button
                        key={btn.id}
                        className={btn.className}
                        style={btn.customCSS ? parseCSS(btn.customCSS) : undefined}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>


        </div>
    );
};

export default BootstrapButtonsHtml;

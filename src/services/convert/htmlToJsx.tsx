const htmlToJsx = (html: string) => {
    return html      
        .replace(/viewBox=/g, 'viewBox=') // Keep viewBox as is
        .replace(/aria-hidden=/g, 'aria-hidden=') // Keep aria-hidden as is
        .replace(/xmlns=/g, 'xmlns=') // Keep xmlns as is   
        .replace(/class=/g, "className=")
        .replace(/for=/g, "htmlFor=")
        .replace(/stroke-linecap/g, "strokeLinecap")
        .replace(/stroke-linejoin/g, "strokeLinejoin")
        .replace(/stroke-width/g, "strokeWidth")
        .replace(/fill-rule/g, "fillRule")
        .replace(/clip-rule/g, "clipRule")
        .replace(/style="([^"]*)"/g, (_, style) => {
            // Convert inline styles to JSX format
            const jsxStyle = style.split(";").reduce((acc: string[], rule: string) => {
                if (!rule.trim()) return acc;
                const [key, value] = rule.split(":").map(str => str.trim());
                if (key && value) {
                    const camelCasedKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
                    acc.push(`${camelCasedKey}: "${value}"`);
                }
                return acc;
            }, []).join(", ");

            return `style={{ ${jsxStyle} }}`;
        });
};

export default htmlToJsx;

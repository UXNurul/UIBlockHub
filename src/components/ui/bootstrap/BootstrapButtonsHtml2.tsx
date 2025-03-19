import BootstrapButtonGroup from "./BootstrapButtonGroup";

const BootstrapButtonsHtml = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: string } ) => {
    return (
        <div>           
            
            <BootstrapButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} title="Default Buttons" variant="default" />

            <div className="my-4" />

            <BootstrapButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} title="Gradient Buttons" variant="gradient" />
        </div>
    );
};

export default BootstrapButtonsHtml;

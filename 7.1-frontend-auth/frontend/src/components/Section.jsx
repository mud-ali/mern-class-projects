const Section = ({ componentTitle, children }) => {
    return (
        <div className="mx-auto text-center">
            <h3>{componentTitle}</h3>
            {children}
        </div>
    );
};

export default Section;
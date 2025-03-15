const Section = ({ componentTitle, children }) => {
    return (
        <div className="mx-auto text-center shadow-lg rounded-lg m-4 p-6 w-1/3 border-2 border-gray-100">
            <h3 className="text-xl font-semibold mb-4">{componentTitle}</h3>
            {children}
        </div>
    );
};

export default Section;
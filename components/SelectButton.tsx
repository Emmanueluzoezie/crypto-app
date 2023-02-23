type Button = {
    children:any,
    selected: boolean,
    onClick: any
}

const SelectButton = ({ children, selected, onClick }: Button) => {

    return (
            <button onClick={onClick} className={`text-xs md:text-lg text-center rounded-lg p-1 px-2 whitespace-nowrap font-mono font-bold ${selected ? "bg-green-700 text-white hover:bg-green-700 hover:text-black font-bold" : ""} `}>
                {children}
            </button>
    );
};

export default SelectButton;
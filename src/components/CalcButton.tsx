export default function CalcButton({id, text, onClick} : {id: string, text: string, onClick: (text: string) => void}) {
    return (
        <div id={id} onClick={(event) => onClick(text)} className="bg-gray-500 flex flex-col text-center text-white justify-center content-center">
            <p>{text}</p>
        </div>
    )
}
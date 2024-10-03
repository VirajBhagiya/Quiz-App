interface Question {
    id: number;
    text: string;
    options: string[];
}

export const CurrentQuestion = ({question} : {question: Question}) => {
    return <div>
        {JSON.stringify(question)}
    </div>
}
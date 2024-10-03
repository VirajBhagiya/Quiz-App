import { useState } from 'react';
import { Socket } from 'socket.io-client';

export function Quiz({
    quizData,
    socket,
    userId,
    problemId,
    roomId,
}: {
    quizData: {
        title: string;
        options: { title: string }[];
    };
    socket: Socket;
    roomId: string;
    userId: string;
    problemId: string;
}) {
    const [submitted, setSubmitted] = useState(false);
    const [submission, setSubmission] = useState(0);

    return (
        <div className="h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                <SingleQuiz
                    choices={quizData.options}
                    title={quizData.title}
                    imageURL={""}
                    setSelected={setSubmission}
                />
                <div className="flex justify-center mt-4">
                    <button
                        className="py-3 px-10 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                        disabled={submitted}
                        onClick={() => {
                            setSubmitted(true);
                            socket.emit("submit", {
                                userId,
                                problemId,
                                submission: Number(submission),
                                roomId,
                            });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

type SingleQuizProps = {
  title: string;
  choices: { title: string }[];
  imageURL?: string;
  setSelected: (index: number) => void;
};

function SingleQuiz({
  title,
  choices,
  imageURL,
  setSelected,
}: SingleQuizProps) {
  return (
      <article>
          <h4 className="mt-10 text-xl font-semibold">Question</h4>
          <div className="mt-4 text-2xl font-medium">{title}</div>
          {imageURL && <img src={imageURL} alt="" className="mt-4 mb-6 rounded-md" />}
          {choices.length > 0 &&
              choices.map((choice, index) => {
                  return (
                      <div
                          key={index}
                          className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-gray-300 rounded-xl bg-gray-100 hover:bg-gray-200 transition duration-300"
                      >
                          <input
                              type="radio"
                              name="option"
                              value={choice.title}
                              className="w-6 h-6 accent-indigo-600"
                              onClick={() => {
                                  setSelected(index);
                              }}
                          />
                          <p className="ml-6 text-lg">{choice.title}</p>
                      </div>
                  );
              })}
          <div className="flex flex-col items-start w-full"></div>
      </article>
  );
}

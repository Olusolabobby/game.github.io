import "./Quiz.css";
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import Questions from "../../components/Questions/Questions";

const Quiz = ({ name, questions, setQuestions, score, setScore }) => {


    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);

    useEffect( ()=> {
        console.log(questions);
        // console.log(name);

        setOptions(
            questions &&
                    handleShuffle( [
                            questions[currQues]?.correct_answer,
                        ...questions[currQues]?.incorrect_answers,
    ])
        );

    }, [currQues, questions]);

    console.log(options);

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const handleShuffle = (options) => {
        return options.sort( ()=> Math.random() - 0.5);
    };

    return(
        <div className='quiz'>
            <span className="subtitle"> Welcome, {name}</span>

            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currQues].category}</span>
                        <span>Score : {score}</span>
                    </div>

                    <Questions
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={questions[currQues]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                    />
                </>

            ) : (
                <CircularProgress
                    style={{margin: 100 }}
                    color="inherit"
                    size={150}
                    thickness={1}
                    />
            )}
        </div>
    );
};

export default Quiz;
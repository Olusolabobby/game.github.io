import "./Quiz.css";
import {useEffect, useState} from "react";
import {CircularProgress} from "@material-ui/core";
import Questions from "../../components/Questions/Questions";
import { AppRoutes } from '../../Common/routes/AppRoutes.js';
import { Link } from 'react-router-dom';

const Quiz = ({ name, questions, setQuestions, score, setScore, selectedCategory }) => {


    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [totalScores, setTotalScores] = useState(0);
    // useEffect(()=>{
    //     console.log('currQues', currQues);
    // },[currQues])

    // useEffect(()=>{
    //     console.log('FIIRST RENDER',selectedCategory);
    // }, [])

    useEffect( ()=> {
        // console.log('USEEFFECT [currQues, questions]');
        questions?.length > 0 &&  setOptions(
            questions &&
                    handleShuffle( [
                            questions[currQues]?.correct_answer,
                        ...questions[currQues]?.incorrect_answers,
    ])
        );

    }, [currQues, questions]);

    // console.log(questions);


    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const handleShuffle = (options) => {
        return options.sort( ()=> Math.random() - 0.5);
    };

    // console.log(options);

    return(
        <div className='quiz'>
            <span className="subtitle"> Welcome, {name}</span>

            {questions?.length > 0 ? (
                <>
                    <div className="quizInfo">
                        <span>{questions[currQues]?.category}</span>
                        <span>Score : {totalScores}</span>
                    </div>

                    <Questions
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        options={options}
                        correct={questions[currQues]?.correct_answer}
                        score={score}
                        setScore={setScore}
                        setTotalScores={setTotalScores}
                        totalScores={totalScores}
                        setQuestions={setQuestions}
                    />
                </>

            ) : (
              <>
                <CircularProgress
                    style={{margin: 100 }}
                    color="inherit"
                    size={150}
                    thickness={1}
                    />
                  <Link to={AppRoutes.HOME}>Back to Home</Link>
              </>
            )}
        </div>
    );
};

export default Quiz;

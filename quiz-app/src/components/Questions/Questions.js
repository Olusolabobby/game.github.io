import "./Questions.css";
import {useState, useEffect} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {Button} from "@material-ui/core";
import {AppRoutes} from "../../Common/routes/AppRoutes";
import {useNavigate} from "react-router-dom";

const Questions = ({
      currQues,
      setCurrQues,
      questions,
      options,
      correct,
      setScore,
      score,
      setQuestions,
      totalScores,
      setTotalScores
   }) => {

    const navigate = useNavigate();

    const [selected, setSelected] = useState();
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
    currQues > questions.length-1 && navigate (AppRoutes.RESULT);
  },[currQues])

    const handleSelect = (item) => {
        if (selected === item && selected === correct){
            return "select";
        } else if (selected === item && selected !== correct){
            return "wrong";
        } else if ( item === correct){
            return "select";
        }
    };


    const handleCheck = (item) => {
        setSelected(item);
        setError(false);
    };

    const handleNext = () => {
        if (currQues > questions.length-2) {
          setScore(totalScores);
          navigate (AppRoutes.RESULT);
        } else if (selected === correct) {
            setCurrQues((prevState)=>  prevState + 1);
            // setScore((prevState)=> prevState+1)
            setTotalScores((prevState)=> prevState+1)
            setSelected();
        } else if(selected !== correct) {
            setCurrQues(currQues + 1);
            setSelected();
        } else {
            setError("Please select an option first");
        }
    }


    const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
    }

    return (
        <div className='question'>
            <h1>Questions {currQues + 1} : </h1>

            <div className='singleQuestion'>
                <h2>{questions[currQues].question}</h2>
                <span>{error && <ErrorMessage>{error}</ErrorMessage>}</span>
                <div className='options'>
                        {options && options.map((item)=>
                            (<button className={`singleOption ${selected && handleSelect(item)}`}
                                     key={item}
                                     disabled={selected}
                                     onClick={()=>handleCheck(item) }
                                >
                                    {item}
                                </button>
                            ))}
                </div>

                <div className='controls'>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ width: 185 }}
                        href="/"
                        onClick={handleQuit}
                    >
                        Quit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >
                        {currQues > 22 ? "Submit" : "Next Question"}
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default Questions;

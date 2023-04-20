import "./Home.css";
import {Button, MenuItem, TextField} from "@material-ui/core";
import Category from "../../Data/Category";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {AppRoutes} from "../../Common/routes/AppRoutes";


const Home = ({ name, setName, fetchQuestions }) => {

    const navigate = useNavigate();

    const[ category, setCategory] = useState("");
    const[ difficulty, setDifficulty] = useState("");
    const[ error, setError] = useState(false);

    const handleSubmit = () => {
        if (category || difficulty || name) {
            fetchQuestions(category, difficulty);
            navigate(AppRoutes.QUIZ);
        } else {
            setError(true);
            return;
        }

        // if (!category || !difficulty || !name) {
        //     setError(true);
        //     return;
        // } else {
        //     setError(false);
        //     fetchQuestions(category, difficulty);
        //     navigate(AppRoutes.QUIZ);
        // }

    };

    return(
        <div className='content'>
            <div className='settings'>
                <span>
                    Start Quiz
                </span>

                    <div className='settings_select'>
                        {error && <ErrorMessage>Please Fill in all the fields</ErrorMessage>}

                        <TextField
                            style={{ marginBottom: 25 }}
                            label="Enter Your Name"
                            variant="outlined"
                            // onChange={(e) => setName(e.target.value)}
                        />

                        <TextField select label="Select Category" style={{ marginBottom: 20}} variant="outlined"
                                   onChange={(e) => setCategory(e.target.value)} value={category}
                        >
                            {Category.map((cat) => {
                                return(
                                    <MenuItem key={cat.category} value={cat.value}>
                                        {cat.category}
                                    </MenuItem>
                                )
                            })
                            }
                        </TextField>

                        <TextField select label="Select Stage" variant="outlined" style={{ marginBottom: 30}}
                                   onChange={(e) => setDifficulty(e.target.value)} value={difficulty}
                        >
                            <MenuItem key="Easy" value="easy">
                                Easy
                            </MenuItem>
                            <MenuItem key="Medium" value="medium">
                                Average
                            </MenuItem>
                            <MenuItem key="Difficult" value="difficult">
                                Difficult
                            </MenuItem>
                        </TextField>

                        <Button variant="contained" color="primary"
                                onClick={handleSubmit}>
                            Start
                        </Button>

                    </div>

            </div>

            {/*https://undraw.co*/}
            <img src='/quiz.svg' className='banner' alt='quiz image'/>
        </div>
    )
}

export default Home;
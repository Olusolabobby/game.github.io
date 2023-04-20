import "./Result.css";
import {useEffect} from "react";
import {AppRoutes} from "../../Common/routes/AppRoutes";
import {useNavigate} from "react-router-dom";
import {Button} from "@material-ui/core";

const Result = ({name, score}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(!name) {
            navigate(AppRoutes.HOME);
        }
    }, [name, navigate]);


    return(
        <div className='result'>
            <span className='title'> {name}'s Final Score : {score}</span>

            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                href="/"
            >
                Go to homepage
            </Button>
        </div>
    )
}

export default Result;
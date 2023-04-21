import './App.css';
import Header from "./components/Header/Header";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
import {AppRoutes} from "./Common/routes/AppRoutes";
import {useState} from "react";
import axios from "axios";


function App() {

    const [name, setName] = useState("");
    const [questions, setQuestions] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [score, setScore] = useState(0);

    console.log('APP RENDERS');
    const fetchQuestions = async( category= "", difficulty= "" ) => {
        // from trivia db api
        const { data } = await axios.get(
            `https://opentdb.com/api.php?amount=10${
                category && `&category=${category}`
            }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );

        // console.log (data);
        setQuestions(data.results);
        setSelectedCategory(category)
    };

    const Layout = () => {
        return(
            <div className="app" style={{ backgroundImage: "url(./bg.jpeg)"}}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        )
    }

    const router = createBrowserRouter([
        {
            path: AppRoutes.HOME,
            element: <Layout />,
            errorElement: <h1>PAGE NOT FOUND</h1>,
            children: [

                {
                    path: AppRoutes.HOME,
                    element: <Home name={name}
                                   setName={setName}
                                   fetchQuestions={fetchQuestions}
                    />,
                },
                {
                    path: AppRoutes.QUIZ,
                    element: <Quiz  name={name}
                                    questions={questions}
                                    setQuestions={setQuestions}
                                    score={score}
                                    setScore={setScore}
                                    selectedCategory={selectedCategory}
                    />,
                },
                {
                    path: AppRoutes.RESULT,
                    element: <Result name={name}
                                     score={score}/>,
                },

            ]


        },
    ]);

  return (
      <div>
          <RouterProvider router={router} />
      </div>

  );
}

export default App;

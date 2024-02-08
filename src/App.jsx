import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { reduxConfig } from "./store/reduxConfig";
import "./App.css";

function App() {
  return (
    <Provider store={reduxConfig}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

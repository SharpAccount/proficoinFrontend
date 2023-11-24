import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ContextWrapper} from "../../Core/Context";
import {Paths} from "../../Constants/paths";
import Layout from "../Components/layout";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <ContextWrapper>
                  <Layout>
                      {Paths.map((el, idx) => (
                          <Route exact key={idx} path={el.path} component={el.page}></Route>
                      ))}
                  </Layout>
              </ContextWrapper>
          </Switch>
      </BrowserRouter>
  );
}

export default App;

import './App.css';
import Layout from "../layout";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ContextWrapper} from "../../Core/Context";
import {Paths} from "../../constants/paths";

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

import * as React from "react";
import { Route, Router, RouterProps, Switch } from "react-router";
import IndexPage from "./pages/index";

const routes = [
  {
    path: "/",
    component: IndexPage
  },
  {
    path: "*",
    component: () => <div>404 Not Found</div>
  }
];

export function Routes(props: RouterProps & { data: any }) {
  const data = props.data;
  console.log(data);
  return (
    <Router history={props.history}>
      <Switch>
        {routes.map(route => {
          const Component = route.component;
          return (
            <Route path={route.path}>
              <Component {...data} />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}

import http from "node:http";
import { json } from "./src/middlewares/json.js";
import { routes } from "./src/routes/routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(method, url);

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {

    const routeParams = req.url.match(route.path);

    if(routeParams && routeParams.groups){
        try {
            const {...params} = routeParams.groups;
            req.params = params;
        } catch (error) {
            req.params = {};    
        }
    }


    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not Found");
});

server.listen(3333);

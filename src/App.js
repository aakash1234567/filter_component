import { useState } from "react";
function* run(data = require("./data.json")) {
  // if using path directly
  // for (let i of data.path) {
  //   yield i;
  // }

  // if using name
  for (let i of data.list) {
    yield `./components/${i}`.toLowerCase();
  }
  return "done";
}
var temp = [];

var ans = (async () => {
  for (const val of run()) {
    var module = await import(`${val}`);
    temp.push(module);
  }
  return temp;
})();
const App = () => {
  const [Modules, setModules] = useState([]);
  ans.then(
    function (value) {
      console.log(value, "done");
      setModules(value);
    },
    function (error) {
      console.log(error, "error");
    }
  );

  return (
    <>
      <h1>hehe</h1>
      {Modules.map((m) => m.default())}
    </>
  );
};

export default App;

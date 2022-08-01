var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var App = function App() {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dbData = _React$useState2[0],
      setDbdata = _React$useState2[1];

  React.useEffect(function () {
    console.log(utools);
    // utools.db.put({
    //   _id: "demo",
    //   data: "demo",
    // });
    setDbdata(utools.db.get("demo"));
  }, []);

  return React.createElement(
    "div",
    { className: "text-4xl" },
    JSON.stringify(dbData)
  );
};

var container = document.getElementById("root");
var root = ReactDOM.createRoot(container);
root.render(React.createElement(App, null));
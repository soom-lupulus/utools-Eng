var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var App = function App() {
  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dbData = _React$useState2[0],
      setDbdata = _React$useState2[1];

  var url = "http://bing.getlove.cn/bingImage";
  React.useEffect(function () {
    console.log(utools);
  }, []);

  return React.createElement(
    "div",
    { className: "relative w-screen h-screen" },
    React.createElement(
      "div",
      { className: "absolute top-0" },
      React.createElement("img", { src: url })
    ),
    React.createElement(
      "div",
      { className: "filter blur-lg w-4/5 h-2/5 absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col justify-between items-center" },
      React.createElement(
        "div",
        { className: "text-7xl" },
        "pass out"
      ),
      React.createElement(
        "div",
        { className: "text-xl" },
        "\u4ECA\u5929\u6211\u4EEC\u8981\u5B66\u7684\u8BCD\u662F pass out. To pass out \u610F\u601D\u662F\u5931\u53BB\u77E5\u89C9\u3002A pilot who allegedly passed out in the cockpit was arrested on suspicion of being drunk. \u4E00\u4E2A\u636E\u62A5\u9053\u5728\u9A7E\u9A76\u8231\u5185\u4E0D\u7701\u4EBA\u4E8B\u7684\u98DE\u884C\u5458\u56E0\u6D89\u5ACC\u9189\u9152\u88AB\u902E\u6355\u3002A Texas couple was arrested after they passed out in the car with drugs and their two young children inside. \u5F97\u514B\u8428\u65AF\u5DDE\u4E00\u7537\u4E00\u5973\u88AB\u8B66\u65B9\u902E\u6355\uFF0C\u53D1\u73B0\u4ED6\u4EEC\u65F6\uFF0C\u4ED6\u4EEC\u5DF2\u7ECF\u4E0D\u7701\u4EBA\u4E8B\uFF0C\u8F66\u91CC\u8FD8\u6709\u4ED6\u4EEC\u7684\u4E24\u4E2A\u5C0F\u5B69\u5B50\u548C\u6BD2\u54C1\u3002\u597D\u7684\uFF0C\u6211\u4EEC\u4ECA\u5929\u5B66\u4E60\u7684\u8BCD\u662F pass out, pass out, pass out\u2026"
      )
    )
  );
};

var container = document.getElementById("root");
var root = ReactDOM.createRoot(container);
root.render(React.createElement(App, null));
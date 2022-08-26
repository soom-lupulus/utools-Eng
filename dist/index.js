var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { DOCID } from "../config/index.js";
import { useInitDB } from "./useInitDB.js";

dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_duration);

var App = function App() {
  useInitDB();

  var _React$useState = React.useState({}),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      info = _React$useState2[0],
      setInfo = _React$useState2[1];

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      imgUrl = _React$useState4[0],
      setImgUrl = _React$useState4[1];

  var removeRevFromDBStorage = function removeRevFromDBStorage(DOCID) {
    var _utools$db$remove = utools.db.remove(DOCID),
        ok = _utools$db$remove.ok;

    if (ok) {
      utools.dbStorage.removeItem("eng_rev");
      console.log("删除了");
    }
  };

  // 处理文章分段
  var splitArticle = React.useMemo(function () {
    if (info.article) {
      var sArr = info.article.split("。");
      return sArr;
    }
    return [];
  }, [info]);

  // 获取每日背景图片
  var getDailyImg = function getDailyImg() {
    // 获取每日图片
    fetch("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1").then(function (res) {
      return res.json();
    }).then(function (res) {
      var url = "http://bing.com" + res.images[0].url;
      setImgUrl(url);
    });
  };
  // 根据日期获取每日句子
  var getDailySentence = function getDailySentence() {
    console.log("来了");
    // 起始日期设定为2022.8.27
    var start = dayjs("2022-08-27");
    var today = dayjs().format("YYYY-MM-DD");
    var end = dayjs(today);
    // 间隔日为下标
    var index = end.diff(start, "day");
    console.log(index);
    // 从数据库取数据
    if (index < 0) index = 0;

    var _utools$db$get = utools.db.get(DOCID + "/oneword/page" + Math.ceil((index + 1) / 500)),
        pageData = _utools$db$get.data;

    var todayWord = pageData[index];
    setInfo(todayWord);
  };
  React.useEffect(function () {
    getDailyImg();
    getDailySentence();
  }, []);

  return React.createElement(
    "div",
    { className: "outer" },
    React.createElement(
      "div",
      { className: "img-wrapper" },
      React.createElement("img", { src: imgUrl })
    ),
    React.createElement(
      "div",
      { className: "content-wrapper" },
      React.createElement(
        "h1",
        null,
        info.title
      ),
      React.createElement(
        "article",
        null,
        splitArticle.map(function (item, index) {
          return React.createElement(
            "p",
            { key: index },
            item
          );
        })
      )
    )
  );
};

var container = document.getElementById("root");
var root = ReactDOM.createRoot(container);
root.render(React.createElement(App, null));
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { DOCID } from "../config/index.js";
var App = function App() {
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

  var initData = function initData(doc_id, data) {
    var doc = utools.db.get(doc_id);
    // 新用户就新建数据库
    if (!doc) {
      // 创建数据库
      var _utools$db$put = utools.db.put({
        _id: doc_id,
        data: data
      }),
          rev = _utools$db$put.rev,
          ok = _utools$db$put.ok,
          id = _utools$db$put.id;

      if (ok) {
        console.log("数据库创建成功, id为" + id);
        // 存储rev
        utools.dbStorage.setItem(doc_id + "_rev", rev);
      } else {
        console.log("数据库创建失败");
      }
    }
    // 否则就更新数据或者什么都不做
    else {
        // 判断文档是否要更新（todo）
        console.log(doc_id + "已经有数据了");
      }
  };

  var splitArticle = React.useMemo(function () {
    if (info.article) {
      var sArr = info.article.split("。");
      return sArr;
    }
    return [];
  }, [info]);

  // 写数据
  utools.onPluginReady(function () {
    // 添加监听
    window.onresize = function (e) {
      document.documentElement.style.fontSize = innerHeight / 60 + "px";
    };
    // 获取数据
    var dataArr = readConfig();
    var dataObj = {
      page1: dataArr.slice(0, 500),
      page2: dataArr.slice(500, 1000),
      page3: dataArr.slice(1000, 1500),
      page4: dataArr.slice(1500, 2000),
      page5: dataArr.slice(1500, 2000),
      page6: dataArr.slice(2500, 3000),
      page7: dataArr.slice(3000)
    };
    Object.keys(dataObj).forEach(function (item) {
      initData(DOCID + "/oneword/" + item, dataObj[item]);
    });
  });

  var getDailyImg = function getDailyImg() {
    // 获取每日图片
    fetch("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1").then(function (res) {
      return res.json();
    }).then(function (res) {
      var url = "http://bing.com" + res.images[0].url;
      setImgUrl(url);
    });
  };
  React.useEffect(function () {
    getDailyImg();

    var _utools$db$get = utools.db.get(DOCID + "/oneword/page1"),
        page1Data = _utools$db$get.data;

    var todayWord = page1Data[4];
    setInfo(todayWord);
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
import { DOCID } from "../config/index.js";

export var useInitDB = function useInitDB() {
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

  // 写数据
  utools.onPluginReady(function () {
    // 添加监听
    document.documentElement.style.fontSize = 9 + "px";
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
};

export default useInitDB;
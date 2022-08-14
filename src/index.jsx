import { DOCID } from "../config/index.js";
const App = () => {
  const [info, setInfo] = React.useState({});
  const [imgUrl, setImgUrl] = React.useState(``);

  const removeRevFromDBStorage = (DOCID) => {
    const { ok } = utools.db.remove(DOCID);
    if (ok) {
      utools.dbStorage.removeItem("eng_rev");
      console.log("删除了");
    }
  };

  const initData = (doc_id, data) => {
    const doc = utools.db.get(doc_id);
    // 新用户就新建数据库
    if (!doc) {
      // 创建数据库
      const { rev, ok, id } = utools.db.put({
        _id: doc_id,
        data,
      });
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

  const splitArticle = React.useMemo(() => {
    if (info.article) {
      const sArr = info.article.split("。");
      return sArr;
    }
    return []
  }, [info]);

  // 写数据
  utools.onPluginReady(() => {
    // 获取数据
    const dataArr = readConfig();
    const dataObj = {
      page1: dataArr.slice(0, 500),
      page2: dataArr.slice(500, 1000),
      page3: dataArr.slice(1000, 1500),
      page4: dataArr.slice(1500, 2000),
      page5: dataArr.slice(1500, 2000),
      page6: dataArr.slice(2500, 3000),
      page7: dataArr.slice(3000),
    };
    Object.keys(dataObj).forEach((item) => {
      initData(`${DOCID}/oneword/${item}`, dataObj[item]);
    });
  });

  const getDaliyImg = () => {
    // 获取每日图片
    fetch("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const url = "http://bing.com" + res.images[0].url;
        setImgUrl(url);
      });
  };
  React.useEffect(() => {
    getDaliyImg();
    const { data: page1Data } = utools.db.get(DOCID + "/oneword/page1");
    const todayWord = page1Data[3];
    setInfo(todayWord);
  }, []);

  return (
    <div className="outer">
      <div className="img-wrapper">
        <img src={imgUrl} />
      </div>
      <div className="content-wrapper">
        <h1>{info.title}</h1>
        <article>
          {/* 今天我们要学的词是 pass out. To pass out 意思是失去知觉。A pilot who
          allegedly passed out in the cockpit was arrested on suspicion of being
          drunk. 一个据报道在驾驶舱内不省人事的飞行员因涉嫌醉酒被逮捕。A Texas
          couple was arrested after they passed out in the car with drugs and
          their two young children inside.
          得克萨斯州一男一女被警方逮捕，发现他们时，他们已经不省人事，车里还有他们的两个小孩子和毒品。好的，我们今天学习的词是
          pass out, pass out, pass out… */}
          {/* {splitArticle(info.article)} */}
          {splitArticle.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </article>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

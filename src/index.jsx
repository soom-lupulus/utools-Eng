import { DOCID } from "../config/index.js";
const App = () => {
  const [dbData, setDbdata] = React.useState({});
  const [imgUrl, setImgUrl] = React.useState(``);
  React.useEffect(() => {
    // 获取每日图片
    fetch("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        const url = "http://bing.com" + res.images[0].url;
        setImgUrl(url);
      });

    // 写数据

    utools.onPluginReady(() => {
      const doc = utools.db.get(DOCID);
      if (!doc) {
        // 获取数据
        const dataArr = readConfig();
        console.log(dataArr);
        // 创建
        const { rev, ok, id } = utools.db.put({
          _id: DOCID,
          data: dataArr,
        });
        if (ok) {
          console.log("数据库创建成功, id为" + id);
          console.log(rev);
          // 存储rev
          utools.dbStorage.setItem("eng_rev", rev);
        } else {
          console.log("数据库创建失败");
        }
      } else {
        // 判断文档是否要更新（todo）
        console.log("已经有数据了,你看");
        const data = utools.get(DOCID);
        console.log(data);
      }
    });
  }, []);

  return (
    <div className="outer">
      <div className="img-wrapper">
        <img src={imgUrl} />
      </div>
      <div className="content-wrapper">
        <h1>pass out</h1>
        <article>
          今天我们要学的词是 pass out. To pass out 意思是失去知觉。A pilot who
          allegedly passed out in the cockpit was arrested on suspicion of being
          drunk. 一个据报道在驾驶舱内不省人事的飞行员因涉嫌醉酒被逮捕。A Texas
          couple was arrested after they passed out in the car with drugs and
          their two young children inside.
          得克萨斯州一男一女被警方逮捕，发现他们时，他们已经不省人事，车里还有他们的两个小孩子和毒品。好的，我们今天学习的词是
          pass out, pass out, pass out…
        </article>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

import { DOCID } from "../config/index.js";
import { useInitDB } from "./useInitDB.js";

dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_duration);

const App = () => {
  // 获取每日背景图片
  const getDailyImg = () => {
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
  // 根据日期获取每日句子
  const getDailySentence = () => {
    // 起始日期设定为2022.8.27
    const start = dayjs("2022-08-27");
    const today = dayjs().format("YYYY-MM-DD");
    const end = dayjs(today);
    // 间隔日为下标
    let index = end.diff(start, "day");
    // console.log(index);
    // 从数据库取数据
    if (index < 0) index = 0;
    const pageData = utools.db.get(
      `${DOCID}/oneword/page${Math.ceil((index + 1) / 500)}`
    );
    if (!pageData) {
      setInfo({ title: "暂无数据" });
    } else {
      const todayWord = pageData.data[index];
      setInfo(todayWord);
    }
  };
  useInitDB(getDailySentence);
  const [info, setInfo] = React.useState({});
  const [imgUrl, setImgUrl] = React.useState(``);

  // 处理文章分段
  const splitArticle = React.useMemo(() => {
    if (info.article) {
      const sArr = info.article.split("。");
      return sArr;
    }
    return [];
  }, [info]);

  React.useEffect(() => {
    getDailyImg();
  }, []);

  return (
    <div className="outer">
      <div className="img-wrapper">
        <img src={imgUrl} />
      </div>
      <div className="content-wrapper">
        <h1>{info.title}</h1>
        <article>
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

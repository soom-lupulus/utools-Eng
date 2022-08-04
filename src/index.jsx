const App = () => {
  const [dbData, setDbdata] = React.useState({});

  const url = `http://bing.getlove.cn/bingImage`;
  React.useEffect(() => {
    console.log(utools);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-0">
        <img src={url} />
      </div>
      <div className=" w-4/5 h-2/5 absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col justify-between items-center">
        <div className="text-7xl">pass out</div>
        <div className="text-xl">
          今天我们要学的词是 pass out. To pass out 意思是失去知觉。A pilot who
          allegedly passed out in the cockpit was arrested on suspicion of being
          drunk. 一个据报道在驾驶舱内不省人事的飞行员因涉嫌醉酒被逮捕。A Texas
          couple was arrested after they passed out in the car with drugs and
          their two young children inside.
          得克萨斯州一男一女被警方逮捕，发现他们时，他们已经不省人事，车里还有他们的两个小孩子和毒品。好的，我们今天学习的词是
          pass out, pass out, pass out…
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

const App = () => {
  const [dbData, setDbdata] = React.useState({})
  React.useEffect(() => {
    console.log(utools);
    // utools.db.put({
    //   _id: "demo",
    //   data: "demo",
    // });
    setDbdata(utools.db.get("demo"))
  }, []);

  return <div className="text-4xl">{JSON.stringify(dbData)}</div>;
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

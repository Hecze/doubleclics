import { Spinner } from "@nextui-org/spinner";


const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Spinner size="lg" />
    </div >
  );
};

export default Loading;

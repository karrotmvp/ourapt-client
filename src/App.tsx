import React from "react";

// 당근마켓 미니앱, 캐럿프레임
// import Mini from "@karrotmarket/mini";
import { Navigator, Screen } from "@karrotframe/navigator";
import "@karrotframe/navigator";
import { mini } from "./Karrotmarket/KarrotmarketMini";

// 페이지뷰
import PreopenPage from "./preopen/PreopenPage";

const App: React.FC = () => {
  // const mini = new Mini();

  return (
    <div className="App">
      <Navigator
        theme="Cupertino"
        onClose={() => {
          mini.close();
        }}
      >
        <Screen path="/">
          {/* <PreopenPage displayAptInfo={"6a7eefda7865test"} mini={mini} /> */}
          <PreopenPage />
        </Screen>
      </Navigator>
    </div>
  );
};

export default App;

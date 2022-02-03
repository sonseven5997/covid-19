import "./App.css";
import Title from "./components/Title";
import Countries from "./components/Countries";
import { atom, RecoilRoot } from "recoil";
import Summary from "./components/Summary";
import { ChartDataType } from "./types/chart";
import Chart from "./components/Chart";
import { Country } from "./types/country";
import { CSSProperties } from "react";

export const defaultAtomCountry = {
  Country: "",
  Slug: "",
  ISO2: "",
};

export const atomCountry = atom<Country>({
  key: "atomCountry",
  default: defaultAtomCountry,
});

export const atomChartData = atom<ChartDataType[]>({
  key: "atomChartData",
  default: [],
});

const App = () => {
  return (
    <RecoilRoot>
      <div style={styles.appContainer}>
        <Title />
        <Countries />
        <Summary />
        <div style={styles.chartContainer}>
          <Chart style={styles.chart} />
        </div>
      </div>
    </RecoilRoot>
  );
};

const styles: { [key: string]: CSSProperties } = {
  appContainer: {
    paddingLeft: 150,
    paddingRight: 150,
    paddingBottom: 12,
  },
  chartContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
  chart: {
    flex: 1,
    marginRight: 12,
  },
};

export default App;

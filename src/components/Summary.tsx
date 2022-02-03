import dayjs from "dayjs";
import { isEqual } from "lodash";
import { CSSProperties, useEffect } from "react";
import { useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import api from "../api";
import { atomChartData, atomCountry, defaultAtomCountry } from "../App";
import colors from "../config/colors";
import { ChartDataType } from "../types/chart";
import { SummaryType } from "../types/summary";

const defaultSummary = {
  total: 0,
  recovery: 0,
  death: 0,
};

const Summary = () => {
  const { t } = useTranslation();
  const country = useRecoilValue(atomCountry);
  const setChartData = useSetRecoilState(atomChartData);
  const [summary, setSummary] = useState<SummaryType>(defaultSummary);
  useEffect(() => {
    const getSummary = async () => {
      const data = await api.getCasesByCountry(country.Slug, {
        from: dayjs().toISOString(),
        to: dayjs().toISOString(),
      });
      if (data.data && data.data.length) {
        const { Confirmed, Deaths, Recovered } =
          data.data[data.data.length - 1];
        setSummary({
          total: Confirmed,
          recovery: Recovered,
          death: Deaths,
        });
        setChartData(
          data.data.map((e: ChartDataType) => ({
            Active: e.Active,
            Date: e.Date,
          }))
        );
      } else {
        setSummary(defaultSummary);
      }
    };
    if (!isEqual(country, defaultAtomCountry)) {
      getSummary();
    }
  }, [country, setChartData]);
  return (
    <div style={styles.summaryContainer}>
      <SummaryCard
        title={t("confirmed")}
        value={summary.total}
        color={colors.red}
        marginRight={10}
      />
      <SummaryCard
        title={t("recovery")}
        value={summary.recovery}
        color={colors.green}
        marginRight={10}
      />
      <SummaryCard
        title={t("death")}
        value={summary.death}
        color={colors.normalGrey}
      />
    </div>
  );
};

interface SummaryCardType {
  color: string;
  title: string;
  value: number;
  marginRight?: number;
}

const SummaryCard = ({
  color,
  title,
  value,
  marginRight = 0,
}: SummaryCardType) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        border: `solid 1px ${colors.greyD9}`,
        borderRadius: 8,
        borderLeftWidth: 8,
        paddingLeft: 12,
        height: 80,
        justifyContent: "center",
        borderLeftColor: color,
        marginRight: marginRight,
      }}
    >
      <span>{title}</span>
      <CountUp style={{ fontWeight: "700" }} end={value} duration={1} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  summaryContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 12,
  },
};

export default Summary;

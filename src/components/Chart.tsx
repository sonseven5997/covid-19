import { Radio, RadioChangeEvent } from "antd";
import { CSSProperties } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { atomChartData } from "../App";
import { ChartEnum } from "../config/ChartEnum";
import { Line } from "@ant-design/plots";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Chart = ({ style }: { style?: CSSProperties }) => {
  const { t } = useTranslation();
  const [type, setType] = useState<ChartEnum>(ChartEnum.total);
  const chartData = useRecoilValue(atomChartData)?.map((e) => ({
    ...e,
    Date: dayjs(e.Date).format("DD-MM-YYYY"),
  }));
  const onChange = useCallback((e: RadioChangeEvent) => {
    setType(e.target.value);
  }, []);

  const seriesData = useMemo(() => {
    switch (type) {
      case ChartEnum.total:
        return chartData;
      case ChartEnum.last30Days:
        return chartData.slice(chartData.length - 30, chartData.length);
      case ChartEnum.last7Days:
        return chartData.slice(chartData.length - 7, chartData.length);
      default:
        return chartData;
    }
  }, [chartData, type]);

  const config = useMemo(
    () => ({
      data: seriesData,
      padding: "auto",
      xField: "Date",
      yField: "Active",
    }),
    [seriesData]
  );
  return (
    <div style={style}>
      <Radio.Group onChange={onChange}>
        <Radio.Button value={ChartEnum.total}>
          {t("all").toUpperCase()}
        </Radio.Button>
        <Radio.Button value={ChartEnum.last30Days}>
          {t("days", { count: 30 })}
        </Radio.Button>
        <Radio.Button value={ChartEnum.last7Days}>
          {t("days", { count: 7 })}
        </Radio.Button>
      </Radio.Group>
      <Line {...(config as any)} style={{ marginTop: 12 }} />
    </div>
  );
};

export default Chart;

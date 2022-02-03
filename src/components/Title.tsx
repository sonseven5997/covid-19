import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const Title = () => {
  const {t} = useTranslation()
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: 50 }}>{t("statistic")}</span>
      <span>{`${t("day")} ${dayjs().date()} ${t("month")} ${
        dayjs().month() + 1
      } ${t("year")} ${dayjs().year()} ${dayjs().format("HH:mm")}`}</span>
    </div>
  );
};

export default Title;

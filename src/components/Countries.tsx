import { Select } from "antd";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import api from "../api";
import { Country } from "../types/country";
import "antd/dist/antd.css";
import { useRecoilState } from "recoil";
import { atomCountry, defaultAtomCountry } from "../App";
import { useTranslation } from "react-i18next";

const Countries = () => {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>();
  const [recoilCountry, setRecoilCountryState] = useRecoilState(atomCountry);
  useEffect(() => {
    const getCountries = async () => {
      const data = await api.getCountries();
      setCountries(data.data);
      setRecoilCountryState(
        data.data.find((e: Country) => e.Slug == "vietnam") ??
          defaultAtomCountry
      );
    };
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOptions = useCallback(
    () =>
      countries?.map((c, i) => (
        <Select.Option value={c.Slug} key={i}>
          {c.Country}
        </Select.Option>
      )),
    [countries]
  );

  const onChange = useCallback(
    (country: string) => {
      setRecoilCountryState(
        countries?.find((e) => e.Slug == country) ?? defaultAtomCountry
      );
    },
    [countries, setRecoilCountryState]
  );

  return (
    <div>
      <div>{t("country")}</div>
      <Select
        style={{ width: 200 }}
        onChange={onChange}
        value={recoilCountry.Slug}
        showSearch
        autoClearSearchValue
      >
        {renderOptions()}
      </Select>
    </div>
  );
};

export default Countries;

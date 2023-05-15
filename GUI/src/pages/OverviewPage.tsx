import React from "react";
import { useTranslation } from "react-i18next";
import { Track } from "../components";

const OverviewPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Track justify="between">
        <h1>{t("overview.title")}</h1>
      </Track>
    </>
  );
};

export default OverviewPage;

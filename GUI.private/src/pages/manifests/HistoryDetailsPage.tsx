import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Track } from '../../components';
import { useLocation } from 'react-router-dom';
import { ManifestHistory } from '../../types/manifestHistory';
import axios from 'axios';
import { manifestHistoryDetails } from '../../resources/api-constants';
import ReactDiffViewer from 'react-diff-viewer';

const ManifestsHistoryDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const details = location.state as ManifestHistory;
  const [historyDetails, setHistoryDetails] = useState<any>([]);
  useEffect(() => {
    getHistoryDetails();
  }, []);

  const getHistoryDetails = async () => {
    const res = await axios.post(manifestHistoryDetails(), {
      history_id: details.historyId,
    });
    console.log(res.data);
    const parentManifest = {
      components: JSON.parse(res.data[0].components),
      extraConfigs: JSON.parse(res.data[0].extraConfigs),
      securityConfigs: JSON.parse(res.data[0].securityConfigs),
    };

    let updateManifest = {};
    if (details.type === 'update') {
      updateManifest = {
        components: JSON.parse(res.data[1].components),
        extraConfigs: JSON.parse(res.data[1].extraConfigs),
        securityConfigs: JSON.parse(res.data[1].securityConfigs),
      };
    }
    setHistoryDetails([parentManifest, updateManifest]);
    console.log(res.data);
  };

  return (
    <>
      <h2>{t('menu.details')}</h2>
      <h4>{`History ID: ${details.historyId}`}</h4>
      {historyDetails && (
        <Track>
          {details.type === 'manifest' && (
            <Track direction="vertical" justify="start" align="left">
              <span style={{ marginBottom: '10px' }}>
                <h5>{t('menu.manifest')}</h5>
              </span>
              <Card>
                <div>
                  <pre>{JSON.stringify(historyDetails[0], null, 2)}</pre>
                </div>
              </Card>
            </Track>
          )}
          {details.type === 'update' && (
            <Track direction="vertical" justify="start" align="left">
              <span style={{ marginBottom: '10px' }}>
                <h5>{t('menu.updateManifest')}</h5>
              </span>
              <Card>
                <ReactDiffViewer
                  oldValue={JSON.stringify(historyDetails[0], null, 2)}
                  newValue={JSON.stringify(historyDetails[1], null, 2)}
                  splitView={true}
                  hideLineNumbers={true}
                  extraLinesSurroundingDiff={30000}
                />
              </Card>
            </Track>
          )}
        </Track>
      )}
    </>
  );
};
export default ManifestsHistoryDetailsPage;

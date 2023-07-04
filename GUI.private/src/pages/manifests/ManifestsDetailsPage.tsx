import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Track } from '../../components';
import { useLocation } from 'react-router-dom';
import { Manifest } from '../../types/manifest';
import axios from 'axios';
import {
  manifestDetailsById,
  manifestHistoryDetails,
  manifestUpdateDetails,
} from '../../resources/api-constants';
import ReactDiffViewer from 'react-diff-viewer';

const ManifestsDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const details = location.state as Manifest;
  const [manifestDetails, setManifestDetails] = useState<any>([]);
  useEffect(() => {
    if (details.historyId != null) {
      getHistoryDetails();
    } else if (details.updateId != null && details.parentManifestId != null) {
      getUpdateDetails();
    } else {
      getManifestDetails();
    }
  }, []);

  const getManifestDetails = async () => {
    const res = await axios.post(manifestDetailsById(), {
      manifest_id: details.manifestId,
    });
    const manifest = {
      buerokrattVersion: res.data[0].buerokrattVersion,
      components: JSON.parse(res.data[0].components),
      extraConfigs: JSON.parse(res.data[0].extraConfigs),
      securityConfigs: JSON.parse(res.data[0].securityConfigs),
    };

    setManifestDetails([manifest]);
  };

  const getUpdateDetails = async () => {
    const res = await axios.post(manifestUpdateDetails(), {
      update_id: details.updateId,
    });
    const parentManifest = {
      buerokrattVersion: res.data[0].buerokrattVersion,
      components: JSON.parse(res.data[0].components),
      extraConfigs: JSON.parse(res.data[0].extraConfigs),
      securityConfigs: JSON.parse(res.data[0].securityConfigs),
    };

    const updateManifest = {
      buerokrattVersion: res.data[1].buerokrattVersion,
      components: JSON.parse(res.data[1].components),
      extraConfigs: JSON.parse(res.data[1].extraConfigs),
      securityConfigs: JSON.parse(res.data[1].securityConfigs),
    };

    setManifestDetails([parentManifest, updateManifest]);
  };

  const getHistoryDetails = async () => {
    const res = await axios.post(manifestHistoryDetails(), {
      history_id: details.historyId,
    });

    const parentManifest = {
      buerokrattVersion: res.data[0].buerokrattVersion,
      components: JSON.parse(res.data[0].components),
      extraConfigs: JSON.parse(res.data[0].extraConfigs),
      securityConfigs: JSON.parse(res.data[0].securityConfigs),
    };

    let updateManifest = {};
    if (details.type === 'update') {
      updateManifest = {
        buerokrattVersion: res.data[1].buerokrattVersion,
        components: JSON.parse(res.data[1].components),
        extraConfigs: JSON.parse(res.data[1].extraConfigs),
        securityConfigs: JSON.parse(res.data[1].securityConfigs),
      };
    }
    setManifestDetails([parentManifest, updateManifest]);
  };

  return (
    <>
      <h2>{t('manifest.details')}</h2>
      {details.historyId && <h4>{`History ID: ${details.historyId}`}</h4>}
      {details.type === 'manifest' && (
        <h4>{`Manifest ID: ${details.parentManifestId}`}</h4>
      )}
      {details.updateId != null && <h4>{`Update ID: ${details.updateId}`}</h4>}
      {details.parentManifestId == null && (
        <h4>{`Manifest ID: ${details.manifestId}`}</h4>
      )}
      {manifestDetails && (
        <Track>
          {(details.type === 'manifest' ||
            details.parentManifestId == null ||
            details.status === 'published') && (
            <Track direction="vertical" justify="start" align="left">
              <span style={{ marginBottom: '10px' }}>
                <h5>{t('menu.manifest')}</h5>
              </span>
              <Card>
                <div>
                  <pre>{JSON.stringify(manifestDetails[0], null, 2)}</pre>
                </div>
              </Card>
            </Track>
          )}
          {details.updateId != null && details.status != 'published' && (
            <Track direction="vertical" justify="start" align="left">
              <span style={{ marginBottom: '10px' }}>
                <h5>{t('manifest.updateManifest')}</h5>
              </span>
              <Card>
                <ReactDiffViewer
                  oldValue={JSON.stringify(manifestDetails[0], null, 2)}
                  newValue={JSON.stringify(manifestDetails[1], null, 2)}
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
export default ManifestsDetailsPage;

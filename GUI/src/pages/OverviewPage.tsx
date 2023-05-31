import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Track } from '../components';
import { dummyApi, toggleDummyApi } from '../resources/api-constants';

const OverviewPage: React.FC = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchDummy();
  }, []);

  const fetchDummy = async () => {
    try {
      setResult('loading . . . .');
      const res = await axios.get(dummyApi());
      setResult(JSON.stringify(res.data));
    } catch (err: any) {
      setResult('failed to fetch: ' + err.toString());
    }
  };

  const handleToggleClick = async () => {
    try {
      setResult('loading . . . .');
      await axios.post(toggleDummyApi());
      await fetchDummy();
    } catch (err: any) {
      setResult('failed to toggle: ' + err.toString());
    }
  };

  return (
    <>
      <Track justify="between">
        <h1>{t('overview.title')}</h1>
      </Track>

      <Track gap={20}>
        <span>{result}</span>
        <Button onClick={handleToggleClick}>toggle</Button>
      </Track>
    </>
  );
};

export default OverviewPage;

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ManifestHistory } from '../../types/manifestHistory';
import { useQuery } from '@tanstack/react-query';
import { DataTable, Label } from '../../components';
import { createColumnHelper } from '@tanstack/react-table';

const ManifestsHistoryPage: React.FC = () => {
  const { t } = useTranslation();

  const { data: history } = useQuery<ManifestHistory[]>({
    queryKey: ['manifest/history'],
    onSuccess: (data) => {
      console.log(data);
      console.log(history);
    },
  });

  const appRequestColumnHelper = createColumnHelper<ManifestHistory>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('historyId', {
        header: 'History ID',
        cell: (uniqueIdentifier) => uniqueIdentifier.getValue(),
      }),
    ],
    [history, appRequestColumnHelper, t]
  );

  return (
    <>
      <DataTable data={history} columns={appRequestColumns} />
      {/* {history && history.length && (
        <DataTable data={history} columns={appRequestColumns} />
      )} */}
    </>
  );
};
export default ManifestsHistoryPage;

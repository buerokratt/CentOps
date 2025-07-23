import { Button, Card, DataTable, Icon, Label, Track } from 'components';
import { type MouseEventHandler, useCallback, useMemo, useState } from 'react';
import type { ApiClientCertificate } from 'types/client';
import { createColumnHelper, type SortingState } from '@tanstack/react-table';
import { TransButton } from 'i18n/trans/button';
import { Trans } from 'react-i18next';
import { TransTableHead } from 'i18n/trans/table';
import { Link } from 'components/Router/Link';
import { ROUTES } from 'resources/routes-constants';
import { TransTitle } from 'i18n/trans/title';
import { TransLabel } from 'i18n/trans/label';
import { GenerateCertificateDialog } from 'pages/client/dialog/GenerateCertificateDialog';
import { DeleteCertificateDialog } from 'pages/client/dialog/DeleteCertificateDialog';
import { ConfirmChangesDialog } from 'pages/client/dialog/ConfirmChangesDialog';
import { CertificateDetailsDialog } from 'pages/client/dialog/CertificateDetailsDialog';
import { withAuthorization } from 'hoc/withAuthorization';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { usePagination } from 'hooks/usePagination';
import { initialPaginationData, type Pagination } from 'types/pagination';
import api from 'services/api';

export const ClientCertificateList = withAuthorization(() => {
  const [pagination, setPagination] = usePagination();
  const { clientId } = useParams<{ clientId: string }>();
  const { data: certificates } = useQuery<Pagination<ApiClientCertificate>>({
    meta: { pagination },
    queryKey: [
      `admin/clients/certificates?clientId=${clientId}`,
      ...Object.values(pagination),
    ],
    initialData: initialPaginationData<ApiClientCertificate>(),
  });
  const handleGenerateCertificate = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(async (e) => {
    e.preventDefault();
    await api.get(`admin/clients/certificates/generate?clientId=${clientId}`);
  }, []);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<ApiClientCertificate>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="certificate" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'createdAt',
        header: () => <TransTableHead i18nKey="createdAt" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'updatedAt',
        header: () => <TransTableHead i18nKey="updatedAt" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'status',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: () => (
          <Label type="error">
            <Icon name="danger" size="small" />
            <TransLabel i18nKey="revoked" />
          </Label>
        ),
      }),
      columnHelper.accessor('id', {
        id: 'actions',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: () => (
          <Button appearance="text">
            <Icon name="delete" />
            <TransButton i18nKey="delete" />
          </Button>
        ),
      }),
    ],
    []
  );

  return (
    <>
      <CertificateDetailsDialog />
      <GenerateCertificateDialog />
      <DeleteCertificateDialog />
      <ConfirmChangesDialog />

      <Track justify="between">
        <Track direction="vertical" align="left">
          <h6>
            <TransTitle i18nKey="client" values={{ client: 'A' }} />
          </h6>
          <h1>
            <Trans i18nKey="title.clientCertificates" defaults="Certificates" />
          </h1>
        </Track>
        <Button appearance="primary" onClick={handleGenerateCertificate}>
          <TransButton i18nKey="generateCertificate" />
        </Button>
      </Track>

      <Card
        footer={
          <Link to={ROUTES.CLIENT_DETAILS_ROUTE}>
            <Button appearance="primary" outlined>
              <TransButton i18nKey="backToClient" />
            </Button>
          </Link>
        }
      >
        <Card disablePadding>
          <DataTable
            data={certificates.items}
            columns={columns}
            sortable
            pagination={pagination}
            pagesCount={certificates.totalPages}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
          />
        </Card>
      </Card>
    </>
  );
});

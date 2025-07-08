import {
  Button,
  Card,
  ConfirmDeleteButton,
  DataTable,
  Icon,
  Track,
} from 'components';
import { useCallback, useMemo, useState } from 'react';
import type { ApiUser } from 'types/user';
import {
  createColumnHelper,
  type PaginationState,
  type SortingState,
} from '@tanstack/react-table';
import { TransButton } from 'i18n/trans/button';
import { TransNav } from 'i18n/trans/nav';
import { TransTableHead } from 'i18n/trans/table';
import { ROUTES } from 'resources/routes-constants';
import { Link } from 'components/Router/Link';
import { withAuthorization } from 'hoc/withAuthorization';
import { useQuery } from '@tanstack/react-query';
import api from 'services/api';

export const UserListPage = withAuthorization(() => {
  const {
    data: { response: users },
    refetch,
  } = useQuery<{ response: ApiUser[] }>({
    queryKey: ['admin/clusters'],
    initialData: { response: [] },
  });

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const handleDelete = useCallback(async ({ userId }: ApiUser) => {
    await api.delete(`/admin/users?userId=${userId}`);
    refetch();
  }, []);
  const columnHelper = createColumnHelper<ApiUser>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: () => <TransTableHead i18nKey="usersName" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('name', {
        id: 'identificationNo',
        header: () => <TransTableHead i18nKey="identificationNo" />,
        cell: (message) => message.getValue(),
      }),
      columnHelper.accessor('id', {
        id: 'actions',
        header: '',
        enableSorting: false,
        meta: {
          size: 0,
        },
        cell: (props) => (
          <Track gap={8}>
            <Button
              appearance="text"
              component={Link}
              to={ROUTES.USER_DETAILS_ROUTE}
              params={{ clusterId: props.row.original.userId }}
            >
              <Icon name="edit" />
              <TransButton i18nKey="edit" />
            </Button>
            <ConfirmDeleteButton
              appearance="text"
              entity={props.row.original}
              entityName="name"
              onConfirm={handleDelete}
            >
              <Icon name="delete" />
              <TransButton i18nKey="delete" />
            </ConfirmDeleteButton>
          </Track>
        ),
      }),
    ],
    []
  );

  return (
    <>
      <Track justify="between">
        <Track direction="vertical" align="left">
          <h6>
            <TransNav i18nKey="settings" />
          </h6>
          <h1>
            <TransNav i18nKey="users" />
          </h1>
        </Track>
        <Link to={ROUTES.USER_DETAILS_ROUTE} params={{ userId: 'create' }}>
          <Button appearance="primary">
            <TransButton i18nKey="addUser" />
          </Button>
        </Link>
      </Track>

      <Card>
        <Card disablePadding>
          <DataTable
            data={users}
            columns={columns}
            sortable
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
          />
        </Card>
      </Card>
    </>
  );
});

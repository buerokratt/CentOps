import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, DataTable, FormInput, Modal, Track } from '../components';
import { Institution } from '../types';
import { addInstitute, deleteInstitution } from '../resources/api-constants';
import { useToast } from '../hooks/useToast';

const InstitutionsPages: React.FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const [institutionToDelete, selectInstitutionIdToDelete] = useState<Institution | null>(null);
  const [addNewInstitution, setAddNewInstitution] = useState(false);
  const [newInstitute, setNewInstitute] = useState<{ name: string, email: string }>({ name: '', email: '' });

  const handleDelete = () => {
    if (!institutionToDelete) {
      return;
    }
    axios.delete(deleteInstitution(institutionToDelete.id))
      .then(() => {
        refetch();
        toast.open({
          type: 'success',
          title: 'Delete',
          message: 'Institution was deleted successfuly'
        });
      })
      .catch(() => toast.open({
        type: 'error',
        title: 'Delete',
        message: 'Failed to delete institution'
      }))
      .finally(closeConfirmDeleteModal)
  }

  const showConfirmDeleteModal = (inst: Institution) => selectInstitutionIdToDelete(inst);
  const closeConfirmDeleteModal = () => selectInstitutionIdToDelete(null);

  const handleAddNewInstitute = () => {
    if (!newInstitute) {
      return;
    }
    axios.post(addInstitute(), newInstitute)
      .then(() => {
        refetch();
        toast.open({
          type: 'success',
          title: 'New Institute',
          message: 'Institution was added successfuly'
        });
        setAddNewInstitution(false);
      })
      .catch(() => toast.open({
        type: 'error',
        title: 'New Institute',
        message: 'Failed to add institution'
      }));
  }

  const { data: institutions, refetch, } = useQuery<Institution[]>({
    queryKey: ['admin/institutions'],
  });

  const institutionColumnHelper = createColumnHelper<Institution>();
  const institutionColumns = useMemo(
    () => [
      institutionColumnHelper.accessor('id', {
        header: 'id',
        cell: (id) => id.getValue(),
      }),
      institutionColumnHelper.accessor('name', {
        header: `${t('institutions.name')}`,
        cell: (name) => name.getValue(),
      }),
      institutionColumnHelper.accessor('contactEmail', {
        header: `${t('institutions.contact-email')}`,
        cell: (contactEmail) => contactEmail.getValue(),
      }),
      institutionColumnHelper.accessor('status', {
        header: `${t('institutions.status')}`,
        cell: (status) => status.getValue(),
      }),
      institutionColumnHelper.display({
        header: '',
        id: 'manage',
        cell: (props) => (
          <Track direction='horizontal' justify='between' gap={8}>
            <Button
              appearance="text"
              onClick={() =>
                navigate(
                  `/centops/institutions/edit/${props.row.original.id}`,
                  { state: props.row.original, }
                )
              }
            >
              {t('institutions.edit')}
            </Button>
            <Button
              appearance="text"
              onClick={() => showConfirmDeleteModal(props.row.original)}
            >
              {t('institutions.delete')}
            </Button>
          </Track>
        ),
      }),
    ],
    [institutions, institutionColumnHelper, t]
  );

  return (
    <>
      <Track justify="between">
        <h1>{t('institutions.title')}</h1>
      </Track>
      <Track justify="end">
        <Button appearance='primary' onClick={() => setAddNewInstitution(true)}>
          Add a new institution
        </Button>
      </Track>
      <DataTable
        data={institutions ?? []}
        columns={institutionColumns}
      />
      {
        institutionToDelete &&
        <Modal
          title={`You about to delete this "${institutionToDelete?.name}" ?`}
          onClose={closeConfirmDeleteModal}
        >
          <Track justify='end' gap={12}>
            <Button appearance='secondary' onClick={closeConfirmDeleteModal}>
              Cancel
            </Button>
            <Button appearance='error' onClick={handleDelete}>
              Delete
            </Button>
          </Track>
        </Modal>
      }
      {
        addNewInstitution &&
        <Modal
          title='New Institution'
          onClose={() => setAddNewInstitution(false)}
        >
          <Track direction='vertical' gap={12} style={{ marginBottom: '2rem' }}>
            <FormInput
              label="name"
              name="name"
              value={newInstitute.name}
              onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value, })}
            />
            <FormInput
              label="email"
              name="email"
              value={newInstitute.email}
              onChange={(e) => setNewInstitute({ ...newInstitute, email: e.target.value, })}
            />
          </Track>
          <Track justify='end' gap={12}>
            <Button appearance='secondary' onClick={() => setAddNewInstitution(false)}>
              Cancel
            </Button>
            <Button appearance='success' onClick={handleAddNewInstitute}>
              Save
            </Button>
          </Track>
        </Modal>
      }
    </>
  );
};

export default InstitutionsPages;

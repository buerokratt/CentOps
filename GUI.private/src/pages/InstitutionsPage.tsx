import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Button, DataTable, FormInput, Modal, Switch, SwitchBox, Track } from '../components';
import { Institution } from '../types';
import { addInstitute, deleteInstitute, editInstitute, getInstitutions, toggleInstituteActiveStatus } from '../resources/api-constants';
import { useToast } from '../hooks/useToast';

const InstitutionsPages: React.FC = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [institutionToDelete, selectInstitutionIdToDelete] = useState<Institution | null>(null);
  const [newInstitute, setNewInstitute] = useState<{ id?: number, name?: string, contactEmail?: string, guiStatus: 'none' | 'add' | 'edit', }>({ name: '', contactEmail: '', guiStatus: 'none' });

  const handleDelete = () => {
    if (!institutionToDelete) {
      return;
    }
    axios.post(deleteInstitute(institutionToDelete.id))
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
  const toggleActiveStatus = (id: number) => {
    axios.post(toggleInstituteActiveStatus(id))
      .then(() => {
        refetch();
        toast.open({
          type: 'success',
          title: 'Status Update',
          message: 'Status was updated successfuly'
        });
      })
      .catch(() => toast.open({
        type: 'error',
        title: 'Status Update',
        message: 'Failed to update institution status'
      }));
  };

  const handleAddEditNewInstitute = () => {
    const { id, guiStatus, name, contactEmail } = newInstitute;
    const url = guiStatus === 'edit' ? editInstitute() : addInstitute();
    const title  = guiStatus === 'edit' ? 'Edit Institute' : 'New Institute';
    axios.post(url, {
      id,
      name,
      email: contactEmail
    })
      .then(() => {
        refetch();
        toast.open({
          type: 'success',
          title,
          message: `Institution was ${guiStatus}ed successfuly`
        });
        setNewInstitute({ guiStatus: 'none' });
      })
      .catch(() => toast.open({
        type: 'error',
        title,
        message: `Failed to ${guiStatus} institution`
      }));
  }

  const showEditModal = (inst: Institution) => setNewInstitute({ guiStatus: 'edit', ...inst });

  const { data: institutions, refetch, } = useQuery<Institution[]>({
    queryKey: [getInstitutions()],
  });

  const institutionColumnHelper = createColumnHelper<Institution>();
  const institutionColumns = useMemo(
    () => [
      institutionColumnHelper.accessor('id', {
        header: 'id',
        cell: (id) => id.getValue(),
        enableSorting: true,
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
        cell: (status) => (
          <Switch
            checked={status.getValue() === 'active'}
            onCheckedChange={() => toggleActiveStatus(status.row.original.id)}
            hideLabel
            name=''
            label=''
            offLabel='Inactive'
            onLabel='Active'
          />
        ),
      }),
      institutionColumnHelper.display({
        header: '',
        id: 'manage',
        cell: (props) => (
          <Track direction='horizontal' justify='between' gap={8}>
            <Button
              appearance="text"
              onClick={() => showEditModal(props.row.original)}
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
        <Button appearance='primary' onClick={() => setNewInstitute({ guiStatus: 'add' })}>
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
        newInstitute.guiStatus !== 'none' &&
        <Modal
          title={newInstitute.guiStatus === 'add' ? 'New Institution' : 'Edit Institution'}
          onClose={() => setNewInstitute({ guiStatus: 'none' })}
        >
          <Track direction='vertical' gap={12} style={{ marginBottom: '2rem' }}>
            <FormInput
              label="name"
              name="name"
              value={newInstitute.name || ''}
              onChange={(e) => setNewInstitute({ ...newInstitute, name: e.target.value, })}
            />
            <FormInput
              label="email"
              name="email"
              value={newInstitute.contactEmail || ''}
              onChange={(e) => setNewInstitute({ ...newInstitute, contactEmail: e.target.value, })}
            />
          </Track>
          <Track justify='end' gap={12}>
            <Button appearance='secondary' onClick={() => setNewInstitute({ guiStatus: 'none' })}>
              Cancel
            </Button>
            <Button appearance='success' onClick={handleAddEditNewInstitute}>
              Save
            </Button>
          </Track>
        </Modal>
      }
    </>
  );
};

export default InstitutionsPages;

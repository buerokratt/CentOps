import React, { useEffect, useState } from 'react';
import { Button, Card, FormInput, Icon, Track } from '../../components';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Manifest } from '../../types';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { useToast } from '../../hooks/useToast';
import { AxiosError } from 'axios';

const CreateEditManifestPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const details = location.state as Manifest;
  const toast = useToast();
  let [manifest, setManifest] = useState<any>({
    buerokratt_version: '1.0',
    components: {
      ruuter: '1.0',
      resql: '1.0',
      tim: '1.0',
      data_mapper: '1.0',
      database: '1.0',
      users_db: '1.0',
      services_db: '1.0',
      centops_db: '1.0',
    },
    extra_configs: {
      automatic_updates: 'false',
    },
    security_configs: {
      encryption_method: 'aes',
      decryption_method: 'aes',
      key: 'customKey',
    },
  });

  useEffect(() => {
    if (details != null) {
      setManifest({
        buerokratt_version: details.buerokrattVersion ?? '1.0',
        components: JSON.parse(details.components ?? ''),
        extra_configs: JSON.parse(details.extraConfigs ?? ''),
        security_configs: JSON.parse(details.securityConfigs ?? ''),
      });
    }
  }, []);

  const createManifestMutation = useMutation({
    mutationFn: () => api.post('manifest/create-manifest', manifest),
    onSuccess: async () => {
      navigate(-1);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestCreateSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  const createNewUpdateMutation = useMutation({
    mutationFn: () =>
      api.post('manifest/create-update', {
        parent_manifest_id: details.manifestId,
        ...manifest,
      }),
    onSuccess: async () => {
      navigate(-1);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestUpdateCreateSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  const editManifestUpdateMutation = useMutation({
    mutationFn: () =>
      api.post('manifest/update-manifest-update', {
        update_id: details.updateId,
        parent_manifest_id: details.parentManifestId,
        ...manifest,
      }),
    onSuccess: async () => {
      navigate(-1);
      toast.open({
        type: 'success',
        title: t('global.notification'),
        message: t('manifest.manifestUpdateEditSuccess'),
      });
    },
    onError: (error: AxiosError) => {
      toast.open({
        type: 'error',
        title: t('global.notificationError'),
        message: error.message,
      });
    },
  });

  return (
    <>
      <h2>
        {details && details.manifestId
          ? 'Create New Update'
          : details && details.updateId != null
          ? 'Edit Update'
          : 'Create New Manifest'}
      </h2>

      <Card>
        <Card>
          <Track direction="vertical" align="left">
            <h3>{'Buerokatt Version'}</h3>
            <Track gap={20} style={{ marginTop: '20px' }}>
              <FormInput
                defaultValue={'buerokatt_version'}
                name={''}
                label={''}
                disabled={true}
              ></FormInput>
              :
              <FormInput
                name={''}
                label={''}
                defaultValue={manifest.buerokratt_version}
                onChange={(e) => {
                  setManifest({
                    ...manifest,
                    buerokratt_version: e.currentTarget.value,
                  });
                }}
              ></FormInput>
            </Track>
          </Track>
        </Card>
        <div style={{ marginTop: '20px' }}></div>
        <Card>
          <Track direction="vertical" align="left">
            <h3>{'Components'}</h3>
            {Object.keys(manifest.components).map((key: string, i) => (
              <Track gap={20} style={{ marginTop: '20px' }} key={i}>
                <FormInput
                  defaultValue={key != 'new_key' ? key : ''}
                  placeholder={key === 'new_key' ? 'New Key' : ''}
                  name={''}
                  label={''}
                  disabled={i <= 7 ? true : false}
                  onChange={(e) => {
                    setManifest({
                      ...manifest,
                      components: {
                        ...manifest.components,
                        [e.currentTarget.value]: manifest.components[key],
                      },
                    });
                    setManifest((current: any) => {
                      const { _, ...manifest } = current;
                      delete manifest.components[key];
                      return manifest;
                    });
                  }}
                ></FormInput>
                :
                <FormInput
                  defaultValue={
                    manifest.components[key] != 'new_value'
                      ? manifest.components[key]
                      : ''
                  }
                  placeholder={
                    manifest.components[key] === 'new_value' ? 'New Value' : ''
                  }
                  onChange={(e) => {
                    setManifest({
                      ...manifest,
                      components: {
                        ...manifest.components,
                        [key]: e.currentTarget.value,
                      },
                    });
                  }}
                  name={''}
                  label={''}
                ></FormInput>
                {i > 7 && (
                  <Icon
                    icon={
                      <AiFillMinusCircle
                        fontSize={22}
                        color="rgba(210, 4, 45, 1)"
                        onClick={() => {
                          setManifest((current: any) => {
                            const { _, ...manifest } = current;
                            delete manifest.components[key];
                            return manifest;
                          });
                        }}
                      />
                    }
                    size="medium"
                  />
                )}
              </Track>
            ))}
            <Button
              appearance="secondary"
              style={{ marginTop: '30px' }}
              onClick={() => {
                setManifest({
                  ...manifest,
                  components: {
                    ...manifest.components,
                    ['new_key']: 'new_value',
                  },
                });
              }}
            >
              {'Add New Component'}
            </Button>
          </Track>
        </Card>
        <div style={{ marginTop: '20px' }}></div>
        <Card>
          <Track direction="vertical" align="left">
            <h3>{'Extra Configurations'}</h3>
            {Object.keys(manifest.extra_configs).map((key, i) => (
              <Track gap={20} style={{ marginTop: '20px' }} key={i}>
                <FormInput
                  defaultValue={key != 'new_key' ? key : ''}
                  placeholder={key === 'new_key' ? 'New Key' : ''}
                  name={''}
                  label={''}
                  disabled={i == 0 ? true : false}
                ></FormInput>
                :
                <FormInput
                  name={''}
                  label={''}
                  defaultValue={
                    manifest.extra_configs[key] != 'new_value'
                      ? manifest.extra_configs[key]
                      : ''
                  }
                  placeholder={
                    manifest.extra_configs[key] === 'new_value'
                      ? 'New Value'
                      : ''
                  }
                  onChange={(e) => {
                    setManifest({
                      ...manifest,
                      extra_configs: {
                        ...manifest.extra_configs,
                        [key]: e.currentTarget.value,
                      },
                    });
                  }}
                ></FormInput>
                {i != 0 && (
                  <Icon
                    icon={
                      <AiFillMinusCircle
                        fontSize={22}
                        color="rgba(210, 4, 45, 1)"
                        onClick={() => {
                          setManifest((current: any) => {
                            const { _, ...manifest } = current;
                            delete manifest.extra_configs[key];
                            return manifest;
                          });
                        }}
                      />
                    }
                    size="medium"
                  />
                )}
              </Track>
            ))}
            <Button
              appearance="secondary"
              style={{ marginTop: '30px' }}
              onClick={() => {
                setManifest({
                  ...manifest,
                  extra_configs: {
                    ...manifest.extra_configs,
                    ['new_key']: 'new_value',
                  },
                });
              }}
            >
              {'Add New Configuration'}
            </Button>
          </Track>
        </Card>
        <div style={{ marginTop: '20px' }}></div>
        <Card>
          <Track direction="vertical" align="left">
            <h3>{'Security Configurations'}</h3>
            {Object.keys(manifest.security_configs).map((key, i) => (
              <Track gap={20} style={{ marginTop: '20px' }} key={i}>
                <FormInput
                  defaultValue={key != 'new_key' ? key : ''}
                  placeholder={key === 'new_key' ? 'New Key' : ''}
                  name={''}
                  label={''}
                  disabled={i < 3 ? true : false}
                ></FormInput>
                :
                <FormInput
                  defaultValue={
                    manifest.security_configs[key] != 'new_value'
                      ? manifest.security_configs[key]
                      : ''
                  }
                  placeholder={
                    manifest.security_configs[key] === 'new_value'
                      ? 'New Value'
                      : ''
                  }
                  name={''}
                  label={''}
                  onChange={(e) => {
                    setManifest({
                      ...manifest,
                      security_configs: {
                        ...manifest.security_configs,
                        [key]: e.currentTarget.value,
                      },
                    });
                  }}
                ></FormInput>
                {i >= 3 && (
                  <Icon
                    icon={
                      <AiFillMinusCircle
                        fontSize={22}
                        color="rgba(210, 4, 45, 1)"
                        onClick={() => {
                          setManifest((current: any) => {
                            const { _, ...manifest } = current;
                            delete manifest.security_configs[key];
                            return manifest;
                          });
                        }}
                      />
                    }
                    size="medium"
                  />
                )}
              </Track>
            ))}
            <Button
              appearance="secondary"
              style={{ marginTop: '30px' }}
              onClick={() => {
                setManifest({
                  ...manifest,
                  security_configs: {
                    ...manifest.security_configs,
                    ['new_key']: 'new_value',
                  },
                });
              }}
            >
              {'Add New Security Configuration'}
            </Button>
          </Track>
        </Card>
        <Track justify="end">
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => {
              if (details && details.manifestId) {
                createNewUpdateMutation.mutate();
              } else if (details && details.updateId != null) {
                editManifestUpdateMutation.mutate();
              } else {
                createManifestMutation.mutate();
              }
            }}
          >
            {details && details.manifestId
              ? 'Create Update'
              : details && details.updateId != null
              ? 'Edit Update'
              : 'Create Manifest'}
          </Button>
        </Track>
      </Card>
    </>
  );
};
export default CreateEditManifestPage;

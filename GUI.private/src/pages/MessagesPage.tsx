import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, DataTable, Track } from '../components';
import { getInboxMessages, getOutboxMessages } from '../resources/api-constants';
import { createColumnHelper } from '@tanstack/react-table';
import SendMessage from '../components/SendMessage';

interface Message {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  status: string;
  type: string;
  timestamp: string;
}

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<'inbox' | 'outbox'>('inbox');

  useEffect(() => {
    fetchMessages(activeTab);
  }, [activeTab]);

  const fetchMessages = async (tab: 'inbox' | 'outbox') => {
    try {
      const url = tab === 'inbox' ? getInboxMessages() : getOutboxMessages();
      const response: AxiosResponse<Message[]> = await axios.post(url, { user_id: 123 });
      setMessages(response.data);
    } catch (error) {
      setMessages([]);
    }
  };

  const appRequestColumnHelper = createColumnHelper<Message>();
  const appRequestColumns = useMemo(
    () => [
      appRequestColumnHelper.accessor('message', {
        header: 'Message',
        cell: (message) => message.getValue(),
      }),
      appRequestColumnHelper.accessor('sender', {
        header: 'Sender',
        cell: (sender) => sender.getValue(),
      }),
      appRequestColumnHelper.accessor('receiver', {
        header: 'Receiver',
        cell: (receiver) => receiver.getValue(),
      }),
      appRequestColumnHelper.accessor('status', {
        header: 'Status',
        cell: (status) => status.getValue(),
      }),
      appRequestColumnHelper.accessor('timestamp', {
        header: 'Date',
        cell: (timestamp) => timestamp.getValue(),
      }),
    ], []);

  return (
    <Track direction='vertical' justify='start' align='stretch' gap={26}>
      <Track direction='horizontal' justify='between'>
        <Track gap={16}>
          <Button
            appearance={activeTab === 'inbox' ? 'primary' : 'text'}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
          </Button>
          <Button
            appearance={activeTab === 'outbox' ? 'primary' : 'text'}
            onClick={() => setActiveTab('outbox')}
          >
            Outbox
          </Button>
        </Track>
        <SendMessage onSendMessage={() => fetchMessages(activeTab)} />
      </Track>
      <h2>{activeTab === 'inbox' ? 'Inbox Messages' : 'Outbox Messages'}</h2>
      <DataTable
        data={messages}
        columns={appRequestColumns}
      />
    </Track>
  );
};

export default MessagesPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getParticipants, sendReplyApi } from '../../resources/api-constants';
import Button from '../Button';
import Modal from '../Modal';
import Track from '../Track';
import { useToast } from '../../hooks/useToast';

interface Participant {
  id: number;
  name: string;
}

interface ReplyMessageProps {
  onSendMessage: () => void;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({ onSendMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessageContent] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState<number | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleReplyMessage = () => {
    if (message.trim() === '' || selectedReceiver === null) {
      toast.open({
        type: 'error',
        title: 'Messages',
        message: 'Please select a receiver',
      });
      return;
    }
    axios
      .post(sendReplyApi(), {
        message,
        receiver_id: selectedReceiver,
        sender_id: 1,
        type: 'TEXT',
      })
      .then(() => {
        toast.open({
          type: 'success',
          title: 'Messages',
          message: 'Message has been sent',
        });

        onSendMessage();
        resetForm();
      })
      .catch((error) => {
        toast.open({
          type: 'error',
          title: 'Messages',
          message: 'Failed to send your message',
        });
      });
  };

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(getParticipants());
      setParticipants(response.data);
    } catch (error) {
      setParticipants([]);
    }
  };

  const resetForm = () => {
    setMessageContent('');
    setSelectedReceiver(null);
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Reply</Button>
      {showModal && (
        <Modal title="Reply" onClose={resetForm}>
          <Track>
            <label>Receiver:</label>
            <select
              value={selectedReceiver || ''}
              onChange={(e) => setSelectedReceiver(Number(e.target.value))}
            >
              <option value="">Select Receiver</option>
              {participants.map((participant) => (
                <option key={participant.id} value={participant.id}>
                  {participant.name}
                </option>
              ))}
            </select>
          </Track>
          <Track>
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </Track>
          <Track justify="end" gap={16}>
            <Button appearance="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleReplyMessage}>Reply</Button>
          </Track>
        </Modal>
      )}
    </>
  );
};

export default ReplyMessage;

import { ParticipantStatus, ParticipantType } from '.';
import { KeyValueMap } from './keyValueMap';

export interface Participant {
  readonly id: number;
  readonly institutionId: number;
  readonly participantStatus: ParticipantStatus;
  readonly participantType: ParticipantType;
  readonly timestamp: string;
  readonly uniqueIdentifier: string;
  readonly info: KeyValueMap;
}

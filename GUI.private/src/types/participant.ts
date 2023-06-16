import { ParticipantStatus, ParticipantType } from '.';

export interface Participant {
  readonly contactEmail: string;
  readonly host: string;
  readonly id: number;
  readonly institutionId: number;
  readonly name: string;
  readonly participantStatus: ParticipantStatus;
  readonly participantType: ParticipantType;
  readonly timestamp: string;
  readonly uniqueIdentifier: string;
}

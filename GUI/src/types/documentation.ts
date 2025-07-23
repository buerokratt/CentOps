export interface Documentation {
  content: string;
}

export interface ApiDocumentation extends Documentation {
  documentId: string;
  createdAt: string;
  updatedAt: string;
}

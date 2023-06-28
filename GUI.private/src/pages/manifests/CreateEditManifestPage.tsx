import React, { useState } from 'react';
import {
  ReactFormGenerator,
  ElementStore,
  ReactFormBuilder,
} from 'react-form-builder2';

const CreateEditManifestPage: React.FC = () => {
  var items = [
    {
      key: 'Header',
      name: 'Header Text',
      icon: 'fa fa-header',
      static: true,
      content: 'Placeholder Text...',
    },
    {
      key: 'Paragraph',
      name: 'Paragraph',
      static: true,
      icon: 'fa fa-paragraph',
      content: 'Placeholder Text...',
    },
  ];

  return (
    <>
      <ReactFormBuilder />
    </>
  );
};
export default CreateEditManifestPage;

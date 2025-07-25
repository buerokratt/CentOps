import { type MouseEvent } from 'react';
import api from 'services/api';
import { get } from 'react-hook-form';

/**
 * download file on button click event
 * @param event<dataset<{ id: string; name: string; type: mime-type }>>
 */
export const download = async <Element extends HTMLElement = HTMLElement>(
  event: MouseEvent<Element>
) => {
  event.preventDefault();
  const {
    currentTarget: { download },
  } = event as unknown as MouseEvent<HTMLAnchorElement>;
  const href = event.currentTarget.getAttribute('href');
  const { type: mimeType = 'text/plain', path } = event.currentTarget.dataset;
  if (!href) return;
  const { data } = await api.get(href);
  const blob = new Blob([path ? get(data, path) : data], {
    type: mimeType,
  });
  const { navigator } = window;
  if (navigator && navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, download);
  } else {
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const downloadElement = document.createElement('a');
    downloadElement.href = url;
    downloadElement.download = download;
    downloadElement.click();
  }
};

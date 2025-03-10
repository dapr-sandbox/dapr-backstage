export const downloadManifest = (manifest: string, appId: string) => {
  if (!manifest || !appId) {
    return;
  }
  const blob = new Blob([manifest], { type: 'text/yaml' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${appId}-manifest.yaml`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

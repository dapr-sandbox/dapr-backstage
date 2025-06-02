import { Button } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export function CopyButton({ text }: { text: string }) {
  return (
    <Button
      size="small"
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
      style={{ marginLeft: '0.5rem', minWidth: '2rem' }}
    >
      <FileCopyIcon style={{ fontSize: '1.4rem' }} />
    </Button>
  );
}

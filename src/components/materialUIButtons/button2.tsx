import * as React from 'react';
import { Button, buttonClasses } from '@mui/base/Button';
import Stack from '@mui/material/Stack';
import style from './buttonStyle.module.css'

// .mode-dark is provided by the MUI docs site
const css = `
  
`;

export default function Button2({ title, ...buttonProps }: { title: string})  {
  return (
    <React.Fragment>
      <style type="text/css">{css}</style>
      <Stack spacing={2} direction="row" className={style.demo}>
        <Button className={style.githubButton} {...buttonProps}> {title} </Button>
      </Stack>
    </React.Fragment>
  );
}

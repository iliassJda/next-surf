import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/base/Button';

import PublicIcon from '@mui/icons-material/Public';
import "./buttonStyle.module.css"

export default function MUIButton({ title }: { title: string }) {
    return (
        <div>
            <Button color='primary'>{title}</Button>
        </div>
    );
  }

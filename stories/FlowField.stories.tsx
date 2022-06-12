import React from 'react';
import { Meta } from '@storybook/react';
import { FlowField } from '../src/index';

const meta: Meta = {
  title: 'FlowField',
  component: FlowField,
};

export default meta;

export const Default = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      top: 0,
      left: 0,
    }}
  >
    <FlowField style={{ position: 'absolute' }} lengthOfAnimation={1000} />
    <div
      style={{
        height: 'auto',
        width: '300px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        textAlign: 'center',
      }}
    ></div>
  </div>
);

import React from 'react';

const wrapRouterProps = (Component: any, data: any) => {
  return (props: any) => <Component {...props} {...data} />;
};

export default wrapRouterProps;

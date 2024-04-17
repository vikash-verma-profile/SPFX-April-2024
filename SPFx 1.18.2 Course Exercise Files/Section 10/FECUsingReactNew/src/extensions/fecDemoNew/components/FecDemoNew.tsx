import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';

import styles from './FecDemoNew.module.scss';

export interface IFecDemoNewProps {
  text: string;
}

const LOG_SOURCE: string = 'FecDemoNew';

export default class FecDemoNew extends React.Component<IFecDemoNewProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: FecDemoNew mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: FecDemoNew unmounted');
  }

  public render(): React.ReactElement<{}> {
    const mystyles = {
      color: 'blue',
      width:  `${this.props.text}px`,
      background: 'red'

    }

    return (
      <div className={styles.FecDemo}>

                  <div className={styles.cell}>
                  <div style={mystyles}>                  
                    { this.props.text }%
                  </div>
                  </div>
      
      </div>
    );
  }
}

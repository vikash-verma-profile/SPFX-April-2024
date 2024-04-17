import * as React from 'react';

import { IWebPartWithReactProps } from './IWebPartWithReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WebPartWithReact extends React.Component<IWebPartWithReactProps, {}> {
  public render(): React.ReactElement<IWebPartWithReactProps> {
    return (
      <div>
      

    <p>Absolute URL {escape(this.props.absoluteurl)}</p>
    <p>Title {escape(this.props.sitetitle)}</p>
    <p>Relative URL {escape(this.props.relativeurl)}</p>
    <p>User Name {escape(this.props.username)}</p>

              
            </div>      
    );
  }
}

import * as React from 'react';
import styles from './Reactcruddemo.module.scss';
import type { IReactcruddemoProps } from './IReactcruddemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { TextField, PrimaryButton, DetailsList, IDropdownStyles } from 'office-ui-fabric-react';
import { ISoftwareListItem } from './ISoftwareListItem';
import { ITextFieldStyles } from '@fluentui/react';
import { ICrudWithReactState } from './ICrudWithReactState';


let _softwareListColumns = [
  {
    key: 'ID',
    name: 'ID',
    fieldName: 'ID',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
  {
    key: 'Title',
    name: 'Title',
    fieldName: 'Title',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
  {
    key: 'SoftwareName',
    name: 'SoftwareName',
    fieldName: 'SoftwareName',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
  {
    key: 'SoftwareVendor',
    name: 'SoftwareVendor',
    fieldName: 'SoftwareVendor',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
  {
    key: 'SoftwareVersion',
    name: 'SoftwareVersion',
    fieldName: 'SoftwareVersion',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
  {
    key: 'SoftwareDescription',
    name: 'SoftwareDescription',
    fieldName: 'SoftwareDescription',
    minWidth: 50,
    maxwidth: 100,
    isResizable: true
  },
];

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowFieldStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
export default class Reactcruddemo extends React.Component<IReactcruddemoProps, ICrudWithReactState> {
  private _selection: Selection;
  private _onItemSelectionChanged = () => {
    this.setState({ SoftwareListItem: (this._selection.getSelection()[0] as ISoftwareListItem) });
  }

  constructor(props: IReactcruddemoProps, state: ICrudWithReactState) {
    super(props);
    this.state = {
      status: 'Ready',
      SoftwareListItems: [],
      SoftwareListItem: {
        Id: 0,
        Title: "",
        SoftwareName: "",
        SoftwareVendor: "Select an option",
        SoftwareVersion: "",
        SoftwareDescription: ""
      }
    };
    this._selection = new Selection({ onSelectionChanged: this._onItemSelectionChanged, });
  }

  
  public render(): React.ReactElement<IReactcruddemoProps> {



    return (
      <section className={`${styles.reactcruddemo} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section >
    );
  }
}

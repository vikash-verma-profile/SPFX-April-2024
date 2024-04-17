import * as React from 'react';
import styles from './Reactcruddemo.module.scss';
import type { IReactcruddemoProps } from './IReactcruddemoProps';

import {
  TextField, PrimaryButton, DetailsList, DetailsListLayoutMode, IDropdownStyles, ITextFieldStyles,
  SelectionMode,
  IDropdown,
  Dropdown,
  IDropdownOption,
  CheckboxVisibility,
  Selection
} from 'office-ui-fabric-react';
import { ISoftwareListItem } from './ISoftwareListItem';
import { ICrudWithReactState } from './ICrudWithReactState';
import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


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
const narrowDropDownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
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

  private _getListItems(): Promise<ISoftwareListItem[]> {
    const url: string = this.props.siteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items";
    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then(response => {
      return response.json();
    }).then(json => {
      return json.value;
    }) as Promise<ISoftwareListItem[]>;
  }


  public bindDetailList(message: string): void {

    this._getListItems().then(listitems => {
      this.setState({ SoftwareListItems: listitems, status: message });
    })
  }

  public componentDidMount(): void {
    this.bindDetailList("All records have been loaded successfully");
  }

  public btnAdd_click = () => {
    const siteurl: string = this.props.siteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items"

    const spHttpClientOptions: ISPHttpClientOptions = {
      "body": JSON.stringify(this.state.SoftwareListItem)
    }
    this.props.context.spHttpClient.post(siteurl, SPHttpClient.configurations.v1, spHttpClientOptions).then((respose: SPHttpClientResponse) => {
      if (respose.status === 201) {
        this.bindDetailList("List Item has been created succssfully");
      }
      else {
        this.setState({ status: "an error have occured" });
      }
    })
  }

  public btnUpdate_click = () => {
    let id: number = this.state.SoftwareListItem.Id;

    const siteurl: string =  this.props.siteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items(" + id + ")";
    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*"
    };
    const spHttpClientOptions: ISPHttpClientOptions = {
      "headers": headers,
      "body": JSON.stringify(this.state.SoftwareListItem)
    }
    this.props.context.spHttpClient.post(siteurl, SPHttpClient.configurations.v1, spHttpClientOptions).then((respose: SPHttpClientResponse) => {
      if (respose.status === 204) {
        this.bindDetailList("Records updated successfully");
      }
      else {

        this.setState({ status: "An error have occured" });
      }
    })
  }

  private btnDelete_click() {
    let id: number = this.state.SoftwareListItem.Id;

    const siteurl: string =  this.props.siteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items(" + id + ")";
    const headers: any = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };
    const spHttpClientOptions: ISPHttpClientOptions = {
      "headers": headers
    };
    this.props.context.spHttpClient.post(siteurl, SPHttpClient.configurations.v1, spHttpClientOptions).then((respose: SPHttpClientResponse) => {
      if (respose.status === 204) {

        this.bindDetailList("List Item has been deleted succssfully");
      }
      else {
        this.setState({ status: "An error have occured" });
      }
    });
  }
  private onVendorChange = (e: any, option: IDropdownOption | undefined): void => {
    this.setState({

      SoftwareListItem: {
        Id: this.state.SoftwareListItem.Id,
        Title: this.state.SoftwareListItem.Title,
        SoftwareDescription: this.state.SoftwareListItem.SoftwareDescription,
        SoftwareName: this.state.SoftwareListItem.SoftwareName,
        SoftwareVersion: this.state.SoftwareListItem.SoftwareVersion,
        SoftwareVendor: option!.text,
      }
    });
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    switch (e.target.name) {
      case "Id":
        this.setState({
          SoftwareListItem: {
            Id: parseInt(e.target.value),
            Title: this.state.SoftwareListItem.Title,
            SoftwareDescription: this.state.SoftwareListItem.SoftwareDescription,
            SoftwareName: this.state.SoftwareListItem.SoftwareName,
            SoftwareVersion: this.state.SoftwareListItem.SoftwareVersion,
            SoftwareVendor: this.state.SoftwareListItem.SoftwareVendor,
          }
        });
        break;
      case "Title":
        this.setState({
          SoftwareListItem: {
            Id: this.state.SoftwareListItem.Id,
            Title: e.target.value,
            SoftwareDescription: this.state.SoftwareListItem.SoftwareDescription,
            SoftwareName: this.state.SoftwareListItem.SoftwareName,
            SoftwareVersion: this.state.SoftwareListItem.SoftwareVersion,
            SoftwareVendor: this.state.SoftwareListItem.SoftwareVendor,
          }
        });
        break;
      case "SoftwareName":
        this.setState({
          SoftwareListItem: {
            Id: this.state.SoftwareListItem.Id,
            Title: this.state.SoftwareListItem.Title,
            SoftwareDescription: this.state.SoftwareListItem.SoftwareDescription,
            SoftwareName: e.target.value,
            SoftwareVersion: this.state.SoftwareListItem.SoftwareVersion,
            SoftwareVendor: this.state.SoftwareListItem.SoftwareVendor,
          }
        });
        break;
      case "SoftwareDescription":
        this.setState({
          SoftwareListItem: {
            Id: this.state.SoftwareListItem.Id,
            Title: this.state.SoftwareListItem.Title,
            SoftwareDescription: e.target.value,
            SoftwareName: this.state.SoftwareListItem.SoftwareName,
            SoftwareVersion: this.state.SoftwareListItem.SoftwareVersion,
            SoftwareVendor: this.state.SoftwareListItem.SoftwareVendor,
          }
        });
        break;
      case "SoftwareVersion":
        this.setState({
          SoftwareListItem: {
            Id: this.state.SoftwareListItem.Id,
            Title: this.state.SoftwareListItem.Title,
            SoftwareDescription: this.state.SoftwareListItem.SoftwareDescription,
            SoftwareName: this.state.SoftwareListItem.SoftwareName,
            SoftwareVersion: e.target.value,
            SoftwareVendor: this.state.SoftwareListItem.SoftwareVendor,
          }
        });
        break;
    }

  }
  public render(): React.ReactElement<IReactcruddemoProps> {

    const dropdownRef = React.createRef<IDropdown>();

    return (
      <div className={styles.reactcruddemo}>
        <TextField label='ID' name='id' required={false}
          value={(this.state.SoftwareListItem.Id).toString()}
          styles={textFieldStyles}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleChange(event)
          }}
        />
        <TextField label='Software Title' name='Title' required={false}
          value={(this.state.SoftwareListItem.Title).toString()}
          styles={textFieldStyles}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleChange(event)
          }}
        />
        <TextField label='Software Name' name='SoftwareName' required={false}
          value={(this.state.SoftwareListItem.SoftwareName).toString()}
          styles={textFieldStyles}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleChange(event)
          }}
        />
        <TextField label='Software Description' name='SoftwareDescription' required={false}
          value={(this.state.SoftwareListItem.SoftwareDescription).toString()}
          styles={textFieldStyles}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleChange(event)
          }}
        />
        <TextField label='Software Version' name='SoftwareVersion' required={false}
          value={(this.state.SoftwareListItem.SoftwareVersion).toString()}
          styles={textFieldStyles}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            this.handleChange(event)
          }}
        />
        <Dropdown componentRef={dropdownRef} placeholder='Select an option' label='Software Vendor'

          options={[
            { key: 'Microsoft', text: 'Microsoft' },
            { key: 'Sun', text: 'Sun' },
            { key: 'Oracle', text: 'Oracle' },
            { key: 'Google', text: 'Google' }
          ]}
          defaultSelectedKey={this.state.SoftwareListItem.SoftwareVendor}
          required
          styles={narrowDropDownStyles}
          onChange={this.onVendorChange}
        />

        <p >
          <PrimaryButton text='Add' title='Add' onClick={this.btnAdd_click} />
          <PrimaryButton text='Update' title='Update' onClick={this.btnUpdate_click} />
          <PrimaryButton text='Delete' title='Delete' onClick={this.btnDelete_click} />
        </p>

        <div id="divstatus"></div>
        <div>
          <DetailsList
            items={this.state.SoftwareListItems}
            columns={_softwareListColumns}
            setKey='Id'
            checkboxVisibility={CheckboxVisibility.onHover}
            selectionMode={SelectionMode.single}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            compact={true}
            selection={this._selection}
          />
        </div>
      </div >
    );
  }
}

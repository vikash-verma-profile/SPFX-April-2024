import * as React from 'react';
import styles from './ShowAllUsers.module.scss';
import { IShowAllUsersProps } from './IShowAllUsersProps';
import { escape } from '@microsoft/sp-lodash-subset';


import { IUser } from './IUser';
import { IShowAllUsersState } from './IShowAllUsersState';

import { MSGraphClientV3 } from '@microsoft/sp-http';
//import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';


import {
  TextField,
  //autobind,
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode
} from 'office-ui-fabric-react';

import * as strings from 'ShowAllUsersWebPartStrings';


// Configure the columns for the DetailsList component
let _usersListColumns = [
  {
    key: 'displayName',
    name: 'Display name',
    fieldName: 'displayName',
    minWidth: 50,
    maxWidth: 150,
    isResizable: true
  },
  {
    key: 'givenName',
    name: 'Given Name',
    fieldName: 'givenName',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'surName',
    name: 'SurName',
    fieldName: 'surname',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'mail',
    name: 'Mail',
    fieldName: 'mail',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true
  },
  {
    key: 'mobilePhone',
    name: 'mobile Phone',
    fieldName: 'mobilePhone',
    minWidth: 50,
    maxWidth: 100,
    isResizable: true
  },
  {
    key: 'userPrincipalName',
    name: 'User Principal Name',
    fieldName: 'userPrincipalName',
    minWidth: 200,
    maxWidth: 200,
    isResizable: true
  },
];

export default class ShowAllUsers extends React.Component<IShowAllUsersProps,IShowAllUsersState> {


  constructor(props: IShowAllUsersProps, state: IShowAllUsersState) {
    super(props);
    
    // Initialize the state of the component
    this.state = {
      users: [],
      searchFor: "Kameswara"
    };
  }

  public componentDidMount(): void {
    this.fetchUserDetails();
  }

  //@autobind
  public _search = () => {
    this.fetchUserDetails();
  }

  //@autobind
  private _onSearchForChanged = (newValue: string) => {
    // code
    //alert(newValue);
    this.setState({
      searchFor: newValue,
    });
  };

// private _onSearchForChanged(newValue: string): void {
  
//   this.setState({
//     searchFor: newValue,
//   });
// }

private _getSearchForErrorMessage(value: string): string {

  return (value == null || value.length == 0 || value.indexOf(" ") < 0)
    ? ''
    : `${strings.SearchForValidationErrorMessage}`;
}


public fetchUserDetails() : void {

    //alert(this.state.searchFor);
  this.props.context.msGraphClientFactory.getClient('3').then((client: MSGraphClientV3): void => {    
    client
    .api('users')
    .version("v1.0")
    .select("*")
    .filter(`startswith(givenname,'${escape(this.state.searchFor)}')`)
    .get((error: any, response, rawResponse?: any) => {

      if (error) {
        console.error("Message is : " + error);
        return;
      }

      // Prepare the output array
      var allUsers: Array<IUser> = new Array<IUser>();

      // Map the JSON response to the output array
      response.value.map((item: IUser) => {
        allUsers.push( { 
          displayName: item.displayName,
          givenName: item.givenName,
          surname: item.surname,
          mail: item.mail,
          mobilePhone: item.mobilePhone,
          userPrincipalName: item.userPrincipalName,

        });
      });



     
     this.setState({ users: allUsers });         
    });
  });
}


  public render(): React.ReactElement<IShowAllUsersProps> {
    return (


      <div className={ styles.showAllUsers }>
        
      <TextField 
                label={ strings.SearchFor } 
                required={ true } 
                value={ this.state.searchFor }
                onChange={(event: React.ChangeEvent<HTMLInputElement>):void=>{this._onSearchForChanged(event.target.value)}}                
                onGetErrorMessage={ this._getSearchForErrorMessage }
              />

<p className={styles.title}>
                <PrimaryButton
                  text='Search'
                  title='Search'
                  onClick={this._search}
                />
              </p>

      
        
{
              (this.state.users != null && this.state.users.length > 0) ?
                <p className={ styles.row }>
                <DetailsList
                    items={ this.state.users }
                    columns={ _usersListColumns }
                    setKey='set'
                    checkboxVisibility={ CheckboxVisibility.onHover}
                    selectionMode={ SelectionMode.single }
                    layoutMode={ DetailsListLayoutMode.fixedColumns }
                    compact={ true }
                />
              </p>
              : null
            }


    </div>
      
    );
  }
}

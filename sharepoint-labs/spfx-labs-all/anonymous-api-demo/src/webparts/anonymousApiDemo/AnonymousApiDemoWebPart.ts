import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

import styles from './AnonymousApiDemoWebPart.module.scss';
import * as strings from 'AnonymousApiDemoWebPartStrings';

import { HttpClient,HttpClientResponse} from '@microsoft/sp-http';

export interface IAnonymousApiDemoWebPartProps {
  description: string;
}

export default class AnonymousApiDemoWebPart extends BaseClientSideWebPart<IAnonymousApiDemoWebPartProps> {



  public render(): void {

    this.getUserDetails().then(response=>{
      this.domElement.innerHTML = `
      <section class="${styles.anonymousApiDemo} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
        <table>
        <tr>
        <td>Name
        </td>
        <td>${response.name}</td>
        </tr>
        <tr>
        <td>Username
        </td>
        <td>${response.username}</td>
        </tr>
        <tr>
        <td>Email
        </td>
        <td>${response.email}</td>
        </tr>
        </table>
      </section>`;
    });
  }

  private getUserDetails():Promise<any>{
    return this.context.httpClient.get('https://jsonplaceholder.typicode.com/users/2',HttpClient.configurations.v1).then((response:HttpClientResponse)=>{
      return response.json();
    }).then(jsonresponse=>{
      return jsonresponse
    }) as Promise<any>;
  }
  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

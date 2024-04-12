import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CreatelistWebPartStrings';

import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http'
export interface ICreatelistWebPartProps {
  description: string;
}

export default class CreatelistWebPart extends BaseClientSideWebPart<ICreatelistWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  public render(): void {
    this.domElement.innerHTML = `
    <div>
    New List Name:<input type='text'  id='txtNewListName' /> 
    <input type='button' id='btnCreateNewList' value='Create a New List' />
    </div>
   `;
    this.bindEvents();
  }

  private bindEvents(): void {
    this.domElement.querySelector('#btnCreateNewList')?.addEventListener('click', () => {
      this.createNewList();
    })
  }
  private createNewList(): void {
    var newListName = (document.getElementById('txtNewListName') as HTMLInputElement)!.value;
    const listUrl: string = this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('"+newListName+"')";
   
    this.context.spHttpClient.get(listUrl,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      if(response.status===200){
        alert("A list already exists with this name");
        return;
      }
      if(response.status===404){
        const url:string=this.context.pageContext.web.absoluteUrl+"/_api/web/lists";
        const listDefination: any = {
          "Title": newListName,
          "Description": "new list",
          "AllowContentTypes": true,
          "BaseTemplate": 105,
          "ContentTypesEnabled": true,
        };
        const spHttpClientOptions: ISPHttpClientOptions = {
          "body": JSON.stringify(listDefination)
        };
        this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHttpClientOptions).then((res: SPHttpClientResponse) => {
          if (res.status === 201) {
            alert("A new list has been created successfully");
          } else {
            alert("Error Message " + res.status + " - " + res.statusText);
          }
        });
      }
    });
    
  }
  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      // this._environmentMessage = message;
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

    // this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
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

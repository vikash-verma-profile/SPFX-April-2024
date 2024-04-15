import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import {SPHttpClientResponse,SPHttpClient,ISPHttpClientOptions} from '@microsoft/sp-http';
import * as strings from 'CruddemoWebPartStrings';
import { ISoftwareListItem } from './ISoftwareListItem';

export interface ICruddemoWebPartProps {
  description: string;
}

export default class CruddemoWebPart extends BaseClientSideWebPart<ICruddemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>
    <table border='5' bgcolor='aqua'>

    <tr>
    <td>Please enter Software ID
    </td>
    <td><input type='text' id='txtID' />
    <input type='submit' id='btnRead' value='Read Details' />
    </td>
    </tr>

    <tr>
    <td>Software Title</td>
    <td><input type='text' id='txtSoftwareTitle' /></td>
    </tr>

    <tr>
    <td>Software Name
    </td>
    <td><input type='text' id='txtSoftwareName' /></td>
    </tr>
    <tr>
    <td>Software Vendor
    </td>
    <td>
    <select id="ddlSoftwareVendor">
    <option value="Microsoft">Microsoft</option>
    <option value="Sun">Sun</option>
    <option value="Oracle">Oracle</option>
    <option value="Google">Google</option>
    </select></td>
    </tr>

    <tr>
    <td>Software Version
    </td>
    <td><input type='text' id='txtSoftwareVersion' /></td>
    </tr>

    <tr>
    <td>Software Description
    </td>
    <td><input type='text' id='txtSoftwareDescription' /></td>
    </tr>

    <tr>
    <td colspan='2' align='center'>
    <input type='submit' value='Insert Item' id='btnSubmit'/>
    <input type='submit' value='Update' id='btnUpdate'/>
    <input type='submit' value='Delete' id='btnDelete'/></td>
    </tr>

    </table>
    <div id="divStatus" />
    </div>
    
    `;

    this._bindEvents();
   // this.readAllItems();
  }
  private _bindEvents():void{
    this.domElement.querySelector('#btnSubmit')?.addEventListener('click',()=>this.addListItem());
    this.domElement.querySelector('#btnRead')?.addEventListener('click',()=>this.readListItem());
    this.domElement.querySelector('#btnDelete')?.addEventListener('click',()=>this.deleteListItem());
  }

  private deleteListItem():void{
    let id:string=(document.getElementById('txtID') as HTMLInputElement)!["value"];
    const siteurl:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/getbytitle('SoftwareCatalog')/items("+id+")";
  
    const headers:any={"X-HTTP-Method":"DELETE","IF-MATCH":"*"};
    const spHttpClientOptions:ISPHttpClientOptions={
      "headers":headers
    };

    this.context.spHttpClient.post(siteurl,SPHttpClient.configurations.v1,spHttpClientOptions).then((respose:SPHttpClientResponse)=>{
      if(respose.status===204){
        let statusmessage:Element=this.domElement.querySelector('#divStatus')!;
        statusmessage.innerHTML="List Item has been deleted succssfully";
      }
      else{
        let statusmessage:Element=this.domElement.querySelector('#divStatus')!;
        statusmessage.innerHTML="An error have occured";
      }
    });
  }
  private readListItem():void{
    let id:string=(document.getElementById('txtID') as HTMLInputElement)!["value"];
    this._getListItemById(id).then(listItem=>{
    (document.getElementById('txtSoftwareTitle') as HTMLInputElement)!["value"]=listItem.Title;
     (document.getElementById('txtSoftwareName') as HTMLInputElement)!["value"]=listItem.SoftwareName;
     (document.getElementById('txtSoftwareVersion') as HTMLInputElement)!["value"]=listItem.SoftwareVersion;
    (document.getElementById('ddlSoftwareVendor') as HTMLInputElement)!["value"]=listItem.SoftwareVendor;
     (document.getElementById('txtSoftwareDescription') as HTMLInputElement)!["value"]=listItem.SoftwareDescription;
    }).catch(error=>{
      let message:Element=this.domElement.querySelector('#divStatus')!;
      message.innerHTML="Could not read the details"
    });
  }
  private _getListItemById(id:string):Promise<ISoftwareListItem>{
    const siteurl:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/getbytitle('SoftwareCatalog')/items?$filter=Id eq "+id;
    return this.context.spHttpClient.get(siteurl,SPHttpClient.configurations.v1).then((response:SPHttpClientResponse)=>{
      return response.json();
    }).then((listItems:any)=>{
      const untypedItem:any=listItems.value[0];
      const listItem:ISoftwareListItem=untypedItem as ISoftwareListItem;
      return listItem;
    }) as Promise<ISoftwareListItem>;
  }
  private addListItem():void{
    var SoftwareTitle=(document.getElementById('txtSoftwareTitle') as HTMLInputElement)!["value"];
    var SoftwareName=(document.getElementById('txtSoftwareName') as HTMLInputElement)!["value"];
    var SoftwareVersion=(document.getElementById('txtSoftwareVersion') as HTMLInputElement)!["value"];
    var SoftwareVendor=(document.getElementById('ddlSoftwareVendor') as HTMLInputElement)!["value"];
    var SoftwareDesciption=(document.getElementById('txtSoftwareDescription') as HTMLInputElement)!["value"];

    const siteurl:string=this.context.pageContext.site.absoluteUrl+"/_api/web/lists/getbytitle('SoftwareCatalog')/items"
    
    const itemBody:any={
      "Title":SoftwareTitle,
      "SoftwareVendor":SoftwareVendor,
      "SoftwareDescription":SoftwareDesciption,
      "SoftwareVersion":SoftwareVersion,
      "SoftwareName":SoftwareName
    };

    const spHttpClientOptions:ISPHttpClientOptions={
      "body":JSON.stringify(itemBody)
    }
    this.context.spHttpClient.post(siteurl,SPHttpClient.configurations.v1,spHttpClientOptions).then((respose:SPHttpClientResponse)=>{
      if(respose.status===201){
        let statusmessage:Element=this.domElement.querySelector('#divStatus')!;
        statusmessage.innerHTML="List Item has been created succssfully";
      }
      else{
        let statusmessage:Element=this.domElement.querySelector('#divStatus')!;
        statusmessage.innerHTML="An error have occured";
      }
    })
  
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

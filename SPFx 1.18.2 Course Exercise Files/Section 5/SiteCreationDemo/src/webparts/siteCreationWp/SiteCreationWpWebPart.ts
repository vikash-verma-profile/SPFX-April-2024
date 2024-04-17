import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SiteCreationWpWebPart.module.scss';
import * as strings from 'SiteCreationWpWebPartStrings';


import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface ISiteCreationWpWebPartProps {
  description: string;
}

export default class SiteCreationWpWebPart extends BaseClientSideWebPart <ISiteCreationWpWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.siteCreationWp }">

      <h1>Create a New Subsite</h1>
    <p>Please fill the below details to create a new subsite.</p><br/>

    Sub Site Title: <br/><input type='text' id='txtSubSiteTitle' /><br/>

    Sub Site URL: <br/><input type='text' id='txtSubSiteUrl' /><br/>    

    Sub Site Description: <br/><textarea id='txtSubSiteDescription' rows="5" cols="30"></textarea><br/>              
    <br/>

    <input type="button" id="btnCreateSubSite" value="Create Sub Site"/><br/>

          </div>`;

          this.bindEvents();
  }

  private bindEvents(): void {
    this.domElement.querySelector('#btnCreateSubSite')!.addEventListener('click', () => { this.createSubSite(); });
  }


  private createSubSite(): void {
    //let subSiteTitle,subSiteUrl,subSiteDescription;

    //const input1=document.getElementById("txtSubSiteTitle") as HTMLInputElement | null;
    let subSiteTitle = (document.getElementById("txtSubSiteTitle") as HTMLInputElement) !.value;
    //if(input1 !== null)
      //{
         //subSiteTitle=input1!.value;
      //}

    //const input2=document.getElementById("txtSubSiteUrl") as HTMLInputElement | null;
    let subSiteUrl = (document.getElementById("txtSubSiteUrl") as HTMLInputElement) !.value;
    //if(input2 !== null)
      //{
         //subSiteUrl=input2!.value;
      //}

    //const input3=document.getElementById("txtSubSiteDescription") as HTMLInputElement | null;  
    let subSiteDescription = (document.getElementById("txtSubSiteDescription") as HTMLInputElement) !.value;
    //if(input3 !== null)
    //{
       //subSiteDescription=input3.value;
    //}


    const url: string = this.context.pageContext.web.absoluteUrl + "/_api/web/webinfos/add";
    
    const spHttpClientOptions: ISPHttpClientOptions = {
      body: `{
              "parameters":{
                "@odata.type": "SP.WebInfoCreationInformation",
                "Title": "${subSiteTitle}",
                "Url": "${subSiteUrl}",
                "Description": "${subSiteDescription}",
                "Language": 1033,
                "WebTemplate": "STS#0",
                "UseUniquePermissions": true
                  }
                }`
    };

    this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 200) {
          alert("New Subsite has been created successfully");
        } else {
          alert("Error Message : " + response.status + " - " + response.statusText);
        }
      });


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

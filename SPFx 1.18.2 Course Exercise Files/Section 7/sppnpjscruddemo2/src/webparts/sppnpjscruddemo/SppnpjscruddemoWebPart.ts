import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SppnpjscruddemoWebPart.module.scss';
import * as strings from 'SppnpjscruddemoWebPartStrings';

import * as pnp from 'sp-pnp-js';

export interface ISppnpjscruddemoWebPartProps {
  description: string;
}

export default class SppnpjscruddemoWebPart extends BaseClientSideWebPart <ISppnpjscruddemoWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
          <div>
          <div>
          <table border='5' bgcolor='aqua'>
            <tr>
            <td>Please Enter Software ID </td>
            <td><input type='text' id='txtID' />
            <td><input type='submit' id='btnRead' value='Read Details' />
            </td>
            </tr>
            <tr>
            <td>Software Title</td>
            <td><input type='text' id='txtSoftwareTitle' />
            </tr>
      
            <tr>
            <td>Software Name</td>
            <td><input type='text' id='txtSoftwareName' />
            </tr>
      
            <tr>
            <td>Software Vendor</td>
            <td>
            <select id="ddlSoftwareVendor">
              <option value="Microsoft">Microsoft</option>
              <option value="Sun">Sun</option>
              <option value="Oracle">Oracle</option>
              <option value="Google">Google</option>
            </select>  
            </td>
           
            </tr>
      
            <tr>
            <td>Software Version</td>
            <td><input type='text' id='txtSoftwareVersion' />
            </tr>
      
            <tr>
            <td>Software Description</td>
            <td><textarea rows='5' cols='40' id='txtSoftwareDescription'> </textarea> </td>
            </tr>
      
            <tr>
            <td colspan='2' align='center'>
            <input type='submit'  value='Insert Item' id='btnSubmit' />
            <input type='submit'  value='Update' id='btnUpdate' />
            <input type='submit'  value='Delete' id='btnDelete' />
            <input type='submit'  value='Show All Records' id='btnReadAll' />
            </td>
          </table>
          </div>
          <div id="divStatus"/>
      
          <h2>Get All List Items</h2>
          <hr/>
          <div id="spListData" />


          </div>`;
          this._bindEvents();
          this.readAllItems();
  }


  public readAllItems(): void {
    let html: string = '<table border=1 width=100% style="bordercollapse: collapse;">';
    html += `<th>Title</th><th>Vendor</th><th>Name</th><th>Version</th><th>Description</th>`;

  pnp.sp.web.lists.getByTitle("SoftwareCatalog").items.get().then((items: any[]) => {
    items.forEach(function (item) {  
      html += `
      <tr>
      <td>${item["Title"]}</td>
      <td>${item["SoftwareVendor"]}</td>
      <td>${item["SoftwareName"]}</td>
      <td>${item["SoftwareVersion"]}</td>
      <td>${item["SoftwareDescription"]}</td>
      </tr>
      `;
    });  
    html += `</table>`;
    const allitems: Element = this.domElement.querySelector('#spListData');
    allitems.innerHTML = html;
});
  }

  private _bindEvents(): void {
    this.domElement.querySelector('#btnSubmit').addEventListener('click', () => { this.addListItem(); });
    this.domElement.querySelector('#btnRead').addEventListener('click', () => { this.readListItem(); });
    this.domElement.querySelector('#btnUpdate').addEventListener('click', () => { this.updateListItem(); });
    this.domElement.querySelector('#btnDelete').addEventListener('click', () => { this.deleteListItem(); });
  }
  private deleteListItem(): void {
    const id = document.getElementById("txtID")["value"];
    pnp.sp.web.lists.getByTitle("SoftwareCatalog").items.getById(id).delete();
    alert("list item Deleted");
  }
  private updateListItem(): void {
    var title = document.getElementById("txtSoftwareTitle")["value"];
    var softwareVendor = document.getElementById("ddlSoftwareVendor")["value"];
    var softwareDescription = document.getElementById("txtSoftwareDescription")["value"];
    var softwareName = document.getElementById("txtSoftwareName")["value"];
    var softwareVersion = document.getElementById("txtSoftwareVersion")["value"];
    

    let id: number = document.getElementById("txtID")["value"];

    pnp.sp.web.lists.getByTitle("SoftwareCatalog").items.getById(id).update({
      Title: title,
      SoftwareVendor: softwareVendor,
      SoftwareName: softwareName,
      SoftwareDescription: softwareDescription,
      SoftwareVersion: softwareVersion        
    }).then(r => {
      
      alert("Details Updated");

    });


  }
  private readListItem(): void {

    const id = document.getElementById("txtID")["value"];

    pnp.sp.web.lists.getByTitle("SoftwareCatalog").items.getById(id).get().then((item: any) => {
      document.getElementById("txtSoftwareTitle")["value"] = item["Title"];
      document.getElementById("txtSoftwareName")["value"] = item["SoftwareName"];
      document.getElementById("txtSoftwareVersion")["value"] = item["SoftwareVersion"];
      document.getElementById("txtSoftwareDescription")["value"] = item["SoftwareDescription"];      
      document.getElementById("ddlSoftwareVendor")["value"] = item["SoftwareVendor"];
      
    });
    
  }
  private addListItem() : void {
    var softwaretitle = document.getElementById("txtSoftwareTitle")["value"];
    var softwarename = document.getElementById("txtSoftwareName")["value"];
    var softwareversion = document.getElementById("txtSoftwareVersion")["value"];
    var softwarevendor = document.getElementById("ddlSoftwareVendor")["value"];
    var softwareDescription = document.getElementById("txtSoftwareDescription")["value"];


    const siteurl: string = this.context.pageContext.site.absoluteUrl + "/_api/web/lists/getbytitle('SoftwareCatalog')/items";

    pnp.sp.web.lists.getByTitle("SoftwareCatalog").items.add({
      Title: softwaretitle,
      SoftwareVendor: softwarevendor,
      SoftwareName: softwarename,
      SoftwareVersion: softwareversion,
      SoftwareDescription: softwareDescription,
      
    }).then(r => {
     
      alert("success");

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

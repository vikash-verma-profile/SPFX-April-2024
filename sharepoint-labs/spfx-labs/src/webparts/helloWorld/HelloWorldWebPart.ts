import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
// import { escape } from '@microsoft/sp-lodash-subset';

// import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';

export interface IHelloWorldWebPartProps {
  description: string;

  productname: string;
  productdescription: string;
  productcost: number;
  quantity: number;
  billamount: number;

  IsCertified:boolean;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';

  public render(): void {
    this.domElement.innerHTML = `
    <table>
    <tr>
      <td>
      Product Name
      </td>
      <td>
      ${this.properties.productname}
      </td>
    </tr>
    <tr>
      <td>
      Description
      </td>
      <td>
      ${this.properties.productdescription}
      </td>
    </tr>
    <tr>
      <td>
      Product Cost
      </td>
      <td>
      ${this.properties.productcost}
      </td>
    </tr>
    <tr>
      <td>
      Product Quantity
      </td>
      <td>
      ${this.properties.quantity}
      </td>
    </tr>
    <tr>
    <td>
    Bill Amount 
    </td>
    <td>
    ${this.properties.billamount=this.properties.productcost * this.properties.quantity}
    </td>
  </tr>

  <tr>
    <td>
    Is Certified ?
    </td>
    <td>
    ${this.properties.IsCertified}
    </td>
  </tr>
    </table>
    `;
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      // this._environmentMessage = message;
    });
    
  }
  protected get disableReactivePropertyChanges():boolean{
    return true;
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
            description: "Inventory web Part"
          },
          groups: [
            {
              groupName: "Product Details",
              groupFields: [
                PropertyPaneTextField('productname', {
                  label: "Product Name",
                  multiline: false,
                  resizable: false,
                  placeholder: "Please enter product name", "description": "Name property field"
                }),
                PropertyPaneTextField('productdescription', {
                  label: "Product Description",
                  multiline: true,
                  resizable: false,
                  placeholder: "Please enter product description", "description": "Name property field"
                }),
                PropertyPaneTextField('productcost', {
                  label: "Product Cost",
                  multiline: false,
                  resizable: false,
                  placeholder: "Please enter product cost", "description": "Number property field"
                }),
                PropertyPaneTextField('quantity', {
                  label: "Product Quantity",
                  multiline: false,
                  resizable: false,
                  placeholder: "Please enter product quantity", "description": "Number property field"
                }),
                PropertyPaneToggle('IsCertified', {
                  key:'IsCertified',
                  label: "Is it Certified",
                  onText: 'ISI Certified',
                  offText: 'Not an ISI Certified Product'
                }),
                PropertyPaneChoiceGroup('processertype', {
                  label: "Choices",
                  options:[]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

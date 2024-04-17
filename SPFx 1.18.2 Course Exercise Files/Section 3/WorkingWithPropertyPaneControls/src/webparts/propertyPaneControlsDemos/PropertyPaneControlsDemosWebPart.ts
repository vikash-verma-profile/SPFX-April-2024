import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneLink,
  PropertyPaneHorizontalRule,
  PropertyPaneButton,
  PropertyPaneButtonType
 
 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { escape } from '@microsoft/sp-lodash-subset';

import styles from './PropertyPaneControlsDemosWebPart.module.scss';
// import * as strings from 'PropertyPaneControlsDemosWebPartStrings';

export interface IPropertyPaneControlsDemosWebPartProps {
  description: string;


  productname: string;
  productdescription: string;
  productcost: number;
  quantity: number;
  billamount: number;
  discount: number;
  netbillamount: number;

  currentTime: Date;
  IsCertified: boolean;
  Rating: number;
  processortype: string;
  InvoiceFileType: string;
  newProcessorType: string;
  discountCoupon: boolean;

}

export default class PropertyPaneControlsDemosWebPart extends BaseClientSideWebPart <IPropertyPaneControlsDemosWebPartProps> {


  protected onInit(): Promise<void> {

    return new Promise<void>((resolve, _reject) => {        
   
this.properties.productname="Mouse";
this.properties.productdescription="Mouse Description";
this.properties.quantity=500;
this.properties.productcost=300;

if (this.properties.currentTime === undefined) {      
  const dtCurrent: Date = new Date();
  dtCurrent.setDate(dtCurrent.getDate() + 1);
  this.properties.currentTime = dtCurrent;
}
resolve(undefined);
    });

  }



  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.propertyPaneControlsDemos }">
    <div class="${ styles.container }">
      <div class="${ styles.row }">
        <div class="${ styles.column }">
         
        <table>
        
        <tr>
        <td>Current Time</td>
        <td>${this.properties.currentTime};</td>
        </tr>


        <tr>
        <td>Product Name</td>
        <td>${this.properties.productname}</td>
        </tr>
        <tr>
        <td>Description</td>
        <td>${this.properties.productdescription}</td>
        </tr>
        <tr>
        <td>Product Cost</td>
        <td>${this.properties.productcost}</td>
        </tr>
        <tr>
        <td>Product Quantity</td>
        <td>${this.properties.quantity}</td>
        </tr>

        <tr>
              <td>Bill Amount</td>
              <td>${this.properties.billamount=this.properties.productcost * this.properties.quantity} </td>
        </tr>
              <tr>
              <td>Discount</td>
              <td>${this.properties.discount = this.properties.billamount * 10/100 }</td>
              </tr>

              <tr>
              <td>Net Bill Amount</td>
              <td>${this.properties.netbillamount=this.properties.billamount - this.properties.discount}</td>
              </tr>


              <tr>
              <td>
              Is Certified?
              </td>
              <td>
              ${this.properties.IsCertified}
              </td>
             </tr>


 <tr>
              <td>
              Rating
              </td>
              <td>
              ${this.properties.Rating}
              </td>
             </tr>

             <tr>
             <td>
             Processor Type
             </td>
             <td>
             ${this.properties.processortype}
             </td>
            </tr>

            <tr>
            <td>
            Invoice File Type
            </td>
            <td>
            ${this.properties.InvoiceFileType}
            </td>
           </tr>

           <tr>
           <td>
           New Processor Type
           </td>
           <td>
           ${this.properties.newProcessorType}
           </td>
          </tr>

          <tr>
          <td>
          Do u have a discount coupon?
          </td>
          <td>
          ${this.properties.discountCoupon}
          </td>
         </tr>

        </table>




          </div>
          </div>
          </div>
          </div>`;
  }

  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//   return {
//     pages: [
//       {
//         header: {
//           //description: strings.PropertyPaneDescription
//           description: "My Header Description"
//         },
//         groups: [
//           {
//             //groupName: strings.BasicGroupName,
//             groupName: "My New Group Name",
//             groupFields: [
//               PropertyPaneTextField('description', {
//                 //label: strings.DescriptionFieldLabel
//                 label: "Enter Product Name"
//               })
//             ]
//           }
//         ]
//       }
//     ]
//   };
// }


protected get disableReactivePropertyChanges(): boolean {
  return true;
}


private btnClick(oldVal: any): any
{

  
  let Cost: number;
   let Quantity: number;
   let BillAmount: number;
   let Discount: number;
   let NetBillAmount: number;

   
   Cost = this.properties.productcost;
   
   Quantity=this.properties.quantity;
   BillAmount = Cost * Quantity;

   if(BillAmount > 10000){
     Discount = BillAmount * 10/100;
   }
   else{
     Discount = BillAmount * 5/100;
   }
   NetBillAmount=BillAmount - Discount;

   this.properties.billamount=BillAmount;
   this.properties.discount=Discount;
   this.properties.netbillamount=NetBillAmount;
}

protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {

    pages: [
      {
        header: {
          description: "Inventory Web Part"
        },
        groups: [
          {
            groupName: "Product Details",
            groupFields: [


              PropertyPaneTextField('productname', {
                label: "Product Name",
                multiline: false,
                resizable: false,             
                deferredValidationTime: 5000,
                placeholder: "Please enter product name","description": "Name property field"
              }),

              PropertyPaneTextField('productdescription', {
                label: "Product Description",
                multiline: true,
                resizable: false,                
                deferredValidationTime: 5000,
                placeholder: "Please enter Product Description","description": "Name property field"
              }),

              PropertyPaneTextField('productcost', {
                label: "Product Cost",
                multiline: false,
                resizable: false,             
                deferredValidationTime: 5000,
                placeholder: "Please enter product Cost","description": "Number property field",
             
              }),

              PropertyPaneTextField('quantity', {
                label: "Product Quantity",
                multiline: false,
                resizable: false,             
                deferredValidationTime: 5000,
                placeholder: "Please enter product Quantity","description": "Number property field"
               
               

              }),

              PropertyPaneToggle('IsCertified', {
                key: 'IsCertified',
                label: 'Is it Certified?',
                onText: 'ISI Certified!',
                offText: 'Not an ISI Certified Product'
              }),


              PropertyPaneSlider('Rating', { 
                label: 'Select Your Rating', 
                min: 1, 
                max: 10, 
                step: 1, 
                showValue: true, 
                value: 1 
              }),

              PropertyPaneChoiceGroup('processortype', {
                label: 'Choices',
                options: [
                 { key: 'I5', text: 'Intel I5' },
                 { key: 'I7', text: 'Intel I7', checked: true },
                 { key: 'I9', text: 'Intel I9' }
               ]
             }),


             PropertyPaneChoiceGroup('InvoiceFileType', {
              label: 'Select Invoice File type:',
              options: [
               { key: 'MSWord', text: 'MSWord',
                 imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png',
                 imageSize: { width: 32, height: 32 },
                 selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/docx_32x1.png'
               },
               { key: 'MSExcel', text: 'MSExcel',
                 imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png',
                 imageSize: { width: 32, height: 32 },
                 selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/xlsx_32x1.png'
               },
               { key: 'MSPowerPoint', text: 'MSPowerPoint',
                 imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png',
                 imageSize: { width: 32, height: 32 },
                 selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/pptx_32x1.png'
               },
               { key: 'OneNote', text: 'OneNote',
                 imageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png',
                 imageSize: { width: 32, height: 32 },
                 selectedImageSrc: 'https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/png/one_32x1.png'
               }
             ]
           }),

           PropertyPaneDropdown('newProcessorType', {
            label: "New Processor Type",
            options: [
              { key: 'I5', text: 'Intel I5' },
              { key: 'I7', text: 'Intel I7' },
              { key: 'I9', text: 'Intel I9'}
            ],
            selectedKey: 'I7'
           }),

           PropertyPaneCheckbox('discountCoupon', {
            text: 'Do You have a Discount Coupon?', 
            checked: false,
            disabled: false 
          }),

          PropertyPaneLink('', {
            href: 'https://www.amazon.in',
            text: 'Buy Intel Processor from the best Seller',
            target: '_blank',
            popupWindowProps: {
              height: 500,
              width: 500,
              positionWindowPosition: 2,
              title: 'Amazon'
            }
        }),

        PropertyPaneHorizontalRule(),

          PropertyPaneButton('', {
            text: "Normal button",
            buttonType: PropertyPaneButtonType.Normal,
            onClick: this.btnClick.bind(this)
           }),
           
           PropertyPaneHorizontalRule(),

           PropertyPaneButton('', {
            text: "Primary button",
            buttonType: PropertyPaneButtonType.Primary,
            onClick: this.btnClick.bind(this)
           }),
           PropertyPaneHorizontalRule(),
           PropertyPaneButton('btnHero', {
            text: "12 Point Star Icon",
            buttonType: PropertyPaneButtonType.Hero,
            icon: '12PointStar',
            onClick: this.btnClick,
           }),

          PropertyPaneHorizontalRule(),
          PropertyPaneButton('', {
          text: "Command button",
          buttonType: PropertyPaneButtonType.Command,
          onClick: this.btnClick,
          }),

          PropertyPaneHorizontalRule(),
          PropertyPaneButton('', {
           text: "Compound button",
           buttonType: PropertyPaneButtonType.Compound,
           description: 'With some descriptive text',
           onClick: this.btnClick,
          }),

          PropertyPaneHorizontalRule(),
          PropertyPaneButton('', {
           text: "6 Point Star Icon",
           buttonType: PropertyPaneButtonType.Icon,
           icon: 'AADLogo',
           onClick: this.btnClick
          }),
           

          PropertyPaneHorizontalRule(),


          PropertyPaneButton('', {
            text: "Icon button ('AddFriend' icon)",
            buttonType: PropertyPaneButtonType.Icon,
            icon: 'AddFriend',
            onClick: this.btnClick
           })

            ]}


        ]}


    ]}

}

}


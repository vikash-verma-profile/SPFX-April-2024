
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { override } from '@microsoft/decorators';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom:string
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  // public onInit(): Promise<void> {
  //   Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

  //   let message: string = this.properties.testMessage;
  //   if (!message) {
  //     message = '(No properties were provided.)';
  //   }

  //   Dialog.alert(`Vikash Verma test message`).catch(() => {
  //     /* handle error */
  //   });

  //   return Promise.resolve();
  // }

  private _topPlaceHolder: PlaceholderContent | undefined;
  // private _bottomPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
    this._renderPlaceHolders();
    return Promise.resolve()
  }

  private _renderPlaceHolders(): void {
    if (!this._topPlaceHolder) {
      this._topPlaceHolder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose })

      if (!this._topPlaceHolder) {
        console.error('The placeholder top was not found')
        return;
      }

      if(this.properties){
        let topstring:string=this.properties.Top;
        if(!topstring){
          topstring='(Top property was not defined)';
        }
        if(this._topPlaceHolder.domElement){
          this._topPlaceHolder.domElement.innerHTML=`
          
          <div>Top placeholder</div>
          `;
        }
      }
    }
  }

  private _onDispose():void{
    console.log('Disposed custom top placeholder');
  }
}

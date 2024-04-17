import {HelloWorldWebPart} from './HelloWorldWebPart';
import {IHelloWorldWebPartProps} from './HelloWorldWebPart';
import { Version, Version } from '@microsoft/sp-core-library';

describe('HelloWorldWrbPart',()=>{
    it('rendfer the web part with the correct title',()=>{
        const wepartProps:IHelloWorldWebPartProps={
            description:'Test Description'
        }
    
    const Version:Version=Version.parse('1.0');
    const renderContent=new HelloWorldWebPart(wepartProps,Version).render();
    //Assertion
    expect(renderContent).toContain('Hello World !');
});
});
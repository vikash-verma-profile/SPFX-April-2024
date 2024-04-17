"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("CrudWithReactWebPartStrings");
var CrudWithReact_1 = require("./components/CrudWithReact");
var CrudWithReactWebPart = /** @class */ (function (_super) {
    __extends(CrudWithReactWebPart, _super);
    function CrudWithReactWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrudWithReactWebPart.prototype.render = function () {
        var element = React.createElement(CrudWithReact_1["default"], {
            description: this.properties.description,
            context: this.context,
            siteUrl: this.context.pageContext.web.absoluteUrl
        });
        ReactDom.render(element, this.domElement);
    };
    CrudWithReactWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(CrudWithReactWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    CrudWithReactWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                (0, sp_property_pane_1.PropertyPaneTextField)('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return CrudWithReactWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports["default"] = CrudWithReactWebPart;

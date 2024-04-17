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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var React = require("react");
var CrudWithReact_module_scss_1 = require("./CrudWithReact.module.scss");
var sp_http_1 = require("@microsoft/sp-http");
var office_ui_fabric_react_1 = require("office-ui-fabric-react");
// Configure the columns for the DetailsList component
var _softwareListColumns = [
    {
        key: 'ID',
        name: 'ID',
        fieldName: 'ID',
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
    },
    {
        key: 'Title',
        name: 'Title',
        fieldName: 'Title',
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
    },
    {
        key: 'SoftwareName',
        name: 'SoftwareName',
        fieldName: 'SoftwareName',
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
    },
    {
        key: 'SoftwareVendor',
        name: 'SoftwareVendor',
        fieldName: 'SoftwareVendor',
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
    },
    {
        key: 'SoftwareVersion',
        name: 'SoftwareVersion',
        fieldName: 'SoftwareVersion',
        minWidth: 50,
        maxWidth: 100,
        isResizable: true
    },
    {
        key: 'SoftwareDescription',
        name: 'SoftwareDescription',
        fieldName: 'SoftwareDescription',
        minWidth: 50,
        maxWidth: 150,
        isResizable: true
    }
];
var textFieldStyles = { fieldGroup: { width: 300 } };
var narrowTextFieldStyles = { fieldGroup: { width: 100 } };
var narrowDropdownStyles = { dropdown: { width: 300 } };
var CrudWithReact = /** @class */ (function (_super) {
    __extends(CrudWithReact, _super);
    function CrudWithReact(props, state) {
        var _this = _super.call(this, props) || this;
        _this._onItemsSelectionChanged = function () {
            _this.setState({
                SoftwareListItem: _this._selection.getSelection()[0]
            });
        };
        _this.state = {
            status: 'Ready',
            SoftwareListItems: [],
            SoftwareListItem: {
                Id: 0,
                Title: "",
                SoftwareName: "",
                SoftwareDescription: "",
                SoftwareVendor: "Select an option",
                SoftwareVersion: ""
            }
        };
        _this._selection = new office_ui_fabric_react_1.Selection({
            onSelectionChanged: _this._onItemsSelectionChanged
        });
        return _this;
    }
    CrudWithReact.prototype._getListItems = function () {
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('MicrosoftSoftware')/items";
        return this.props.context.spHttpClient.get(url, sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        })
            .then(function (json) {
            return json.value;
        });
    };
    CrudWithReact.prototype.bindDetailsList = function (message) {
        var _this = this;
        this._getListItems().then(function (listItems) {
            _this.setState({ SoftwareListItems: listItems, status: message });
        });
    };
    CrudWithReact.prototype.componentDidMount = function () {
        this.bindDetailsList("All Records have been loaded Successfully");
    };
    CrudWithReact.prototype.btnAdd_click = function () {
        var _this = this;
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('MicrosoftSoftware')/items";
        var spHttpClientOptions = {
            "body": JSON.stringify(this.state.SoftwareListItem)
        };
        this.props.context.spHttpClient.post(url, sp_http_1.SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 201) {
                _this.bindDetailsList("Record added and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " + response.status + " - " + response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    CrudWithReact.prototype.btnUpdate_click = function () {
        var _this = this;
        var id = this.state.SoftwareListItem.Id;
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('MicrosoftSoftware')/items(" + id + ")";
        var headers = {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*"
        };
        var spHttpClientOptions = {
            "headers": headers,
            "body": JSON.stringify(this.state.SoftwareListItem)
        };
        this.props.context.spHttpClient.post(url, sp_http_1.SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 204) {
                _this.bindDetailsList("Record Updated and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " + response.status + " - " + response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    CrudWithReact.prototype.btnDelete_click = function () {
        var _this = this;
        var id = this.state.SoftwareListItem.Id;
        var url = this.props.siteUrl + "/_api/web/lists/getbytitle('MicrosoftSoftware')/items(" + id + ")";
        var headers = { "X-HTTP-Method": "DELETE", "IF-MATCH": "*" };
        var spHttpClientOptions = {
            "headers": headers
        };
        this.props.context.spHttpClient.post(url, sp_http_1.SPHttpClient.configurations.v1, spHttpClientOptions)
            .then(function (response) {
            if (response.status === 204) {
                alert("record got deleted successfully....");
                _this.bindDetailsList("Record deleted and All Records were loaded Successfully");
            }
            else {
                var errormessage = "An error has occured i.e.  " + response.status + " - " + response.statusText;
                _this.setState({ status: errormessage });
            }
        });
    };
    CrudWithReact.prototype.render = function () {
        var _this = this;
        var dropdownRef = React.createRef();
        return (<div className={CrudWithReact_module_scss_1["default"].crudWithReact}>
        
        <office_ui_fabric_react_1.TextField label="ID" required={false} value={(this.state.SoftwareListItem.Id).toString()} styles={textFieldStyles} onChanged={function (e) { _this.state.SoftwareListItem.Id = e; }}/>
                <office_ui_fabric_react_1.TextField label="Software Title" required={true} value={(this.state.SoftwareListItem.Title)} styles={textFieldStyles} onChanged={function (e) { _this.state.SoftwareListItem.Title = e; }}/>
                <office_ui_fabric_react_1.TextField label="Software Name" required={true} value={(this.state.SoftwareListItem.SoftwareName)} styles={textFieldStyles} onChanged={function (e) { _this.state.SoftwareListItem.SoftwareName = e; }}/>
                <office_ui_fabric_react_1.TextField label="Software Description" required={true} value={(this.state.SoftwareListItem.SoftwareDescription)} styles={textFieldStyles} onChanged={function (e) { _this.state.SoftwareListItem.SoftwareDescription = e; }}/>
                <office_ui_fabric_react_1.TextField label="Software Version" required={true} value={(this.state.SoftwareListItem.SoftwareVersion)} styles={textFieldStyles} onChanged={function (e) { _this.state.SoftwareListItem.SoftwareVersion = e; }}/>
                <office_ui_fabric_react_1.Dropdown componentRef={dropdownRef} placeholder="Select an option" label="Software Vendor" options={[
                { key: 'Microsoft', text: 'Microsoft' },
                { key: 'Sun', text: 'Sun' },
                { key: 'Oracle', text: 'Oracle' },
                { key: 'Google', text: 'Google' }
            ]} defaultSelectedKey={this.state.SoftwareListItem.SoftwareVendor} required styles={narrowDropdownStyles} onChanged={function (e) { _this.state.SoftwareListItem.SoftwareVendor = e.text; }}/>




        <p className={CrudWithReact_module_scss_1["default"].title}>
                   <office_ui_fabric_react_1.PrimaryButton text='Add' title='Add' onClick={this.btnAdd_click}/>

                  <office_ui_fabric_react_1.PrimaryButton text='Update' onClick={this.btnUpdate_click}/>

                  <office_ui_fabric_react_1.PrimaryButton text='Delete' onClick={this.btnDelete_click}/>
                </p> 


                <div id="divStatus">
                  {this.state.status}
                </div>

                <div>
                <office_ui_fabric_react_1.DetailsList items={this.state.SoftwareListItems} columns={_softwareListColumns} setKey='Id' checkboxVisibility={office_ui_fabric_react_1.CheckboxVisibility.onHover} selectionMode={office_ui_fabric_react_1.SelectionMode.single} layoutMode={office_ui_fabric_react_1.DetailsListLayoutMode.fixedColumns} compact={true} selection={this._selection}/>
                  </div>  


      </div>);
    };
    __decorate([
        office_ui_fabric_react_1.autobind
    ], CrudWithReact.prototype, "btnAdd_click");
    __decorate([
        office_ui_fabric_react_1.autobind
    ], CrudWithReact.prototype, "btnUpdate_click");
    __decorate([
        office_ui_fabric_react_1.autobind
    ], CrudWithReact.prototype, "btnDelete_click");
    return CrudWithReact;
}(React.Component));
exports["default"] = CrudWithReact;

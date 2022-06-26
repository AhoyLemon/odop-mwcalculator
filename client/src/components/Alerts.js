import { Component } from 'react';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, FDCL } from '../store/actionTypes';

export var commonChecks = function(store) {
//    console.log('In Alerts.commonChecks store=',store);
    var design = store.getState();
    var total = 0;
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var element = design.model.symbol_table[i];
//        console.log('name=',element.name);

        // VALUE VALIDITY CHECKS
        if (element.format === undefined && typeof element.value === 'number' && element.value <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name,
                message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Below)'
            });
        } else if (element.format === undefined && typeof element.value === 'number' && element.value >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name,
                message: 'INVALID VALUE: ' + element.name + ' (' + element.value.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }

        // CONSTRAINT VALIDITY CHECKS
        if (element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVALID VALUE: ' + element.name+' MIN  (' + element.cmin.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)'
            });
        } else if (element.format === undefined && typeof element.cmin === 'number' && (element.lmin & CONSTRAINED) && element.cmin >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVALID VALUE: ' + element.name+' MIN  (' + element.cmin.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }
        if (element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax <= element.validmin) { 
            let validmin = element.validmin === -Number.MIN_VALUE ? '-Number.MIN_VALUE' : element.validmin;
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVALID VALUE: ' + element.name+' MAX  (' + element.cmax.toODOPPrecision() + ') <= ' + validmin,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Below)'
            });
        } else if (element.format === undefined && typeof element.cmax === 'number' && (element.lmax & CONSTRAINED) && element.cmax >= element.validmax) {
            let validmax = element.validmax === Number.MAX_VALUE ? 'Number.MAX_VALUE' : element.validmax;
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVALID VALUE: ' + element.name+' MAX  (' + element.cmax.toODOPPrecision() + ') >= ' + validmax,
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Validity_Above)'
            });
        }

        // CONSTRAINT CHECKS
        if (element.type === "equationset" && !element.input && ((element.lmin & FIXED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if (element.type === "equationset" && (element.lmin & CONSTRAINED) && element.vmin > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value < '+element.cmin.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MIN_Violation)'
            });
        }
        if (element.type === "equationset" && !element.input && ((element.lmax & FIXED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin)) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'FIX VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#Fix_Violation)'
            });
        } else if (element.type === "equationset" && (element.lmax & CONSTRAINED) && element.vmax > 0.0 && design.model.result.objective_value > design.model.system_controls.objmin) {
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'CONSTRAINT VIOLATION: ' + element.name + ' (' + element.value.toODOPPrecision() + ') Value > '+element.cmax.toODOPPrecision(),
                severity: 'Notice',
                help_url: '[Help](/docs/Help/alerts.html#MAX_Violation)'
            });
        }
        if (element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
            addAlert({
                element: element,
                name: element.name+' MIN',
                message: 'INVERTED CONSTRAINT RANGE: from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision()+' for ' + element.name + ' (' + element.value.toODOPPrecision() + ')',
                severity: 'Err',
                help_url: '[Help](/docs/Help/alerts.html#Constraint_Inconsistency)'
            });
            addAlert({
                element: element,
                name: element.name+' MAX',
                message: 'INVERTED CONSTRAINT RANGE: from '+element.cmin.toODOPPrecision()+' to '+element.cmax.toODOPPrecision()+' for ' + element.name + ' (' + element.value.toODOPPrecision() + ')',
                severity: 'Err',
                duplicate: true
            });
        }

        // FDCL CHECKS
        if (element.type === "equationset" && (element.lmin & FIXED) === 0 && element.cminchoices !== undefined && element.cminchoices.length > 0) {
            if (element.lmin & CONSTRAINED) {
                addAlert({
                    element: element,
                    name: element.name+' MIN',
                    message: element.lmin & FDCL ? 'FDCL =' + element.cminchoices[element.cminchoice] : '=' + element.cmin + ' (non-FDCL)',
                    severity: 'Info',
                    help_url: '[Help](/docs/Help/alerts.html#FDCL)'
                });
            }
        }
        if (element.type === "equationset" && (element.lmax & FIXED) === 0 && element.cmaxchoices !== undefined && element.cmaxchoices.length > 0) {
            if (element.lmax & CONSTRAINED) {
                addAlert({
                    element: element,
                    name: element.name+' MAX',
                    message: element.lmax & FDCL ? 'FDCL =' + element.cmaxchoices[element.cmaxchoice] : '=' + element.cmax + ' (non-FDCL)',
                    severity: 'Info',
                    help_url: '[Help](/docs/Help/alerts.html#FDCL)'
                });
            }
        }

        // GENERAL CHECKS
        if ((element.type === 'equationset' && element.input) && !(element.lmin & FIXED)) {
            total++;
        }
    }
    if (total === 0) {
            addAlert({
                message: 'SYSTEM: No free independent variables', 
                severity: 'Info',
                help_url: '[Help](/docs/Help/alerts.html#NoFreeIV)'
             });
    }
}

export var getSeverityNumberByNameAndObjValue = function(name) {
//    console.log('In Alerts.getSeverityNumberByNameAndObjValue this=',this,'name=',name);
    var severityNumber = 0;
    if (name !== undefined && (name.endsWith(' MIN') || name.endsWith(' MAX'))) {
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            severityNumber = 3;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            severityNumber = 2;
        } else if (this.props.objective_value > 0.0) {
            severityNumber = 1;
       }
    }
//    console.log('In Alerts.getSeverityNumberByNameAndObjValue name-',name,'severity=',severity,'severityNumber=',severityNumber);
    return severityNumber;
}

export var getFeasibilityClassBySeverityNumber = function(severityNumber) {
//    console.log('In Alerts.getFeasibilityClassBySeverityNumber this=',this,'severityNumber=',severityNumber);
    var feasibilityClasses = ["", "text-feasible ", "text-close-to-feasible ", "text-not-feasible "];
    return feasibilityClasses[severityNumber];
}

export var getFontClassBySeverityNumber = function(severityNumber) {
//    console.log('In Alerts.getFeasibilityClassBySeverityNumber this=',this,'severityNumber=',severityNumber);
    var fontClasses = ["text-alert-info ", "text-alert-notice ", "text-alert-warn ", "text-alert-err "];
    return fontClasses[severityNumber];
}

export var getSeverityNumberBySeverity = function(severity) {
//    console.log('In Alerts.getSeverityNumberBySeverity this=',this,'severity=',severity);
    var severityNumber = {'Err': 3, 'Warn': 2, 'Notice': 1, 'Info': 0};
    return severityNumber[severity];
}

export var getAlertsByName = function(name, includeViolations = false) {
//    console.log('In Alerts.getAlertsByName this=',this,'name=',name,'includeViolations=',includeViolations);
    var alerts = [];
    var maxSeverityNumber = 0;
    getAlertsBySeverity('Err').forEach((entry) => {
        if (entry.name === name) { // Matches exactly
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Warn').forEach((entry) => {
        if (entry.name === name) { // Matches exactly
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Notice').forEach((entry) => {
        if (entry.name === name) { // Matches exactly
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        }
    });
    getAlertsBySeverity('Info').forEach((entry) => {
        if (entry.name === name) { // Matches exactly
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        } else if (includeViolations && (entry.name === name+' MIN' || entry.name === name+' MAX')) { // Matches name prefix
            maxSeverityNumber = Math.max(maxSeverityNumber, getSeverityNumberByNameAndObjValue(entry.name));
            alerts.push(entry);
        }
    });
//    console.log('In Alerts.getAlertsByName maxSeverityNumber=',maxSeverityNumber,'alerts=',alerts);
    return {className: getFeasibilityClassBySeverityNumber(maxSeverityNumber), alerts: alerts};
}

export var getAlertsBySeverity = function(severity='*') {
//    console.log('In Alerts.getAlertsBySeverity');
    var results;
    if (severity === '*') {
        results = this.state.alerts.filter(entry => {
//            console.log('severity=',severity,'entry=',entry);
            var severityNumber = getSeverityNumberBySeverity(entry.severity);
            entry.className = getFontClassBySeverityNumber(severityNumber);
            return entry.duplicate === undefined || entry.duplicate === false
        });
    } else {
        results = this.state.alerts.filter(entry => {
//            console.log('severity=',severity,'entry=',entry);
            var severityNumber = getSeverityNumberBySeverity(entry.severity);
            entry.className = getFontClassBySeverityNumber(severityNumber);
            return entry.severity === severity && (entry.duplicate === undefined || entry.duplicate === false)
        });
    }
//    console.log('In Alerts.getAlertsBySeverity results=',results);
    return results;
}

export var clearAlerts = function() {
//    console.log('In Alerts.clearAlerts');
    this.setState((prevState, props) => {
        return {
            alerts: []
        };
    });
}

export var addAlert = function(alert) {
//    console.log('In Alerts.addAlert alert=',alert);
    this.setState((prevState, props) => {
        return {
            alerts: [...prevState.alerts, alert]
        };
    });
}

class Alerts extends Component {
    constructor(props) {
        super(props);
        getSeverityNumberByNameAndObjValue = getSeverityNumberByNameAndObjValue.bind(this); // Bind external function - no 'this'
        getFeasibilityClassBySeverityNumber = getFeasibilityClassBySeverityNumber.bind(this); // Bind external function - no 'this'
        getFontClassBySeverityNumber = getFontClassBySeverityNumber.bind(this); // Bind external function - no 'this'
        getSeverityNumberBySeverity = getSeverityNumberBySeverity.bind(this); // Bind external function - no 'this'
        getAlertsByName = getAlertsByName.bind(this); // Bind external function - no 'this'
        getAlertsBySeverity = getAlertsBySeverity.bind(this); // Bind external function - no 'this'
        clearAlerts = clearAlerts.bind(this); // Bind external function - no 'this'
        addAlert = addAlert.bind(this); // Bind external function - no 'this'
        this.state = {
            alerts: []
        };
    }

    render() {
//        console.log('In Alerts.render this.state.alerts=',JSON.stringify(this.state.alerts));
        return '';
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

export default connect(mapStateToProps)(Alerts);

import React from 'react';
import { ReportBase } from "./ReportBase" // import the inner non-redux-connected class
import { Button } from 'react-bootstrap';
import * as o from './symbol_table_offsets';
import { connect } from 'react-redux';

class Report3 extends ReportBase {

    constructor(props) {
//        console.log("In Report3.constructor props=",props);
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
//        console.log("In Report3.onClick event=",event);
        window.print();
        return false;
    }

    render() {
        super.render();
//        console.log('In Report3.render this.props=',this.props);
        return (
            <>
                <h4 className="d-flex mt-3">
                    <span className="mr-auto">ODOP:Spring &nbsp; Extension Spring Report &nbsp; &nbsp; <a href="https://www.springdesignsoftware.org"><small>https://www.springdesignsoftware.org</small></a></span>
                    <Button onClick={this.onClick}>Print</Button>
                </h4>
                <br />
                <table id="view1" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.labels[o.Contact_person].name}:</td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Contact_person].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Phone___email].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Phone___email].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Company_name].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Company_name].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Date].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Date].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.Street].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Street].value}</td>
                            <td/>
                            <td>{this.props.labels[o.Part_Number].name}: </td>
                            <td/>
                            <td className="text-left" width="30%">{this.props.labels[o.Part_Number].value}</td>
                        </tr>
                        <tr>
                            <td>{this.props.labels[o.City__State___Zip].name}: </td>
                            <td/>
                            <td  className="text-left" width="30%">{this.props.labels[o.City__State___Zip].value}</td>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <b>{this.props.labels[o.COMMENT].name}: &nbsp; </b> {this.props.labels[o.COMMENT].value} <br/>
                <br/>
                <table id="view2" className="report-table">
                    <tbody>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Spring_Type].value}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Material_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.matTypeValue}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Wire_Diameter].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Wire_Diameter].value.toFixed(4)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Wire_Diameter].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.ASTM_Fed_Spec].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.astmFedSpecValue}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Mean_Dia].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Mean_Dia].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Mean_Dia].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Tensile].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Tensile].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Tensile].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Spring_Index].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Spring_Index].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Spring_Index].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.End_Type].name}</td>
                            <td>=</td>
                            <td className="text-left" colSpan="2">{this.et_tab[this.props.symbol_table[o.End_Type].value][0]}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Rate].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Rate].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Rate].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.End_Extension].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.End_Extension].value.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.End_Extension].units}</td>
                        </tr>
                        <tr>
                            <td>{this.len_lbl}</td>
                            <td>=</td>
                            <td>{this.wire_len_t.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Total_Coils].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Total_Coils].value.toFixed(3)}</td>
                            <td className="text-left">{"total " + this.props.symbol_table[o.Total_Coils].units}</td>
                        </tr>
                        <tr>
                            <td>{this.props.symbol_table[o.Weight].name}</td>
                            <td>=</td>
                            <td>{this.wgt1000.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Weight].units + "/1000"}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Active_Coils].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Active_Coils].value.toFixed(3)}</td>
                            <td className="text-left">{"active " + this.props.symbol_table[o.Active_Coils].units}</td>
                        </tr>
                        <tr>
                            <td>Safe Load</td>
                            <td>=</td>
                            <td>{this.safe_load.toFixed(3)}</td>
                            <td className="text-left">{this.safe_load_u}</td>
                            <td/>
                            <td>{this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td>=</td>
                            <td>{this.props.symbol_table[o.Cycle_Life].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Cycle_Life].units + " (estimate)"}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Safe Travel</td>
                            <td>=</td>
                            <td>{this.safe_travel.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Free_Length].units}</td>
                            <td/>
                            <td>({this.props.symbol_table[o.Cycle_Life].name}</td>
                            <td className="text-left" colSpan="3">&nbsp; applies to body coils only.)</td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <table id="view3" className="report-table">
                    <thead>
                        <tr>
                            <th/>
                            <th className="text-right" width="15%">Free </th>
                            <th className="text-right" width="15%">1st&nbsp;Load</th>
                            <th className="text-right" width="15%">2nd&nbsp;Load</th>
                            <th className="text-right" width="15%">Max&nbsp;Safe</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Force</b></td>
                            <td>{this.props.symbol_table[o.Initial_Tension].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_1].value.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.Force_2].value.toFixed(2)}</td>
                            <td>{this.safe_load.toFixed(2)}</td>
                            <td className="text-left" colSpan="2">{this.props.symbol_table[o.Force_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>Deflection</b></td>
                            <td>{(0.0).toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.Deflect_2].value.toFixed(3)}</td>
                            <td>{this.safe_travel.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Deflect_2].units}</td>
                        </tr>
                        <tr>
                            <td><b>Length</b></td>
                            <td>{this.props.symbol_table[o.Free_Length].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_1].value.toFixed(3)}</td>
                            <td>{this.props.symbol_table[o.L_2].value.toFixed(3)}</td>
                            <td>{(this.props.symbol_table[o.Free_Length].value + this.safe_travel).toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Free_Length].units}</td>
                        </tr>
                        <tr>
                            <td><b>Outside Dia.</b></td>
                            <td>{this.props.symbol_table[o.Free_OD].value.toFixed(3)}</td>
                            <td>{this.od_1.toFixed(3)}</td>
                            <td>{this.od_2.toFixed(3)}</td>
                            <td>{this.od_maxsafe.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Free_OD].units}</td>
                        </tr>
                        <tr>
                            <td><b>Inside Dia.</b></td>
                            <td>{this.props.symbol_table[o.ID_Free].value.toFixed(3)}</td>
                            <td>{this.id_1.toFixed(3)}</td>
                            <td>{this.id_2.toFixed(3)}</td>
                            <td>{this.id_maxsafe.toFixed(3)}</td>
                            <td className="text-left">{this.props.symbol_table[o.ID_Free].units}</td>
                        </tr>
                        <tr>
                            <td><b>Energy</b></td>
                            <td>{(0.0).toFixed(2)}</td>
                            <td>{this.energy_1.toFixed(2)}</td>
                            <td>{this.energy_2.toFixed(2)}</td>
                            <td>{this.energy_MS.toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Energy].units}</td>
                        </tr>
                        <tr>
                            <td><b>Stress</b><sup>*</sup></td>
                            <td>{this.props.symbol_table[o.Stress_Initial].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_1].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_2].value.toFixed(0)}</td>
                            <td>{this.props.symbol_table[o.Stress_Lim_Stat].value.toFixed(0)}</td>
                            <td className="text-left">{this.props.symbol_table[o.Stress_1].units}</td>
                        </tr>
                        <tr>
                            <td><b>% Tensile</b><sup>*</sup></td>
                            <td>{(100.0 * this.props.symbol_table[o.Stress_Initial].value / this.props.symbol_table[o.Tensile].value).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_1].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_2].value / this.dhat).toFixed(1)}</td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.dhat).toFixed(1)}</td>
                            <td className="text-left">%</td>
                        </tr>
                        <tr>
                            <td><b>Static F.S.</b><sup>*</sup></td>
                            <td>{(this.props.symbol_table[o.Stress_Lim_Stat].value / this.props.symbol_table[o.Stress_Initial].value).toFixed(2)}</td>
                            <td>{this.fs_1.toFixed(2)}</td>
                            <td>{this.props.symbol_table[o.FS_2].value.toFixed(2)}</td>
                            <td>{(1.0).toFixed(2)}</td>
                            <td className="text-left">{this.props.symbol_table[o.FS_2].units}</td>
                        </tr>
                        <tr>
                            <td/>
                            <td className="text-left" colSpan="2"><sup>*</sup> kw = {this.kw1.toFixed(3)}</td>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                Deflection at load point 2 is {this.pc_avail_deflect.toFixed(0)}% of total safe deflection.<br />
                {this.warnmsg}{this.warnmsg !== "" && <br />}
                <br />
                <pre>
                |&lt;--------------------------- {this.props.symbol_table[o.Free_Length].name} (w/ends) = {this.props.symbol_table[o.Free_Length].value.toFixed(3)} ---------------------------&gt;|<br />
                |&lt;--- {this.props.symbol_table[o.L_End].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Body].name} ---&gt;|&lt;--- {this.props.symbol_table[o.End_Extension].name} ---&gt;|&lt;--- {this.props.symbol_table[o.L_Extended_End].name} ---&gt;|<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_End].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Body].value.toFixed(3)}      
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.End_Extension].value.toFixed(3)}     
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.symbol_table[o.L_Extended_End].value.toFixed(3)} 
                </pre>
                <hr/>
                <table id="view4" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Data_Source].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Data_Source].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Mandril].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Mandril].value}</td>
                            <td className="text-left">{this.props.symbol_table[o.ID_Free].units}</td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Wind].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="2">{this.props.labels[o.Wind].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Relative_loop_pos____tol_].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Relative_loop_pos____tol_].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Gaps].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Gaps].value}</td>
                            <td className="text-left">{this.props.symbol_table[o.Wire_Diameter].units}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Shot_peen].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Shot_peen].value}</td>
                            <td colSpan="3" className="text-left">{"(calculations assume: " + this.peenValue + ")"}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Stress_relieve_HT].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Stress_relieve_HT].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Finish].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Finish].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.End_use].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.End_use].value}</td>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Operating_temp].name}: </td>
                            <td/>
                            <td className="text-left">{this.props.labels[o.Operating_temp].value}</td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="text-left">{this.props.labels[o.Special_notes___tol].name}: </td>
                            <td/>
                            <td className="text-left" colSpan="4">{this.props.labels[o.Special_notes___tol].value}</td>
                        </tr>
                        <tr>
                            <td/>
                        </tr>
                    </tbody>
                </table>
                <hr/>
                <table id="view5" className="report-table">
                    <tbody>
                        <tr>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                            <td> &nbsp; &nbsp; </td>
                            <td className="text-center" colSpan="2">approved for mfg.</td>
                            <td/>
                        </tr>
                        <tr>
                            <td> &nbsp; </td>
                        </tr>
                        <tr>
                            <td colSpan="2">by {this.props.labels[o.Customer_approval].value}</td>
                            <td>date {this.props.labels[o.Customer_date].value}</td>
                            <td> &nbsp; &nbsp; </td>
                            <td colSpan="2">by {this.props.labels[o.Vendor_approval].value}</td>
                            <td>date {this.props.labels[o.Vendor_date].value}</td>
                        </tr>
                    </tbody>
                </table>
            <br/>
            </>
        );
    }

}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls, // Needed for ReportBase
    labels: state.model.labels,
});

export default connect(mapStateToProps)(Report3);

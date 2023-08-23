import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


export default function Alert(props) {


    /***********example to show Alert msg useContext**** */
    const context = useContext(noteContext);
    const { apiresponcemsg } = context;
    /***********end example to show Alert msg useContext**** */

    return (
        <div>
            {/* Example props drilling to show alert message Reverce callback function */}
            <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.message}
            </div>
            {/* End Example props drilling to show alert message Reverce callback function */}

            {/* example to show Alert msg useContext */}
            <div className={`alert alert-${apiresponcemsg.type}`} role="alert">
                {apiresponcemsg.message}
            </div>
            {/* end example to show Alert msg useContext */}
        </div>
    )
}

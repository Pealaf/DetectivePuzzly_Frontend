import React from "react";

function Tableau({ listeTh, data }) {
    const keys = Object.keys(data[0]);
    return (
        <table style={{borderSpacing: "20px"}}>
            <thead>
            <tr>
                <th>N°</th>
                {
                    listeTh.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
                {
                    data.map((item1, index1) => (
                        <tr key={index1}>
                            <td>{index1 + 1}</td>
                            {
                                keys.map((item2, index2) => (
                                    <td key={index2}>{item1[item2]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}
export default Tableau;

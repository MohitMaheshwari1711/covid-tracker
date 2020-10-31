import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



function InfoBox({ title, cases, textColor, active, isOrange, isGreen, isRed, total, ...props }) {


    return (
        <Card onClick={props.onClick} className={`infoBox ${active && `infoBox_selected`} ${isOrange && "infoBox_orange"} ${isGreen && "infoBox_green"} ${isRed && "infoBox_red"}`}>
            <CardContent>
                <Typography className='infoBox_title' color='textSecondary'>
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${textColor}`}>{cases}</h2>
                <Typography className='infoBox_total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>  
    )
}

export default InfoBox

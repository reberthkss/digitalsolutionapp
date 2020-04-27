import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const renderLoading = () => {
    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} style={{height: '100%'}}>
            <CircularProgress/>
        </Box>
    )
}

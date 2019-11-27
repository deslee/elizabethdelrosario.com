import React, { FC, useRef, useEffect } from 'react'
import PDFObject from 'pdfobject'
import { makeStyles } from '@material-ui/core'

type Props = { url: string }

const useStyles = makeStyles(() => ({
    embed: {
    }
}))

const PdfViewer: FC<Props> = ({url}) => {
    const divEl = useRef(null);
    const classes = useStyles({})
    useEffect(() => {
        if (divEl.current) {
            PDFObject.embed(url, divEl.current, { height: '80vh' })
        }
    })
    return <>
        <div ref={divEl} className={classes.embed}></div>
    </>
}

export default PdfViewer
import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const styles = makeStyles(theme => ({
  btn: {
    '&:hover': {
      opacity: '.7'
    },
    backgroundColor: theme.palette.primary.light,
    color          : theme.palette.common.white,
    cursor         : 'pointer',
    padding        : '10px 20px',
    transition     : 'opacity .2s ease-in'
  },
  containerInput: {
    alignItems    : 'center',
    border        : `solid 1px ${theme.palette.grey[400]}`,
    display       : 'flex',
    justifyContent: 'space-between',
    position      : 'relative'
  },
  containerPreview: {
    '& > img': {
      height: 'auto',
      width : '100%'
    },
    '&:hover': {
      '& $overlay': {
        opacity: '.5'
      },
      '& $removeIcon': {
        opacity: 1
      }
    },
    border   : `solid 1px ${theme.palette.grey[400]}`,
    borderTop: 0,
    padding  : 50,
    position : 'relative'
  },
  input: {
    cursor  : 'pointer',
    fontSize: 0,
    height  : '100%',
    left    : 0,
    opacity : 0,
    position: 'absolute',
    top     : 0,
    width   : '100%'
  },
  label: {
    padding: '10px 20px'
  },
  overlay: {
    backgroundColor: '#000',
    height         : '100%',
    left           : 0,
    opacity        : 0,
    position       : 'absolute',
    top            : 0,
    transition     : 'opacity .3s ease-in',
    width          : '100%'
  },
  removeIcon: {
    color     : theme.palette.common.white,
    cursor    : 'pointer',
    opacity   : 0,
    position  : 'absolute',
    right     : 20,
    top       : 20,
    transition: 'opacity .3s ease-in',
    zIndex    : 2
  }
}))

const InputImage = (props) => {
  const {
    name = '',
    onImage = () => {}
  } = props
  const classes = styles()

  const [ currentImage, setCurentImage ] = useState(null)

  const _handleChangeImage = ev => {
    if(ev.target.files.length) {
      setCurentImage(URL.createObjectURL(ev.target.files[0]))
      onImage({ file: ev.target.files[0], name })
    }
  }

  const _handleClickclear = () => {
    setCurentImage(null)
    onImage({ file: null, name })
  }

  return (
    <div>
      <div className={classes.containerInput}>
        <label className={classes.label}>Choose File..</label>
        <div className={classes.btn}>Browse</div>
        <input className={classes.input} onChange={_handleChangeImage} type='file' />
      </div>
      {currentImage &&
      <div className={classes.containerPreview}>
        <div className={classes.overlay} />
        <HighlightOffIcon className={classes.removeIcon} onClick={_handleClickclear} />
        <img src={currentImage} />
      </div>
      }
    </div>
  )
}

export default InputImage

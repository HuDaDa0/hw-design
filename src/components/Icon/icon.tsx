import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme? : ThemeProps;
  style? : React.CSSProperties;
}

function Icon(props: IconProps) {
  
  const { className, style, theme, ...restProps } = props
  const classes = classNames('hw-icon', className, {
    [`icon-${theme}`]: theme
  })

  return <FontAwesomeIcon className={classes} style={style} {...restProps} />
}


export default Icon

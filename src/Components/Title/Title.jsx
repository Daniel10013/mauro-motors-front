import React from 'react'
import styles from './Title.module.css'

const Title = ({title}) => {
  return (
    <div className={styles.title}>
     <h2>{title}</h2>
    </div>
  )
}

export default Title
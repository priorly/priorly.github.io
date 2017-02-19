import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import Shimmer from './Shimmer'

const Avatar = ({user, loading, styles}) => (
  <div className={css(_styles.face, styles)}>
    {loading && <Shimmer />}
    {!loading && <img src={user.avatar_url + '&s=36'} style={{width: '100%'}} />}
  </div>
)

const _styles = StyleSheet.create({
  face: {
    width: '36px',
    height: '36px',
    margin: '0 4px 4px',
    background: '#ddd',
    borderRadius: '50%',
    overflow: 'hidden'
  }
})

export default Avatar
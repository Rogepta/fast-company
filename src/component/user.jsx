import React from 'react'

const User = ({user, onRemove}) => {

  return (
    <tr >
                        <td>{user.name}</td>
                        <td>{user.qualities.map(quality => (
                            <span key={quality._id}
                                  className={`badge bg-${quality.color} m-1`}
                            >{quality.name}</span>
                        ))}</td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td>
                            <button onClick={() => onRemove(user._id)}
                            className={`btn btn-primary`}
                            >DELETE</button>
                        </td>
                    </tr> 
  )
}

export default User
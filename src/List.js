import React from 'react'
import Mall from './Mall'

const List = ({ filteredList, filterList, selectedId, setSelected }) => {
  return (
    <>
      <input type='text' className='filter' placeholder='Filter Places' aria-label='Filter' onChange={e => filterList(e.target.value)} />

      <ol className='places'>
        {filteredList.length > 0 ? (
          filteredList.map(mall => <Mall key={mall.id} mall={mall} setSelected={setSelected} isSelected={mall.id === selectedId} />)
        ) : (
          <li className='place' key='no-match'>
            <h4 className='name'>Unfortunately, your keyword doesn't match any of the listed malls.</h4>
          </li>
        )}
      </ol>
    </>
  )
}

export default List

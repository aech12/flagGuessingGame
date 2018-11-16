import React from 'react'
import './All.css'

const Square = ({onSubmit, options, onChange, selectedOption}) => {
  return (
    <div className='gamepage'>
      <form className='form' onSubmit={onSubmit}>
        <input 
          type='radio' name='opt' 
          value={`${options[0].name}`}
          checked={selectedOption===`${options[0].name}`}
          onChange={onChange}
        />
        <p className='inline'>{options[0].name}</p>

        <input 
          type='radio' name='opt' 
          value={`${options[1].name}`}
          checked={selectedOption===`${options[1].name}`}
          onChange={onChange}
        />
        <p className='inline'>{options[1].name}</p>

        <input 
          type='radio' name='opt' 
          value={`${options[2].name}`}
          checked={selectedOption===`${options[2].name}`}
          onChange={onChange}
        />
        <p className='inline'>{options[2].name}</p>

        <input 
          type='radio' name='opt' 
          value={`${options[3].name}`}
          checked={selectedOption===`${options[3].name}`}
          onChange={onChange}
        />
        <p className='inline'>{options[3].name}</p>
        <button className='submitbutton' type='submit'>Guess</button>
      </form>
    </div>
  )
}


export default Square
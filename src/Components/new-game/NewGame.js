import './NewGame.css'

const NewGame = ({reset}) =>
    <div className='button-wrapper'>
        <button onClick={reset}>Play Again</button>
    </div>

export default NewGame


import React from 'react';

function JournalEntry({title, body}) {
    return ( <div className='Content' id='Journal'>
        <h4>{title}</h4>
        <p>{body}</p>
    </div> );
}

export default JournalEntry;
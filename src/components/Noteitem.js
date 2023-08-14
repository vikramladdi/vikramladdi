import React from 'react'


function Noteitem(props) {
    const { note } = props;
    return (
        <div class="col-sm-4 mt-3"> 
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

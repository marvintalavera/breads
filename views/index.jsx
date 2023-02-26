const React = require('react')
const bread_router = require('../controllers/breads_controller')
const Default = require('./layouts/Default')

function Index ({breads, title})  {
    return (
        <Default title={title}>
            <h2>Index Page</h2>
            <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
            </div>

            <ul>
                {
                    breads.map((bread,_id) => {
                        return (
                            <li key={bread._id}> 
                                <a href={`/breads/${bread._id}`}>
                                    {bread.name}
                                </a>
                             </li>
                         )
                    }) 
                }
            </ul>  
            {/* <p>I have {breads[0].name} bread!</p> */}
            {/* This is a JSX comment. */}
        </Default>
    )
}

module.exports = Index

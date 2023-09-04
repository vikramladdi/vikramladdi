import React from 'react'

export default function Newsitem(props) {
    let {title,description,urlToImage,imgUrl,author,publish} = props;
    return (
        <div>
            <div className="card">
                <img src={urlToImage ? urlToImage : "https://i.ytimg.com/vi/ok1U7_SIzv8/maxresdefault.jpg"} className="card-img-top" alt="..." style={{maxHeight:"290px"}}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description ? description.substr(0, 33) : ""}</p>
                    <p className="card-text"><small className="text-muted">{author} {publish}</small></p>
                    <a href={imgUrl} className="btn btn-primary text-center">Click here</a>
                </div>
            </div>
        </div>
    )
}

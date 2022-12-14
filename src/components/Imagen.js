import React from 'react';


const Imagen = ({imagen})=>{


    //extraer variables
    const {largeImageURL, likes, previewURL, tags, views} = imagen;

    return (

        <div className="col-12 col-sm6 col-md-4 col-lg-3 bm-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="card-img-top"/>
            </div>
            <div className="card-body">
                    <p className="card-text">{likes} Me Gusta</p>
                    <p className="card-text">{views} Vistas</p>
            </div>
            <div className="card-footer">
                <a
                    href={largeImageURL}
                    target="_blanck"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                >Ver Imagen</a>
            </div>
        </div>

    );
}


export default Imagen;
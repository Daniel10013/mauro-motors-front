import "./DetalhesAnuncio.css"

function LoadingDetalhesAnuncio() {
    const back = () => {
        history.back();
    };

    return (
        <div>
            <div>
                <p className="BackToListDetalhes" onClick={back}>← Voltar</p>
            </div>
            <div className="HeaderBoxDetalhes">
                <div></div>
                <div className="HeaderCarroselInfoDetalhes">
                    <div className="HeaderInfoDetalhes">
                        <h2 className="skeletonLoader" style={{ height: "unset", width: "unset" }} >{""}</h2>
                    </div>
                    <img className="skeletonLoader" src={""} style={{ borderRadius: "10px", height: "550px", marginLeft: "40px", width: "850px" }} />
                </div>
                <div className="HeaderLeftDetalhes">
                    <div className="HeaderInfoVendedorDetalhes">
                        <h2 className="skeletonLoader" style={{ width: "50%", height: "unset" }}>{""}</h2>
                        <div className="ownerInfo">

                            <div className="avatar skeletonLoader" style={{ borderRadius: "50%", height: "100px", width: "100px" }}>
                                <span></span>
                            </div>
                            <p className="skeletonLoader" style={{ width: "50%", borderRadius: "5px", height: "35px" }}></p>

                        </div>

                        <p className="HeaderInfoVendedorDetalhesP skeletonLoader" style={{ borderRadius: "5px", height: "25px" }}>Cadastrado desde 00/00/0000</p>


                        <p className="HeaderInfoVendedorDetalhesLocation">{ownerAddress.estate} - {ownerAddress.city}</p>
                    </div>

                    <div className="HeaderContactVendedorDetalhes skeletonLoader" style={{ height: "unset", width: "unset" }}>
                        <p>Mais informações</p>
                        <p className="HeaderContactVendedorDetalhesNegrito">Entre em contato</p>
                        <p>0000000000</p>
                    </div>
                    <div className="HeaderPriceVendedorDetalhes skeletonLoader" style={{ height: "unset", width: "unset" }}>
                        <p>{" "}</p>
                    </div>
                </div>
                <div className="HeaderPriceVendedorDetalhes skeletonLoader" style={{ height: "unset", width: "unset" }}>
                    <p>{" "}</p>
                </div>
            </div >
            <div className="BottomSectionDetalhes">
                <div className="MidInfoAdDetalhes">
                    <h2 className="NameAnuncioDetalhes skeletonLoader" style={{height: "100px", width: "unset"}} >{" "}</h2>
                    <h2 className="DetailsAnuncioDetalhes">Detalhes</h2>
                    <div className="DetailsOutsideDetalhes skeletonLoader" style={{height: "unset", width: "unset"}} >
                        <div className="DetailsInsideDetalhes">
                            <div>
                                <p className="DetailsInsidePDetalhes">Motor</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Marca</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Ano</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Placa</p>
                            </div>
                        </div>
                        <div className="DetailsInsideDetalhes">
                            <div>
                                <p className="DetailsInsidePDetalhes">Kilometragem</p>
                            </div>
                            <div>
                                <p className="DetailsInsidePDetalhes">Cor</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="DetailsAnuncioDetalhes">Localização</h2>
                    <div className="DetailsInsideDetalhes skeletonLoader" style={{height: "unset", width: "unset"}} >
                        <div>
                            <p className="DetailsInsidePDetalhes">CEP</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default LoadingDetalhesAnuncio;

import Header_Home_Login from "../../Components/Header_Home_Login";
import styles from "./CreateReview.module.css";
import { useDropzone } from 'react-dropzone';
import Loader from "../../Components/Loader";
import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { Star, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
const uploadImageUrl = import.meta.env.VITE_IMAGE_API_URL;
const carBrandsOptions = [
    { value: 1, label: "Volkswagen" },
    { value: 2, label: "Fiat" },
    { value: 4, label: "Chevrolet" },
    { value: 5, label: "Toyota" },
    { value: 6, label: "Hyundai" },
    { value: 7, label: "Renault" },
    { value: 8, label: "Honda" },
    { value: 9, label: "Ford" },
    { value: 10, label: "Nissan" },
    { value: 11, label: "Jeep" },
    { value: 12, label: "Peugeot" },
    { value: 13, label: "Citroën" },
    { value: 14, label: "Mitsubishi" },
    { value: 15, label: "Kia" },
    { value: 16, label: "Mercedes-Benz" },
    { value: 17, label: "BMW" },
    { value: 18, label: "Audi" },
    { value: 19, label: "Volvo" },
    { value: 20, label: "Land Rover" },
    { value: 21, label: "Subaru" },
    { value: 22, label: "Iveco" },
    { value: 23, label: "Porsche" },
    { value: 24, label: "Dodge" },
    { value: 25, label: "Lexus" },
    { value: 26, label: "Mini" },
    { value: 27, label: "Suzuki" },
    { value: 28, label: "BYD" },
    { value: 29, label: "Tesla" },
    { value: 30, label: "Maserati" },
    { value: 31, label: "Ferrari" },
    { value: 32, label: "Lamborghini" },
    { value: 33, label: "Aston Martin" },
    { value: 42, label: "Corvette" },
    { value: 43, label: "Mazda" },
    { value: 44, label: "Mustang" },
    { value: 45, label: "Alfa Romeo" },
    { value: 46, label: "Abarth" },
    { value: 47, label: "Pagani" },
    { value: 48, label: "McLaren" },
];

const CreateReview = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [hoveredStar, setHoveredStar] = useState(0);

    //dados para salvar
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState("")
    const [model, setModel] = useState("")
    const [brandId, setBrandId] = useState(null)
    const [year, setYear] = useState(null)
    const [details, setDetails] = useState(null)
    const [rating, setRating] = useState(0);

    const getAuthHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/jpg': [],
            'image/webp': [],
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            const image = acceptedFiles[0];
            if (image) {
                setFile(Object.assign(image, {
                    preview: URL.createObjectURL(image)
                }));
            }
        }
    });

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300)

        return () => {
            if (file?.preview) {
                URL.revokeObjectURL(file.preview);
            }
        };
    }, [file]);

    Swal.close();
    const saveReview = () => {
        if (file.length == 0) {
            Swal.fire({
                icon: "error",
                title: "Selecione uma imagem",
                text: "Você deve selecionar uma imagem para sua avaliação!"
            })
            return;
        }

        if (
            !title ||
            !brandId ||
            !Number(year) ||
            !model ||
            !details ||
            !rating
        ) {
            Swal.fire({
                icon: "error",
                title: "Preencha os campos",
                text: "Preencha todos os campos corretamente!"
            })
            return;
        }

        if (rating > 5 || rating < 1) {
            Swal.fire({
                icon: "error",
                title: "Nota incorreta",
                text: "Valor inválido para a nota final!"
            })
            return;
        }

        const dataToSave = {
            "title": title,
            "car_brand_id": brandId,
            "model": model,
            "year": year,
            "description": details, 
            "avaliation": rating
        }


        Swal.fire({
            icon: "info",
            title: "Aguarde...",
            text: "Aguarde enquanto salvamos sua avaliação",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        axios.post(apiUrl + "review", dataToSave, { headers: getAuthHeaders() })
            .then((res) => {
                console.log(res);
                if (res.data.status == "success") {
                    return uploadImage(res.data.data.review_id)
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    "title": "Erro!",
                    "text": "Erro ao criar avaliação!",
                    "icon": "error"
                })
            })
    }

    const uploadImage = (reviewId) => {
        const formData = new FormData();
        formData.append("image", file);
        axios.post(uploadImageUrl, formData)
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    saveReviewImage(res.data.data.display_url, reviewId)
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    "title": "Erro!",
                    "text": "Erro ao salvar Imagem!",
                    "icon": "error"
                })
            });
    }

    const saveReviewImage = (image, reviewId) => {
        const dataToSave = {
            "review_id": reviewId,
            "file_name": image
        }

        axios.post(apiUrl + "review-image", dataToSave, { headers: getAuthHeaders() })
            .then((res) => {
                console.log(res);
                if (res.data.status == "success") {
                    Swal.close();
                    Swal.fire({
                        "title": "Sucesso!",
                        "text": "Sua avaliação foi postada com sucesso! Clique no botão para ser redirecionado a página de detalhes",
                        "icon": "success"
                    }).then(()=>{
                        navigate("/avaliacao/" + reviewId);
                    })
                }
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    "title": "Erro!",
                    "text": "Erro ao salvar Imagem!",
                    "icon": "error"
                })
            });
    }

    return (
        <>
            <Header_Home_Login />
            {isLoading == true && <Loader />}
            <section>
                <div className={styles.topSection}>
                    <h1>Cadastro de Reviews!</h1>
                    <h2>Nessa tela você pode publicar uma avaliação sobre algum veículo que possui! Basta preencher todos os campos corretametente e clicar o botão "salvar"!</h2>
                </div>
                <div className={styles.formSection}>
                    <div className={[styles.formBox, styles.borderRight].join(" ")}>
                        <div className={styles.inputGroup}>
                            <label >Selecione a imagem do carro:</label>
                            <div {...getRootProps()} className={styles.inputFile}>
                                <input {...getInputProps()} />
                                {file.length != 0 ? (
                                    <>
                                        <p className={styles.uploadMain} style={{ color: "##369336" }}>Imagem Selecionada! Confira a baixo:</p>
                                        <div className={styles.previewPlaceholder}>
                                            <img src={file.preview} className={styles.imagePreview} alt="preview" />
                                        </div>
                                        <p className={styles.uploadInfo} style={{ color: "#ca2c2c" }} onClick={() => { setFile([]) }}>Clique aqui para <u>remover</u></p>
                                    </>

                                ) : (
                                    <>
                                        <p className={styles.uploadMain}>Arraste uma imagem ou <span>clique aqui para selecionar</span></p>
                                        <div className={styles.uploadPlaceholder}>
                                            <Upload size={64} color="gray" />
                                        </div>
                                        <p className={styles.uploadInfo}>A sua imagem deve ser nos formatos PNG, JPG, JPEG ou WEBP</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label >Título da avaliação:</label>
                            <input
                                type="text"
                                placeholder="Ex: Carro muito bom para passear com a família..."
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div style={{ display: "flex", width: "70%", gap: "20px" }}>
                            <div className={styles.inputGroup}>
                                <label>Fabricante:</label>
                                <Select
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? 'solid 1px #BC4547' : 'solid 1px #D9D9D9',
                                            boxShadow: state.isFocused ? '0 0 0 1px #BC4547' : 'none',
                                            '&:hover': {
                                                borderColor: state.isFocused ? '#BC4547' : '#aaa'
                                            }
                                        })
                                    }}
                                    menuPlacement="top"
                                    options={carBrandsOptions}
                                    placeholder="Selecione a marca"
                                    onChange={(e) => { setBrandId(e.value) }}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label >Ano de lançamento:</label>
                                <input type="number" placeholder="Ex: 2025" value={year} onChange={(e) => { setYear(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className={[styles.formBox, styles.borderLeft].join(" ")}>
                        <div className={styles.inputGroup}>
                            <label >Modelo do carro (Sem a marca):</label>
                            <input type="text" placeholder="Ex: Gol" value={model} onChange={(e) => { setModel(e.target.value) }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Detalhes da avaliação:</label>
                            <textarea onChange={(e) => { setDetails(e.target.value) }} value={details} />
                            <span style={{marginTop: "10px", color: "gray", fontSize: "14px"}}>Limite de 500 caracteres, mais que isso não é aceito!</span>
                        </div>
                        <div className={styles.inputGroup}>
                            <label >Nota final:</label>
                            <div className={styles.starsGroup}>
                                {[...Array(5)].map((_, i) => {
                                    const index = i + 1;
                                    const isFilled = hoveredStar
                                        ? index <= hoveredStar
                                        : index <= rating;

                                    return (
                                        <Star
                                            key={index}
                                            size={42}
                                            className={[
                                                isFilled ? styles.starFilled : styles.starNotFilled,
                                                styles["star" + index]
                                            ].join(" ")}
                                            onMouseEnter={() => setHoveredStar(index)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            onClick={() => setRating(index)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <button className={styles.saveButton} onClick={saveReview}>
                            Salvar avaliação
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
export default CreateReview;
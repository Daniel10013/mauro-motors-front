// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Select from 'react-select';
import "./Menu.css";

const carSizeOptions = [
  { value: 'hatch', label: 'Hatch' },
  { value: 'coupe', label: 'Cupê' },
  { value: 'suv', label: 'SUV' },
  { value: 'offroad', label: 'Off‑road' },
  { value: 'sedan', label: 'Sedã' },
];

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

const Menu = ({filter, setFilter, buttonClick}) => {

  return (
    <div className="menu-container">
      <div className="titleContainer">
        <h3 className="menu-title">Filtros</h3>
        <p>Selecione as opções para encontrar o melhor resultado!</p>
      </div>
      <div className="filtersContainer">
        <div className="menu-field">
          <label>Tipo de carro</label>
          <Select
            value={carSizeOptions.find((opt) => opt.value === filter.car_type) || null}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? '#BC4547' : '#D9D9D9',
                boxShadow: state.isFocused ? '0 0 0 1px #BC4547' : 'none',
                '&:hover': {
                  borderColor: state.isFocused ? '#BC4547' : '#aaa'
                }
              })
            }}
            options={carSizeOptions}
            placeholder="Selecione o tipo de carro"
            onChange={(e) => setFilter({ ...filter, car_type: e.value })}
          />
        </div>

        <div className="menu-field">
          <label>Ano</label>
          <div className="menu-ano-container">
            <input
              type="number"
              placeholder="Ex:1995"
              value={filter.min_year}
              onChange={(e) => setFilter({ ...filter, min_year: e.target.value })}
              className="menu-input"
            />
            <span className="menu-ate">até</span>
            <input
              type="number"
              placeholder="Ex:1995"
              value={filter.max_year}
              onChange={(e) => setFilter({ ...filter, max_year: e.target.value })}
              className="menu-input"
            />
          </div>
        </div>
        <div className="menu-field">
          <label>Preço</label>
          <div className="menu-ano-container">
            <input
              type="number"
              placeholder="Preço mínimo"
              value={filter.min_price}
              onChange={(e) => setFilter({ ...filter, min_price: e.target.value })}
              className="menu-input"
            />
            <span className="menu-ate">até</span>
            <input
              type="number"
              placeholder="Preço máximo"
              value={filter.max_price}
              onChange={(e) => setFilter({ ...filter, max_price: e.target.value })}
              className="menu-input"
            />
          </div>
        </div>
        <div className="menu-field">
          <label>Fabricante</label>
          <Select
            value={carBrandsOptions.find((opt) => opt.value === filter.brand_id) || null}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? '#BC4547' : '#D9D9D9',
                boxShadow: state.isFocused ? '0 0 0 1px #BC4547' : 'none',
                '&:hover': {
                  borderColor: state.isFocused ? '#BC4547' : '#aaa'
                }
              })
            }}
            options={carBrandsOptions}
            placeholder="Selecione a fabricante"
            onChange={(e) => setFilter({ ...filter, brand_id: e.value })}
          />
        </div>

        <button onClick={buttonClick} className="menu-button">
          Aplicar opções
        </button>
      </div>
    </div>
  );
};

export default Menu;

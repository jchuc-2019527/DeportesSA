'use strict'

const db = require('../db.json');
const fs = require('fs');
const uuid = require('uuid');
const json_string_brand = fs.readFileSync('src/db.json', 'utf-8');
const brand = JSON.parse(json_string_brand);

exports.test = (req, res)=>{
    return res.send({message: 'test brand running'});
}

exports.createBrand = (req, res)=>{
    try{
        const {id, nameMarca, description} = req.body;
        if(!nameMarca || !description){
            return res.send({message: 'Please added all params'});
        };
        //const userId = req.params.id;
        let newBrand = {
            id: uuid.v4(),
            nameMarca,
            description,
            status: 'true'
        };
        let brandExist = db.find(brand => brand.nameMarca === newBrand.nameMarca);
        if(!brandExist){
            brand.push(newBrand);
            fs.writeFileSync('src/db.json', JSON.stringify(brand), 'utf-8');
            if(brand) return res.status(201).send({message: 'Brand created', newBrand});
        }else{
            return res.send({message: 'Brand already exist'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Create brand)'});
    }
}

exports.getBrand =  (req, res) => {
    try{
        const brandExist = db.find(idBrand => idBrand.id === req.params.idBrand);
        if(!brandExist) {
            return res.status(404).send({message: 'Brad not found'});
        }else{
            return res.status(200).send({message: 'Brand found', brandExist})
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error en el servidor(getBrand)'})
    }
}

exports.brands = (req, res)=>{
    try{
        let brands = db.filter(brand => brand.nameMarca)
        return res.status(200).send({message:'Brands found', brands});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get brands)'});
    }
}

exports.brandD = (req, res)=>{
    try{
        const idBrand = req.params.idBrand;
        const brandExist = db.find(brand => brand.id === idBrand);
        if(brandExist){
            console.log(brandExist);
            brandExist.status = 'false';
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'Brand deleted', brandExist});
        }else{
            return res.status(404).send({message: 'Brand not found'});
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Delete brand)'});
    }
}

exports.brandsDeleted = (req, res)=>{
    try{
        let brands = db.filter(brand => brand.status === 'false');
        return res.status(200).send({message:'Brands found', brands});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get brands)'});
    }
}

exports.brandsActives = (req, res)=>{
    try{
        let brands = db.filter(brand => brand.status === 'true');
        return res.status(200).send({message:'Brands found', brands});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Get brands)'});
    }
}

exports.brandU = (req, res)=>{
    try{
        const idBrand = req.params.idBrand;
        const brandExist = db.find(brand => brand.id === idBrand);
        if(brandExist){
            const {nameMarca, description, status} = req.body;
            if(!nameMarca || !description ) return res.send({message: 'Please added all params'});
            brandExist.nameMarca = nameMarca;
            brandExist.description = description;
            fs.writeFileSync('src/db.json', JSON.stringify(db), 'utf-8');
            return res.status(200).send({message:'Brand updated', brandExist});
        }else{
            return res.status(404).send({message: 'Brand not found'});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (Update brand)'});
    }
}
import { Categories } from '../models/index.js';

export async function findAll(){
    return Categories.findAll();
}

export function findByName(id){
    return Categories.findOne(id);
}